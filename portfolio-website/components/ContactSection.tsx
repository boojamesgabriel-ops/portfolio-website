"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import type { IconType } from "react-icons";
import DigitalHand from "@/components/DigitalHand";

type ContactFormState = {
  name: string;
  email: string;
  contactNumber: string;
  message: string;
};

type PendingLink = {
  label: string;
  href: string;
  icon: IconType;
  type: string;
};

const initialFormState: ContactFormState = {
  name: "",
  email: "",
  contactNumber: "",
  message: "",
};

const contactLinks: PendingLink[] = [
  {
    label: "boojamesgabriel@gmail.com",
    href: "mailto:boojamesgabriel@gmail.com",
    icon: MdOutlineEmail,
    type: "Email",
  },
  {
    label: "+63 919 616 5238",
    href: "tel:+639196165238",
    icon: MdOutlinePhone,
    type: "Phone",
  },
  {
    label: "James Gabriel Boo",
    href: "https://www.linkedin.com/in/james-gabriel-boo-161111399/",
    icon: FaLinkedinIn,
    type: "LinkedIn",
  },
  {
    label: "boojamesgabriel-ops",
    href: "https://github.com/boojamesgabriel-ops",
    icon: FaGithub,
    type: "GitHub",
  },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactNumberPattern = /^\+?[0-9][0-9\s().-]{6,24}[0-9]$/;

function validateContactForm(form: ContactFormState) {
  const name = form.name.trim();
  const email = form.email.trim();
  const contactNumber = form.contactNumber.trim();
  const message = form.message.trim();
  const contactDigits = contactNumber.replace(/\D/g, "");

  if (!name) return "Name is required.";
  if (!email) return "Email is required.";
  if (!emailPattern.test(email)) return "Enter a valid email address.";
  if (!contactNumber) return "Contact number is required.";
  if (
    !contactNumberPattern.test(contactNumber) ||
    contactDigits.length < 7 ||
    contactDigits.length > 15
  ) {
    return "Enter a valid contact number.";
  }
  if (!message) return "Message is required.";
  if (message.length < 10) return "Message must be at least 10 characters.";

  return "";
}

export default function ContactSection() {
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"error" | "success" | "">("");
  const [pendingLink, setPendingLink] = useState<PendingLink | null>(null);
  const continueButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!pendingLink) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPendingLink(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    continueButtonRef.current?.focus();

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [pendingLink]);

  const updateField = (field: keyof ContactFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitContactForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSending) return;

    const validationMessage = validateContactForm(form);
    if (validationMessage) {
      setStatusType("error");
      setStatusMessage(validationMessage);
      return;
    }

    setIsSending(true);
    setStatusMessage("");
    setStatusType("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Message could not be sent.");
      }

      setForm(initialFormState);
      setStatusType("success");
      setStatusMessage(data.message || "Message sent successfully.");
    } catch {
      setStatusType("error");
      setStatusMessage("Message could not be sent right now. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  const continueToPendingLink = () => {
    if (!pendingLink) return;

    window.location.assign(pendingLink.href);
  };

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-hand-zone contact-hand-zone--left">
        <DigitalHand side="left" />
      </div>

      <div className="contact-panel">
        <div className="contact-panel__header">
          <h2 id="contact-title">CONTACT</h2>
        </div>

        <div className="contact-links" aria-label="Contact links">
          {contactLinks.map((link) => {
            const Icon = link.icon;

            return (
              <button className="contact-link" key={link.href} type="button" onClick={() => setPendingLink(link)}>
                <Icon aria-hidden="true" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>

        <form className="contact-form" onSubmit={submitContactForm} noValidate>
          <label className="contact-field">
            <span>name</span>
            <input
              autoComplete="name"
              name="name"
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="your name"
              type="text"
              value={form.name}
            />
          </label>

          <label className="contact-field">
            <span>email</span>
            <input
              autoComplete="email"
              name="email"
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="name@example.com"
              type="email"
              value={form.email}
            />
          </label>

          <label className="contact-field">
            <span>contact number</span>
            <input
              autoComplete="tel"
              inputMode="tel"
              name="contactNumber"
              onChange={(event) => updateField("contactNumber", event.target.value)}
              placeholder="+63 900 000 0000"
              type="tel"
              value={form.contactNumber}
            />
          </label>

          <label className="contact-field contact-field--message">
            <span>message</span>
            <textarea
              name="message"
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Tell me what you want to build."
              rows={5}
              value={form.message}
            />
          </label>

          {statusMessage ? (
            <p className={`contact-form__status contact-form__status--${statusType}`} role="status">
              {statusMessage}
            </p>
          ) : null}

          <button className="contact-submit" type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div className="contact-hand-zone contact-hand-zone--right">
        <DigitalHand side="right" />
      </div>

      {pendingLink ? (
        <div className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
          <div className="contact-modal__panel">
            <h3 id="contact-modal-title">You are about to open {pendingLink.type}. Continue?</h3>
            <div className="contact-modal__actions">
              <button ref={continueButtonRef} type="button" onClick={continueToPendingLink}>
                Continue
              </button>
              <button type="button" onClick={() => setPendingLink(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
