"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "hello@usmantahir.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

export const sendEmail = async (formData: FormData) => {
  const name = formData.get("name");
  const senderEmail = formData.get("email");
  const message = formData.get("message");

  // simple server-side validation
  if (!validateString(name, 200)) {
    return { error: "Invalid name" };
  }
  if (!validateString(senderEmail, 500)) {
    return { error: "Invalid sender email" };
  }
  if (!validateString(message, 5000)) {
    return { error: "Invalid message" };
  }

  try {
    const data = await resend.emails.send({
      from: `Portfolio Contact <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject: `New message from ${name}`,
      replyTo: senderEmail,
      react: React.createElement(ContactFormEmail, {
        name,
        senderEmail,
        message,
      }),
    });

    if (data.error) {
      return { error: getErrorMessage(data.error) };
    }

    return { data: data.data };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
};
