# FindOra — University Lost & Found Management System
> **"Lost it. Found it. Bring it home."**  
> *Official Lost & Found Management System for Pundra University of Science & Technology (PUST), Bogura, Bangladesh.*

---

## 📌 Executive Overview
**FindOra** is a centralized, secure, university-exclusive platform engineered to catalog lost and found belongings across the PUST campus. It eliminates fragmented social media notices by integrating an administrator-verified institutional membership gate, a rule-based smart matching algorithm, private evidence-backed ownership claims, and comprehensive proctor oversight.

---

## 🚀 Key Features

### 1. University-Exclusive Identity & Access Gate
- **Role-Based Access Control**: Student, Faculty/Teacher, University Staff, and Proctor Administrator.
- **Administrator-Approved Membership**: To maintain security before institutional email automation, all new accounts remain pending until authenticated by the PUST Proctor Office.
- **Privacy Enforcement**: Public visitors can see high-level landing highlights, but sensitive evidence and claim logs are strictly protected via Row Level Security (RLS).

### 2. Full Lost & Found Lifecycle
- Multi-photo upload and preview with category classification.
- Attribute tagging: primary colors, brand/make, campus location, incident dates, and identifying marks.
- Full text search, status filters (Active, Matched, Claim Pending, Reunited, Archived), category sorting, and pagination.

### 3. Rule-Based Smart Matching Engine
FindOra evaluates candidate items of opposite types using a weighted similarity algorithm:
- **Category Match (30%)**: Strict taxonomy correspondence.
- **Title & Description Keywords (25%)**: Jaccard similarity coefficient on normalized keyword tokens.
- **Color Similarity (15%)**: Normalized exact and substring color matching.
- **Location Proximity (15%)**: Semantic campus zone proximity.
- **Incident Date Proximity (15%)**: Proximity decay within a 14-day window.
- **Automatic Notifications**: Generated for candidate matches scoring $\ge 70\%$.

### 4. Ownership Claim Verification System
- Potential owners file claims with confidential evidence (serial numbers, lock screen wallpaper, folder contents, lock combinations, or invoices).
- Evidence is hidden from public view and made accessible only to authorized Proctor Administrators.
- Administrators review claims, record decisions with audit notes, and mark items as "Reunited" upon physical collection.

### 5. Proctor Administration Center (9 Dedicated Modules)
- **Overview Dashboard**: Database-driven counts, live recovery rate calculation, and quick action queues.
- **Membership Approval Queue**: One-click review, verification, or rejection of pending registrations.
- **User Management**: Search, filter, role assignment, and suspension.
- **Item Moderation**: Moderate, archive, or restore listings.
- **Claim Resolution**: Deep inspection of confidential proof and decision recording.
- **Report Moderation**: Triage community reports on duplicate, spam, or abusive listings.
- **Category Taxonomy**: Add and manage campus item classifications.
- **Campus Analytics**: Recovery rates, location incident hotspots, and category distribution.
- **Audit Logs**: Immutable log of every status transition and administrative ruling.

---

## 🛠 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Design System Inspiration**: Linear, Stripe, Notion
- **Icons**: Lucide React
- **Backend**: Next.js Server Actions & Route Handlers
- **Database**: Supabase PostgreSQL with Row Level Security (RLS)
- **Authentication**: Supabase Auth (Email/Password, Session Cookies via `@supabase/ssr`)
- **File Storage**: Supabase Storage Buckets (`item-images`, `profile-images`)
- **Deployment**: Vercel Free Tier + Supabase Free Tier

---

## 📂 Repository Structure

