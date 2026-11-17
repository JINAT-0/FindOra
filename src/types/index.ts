export type MemberType = 'student' | 'teacher' | 'staff' | 'admin';
export type UserRole = 'user' | 'admin';
export type AccountStatus = 'pending' | 'approved' | 'rejected' | 'suspended';

export type ItemType = 'lost' | 'found';
export type ItemStatus = 'active' | 'matched' | 'pending_claim' | 'reunited' | 'archived' | 'rejected';
export type ClaimStatus = 'pending' | 'approved' | 'rejected';
export type NotificationType = 'match' | 'claim' | 'status' | 'membership' | 'system';
export type ReportStatus = 'pending' | 'reviewed' | 'dismissed';

export interface Profile {
  id: string;
  email?: string;
  full_name: string;
  university_id: string;
  member_type: MemberType;
  role: UserRole;
  account_status: AccountStatus;
  avatar_url?: string | null;
  phone_number?: string | null;
  department?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string | null;
  created_at?: string;
}

export interface ItemImage {
  id: string;
  item_id: string;
  storage_path: string;
  is_primary?: boolean;
  created_at?: string;
}

export interface Item {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  type: ItemType;
  description: string;
  color: string;
  brand?: string | null;
  location: string;
  incident_date: string;
  status: ItemStatus;
  identifying_marks?: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  category?: Category;
  user?: Profile;
  images?: ItemImage[];
  claims_count?: number;
}

export interface Claim {
  id: string;
  item_id: string;
  claimant_id: string;
  evidence: string;
  contact_info: string;
  status: ClaimStatus;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  admin_notes?: string | null;
  created_at: string;
  // Joined fields
  item?: Item;
  claimant?: Profile;
  reviewer?: Profile;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  link?: string | null;
  is_read: boolean;
  created_at: string;
}

export interface Report {
  id: string;
  item_id: string;
  reporter_id: string;
  reason: string;
  description?: string | null;
  status: ReportStatus;
  reviewed_by?: string | null;
  created_at: string;
  // Joined fields
  item?: Item;
  reporter?: Profile;
}

export interface ItemHistory {
  id: string;
  item_id: string;
  actor_id: string;
  old_status: ItemStatus;
  new_status: ItemStatus;
  note?: string | null;
  created_at: string;
  actor?: Profile;
}

export interface SmartMatchResult {
  targetItem: Item;
  matchedItem: Item;
  totalScore: number; // 0 - 100
  breakdown: {
    categoryScore: number; // max 30
    textScore: number;     // max 25
    colorScore: number;    // max 15
    locationScore: number; // max 15
    dateScore: number;     // max 15
  };
  reasons: string[];
}

export interface FilterParams {
  search?: string;
  type?: ItemType | 'all';
  category?: string;
  color?: string;
  location?: string;
  status?: ItemStatus | 'all';
  startDate?: string;
  endDate?: string;
  sortBy?: 'newest' | 'oldest' | 'date_asc' | 'date_desc';
  page?: number;
  limit?: number;
}

export interface PlatformStats {
  totalUsers: number;
  approvedUsers: number;
  pendingMemberships: number;
  totalLostPosts: number;
  totalFoundPosts: number;
  pendingClaims: number;
  reunitedItems: number;
  reportedPosts: number;
  recoveryRate: number; // percentage
}

