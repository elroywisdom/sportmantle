import { defineType, defineArrayMember } from "sanity";
import { Link2 } from "lucide-react";
import React from "react";

// Live in-editor visual preview of the link color
const LinkAnnotationPreview = ({ children, value }: any) => {
  const color = value?.color;
  const colorMap: Record<string, string> = {
    orange: "#f4691a",
    navy: "#001723",
    blue: "#1470AD",
    inherit: "inherit",
  };
  const activeColor = colorMap[color] || "#1470AD";

  return React.createElement(
    "span",
    {
      style: {
        color: activeColor,
        textDecoration: "underline",
        textUnderlineOffset: "3px",
        fontWeight: 500,
      },
    },
    children,
  );
};

export default defineType({
  name: "blockContent",
  title: "Rich Text Content",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            title: "URL Link",
            name: "link",
            type: "object",
            icon: Link2,
            components: {
              annotation: LinkAnnotationPreview,
            },
            fields: [
              {
                title: "URL / Path",
                name: "href",
                type: "string",
                description:
                  "Enter a full URL (https://...) or an internal path (e.g. /projects, /contact).",
                validation: (Rule: any) =>
                  Rule.required().custom((href: string) => {
                    if (!href) return "A URL or path is required";
                    if (
                      href.startsWith("/") ||
                      href.startsWith("#") ||
                      href.startsWith("mailto:") ||
                      href.startsWith("tel:") ||
                      href.startsWith("http://") ||
                      href.startsWith("https://")
                    ) {
                      return true;
                    }
                    return "Please enter a valid URL (starting with https://, http://, or / for internal links)";
                  }),
              },
              {
                title: "Link Color",
                name: "color",
                type: "string",
                description:
                  "Defaults to Brand Primary Blue automatically. Choose an accent color if needed.",
                initialValue: "blue",
                options: {
                  list: [
                    { title: "Brand Action Blue (Default)", value: "blue" },
                    { title: "Accent Orange", value: "orange" },
                    { title: "Deep Navy / Ink", value: "navy" },
                    {
                      title: "Inherit Body Color (Underline only)",
                      value: "inherit",
                    },
                  ],
                  layout: "radio",
                },
              },
              {
                title: "Open in New Window / Tab",
                name: "openInNewTab",
                type: "boolean",
                initialValue: false,
                description:
                  "Recommended for external links outside the domain.",
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      title: "Inline Image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alternative Text" },
        { name: "caption", type: "string", title: "Caption" },
      ],
    }),
  ],
});
