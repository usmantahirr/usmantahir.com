import { SchemaTypeDefinition } from "sanity";

const profile: SchemaTypeDefinition = {
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "intro",
      title: "Intro",
      type: "string",
    },
    {
      name: "about",
      title: "About",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "socials",
      title: "Socials",
      type: "document",
      fields: [
        {
          name: "linkedIn",
          title: "LinkedIn",
          type: "url",
        },
        {
          name: "github",
          title: "Github",
          type: "url",
        },
      ],
    },
    {
      name: "photo",
      type: 'image',
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: 'string',
        }
      ]
    },
    {
      name: "cv",
      title: "CV",
      type: "file",
    },
    {
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};

export default profile;
