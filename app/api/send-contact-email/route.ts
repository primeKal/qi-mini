import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const response = await resend.emails.send({
      from: "onboarding@resend.dev",  // Replace with your verified sender email on Resend
      to: "kaleb0982107724@gmail.com",
      subject: `New Contact Message from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    });
    console.log("Email sent successfully:", response);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Resend error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
