# 🦷 DR. JERIN'S DENTAL POINT — COMPLETE PROJECT DOCUMENTATION
### Version 1.0 | Built by Baba Puson | AI-Assisted Full Build
### Last Updated: May 2025

---

> **HOW TO USE THIS DOCUMENT**
> This is a line-by-line specification document. Give this entire file to any AI (Claude, GPT, Gemini, Cursor, etc.) and it will understand the full project without any extra explanation. Every section is self-contained. Every placeholder is marked with `[PLACEHOLDER: description]`.

---

## TABLE OF CONTENTS
1. [Project Overview](#1-project-overview)
2. [Key Stakeholders](#2-key-stakeholders)
3. [Tech Stack](#3-tech-stack)
4. [Branding & Design System](#4-branding--design-system)
5. [Project File Structure](#5-project-file-structure)
6. [Database Schema](#6-database-schema)
7. [Page-by-Page Specification](#7-page-by-page-specification)
   - 7.1 Landing / Funnel Page
   - 7.2 Main Home Page (Patient Entry Point)
   - 7.3 Services Page
   - 7.4 Patient Auth Pages (Sign Up / Login)
   - 7.5 Patient Dashboard / Portal
   - 7.6 Admin Panel
   - 7.7 Receptionist Portal
   - 7.8 Appointment Booking Page
8. [API Endpoints](#8-api-endpoints)
9. [WhatsApp Automation Logic](#9-whatsapp-automation-logic)
10. [Security Implementation](#10-security-implementation)
11. [SEO / AEO / GEO Strategy](#11-seo--aeo--geo-strategy)
12. [Email Marketing Integration](#12-email-marketing-integration)
13. [Payment Portal](#13-payment-portal)
14. [Bangla Language Toggle](#14-bangla-language-toggle)
15. [Deployment Guide](#15-deployment-guide)
16. [Admin & External Setup Checklist](#16-admin--external-setup-checklist)
17. [AI-Assisted Build Procedure (A–Z)](#17-ai-assisted-build-procedure-az)
18. [Content Placeholders](#18-content-placeholders)

---

## 1. PROJECT OVERVIEW

**Project Name:** Dr. Jerin's Dental Point  
**Type:** Production-Grade Dental Chamber Web Application  
**Purpose:** Serves three functions simultaneously:
1. A **digital marketing funnel** to collect leads (Name, Phone, Email) via an attractive landing page.
2. A **patient portal** where registered patients can view their dental history, reports, appointments, and manage their profile.
3. An **admin/operations panel** for the doctor and manager to manage everything end-to-end.

**Primary Color:** Royal Blue `#1E3A8A`  
**Language:** English (with full Bangla toggle on every page)  
**Mobile-First:** Yes — majority of users are mobile users  
**Hosting:** Free tier (Vercel + Supabase subdomain) — upgradeable to premium later  
**Builder Credit:** "Built by Baba Puson" — small text at the very bottom of every page  

---

## 2. KEY STAKEHOLDERS

| Role | Name | Access Level | Description |
|------|------|-------------|-------------|
| Dentist / Owner | Dr. Jerin (Prity) | Full Admin | Treats patients, views/edits all records, approves WhatsApp messages |
| Manager / Operator | Dip (Dula Vai) | Full Admin | Manages payments, appointments, operations, marketing leads |
| Receptionist | (Rotating Staff) | Limited Portal | Data entry, appointment scheduling only |
| Patient / Client | General Public | Patient Portal | View own history, reports, book appointments, edit own profile |
| Developer / Builder | Baba Puson | System Owner | Builds and maintains the system using AI tools |

---

## 3. TECH STACK

### Why This Stack
All tools below are free-tier compatible, AI-friendly, and production-grade.

| Layer | Technology | Reason |
|-------|-----------|--------|
| **Frontend** | Next.js 14 (App Router) | SSR for SEO, fast, React-based |
| **Styling** | Tailwind CSS | Lightweight, mobile-first, utility-based |
| **Animations** | Framer Motion + CSS | Floating teeth/tools background animation |
| **Database** | Supabase (PostgreSQL) | Free 500MB, has auth, storage, real-time |
| **Authentication** | Supabase Auth | Phone OTP + Email/Password, free |
| **File Storage** | Supabase Storage | Free 1GB — for patient photos, X-rays, reports |
| **Backend API** | Next.js API Routes | Serverless functions, no separate server needed |
| **Hosting** | Vercel | Free tier, auto-deploys from GitHub, gives subdomain |
| **WhatsApp** | Meta WhatsApp Cloud API | Official, 1000 free conversations/month |
| **Email Marketing** | Mailchimp (Free) | 500 contacts, 1000 emails/month |
| **Maps** | Google Maps Embed API | Free iframe embed |
| **PDF Generation** | @react-pdf/renderer | Free npm package, runs in browser |
| **i18n (Bangla)** | Custom Context + JSON | Simple toggle, no extra cost |
| **Version Control** | GitHub | Free, connects to Vercel for auto-deploy |
| **AI Build Tool** | Cursor AI | Best AI coding tool; handles errors auto |

### Free Tier Limits (Important)
- Supabase: 500MB DB, 1GB storage, 50,000 monthly active users, 2GB bandwidth
- Vercel: 100GB bandwidth/month, 6000 build minutes/month
- WhatsApp Cloud API: 1,000 free business-initiated conversations/month
- Mailchimp: 500 contacts, 1,000 emails/month, 500 emails/send

---

## 4. BRANDING & DESIGN SYSTEM

### Color Palette
```
Primary:        #1E3A8A  (Royal Blue — main brand color)
Primary Light:  #2563EB  (Bright Blue — buttons, hover states)
Primary Dark:   #1E3A8A  (Deep Blue — headings, footer)
Accent:         #38BDF8  (Sky Blue — highlights, icons)
White:          #FFFFFF  (Backgrounds, text on dark)
Light Gray:     #F0F4FF  (Section backgrounds)
Dark Text:      #0F172A  (Body text)
Success:        #10B981  (Payment confirmed, appointment confirmed)
Warning:        #F59E0B  (Payment due, reminder)
Danger:         #EF4444  (Overdue, errors)
```

### Typography
```
Font Family:    'Inter' (Google Fonts — free, clean, professional)
Headings:       Inter Bold / ExtraBold
Body:           Inter Regular / Medium
Accent Text:    Inter SemiBold (blue color)
```

### Logo
- **Status:** Already exists — [PLACEHOLDER: Upload logo file, use as `public/logo.png`]
- Usage: Header of every page, footer, meta og:image corner

### Dr. Jerin's Photo
- **Style:** Portrait / Professional
- **Status:** [PLACEHOLDER: Upload portrait photo as `public/doctor-portrait.jpg`]
- Usage: Home page hero section, landing page testimonial area, footer

### Motion Graphics (Home Page Background)
- **Type:** Floating teeth particles + dental tools animation
- **Implementation:** HTML5 Canvas or CSS keyframe animation
- **Elements:** Small white/light-blue tooth icons, toothbrush, mirror floating slowly
- **Behavior:** Slow drift, slight rotation, low opacity (0.08–0.15) so it doesn't distract
- **Performance:** Pure CSS preferred; JS canvas fallback if needed
- **Must NOT hurt page load speed** — lazy load the animation

---

## 5. PROJECT FILE STRUCTURE

```
drjerins-dental/
├── public/
│   ├── logo.png                    [PLACEHOLDER: Upload logo]
│   ├── doctor-portrait.jpg         [PLACEHOLDER: Upload Dr. Jerin's portrait]
│   ├── dental-banner-1.jpg         [PLACEHOLDER: Dental clinic banner photo]
│   ├── dental-banner-2.jpg         [PLACEHOLDER: Dental clinic interior photo]
│   ├── before-after-1.jpg          [PLACEHOLDER: Before/After treatment photo 1]
│   ├── before-after-2.jpg          [PLACEHOLDER: Before/After treatment photo 2]
│   ├── favicon.ico
│   ├── og-image.jpg                [PLACEHOLDER: 1200x630 social share image]
│   └── animations/
│       └── dental-particles.json   (Lottie JSON or CSS animation data)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              (Root layout — fonts, metadata, Bangla toggle provider)
│   │   ├── page.tsx                (Home Page / Main entry)
│   │   ├── landing/
│   │   │   └── page.tsx            (Funnel/Landing Page)
│   │   ├── services/
│   │   │   └── page.tsx            (Services Page)
│   │   ├── auth/
│   │   │   ├── login/page.tsx      (Patient Login)
│   │   │   └── signup/page.tsx     (Patient Sign Up)
│   │   ├── dashboard/
│   │   │   ├── page.tsx            (Patient Dashboard Home)
│   │   │   ├── history/page.tsx    (Visit History)
│   │   │   ├── reports/page.tsx    (Reports / X-rays)
│   │   │   ├── appointments/page.tsx (My Appointments)
│   │   │   ├── payments/page.tsx   (Payment History — toggled by admin)
│   │   │   └── profile/page.tsx    (Edit Profile)
│   │   ├── book-appointment/
│   │   │   └── page.tsx            (Appointment Booking Form)
│   │   ├── admin/
│   │   │   ├── page.tsx            (Admin Dashboard)
│   │   │   ├── patients/page.tsx   (Patient Management)
│   │   │   ├── leads/page.tsx      (Funnel Leads)
│   │   │   ├── appointments/page.tsx
│   │   │   ├── payments/page.tsx
│   │   │   ├── whatsapp/page.tsx   (WhatsApp Approval Queue)
│   │   │   └── settings/page.tsx
│   │   ├── receptionist/
│   │   │   ├── page.tsx            (Receptionist Portal Home)
│   │   │   ├── entry/page.tsx      (Data Entry)
│   │   │   └── appointments/page.tsx
│   │   └── api/
│   │       ├── auth/[...]/route.ts
│   │       ├── leads/route.ts
│   │       ├── patients/route.ts
│   │       ├── appointments/route.ts
│   │       ├── payments/route.ts
│   │       ├── whatsapp/route.ts
│   │       ├── pdf/route.ts
│   │       └── admin/route.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── BanglaToggle.tsx    (Floating button on all pages)
│   │   │   └── BuiltBy.tsx         (Built by Baba Puson — bottom of every page)
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── DentalAnimation.tsx (Motion graphics background)
│   │   │   ├── ServicesPreview.tsx
│   │   │   ├── MiniMap.tsx
│   │   │   └── BookingCTA.tsx      (Glorified Book Appointment button)
│   │   ├── landing/
│   │   │   ├── FunnelHero.tsx
│   │   │   ├── LeadForm.tsx
│   │   │   └── BeforeAfter.tsx
│   │   ├── dashboard/
│   │   │   ├── PatientProfile.tsx
│   │   │   ├── VisitCard.tsx
│   │   │   └── PaymentRow.tsx
│   │   ├── admin/
│   │   │   ├── PatientTable.tsx
│   │   │   ├── LeadTable.tsx
│   │   │   ├── WhatsAppQueue.tsx
│   │   │   └── PDFExport.tsx
│   │   └── shared/
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       └── QRPayment.tsx
│   │
│   ├── lib/
│   │   ├── supabase.ts             (Supabase client)
│   │   ├── supabaseAdmin.ts        (Supabase admin client — server only)
│   │   ├── whatsapp.ts             (WhatsApp Cloud API functions)
│   │   ├── mailchimp.ts            (Mailchimp API functions)
│   │   └── pdf.ts                  (PDF generation functions)
│   │
│   ├── context/
│   │   └── LanguageContext.tsx     (Bangla/English toggle context)
│   │
│   ├── translations/
│   │   ├── en.json                 (English strings)
│   │   └── bn.json                 (Bangla strings — full translation)
│   │
│   ├── middleware.ts               (Auth protection for /dashboard, /admin, /receptionist)
│   └── types/
│       └── index.ts                (TypeScript types for all entities)
│
├── .env.local                      (Environment variables — NEVER commit to GitHub)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 6. DATABASE SCHEMA

### Supabase Tables

#### Table: `profiles` (Patient / User data)
```sql
CREATE TABLE profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name       TEXT NOT NULL,
  phone           TEXT UNIQUE NOT NULL,
  email           TEXT UNIQUE,
  photo_url       TEXT,                        -- Supabase Storage URL
  date_of_birth   DATE,
  gender          TEXT,                        -- 'male', 'female', 'other'
  address         TEXT,
  blood_group     TEXT,
  emergency_contact TEXT,
  show_payment    BOOLEAN DEFAULT TRUE,        -- Admin toggle: show payment to patient
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### Table: `staff` (Admin, Receptionist)
```sql
CREATE TABLE staff (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES auth.users(id),
  full_name       TEXT NOT NULL,
  role            TEXT NOT NULL,               -- 'admin', 'receptionist'
  phone           TEXT,
  email           TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### Table: `visits` (Patient visit / treatment history)
```sql
CREATE TABLE visits (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID REFERENCES profiles(id) ON DELETE CASCADE,
  visit_date      DATE NOT NULL,
  chief_complaint TEXT,                        -- Why patient came
  treatment_done  TEXT,                        -- What was done
  doctor_notes    TEXT,                        -- Dr. Jerin's private notes
  prescription    TEXT,                        -- Prescribed medicines
  next_visit_date DATE,                        -- Next appointment date
  next_visit_note TEXT,                        -- What to do next visit
  created_by      UUID REFERENCES staff(id),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### Table: `reports` (X-rays, images, files)
```sql
CREATE TABLE reports (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id        UUID REFERENCES visits(id) ON DELETE CASCADE,
  patient_id      UUID REFERENCES profiles(id) ON DELETE CASCADE,
  file_name       TEXT NOT NULL,
  file_url        TEXT NOT NULL,               -- Supabase Storage URL
  file_type       TEXT,                        -- 'xray', 'prescription', 'report', 'other'
  file_size_kb    INTEGER,
  uploaded_by     UUID REFERENCES staff(id),
  uploaded_at     TIMESTAMPTZ DEFAULT NOW()
);
```

#### Table: `appointments` (Booking requests)
```sql
CREATE TABLE appointments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID REFERENCES profiles(id),
  patient_name    TEXT,                        -- For non-registered (funnel leads)
  patient_phone   TEXT,
  requested_date  DATE,
  requested_time  TEXT,                        -- e.g. "10:00 AM"
  reason          TEXT,
  status          TEXT DEFAULT 'pending',      -- 'pending', 'confirmed', 'cancelled', 'completed'
  confirmed_date  DATE,
  confirmed_time  TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### Table: `payments` (Payment tracking)
```sql
CREATE TABLE payments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID REFERENCES profiles(id) ON DELETE CASCADE,
  visit_id        UUID REFERENCES visits(id),
  amount          DECIMAL(10,2) NOT NULL,
  payment_type    TEXT,                        -- 'cash', 'bkash', 'nagad', 'online', 'other'
  payment_status  TEXT DEFAULT 'paid',         -- 'paid', 'partial', 'due'
  paid_amount     DECIMAL(10,2) DEFAULT 0,
  due_amount      DECIMAL(10,2) DEFAULT 0,
  transaction_id  TEXT,                        -- bKash/online transaction reference
  payment_date    DATE,
  notes           TEXT,
  recorded_by     UUID REFERENCES staff(id),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### Table: `leads` (Funnel form submissions)
```sql
CREATE TABLE leads (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       TEXT NOT NULL,
  phone           TEXT NOT NULL,
  email           TEXT,
  source          TEXT DEFAULT 'funnel',       -- 'funnel', 'facebook', 'google', etc.
  status          TEXT DEFAULT 'new',          -- 'new', 'contacted', 'converted', 'lost'
  notes           TEXT,
  converted_to    UUID REFERENCES profiles(id), -- If they became a patient
  whatsapp_sent   BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### Table: `whatsapp_queue` (Message approval queue)
```sql
CREATE TABLE whatsapp_queue (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_phone TEXT NOT NULL,
  recipient_name  TEXT,
  patient_id      UUID REFERENCES profiles(id),
  trigger_type    TEXT NOT NULL,               -- 'welcome', 'reminder', 'followup', 'due', 'festival'
  message_body    TEXT NOT NULL,               -- Full message in Bangla
  status          TEXT DEFAULT 'pending',      -- 'pending', 'approved', 'sent', 'rejected'
  approved_by     UUID REFERENCES staff(id),
  approved_at     TIMESTAMPTZ,
  sent_at         TIMESTAMPTZ,
  error_message   TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS) Rules
```
- profiles: Patient can read/update ONLY their own row (WHERE id = auth.uid())
- visits: Patient can read their own. Staff can read/write all.
- reports: Patient can read their own. Staff can read/write all.
- appointments: Patient can read/create their own. Staff can read/update all.
- payments: Patient can read their own ONLY IF profiles.show_payment = TRUE
- leads: Only staff (admin) can read/write
- whatsapp_queue: Only staff (admin) can read/approve/reject
- staff: Only admin role can manage
```

---

## 7. PAGE-BY-PAGE SPECIFICATION

---

### 7.1 LANDING / FUNNEL PAGE
**Route:** `/landing`  
**Purpose:** Digital marketing target page. Converts visitors into leads.  
**Linked From:** Facebook Ads, Google Ads, WhatsApp campaigns

#### Layout (top to bottom)
```
┌──────────────────────────────────────────────┐
│  HEADER: Logo (left) + "Dr. Jerin's Dental   │
│          Point" text (right)                  │
├──────────────────────────────────────────────┤
│  HERO SECTION                                 │
│  Headline: "আপনার হাসি আমাদের দায়িত্ব"      │
│  (English: "Your Smile is Our Responsibility")│
│  Sub: Professional dental care in Dhaka       │
│  BG: Blue gradient with subtle dental SVG     │
├──────────────────────────────────────────────┤
│  LEAD CAPTURE FORM (Center, card style)       │
│  Title: "Book a FREE Consultation"            │
│  Fields:                                      │
│    - Full Name* (text input)                  │
│    - Phone Number* (tel input, BD format)     │
│    - Email Address (email input, optional)    │
│  Button: "Get My Appointment →"               │
│    (Royal Blue, large, full-width on mobile)  │
│  Trust text below: "✓ 100% Free ✓ No Spam"   │
├──────────────────────────────────────────────┤
│  BEFORE / AFTER SECTION                       │
│  [PLACEHOLDER: before-after-1.jpg]            │
│  [PLACEHOLDER: before-after-2.jpg]            │
│  Toggle slider (if two images side-by-side)   │
├──────────────────────────────────────────────┤
│  WHY CHOOSE US section (3 icon cards)         │
│  - 🦷 Expert Dentist  - 💙 Gentle Care        │
│  - 📋 Full Records    - 💳 Affordable         │
├──────────────────────────────────────────────┤
│  SERVICES TEASER (mini cards, 4-6 services)   │
├──────────────────────────────────────────────┤
│  DR. JERIN SECTION                            │
│  [PLACEHOLDER: doctor-portrait.jpg] + bio     │
│  "BDS Degree | X years experience" etc.       │
│  [PLACEHOLDER: Fill in Dr. Jerin's bio/quals] │
├──────────────────────────────────────────────┤
│  SECOND FORM (repeat lead form, sticky CTA)   │
├──────────────────────────────────────────────┤
│  FOOTER: Address, Phone, Social Links         │
│  "Built by Baba Puson"                        │
└──────────────────────────────────────────────┘
```

#### Behavior
- On form submit: Data stored in `leads` table in Supabase
- Phone number formatted as BD standard (+880 prefix added automatically)
- WhatsApp welcome message queued in `whatsapp_queue` (status: pending → admin approves)
- Lead added to Mailchimp audience automatically
- Thank you modal shown: "ধন্যবাদ! আমরা শীঘ্রই যোগাযোগ করব।"
- No page reload on submit (AJAX)
- Form validation: Name required, Phone required (BD format), Email optional

#### SEO Tags (this page)
```html
<title>ডেন্টাল চেকআপ – Dr. Jerin's Dental Point | Dhaka</title>
<meta name="description" content="Dhaka-র সেরা দাঁতের ডাক্তার। বিনামূল্যে পরামর্শ নিন।">
```

---

### 7.2 MAIN HOME PAGE (Patient Entry Point)
**Route:** `/`  
**Purpose:** First page patients see when they visit the website directly.

#### Layout (top to bottom)
```
┌──────────────────────────────────────────────┐
│  FULL-SCREEN HERO (100vh)                     │
│  Background: Motion animation (teeth/tools)   │
│    - Royal Blue gradient base                 │
│    - Floating tooth icons (low opacity white) │
│    - Floating dental tool silhouettes         │
│  Overlay Content:                             │
│    - Logo centered                            │
│    - "Dr. Jerin's Dental Point"              │
│    - Tagline: "Your Smile, Our Expertise"     │
│    - [GLORIFIED "BOOK AN APPOINTMENT" BUTTON] │
│      Style: Large, glowing, pulsing white CTA │
│      "📅 Book Your Appointment Today →"       │
│    - Sign Up | Login buttons (smaller, below) │
├──────────────────────────────────────────────┤
│  DR. JERIN INTRODUCTION                       │
│  [portrait photo left] [bio text right]       │
│  [PLACEHOLDER: dental-banner-1.jpg as BG]     │
├──────────────────────────────────────────────┤
│  SERVICES PREVIEW (click → /services)         │
│  "View All Services →" button                 │
├──────────────────────────────────────────────┤
│  BOOK APPOINTMENT SECTION (2nd glorified CTA) │
│  Large blue card: "Ready to Smile Better?"    │
│  "Book Appointment" button → /book-appointment│
├──────────────────────────────────────────────┤
│  MINI GOOGLE MAP                              │
│  Embedded iframe from Google Maps             │
│  Location: Dr. Jerin's Dental Point           │
│  Maps Link: https://share.google/5aWMuv9lwt8dM5w9w │
│  Below map: Address text, Phone number        │
├──────────────────────────────────────────────┤
│  FOOTER                                       │
│  [Logo] [Dr. Jerin portrait thumb]            │
│  Address | Phone | Email                      │
│  Social: Facebook | WhatsApp                  │
│  Copyright 2025 Dr. Jerin's Dental Point      │
│  "Built by Baba Puson"  ← small, bottom right │
└──────────────────────────────────────────────┘
```

#### "Book an Appointment" CTA — GLORIFIED DESIGN SPEC
```
- Size: Full-width on mobile, 400px centered on desktop
- Background: White with blue border glow
- Text: "📅 Book Your Appointment" (large, bold, blue)
- Subtitle: "It's quick & easy" (small, gray)
- Animation: Subtle pulse / glow every 3 seconds
- On hover: Scale up 1.05x, shadow deepens
- Position on hero: Center, below tagline, above sign-in buttons
```

#### Bangla Toggle Button
- Fixed position: Bottom-left corner on all pages (mobile: bottom-right)
- Style: Small round button, blue background, "বাং" text in white
- On click: Toggles all text on page between English and Bangla instantly
- State persists in localStorage

---

### 7.3 SERVICES PAGE
**Route:** `/services`

#### Services List (Demo — Editable by Admin Later)
```
1.  Dental Consultation & Checkup
    Description: Complete oral examination and personalized dental advice.

2.  Professional Teeth Cleaning (Scaling)
    Description: Remove plaque, tartar, and stains for a healthier smile.

3.  Tooth Filling (Composite / Amalgam)
    Description: Painless cavity filling with tooth-colored or standard material.

4.  Root Canal Treatment
    Description: Save your infected tooth with our precise, pain-free RCT.

5.  Tooth Extraction
    Description: Safe and gentle removal of damaged or wisdom teeth.

6.  Dental Braces (Orthodontics)
    Description: Metal, ceramic, or clear aligners to straighten your teeth.

7.  Teeth Whitening
    Description: Professional whitening for a brighter, confident smile.

8.  Dental Crown & Bridge
    Description: Restore damaged teeth with natural-looking crowns and bridges.

9.  Complete / Partial Dentures
    Description: Comfortable, well-fitted dentures for missing teeth.

10. Pediatric Dentistry (Children's Dental Care)
    Description: Gentle dental care specially designed for children.

11. Dental Implants
    Description: Permanent tooth replacement that looks and feels natural.

12. Gum Disease Treatment (Periodontics)
    Description: Treat bleeding gums and periodontal disease effectively.

13. Smile Makeover
    Description: Complete smile transformation with combined cosmetic procedures.

14. Emergency Dental Care
    Description: Immediate treatment for toothaches, broken teeth, and pain.
```

#### Service Card Design
- Grid: 2 cols mobile, 3 cols desktop
- Each card: Blue icon top, service name, short description, "Learn More" button
- Card hover: Lift shadow, blue border appears

---

### 7.4 PATIENT AUTH PAGES
**Route:** `/auth/signup` and `/auth/login`

#### Sign Up Flow
```
Step 1: Enter full name + phone number
Step 2: Enter OTP received on phone (via Supabase Phone Auth / SMS)
Step 3: Set password (minimum 8 characters)
Step 4: Optional — add email, date of birth, gender
Step 5: Upload profile photo (optional, circle crop, standard)
→ Redirect to /dashboard
```

#### Login Flow
```
Option A: Phone + Password
Option B: Phone + OTP (one-time login)
→ Redirect to /dashboard
→ WhatsApp "Login Welcome" message queued (admin approves before sending)
```

#### Design
- Clean minimal card centered on page
- Royal Blue header bar with logo
- Progress indicator for multi-step signup

---

### 7.5 PATIENT DASHBOARD / PORTAL
**Route:** `/dashboard`  
**Access:** Logged-in patients only (middleware protected)

#### Dashboard Home — Layout
```
┌──────────────────────────────────────────────┐
│  HEADER: Logo + Patient Name + Logout         │
├──────────────────────────────────────────────┤
│  WELCOME CARD                                 │
│  "Welcome back, [Name]! 👋"                   │
│  Profile photo (circle) | Next appointment    │
├──────────────────────────────────────────────┤
│  QUICK STATS ROW                              │
│  [Total Visits] [Next Appt] [Outstanding Due] │
│  (Due shown only if show_payment = true)      │
├──────────────────────────────────────────────┤
│  NAVIGATION TILES (2x2 grid)                 │
│  📋 Visit History | 📁 My Reports            │
│  📅 Appointments  | 💳 Payments              │
│  (Payments tile hidden if show_payment=false) │
├──────────────────────────────────────────────┤
│  RECENT VISIT (last 1 visit preview)          │
│  Date | Treatment | Doctor's Note            │
│  "View All History →"                         │
├──────────────────────────────────────────────┤
│  BOOK APPOINTMENT BUTTON (blue, prominent)    │
└──────────────────────────────────────────────┘
```

#### Visit History Page `/dashboard/history`
```
- List of all visits (sorted newest first)
- Each item shows:
  - Visit Date
  - Chief Complaint
  - Treatment Done
  - Doctor's Notes
  - Next Visit Date (if any)
  - Download PDF button → generates patient-specific PDF
```

#### Reports Page `/dashboard/reports`
```
- Grid of uploaded files (X-rays, prescriptions, lab reports)
- Each card: file name, date, type badge, "View" and "Download" buttons
- Images preview inline; PDFs open in new tab
```

#### Appointments Page `/dashboard/appointments`
```
- List of requested appointments with status badge
  - 🟡 Pending | 🟢 Confirmed | ❌ Cancelled | ✅ Completed
- "Request New Appointment" button → /book-appointment
- Confirmed appointment shows: date, time, any notes from doctor
```

#### Payments Page `/dashboard/payments`
```
- ONLY shown if profiles.show_payment = TRUE (admin toggle)
- Table: Date | Visit | Amount | Paid | Due | Method
- Total summary at top: Total Paid | Total Due
- "Pay Now" button → shows bKash QR / payment info modal
```

#### Profile Edit Page `/dashboard/profile`
```
Editable fields:
- Profile photo (upload, auto-crop to circle)
- Full Name
- Email address
- Phone number (requires OTP verification on change)
- Date of birth
- Gender
- Address

Non-editable by patient (admin-only):
- Patient ID
- Registration date
- Medical history records
```

---

### 7.6 ADMIN PANEL
**Route:** `/admin`  
**Access:** Staff with role = 'admin' only (2FA protected)  
**Login:** Email + Password + 2FA code (TOTP via Google Authenticator)

#### Admin Dashboard Home
```
┌──────────────────────────────────────────────┐
│  SIDEBAR (left, collapsible on mobile)        │
│  - Dashboard                                  │
│  - Patients                                   │
│  - Leads (Funnel)                             │
│  - Appointments                               │
│  - Payments                                   │
│  - WhatsApp Queue                             │
│  - Settings                                   │
│  - Logout                                     │
├──────────────────────────────────────────────┤
│  MAIN AREA                                    │
│  Stats Cards Row:                             │
│  [Total Patients] [Today's Appts]             │
│  [New Leads Today] [Total Due Amount]         │
│  [Pending WhatsApp] [Pending Appointments]    │
├──────────────────────────────────────────────┤
│  Recent Appointments (table)                  │
│  Recent Leads (table)                         │
│  Pending WhatsApp Messages (urgent list)      │
└──────────────────────────────────────────────┘
```

#### Patient Management `/admin/patients`
```
Features:
- Search by name / phone / ID
- Filter: active, inactive, by date range
- Patient list table: Name | Phone | Last Visit | Due Amount | Actions
- Actions per patient:
  - View Full Profile
  - Add Visit / Treatment Record
  - Upload Report / X-ray
  - Add Payment
  - Edit Profile
  - Toggle payment visibility (show/hide payment from patient)
  - Deactivate / Delete
- Add New Patient button (manual registration)
```

#### Patient Detail Page (Admin)
```
Tabs:
1. Profile — All personal info + edit
2. Visit History — Full timeline of visits + add new
3. Reports — Files + upload new
4. Appointments — All appointments + manage
5. Payments — Full payment history + record payment
6. WhatsApp — All messages sent to this patient
```

#### Leads Management `/admin/leads`
```
- Table: Name | Phone | Email | Source | Date | Status | WhatsApp Sent | Actions
- Filter by status: new, contacted, converted, lost
- Actions per lead:
  - Convert to Patient (creates profile, links lead)
  - Mark as Contacted
  - Mark as Lost
  - Send WhatsApp (manual, opens message composer)
  - Add Note
- Export leads to CSV button
```

#### Appointments Management `/admin/appointments`
```
- Calendar view + list view toggle
- Pending appointments highlighted in yellow
- Actions: Confirm | Reschedule | Cancel | Mark Complete
- Auto-sends WhatsApp reminder 1 day before (after admin approval)
- "Add Appointment" for walk-in patients
```

#### Payments Management `/admin/payments`
```
- Table: Patient | Date | Amount | Paid | Due | Method | Actions
- Filter: all, with due, by date, by method
- Add Payment record (manual)
- Track bKash transactions (enter transaction ID)
- Monthly summary report
- Export to PDF
- Total outstanding dues summary card at top
```

#### WhatsApp Approval Queue `/admin/whatsapp`
```
- List of pending messages with:
  - Recipient name + phone
  - Trigger type (welcome/reminder/followup/due/festival)
  - Message preview (full Bangla text)
  - "Approve & Send" button (green)
  - "Reject" button (red)
  - "Edit Message" button (edit before sending)
- Sent messages log below
- Manual compose: Select patient → write message → send directly
```

#### Settings `/admin/settings`
```
- Chamber info (name, address, phone, email)
- WhatsApp templates (edit Bangla message templates)
- Payment visibility global toggle (default on/off for new patients)
- bKash/Nagad account info for QR display
- [PLACEHOLDER: QR code images for payment]
- Staff management (add/edit/deactivate receptionist accounts)
- Admin 2FA setup / reset
```

---

### 7.7 RECEPTIONIST PORTAL
**Route:** `/receptionist`  
**Access:** Staff with role = 'receptionist' only  
**Login:** Email + Password (no 2FA required, but session expires after 8 hours)

#### Available Actions
```
✅ Search existing patients by name/phone
✅ Add new patient (basic profile only)
✅ Add visit record (treatment data entry)
✅ View and manage appointments
✅ View patient profile
✅ Upload reports/files for a visit
❌ Cannot access Leads (admin only)
❌ Cannot access Payment records
❌ Cannot access WhatsApp queue
❌ Cannot delete patients
❌ Cannot change payment settings
```

---

### 7.8 APPOINTMENT BOOKING PAGE
**Route:** `/book-appointment`  
**Access:** Public (any visitor) + Logged-in patients

#### Form Fields
```
- Full Name* (prefilled if logged in)
- Phone Number* (prefilled if logged in)
- Email (prefilled if logged in)
- Preferred Date* (date picker)
- Preferred Time* (time slots: 9AM, 10AM, 11AM, 2PM, 3PM, 4PM, 5PM)
- Reason for Visit* (dropdown or text)
- Any Special Note (text area)
- [Submit Button] "Request Appointment →"
```

#### After Submit
```
- Data stored in appointments table (status: pending)
- Thank you confirmation shown
- Patient receives WhatsApp confirmation (queued for admin approval)
- Admin sees new pending appointment on dashboard
```

---

## 8. API ENDPOINTS

All endpoints in `/src/app/api/`

```
POST   /api/leads              → Save lead from funnel form
GET    /api/leads              → Admin: Get all leads (paginated, filtered)
PATCH  /api/leads/[id]         → Admin: Update lead status

GET    /api/patients           → Admin: Get all patients
POST   /api/patients           → Admin: Create patient
GET    /api/patients/[id]      → Admin/Patient: Get patient profile
PATCH  /api/patients/[id]      → Admin/Patient: Update patient profile
DELETE /api/patients/[id]      → Admin: Deactivate patient

POST   /api/visits             → Admin/Receptionist: Add visit
GET    /api/visits/[patientId] → Admin: All visits | Patient: Own visits

POST   /api/reports            → Upload file to Supabase Storage
GET    /api/reports/[patientId]→ Get reports for patient

POST   /api/appointments       → Create appointment (public)
GET    /api/appointments       → Admin: All | Patient: Own
PATCH  /api/appointments/[id]  → Admin: Update status

POST   /api/payments           → Admin: Record payment
GET    /api/payments/[patientId] → Get payments (respects show_payment flag)

POST   /api/whatsapp/queue     → Add message to approval queue
POST   /api/whatsapp/approve   → Admin: Approve and send message
POST   /api/whatsapp/send      → Internal: Actually send via Meta API
GET    /api/whatsapp/queue     → Admin: Get pending messages

GET    /api/pdf/patient/[id]   → Generate patient report PDF
GET    /api/pdf/payment/[id]   → Generate payment receipt PDF
```

---

## 9. WHATSAPP AUTOMATION LOGIC

**Provider:** Meta WhatsApp Cloud API (Official, Free: 1,000 conversations/month)  
**Language:** All messages in FULL BANGLA (Bengali script, not romanized)  
**Approval:** All auto-generated messages go to `whatsapp_queue` with status=pending. Admin MUST approve before sending. Manual messages can be sent directly.

### Message Templates (Bangla)

**1. Funnel Welcome (Trigger: Lead form submitted)**
```
প্রিয় [নাম],

ডেন্টাল পয়েন্টে আপনাকে স্বাগতম! 🦷

আমরা আপনার অ্যাপয়েন্টমেন্ট অনুরোধটি পেয়েছি। 
শীঘ্রই আমাদের টিম আপনার সাথে যোগাযোগ করবে।

আপনার হাসি আমাদের দায়িত্ব। 😊

— Dr. Jerin's Dental Point
[PLACEHOLDER: Chamber phone number]
```

**2. Login Welcome (Trigger: Patient logs in)**
```
প্রিয় [নাম],

আপনি সফলভাবে আপনার ডেন্টাল পোর্টালে লগইন করেছেন। ✅

আপনার ভিজিট হিস্ট্রি ও রিপোর্ট দেখতে পারবেন।

— Dr. Jerin's Dental Point
```

**3. Appointment Reminder (Trigger: 1 day before appointment)**
```
প্রিয় [নাম],

মনে করিয়ে দিতে চাই — আপনার আগামীকাল অ্যাপয়েন্টমেন্ট আছে! 📅

📍 তারিখ: [তারিখ]
⏰ সময়: [সময়]

সময়মতো আসুন। কোনো প্রশ্ন থাকলে কল করুন।

— Dr. Jerin's Dental Point
[PLACEHOLDER: Chamber phone number]
```

**4. Post-Treatment Follow-up (Trigger: 3 days after treatment marked complete)**
```
প্রিয় [নাম],

আপনার সম্প্রতি চিকিৎসার পর আপনি কেমন আছেন? 🙏

কোনো সমস্যা বা অস্বস্তি হলে অবশ্যই জানাবেন।

আপনার পরবর্তী ভিজিট: [পরবর্তী তারিখ]

— Dr. Jerin's Dental Point
```

**5. Payment Due Reminder (Trigger: Manual or Scheduled)**
```
প্রিয় [নাম],

আপনার বকেয়া পেমেন্ট মনে করিয়ে দিতে চাই।

💰 বকেয়া পরিমাণ: ৳[পরিমাণ]

পেমেন্টের জন্য আমাদের সাথে যোগাযোগ করুন।

— Dr. Jerin's Dental Point
[PLACEHOLDER: bKash number]
```

**6. Festival Wishes (Trigger: Manual batch send — admin selects recipients)**
```
প্রিয় [নাম],

[উৎসবের নাম]-এর শুভেচ্ছা রইল! 🎉

আপনার ও আপনার পরিবারের জন্য শুভকামনা।

— Dr. Jerin's Dental Point
```

### WhatsApp Automation Flow
```
Trigger Event
     ↓
Message Generated (server-side)
     ↓
Added to whatsapp_queue (status: pending)
     ↓
Admin notified (dashboard badge count++)
     ↓
Admin reviews message text → Approve / Reject / Edit
     ↓
If Approved → POST to Meta WhatsApp Cloud API
     ↓
Status updated → 'sent' + timestamp saved
```

---

## 10. SECURITY IMPLEMENTATION

### Layers of Security

**1. Authentication**
- Supabase Auth handles all session tokens (JWT)
- JWT expiry: 1 hour access token, 7 days refresh token
- Admin 2FA: TOTP (Time-based One-Time Password) via Google Authenticator
- All auth routes protected by Next.js middleware

**2. Authorization (Row Level Security)**
- Supabase RLS enabled on ALL tables (see Section 6)
- Service-role key NEVER exposed to frontend (admin operations via server-side API routes only)
- Receptionist role enforced server-side

**3. Data Protection**
- All data encrypted at rest (Supabase default AES-256)
- All connections via HTTPS/TLS (automatic on Vercel + Supabase)
- Patient files in Supabase Storage with signed URLs (expire after 1 hour)
- No patient data in URL params (use POST body or session)

**4. Input Security**
- All form inputs sanitized server-side (zod validation)
- SQL injection impossible (Supabase uses parameterized queries)
- XSS prevention: React escapes all output by default + DOMPurify for any HTML
- Rate limiting on API routes: max 10 requests per minute per IP (Vercel Edge config)
- CSRF tokens on all forms

**5. Admin Panel Protection**
- Admin panel (`/admin/*`) blocked entirely for non-admin users via middleware
- Receptionist portal (`/receptionist/*`) blocked for non-receptionist users
- 2FA mandatory for admin login
- Session invalidated after 4 hours of inactivity (admin)
- Failed login attempts: lock after 5 fails for 15 minutes

**6. File Upload Security**
- Allowed file types: jpg, jpeg, png, pdf only
- Max file size: 10MB per file
- Files scanned: type verified server-side (not just extension)
- Files stored in private Supabase bucket (not public URL)

**7. Environment Variables (NEVER in frontend code)**
```
# .env.local — NEVER commit to GitHub
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=         ← SERVER ONLY
WHATSAPP_ACCESS_TOKEN=              ← SERVER ONLY
WHATSAPP_PHONE_NUMBER_ID=           ← SERVER ONLY
MAILCHIMP_API_KEY=                  ← SERVER ONLY
MAILCHIMP_AUDIENCE_ID=              ← SERVER ONLY
NEXTAUTH_SECRET=                    ← SERVER ONLY
ADMIN_2FA_SECRET=                   ← SERVER ONLY
```

---

## 11. SEO / AEO / GEO STRATEGY

### Target Location
Primary areas (30km radius from Bashabo, Dhaka):
- Bashabo, Mugda, Bonoshree, Rampura, Malibagh, Motijheel, Khilgaon, Shantinagar, Siddhirganj, Narayanganj border

### Technical SEO (Implementation)
```tsx
// src/app/layout.tsx — Root metadata
export const metadata = {
  metadataBase: new URL('https://[subdomain].vercel.app'),
  title: {
    default: "Dr. Jerin's Dental Point | Best Dentist in Bashabo, Dhaka",
    template: "%s | Dr. Jerin's Dental Point"
  },
  description: "ঢাকার বাসাবো, মুগদা, রামপুরায় সেরা দাঁতের ডাক্তার। দাঁতের সব সমস্যার সমাধান। অ্যাপয়েন্টমেন্ট বুক করুন।",
  keywords: ["dentist dhaka", "দাঁতের ডাক্তার ঢাকা", "dental bashabo", "dental mugda", 
             "Dr Jerin dental", "teeth cleaning dhaka", "root canal dhaka", "dental point"],
  openGraph: {
    title: "Dr. Jerin's Dental Point",
    description: "Professional dental care in Dhaka",
    images: ['/og-image.jpg'],  // [PLACEHOLDER]
    type: 'website',
    locale: 'bn_BD',
  },
  alternates: {
    canonical: 'https://[subdomain].vercel.app',
    languages: { 'bn-BD': '/bn', 'en-US': '/' }
  }
}
```

### Local Business Schema (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Dr. Jerin's Dental Point",
  "image": "[PLACEHOLDER: clinic image URL]",
  "telephone": "[PLACEHOLDER: phone number]",
  "email": "[PLACEHOLDER: email]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[PLACEHOLDER: full address]",
    "addressLocality": "Bashabo",
    "addressRegion": "Dhaka",
    "postalCode": "[PLACEHOLDER]",
    "addressCountry": "BD"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[PLACEHOLDER: from Google Maps]",
    "longitude": "[PLACEHOLDER: from Google Maps]"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Saturday","Sunday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "৳৳",
  "url": "[subdomain].vercel.app",
  "sameAs": [
    "[PLACEHOLDER: Facebook page URL]"
  ]
}
```

### AEO (Answer Engine Optimization — for AI search like ChatGPT, Gemini)
- FAQ section on home page with structured Q&A markup
- Clear, concise answers to common dental questions
- Questions like: "What is the cost of scaling in Dhaka?" / "Best dentist near Bashabo"

### GEO (Generative Engine Optimization)
- Use natural language throughout site
- Include location mentions naturally in content
- "Patients from Rampura, Malibagh, Mugda, Bonoshree trust us"

### Performance (Lighthouse Score Target: 90+)
- Next.js Image component for all images (auto WebP, lazy load)
- Font: loaded via next/font (no render block)
- Animation: CSS-based, not JS-heavy
- No third-party scripts blocking render
- Vercel Edge Network for CDN

---

## 12. EMAIL MARKETING INTEGRATION

**Provider:** Mailchimp (Free: 500 contacts, 1,000 emails/month)

### Triggers
- Lead form submit → Added to Mailchimp audience "Dental Point Leads"
- Patient signup → Added to "Dental Point Patients" audience
- Tags applied: 'lead', 'patient', 'due', 'new', etc.

### Setup Required
1. Create Mailchimp account (free)
2. Create audience "Dental Point Leads"
3. Create audience "Dental Point Patients"
4. Get API key → add to `.env.local`
5. Get Audience ID → add to `.env.local`

---

## 13. PAYMENT PORTAL

### In-App Payment (Free, No Gateway Fee)
- Method: Display bKash/Nagad QR code in a modal
- Patient clicks "Pay Now" → Modal opens with:
  - QR code image [PLACEHOLDER: bKash QR code image]
  - bKash number: [PLACEHOLDER: bKash merchant number]
  - Amount to pay: ৳[due amount]
  - Instructions: "Send money → Enter Amount → Use Reference: [Patient ID]"
- Patient sends payment manually
- Patient enters transaction ID in a form field
- Admin verifies and marks as paid in admin panel

### Admin Payment Recording
- Admin panel → Patient → Payments tab → "Record Payment"
- Fields: Amount, Method (Cash/bKash/Nagad/Other), Transaction ID, Date, Note
- System calculates remaining due automatically

---

## 14. BANGLA LANGUAGE TOGGLE

### Implementation
```tsx
// context/LanguageContext.tsx
// Provides { language, toggleLanguage } to all components
// language = 'en' | 'bn'
// All text strings come from translations/en.json or translations/bn.json

// Button component — fixed position on all pages
// Bottom-left desktop | Bottom-right mobile
// Shows "বাং" when English active | "ENG" when Bangla active
// On click: toggles, saves to localStorage, re-renders all text

// WhatsApp messages are ALWAYS in Bangla (not controlled by this toggle)
// Admin panel stays in English only (for clarity)
```

---

## 15. DEPLOYMENT GUIDE

### Step 1: GitHub Setup
```bash
git init
git remote add origin https://github.com/[your-username]/drjerins-dental
git push -u origin main
```

### Step 2: Supabase Setup
1. Go to supabase.com → New Project
2. Name: "drjerins-dental"
3. Password: [strong password — save it]
4. Region: Singapore (closest to Bangladesh)
5. Run all SQL from Section 6 in Supabase SQL Editor
6. Enable Phone Auth (Settings → Auth → Phone)
7. Enable RLS on all tables
8. Create Storage bucket: "reports" (private)
9. Copy: Project URL, Anon Key, Service Role Key

### Step 3: Vercel Deployment
1. Go to vercel.com → Import GitHub repo
2. Framework: Next.js (auto-detected)
3. Add all environment variables from `.env.local`
4. Deploy → Get subdomain: `drjerins-dental.vercel.app`

### Step 4: WhatsApp Cloud API
(See Section 16 — External Setup Checklist, Item 3)

### Step 5: Final Checks
- [ ] All pages load on mobile
- [ ] Sign up / Login works
- [ ] Funnel form saves to Supabase leads table
- [ ] Admin panel 2FA works
- [ ] WhatsApp queue shows messages
- [ ] PDF generation works
- [ ] Google Map loads correctly

---

## 16. ADMIN & EXTERNAL SETUP CHECKLIST

> This section is for **Puson (the builder)** — tasks that require manual external setup. These cannot be done by AI alone.

### ✅ One-Time Setup Tasks

**1. GitHub**
- [ ] Create GitHub account (github.com) if not done
- [ ] Create repository: "drjerins-dental" (private)
- [ ] Push code from Cursor/local to GitHub

**2. Supabase**
- [ ] Create account at supabase.com (free)
- [ ] Create new project (Singapore region)
- [ ] Run all database SQL scripts (from Section 6 of this doc)
- [ ] Enable Phone Auth (Settings → Auth → Providers → Phone)
- [ ] Enable Email Auth
- [ ] Create storage bucket named "reports" (set to private)
- [ ] Set up RLS policies (SQL provided in Section 6)
- [ ] Save: Project URL, Anon Key, Service Role Key

**3. Meta WhatsApp Cloud API**
- [ ] Go to developers.facebook.com
- [ ] Create a Meta Developer account
- [ ] Create a new App (type: Business)
- [ ] Add "WhatsApp" product to the app
- [ ] Create WhatsApp Business account (free)
- [ ] Get: Access Token (temporary → make permanent later), Phone Number ID
- [ ] Add test phone number for development
- [ ] Create message templates in Meta dashboard (submit Bangla templates for approval)
- [ ] Note: Template messages need Meta approval (24-48 hrs)
- [ ] For free tier: 1,000 conversations/month limit
- [ ] Save: Access Token, Phone Number ID → add to .env.local

**4. Vercel**
- [ ] Create account at vercel.com (free) using GitHub
- [ ] Import the GitHub repository
- [ ] Add all environment variables in Vercel dashboard
- [ ] Deploy → note the .vercel.app subdomain

**5. Mailchimp**
- [ ] Create account at mailchimp.com (free)
- [ ] Create audience: "Dental Point Leads"
- [ ] Create audience: "Dental Point Patients"  
- [ ] Go to Account → Extras → API Keys → Create Key
- [ ] Get Audience IDs (Lists → Audience → Audience ID)
- [ ] Save: API Key, both Audience IDs → add to .env.local

**6. Google Maps**
- [ ] The embed link provided: https://share.google/5aWMuv9lwt8dM5w9w
- [ ] Open this link → Click "Share" → "Embed a map" → Copy iframe code
- [ ] Paste iframe code into MiniMap component
- [ ] No API key needed for basic embed (free)

**7. Admin 2FA Setup**
- [ ] Download Google Authenticator on Dip dula vai's phone and Dr. Jerin's phone
- [ ] After first deployment, go to /admin/settings → Setup 2FA
- [ ] Scan QR code shown with Google Authenticator
- [ ] Save backup codes in a safe place (physical paper)

**8. Content to Upload (Puson's Task)**
- [ ] Logo file → `public/logo.png`
- [ ] Dr. Jerin's portrait → `public/doctor-portrait.jpg`
- [ ] Dental banner photos (2-3 minimum) → `public/dental-banner-*.jpg`
- [ ] Before/After photos → `public/before-after-*.jpg`
- [ ] OG image (1200x630) → `public/og-image.jpg`
- [ ] bKash QR code image → admin settings (upload in admin panel)
- [ ] Chamber details: exact address, phone, email, open hours
- [ ] Dr. Jerin's bio / qualifications text
- [ ] Facebook page URL (if exists)

**9. Optional Later (When Going Premium)**
- [ ] Custom domain (.com) — Namecheap or GoDaddy (~$10/year)
- [ ] Connect custom domain to Vercel (free)
- [ ] Upgrade Supabase to Pro ($25/month) when patient count grows
- [ ] Twilio for SMS (if WhatsApp alone not enough)
- [ ] Professional email (Google Workspace ~$6/month)

---

## 17. AI-ASSISTED BUILD PROCEDURE (A–Z)

> This section explains how Puson will build the entire project using AI tools with minimal manual coding.

### Recommended Primary Tool: Cursor AI
- **Why Cursor:** It's an AI-powered code editor that understands your full project. You describe what you want in plain English, and it writes the code. It also fixes errors automatically.
- **Download:** cursor.com (free tier available)
- **AI Model inside Cursor:** Use Claude claude-sonnet-4-20250514 (best for coding)

### Step-by-Step Build Procedure

**Phase 0: Preparation (30 minutes)**
1. Download and install Cursor AI (cursor.com)
2. Create all external accounts (GitHub, Supabase, Vercel, Mailchimp, Meta) — See Section 16
3. Gather all content: logo, photos, address, phone number, etc.
4. Create `.env.local` file with all API keys filled in

**Phase 1: Project Bootstrap (1-2 hours)**
```
1. Open Cursor AI
2. In Cursor chat, type:
   "Create a new Next.js 14 project with App Router, TypeScript, and Tailwind CSS. 
    Project name: drjerins-dental. Install: @supabase/supabase-js @supabase/auth-helpers-nextjs 
    framer-motion react-pdf zod react-hook-form. Set up the folder structure exactly as 
    described in this document: [paste Section 5]"
3. Cursor will create all folders and install packages
4. Add your logo and images to /public folder
```

**Phase 2: Database & Auth (2-3 hours)**
```
1. In Cursor: "Set up Supabase client in src/lib/supabase.ts and supabaseAdmin.ts"
2. Go to Supabase dashboard → SQL Editor → run all SQL from Section 6
3. In Cursor: "Create middleware.ts that protects /dashboard, /admin, /receptionist routes"
4. In Cursor: "Build the patient signup flow (phone OTP + password) using Supabase Auth"
5. In Cursor: "Build the patient login page with Phone+Password and Phone+OTP options"
6. Test: Register a test patient, login, verify redirect to /dashboard
```

**Phase 3: Design System (1 hour)**
```
1. In Cursor: "Set up Tailwind config with this color palette: [paste Section 4 colors]"
2. In Cursor: "Create shared components: Button.tsx, Modal.tsx, Header.tsx, Footer.tsx, 
               BanglaToggle.tsx, BuiltBy.tsx"
3. In Cursor: "Create the language context system with en.json and bn.json translation files"
```

**Phase 4: Home Page (2-3 hours)**
```
1. In Cursor: "Build the Home page at app/page.tsx. 
               Include: full-screen hero with blue gradient + dental animation background, 
               glorified Book Appointment CTA button with pulse animation, 
               Sign Up and Login buttons, Dr. Jerin section, Services preview, 
               Mini Google Map iframe [paste embed code], Footer with all info, 
               Built by Baba Puson at bottom."
2. Add the dental particle animation (Cursor will write CSS keyframes)
3. Test on mobile viewport
```

**Phase 5: Landing/Funnel Page (2 hours)**
```
1. In Cursor: "Build the Landing Page at app/landing/page.tsx.
               Very attractive conversion-focused design.
               Include: Hero with blue gradient, Lead capture form (Name, Phone, Email),
               Before/After photo section, Why Choose Us, Services teaser, Doctor section.
               On form submit: POST to /api/leads, show thank you modal."
2. In Cursor: "Build POST /api/leads route that saves to Supabase leads table and 
               queues a WhatsApp welcome message in whatsapp_queue table."
```

**Phase 6: Patient Dashboard (3-4 hours)**
```
1. In Cursor: "Build the Patient Dashboard at app/dashboard/page.tsx with sidebar navigation.
               Pages: Home, Visit History, Reports, Appointments, Payments, Profile.
               Use mock data first, then connect to Supabase."
2. Build each sub-page one at a time
3. Add profile photo upload with Supabase Storage
4. Add PDF download (react-pdf)
```

**Phase 7: Admin Panel (4-6 hours)**
```
1. In Cursor: "Build the Admin Panel with sidebar at app/admin/page.tsx.
               Include all sections: Dashboard stats, Patient management, Leads, 
               Appointments, Payments, WhatsApp Queue, Settings."
2. Build each section one at a time
3. Add 2FA setup page
4. Add WhatsApp approval queue interface
5. Add PDF generation for patient reports
```

**Phase 8: WhatsApp Integration (2-3 hours)**
```
1. In Cursor: "Build WhatsApp Cloud API integration in src/lib/whatsapp.ts.
               Functions: sendMessage(phone, message), queueMessage(data), 
               approveAndSend(messageId)."
2. Build the message templates in Bangla
3. Test with a real phone number (your own)
```

**Phase 9: Receptionist Portal (1-2 hours)**
```
1. In Cursor: "Build the Receptionist Portal at app/receptionist/
               with limited access: data entry, patient search, appointment scheduling only."
```

**Phase 10: SEO & Performance (1-2 hours)**
```
1. In Cursor: "Add metadata to all pages using Next.js metadata API.
               Add Local Business JSON-LD schema to home page.
               Add sitemap.xml and robots.txt."
2. Run Lighthouse check and fix issues
3. Optimize all images with next/image
```

**Phase 11: Deployment (1 hour)**
```
1. git add . && git commit -m "Initial production build"
2. git push origin main
3. Go to vercel.com → Import repo → Add env vars → Deploy
4. Test all features on live URL
5. Share subdomain with Dip dula vai and Dr. Jerin
```

### How to Give Instructions to Cursor AI
```
❌ WRONG (too vague): "Make the dashboard"
✅ RIGHT (specific): "Build the patient dashboard home page at app/dashboard/page.tsx. 
   It should show: welcome card with patient name and profile photo, three stat cards 
   (Total Visits, Next Appointment, Outstanding Due), navigation tiles (4 tiles in 2x2 grid), 
   recent visit preview, and a Book Appointment blue button. 
   Use Tailwind CSS with primary color #1E3A8A. Mobile-first layout."

❌ WRONG: "Fix the error"
✅ RIGHT: Copy the full error message from terminal and paste it to Cursor chat.
   Cursor will read it and fix automatically.
```

### Error Handling Guide for Puson
- **If Cursor makes a mistake:** Say "This is wrong, [describe what's wrong], fix it"
- **If there's a TypeScript error:** Paste the error in Cursor chat, say "Fix this error"
- **If a page doesn't look right on mobile:** Say "The [page name] doesn't look good on mobile. Fix the layout to be properly mobile-responsive."
- **If Supabase query fails:** Paste the error, say "Fix this Supabase query"

---

## 18. CONTENT PLACEHOLDERS

> All items marked [PLACEHOLDER] in this document. Puson must fill these in.

| # | Placeholder | What to Provide |
|---|------------|----------------|
| 1 | `public/logo.png` | Dental Point logo file (PNG with transparent background) |
| 2 | `public/doctor-portrait.jpg` | Dr. Jerin's professional portrait photo |
| 3 | `public/dental-banner-1.jpg` | Dental clinic photo (exterior or reception) |
| 4 | `public/dental-banner-2.jpg` | Clinic interior or treatment room photo |
| 5 | `public/before-after-1.jpg` | Before treatment dental photo |
| 6 | `public/before-after-2.jpg` | After treatment dental photo |
| 7 | `public/og-image.jpg` | Social media share image (1200×630px) |
| 8 | Chamber phone number | WhatsApp-active phone number |
| 9 | Chamber email | Business email address |
| 10 | Chamber full address | Street address, area, Dhaka |
| 11 | Chamber open hours | Days and times open |
| 12 | Dr. Jerin's bio | BDS degree info, years of experience, specialization |
| 13 | bKash merchant number | For payment QR display |
| 14 | bKash QR code image | QR code image file |
| 15 | Facebook page URL | If a Facebook page exists |
| 16 | Google Maps embed code | Get from Maps → Share → Embed (use given link) |
| 17 | WhatsApp business number | Number registered with Meta Business API |
| 18 | Lat/Long coordinates | From Google Maps for schema markup |
| 19 | Postal code | Bashabo, Dhaka postal code |

---

## FINAL NOTES

**Built by:** Baba Puson  
**Portfolio:** [PLACEHOLDER: Puson's portfolio link — to be added later]  
**Credit text shown on site:** "Built by Baba Puson" (small text, bottom of every page)

**Version Control:**
- Always commit before making major changes
- Commit message format: "feat: [what you added]" or "fix: [what you fixed]"

**Going Premium Later:**
1. Buy custom domain → connect to Vercel (15 mins)
2. Upgrade Supabase Pro when DB hits 400MB
3. Switch to paid WhatsApp tier if 1000 conversations/month exceeded
4. Add Google Analytics (free) for traffic tracking

---

*Document prepared by Claude (Anthropic) for Project Dr. Jerin's Dental Point.*  
*All placeholder content marked with [PLACEHOLDER] must be filled in by Puson before build.*  
*This document is the single source of truth for the entire project.*
