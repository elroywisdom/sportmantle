"use client";

import React from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { PortableTextLink } from "@/shared/components/ui/portable-text-link";
import { MediaEmbed } from "@/features/media/components/media-embed";

const sectionBodyComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-base sm:text-lg leading-relaxed text-white/80 my-4">
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl sm:text-3xl font-bold text-white mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl sm:text-2xl font-semibold text-white/95 mt-6 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-6 pl-6 border-l-4 border-[#1470AD] italic text-lg text-white/90">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: PortableTextLink,
  },
};

export function SectionRenderer({ section }: { section: any }) {
  if (!section) return null;

  const hasWidgets = section.contentBlocks && section.contentBlocks.length > 0;

  const headingColorClass =
    section.headingColor === "orange"
      ? "text-[#f4691a]"
      : section.headingColor === "blue"
      ? "text-[#1470AD]"
      : section.headingColor === "navy"
      ? "text-slate-200"
      : "text-white";

  return (
    <section className="my-16 max-w-4xl mx-auto px-4">
      {section.tagline && (
        <span className="text-xs uppercase tracking-widest font-bold text-[#1470AD] block mb-2">
          {section.tagline}
        </span>
      )}
      {section.heading && (
        <h2 className={`text-2xl sm:text-4xl font-bold tracking-tight mb-6 ${headingColorClass}`}>
          {section.heading}
        </h2>
      )}

      {hasWidgets ? (
        // DYNAMIC MODULAR WIDGETS PIPELINE
        section.contentBlocks.map((widget: any) => {
          switch (widget._type) {
            case "richTextWidget":
              return (
                <div key={widget._key} className="my-4">
                  <PortableText
                    value={widget.content}
                    components={sectionBodyComponents}
                  />
                </div>
              );

            case "mediaEmbedWidget":
              return (
                <MediaEmbed
                  key={widget._key}
                  url={widget.url}
                  caption={widget.caption}
                  aspectRatio={widget.aspectRatio}
                />
              );

            case "bulletsWidget":
              return (
                <ul
                  key={widget._key}
                  className="space-y-3 my-6 list-disc pl-6 text-white/80 text-base sm:text-lg"
                >
                  {widget.items?.map((item: string, i: number) => (
                    <li key={i} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              );

            case "statWidget":
              return (
                <div
                  key={widget._key}
                  className="my-8 p-6 sm:p-8 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row items-baseline gap-4"
                >
                  <span className="text-4xl sm:text-5xl font-black text-[#1470AD] tracking-tight">
                    {widget.value}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-white/80">
                    {widget.label}
                  </span>
                </div>
              );

            case "quoteWidget":
              return (
                <blockquote
                  key={widget._key}
                  className="my-8 pl-6 border-l-4 border-[#f4691a] italic text-lg sm:text-xl text-white/90"
                >
                  "{widget.quote}"
                  {widget.author && (
                    <cite className="block text-sm not-italic mt-3 font-semibold text-white/60">
                      — {widget.author} {widget.role ? `(${widget.role})` : ""}
                    </cite>
                  )}
                </blockquote>
              );

            case "buttonWidget":
              return (
                <div key={widget._key} className="my-8">
                  <a
                    href={widget.url}
                    className={`inline-block px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                      widget.variant === "orange"
                        ? "bg-[#f4691a] text-white hover:bg-[#e05809]"
                        : widget.variant === "outline"
                        ? "border border-white/20 text-white hover:bg-white/10"
                        : "bg-[#1470AD] text-white hover:bg-[#105a8b]"
                    }`}
                  >
                    {widget.text}
                  </a>
                </div>
              );

            case "galleryWidget":
              const galleryItems = widget.gallery?.items || [];
              return (
                <div key={widget._key} className="my-10 space-y-4">
                  {widget.gallery?.categoryTitle && (
                    <h4 className="text-lg font-semibold text-white/90">
                      {widget.gallery.categoryTitle}
                    </h4>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryItems.map((item: any, gIdx: number) => (
                      <div
                        key={item._key || gIdx}
                        className="relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 group"
                      >
                        {item.url && (
                          <Image
                            src={item.url}
                            alt={item.title || "Gallery photo"}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                        {item.title && (
                          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-xs text-white">
                            {item.title}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );

            case "tableWidget":
              return (
                <div
                  key={widget._key}
                  className="my-8 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]"
                >
                  {widget.title && (
                    <div className="bg-white/[0.05] px-5 py-3 border-b border-white/10 text-sm font-bold text-white">
                      {widget.title}
                    </div>
                  )}
                  <table className="w-full text-left text-sm">
                    {widget.hasHeaderRow && widget.rows?.[0] && (
                      <thead className="bg-white/[0.06] text-white border-b border-white/10">
                        <tr>
                          {widget.rows[0].cells?.map((cell: string, idx: number) => (
                            <th key={idx} className="px-5 py-3.5 font-semibold">
                              {cell}
                            </th>
                          ))}
                        </tr>
                      </thead>
                    )}
                    <tbody className="divide-y divide-white/5">
                      {(widget.hasHeaderRow ? widget.rows?.slice(1) : widget.rows)?.map(
                        (row: any, rIdx: number) => (
                          <tr key={row._key || rIdx} className="hover:bg-white/[0.03]">
                            {row.cells?.map((cell: string, cIdx: number) => (
                              <td key={cIdx} className="px-5 py-3.5 text-white/80">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              );

            default:
              return null;
          }
        })
      ) : (
        // DEFENSIVE LEGACY FALLBACK
        <>
          {section.body && (
            <div className="my-4">
              <PortableText
                value={section.body}
                components={sectionBodyComponents}
              />
            </div>
          )}
          {section.bullets && (
            <ul className="space-y-3 my-6 list-disc pl-6 text-white/80 text-base sm:text-lg">
              {section.bullets.map((item: string, i: number) => (
                <li key={i} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          )}
          {section.highlightStat?.value && (
            <div className="my-8 p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex items-baseline gap-4">
              <span className="text-4xl font-black text-[#1470AD]">
                {section.highlightStat.value}
              </span>
              <span className="text-sm font-medium text-white/80">
                {section.highlightStat.label}
              </span>
            </div>
          )}
          {section.buttonText && section.buttonLink && (
            <div className="my-8">
              <a
                href={section.buttonLink}
                className="inline-block px-7 py-3.5 rounded-xl bg-[#1470AD] text-white font-semibold hover:bg-[#105a8b] transition"
              >
                {section.buttonText}
              </a>
            </div>
          )}
        </>
      )}
    </section>
  );
}
