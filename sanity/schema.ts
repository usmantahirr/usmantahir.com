import { type SchemaTypeDefinition } from "sanity";
import experience from "./schemas/experience-schema";
import profile from "./schemas/profile-schema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [profile, experience],
};
