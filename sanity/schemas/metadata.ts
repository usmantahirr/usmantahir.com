import { defineField, defineType } from "sanity";
import { isValidPhoneNumber } from "libphonenumber-js";

const metadata = defineType({
  name: "metadata",
  title: "Meta Data",
  type: "document",
  fields: [
    defineField({
      name: "footerNote",
      title: "Footer Notes",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (Rule) =>
        Rule.custom((ph: string | undefined) => {
          if (ph && isValidPhoneNumber(ph)) {
            return true;
          }
          return "Invalid Phone number";
        }),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
    }),
  ],
});

export default metadata;
