import { defineField, defineType } from "sanity";
import { Search } from "lucide-react";

export default defineType({
  name: "seo",
  title: "SEO & Social Sharing",
  type: "object",
  icon: Search,
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Recommended under 60 characters for optimal search display.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Recommended between 50 and 160 characters.",
    }),
    defineField({
      name: "ogImage",
      title: "OpenGraph / Social Sharing Image",
      type: "image",
      options: { hotspot: true },
      description: "Shown when page is shared on Twitter/X, LinkedIn, Facebook, and WhatsApp (1200x630 recommended).",
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
});
