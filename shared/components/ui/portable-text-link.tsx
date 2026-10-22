"use client";

import React from "react";
import Link from "next/link";

export interface PortableTextLinkProps {
  value?: {
    href?: string;
    color?: "blue" | "orange" | "navy" | "inherit" | string;
    openInNewTab?: boolean;
  };
  children?: React.ReactNode;
}

const COLOR_CLASSES: Record<string, string> = {
  blue: "text-[#1470AD] hover:text-[#f4691a] decoration-[#1470AD]/40 hover:decoration-[#f4691a]",
  orange: "text-[#f4691a] hover:text-[#1470AD] decoration-[#f4691a]/40 hover:decoration-[#1470AD]",
  navy: "text-[#001723] dark:text-white hover:text-[#1470AD] decoration-current/40 hover:decoration-[#1470AD]",
  inherit: "text-inherit hover:text-[#1470AD] decoration-current/40 hover:decoration-current",
};

export const PortableTextLink: React.FC<PortableTextLinkProps> = ({
  value,
  children,
}) => {
  const href = value?.href;
  if (!href) return <span>{children}</span>;

  const colorKey = value?.color || "blue";
  const colorClass = COLOR_CLASSES[colorKey] || COLOR_CLASSES.blue;
  const linkClassName = `inline font-medium underline underline-offset-4 decoration-1 hover:decoration-2 transition-colors duration-200 cursor-pointer ${colorClass}`;

  const isExternal =
    value?.openInNewTab ||
    href.startsWith("http://") ||
    href.startsWith("https://");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClassName}>
      {children}
    </Link>
  );
};
