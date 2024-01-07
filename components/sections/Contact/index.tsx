import { groq } from "next-sanity";
import { executeQuery } from "@/sanity/sanity-utils";
import type { MetaData } from "@/types/MetaData";
import ContactForm from './ContactForm';

export default async function Contact() {
  const metaData = await executeQuery<MetaData>(groq`*[_type == "metadata"][0]{
      email,
      phone,
    }`)

  return <ContactForm email={metaData.email} phone={metaData.phone}/>
}
