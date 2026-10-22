import { defineField, defineType } from "sanity";
import { MousePointerClick } from "lucide-react";

export default defineType({
  name: "ctaButton",
  title: "CTA Button",
  type: "object",
  icon: MousePointerClick,
  fields: [
    defineField({
      name: "label",
      title: "Button Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Target Link / URL",
      type: "string",
      description: "Internal route (e.g., /contact, /projects) or external URL (https://...)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "style",
      title: "Visual Variant",
      type: "string",
      options: {
        list: [
          { title: "Primary Brand Blue", value: "primary" },
          { title: "Accent Orange", value: "orange" },
          { title: "Secondary Outline", value: "secondary" },
          { title: "Ghost / Subtle", value: "ghost" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
  },
});
