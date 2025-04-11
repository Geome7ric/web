// src/app/api/send-email/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend("re_6mUNwcJY_6DXpHc24v8Qie8WPrFVNx8ty");

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios" },
      { status: 400 }
    );
  }

  try {
    const result = await resend.emails.send({
      from: `${name} <hello@geome7ric.com>`,
      to: "matiasjriosb@gmail.com",
      subject: `${subject} - ${email}`,
      html: `${message}<br /><br />Escrito por <strong>${name}</strong>`,
    });

    const { error } = result;

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
