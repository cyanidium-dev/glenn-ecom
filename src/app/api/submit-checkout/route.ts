import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  // Temporary placeholder: just log and echo back the payload
  // eslint-disable-next-line no-console
  console.log("Checkout payload:", data);

  return NextResponse.json({ message: "Checkout data received", data });
}
