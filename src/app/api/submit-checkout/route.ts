import { NextResponse } from "next/server";

import { writeClient } from "@/lib/sanityClient";
import Stripe from "stripe";
import { CartItem } from "@/store/useCartStore";
import { customAlphabet } from "nanoid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);
export async function POST(request: Request) {
  try {
    const { customer, items, totalAmount, shippingCost } = await request.json();

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

      items: items.map((item: CartItem) => ({
        _key: item.id,
        product: {
          _type: "reference",
          _ref: item.id,
        },
        productName: item.name,
        priceAtPurchase: item.price,
        quantity: item.quantity,
      })),

      totalPrice: totalAmount,
      shippingCost: shippingCost,
      createdAt: new Date().toISOString(),
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: CartItem) => ({
        price_data: {
          currency: "chf",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
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
              amount: Math.round(shippingCost * 100),
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
