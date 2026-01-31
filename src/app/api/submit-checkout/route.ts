import { NextResponse } from "next/server";

import { writeClient } from "@/lib/sanityClient";
import Stripe from "stripe";
import { CartItem } from "@/store/useCartStore";
import { customAlphabet } from "nanoid";
import { SanityRecord } from "@/types/store";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);
export async function POST(request: Request) {
  try {
    const { customer, items } = await request.json();

    const [settings, freshRecords] = await Promise.all([
      writeClient.fetch(
        `*[_id == "settings"][0] { shippingCost }`,
        {},
        { useCdn: false, next: { revalidate: 0 } },
      ),
      writeClient.fetch(
        `*[_type == "record" && _id in $ids] { _id, title, priceCHF }`,
        { ids: items.map((i: CartItem) => i.id) },
        { useCdn: false, next: { revalidate: 0 } },
      ),
    ]);

    if (!settings) throw new Error("Settings not found in Sanity");

    const freshShippingCost = Number(settings.shippingCost);

    let serverSubtotal = 0;
    const verifiedItems = items.map((cartItem: CartItem) => {
      const record = freshRecords.find(
        (r: SanityRecord) => r._id === cartItem.id,
      );

      if (!record) {
        throw new Error(`Record with ID ${cartItem.id} not found`);
      }

      const price = Number(record.priceCHF);
      serverSubtotal += price * cartItem.quantity;

      return {
        _key: nanoid(),
        product: {
          _type: "reference",
          _ref: record._id,
        },
        productName: record.title,
        priceAtPurchase: price,
        quantity: cartItem.quantity,
      };
    });

    const finalTotal = serverSubtotal + freshShippingCost;

    const sanityOrder = await writeClient.create({
      _type: "order",
      orderNumber: `ORD-${nanoid()}`,
      status: "pending",
      customerName: customer.firstName,
      customerLastName: customer.lastName,
      customerEmail: customer.email,
      customerPhone: customer.phone || "",

      address: {
        country: customer.country,
        city: customer.city,
        street: `${customer.address} ${customer.apartment || ""}`.trim(),
        zipCode: customer.postalCode,
      },

      items: verifiedItems,
      totalPrice: finalTotal,
      shippingCost: freshShippingCost,
      createdAt: new Date().toISOString(),
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      line_items: verifiedItems.map((item: any) => ({
        price_data: {
          currency: "chf",
          product_data: {
            name: item.productName,
          },
          unit_amount: Math.round(item.priceAtPurchase * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/${sanityOrder._id}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      metadata: {
        sanityOrderId: sanityOrder._id,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: Math.round(freshShippingCost * 100),
              currency: "chf",
            },
            display_name: "Standard Shipping",
          },
        },
      ],
    });

    return NextResponse.json({ url: session.url });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Stripe/Sanity Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
