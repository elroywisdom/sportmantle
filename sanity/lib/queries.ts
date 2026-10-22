import { client, isSanityConfigured } from "./client";

// =========================================
// REUSABLE GROQ PROJECTION FRAGMENTS
// =========================================

export const IMAGE_FIELDS = `{
  "src": asset->url,
  "alt": title,
  caption
}`;

export const GALLERY_FIELDS = `[]{
  "src": image.asset->url,
  "title": title,
  "caption": caption
}`;

export const CTA_FIELDS = `{
  label,
  href,
  style
}`;

export const SEO_FIELDS = `{
  metaTitle,
  metaDescription,
  "ogImage": ogImage.asset->url,
  keywords
}`;

export const SECTION_BLOCK_FIELDS = `{
  _key,
  tagline,
  heading,
  headingColor,
  contentBlocks[]{
    _key,
    _type,
    // richTextWidget
    content,
    // mediaEmbedWidget
    url,
    caption,
    aspectRatio,
    // bulletsWidget
    items,
    // statWidget
    value,
    label,
    // quoteWidget
    quote,
    author,
    role,
    // buttonWidget
    text,
    variant,
    // tableWidget
    title,
    hasHeaderRow,
    rows[]{
      _key,
      cells
    },
    // galleryWidget
    gallery{
      categoryTitle,
      items[]{
        _key,
        title,
        description,
        "url": image.asset->url
      }
    }
  },
  // Legacy monolithic fields for backward compatibility
  body,
  bullets,
  highlightStat,
  buttonText,
  buttonLink,
  gallery{
    categoryTitle,
    items[]{
      _key,
      title,
      description,
      "url": image.asset->url
    }
  }
}`;

// =========================================
// QUERIES
// =========================================

export async function getHomePage() {
  if (!isSanityConfigured) return null;

  const query = `*[_type == "homePage"][0] {
    heroHeadline,
    heroSubheadline,
    "heroSlides": heroSlides${GALLERY_FIELDS},
    heroCta${CTA_FIELDS},
    mandateQuote,
    impactStats[]{
      value,
      label,
      description
    },
    featuredSections[]${SECTION_BLOCK_FIELDS},
    seo${SEO_FIELDS}
  }`;

  try {
    return await client.fetch(query, {}, { next: { tags: ["homePage"] } });
  } catch (error) {
    console.error("Failed to fetch home page from Sanity:", error);
    return null;
  }
}

export async function getAboutPage() {
  if (!isSanityConfigured) return null;

  const query = `*[_type == "aboutPage"][0] {
    heroHeadline,
    heroSubheadline,
    "heroImage": heroImage.asset->url,
    mandateQuote,
    visionStatement,
    missionPoints,
    founderName,
    founderRole,
    "founderImage": founderImage.asset->url,
    founderMessage,
    sections[]${SECTION_BLOCK_FIELDS},
    seo${SEO_FIELDS}
  }`;

  try {
    return await client.fetch(query, {}, { next: { tags: ["aboutPage"] } });
  } catch (error) {
    console.error("Failed to fetch about page from Sanity:", error);
    return null;
  }
}

export async function getImpactPage() {
  if (!isSanityConfigured) return null;

  const query = `*[_type == "impactPage"][0] {
    heroHeadline,
    heroSubheadline,
    "heroImage": heroImage.asset->url,
    metrics[]{
      value,
      label,
      description
    },
    sections[]${SECTION_BLOCK_FIELDS},
    seo${SEO_FIELDS}
  }`;

  try {
    return await client.fetch(query, {}, { next: { tags: ["impactPage"] } });
  } catch (error) {
    console.error("Failed to fetch impact page from Sanity:", error);
    return null;
  }
}

export async function getContactPage() {
  if (!isSanityConfigured) return null;

  const query = `*[_type == "contactPage"][0] {
    headline,
    subheadline,
    email,
    phone,
    phoneTel,
    address,
    instagramUrl,
    podcastUrl,
    seo${SEO_FIELDS}
  }`;

  try {
    return await client.fetch(query, {}, { next: { tags: ["contactPage"] } });
  } catch (error) {
    console.error("Failed to fetch contact page from Sanity:", error);
    return null;
  }
}

export async function getNavigation() {
  if (!isSanityConfigured) return null;

  const query = `*[_type == "navigation"][0] {
    headerLinks[]{ label, href },
    headerCta${CTA_FIELDS},
    footerLinks[]{ label, href }
  }`;

  try {
    return await client.fetch(query, {}, { next: { tags: ["navigation"] } });
  } catch (error) {
    console.error("Failed to fetch navigation from Sanity:", error);
    return null;
  }
}

export async function getGlobalSettings() {
  if (!isSanityConfigured) return null;

  const query = `*[_type == "globalSettings"][0] {
    siteTitle,
    siteDescription,
    "logo": logo.asset->url,
    "favicon": favicon.asset->url,
    socialLinks,
    copyrightText
  }`;

  try {
    return await client.fetch(query, {}, { next: { tags: ["globalSettings"] } });
  } catch (error) {
    console.error("Failed to fetch global settings from Sanity:", error);
    return null;
  }
}

export async function getAllProjects() {
  if (!isSanityConfigured) return [];

  const query = `*[_type == "project" && !(_id in path("drafts.**"))] | order(date desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    date,
    year,
    tags,
    "coverImage": coverImage.asset->url,
    "image": coverImage.asset->url,
    "gallery": gallery[] {
      "src": image.asset->url,
      title,
      caption
    },
    description,
    fullStory,
    featuredQuote,
    details,
    titleColor,
    contentSections[]${SECTION_BLOCK_FIELDS}
  }`;

  try {
    return await client.fetch(query, {}, { next: { tags: ["project"] } });
  } catch (error) {
    console.error("Failed to fetch projects from Sanity:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  if (!isSanityConfigured) return null;

  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    date,
    year,
    tags,
    "coverImage": coverImage.asset->url,
    "image": coverImage.asset->url,
    "gallery": gallery[] {
      "src": image.asset->url,
      title,
      caption
    },
    description,
    fullStory,
    featuredQuote,
    details,
    titleColor,
    contentSections[]${SECTION_BLOCK_FIELDS}
  }`;

  try {
    return await client.fetch(query, { slug }, { next: { tags: [`project:${slug}`] } });
  } catch (error) {
    console.error(`Failed to fetch project ${slug} from Sanity:`, error);
    return null;
  }
}

export async function getAllNewsArticles() {
  if (!isSanityConfigured) return [];

  const query = `*[_type == "newsArticle" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    edition,
    category,
    author,
    "coverImage": coverImage.asset->url,
    excerpt,
    body,
    contentSections[]${SECTION_BLOCK_FIELDS},
    seo${SEO_FIELDS}
  }`;

  try {
    return await client.fetch(query, {}, { next: { tags: ["newsArticle"] } });
  } catch (error) {
    console.error("Failed to fetch news articles from Sanity:", error);
    return [];
  }
}

export async function getNewsArticleBySlug(slug: string) {
  if (!isSanityConfigured) return null;

  const query = `*[_type == "newsArticle" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    edition,
    category,
    author,
    "coverImage": coverImage.asset->url,
    excerpt,
    body,
    contentSections[]${SECTION_BLOCK_FIELDS},
    seo${SEO_FIELDS}
  }`;

  try {
    return await client.fetch(query, { slug }, { next: { tags: [`newsArticle:${slug}`] } });
  } catch (error) {
    console.error(`Failed to fetch news article ${slug} from Sanity:`, error);
    return null;
  }
}
