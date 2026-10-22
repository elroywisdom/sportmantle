import type { DocumentActionComponent } from "sanity";
import { Eye } from "lucide-react";

export const PreviewArticleAction: DocumentActionComponent = (props) => {
  const { draft, published, type: documentType } = props;
  const doc = draft || published;
  const slug = (doc as any)?.slug?.current as string | undefined;

  const isProject = documentType === "project";
  const previewPath = isProject
    ? `/api/draft-mode/enable?type=project&slug=${encodeURIComponent(slug || "")}`
    : `/api/draft-mode/enable?type=news&slug=${encodeURIComponent(slug || "")}`;

  return {
    label: isProject ? "Preview Project" : "Preview Article",
    icon: Eye,
    title: slug
      ? "Open live preview in draft mode in a new tab"
      : "Please generate or enter a URL slug first to preview",
    disabled: !slug,
    onHandle: () => {
      if (slug) {
        window.open(previewPath, "_blank");
      }
    },
  };
};
