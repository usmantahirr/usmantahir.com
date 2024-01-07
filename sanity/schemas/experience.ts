import { defineField, defineType } from "sanity";

const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "institution",
      title: "Institution",
      type: "string",
    }),
    defineField({
      name: "from",
      title: "From",
      type: "date",
    }),
    defineField({
      name: "to",
      title: "To",
      type: "date",
    }),
    defineField({
      name: "position",
      title: "Position/Title",
      type: "date",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "technologies",
      title: "Tech",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});

export default experience;
