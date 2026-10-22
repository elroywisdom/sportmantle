import { defineField, defineType } from "sanity";
import { Home } from "lucide-react";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: Home,
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "pillars", title: "Mandate & Expressions" },
    { name: "stats", title: "Impact Stats" },
    { name: "sections", title: "Content Blocks" },
    { name: "seo", title: "SEO & Social" },
  ],
  fields: [
    // Hero Group
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      group: "hero",
      initialValue: "RAISING A PEOPLE FOR GOD IN THE SPORTS INDUSTRY",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
      rows: 3,
      group: "hero",
      initialValue:
        "Discipling athletes in the gospel of Jesus Christ, establishing righteousness and justice in the arenas of sports worldwide.",
    }),
    defineField({
      name: "heroSlides",
      title: "Hero Slideshow Images",
      type: "array",
      of: [{ type: "galleryItem" }],
      group: "hero",
    }),
    defineField({
      name: "heroCta",
      title: "Hero Primary Action Button",
      type: "ctaButton",
      group: "hero",
    }),

    // Pillars / Mandate
    defineField({
      name: "mandateQuote",
      title: "The Divine Mandate Quote",
      type: "text",
      rows: 2,
      group: "pillars",
      initialValue:
        "Raise me a people in the sports industry, who will uphold righteousness and justice, through the route of discipleship.",
    }),

    // Stats Group
    defineField({
      name: "impactStats",
      title: "Homepage Impact Statistics",
      type: "array",
      of: [{ type: "statItem" }],
      group: "stats",
    }),

    // Sections Group
    defineField({
      name: "featuredSections",
      title: "Page Content Blocks",
      type: "array",
      of: [{ type: "sectionBlock" }],
      group: "sections",
    }),

    // SEO Group
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
        title: "Home Page Content",
        subtitle: "Root page configuration (/)",
        media: Home,
      };
    },
  },
});
