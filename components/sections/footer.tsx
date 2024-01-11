import React from "react";
import { groq } from "next-sanity";
import parsePhoneNumber from "libphonenumber-js";
import { executeQuery } from "@/sanity/sanity-utils";
import type { MetaData } from "@/types/MetaData";

export default async function Footer() {
  const meta = await executeQuery<MetaData>(groq`*[_type == "metadata"][0]{
    footerNote,
    phone,
    email,
  }`);

  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <p className="text-xs">{meta.footerNote}</p>
      <p className="text-xs">
        {meta.email} - {parsePhoneNumber(meta.phone)?.formatInternational()}
      </p>
    </footer>
  );
}
