import { defineConfig, buildLegacyTheme } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import {
  Layers,
  FolderKanban,
  Newspaper,
  Settings,
  Compass,
  Sliders,
  Home,
  Building2,
  Sparkles,
  Mail,
  Eye,
} from "lucide-react";
import { schemaTypes } from "./sanity/schemaTypes";
import { ArticlePreviewPane } from "./sanity/components/article-preview-pane";
import { PreviewArticleAction } from "./sanity/actions/preview-article-action";

// Brand Theme matching Sportmantle design system tokens
const brandTheme = buildLegacyTheme({
  "--black": "#001723",
  "--white": "#FFFFFF",
  "--brand-primary": "#1470AD", // Primary Brand Accent
  "--main-navigation-color": "#001723",
  "--main-navigation-color--inverted": "#FFFFFF",
  "--focus-color": "#f4691a",
});

// Singletons that must never have more than 1 document instance
const SINGLETONS = [
  "homePage",
  "aboutPage",
  "impactPage",
  "contactPage",
  "navigation",
  "globalSettings",
];

const PAGE_SINGLETONS = [
  { id: "homePage", title: "Home Page", icon: Home },
  { id: "aboutPage", title: "About Us", icon: Building2 },
  { id: "impactPage", title: "Impact & Reach", icon: Sparkles },
  { id: "contactPage", title: "Contact Us", icon: Mail },
];

export default defineConfig({
  name: "default",
  title: "Sportmantle Content Studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "67gkfdi6",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  theme: brandTheme,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // 1. Pages Group (Singletons with Lucide Icons)
            S.listItem()
              .title("Pages")
              .icon(Layers)
              .child(
                S.list()
                  .title("Pages")
                  .items(
                    PAGE_SINGLETONS.map((page) =>
                      S.listItem()
                        .title(page.title)
                        .id(page.id)
                        .icon(page.icon)
                        .child(
                          S.document().schemaType(page.id).documentId(page.id),
                        ),
                    ),
                  ),
              ),

            S.divider(),

            // 2. Dynamic Collections (Repeatable Documents with Lucide Icons)
            S.documentTypeListItem("project")
              .title("Projects & Events")
              .icon(FolderKanban),
            S.documentTypeListItem("newsArticle")
              .title("News & Insights")
              .icon(Newspaper),

            S.divider(),

            // 3. Global Site Settings
            S.listItem()
              .title("Site Settings")
              .icon(Settings)
              .child(
                S.list()
                  .title("Site Settings")
                  .items([
                    S.listItem()
                      .title("Navigation Menus")
                      .id("navigation")
                      .icon(Compass)
                      .child(
                        S.document()
                          .schemaType("navigation")
                          .documentId("navigation"),
                      ),
                    S.listItem()
                      .title("Global Brand Settings")
                      .id("globalSettings")
                      .icon(Sliders)
                      .child(
                        S.document()
                          .schemaType("globalSettings")
                          .documentId("globalSettings"),
                      ),
                  ]),
              ),
          ]),

      // 4. Split-Pane Live Preview View
      defaultDocumentNode: (S, { schemaType }) => {
        if (schemaType === "newsArticle" || schemaType === "project") {
          return S.document().views([
            S.view.form(),
            S.view
              .component(ArticlePreviewPane)
              .title("Live Preview")
              .icon(Eye),
          ]);
        }
        return S.document().views([S.view.form()]);
      },
    }),
    visionTool(),
  ],

  // Prevent creating new instances of singletons via the (+) button
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },

  // Document actions: singleton protection + one-click live preview action
  document: {
    actions: (input, context) => {
      let actions = SINGLETONS.includes(context.schemaType)
        ? input.filter(
            ({ action }) => action && !["duplicate", "delete"].includes(action),
          )
        : input;

      if (
        context.schemaType === "newsArticle" ||
        context.schemaType === "project"
      ) {
        actions = [...actions, PreviewArticleAction];
      }

      return actions;
    },
  },
});
