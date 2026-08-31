import nodemailer from "nodemailer";

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  contactNumber?: unknown;
  message?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactNumberPattern = /^\+?[0-9][0-9\s().-]{6,24}[0-9]$/;

export const runtime = "nodejs";

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validateContactRequest(body: ContactRequestBody) {
  const name = normalizeText(body.name);
  const email = normalizeText(body.email);
  const contactNumber = normalizeText(body.contactNumber);
  const message = normalizeText(body.message);
  const contactDigits = contactNumber.replace(/\D/g, "");

  if (!name) return { error: "Name is required." };
  if (!email) return { error: "Email is required." };
  if (!emailPattern.test(email)) return { error: "Enter a valid email address." };
  if (!contactNumber) return { error: "Contact number is required." };
  if (
    !contactNumberPattern.test(contactNumber) ||
    contactDigits.length < 7 ||
    contactDigits.length > 15
  ) {
    return { error: "Enter a valid contact number." };
  }
  if (!message) return { error: "Message is required." };
  if (message.length < 10) return { error: "Message must be at least 10 characters." };

  return {
    data: {
      name,
      email,
      contactNumber,
      message,
    },
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  let body: ContactRequestBody;

  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }

  const validation = validateContactRequest(body);

  if ("error" in validation) {
    return Response.json({ message: validation.error }, { status: 400 });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

  if (!gmailUser || !gmailAppPassword || !receiverEmail) {
    return Response.json(
      { message: "Contact service is not configured." },
      { status: 500 },
    );
  }

  const { name, email, contactNumber, message } = validation.data;
  const timestamp = new Date().toISOString();

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      replyTo: email,
      to: receiverEmail,
      subject: `Portfolio contact message from ${name}`,
      text: [
        `Sender name: ${name}`,
        `Sender email: ${email}`,
        `Contact number: ${contactNumber}`,
        `Timestamp: ${timestamp}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <p><strong>Sender name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Sender email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Contact number:</strong> ${escapeHtml(contactNumber)}</p>
        <p><strong>Timestamp:</strong> ${escapeHtml(timestamp)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br>")}</p>
      `,
    });

    return Response.json({ message: "Message sent successfully." });
  } catch {
    return Response.json(
      { message: "Message could not be sent right now." },
      { status: 500 },
    );
  }
}
