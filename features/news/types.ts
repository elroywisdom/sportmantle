export interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  edition?: string;
  category?: string;
  author?: string;
  coverImage?: string;
  excerpt?: string;
  body?: any;
  contentSections?: any[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    keywords?: string[];
  };
}
