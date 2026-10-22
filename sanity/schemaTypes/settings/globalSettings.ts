import { defineField, defineType } from "sanity";
import { Sliders } from "lucide-react";

export default defineType({
  name: "globalSettings",
  title: "Global Brand Settings",
  type: "document",
  icon: Sliders,
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      initialValue: "Sportmantle",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Global Site Description",
      type: "text",
      rows: 2,
      initialValue:
        "Raising a people for God in the sports industry, who will uphold righteousness and justice.",
    }),
    defineField({
      name: "logo",
      title: "Brand Logo (SVG or High-Res PNG)",
      type: "image",
    }),
    defineField({
      name: "favicon",
      title: "Browser Favicon",
      type: "image",
    }),
    defineField({
      name: "socialLinks",
      title: "Official Social Links",
      type: "object",
      fields: [
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "podcast", title: "Podcast URL", type: "url" }),
        defineField({ name: "youtube", title: "YouTube URL", type: "url" }),
        defineField({ name: "twitter", title: "X (Twitter) URL", type: "url" }),
      ],
    }),
    defineField({
      name: "copyrightText",
      title: "Footer Copyright Notice",
      type: "string",
      initialValue: "© 2026 Sportmantle. All rights reserved.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Global Brand Settings",
        subtitle: "Site identity, logo, and metadata",
        media: Sliders,
      };
    },
  },
});
