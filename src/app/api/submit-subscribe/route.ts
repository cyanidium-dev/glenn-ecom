import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const API_KEY = process.env.KIT_API_KEY_V3;
    const FORM_ID = process.env.KIT_FORM_ID;

    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: API_KEY,
          email: email,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Kit V3 Error:", data);
      return NextResponse.json({ status: response.status });
    }
    console.log("data", data);
    return NextResponse.json({ message: "Success." });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
