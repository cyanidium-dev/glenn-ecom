import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { writeClient } from "@/lib/sanityClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(` Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const sanityOrderId = session.metadata?.sanityOrderId;

    if (sanityOrderId) {
      try {
        await writeClient
          .patch(sanityOrderId)
          .set({
            status: "paid",
            stripeSessionId: session.id,
          })
          .commit();

        console.log(` Order ${sanityOrderId} marked as PAID`);
      } catch (err) {
        console.error(" Sanity update error:", err);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
