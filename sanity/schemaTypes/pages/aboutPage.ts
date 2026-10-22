import { defineField, defineType } from "sanity";
import { Building2 } from "lucide-react";

export default defineType({
  name: "aboutPage",
  title: "About Us",
  type: "document",
  icon: Building2,
  groups: [
    { name: "hero", title: "Hero" },
    { name: "mandate", title: "Mandate & Mission" },
    { name: "founder", title: "Founder's Message" },
    { name: "sections", title: "Page Sections" },
    { name: "seo", title: "SEO & Social" },
  ],
  fields: [
    // Hero
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      group: "hero",
      initialValue: "ABOUT SPORTMANTLE",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
      rows: 3,
      group: "hero",
      initialValue:
        "Learn about our mandate, our mission, and the story behind the mantle of grace.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Banner Image",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),

    // Mandate & Mission
    defineField({
      name: "mandateQuote",
      title: "Mandate Quote",
      type: "text",
      rows: 2,
      group: "mandate",
      initialValue:
        "Raise me a people in the sports industry, who will uphold righteousness and justice, through the route of discipleship.",
    }),
    defineField({
      name: "visionStatement",
      title: "Vision Statement",
      type: "text",
      rows: 2,
      group: "mandate",
      initialValue:
        "Raising a people for God in the sports industry, who would uphold righteousness and justice.",
    }),
    defineField({
      name: "missionPoints",
      title: "Mission Objectives",
      type: "array",
      of: [{ type: "string" }],
      group: "mandate",
    }),

    // Founder's Message
    defineField({
      name: "founderName",
      title: "Founder / Visionary Name",
      type: "string",
      group: "founder",
      initialValue: "Joshua Paul Dandaldi",
    }),
    defineField({
      name: "founderRole",
      title: "Founder Title / Role",
      type: "string",
      group: "founder",
      initialValue: "Visionary & Lead Servant, Sportmantle",
    }),
    defineField({
      name: "founderImage",
      title: "Founder Portrait",
      type: "image",
      options: { hotspot: true },
      group: "founder",
    }),
    defineField({
      name: "founderMessage",
      title: "Founder's Message",
      type: "blockContent",
      group: "founder",
    }),

    // Sections
    defineField({
      name: "sections",
      title: "Modular Content Sections",
      type: "array",
      of: [{ type: "sectionBlock" }],
      group: "sections",
    }),

    // SEO
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
        title: "About Us Page",
        subtitle: "About content configuration (/about)",
        media: Building2,
      };
    },
  },
});
