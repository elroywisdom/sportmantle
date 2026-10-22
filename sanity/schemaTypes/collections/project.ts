import { defineField, defineType } from "sanity";
import { FolderKanban } from "lucide-react";

export default defineType({
  name: "project",
  title: "Projects & Events",
  type: "document",
  icon: FolderKanban,
  fields: [
    defineField({
      name: "title",
      title: "Project / Event Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Prayer", value: "Prayer" },
          { title: "Outreach", value: "Outreach" },
          { title: "Camps", value: "Camps" },
          { title: "Conference", value: "Conference" },
          { title: "Tournament", value: "Tournament" },
          { title: "Meeting", value: "Meeting" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date (e.g. 09.26.26 or Display Date)",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      options: {
        list: ["2023", "2024", "2025", "2026", "2027"],
      },
      initialValue: "2026",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Event Gallery Photos",
      type: "array",
      of: [{ type: "galleryItem" }],
    }),
    defineField({
      name: "description",
      title: "Overview Description / Short Summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fullStory",
      title: "Full Story / Narrative",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "featuredQuote",
      title: "Featured Quote",
      type: "string",
    }),
    defineField({
      name: "details",
      title: "Project Key Details",
      type: "object",
      fields: [
        defineField({ name: "location", title: "Location", type: "string" }),
        defineField({ name: "attendance", title: "Attendance", type: "string" }),
        defineField({ name: "impact", title: "Impact Summary", type: "string" }),
        defineField({ name: "partners", title: "Partners / Hosts", type: "string" }),
      ],
    }),
    defineField({
      name: "titleColor",
      title: "Title Accent Color",
      type: "string",
      initialValue: "text-white",
      options: {
        list: [
          { title: "White", value: "text-white" },
          { title: "Red Accent (#E30A0A)", value: "text-[#E30A0A]" },
          { title: "Brand Blue (#1470AD)", value: "text-[#1470AD]" },
          { title: "Accent Orange (#f4691a)", value: "text-[#f4691a]" },
        ],
      },
    }),
    defineField({
      name: "contentSections",
      title: "Modular Content Sections (Optional Advanced Layout)",
      type: "array",
      of: [{ type: "sectionBlock" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
