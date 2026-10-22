import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const type = searchParams.get("type");

  const draft = await draftMode();
  draft.enable();

  if (!slug) {
    redirect("/");
  }

  if (type === "news") {
    redirect(`/news-insights/${slug}`);
  }

  // Default to projects
  redirect(`/projects/${slug}`);
}
