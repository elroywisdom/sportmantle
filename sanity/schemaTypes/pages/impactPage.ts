import { defineField, defineType } from "sanity";
import { Sparkles } from "lucide-react";

export default defineType({
  name: "impactPage",
  title: "Impact Page",
  type: "document",
  icon: Sparkles,
  groups: [
    { name: "hero", title: "Hero" },
    { name: "metrics", title: "Metrics & Reach" },
    { name: "sections", title: "Stories & Sections" },
    { name: "seo", title: "SEO & Social" },
  ],
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero Headline Line 1",
      type: "string",
      group: "hero",
      initialValue: "DIVINE FOOTPRINTS",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
      rows: 3,
      group: "hero",
      initialValue:
        "Over 3 years of outreaches, meetings, and tournaments, raising a generation of athletes who uphold righteousness and justice.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    defineField({
      name: "metrics",
      title: "Impact Metrics / Key Numbers",
      type: "array",
      of: [{ type: "statItem" }],
      group: "metrics",
    }),
    defineField({
      name: "sections",
      title: "Content Blocks & Success Stories",
      type: "array",
      of: [{ type: "sectionBlock" }],
      group: "sections",
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Impact Page",
        subtitle: "Impact & metrics configuration (/impact)",
        media: Sparkles,
      };
    },
  },
});
