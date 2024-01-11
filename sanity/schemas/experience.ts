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
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Education", value: "education" },
          { title: "Work", value: "work" },
        ],
      },
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
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
