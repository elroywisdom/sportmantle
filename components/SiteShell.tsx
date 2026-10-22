"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/shared/components/Navbar";
import SmoothScroll from "@/shared/components/SmoothScroll";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  // In Studio routes, do not render website navbar, noise overlay, or Lenis smooth-scroll
  // This allows Sanity Studio's multi-pane scroll containers to receive native wheel events
  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="noise-overlay" />
      <Navbar />
      <SmoothScroll>{children}</SmoothScroll>
    </>
  );
}
