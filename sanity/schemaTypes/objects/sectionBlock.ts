import { defineField, defineType, defineArrayMember } from "sanity";
import {
  FileText,
  Video,
  List,
  BarChart3,
  Quote,
  Images,
  MousePointerClick,
  Table,
  Layers,
} from "lucide-react";

export default defineType({
  name: "sectionBlock",
  title: "Content Section Block",
  type: "object",
  icon: Layers,
  description:
    "A content section with an anchor heading and custom drag-and-drop content widgets.",
  fieldsets: [
    {
      name: "legacy",
      title: "Legacy Fields (Previous Monolithic Format)",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "tagline",
      title: "Section Tagline / Eyebrow",
      type: "string",
      description:
        'Small uppercase category or topic label above the heading, e.g. "MINISTRY MANDATE".',
    }),
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingColor",
      title: "Heading Style Accent",
      type: "string",
      options: {
        list: [
          { title: "Standard White / Neutral", value: "white" },
          { title: "Deep Navy / Ink", value: "navy" },
          { title: "Accent Blue", value: "blue" },
          { title: "Accent Orange", value: "orange" },
        ],
      },
      initialValue: "white",
    }),
    defineField({
      name: "contentBlocks",
      title: "Content Widgets",
      type: "array",
      description:
        'Click "Add item" to insert only the widgets needed. Drag to reorder widgets freely.',
      of: [
        // 1. Rich Text Paragraph
        defineArrayMember({
          name: "richTextWidget",
          title: "Paragraph / Rich Text",
          type: "object",
          icon: FileText,
          fields: [
            defineField({
              name: "content",
              title: "Text Content",
              type: "blockContent",
            }),
          ],
          preview: {
            select: { content: "content" },
            prepare({ content }) {
              const firstBlock = Array.isArray(content)
                ? content.find((b: any) => b._type === "block")
                : null;
              const text =
                firstBlock?.children?.map((c: any) => c.text).join("") ||
                "Empty paragraph";
              return {
                title: text.length > 55 ? `${text.slice(0, 55)}...` : text,
                subtitle: "Paragraph / Rich Text",
                media: FileText,
              };
            },
          },
        }),

        // 2. Responsive Media Embed (YouTube, Vimeo, MP4, Social)
        defineArrayMember({
          name: "mediaEmbedWidget",
          title: "Media Embed (YouTube / Vimeo / MP4)",
          type: "object",
          icon: Video,
          fields: [
            defineField({
              name: "url",
              title: "Media URL",
              type: "url",
              description:
                "YouTube (standard or Shorts), Vimeo, or direct MP4/WebM video URL.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption / Label",
              type: "string",
            }),
            defineField({
              name: "aspectRatio",
              title: "Aspect Ratio",
              type: "string",
              initialValue: "16:9",
              options: {
                list: [
                  { title: "16:9 (Standard Video / YouTube)", value: "16:9" },
                  { title: "4:3 (Classic Video)", value: "4:3" },
                  { title: "1:1 (Square / Social)", value: "1:1" },
                  { title: "9:16 (Vertical / Shorts / Reels)", value: "9:16" },
                ],
              },
            }),
          ],
          preview: {
            select: { url: "url", caption: "caption" },
            prepare({ url, caption }) {
              return {
                title: caption || url || "Media Embed",
                subtitle: url ? `Embed • ${url}` : "Media Embed",
                media: Video,
              };
            },
          },
        }),

        // 3. Bullet Points List
        defineArrayMember({
          name: "bulletsWidget",
          title: "Bullet Points List",
          type: "object",
          icon: List,
          fields: [
            defineField({
              name: "items",
              title: "Bullet Points",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { items: "items" },
            prepare({ items }) {
              const count = items?.length || 0;
              const first = items?.[0] || "Empty list";
              return {
                title: `${count} Bullet Point${count === 1 ? "" : "s"}`,
                subtitle:
                  first.length > 50 ? `${first.slice(0, 50)}...` : first,
                media: List,
              };
            },
          },
        }),

        // 4. Highlight Stat Metric
        defineArrayMember({
          name: "statWidget",
          title: "Highlight Stat Metric",
          type: "object",
          icon: BarChart3,
          fields: [
            defineField({
              name: "value",
              title: 'Metric Value (e.g. 200+, 12+, 99%)',
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Metric Label / Description",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { value: "value", label: "label" },
            prepare({ value, label }) {
              return {
                title: value ? `${value} — ${label || ""}` : "Highlight Stat",
                subtitle: "Metric Callout",
                media: BarChart3,
              };
            },
          },
        }),

        // 5. Quote / Key Takeaway
        defineArrayMember({
          name: "quoteWidget",
          title: "Quote / Key Takeaway",
          type: "object",
          icon: Quote,
          fields: [
            defineField({
              name: "quote",
              title: "Quote or Key Takeaway Text",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "author",
              title: "Quoted Person / Source",
              type: "string",
            }),
            defineField({
              name: "role",
              title: "Role / Title",
              type: "string",
            }),
          ],
          preview: {
            select: { quote: "quote", author: "author" },
            prepare({ quote, author }) {
              return {
                title: quote ? `"${quote.slice(0, 45)}..."` : "Quote Callout",
                subtitle: author ? `Quote • ${author}` : "Quote Callout",
                media: Quote,
              };
            },
          },
        }),

        // 6. Photo Gallery Grid
        defineArrayMember({
          name: "galleryWidget",
          title: "Photo Gallery Grid",
          type: "object",
          icon: Images,
          fields: [
            defineField({
              name: "gallery",
              title: "Section Photos",
              type: "gallery",
            }),
          ],
          preview: {
            select: { gallery: "gallery" },
            prepare({ gallery }) {
              const count = gallery?.items?.length || 0;
              return {
                title: `${count} Photo${count === 1 ? "" : "s"} Gallery`,
                subtitle: "Photo Gallery Grid",
                media: Images,
              };
            },
          },
        }),

        // 7. Action Button / Link
        defineArrayMember({
          name: "buttonWidget",
          title: "Action Button / Link",
          type: "object",
          icon: MousePointerClick,
          fields: [
            defineField({
              name: "text",
              title: "Button Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "Link URL",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "variant",
              title: "Button Style",
              type: "string",
              initialValue: "primary",
              options: {
                list: [
                  { title: "Primary Brand Blue", value: "primary" },
                  { title: "Accent Orange", value: "orange" },
                  { title: "Outline Neutral", value: "outline" },
                ],
              },
            }),
          ],
          preview: {
            select: { text: "text", url: "url" },
            prepare({ text, url }) {
              return {
                title: text || "Action Button",
                subtitle: url ? `Button • ${url}` : "Action Button",
                media: MousePointerClick,
              };
            },
          },
        }),

        // 8. Data / Specs Table
        defineArrayMember({
          name: "tableWidget",
          title: "Data / Specs Table",
          type: "object",
          icon: Table,
          fields: [
            defineField({
              name: "title",
              title: "Table Title / Caption",
              type: "string",
            }),
            defineField({
              name: "hasHeaderRow",
              title: "First Row is Header",
              type: "boolean",
              initialValue: true,
            }),
            defineField({
              name: "rows",
              title: "Table Rows",
              type: "array",
              of: [
                defineArrayMember({
                  name: "tableRow",
                  type: "object",
                  fields: [
                    defineField({
                      name: "cells",
                      type: "array",
                      of: [{ type: "string" }],
                    }),
                  ],
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "title", rows: "rows" },
            prepare({ title, rows }) {
              const rowCount = rows?.length || 0;
              const colCount = rows?.[0]?.cells?.length || 0;
              return {
                title: title || `${rowCount} Row${rowCount === 1 ? "" : "s"} Table`,
                subtitle: `Table • ${rowCount} rows × ${colCount} cols`,
                media: Table,
              };
            },
          },
        }),
      ],
    }),

    // Legacy fields preserved under a collapsible fieldset for 100% backward compatibility
    defineField({
      name: "body",
      title: "Body Paragraphs (Legacy)",
      type: "blockContent",
      fieldset: "legacy",
    }),
    defineField({
      name: "bullets",
      title: "Bullet Points (Legacy)",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "legacy",
    }),
    defineField({
      name: "highlightStat",
      title: "Highlight Stat (Legacy)",
      type: "object",
      fieldset: "legacy",
      fields: [
        defineField({ name: "value", title: "Metric Value", type: "string" }),
        defineField({ name: "label", title: "Metric Label", type: "string" }),
      ],
    }),
    defineField({
      name: "buttonText",
      title: "Button Label (Legacy)",
      type: "string",
      fieldset: "legacy",
    }),
    defineField({
      name: "buttonLink",
      title: "Button Link (Legacy)",
      type: "string",
      fieldset: "legacy",
    }),
    defineField({
      name: "gallery",
      title: "Photo Gallery (Legacy)",
      type: "gallery",
      fieldset: "legacy",
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "tagline" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Content Section",
        subtitle: subtitle ? `Section • ${subtitle}` : "Content Block",
        media: Layers,
      };
    },
  },
});
