"use client";

import React from "react";

interface MediaEmbedProps {
  url?: string;
  caption?: string;
  aspectRatio?: "16:9" | "4:3" | "1:1" | "9:16" | string;
  className?: string;
}

const ASPECT_RATIO_CLASSES: Record<string, string> = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
  "9:16": "aspect-[9/16] max-w-sm mx-auto",
};

function getYouTubeEmbedUrl(rawUrl: string): string | null {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (parsed.pathname.startsWith("/shorts/")) {
      const id = parsed.pathname.split("/shorts/")[1]?.split("/")[0];
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (parsed.pathname.startsWith("/embed/")) {
      return rawUrl;
    }
    const id = parsed.searchParams.get("v");
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

function getVimeoEmbedUrl(rawUrl: string): string | null {
  try {
    const match = rawUrl.match(
      /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/,
    );
    return match?.[2] ? `https://player.vimeo.com/video/${match[2]}` : null;
  } catch {
    return null;
  }
}

export const MediaEmbed: React.FC<MediaEmbedProps> = ({
  url,
  caption,
  aspectRatio = "16:9",
  className = "",
}) => {
  if (!url) return null;

  const aspectClass =
    ASPECT_RATIO_CLASSES[aspectRatio] || ASPECT_RATIO_CLASSES["16:9"];
  const ytEmbed = getYouTubeEmbedUrl(url);
  const vimeoEmbed = getVimeoEmbedUrl(url);
  const isDirectVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

  return (
    <figure className={`w-full my-6 ${className}`}>
      <div
        className={`w-full overflow-hidden rounded-xl bg-black/20 relative shadow-sm ${aspectClass}`}
      >
        {ytEmbed ? (
          <iframe
            src={ytEmbed}
            title={caption || "Embedded Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0 absolute inset-0"
          />
        ) : vimeoEmbed ? (
          <iframe
            src={vimeoEmbed}
            title={caption || "Vimeo Video"}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0 absolute inset-0"
          />
        ) : isDirectVideo ? (
          <video src={url} controls className="w-full h-full object-cover" />
        ) : (
          <iframe
            src={url}
            title={caption || "Embedded Content"}
            className="w-full h-full border-0 absolute inset-0"
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-center text-slate-400 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
