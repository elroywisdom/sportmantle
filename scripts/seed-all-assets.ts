import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { allProjects } from "../shared/data/projects";

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

if (!projectId || !token) {
  console.error("❌ Missing Sanity Project ID or Write Token in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

// Cache uploaded image assets to avoid duplicate uploads
const assetCache = new Map<string, any>();

async function uploadLocalImage(publicRelPath: string) {
  if (!publicRelPath) return null;
  const cleanPath = publicRelPath.startsWith("/") ? publicRelPath.slice(1) : publicRelPath;

  // Check cache first
  if (assetCache.has(cleanPath)) {
    return assetCache.get(cleanPath);
  }

  const fullPath = path.join(process.cwd(), "public", cleanPath);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const stream = fs.createReadStream(fullPath);
    const asset = await client.assets.upload("image", stream, {
      filename: path.basename(fullPath),
    });

    const imageObj = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };

    assetCache.set(cleanPath, imageObj);
    return imageObj;
  } catch (error: any) {
    console.warn(`⚠️ Failed to upload ${cleanPath}:`, error.message);
    return null;
  }
}

// 20 Home Page Slideshow Images
const rawHeroImages = [
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-104.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-29.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-32.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-35.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-44.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-53.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-61.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-71.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-72.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-89.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-97.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-final/SMC-99.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-white-pictures/OGB-101.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-white-pictures/OGB-105.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-white-pictures/OGB-24.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-white-pictures/OGB-36.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-white-pictures/OGB-43.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-black-pictures/SMC-18.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-black-pictures/SMC-20.jpg",
  "/Images/projects/2026/Sportmantle Clinic - BIgham University/smc-day-2/OGB-100.jpg",
];

async function seedHomeHeroSlides() {
  console.log(`\n📸 Uploading ${rawHeroImages.length} Slideshow Images for Home Page...`);
  const slides = [];

  for (let i = 0; i < rawHeroImages.length; i++) {
    const imgPath = rawHeroImages[i];
    process.stdout.write(`  [${i + 1}/${rawHeroImages.length}] Uploading ${path.basename(imgPath)}...\r`);
    const imageObj = await uploadLocalImage(imgPath);
    if (imageObj) {
      slides.push({
        _key: `slide-${i + 1}`,
        _type: "galleryItem",
        image: imageObj,
        title: `Sportmantle Clinic Highlight ${i + 1}`,
        caption: "Discipling athletes and transforming sports culture.",
      });
    }
  }

  console.log(`\n  → Patching Home Page document with ${slides.length} slideshow images...`);
  await client
    .patch("homePage")
    .set({ heroSlides: slides })
    .commit();

  try {
    const draft = await client.getDocument("drafts.homePage");
    if (draft) {
      await client.patch("drafts.homePage").set({ heroSlides: slides }).commit();
      await client.delete("drafts.homePage");
      console.log("  → Cleaned up and synced drafts.homePage");
    }
  } catch (err: any) {
    // Draft may not exist, which is fine
  }

  console.log("✅ Home Page Slideshow images seeded successfully.");
}

async function seedImpactImages() {
  console.log("\n📸 Uploading Impact Page Hero Image...");
  const impactImg = await uploadLocalImage("/Images/athletes-impact.png");
  if (impactImg) {
    await client
      .patch("impactPage")
      .set({ heroImage: impactImg })
      .commit();
    console.log("✅ Impact Page Hero Image seeded successfully.");
  }
}

async function seedAboutImages() {
  console.log("\n📸 Uploading About Page Images...");
  const heroImg = await uploadLocalImage("/Images/projects/2026/W.A.P-3.0/SPMTL (10 of 15).jpg");
  const founderImg = await uploadLocalImage("/Images/projects/website-placeholder images-section/founder-speaking-to-young-players.jpeg");

  const patch = client.patch("aboutPage");
  if (heroImg) patch.set({ heroImage: heroImg });
  if (founderImg) patch.set({ founderImage: founderImg });
  await patch.commit();
  console.log("✅ About Page Images seeded successfully.");
}

async function seedAllProjectAssets() {
  console.log(`\n🚀 Uploading Cover Images & Full Galleries for all ${allProjects.length} Projects...`);

  for (let pIdx = 0; pIdx < allProjects.length; pIdx++) {
    const project = allProjects[pIdx];
    const docId = `project-${project.slug}`;
    console.log(`\n📁 [${pIdx + 1}/${allProjects.length}] Processing project: ${project.title}`);

    // 1. Upload Cover Image
    let coverImageObj = null;
    if (project.image) {
      console.log(`   Uploading cover image: ${path.basename(project.image)}`);
      coverImageObj = await uploadLocalImage(project.image);
    }

    // 2. Upload Gallery Images
    const galleryItems = [];
    const galleryPaths = project.gallery || [];
    console.log(`   Uploading ${galleryPaths.length} gallery images...`);

    for (let gIdx = 0; gIdx < galleryPaths.length; gIdx++) {
      const gPath = galleryPaths[gIdx];
      process.stdout.write(`     • Photo [${gIdx + 1}/${galleryPaths.length}]: ${path.basename(gPath)}...\r`);
      const gImageObj = await uploadLocalImage(gPath);
      if (gImageObj) {
        galleryItems.push({
          _key: `gal-${gIdx + 1}`,
          _type: "galleryItem",
          image: gImageObj,
          title: `${project.title} — Photo ${gIdx + 1}`,
          caption: project.description.slice(0, 100),
        });
      }
    }
    console.log(`\n   ✓ Uploaded ${galleryItems.length} gallery items`);

    // 3. Patch the project document in Sanity
    const patch = client.patch(docId).set({
      gallery: galleryItems,
    });

    if (coverImageObj) {
      patch.set({ coverImage: coverImageObj });
    }

    await patch.commit();
    console.log(`   ✅ Project "${project.title}" gallery & cover updated in Sanity.`);
  }

  console.log("\n🎉 All 10 Projects have been fully seeded with cover images and full galleries!");
}

async function main() {
  try {
    console.log("🌟 Starting Full Asset & Image Seeder for Sportmantle CMS...");
    await seedHomeHeroSlides();
    await seedImpactImages();
    await seedAboutImages();
    await seedAllProjectAssets();
    console.log("\n✨ All assets and images seeded successfully into Sanity Studio!");
  } catch (error) {
    console.error("❌ Asset seeding failed:", error);
    process.exit(1);
  }
}

main();
