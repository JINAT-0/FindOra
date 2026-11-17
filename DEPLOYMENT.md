# FindOra — Production Deployment Guide
**Target Deployments: Vercel Free Tier + Supabase Free Tier + GitHub**

---

## 1. Supabase Free Tier Configuration

### 1.1 Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Click **New Project**.
3. Set the project name: `FindOra-PUST`.
4. Choose the closest region (e.g., `Singapore` or `Mumbai` for Bangladesh).
5. Generate and store a secure database password.

### 1.2 Run Database Migrations
1. Open your Supabase Dashboard and navigate to **SQL Editor**.
2. Click **New Query**.
3. Copy the entire contents of `supabase/migrations/20261117_001_initial_schema.sql` and click **Run**.
   - This creates:
     - 8 relational tables (`profiles`, `categories`, `items`, `item_images`, `claims`, `notifications`, `reports`, `item_history`)
     - Enums (`member_type_enum`, `item_status_enum`, etc.)
     - Auto-tracking triggers (`handle_item_status_history`, `handle_new_user`)
     - Full Row Level Security (RLS) policies for all tables.
4. Copy the contents of `supabase/seed.sql` and click **Run** to load initial categories.

### 1.3 Verify Storage Buckets
1. In the Supabase Dashboard, navigate to **Storage**.
2. Confirm the two buckets exist:
   - `item-images` (Public: Enabled)
   - `profile-images` (Public: Enabled)
3. Under **Policies**, verify that public SELECT and authenticated INSERT policies were created by the migration script.

### 1.4 Retrieve API Credentials
Navigate to **Project Settings -> API** and copy:
- **Project URL** -> `NEXT_PUBLIC_SUPABASE_URL`
- **anon public key** -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role secret** -> `SUPABASE_SERVICE_ROLE_KEY` (Keep confidential)

---

## 2. GitHub Repository Setup
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: complete FindOra v1.0 MVP for PUST Bogura"
   ```
2. Create a new repository on [GitHub](https://github.com).
3. Push to GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/findora.git
   git push -u origin main
   ```

---

## 3. Vercel Free Tier Deployment

1. Go to [https://vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **Add New -> Project**.
3. Select your `findora` repository and click **Import**.
4. In **Configure Project**, expand the **Environment Variables** section and add:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Secret
   - `NEXT_PUBLIC_UNIVERSITY_NAME`: `Pundra University of Science & Technology`
   - `NEXT_PUBLIC_UNIVERSITY_ACRONYM`: `PUST`
5. Click **Deploy**. Vercel will run `npm run build` and provision your production URL (e.g., `https://findora-pust.vercel.app`).

---

## 4. Free-Tier Limitations & Operational Considerations

| Platform | Free Tier Resource Limit | Operational Note |
| :--- | :--- | :--- |
| **Supabase** | 500 MB Database, 1 GB Storage | **Inactivity Pausing**: Supabase free projects pause after 7 days of zero database requests. Can be unpaused in 1-click from the dashboard. |
| **Vercel** | 100 GB Bandwidth, Serverless Functions | Function execution time limit is 10 seconds (plenty for Next.js Server Actions). |
| **File Storage** | 1 GB total storage | Encourage compressed JPEG/PNG photographs. Free tier is suitable for hundreds of campus items. |

---

## 5. Post-Deployment Verification Checklist

1. [x] Visit production landing page and verify hero, search bar, statistics, and footer.
2. [x] Test registration with student ID and verify account receives "Pending Verification" status.
3. [x] Sign in with Administrator persona and verify membership application in `/admin/memberships`.
4. [x] Approve member and verify immediate release of posting capabilities.
5. [x] Create a Lost item post and Found item post with matching keywords and verify the Smart Matching Engine flags high correspondence.
6. [x] Submit an Ownership Claim and verify confidential evidence is accessible only in `/admin/claims`.
7. [x] Approve claim and verify item status transitions to "Reunited" with notification and audit history logged.

