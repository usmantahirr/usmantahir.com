"use client";

import React from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import parsePhoneNumber from "libphonenumber-js";

import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SectionHeading from "@/components/SectionHeading";
import SubmitBtn from "@/components/form/submit-btn";

export default function ContactForm({ email, phone }: { email: string; phone: string }) {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 w-[min(100%,50rem)] text-center sm:mb-28"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className="-mt-6 text-gray-700 dark:text-white/80">
        Please contact me directly at&nbsp;
        <a className="underline" href={`tel:${phone}`}>
          {parsePhoneNumber(phone)?.formatNational()}
        </a>{" "}
        or{" "}
        <a className="underline" href={`mailto:${email}`}>
          {email}
        </a>{" "}
        or through this form.
        <span className="text-xs">&nbsp;(Text before call)</span>
      </p>

      <form
        className="mt-10 flex flex-col dark:text-black"
        action={async (formData) => {
          const { data, error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success("Email sent successfully!");
        }}
      >
        <input
          className="borderBlack h-14 rounded-lg px-4 transition-all dark:bg-white dark:bg-opacity-80 dark:outline-none dark:focus:bg-opacity-100"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          className="borderBlack my-3 h-52 rounded-lg p-4 transition-all dark:bg-white dark:bg-opacity-80 dark:outline-none dark:focus:bg-opacity-100"
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
        />
        <SubmitBtn />
      </form>
    </motion.section>
  );
}
