import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      phone,
      message,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      fbclid,
      gclid_custom,
    } = await req.json();

    // Basic validation — phone is optional. UTM/click-id fields are all optional;
    // direct-visit submissions ship them as empty strings and that's a valid
    // attribution state.
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Primary path: forward to GHL Inbound Webhook. The published workflow
    // creates the contact, attaches the inquiry as a note, sends the
    // auto-reply SMS, and posts to Slack #new-leads.
    //
    // Fallback path: if GHL is unreachable (missing env var, network error,
    // non-2xx response), fire a Resend email so the lead is still captured
    // out-of-band. Resend used to be the primary notification path — now
    // it's the safety net.
    let ghlOk = false;

    if (process.env.GHL_WEBHOOK_URL) {
      try {
        const ghlRes = await fetch(process.env.GHL_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            phone,
            message,
            utm_source,
            utm_medium,
            utm_campaign,
            utm_content,
            utm_term,
            fbclid,
            gclid_custom,
          }),
        });
        ghlOk = ghlRes.ok;
        if (!ghlOk) {
          console.error(
            "[contact route] GHL webhook returned non-OK:",
            ghlRes.status,
            await ghlRes.text()
          );
        }
      } catch (ghlErr) {
        console.error("[contact route] GHL webhook error:", ghlErr);
      }
    } else {
      console.warn(
        "[contact route] GHL_WEBHOOK_URL not set — falling back to Resend"
      );
    }

    if (!ghlOk) {
      // Resend fallback. If this also throws, the outer catch returns 500
      // and the user sees an error — at that point neither path captured
      // the lead and surfacing the failure is the right call.
      console.warn(
        "[contact route] GHL path failed — sending Resend fallback email"
      );
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "tools@scalehere.com",
        subject: `[FALLBACK] New inquiry from ${name} — Scale SD Website`,
        text: [
          `GHL webhook failed — this is the fallback notification.`,
          ``,
          `Name: ${name}`,
          `Email: ${email}`,
          phone ? `Phone: ${phone}` : null,
          utm_source ? `utm_source: ${utm_source}` : null,
          utm_medium ? `utm_medium: ${utm_medium}` : null,
          utm_campaign ? `utm_campaign: ${utm_campaign}` : null,
          utm_content ? `utm_content: ${utm_content}` : null,
          utm_term ? `utm_term: ${utm_term}` : null,
          fbclid ? `fbclid: ${fbclid}` : null,
          gclid_custom ? `gclid_custom: ${gclid_custom}` : null,
          ``,
          `Message:`,
          message,
        ]
          .filter(Boolean)
          .join("\n"),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact route] error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}