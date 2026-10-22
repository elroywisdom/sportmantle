import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Calendar, User, ArrowLeft, Share2, Tag, BookOpen } from "lucide-react";
import { getAllNewsArticles, getNewsArticleBySlug } from "@/sanity/lib/queries";
import { PortableTextLink } from "@/shared/components/ui/portable-text-link";
import { SectionRenderer } from "@/shared/components/ui/section-renderer";
import Footer from "@/features/home/components/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllNewsArticles();
  return (articles || []).map((article: any) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Sportmantle",
    };
  }

  return {
    title: `${article.title} | Sportmantle News & Insights`,
    description: article.excerpt || "Read this article on Sportmantle.",
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

export const revalidate = 60;

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const portableTextComponents = {
    marks: {
      link: PortableTextLink,
      textColor: ({ value, children }: any) => {
        const colorHex = value?.value || "#1470AD";
        return <span style={{ color: colorHex }}>{children}</span>;
      },
    },
    block: {
      h2: ({ children }: any) => (
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-12 mb-4 pt-4 border-t border-white/10">
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-xl md:text-2xl font-bold uppercase text-white mt-8 mb-3">
          {children}
        </h3>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-[#E30A0A] pl-6 my-8 italic text-lg md:text-xl text-white/90 bg-white/[0.02] py-4 pr-4">
          {children}
        </blockquote>
      ),
      normal: ({ children }: any) => (
        <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
          {children}
        </p>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc list-inside space-y-2 mb-6 text-white/80 pl-2">
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal list-inside space-y-2 mb-6 text-white/80 pl-2">
          {children}
        </ol>
      ),
    },
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref && !value?.asset?.url) return null;
        return (
          <figure className="my-10 overflow-hidden border border-white/10 bg-asphalt/60">
            <img
              src={value.asset?.url || ""}
              alt={value.alt || "Article illustration"}
              className="w-full h-auto object-cover max-h-[600px]"
            />
            {value.caption && (
              <figcaption className="p-3 text-xs text-muted-foreground bg-black/60 italic text-center">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
    },
  };

  return (
    <main className="min-h-screen bg-black text-pure-white pt-28 pb-20">
      <article className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="size-4 text-primary" /> Back to News & Insights
          </Link>
        </div>

        {/* Header Metadata */}
        <header className="space-y-6 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            {article.category && (
              <span className="px-3.5 py-1 bg-[#E30A0A] text-white text-xs font-black uppercase tracking-widest">
                {article.category}
              </span>
            )}
            {article.edition && (
              <span className="px-3.5 py-1 bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-wider">
                {article.edition}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-xl md:text-2xl text-muted-foreground font-normal leading-relaxed border-l-2 border-white/20 pl-4 py-1">
              {article.excerpt}
            </p>
          )}

          {/* Author & Date Bar */}
          <div className="flex items-center justify-between py-4 border-y border-white/10 text-xs text-muted-foreground uppercase tracking-wider">
            <div className="flex flex-wrap items-center gap-6">
              {article.author && (
                <span className="flex items-center gap-2 text-white">
                  <User className="size-4 text-primary" />
                  By {article.author}
                </span>
              )}
              {formattedDate && (
                <span className="flex items-center gap-2">
                  <Calendar className="size-4 text-primary" />
                  {formattedDate}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/40">Sportmantle Dispatch</span>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {article.coverImage && (
          <div className="relative aspect-[16/9] overflow-hidden border border-white/10 mb-12 bg-asphalt">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Main Body */}
        {article.body && (
          <div className="prose prose-invert prose-lg max-w-none mb-16">
            <PortableText value={article.body} components={portableTextComponents} />
          </div>
        )}

        {/* Modular Section Blocks (if populated) */}
        {article.contentSections && article.contentSections.length > 0 && (
          <div className="space-y-12 mb-16 pt-8 border-t border-white/10">
            {article.contentSections.map((section: any, idx: number) => (
              <SectionRenderer key={section._key || idx} section={section} />
            ))}
          </div>
        )}

        {/* Article Footer & Action */}
        <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-asphalt hover:bg-white/10 border border-white/15 text-white text-xs font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="size-4" /> All News & Insights
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#E30A0A] hover:bg-[#b80808] text-white text-xs font-bold uppercase tracking-wider transition-all"
          >
            Partner With Us
          </Link>
        </div>
      </article>

      <div className="mt-24">
        <Footer />
      </div>
    </main>
  );
}
