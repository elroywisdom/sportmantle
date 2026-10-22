"use client";

import React, { useState } from "react";
import {
  Eye,
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  Radio,
  ExternalLink,
} from "lucide-react";

type DeviceMode = "desktop" | "tablet" | "mobile";

export function ArticlePreviewPane({
  document,
  schemaType,
}: {
  document?: { displayed?: any; draft?: any; published?: any };
  schemaType?: { name?: string };
}) {
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [key, setKey] = useState<number>(0);

  const doc = document?.displayed || document?.draft || document?.published;
  const slug = doc?.slug?.current as string | undefined;
  const type = schemaType?.name || doc?._type || "project";

  if (!slug) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "40px",
          textAlign: "center",
          backgroundColor: "#0a1017",
          color: "#fff",
        }}
      >
        <Eye size={32} color="#1470AD" />
        <h2 style={{ fontSize: "18px", marginTop: "12px", fontWeight: 600 }}>
          Slug Required for Live Preview
        </h2>
        <p style={{ color: "#8b949e", fontSize: "14px", maxWidth: "340px", marginTop: "8px" }}>
          Please generate or enter a URL slug in the document form to render a live preview.
        </p>
      </div>
    );
  }

  const previewUrl =
    type === "project"
      ? `/api/draft-mode/enable?type=project&slug=${encodeURIComponent(slug)}`
      : `/api/draft-mode/enable?type=news&slug=${encodeURIComponent(slug)}`;

  const widths: Record<DeviceMode, string> = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#070d14",
      }}
    >
      {/* Viewport Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          backgroundColor: "#0d1824",
          borderBottom: "1px solid #1c2b3d",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {(["desktop", "tablet", "mobile"] as DeviceMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setDevice(mode)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                fontSize: "12px",
                fontWeight: 500,
                backgroundColor: device === mode ? "#1470AD" : "#141f2d",
                color: "#fff",
                border: "1px solid #223447",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {mode === "desktop" && <Monitor size={14} />}
              {mode === "tablet" && <Tablet size={14} />}
              {mode === "mobile" && <Smartphone size={14} />}
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
          <button
            onClick={() => setKey((k) => k + 1)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "6px 10px",
              fontSize: "12px",
              backgroundColor: "#141f2d",
              color: "#8b949e",
              border: "1px solid #223447",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            <RotateCw size={13} /> Refresh
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              fontWeight: 500,
              color: "#f59e0b",
              backgroundColor: "rgba(245, 158, 11, 0.15)",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
          >
            <Radio size={12} color="#f59e0b" /> Draft Mode Active
          </span>
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
              color: "#38bdf8",
              textDecoration: "none",
            }}
          >
            Open Window <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Frame Container */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          padding: device === "desktop" ? 0 : "24px",
          backgroundColor: "#050a10",
          overflow: "auto",
        }}
      >
        <iframe
          key={key}
          src={previewUrl}
          style={{
            width: widths[device],
            height: "100%",
            border: "none",
            borderRadius: device === "desktop" ? 0 : "12px",
            boxShadow:
              device === "desktop" ? "none" : "0 20px 40px rgba(0,0,0,0.5)",
          }}
        />
      </div>
    </div>
  );
}
