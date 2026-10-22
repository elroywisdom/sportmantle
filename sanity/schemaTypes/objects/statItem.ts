import { defineField, defineType } from "sanity";
import { BarChart3 } from "lucide-react";

export default defineType({
  name: "statItem",
  title: "Stat Item",
  type: "object",
  icon: BarChart3,
  fields: [
    defineField({
      name: "value",
      title: "Metric Value",
      type: "string",
      description: "e.g., '200+', '3+ Years', '12+ Academies'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Metric Label",
      type: "string",
      description: "e.g., 'Athletes Discipled', 'State Tournaments'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Brief Description",
      type: "string",
      description: "Optional explanatory note.",
    }),
  ],
  preview: {
    select: {
      value: "value",
      label: "label",
    },
    prepare({ value, label }) {
      return {
        title: value ? `${value} — ${label || ""}` : "Stat Item",
        subtitle: "Impact Metric",
        media: BarChart3,
      };
    },
  },
});
