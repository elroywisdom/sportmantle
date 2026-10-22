import { defineField, defineType } from "sanity";
import { Mail } from "lucide-react";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: Mail,
  groups: [
    { name: "header", title: "Header Content" },
    { name: "info", title: "Contact Details" },
    { name: "seo", title: "SEO & Social" },
  ],
  fields: [
    defineField({
      name: "headline",
      title: "Page Headline",
      type: "string",
      group: "header",
      initialValue: "GET IN TOUCH",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline / Introduction",
      type: "text",
      rows: 3,
      group: "header",
      initialValue:
        "Whether you're an athlete seeking discipleship, an organization looking to partner, or an intercessor standing in the gap — we want to hear from you.",
    }),
    defineField({
      name: "email",
      title: "Direct Email Address",
      type: "string",
      group: "info",
      initialValue: "info@sportmantle.com",
    }),
    defineField({
      name: "phone",
      title: "Display Phone Number",
      type: "string",
      group: "info",
      initialValue: "0704 284 4943",
    }),
    defineField({
      name: "phoneTel",
      title: "Dialable Phone Number (tel: format)",
      type: "string",
      group: "info",
      initialValue: "+2347042844943",
    }),
    defineField({
      name: "address",
      title: "Physical Location / Office Address",
      type: "string",
      group: "info",
      initialValue: "Abuja, FCT, Nigeria",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "info",
      initialValue: "https://www.instagram.com/sportmantle/",
    }),
    defineField({
      name: "podcastUrl",
      title: "Podcast URL (The Blessed Athlete)",
      type: "url",
      group: "info",
      initialValue:
        "https://podcasts.apple.com/ng/podcast/theblessedathelete/id1839654574",
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
        title: "Contact Page",
        subtitle: "Contact info & header (/contact)",
        media: Mail,
      };
    },
  },
});
