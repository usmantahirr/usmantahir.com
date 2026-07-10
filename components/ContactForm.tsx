"use client";

import { useState } from "react";
import { sendEmail } from "@/app/actions/sendEmail";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const formData = new FormData(e.currentTarget);
    const result = await sendEmail(formData);
    if (result?.error) {
      setError(result.error);
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="reveal d1">
        <div className="sent">
          <h4 className="disp">Thanks — message sent.</h4>
          <p>I&rsquo;ll get back to you shortly at the address you left.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reveal d1">
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
          />
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
          />
        </div>
        <div className="field">
          <label htmlFor="cf-msg">Message</label>
          <textarea
            id="cf-msg"
            name="message"
            required
            placeholder="What are you building, and what's the role?"
          />
        </div>
        {status === "error" && (
          <p className="formerror" role="alert">
            {error || "Something went wrong."} You can also email me directly at{" "}
            <a href="mailto:hello@usmantahir.com">hello@usmantahir.com</a>.
          </p>
        )}
        <button
          className="btn btn-primary"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send message"}{" "}
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </div>
  );
}
