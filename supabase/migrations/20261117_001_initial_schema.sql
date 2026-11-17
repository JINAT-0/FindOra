-- ============================================================
-- FINDORA: University Lost & Found Management System
-- Pundra University of Science & Technology (PUST), Bogura
-- Database Migration: 001 Initial Schema & RLS Policies
-- ============================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create ENUM types for strict data validation
DO $$ BEGIN
    CREATE TYPE member_type_enum AS ENUM ('student', 'teacher', 'staff', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE user_role_enum AS ENUM ('user', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE account_status_enum AS ENUM ('pending', 'approved', 'rejected', 'suspended');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE item_type_enum AS ENUM ('lost', 'found');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE item_status_enum AS ENUM ('active', 'matched', 'pending_claim', 'reunited', 'archived', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE claim_status_enum AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE notification_type_enum AS ENUM ('match', 'claim', 'status', 'membership', 'system');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE report_status_enum AS ENUM ('pending', 'reviewed', 'dismissed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================
-- 3. PROFILES TABLE (Linked with auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    university_id TEXT NOT NULL,
    member_type member_type_enum NOT NULL DEFAULT 'student',
    role user_role_enum NOT NULL DEFAULT 'user',
    account_status account_status_enum NOT NULL DEFAULT 'pending',
    avatar_url TEXT,
    phone_number TEXT,
    department TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_profiles_university_id ON public.profiles(university_id);
CREATE INDEX IF NOT EXISTS idx_profiles_account_status ON public.profiles(account_status);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- ============================================================
-- 4. CATEGORIES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);

-- ============================================================
-- 5. ITEMS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    title TEXT NOT NULL,
    type item_type_enum NOT NULL,
    description TEXT NOT NULL,
    color TEXT NOT NULL,
    brand TEXT,
    location TEXT NOT NULL,
    incident_date DATE NOT NULL,
    status item_status_enum NOT NULL DEFAULT 'active',
    identifying_marks TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_items_user_id ON public.items(user_id);
CREATE INDEX IF NOT EXISTS idx_items_category_id ON public.items(category_id);
CREATE INDEX IF NOT EXISTS idx_items_type ON public.items(type);
CREATE INDEX IF NOT EXISTS idx_items_status ON public.items(status);
CREATE INDEX IF NOT EXISTS idx_items_incident_date ON public.items(incident_date DESC);
CREATE INDEX IF NOT EXISTS idx_items_created_at ON public.items(created_at DESC);

-- Full text search support
CREATE INDEX IF NOT EXISTS idx_items_fts ON public.items USING gin(to_tsvector('english', title || ' ' || description || ' ' || location));

-- ============================================================
-- 6. ITEM IMAGES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.item_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_item_images_item_id ON public.item_images(item_id);

-- ============================================================
-- 7. CLAIMS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
    claimant_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    evidence TEXT NOT NULL,
    contact_info TEXT NOT NULL,
    status claim_status_enum NOT NULL DEFAULT 'pending',
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_item_claimant UNIQUE (item_id, claimant_id)
);

CREATE INDEX IF NOT EXISTS idx_claims_item_id ON public.claims(item_id);
CREATE INDEX IF NOT EXISTS idx_claims_claimant_id ON public.claims(claimant_id);
CREATE INDEX IF NOT EXISTS idx_claims_status ON public.claims(status);

-- ============================================================
-- 8. NOTIFICATIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type notification_type_enum NOT NULL DEFAULT 'system',
    link TEXT,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);

-- ============================================================
-- 9. REPORTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
    reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    description TEXT,
    status report_status_enum NOT NULL DEFAULT 'pending',
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_reports_item_id ON public.reports(item_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);

-- ============================================================
-- 10. ITEM HISTORY TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.item_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
    actor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    old_status item_status_enum NOT NULL,
    new_status item_status_enum NOT NULL,
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_item_history_item_id ON public.item_history(item_id);

-- ============================================================
-- 11. HELPER FUNCTIONS & TRIGGERS
-- ============================================================

-- Automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON public.profiles;
CREATE TRIGGER trigger_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_items_updated_at ON public.items;
CREATE TRIGGER trigger_items_updated_at
    BEFORE UPDATE ON public.items
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Automatically track item status changes in item_history
CREATE OR REPLACE FUNCTION public.handle_item_status_history()
RETURNS TRIGGER AS $$
BEGIN
    IF (OLD.status IS DISTINCT FROM NEW.status) THEN
        INSERT INTO public.item_history (item_id, actor_id, old_status, new_status, note)
        VALUES (
            NEW.id,
            COALESCE(auth.uid(), NEW.user_id),
            OLD.status,
            NEW.status,
            'Status updated to ' || NEW.status
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_items_status_history ON public.items;
CREATE TRIGGER trigger_items_status_history
    AFTER UPDATE OF status ON public.items
    FOR EACH ROW EXECUTE FUNCTION public.handle_item_status_history();

-- Automatically create profile on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        full_name,
        university_id,
        member_type,
        role,
        account_status,
        avatar_url,
        phone_number,
        department
    ) VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'University Member'),
        COALESCE(NEW.raw_user_meta_data->>'university_id', 'PENDING-ID'),
        COALESCE((NEW.raw_user_meta_data->>'member_type')::member_type_enum, 'student'),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role_enum, 'user'),
        'pending',
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.raw_user_meta_data->>'phone_number',
        NEW.raw_user_meta_data->>'department'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 12. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS across all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.item_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.item_history ENABLE ROW LEVEL SECURITY;

