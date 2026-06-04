# Sportmantle Website

The official web platform for **Sportmantle** — a faith-centered, purpose-driven sports discipleship movement.

> **The Mandate:** *"Raise me a people in the sports industry, who will uphold righteousness and justice, through the route of discipleship."*

---

## 📖 About Sportmantle

Sportmantle exists to disciple young athletes (ages 5 to 25) in the gospel of Jesus Christ, equipping them with the right knowledge of God, their identity, and their purpose. Over the last 3+ years, the organization has held meetings, outreaches, and football tournaments in Abuja, Kaduna, and surrounding states, discipling over 200+ boys and raising up leaders in the sports industry.

---

## 🛠️ Technology Stack

- **Core Framework:** Next.js (App Router) & React
- **Styling:** Tailwind CSS (v4) & Vanilla CSS Modules
- **Animations:** GSAP (GreenSock Animation Platform) & ScrollTrigger
- **Iconography:** Lucide React
- **Language:** TypeScript

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

1. **Clone the Repository:**
   ```bash
   git clone git@github.com:elroywisdom/sportmantle.git
   cd sportmantle-website
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

4. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 📂 Folder Structure

The project follows a modular, feature-based directory architecture:

```
├── app/                  # Next.js App Router (Entry points & Routing)
│   ├── about/            # About Page route
│   ├── contact/          # Dynamic Contact Form route
│   ├── design-system/    # Design System Showcase page
│   ├── docs/             # Documentation site page
│   ├── impact/           # Impact Page route
│   ├── projects/         # Projects Page route
│   ├── globals.css       # Global styles & Tailwind imports
│   └── layout.tsx        # Base page layout & Navbar integration
├── features/             # Business logic & components grouped by feature
│   ├── about/            # About page story, mandate, and values grid
│   ├── contact/          # Unified Contact Form with dynamic category logic
│   ├── design-system/    # Logic for the design system showcase
│   ├── home/             # Landing page hero, mission cards, and footer
│   ├── impact/           # Success stories, stats, and timelines
│   └── projects/         # Interactive projects grid and project details
├── shared/               # Shared utilities, styles, and reusable UI
│   ├── components/       # Common elements (Navbar, UI controls, etc.)
│   ├── styles/           # CSS design tokens (colors, typography, etc.)
│   └── utils/            # Helper utils (constants, tailwind merge, etc.)
├── public/               # Static assets (brand logos, local fonts, images)
└── sportmantle-brand-content.md  # Official brand voice & content reference
```

---

## ⚡ Key Features

1. **Dynamic Hero Marquee:** An infinite scrolling slider showcasing team, outreach, and historical event photos, with responsive, safe positioning on desktop and mobile viewports.
2. **Unified Contact & Join Flow (`/contact`):** An interactive form that dynamically adapts fields depending on the selected track:
   - **The Athlete:** Captures age and primary sport details for young athletes seeking discipleship.
   - **The Partner:** Collects organization details and partnership types for seeding.
   - **The Outreach:** Handles event registrations for upcoming prayer stretches, tournaments, or bootcamps.
3. **Responsive Spacing & Grid System:** Tailored light/dark themes utilizing an adaptive 8dp vertical rhythm and clean glassmorphism containers.
4. **Active Social Links:** Linked to Sportmantle's live [Instagram Profile](https://www.instagram.com/sportmantle/) and [Apple Podcast ("The Blessed Athlete")](https://podcasts.apple.com/ng/podcast/theblessedathelete/id1839654574).
5. **Interactive Design System (`/design-system`):** A living style guide displaying color tokens, buttons, inputs, and semantic styles defined inside `shared/styles/`.

---

## 📄 License

© {new Date().getFullYear()} Sportmantle NGO. All rights reserved.  
*Born in Abuja, serving the nations.*
