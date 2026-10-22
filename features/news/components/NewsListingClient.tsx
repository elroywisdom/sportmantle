"use client";

import { useState, useMemo } from "react";
import NewsComingSoon from "./NewsComingSoon";
import NewsArticleCard from "./NewsArticleCard";
import type { NewsArticle } from "../types";

export default function NewsListingClient({
  articles,
}: {
  articles: NewsArticle[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // If no articles exist in Sanity CMS yet, display the beautiful Coming Soon state
  if (!articles || articles.length === 0) {
    return <NewsComingSoon />;
  }

  // Extract unique categories from articles
  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return ["All", ...Array.from(set)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "All") return articles;
    return articles.filter((a) => a.category === selectedCategory);
  }, [articles, selectedCategory]);

  const featuredArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  return (
    <div className="min-h-screen bg-black text-pure-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-[0.25em] text-[#E30A0A]">
            Official Dispatches
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
            NEWS & <span className="text-[#E30A0A] italic font-serif">INSIGHTS</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
            Journalism, testimonies, and theological reflections on the transformative power of Jesus Christ in sports.
          </p>
        </div>

        {/* Category Filter Tabs */}
        {categories.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#E30A0A] text-white"
                    : "bg-asphalt text-white/70 hover:text-white border border-white/5 hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Featured Story */}
        {featuredArticle && (
          <div className="mb-16">
            <NewsArticleCard article={featuredArticle} isFeatured={true} />
          </div>
        )}

        {/* Grid for Remaining Stories */}
        {gridArticles.length > 0 ? (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold uppercase tracking-wider text-white">
                More Articles & Features
              </h2>
              <span className="text-xs text-muted-foreground uppercase">
                {gridArticles.length} {gridArticles.length === 1 ? "Story" : "Stories"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridArticles.map((article) => (
                <NewsArticleCard key={article._id || article.slug} article={article} />
              ))}
            </div>
          </div>
        ) : filteredArticles.length === 1 ? null : (
          <div className="text-center py-16 border border-white/5 bg-asphalt/40">
            <p className="text-muted-foreground text-sm uppercase tracking-wider">
              No articles found under this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
