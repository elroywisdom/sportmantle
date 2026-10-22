import { Metadata } from "next";
import { getAllNewsArticles } from "@/sanity/lib/queries";
import NewsListingClient from "@/features/news/components/NewsListingClient";
import Footer from "@/features/home/components/Footer";

export const metadata: Metadata = {
  title: "News & Insights | Sportmantle",
  description:
    "Official dispatches, athlete testimonies, and theological insights from the frontlines of sports discipleship worldwide.",
  openGraph: {
    title: "News & Insights | Sportmantle",
    description:
      "Stories of faith, honor, and purpose across the global sports industry.",
  },
};

export const revalidate = 60; // Revalidate every minute

export default async function NewsPage() {
  const articles = await getAllNewsArticles();

  return (
    <main className="flex flex-col min-h-screen bg-black">
      <NewsListingClient articles={articles} />
      <Footer />
    </main>
  );
}
