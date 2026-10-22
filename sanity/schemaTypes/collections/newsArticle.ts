import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "newsArticle",
  title: "News & Insights",
  type: "document",
  icon: Newspaper,
  fields: [
    defineField({
      name: "title",
      title: "Article Headline",
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
      name: "publishedAt",
      title: "Publication Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "edition",
      title: "Magazine Issue / Edition",
      type: "string",
      description: "e.g., 'Vol. 1 — March 2026'",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Magazine Feature", value: "Magazine Feature" },
          { title: "Exclusive Interview", value: "Exclusive Interview" },
          { title: "Faith & Purpose", value: "Faith & Purpose" },
          { title: "Tournament Highlight", value: "Tournament Highlight" },
          { title: "Community Impact", value: "Community Impact" },
          { title: "Visionary Profile", value: "Visionary Profile" },
        ],
      },
    }),
    defineField({
      name: "author",
      title: "Author / Speaker",
      type: "string",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt / Standfirst",
      type: "text",
      rows: 3,
      description: "Brief summary shown on cards and search results.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Article Content",
      type: "blockContent",
    }),
    defineField({
      name: "contentSections",
      title: "Modular Content Sections (Optional)",
      type: "array",
      of: [{ type: "sectionBlock" }],
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
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
