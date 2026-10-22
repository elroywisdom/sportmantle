import { defineField, defineType } from "sanity";
import { Images } from "lucide-react";

export default defineType({
  name: "gallery",
  title: "Photo Gallery",
  type: "object",
  icon: Images,
  fields: [
    defineField({
      name: "categoryTitle",
      title: "Gallery Title / Category",
      type: "string",
      description: "Optional heading for this image collection (e.g. 'Matchday Highlights', 'Camp Reflections').",
    }),
    defineField({
      name: "description",
      title: "Gallery Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "items",
      title: "Gallery Photos",
      type: "array",
      of: [{ type: "galleryItem" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "categoryTitle",
      items: "items",
    },
    prepare({ title, items }) {
      const count = items?.length || 0;
      return {
        title: title || `${count} Photo${count === 1 ? "" : "s"} Gallery`,
        subtitle: `${count} image${count === 1 ? "" : "s"}`,
        media: Images,
      };
    },
  },
});
