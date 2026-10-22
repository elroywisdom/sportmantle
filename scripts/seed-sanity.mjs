import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

// Load .env.local if present
if (fs.existsSync(".env.local")) {
  const envContent = fs.readFileSync(".env.local", "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || projectId === "your-project-id") {
  console.log("⚠️ NEXT_PUBLIC_SANITY_PROJECT_ID is not configured in .env.local.");
  process.exit(1);
}

if (!token) {
  console.log("⚠️ SANITY_API_WRITE_TOKEN is missing in .env.local.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

async function uploadLocalImage(publicRelPath) {
  if (!publicRelPath) return null;
  // Strip leading slash
  const cleanPath = publicRelPath.startsWith("/") ? publicRelPath.slice(1) : publicRelPath;
  const fullPath = path.join(process.cwd(), "public", cleanPath);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const stream = fs.createReadStream(fullPath);
    const asset = await client.assets.upload("image", stream, {
      filename: path.basename(fullPath),
    });
    return {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };
  } catch (error) {
    console.warn(`⚠️ Could not upload image ${cleanPath}:`, error.message);
    return null;
  }
}

async function seedSingletons() {
  console.log("📦 Seeding Singletons (Home, About, Impact, Contact, Navigation, Settings)...");

  // 1. Home Page
  await client.createIfNotExists({ _id: "homePage", _type: "homePage" });
  await client
    .patch("homePage")
    .setIfMissing({
      heroHeadline: "RAISING A PEOPLE FOR GOD IN THE SPORTS INDUSTRY",
      heroSubheadline:
        "Discipling athletes in the gospel of Jesus Christ, establishing righteousness and justice in the arenas of sports worldwide.",
      mandateQuote:
        "Raise me a people in the sports industry, who will uphold righteousness and justice, through the route of discipleship.",
      impactStats: [
        { _key: "s1", value: "200+", label: "Athletes Discipled" },
        { _key: "s2", value: "3+ Years", label: "Ministry Impact" },
        { _key: "s3", value: "12+", label: "Tournaments & Outreaches" },
      ],
    })
    .commit();

  // 2. About Page
  await client.createIfNotExists({ _id: "aboutPage", _type: "aboutPage" });
  await client
    .patch("aboutPage")
    .setIfMissing({
      heroHeadline: "ABOUT SPORTMANTLE",
      heroSubheadline:
        "Learn about our mandate, our mission, and the story behind the mantle of grace.",
      mandateQuote:
        "Raise me a people in the sports industry, who will uphold righteousness and justice, through the route of discipleship.",
      visionStatement:
        "Raising a people for God in the sports industry, who would uphold righteousness and justice.",
      missionPoints: [
        "Disciple athletes in the gospel of Jesus Christ.",
        "Equip athletes with the right knowledge of God, their identity, and purpose on earth.",
        "Build a stellar educational and training system for transformation and growth.",
        "Establish righteousness in the hearts of men through teachings.",
        "Deliver and set athletes free from addictions, bondage, and demonic holds.",
      ],
      founderName: "Joshua Paul Dandaldi",
      founderRole: "Visionary & Lead Servant, Sportmantle",
    })
    .commit();

  // 3. Impact Page
  await client.createIfNotExists({ _id: "impactPage", _type: "impactPage" });
  await client
    .patch("impactPage")
    .setIfMissing({
      heroHeadline: "DIVINE FOOTPRINTS",
      heroSubheadline:
        "Over 3 years of outreaches, meetings, and tournaments, raising a generation of athletes who uphold righteousness and justice.",
      metrics: [
        { _key: "m1", value: "200+", label: "Boys Discipled" },
        { _key: "m2", value: "5-25", label: "Target Age Range (Years)" },
        { _key: "m3", value: "8+", label: "Regional Assemblies" },
        { _key: "m4", value: "3+", label: "States Impacted (Abuja, Nasarawa, Kaduna)" },
      ],
    })
    .commit();

  // 4. Contact Page
  await client.createIfNotExists({ _id: "contactPage", _type: "contactPage" });
  await client
    .patch("contactPage")
    .setIfMissing({
      headline: "GET IN TOUCH",
      subheadline:
        "Whether you're an athlete seeking discipleship, an organization looking to partner, or an intercessor standing in the gap — we want to hear from you.",
      email: "info@sportmantle.com",
      phone: "0704 284 4943",
      phoneTel: "+2347042844943",
      address: "Abuja, FCT, Nigeria",
      instagramUrl: "https://www.instagram.com/sportmantle/",
      podcastUrl: "https://podcasts.apple.com/ng/podcast/theblessedathelete/id1839654574",
    })
    .commit();

  // 5. Navigation
  await client.createIfNotExists({ _id: "navigation", _type: "navigation" });
  await client
    .patch("navigation")
    .setIfMissing({
      headerLinks: [
        { _key: "n1", label: "Home", href: "/" },
        { _key: "n2", label: "About", href: "/about" },
        { _key: "n3", label: "Projects", href: "/projects" },
        { _key: "n4", label: "Impact", href: "/impact" },
        { _key: "n5", label: "Contact", href: "/contact" },
      ],
      headerCta: {
        label: "Partner With Us",
        href: "/contact?category=partner",
        style: "primary",
      },
      footerLinks: [
        { _key: "f1", label: "Home", href: "/" },
        { _key: "f2", label: "About Us", href: "/about" },
        { _key: "f3", label: "Projects & Events", href: "/projects" },
        { _key: "f4", label: "Divine Footprints", href: "/impact" },
        { _key: "f5", label: "Contact Us", href: "/contact" },
      ],
    })
    .commit();

  // 6. Global Settings
  await client.createIfNotExists({ _id: "globalSettings", _type: "globalSettings" });
  await client
    .patch("globalSettings")
    .setIfMissing({
      siteTitle: "Sportmantle",
      siteDescription:
        "Raising a people for God in the sports industry, who will uphold righteousness and justice.",
      copyrightText: "© 2026 Sportmantle. All rights reserved.",
      socialLinks: {
        instagram: "https://www.instagram.com/sportmantle/",
        podcast: "https://podcasts.apple.com/ng/podcast/theblessedathelete/id1839654574",
      },
    })
    .commit();

  console.log("✅ All singletons seeded successfully.");
}

const SEED_PROJECTS = [
  {
    slug: "when-athletes-pray-september-2026",
    title: "WHEN ATHLETES PRAY — September 2026",
    date: "09.26.26",
    year: "2026",
    category: "Prayer",
    tags: ["Prayer", "Abuja", "WAP 3.0", "Intercession"],
    imagePath: "/Images/projects/2026/W.A.P-3.0/SPMTL (13 of 15).jpg",
    description: "Hungry, thirsty, burdened, or in need of community? Believers across the sports industry gathered on September 26, 2026 at Bible Guest House to fellowship, repent, and align with God's end-time purpose.",
    fullStory: "Hungry, happy, thirsty, tired, burdened, confused, have questions, need clarity, weary, in need of a community? This meeting is for you.\n\nThe Lord has overlooked the days of ignorance and He is calling everyone in the sport industry to repentance NOW!\n\nJoin us on the 26th of September 2026 as we gather with other believers in the sport industry to fellowship with our Father; to know His mind and purpose for our industry and that of every athlete in this end time.\n\nSpread the word, be an evangelist and invite everyone you know because we’ve made room for you!\n\nSee you Beloved at Bible Guest House, 8am.\n\nThe Spirit and The Bride says come!!!",
    featuredQuote: "The Lord has overlooked the days of ignorance and He is calling everyone in the sport industry to repentance NOW!",
    details: {
      location: "Bible Guest House, Zone 5, Wuse, Abuja",
      attendance: "120+ Athletes, Coaches & Intercessors",
      impact: "A consecrated gathering of fellowship, repentance, and prophetic alignment for athletes and sports professionals in this end time.",
      partners: "SportMantle Prayer Network",
    },
    titleColor: "text-white",
  },
  {
    slug: "sportmantle-clinic-bingham-university",
    title: "Sportmantle Clinic — Bingham University",
    date: "03.14.26",
    year: "2026",
    category: "Camps",
    tags: ["Clinic", "Bingham", "Mentorship", "Discipleship"],
    imagePath: "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-53.jpg",
    description: "Bingham University became the grounds of an extraordinary convergence of faith, sport, and community as SportMantle hosted its highly anticipated clinic, transforming athletic spaces into arenas of purpose.",
    fullStory: "Bingham University is set to become the grounds of an extraordinary convergence of faith, sport, and community this weekend, as SportMantle, the faith-based sports organisation known for transforming athletic spaces into arenas of purpose, confirms its highly anticipated clinic will commence in just two days’ time.\n\nThe clinic brought together collegiate athletes, coaches, and sports leaders for an immersive encounter that seamlessly blended high-caliber athletic training with intentional spiritual mentorship.",
    featuredQuote: "Transforming athletic spaces into arenas of purpose, where competitive excellence meets spiritual depth.",
    details: {
      location: "Bingham University, Karu, Nasarawa State",
      attendance: "150+ Collegiate Athletes & Students",
      impact: "Comprehensive football training, character empowerment, and established campus fellowship for student-athletes.",
      partners: "Bingham University Sports Management",
    },
    titleColor: "text-white",
  },
  {
    slug: "when-athletes-pray-2nd-edition",
    title: "WHEN ATHLETES PRAY — 2nd Edition",
    date: "07.20.24",
    year: "2024",
    category: "Prayer",
    tags: ["Prayer", "Abuja", "Intercession"],
    imagePath: "/Images/projects/sportmantle-2024/WHEN ATHLETES PRAY 2.0/IMG_0463.webp",
    description: "When Athletes Pray 2.0 brought together athletes from across the city to intercede for the sports industry and consecrate their careers to God.",
    fullStory: "When Athletes Pray (2nd Edition) was a historic and transformational assembly that gathered elite and aspiring sports personalities, coaches, and intercessors in the heart of Abuja. The event served as a consecrated altar of spiritual alignment and active intercession for the global sports industry.",
    featuredQuote: "An athlete in the place of prayer is a force of righteousness that cannot be stopped.",
    details: {
      location: "Bible Guest House, Zone 5, Wuse, Abuja",
      attendance: "70+ Dedicated Athletes",
      impact: "A robust intercessory network established; deep spiritual renewals recorded among Abuja-based competitors.",
    },
    titleColor: "text-white",
  },
  {
    slug: "outreach-horvel-prime-football-academy",
    title: "Outreach — Horvel-Prime Football Academy",
    date: "03.10.25",
    year: "2025",
    category: "Outreach",
    tags: ["Outreach", "Nyanya", "Mentorship"],
    imagePath: "/Images/projects/sportmantle-2025/HORVEL PRIME OUTREACH/IMG_5393.webp",
    description: "Our outreach at Horvel Prime allowed us to share the gospel directly with young athletes and provide essential sporting equipment and mentorship.",
    fullStory: "The strategic outreach at Horvel-Prime Football Academy in Nyanya, Abuja, demonstrated Sportmantle's commitment to holistic discipleship—meeting physical needs while planting eternal seeds.",
    featuredQuote: "We prepare the body for the game, but we prepare the heart for eternity.",
    details: {
      location: "Nyanya, FCT, Abuja",
      attendance: "80+ Young Players",
      impact: "Over 40 first-time decisions for Christ; established permanent weekly discipleship structures in the academy.",
      partners: "Horvel Prime Academy Management",
    },
    titleColor: "text-white",
  },
  {
    slug: "aflame-holy-ghost-meeting",
    title: "AFLAME — Holy Ghost Meeting",
    date: "10.24.24",
    year: "2024",
    category: "Camps",
    tags: ["Spiritual", "Abuja", "Encounter"],
    imagePath: "/Images/projects/sportmantle-2024/AFLAME/IMG_1739.webp",
    description: "The Aflame camp ignited a passion for Christ in the next generation of football players, combining rigorous physical training with deep spiritual discipleship.",
    fullStory: "The AFLAME Holy Ghost Meeting in Abuja was a divine combustion of prayer, passion, and purpose. It gathered young players, coaches, and sports advocates hungry for an authentic spiritual encounter that would transcend the sports stadium.",
    featuredQuote: "Set yourself on fire for God on the field, and the world will watch you burn.",
    details: {
      location: "City of Abuja",
      attendance: "120+ Academicians & Youth",
      impact: "Catalyzed discipleship cells across 5 Abuja football academies.",
      partners: "Sportmantle Discipleship Network",
    },
    titleColor: "text-[#E30A0A]",
  },
  {
    slug: "sportmantle-7-a-side-youth-tournament",
    title: "Sportmantle 7-a-Side Youth Tournament",
    date: "06.12.25",
    year: "2025",
    category: "Tournament",
    tags: ["Tournament", "Nasarawa", "Competition"],
    imagePath: "/Images/projects/sportmantle-2025/SPORTMANTLE JUNIOR TOURNAMENT /IMG_6721.webp",
    description: "The Sportmantle Junior Tournament brought together academies for a week of competitive football and intense gospel-centered teaching.",
    fullStory: "Executing sports evangelism with dynamic athletic brilliance, the first-ever Sportmantle 7-a-Side Youth Tournament was held in Nasarawa State. The tournament partnered closely with the Karu Football Academy.",
    featuredQuote: "We compete with maximum intensity, but our ultimate goal is to win crowns that do not fade.",
    details: {
      location: "Karu, Nasarawa State",
      attendance: "12+ Academies, 150+ Players",
      impact: "Nurtured character and integrity in competition; distributed scriptures and resources to all participating clubs.",
      partners: "Karu Football Academy (KFA)",
    },
    titleColor: "text-white",
  },
  {
    slug: "when-athletes-pray-1st-edition",
    title: "WHEN ATHLETES PRAY — 1st Edition",
    date: "02.05.24",
    year: "2024",
    category: "Prayer",
    tags: ["Prayer", "Zuba", "Foundational"],
    imagePath: "/Images/projects/sportmantle-2024/WHEN ATHLETES PRAY 2.0/IMG_0461.webp",
    description: "The inaugural edition of When Athletes Pray set the foundation for a movement of intercession among young sportsmen and women.",
    fullStory: "The movement of sports-focused intercession began with 'When Athletes Pray — 1st Edition'. Held in Zuba, FCT, this foundational meeting drew an enthusiastic audience of young athletes from across the Federal Capital Territory and neighboring Nasarawa State.",
    featuredQuote: "The foundation of every great victory is laid on our knees in prayer.",
    details: {
      location: "Zuba, FCT",
      attendance: "50+ Pioneer Athletes",
      impact: "Broke regional silos; birthed a permanent prayer cell of young players across Nasarawa and Abuja.",
      partners: "Zuba Community Outreach",
    },
    titleColor: "text-white",
  },
  {
    slug: "karu-football-academy-outreach",
    title: "Karu Football Academy Outreach",
    date: "11.22.24",
    year: "2024",
    category: "Outreach",
    tags: ["Outreach", "Nasarawa", "Mentorship"],
    imagePath: "/Images/projects/sportmantle-2024/AFLAME/IMG_1716.webp",
    description: "A targeted outreach at the Karu Football Academy providing boots, jerseys, and sharing the message of righteousness and justice.",
    fullStory: "Our targeted outreach at the Karu Football Academy (KFA) in Nasarawa was a deeply practical display of Christ's love. By focusing on a single, high-potential academy, Sportmantle was able to deliver targeted support.",
    featuredQuote: "Righteousness on the field translates to justice in the community.",
    details: {
      location: "Karu, Nasarawa State",
      attendance: "65+ Academy Athletes",
      impact: "Dozens equipped with essential boots and jerseys; established ongoing mentorship link with KFA coaches.",
      partners: "Karu Football Academy Management",
    },
    titleColor: "text-[#E30A0A]",
  },
  {
    slug: "spirituals-righteousness-of-god",
    title: "SPIRITUALS — The Righteousness of God",
    date: "03.25.25",
    year: "2025",
    category: "Conference",
    tags: ["Conference", "Anniversary", "Abuja"],
    imagePath: "/Images/projects/sportmantle-2025/2nd Anniversary- Spiritual - the righteousness of God/IMG_0138.webp",
    description: "A teaching meeting held to celebrate Sportmantle's 2-year anniversary, honoring God's faithfulness and establishing righteousness in the hearts of athletes.",
    fullStory: "To mark two incredible years of raising righteous voices in the sports industry, Sportmantle convened 'SPIRITUALS — The Righteousness of God'. This special teaching conference was dedicated to reinforcing the structural spiritual foundations of our community.",
    featuredQuote: "Our anniversary is not just a milestone of time, but a testament to God's building hand.",
    details: {
      location: "City of Abuja",
      attendance: "100+ Athletes & Partners",
      impact: "Deepened the theological understanding of righteousness; reinforced community bonds; celebrated 2 years of impact.",
      partners: "Beta Boys Project & Abuja Ministers",
    },
    titleColor: "text-white",
  },
  {
    slug: "kaduna-outreach-beta-boys",
    title: "Kaduna Outreach (with Beta Boys Project)",
    date: "09.15.25",
    year: "2025",
    category: "Outreach",
    tags: ["Outreach", "Kaduna", "Empowerment"],
    imagePath: "/Images/projects/website-placeholder images-section/founder-speaking-to-young-players.jpeg",
    description: "A collaborative bootcamp outreach in Kaduna targeting boys aged 8–15, focusing on the gospel, purpose, identity, and skill empowerment.",
    fullStory: "Expanding our footprint across Nigeria, Sportmantle joined forces with the Beta Boys Project to conduct a high-impact, multi-day outreach bootcamp in Kaduna. Held at the Baptist Theological Seminary, the bootcamp targeted boys aged 8 to 15.",
    featuredQuote: "If you build the boy today, you secure the man and save the nation tomorrow.",
    details: {
      location: "Baptist Theological Seminary, Kaduna",
      attendance: "90+ Young Boys",
      impact: "Provided extensive mentorship; distributed bibles and educational items; empowered youth with basic career guidance.",
      partners: "Beta Boys Project",
    },
    titleColor: "text-white",
  },
];

async function seedProjects() {
  console.log(`🚀 Seeding ${SEED_PROJECTS.length} Projects into Sanity...`);

  for (const proj of SEED_PROJECTS) {
    const docId = `project-${proj.slug}`;
    console.log(`  → Seeding project: ${proj.title}...`);

    let uploadedCover = null;
    if (proj.imagePath) {
      uploadedCover = await uploadLocalImage(proj.imagePath);
    }

    await client.createIfNotExists({
      _id: docId,
      _type: "project",
    });

    const patch = client.patch(docId).setIfMissing({
      title: proj.title,
      slug: { _type: "slug", current: proj.slug },
      category: proj.category,
      date: proj.date,
      year: proj.year,
      tags: proj.tags,
      description: proj.description,
      fullStory: proj.fullStory,
      featuredQuote: proj.featuredQuote,
      details: proj.details,
      titleColor: proj.titleColor,
    });

    if (uploadedCover) {
      patch.setIfMissing({ coverImage: uploadedCover });
    }

    await patch.commit();
  }

  console.log("✅ All projects seeded safely.");
}

async function main() {
  try {
    console.log(`🔗 Connecting to Sanity Project ID: ${projectId} (dataset: ${dataset})`);
    await seedSingletons();
    await seedProjects();
    console.log("\n✨ CMS Seeding Complete! Refresh Sanity Studio at /studio to view your content.");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

main();
