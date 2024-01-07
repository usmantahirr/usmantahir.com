import { type SchemaTypeDefinition } from "sanity";
import experience from "./schemas/experience";
import profile from "./schemas/profile";
import metadata from "./schemas/metadata";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [profile, experience, metadata],
};
