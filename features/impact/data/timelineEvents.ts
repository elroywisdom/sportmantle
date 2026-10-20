import { allProjects, Project } from "@/shared/data/projects";

export interface TimelineEvent {
  id: string;
  slug: string;
  index: number;
  date: string;
  year: string;
  timestamp: string;
  timeLabel: string;
  secondCount: number;
  title: string;
  location: string;
  details: string;
  image: string;
  gallery: string[];
  tag: string;
  category: string;
  attendance?: string;
  impact?: string;
}

/**
 * Parses project date into a valid JavaScript Date object.
 * Supports:
 * - "MM.DD.YY" (e.g., "03.14.26")
 * - "YYYY-MM-DD" (standard ISO CMS dates)
 * - Fallback to year string
 */
export function parseProjectDate(dateStr: string, yearStr?: string): Date {
  if (!dateStr && yearStr) {
    const yr = parseInt(yearStr, 10);
    return isNaN(yr) ? new Date() : new Date(yr, 0, 1);
  }

  if (!dateStr) return new Date();

  // Standard ISO format (YYYY-MM-DD)
  if (dateStr.includes("-")) {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) return parsed;
  }

  // Dot, slash, or dash format (MM.DD.YY or MM/DD/YYYY)
  const parts = dateStr.split(/[./-]/);
  if (parts.length === 3) {
    const month = parseInt(parts[0], 10) - 1;
    const day = parseInt(parts[1], 10);
    let year = parseInt(parts[2], 10);
    if (year < 100) {
      year += 2000;
    }
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) return d;
  }

  // Fallback to year string
  if (yearStr) {
    const yr = parseInt(yearStr, 10);
    if (!isNaN(yr)) return new Date(yr, 0, 1);
  }

  return new Date();
}

/**
 * Formats a Date object into human-readable format e.g. "March 2025" or "Feb 5, 2024"
 */
export function formatDisplayDate(date: Date, rawDateStr?: string, yearStr?: string): string {
  if (isNaN(date.getTime())) {
    return yearStr || rawDateStr || "Ongoing";
  }

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Generates dynamic stopwatch timestamp string for an index:
 * e.g., index 0 -> "00:00:00", index 1 -> "01:15:00", index 2 -> "02:30:00"
 */
export function generateStopwatchTimestamp(index: number, total: number): {
  timestamp: string;
  timeLabel: string;
  secondCount: number;
} {
  // Interval step of 1 hour 15 minutes (4500 seconds)
  const totalSeconds = index * 4500;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");
  const timestamp = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  // Convert to 12-hour clock label (e.g., 12:00 AM, 01:15 AM, ...)
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  const ampm = hours >= 12 && hours < 24 ? "PM" : "AM";
  const timeLabel = `${pad(displayHour)}:${pad(minutes)} ${ampm}`;

  return {
    timestamp,
    timeLabel,
    secondCount: totalSeconds,
  };
}

/**
 * CMS-Ready Transformer:
 * Takes any list of projects (from local file or headless CMS API)
 * and automatically sorts, parses, and converts them into stopwatch timeline events.
 */
export function getTimelineEventsFromProjects(projects: Project[]): TimelineEvent[] {
  // 1. Sort projects chronologically (earliest first)
  const sorted = [...projects].sort((a, b) => {
    const dateA = parseProjectDate(a.date, a.year).getTime();
    const dateB = parseProjectDate(b.date, b.year).getTime();
    return dateA - dateB;
  });

  // 2. Map into structured TimelineEvent objects
  return sorted.map((project, idx) => {
    const parsedDate = parseProjectDate(project.date, project.year);
    const displayDate = formatDisplayDate(parsedDate, project.date, project.year);
    const chrono = generateStopwatchTimestamp(idx, sorted.length);

    return {
      id: `project-${project.id}-${project.slug}`,
      slug: project.slug,
      index: idx,
      date: displayDate,
      year: project.year,
      timestamp: chrono.timestamp,
      timeLabel: chrono.timeLabel,
      secondCount: chrono.secondCount,
      title: project.title,
      location: project.details?.location || "Nigeria",
      details: project.description,
      image: project.image,
      gallery: project.gallery || [project.image],
      tag: project.tags?.[0] || project.category || "Mission",
      category: project.category,
      attendance: project.details?.attendance,
      impact: project.details?.impact,
    };
  });
}

// Automatically derived from the projects repository.
// When a CMS is connected, pass CMS fetched projects directly to getTimelineEventsFromProjects!
export const TIMELINE_EVENTS: TimelineEvent[] = getTimelineEventsFromProjects(allProjects);
