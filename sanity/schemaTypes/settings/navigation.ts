import { defineField, defineType, defineArrayMember } from "sanity";
import { Compass } from "lucide-react";

export default defineType({
  name: "navigation",
  title: "Navigation Menus",
  type: "document",
  icon: Compass,
  fields: [
    defineField({
      name: "headerLinks",
      title: "Header Navigation Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Path / URL", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        }),
      ],
    }),
    defineField({
      name: "headerCta",
      title: "Header Action Button (CTA)",
      type: "ctaButton",
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Quick Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Path / URL", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Navigation Menus",
        subtitle: "Header and Footer link configurations",
        media: Compass,
      };
    },
  },
});
