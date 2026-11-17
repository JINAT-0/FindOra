# FindOra — Architectural Rules & Coding Standards

This document defines the strict engineering guidelines, architectural invariants, and security requirements governing the FindOra codebase for Pundra University of Science & Technology.

---

## 1. Security & Authorization Rules
1. **Never Trust Client Inputs**: All mutating actions must execute through Next.js Server Actions with strict server-side authorization checks (`store.getCurrentUser()` or Supabase server session).
2. **Strict Institutional Verification**: Users with `account_status: 'pending'` or `'suspended'` MUST be prevented from:
   - Creating lost item posts (`/report/lost`).
   - Creating found item posts (`/report/found`).
   - Submitting ownership claims on found items.
3. **Confidential Evidence Protection**: The `evidence` field in `claims` must never be displayed publicly or rendered in any client view except for:
   - The user who authored the claim (`claimant_id === auth.uid()`).
   - Verified administrators (`is_admin() === true`).
4. **Row Level Security (RLS)**: Every single table exposed to the Supabase PostgREST API must have RLS enabled with explicit policies.
5. **No Service Role Key in Frontend**: `SUPABASE_SERVICE_ROLE_KEY` must strictly be accessed only in server-side contexts (`src/lib/supabase/admin.ts`).

---

## 2. Institutional Invariants
1. **Never Invent the University Email Domain**: Institutional email verification will only be activated when authorized by PUST authorities. Until then, use the administrator-approved membership workflow.
2. **Never Fabricate Production Statistics**: Statistics displayed on the landing page, admin dashboards, and recovery rate counters must always derive dynamically from real database records.
3. **No Automatic Ownership Transfers**: The Smart Matching algorithm is an advisory assistance tool. Ownership must always require physical or proctor-verified claim submission.
4. **Historical Record Preservation**: Items that are reunited or archived must NEVER be permanently deleted from the database. Status changes must log an entry in `item_history`.

---

## 3. UI/UX & Design System Constraints
1. **Palette Consistency**:
   - Deep Navy: `#172B4D`
   - Warm White: `#F7F5F0`
   - Forest Green: `#27866B`
   - Brand Amber: `#E9A23B`
2. **No Dead Buttons**: Every clickable element must trigger a state change, modal, navigation, or server operation.
3. **State Completeness**: Every async feature must provide Loading, Success, Error, and Empty states.
