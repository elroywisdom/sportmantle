import Link from "next/link";
import { Calendar, User, ArrowUpRight } from "lucide-react";
import type { NewsArticle } from "../types";

export default function NewsArticleCard({
  article,
  isFeatured = false,
}: {
  article: NewsArticle;
  isFeatured?: boolean;
}) {
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  if (isFeatured) {
    return (
      <article className="relative group bg-asphalt border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/30 grid grid-cols-1 lg:grid-cols-12">
        {/* Cover Image */}
        <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px] overflow-hidden bg-black/40">
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-asphalt to-black flex items-center justify-center text-white/30 font-bold uppercase tracking-wider">
              No Cover Image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-transparent opacity-80 lg:hidden" />
          
          {/* Badge */}
          <div className="absolute top-6 left-6 flex flex-wrap gap-2">
            {article.category && (
              <span className="px-3 py-1 bg-[#E30A0A] text-white text-[11px] font-black uppercase tracking-widest">
                {article.category}
              </span>
            )}
            {article.edition && (
              <span className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider">
                {article.edition}
              </span>
            )}
          </div>
        </div>

        {/* Text Content */}
        <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-wider">
              {formattedDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-primary" />
                  {formattedDate}
                </span>
              )}
              {article.author && (
                <span className="flex items-center gap-1.5">
                  <User className="size-3.5 text-primary" />
                  {article.author}
                </span>
              )}
            </div>

            <Link href={`/news/${article.slug}`} className="block group-hover:text-primary transition-colors">
              <h2 className="text-2xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                {article.title}
              </h2>
            </Link>

            {article.excerpt && (
              <p className="text-muted-foreground text-sm lg:text-base leading-relaxed line-clamp-4">
                {article.excerpt}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-white/10">
            <Link
              href={`/news/${article.slug}`}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-primary transition-colors"
            >
              Read Full Article <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-asphalt/60 border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Thumbnail */}
        <Link href={`/news/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-black/40">
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-asphalt to-black flex items-center justify-center text-white/30 text-xs font-bold uppercase">
              Sportmantle Story
            </div>
          )}
          {article.category && (
            <div className="absolute top-4 left-4">
              <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                {article.category}
              </span>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground uppercase tracking-wider">
            {formattedDate && <span>{formattedDate}</span>}
            {article.edition && (
              <>
                <span>•</span>
                <span className="text-primary">{article.edition}</span>
              </>
            )}
          </div>

          <Link href={`/news/${article.slug}`} className="block">
            <h3 className="text-xl font-bold uppercase text-white group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>
          </Link>

          {article.excerpt && (
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 pt-2">
        <Link
          href={`/news/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:text-primary transition-colors"
        >
          Read Story <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}
