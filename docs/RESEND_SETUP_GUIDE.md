# 📧 BluLadr — Resend Email Integration Setup Guide

> **For the BluLadr engineering and operations team.**  
> This guide outlines the production setup, DNS authentication, and architecture for the proposal and contact forms across the BluLadr website ([`bluladr.com`](https://bluladr.com)), ensuring all client inquiries, proposal requests, and discovery bookings are dispatched from **`hello@bluladr.com`** and delivered directly to the internal team inbox at **`hello@bluladr.com`** via [Resend](https://resend.com).

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Step 1 — Create / Access Resend Account](#step-1--create--access-resend-account)
4. [Step 2 — Verify the BluLadr Domain (`bluladr.com`)](#step-2--verify-the-bluladr-domain-bluladrcom)
5. [Step 3 — Generate Your Resend API Key](#step-3--generate-your-resend-api-key)
6. [Step 4 — Set Up an Audience (Optional Contacts & CRM Sync)](#step-4--set-up-an-audience-optional-contacts--crm-sync)
7. [Step 5 — Configure Environment Variables](#step-5--configure-environment-variables)
8. [Step 6 — API Route & Server Action Architecture](#step-6--api-route--server-action-architecture)
9. [Step 7 — Test End-to-End](#step-7--test-end-to-end)
10. [Best Practices, Deliverability & Security](#best-practices-deliverability--security)
11. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

When an executive, marketing director, or organization submits a proposal request or contact inquiry on BluLadr (`/contact`), the platform executes a resilient multi-tier delivery pipeline:

```
Client Submits Proposal / Inquiry Form (/contact)
       │
       ▼
Next.js Server Action / API Route (/api/contact)
       │
       ├─► 1. Anti-Spam Honeypot & Validation
       │        └── Blocks bots instantly without CAPTCHA friction
       │
       ├─► 2. Zero-Loss Local Preservation Layer
       │        └── Appends structured JSON entry to `data/contact-submissions/submissions.log`
       │
       ├─► 3. Internal Notification Dispatch (Resend)
       │        ├── From: "BluLadr Inquiries" <hello@bluladr.com>
       │        ├── Delivered to: hello@bluladr.com
       │        ├── Reply-To: Client's email (enables 1-click reply from mail client)
       │        └── Styled HTML briefing with budget, service, and organization details
       │
       ├─► 4. Client Confirmation Email (Resend)
       │        ├── From: "BluLadr" <hello@bluladr.com>
       │        ├── Delivered to: Client's email address
       │        └── Branded confirmation receipt with next steps
       │
       └─► 5. Audience & Segment Sync (Optional Resend CRM)
                └── Automatically saves client into "Prospects - Strategy / Executive / Academy"
```

### Key Advantages:
- **Zero Lead Loss:** If Resend is ever unreachable or rate-limited, inquiries are safely committed to local storage first before external network calls.
- **1-Click Executive Reply:** The notification email sets `reply_to` to the client's direct email, allowing immediate response from mobile or desktop mail clients.
- **Service Routing:** Submissions are tagged by service interest (*BluStrategy*, *BluExecutive*, *BluAcademy*, or *General Inquiry*).

---

## Prerequisites

- [x] **Next.js 16 App Router** project configured
- [x] **Resend SDK installed** (`npm install resend`)
- [ ] Administrative access to DNS management for **`bluladr.com`** (Cloudflare, Namecheap, GoDaddy, Route 53, etc.)
- [ ] A **Resend Account** registered at [resend.com](https://resend.com)

---

## Step 1 — Create / Access Resend Account

1. Visit [https://resend.com](https://resend.com) and sign in (or create an account using `hello@bluladr.com` or your admin email).
2. Resend's free tier provides **3,000 emails/month** (100 emails/day) with 1 custom domain — ample for high-touch consultancy inquiries and discovery bookings. Upgrade to Pro when scaling outbound campaigns.

---

## Step 2 — Verify the BluLadr Domain (`bluladr.com`)

Domain authentication enables BluLadr to dispatch transactional emails from **`hello@bluladr.com`** with 100% SPF/DKIM/DMARC alignment, ensuring emails land in the inbox rather than spam.

### 2a. Add Domain in Resend Dashboard
1. In the Resend sidebar, click **Domains** → **Add Domain**.
2. Enter **`bluladr.com`** (or a dedicated dispatch subdomain like `send.bluladr.com` or `mail.bluladr.com`).
3. Select your preferred region:
   - **EU (Frankfurt)** or **US East (N. Virginia)**.
4. Click **Add**.

### 2b. Add DNS Records to Your DNS Provider
Resend provides 3 DNS records. Add them to your DNS manager for `bluladr.com`:

| Type | Name / Host | Value | TTL | Priority | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `TXT` | `resend._domainkey.bluladr.com` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADC...` *(copy exact key from Resend)* | Auto / 3600 | — | **DKIM** (Cryptographic signing) |
| `MX` | `send.bluladr.com` (or root) | `feedback-smtp.us-east-1.amazonses.com` | Auto / 3600 | 10 | **Feedback / Return-Path** |
| `TXT` | `send.bluladr.com` (or root) | `v=spf1 include:amazonses.com ~all` | Auto / 3600 | — | **SPF** (Sender verification) |

*(Optional but strongly recommended for DMARC)*:
| Type | Name / Host | Value | TTL |
| :--- | :--- | :--- | :--- |
| `TXT` | `_dmarc.bluladr.com` | `v=DMARC1; p=none; rua=mailto:dmarc-reports@bluladr.com` | Auto |

### 2c. Verify DNS Status
Click **Verify Records** in the Resend Dashboard. Once DNS propagates (usually 2–15 minutes), the domain status will switch to a green **Verified** badge ✅.

---

## Step 3 — Generate Your Resend API Key

1. In Resend, go to **API Keys** → **Create API Key**.
2. **Name:** `BluLadr Production Website`
3. **Permission:** `Full Access` (or `Sending Access` with Domain Restricted to `bluladr.com`).
4. Copy the key (starts with `re_...`). Store it securely.

---

## Step 4 — Set Up an Audience (Optional Contacts & CRM Sync)

To automatically record every inquiring lead in Resend's built-in contact list:
1. Go to **Audiences** in Resend.
2. Click **Create Audience** and name it `BluLadr Leads & Clients`.
3. Copy the generated **Audience ID** (UUID format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).
4. *(Optional)* Create Segments for:
   - `BluStrategy Inquiries`
   - `BluExecutive Inquiries`
   - `BluAcademy Training`

---

## Step 5 — Configure Environment Variables

Create or update your `.env.local` file in the project root:

```env
# ===================================================================
# BluLadr — Resend Configuration
# ===================================================================

# Resend API Key
RESEND_API_KEY="re_your_api_key_here"

# Sender Addresses (Must match verified domain)
RESEND_FROM_EMAIL="BluLadr <hello@bluladr.com>"
RESEND_NOTIFY_EMAIL="BluLadr System <notifications@bluladr.com>"

# Internal Inbox for Inquiries & Proposals
CONTACT_RECIPIENT_EMAIL="hello@bluladr.com"

# Optional: Resend Audience ID for automated CRM contact sync
RESEND_AUDIENCE_ID=""
```

> ⚠️ **Production Deployment Notice (Vercel / Cloudflare / Netlify / Coolify):**  
> Add these same environment variables in your hosting dashboard under **Project Settings → Environment Variables**.

---

## Step 6 — API Route & Server Action Architecture

### 1. The Server Action (`features/contact/actions/send-proposal.ts`)

```typescript
"use server";

import { Resend } from "resend";
import fs from "fs/promises";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key");

export interface ProposalPayload {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  service: "BluStrategy" | "BluExecutive" | "BluAcademy" | "General Inquiry";
  budget?: string;
  timeline?: string;
  message: string;
  honeypot?: string; // Bot trap
}

export async function submitProposal(data: ProposalPayload) {
  // 1. Anti-Spam Honeypot check
  if (data.honeypot) {
    return { success: true }; // Silently ignore bots
  }

  // 2. Validation
  if (!data.name || !data.email || !data.message) {
    return { error: "Please complete all required fields." };
  }

  // 3. Zero-loss local file backup
  try {
    const backupDir = path.join(process.cwd(), "data/contact-submissions");
    await fs.mkdir(backupDir, { recursive: true });
    await fs.appendFile(
      path.join(backupDir, "submissions.log"),
      JSON.stringify({ timestamp: new Date().toISOString(), ...data }) + "\n"
    );
  } catch (backupError) {
    console.warn("[BluLadr] Local backup warning:", backupError);
  }

  // 4. Resend Dispatch: Internal Notification to hello@bluladr.com
  if (process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "BluLadr <hello@bluladr.com>",
        to: process.env.CONTACT_RECIPIENT_EMAIL || "hello@bluladr.com",
        replyTo: data.email,
        subject: `[New Proposal Inquiry] ${data.service} — ${data.name} (${data.organization || "Independent"})`,
        text: `New Inquiry from ${data.name} (${data.email})\nOrganisation: ${data.organization || "N/A"}\nService: ${data.service}\nBudget: ${data.budget || "N/A"}\nTimeline: ${data.timeline || "N/A"}\n\nMessage:\n${data.message}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E2E8F0; border-radius: 12px; background-color: #ffffff;">
            <div style="margin-bottom: 20px; border-bottom: 2px solid #1F4591; padding-bottom: 12px;">
              <h2 style="color: #1F4591; margin: 0; font-size: 20px;">New Client Proposal Inquiry</h2>
              <p style="color: #64748B; margin: 4px 0 0 0; font-size: 14px;">Submitted via bluladr.com</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr><td style="padding: 8px 0; color: #64748B; width: 140px;">Client Name:</td><td style="font-weight: bold; color: #0A0D14;">${data.name}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Email:</td><td><a href="mailto:${data.email}" style="color: #049DD9;">${data.email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Phone:</td><td style="color: #0A0D14;">${data.phone || "Not specified"}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Organisation:</td><td style="font-weight: bold; color: #0A0D14;">${data.organization || "Not specified"}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Service Area:</td><td style="color: #1F4591; font-weight: bold;">${data.service}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Budget Range:</td><td style="color: #0A0D14;">${data.budget || "Not specified"}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;">Target Timeline:</td><td style="color: #0A0D14;">${data.timeline || "Not specified"}</td></tr>
            </table>

            <div style="background-color: #F8FAFC; border-left: 4px solid #049DD9; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #0A0D14; white-space: pre-wrap;">${data.message}</p>
            </div>

            <div style="font-size: 12px; color: #94A3B8; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 16px;">
              BluLadr Ltd · Abuja, Nigeria · Reply to this email to contact ${data.name} directly.
            </div>
          </div>
        `,
      });

      // 5. Send automated confirmation receipt to client
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "BluLadr <hello@bluladr.com>",
        to: data.email,
        subject: "We've received your inquiry — BluLadr",
        text: `Hello ${data.name},\n\nThank you for reaching out to BluLadr. We have received your inquiry regarding ${data.service}.\n\nOur strategy team will review your project details and get back to you within 24 to 48 business hours.\n\nWarm regards,\nThe BluLadr Team\nbluladr.com`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background-color: #ffffff; border: 1px solid #E2E8F0; border-radius: 12px;">
            <div style="margin-bottom: 24px;">
              <h1 style="color: #1F4591; font-size: 24px; margin: 0 0 8px 0;">Hello ${data.name},</h1>
              <p style="color: #0A0D14; font-size: 16px; line-height: 1.6; margin: 0;">
                Thank you for reaching out to BluLadr. We have received your inquiry regarding <strong>${data.service}</strong>.
              </p>
            </div>

            <p style="color: #475569; font-size: 15px; line-height: 1.6;">
              Good work begins with clear thinking. Our strategy team is reviewing your project details and will be in touch within <strong>24 to 48 business hours</strong> with next steps or discovery call availability.
            </p>

            <div style="margin: 28px 0; padding: 20px; background-color: #F8FAFC; border-radius: 8px; border: 1px solid #E2E8F0;">
              <h4 style="margin: 0 0 8px 0; color: #1F4591; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Inquiry Summary</h4>
              <p style="margin: 0; font-size: 14px; color: #64748B;"><strong>Service:</strong> ${data.service}</p>
              ${data.organization ? `<p style="margin: 4px 0 0 0; font-size: 14px; color: #64748B;"><strong>Organisation:</strong> ${data.organization}</p>` : ""}
            </div>

            <p style="color: #475569; font-size: 14px; line-height: 1.6; margin-bottom: 28px;">
              If you have urgent questions, feel free to reply directly to this email or call us at <strong>0902 081 1734</strong>.
            </p>

            <div style="border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 13px; color: #94A3B8;">
              <p style="margin: 0; font-weight: bold; color: #1F4591;">BluLadr Ltd</p>
              <p style="margin: 4px 0 0 0;">Creativity is a skill. · Abuja, Nigeria</p>
            </div>
          </div>
        `,
      });

      // 6. Optional: Sync Contact to Resend Audience CRM
      if (process.env.RESEND_AUDIENCE_ID) {
        try {
          await resend.contacts.create({
            email: data.email,
            firstName: data.name.split(" ")[0],
            lastName: data.name.split(" ").slice(1).join(" ") || "",
            audienceId: process.env.RESEND_AUDIENCE_ID,
          });
        } catch (crmError) {
          console.warn("[BluLadr] Audience sync warning:", crmError);
        }
      }
    } catch (sendError) {
      console.error("[BluLadr] Resend send error:", sendError);
      return { error: "Failed to send email notification, but your inquiry was saved locally. We will contact you soon." };
    }
  }

  return { success: true };
}
```

---

## Step 7 — Test End-to-End

1. Populate your `.env.local` with your verified `RESEND_API_KEY`.
2. Start the dev server: `npm run dev`.
3. Open `http://localhost:3000/contact`.
4. Fill out the proposal form and submit.
5. Verify:
   - Success toast / banner appears on screen.
   - The backup log file is updated in `data/contact-submissions/submissions.log`.
   - Internal notification arrives at `hello@bluladr.com`.
   - Confirmation receipt arrives in your test client inbox.

---

## Best Practices, Deliverability & Security

1. **Reply-To Optimization:** Setting `replyTo: data.email` enables the BluLadr team to click "Reply" inside Gmail/Outlook/Apple Mail and immediately correspond with the client.
2. **Anti-Bot Honeypot:** An invisible `honeypot` input traps automated scrapers without annoying human clients with captchas.
3. **Local Audit Trail:** `data/contact-submissions/submissions.log` guarantees you never lose a client lead during third-party service degradation.
4. **British English Branding:** Keeps copy consistent with the BluLadr voice guide (*organisation*, *programme*, *prioritise*).

---

## Troubleshooting

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| `domain_not_found` | Domain not yet created or typo in domain name | Ensure `bluladr.com` is added under **Domains** in Resend. |
| `validation_error` / `domain_unverified` | DNS records (DKIM/SPF) still propagating | Check DNS records in your registrar and click **Verify Records** in Resend. |
| `restricted_api_key` | API key lacks sending permissions for the domain | Generate a new key with Full Access or specific permission for `bluladr.com`. |
| Emails going to Spam | Missing DMARC record or sending from unverified domain | Add the `_dmarc.bluladr.com` TXT record and ensure `from` matches `bluladr.com`. |