```
c:\web eng\
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx               # 1. Landing Page
│   │   │   ├── about/page.tsx         # 2. About FindOra
│   │   │   ├── how-it-works/page.tsx  # 3. How It Works
│   │   │   ├── contact/page.tsx       # 4. Contact Proctor Office
│   │   │   ├── login/page.tsx         # 5. Login
│   │   │   ├── register/page.tsx      # 6. Registration
│   │   │   ├── forgot-password/       # 7. Password Recovery
│   │   │   └── reset-password/        # 8. Password Reset
│   │   ├── items/
│   │   │   ├── page.tsx               # 9. Explore Items Catalog
│   │   │   ├── lost/page.tsx          # 10. Lost Items
│   │   │   ├── found/page.tsx         # 11. Found Items
│   │   │   └── [id]/page.tsx          # 12. Item Details & Claims
│   │   ├── report/
│   │   │   ├── lost/page.tsx          # 13. Report Lost Item
│   │   │   └── found/page.tsx         # 14. Report Found Item
│   │   ├── dashboard/
│   │   │   ├── page.tsx               # 15. User Dashboard
│   │   │   ├── posts/page.tsx         # 16. My Posts
│   │   │   ├── claims/page.tsx        # 17. My Claims
│   │   │   ├── matches/page.tsx       # 18. Possible Matches
│   │   │   ├── notifications/page.tsx # 19. Notifications Center
│   │   │   ├── profile/page.tsx       # 20. Profile Settings
│   │   │   └── history/page.tsx       # 21. Item History
│   │   └── admin/
│   │       ├── page.tsx               # 22. Admin Dashboard
│   │       ├── users/page.tsx         # 23. User Management
│   │       ├── memberships/page.tsx   # 24. Membership Approval Queue
│   │       ├── items/page.tsx         # 25. Item Management
│   │       ├── claims/page.tsx        # 26. Claim Management
│   │       ├── reports/page.tsx       # 27. Report Moderation
│   │       ├── categories/page.tsx    # 28. Category Management
│   │       ├── analytics/page.tsx     # 29. Campus Analytics
│   │       └── audit-logs/page.tsx    # 30. Administrative Audit Logs
│   ├── components/
│   │   ├── layout/                    # Navbar, Footer, UserSidebar, AdminSidebar
│   │   ├── ui/                        # Button, Input, Textarea, Select, Modal, Card, Badge
│   │   ├── items/                     # ItemCard, ItemGrid, ItemFilters, SmartMatchCard
│   │   └── admin/                     # Moderation tables, Approval views
│   ├── lib/
│   │   ├── matching.ts                # Rule-based Smart Matching System
│   │   ├── utils.ts                   # Formatting, timeAgo, badge helpers
│   │   ├── supabase/                  # SSR and Admin Supabase clients
│   │   ├── store/demo-data.ts         # High-fidelity realistic mock store & seed data
│   │   └── api/                       # Server actions (items, claims, admin, etc.)
│   └── types/index.ts                 # Strict TypeScript data models
├── supabase/
│   ├── migrations/                    # 001_initial_schema.sql (Tables, RLS, Triggers)
│   └── seed.sql                       # Initial categories and default data
├── .env.example
├── README.md
├── PROJECT_RULES.md
└── DEPLOYMENT.md
```

---

## ⚡ Quickstart & Setup

### 1. Prerequisites
- Node.js `v18.x` or `v20.x` / `v24.x`
- npm `v9+` or `v10+`

### 2. Installation
```bash
git clone <your-repo-url>
cd "web eng"
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase project keys:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```
*(Note: If Supabase keys are omitted, FindOra immediately runs in resilient demonstration mode with pre-seeded PUST data).*

### 4. Database Setup (Supabase)
1. Open your Supabase project dashboard -> **SQL Editor**.
2. Run `supabase/migrations/20261117_001_initial_schema.sql` to generate all tables, types, triggers, and Row Level Security policies.
3. Run `supabase/seed.sql` to populate default categories.

### 5. Running the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🧪 Quick Test Personas
The application includes a built-in Persona Switcher in the user dropdown:
1. **Engr. Tanvir Ahmed (Administrator)**: Full access to the Proctor Center (`/admin`), membership queue, claims approval, and user management.
2. **Sourov Sarkar (Approved Student - CSE)**: Full student access to report items, view matches, and submit claims.
3. **Dr. Mahbubur Rahman (Faculty Member - CSE)**: Teacher role with verified campus posting rights.
4. **Nafis Hasan (Pending Member - EEE)**: Demonstrates the pending verification state restriction.
