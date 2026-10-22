// Objects
import ctaButton from "./objects/ctaButton";
import galleryItem from "./objects/galleryItem";
import gallery from "./objects/gallery";
import statItem from "./objects/statItem";
import seo from "./objects/seo";
import blockContent from "./objects/blockContent";
import sectionBlock from "./objects/sectionBlock";

// Collections
import project from "./collections/project";
import newsArticle from "./collections/newsArticle";

// Pages (Singletons)
import homePage from "./pages/homePage";
import aboutPage from "./pages/aboutPage";
import impactPage from "./pages/impactPage";
import contactPage from "./pages/contactPage";

// Settings
import navigation from "./settings/navigation";
import globalSettings from "./settings/globalSettings";

export const schemaTypes = [
  // Objects
  ctaButton,
  galleryItem,
  gallery,
  statItem,
  seo,
  blockContent,
  sectionBlock,

  // Collections
  project,
  newsArticle,

  // Pages
  homePage,
  aboutPage,
  impactPage,
  contactPage,

  // Settings
  navigation,
  globalSettings,
];
