import { SchemaTypeDefinition } from "sanity";

const experience: SchemaTypeDefinition = {
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    {
      name: "insitution",
      title: "Institution",
      type: "string",
    },
    {
      name: "from",
      title: "From",
      type: "date",
    },
    {
      name: "to",
      title: "To",
      type: "date",
    },
    {
      name: "position",
      title: "Position/Title",
      type: "date",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "technologies",
      title: "Tech",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};

export default experience;