-- Security helper functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin' AND account_status = 'approved'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_approved_member()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND account_status = 'approved'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12.1 PROFILES POLICIES
-- Anyone authenticated can view their own profile
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

-- Approved members can view public name/department/avatar of other members
CREATE POLICY "Approved members can view profile names"
    ON public.profiles FOR SELECT
    USING (public.is_approved_member());

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
    ON public.profiles FOR SELECT
    USING (public.is_admin());

-- Users can update their own non-privileged profile data
CREATE POLICY "Users can update own basic profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id
        -- Prevent changing role or account_status directly
        AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
        AND account_status = (SELECT account_status FROM public.profiles WHERE id = auth.uid())
    );

-- Admins can update any profile (approval, suspension, role assignment)
CREATE POLICY "Admins can update any profile"
    ON public.profiles FOR UPDATE
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 12.2 CATEGORIES POLICIES
-- Anyone can view categories
CREATE POLICY "Categories are viewable by all"
    ON public.categories FOR SELECT
    USING (true);

-- Only admins can insert/update/delete categories
CREATE POLICY "Admins can manage categories"
    ON public.categories FOR ALL
    USING (public.is_admin());

-- 12.3 ITEMS POLICIES
-- Approved members can view active/non-archived items, or own items
CREATE POLICY "Approved members can view items"
    ON public.items FOR SELECT
    USING (
        public.is_approved_member()
        OR auth.uid() = user_id
        OR public.is_admin()
    );

-- Approved members can insert items
CREATE POLICY "Approved members can create items"
    ON public.items FOR INSERT
    WITH CHECK (
        auth.uid() = user_id
        AND public.is_approved_member()
    );

-- Owners can update their own items
CREATE POLICY "Users can update own items"
    ON public.items FOR UPDATE
    USING (auth.uid() = user_id OR public.is_admin())
    WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- Owners or admins can archive (soft delete) items
CREATE POLICY "Users can delete own items"
    ON public.items FOR DELETE
    USING (auth.uid() = user_id OR public.is_admin());

-- 12.4 ITEM IMAGES POLICIES
CREATE POLICY "Item images viewable with items"
    ON public.item_images FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.items
            WHERE items.id = item_images.item_id
            AND (public.is_approved_member() OR items.user_id = auth.uid() OR public.is_admin())
        )
    );

CREATE POLICY "Owners can add item images"
    ON public.item_images FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.items
            WHERE items.id = item_images.item_id
            AND items.user_id = auth.uid()
        ) OR public.is_admin()
    );

CREATE POLICY "Owners can delete item images"
    ON public.item_images FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.items
            WHERE items.id = item_images.item_id
            AND items.user_id = auth.uid()
        ) OR public.is_admin()
    );

-- 12.5 CLAIMS POLICIES
-- Claimant can view their own claims
CREATE POLICY "Claimants can view own claims"
    ON public.claims FOR SELECT
    USING (claimant_id = auth.uid() OR public.is_admin());

-- Item owner can see that a claim exists on their item (restricted/safe fields)
CREATE POLICY "Item owners can view claims on their items"
    ON public.claims FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.items
            WHERE items.id = claims.item_id
            AND items.user_id = auth.uid()
        )
    );

-- Approved members can submit claims (cannot claim own items)
CREATE POLICY "Approved members can submit claims"
    ON public.claims FOR INSERT
    WITH CHECK (
        auth.uid() = claimant_id
        AND public.is_approved_member()
        AND NOT EXISTS (
            SELECT 1 FROM public.items
            WHERE items.id = claims.item_id
            AND items.user_id = auth.uid()
        )
    );

-- Only admins can update claim status
CREATE POLICY "Admins can update claims"
    ON public.claims FOR UPDATE
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 12.6 NOTIFICATIONS POLICIES
-- Users can only see their own notifications
CREATE POLICY "Users can view own notifications"
    ON public.notifications FOR SELECT
    USING (auth.uid() = user_id);

-- Users can mark their notifications as read
CREATE POLICY "Users can update own notifications"
    ON public.notifications FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 12.7 REPORTS POLICIES
-- Users can insert reports
CREATE POLICY "Approved members can report items"
    ON public.reports FOR INSERT
    WITH CHECK (
        auth.uid() = reporter_id
        AND public.is_approved_member()
    );

-- Reporters can view their reports, admins can view all
CREATE POLICY "View reports"
    ON public.reports FOR SELECT
    USING (auth.uid() = reporter_id OR public.is_admin());

-- Admins can update reports
CREATE POLICY "Admins can update reports"
    ON public.reports FOR UPDATE
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 12.8 ITEM HISTORY POLICIES
-- Users can view history of items they can see
CREATE POLICY "View item history"
    ON public.item_history FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.items
            WHERE items.id = item_history.item_id
            AND (public.is_approved_member() OR items.user_id = auth.uid() OR public.is_admin())
        )
    );

-- System or admins can insert item history
CREATE POLICY "Admins or owners insert history"
    ON public.item_history FOR INSERT
    WITH CHECK (public.is_approved_member() OR public.is_admin());

-- ============================================================
-- 13. STORAGE BUCKET CONFIGURATION (Run in Supabase Storage SQL)
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('item-images', 'item-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-images', 'profile-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public Read Item Images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'item-images');

CREATE POLICY "Authenticated Users Upload Item Images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'item-images'
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Public Read Profile Images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'profile-images');

CREATE POLICY "Authenticated Users Upload Profile Images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'profile-images'
        AND auth.role() = 'authenticated'
    );
