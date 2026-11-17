import {
  Profile,
  Category,
  Item,
  Claim,
  Notification,
  Report,
  ItemHistory,
  PlatformStats,
  ItemStatus,
  AccountStatus,
  UserRole,
} from "@/types";

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Electronics & Gadgets",
    slug: "electronics",
    icon: "Laptop",
    description: "Laptops, smartphones, chargers, power banks, calculators, USB drives",
  },
  {
    id: "cat-2",
    name: "Documents & IDs",
    slug: "documents",
    icon: "FileText",
    description: "Student ID cards, library cards, national IDs, admit cards, certificates",
  },
  {
    id: "cat-3",
    name: "Bags & Wallets",
    slug: "bags-wallets",
    icon: "Briefcase",
    description: "Backpacks, shoulder bags, wallets, purse, money pouches",
  },
  {
    id: "cat-4",
    name: "Keys & Locks",
    slug: "keys",
    icon: "Key",
    description: "Bicycle keys, motorbike keys, room keys, locker keys",
  },
  {
    id: "cat-5",
    name: "Books & Stationery",
    slug: "books-stationery",
    icon: "BookOpen",
    description: "Textbooks, engineering drawing tools, lecture notes, pen cases",
  },
  {
    id: "cat-6",
    name: "Clothing & Accessories",
    slug: "clothing",
    icon: "Shirt",
    description: "Jackets, sweaters, wristwatches, sunglasses, umbrellas",
  },
  {
    id: "cat-7",
    name: "Personal Belongings",
    slug: "personal",
    icon: "HeartHandshake",
    description: "Water bottles, prescription glasses, sports accessories, headphones",
  },
  {
    id: "cat-8",
    name: "Other Items",
    slug: "other",
    icon: "HelpCircle",
    description: "Miscellaneous personal items not listed elsewhere",
  },
];

export const INITIAL_PROFILES: Profile[] = [
  {
    id: "user-admin-1",
    email: "admin@pust.ac.bd",
    full_name: "Engr. Tanvir Ahmed",
    university_id: "ADM-9042",
    member_type: "admin",
    role: "admin",
    account_status: "approved",
    department: "Proctor & Security Office",
    phone_number: "+880 1711-000001",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    created_at: "2026-01-10T08:00:00Z",
    updated_at: "2026-01-10T08:00:00Z",
  },
  {
    id: "user-student-1",
    email: "sourov.cse@pust.ac.bd",
    full_name: "Sourov Sarkar",
    university_id: "21100234",
    member_type: "student",
    role: "user",
    account_status: "approved",
    department: "Computer Science & Engineering",
    phone_number: "+880 1722-112233",
    avatar_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    created_at: "2026-02-01T10:30:00Z",
    updated_at: "2026-02-01T10:30:00Z",
  },
  {
    id: "user-student-2",
    email: "ayesha.pharmacy@pust.ac.bd",
    full_name: "Ayesha Siddiqua",
    university_id: "22100412",
    member_type: "student",
    role: "user",
    account_status: "approved",
    department: "Department of Pharmacy",
    phone_number: "+880 1833-445566",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    created_at: "2026-02-15T14:15:00Z",
    updated_at: "2026-02-15T14:15:00Z",
  },
  {
    id: "user-teacher-1",
    email: "mahbub.cse@pust.ac.bd",
    full_name: "Dr. Mahbubur Rahman",
    university_id: "FAC-1045",
    member_type: "teacher",
    role: "user",
    account_status: "approved",
    department: "Computer Science & Engineering",
    phone_number: "+880 1911-778899",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    created_at: "2026-01-20T09:00:00Z",
    updated_at: "2026-01-20T09:00:00Z",
  },
  {
    id: "user-staff-1",
    email: "rafiq.library@pust.ac.bd",
    full_name: "Md. Rafiqul Islam",
    university_id: "STF-3021",
    member_type: "staff",
    role: "user",
    account_status: "approved",
    department: "Central Library",
    phone_number: "+880 1715-334455",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    created_at: "2026-01-25T11:00:00Z",
    updated_at: "2026-01-25T11:00:00Z",
  },
  {
    id: "user-pending-1",
    email: "nafis.eee@gmail.com",
    full_name: "Nafis Hasan",
    university_id: "23100589",
    member_type: "student",
    role: "user",
    account_status: "pending",
    department: "Electrical & Electronic Engineering",
    phone_number: "+880 1622-998877",
    avatar_url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    created_at: "2026-11-15T12:00:00Z",
    updated_at: "2026-11-15T12:00:00Z",
  },
];

export const INITIAL_ITEMS: Item[] = [
  {
    id: "item-1",
    user_id: "user-student-1",
    category_id: "cat-1",
    title: "Casio fx-991EX ClassWiz Scientific Calculator",
    type: "lost",
    description: "Lost my black scientific calculator after the Discrete Mathematics mid-term examination. It has a slight scratch on the upper left solar panel.",
    color: "Black",
    brand: "Casio",
    location: "Academic Building 1, Room 302",
    incident_date: "2026-11-14",
    status: "matched",
    identifying_marks: "Student roll 21100234 engraved lightly on the back cover with a compass point",
    created_at: "2026-11-14T16:20:00Z",
    updated_at: "2026-11-15T09:10:00Z",
    images: [
      {
        id: "img-1",
        item_id: "item-1",
        storage_path: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600&auto=format&fit=crop&q=80",
        is_primary: true,
      },
    ],
  },
  {
    id: "item-2",
    user_id: "user-staff-1",
    category_id: "cat-1",
    title: "Black Scientific Calculator Casio fx-991EX",
    type: "found",
    description: "Found an original Casio scientific calculator left on table 4 in the Central Library Reference Section during evening closing.",
    color: "Black",
    brand: "Casio",
    location: "Central Library, 2nd Floor Reading Hall",
    incident_date: "2026-11-14",
    status: "matched",
    identifying_marks: "Has small carving on rear plastic battery hatch",
    created_at: "2026-11-14T18:45:00Z",
    updated_at: "2026-11-15T09:10:00Z",
    images: [
      {
        id: "img-2",
        item_id: "item-2",
        storage_path: "https://images.unsplash.com/photo-1611117766067-1b07ec9b8d29?w=600&auto=format&fit=crop&q=80",
        is_primary: true,
      },
    ],
  },
  {
    id: "item-3",
    user_id: "user-student-2",
    category_id: "cat-2",
    title: "PUST Student Identification Card",
    type: "lost",
    description: "Lost my laminated official university student ID card with blue lanyard. Believed to have slipped from purse between Cafeteria and Pharmacy Lab.",
    color: "Blue / White",
    brand: "Pundra University",
    location: "Campus Cafeteria walkway towards Pharmacy Dept",
    incident_date: "2026-11-12",
    status: "active",
    identifying_marks: "Name: Ayesha Siddiqua, Roll: 22100412, Session 2021-22",
    created_at: "2026-11-12T13:30:00Z",
    updated_at: "2026-11-12T13:30:00Z",
    images: [
      {
        id: "img-3",
        item_id: "item-3",
        storage_path: "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=600&auto=format&fit=crop&q=80",
        is_primary: true,
      },
    ],
  },
  {
    id: "item-4",
    user_id: "user-teacher-1",
    category_id: "cat-1",
    title: "SanDisk Ultra 64GB Dual Drive USB Type-C Flash Drive",
    type: "found",
    description: "Found a metal retractable USB dual flash drive plugged into podium workstation in CSE Multimedia Lab 2 after Computer Networks lecture.",
    color: "Silver",
    brand: "SanDisk",
    location: "Academic Building 2, CSE Lab 2",
    incident_date: "2026-11-15",
    status: "pending_claim",
    identifying_marks: "Contains folder named 'Microprocessors_Assignments' and small blue string loop",
    created_at: "2026-11-15T15:00:00Z",
    updated_at: "2026-11-16T11:20:00Z",
    images: [
      {
        id: "img-4",
        item_id: "item-4",
        storage_path: "https://images.unsplash.com/photo-1624823183493-27ea2a4208a0?w=600&auto=format&fit=crop&q=80",
        is_primary: true,
      },
    ],
  },
  {
    id: "item-5",
    user_id: "user-student-1",
    category_id: "cat-3",
    title: "Dark Navy Arctic Hunter Waterproof Laptop Backpack",
    type: "lost",
    description: "Left my backpack near the benches under the banyan tree beside Shahid Minar while playing badminton. Contains spiral notebooks and water bottle.",
    color: "Navy Blue",
    brand: "Arctic Hunter",
    location: "Shahid Minar premises & Campus Playground",
    incident_date: "2026-11-11",
    status: "active",
    identifying_marks: "A small enamel cat badge pinned to the front zippered flap",
    created_at: "2026-11-11T17:40:00Z",
    updated_at: "2026-11-11T17:40:00Z",
    images: [
      {
        id: "img-5",
        item_id: "item-5",
        storage_path: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
        is_primary: true,
      },
    ],
  },
  {
    id: "item-6",
    user_id: "user-staff-1",
    category_id: "cat-4",
    title: "Motorbike Key with Red Honda Keychain & Gate Remote",
    type: "found",
    description: "Found a bike key with magnetic shutter key on the pavement of the northern student parking shed near PUST Main Gate.",
    color: "Silver / Red",
    brand: "Honda",
    location: "PUST Main Gate Parking Shed",
    incident_date: "2026-11-16",
    status: "active",
    identifying_marks: "Red silicone Honda logo fob with two small brass padlock keys",
    created_at: "2026-11-16T09:30:00Z",
    updated_at: "2026-11-16T09:30:00Z",
    images: [
      {
        id: "img-6",
        item_id: "item-6",
        storage_path: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600&auto=format&fit=crop&q=80",
        is_primary: true,
      },
    ],
  },
  {
    id: "item-7",
    user_id: "user-student-2",
    category_id: "cat-6",
    title: "Automatic Windproof Black Folding Umbrella",
    type: "found",
    description: "Found a black automatic folding umbrella with wooden handle hanging on coat rack in Auditorium Conference Hall 1.",
    color: "Black",
    brand: "Unknown",
    location: "Auditorium Conference Hall 1",
    incident_date: "2026-11-10",
    status: "reunited",
    identifying_marks: "Curved faux-wood handle with bronze pushbutton release",
    created_at: "2026-11-10T14:00:00Z",
    updated_at: "2026-11-13T10:00:00Z",
    images: [
      {
        id: "img-7",
        item_id: "item-7",
        storage_path: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=600&auto=format&fit=crop&q=80",
        is_primary: true,
      },
    ],
  },
];

export const INITIAL_CLAIMS: Claim[] = [
  {
    id: "claim-1",
    item_id: "item-4",
    claimant_id: "user-student-1",
    evidence: "The flash drive contains my Operating System lab submissions in folder 'Assignment_3_Sourov_21100234.pdf' and a backup of my GitHub SSH keys in an encrypted zip file.",
    contact_info: "Cell: 01722-112233 / Telegram: @sourov_pust",
    status: "pending",
    created_at: "2026-11-16T11:20:00Z",
  },
  {
    id: "claim-2",
    item_id: "item-7",
    claimant_id: "user-student-1",
    evidence: "Purchased this umbrella from Bogura New Market last month. It has a tiny stitch repair with green thread along the fourth inner spoke.",
    contact_info: "Cell: 01722-112233",
    status: "approved",
    reviewed_by: "user-admin-1",
    reviewed_at: "2026-11-13T10:00:00Z",
    admin_notes: "Owner verified identity and pointed out the unique green thread repair accurately in Proctor Office.",
    created_at: "2026-11-11T10:00:00Z",
  },
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    user_id: "user-student-1",
    title: "High Confidence Match Found! (87%)",
    message: "A found item 'Black Scientific Calculator Casio fx-991EX' closely matches your lost Casio calculator.",
    type: "match",
    link: "/dashboard/matches",
    is_read: false,
    created_at: "2026-11-14T18:46:00Z",
  },
  {
    id: "notif-2",
    user_id: "user-teacher-1",
    title: "New Claim Submitted on Your Found Post",
    message: "Sourov Sarkar (21100234) submitted an ownership claim for SanDisk Ultra 64GB Dual Drive.",
    type: "claim",
    link: "/items/item-4",
    is_read: false,
    created_at: "2026-11-16T11:20:00Z",
  },
  {
    id: "notif-3",
    user_id: "user-student-1",
    title: "Claim Approved — Item Reunited!",
    message: "Your ownership claim for 'Automatic Windproof Black Folding Umbrella' was approved by Proctor Office.",
    type: "status",
    link: "/dashboard/claims",
    is_read: true,
    created_at: "2026-11-13T10:00:00Z",
  },
  {
    id: "notif-4",
    user_id: "user-student-1",
    title: "Welcome to FindOra PUST",
    message: "Your university membership has been successfully verified. You now have full access to lost & found services.",
    type: "membership",
    link: "/dashboard",
    is_read: true,
    created_at: "2026-02-01T10:35:00Z",
  },
];

export const INITIAL_REPORTS: Report[] = [
  {
    id: "rep-1",
    item_id: "item-5",
    reporter_id: "user-student-2",
    reason: "Duplicate or spam listing",
    description: "The poster mistakenly posted the same backpack twice yesterday.",
    status: "pending",
    created_at: "2026-11-12T09:00:00Z",
  },
];

export const INITIAL_HISTORY: ItemHistory[] = [
  {
    id: "hist-1",
    item_id: "item-1",
    actor_id: "user-student-1",
    old_status: "active",
    new_status: "matched",
    note: "Automated smart match flagged against item #item-2 (87% confidence)",
    created_at: "2026-11-14T18:46:00Z",
  },
  {
    id: "hist-2",
    item_id: "item-4",
    actor_id: "user-student-1",
    old_status: "active",
    new_status: "pending_claim",
    note: "Ownership claim #claim-1 submitted by Sourov Sarkar",
    created_at: "2026-11-16T11:20:00Z",
  },
  {
    id: "hist-3",
    item_id: "item-7",
    actor_id: "user-admin-1",
    old_status: "pending_claim",
    new_status: "reunited",
    note: "Handed over to rightful owner Sourov Sarkar at Proctor Office after verifying green thread detail",
    created_at: "2026-11-13T10:00:00Z",
  },
];

// In-Memory Repository Store
class FindoraStore {
  private categories: Category[] = [...INITIAL_CATEGORIES];
  private profiles: Profile[] = [...INITIAL_PROFILES];
  private items: Item[] = [...INITIAL_ITEMS];
  private claims: Claim[] = [...INITIAL_CLAIMS];
  private notifications: Notification[] = [...INITIAL_NOTIFICATIONS];
  private reports: Report[] = [...INITIAL_REPORTS];
  private history: ItemHistory[] = [...INITIAL_HISTORY];

  // Active session mock (default to Sourov Sarkar for demo, can switch to admin anytime)
  private currentUserId: string = "user-student-1";

  constructor() {
    this.hydrateItems();
  }

  private hydrateItems() {
    for (const item of this.items) {
      if (!item.category) {
        item.category = this.categories.find((c) => c.id === item.category_id);
      }
      if (!item.user) {
        item.user = this.profiles.find((p) => p.id === item.user_id);
      }
    }
  }

  getCurrentUser(): Profile {
    return this.profiles.find((p) => p.id === this.currentUserId) || this.profiles[1];
  }

  setCurrentUser(userId: string): Profile | null {
    const user = this.profiles.find((p) => p.id === userId);
    if (user) {
      this.currentUserId = userId;
      return user;
    }
    return null;
  }

  // Categories
  getCategories(): Category[] {
    return this.categories;
  }

  addCategory(data: Omit<Category, "id">): Category {
    const newCat: Category = {
      ...data,
      id: `cat-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.categories.push(newCat);
    return newCat;
  }

  // Profiles & Users
  getProfiles(): Profile[] {
    return this.profiles;
  }

  getProfileById(id: string): Profile | undefined {
    return this.profiles.find((p) => p.id === id);
  }

  updateProfile(id: string, updates: Partial<Profile>): Profile | null {
    const index = this.profiles.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.profiles[index] = {
      ...this.profiles[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    return this.profiles[index];
  }

  updateUserStatus(id: string, status: AccountStatus): Profile | null {
    const profile = this.updateProfile(id, { account_status: status });
    if (profile) {
      this.addNotification({
        user_id: id,
        title: status === "approved" ? "University Membership Approved!" : `Account Status Updated: ${status}`,
        message: status === "approved"
          ? "Your PUST institutional identity has been verified. You can now report items and file ownership claims."
          : `Your account status was set to ${status}. Contact Proctor Office for inquiries.`,
        type: "membership",
        link: "/dashboard",
      });
    }
    return profile;
  }

  updateUserRole(id: string, role: UserRole): Profile | null {
    return this.updateProfile(id, { role });
  }

  // Items
  getItems(): Item[] {
    this.hydrateItems();
    return this.items.filter((item) => item.status !== "archived");
  }

  getAllItemsIncludingArchived(): Item[] {
    this.hydrateItems();
    return this.items;
  }

  getItemById(id: string): Item | undefined {
    this.hydrateItems();
    return this.items.find((item) => item.id === id);
  }

  createItem(data: Omit<Item, "id" | "created_at" | "updated_at" | "category" | "user">): Item {
    const now = new Date().toISOString();
    const newItem: Item = {
      ...data,
      id: `item-${Date.now()}`,
      created_at: now,
      updated_at: now,
      status: "active",
      category: this.categories.find((c) => c.id === data.category_id),
      user: this.profiles.find((p) => p.id === data.user_id),
    };
    this.items.unshift(newItem);

    // Record initial history
    this.history.unshift({
      id: `hist-${Date.now()}`,
      item_id: newItem.id,
      actor_id: newItem.user_id,
      old_status: "active",
      new_status: "active",
      note: `Item post created by ${newItem.user?.full_name || "member"}`,
      created_at: now,
    });

    return newItem;
  }

  updateItem(id: string, updates: Partial<Item>, actorId?: string): Item | null {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) return null;

    const oldItem = this.items[index];
    const now = new Date().toISOString();

    if (updates.status && updates.status !== oldItem.status) {
      this.history.unshift({
        id: `hist-${Date.now()}`,
        item_id: id,
        actor_id: actorId || oldItem.user_id,
        old_status: oldItem.status,
        new_status: updates.status,
        note: `Status changed from ${oldItem.status} to ${updates.status}`,
        created_at: now,
      });
    }

    this.items[index] = {
      ...oldItem,
      ...updates,
      updated_at: now,
    };
    this.hydrateItems();
    return this.items[index];
  }

  archiveItem(id: string, actorId?: string): boolean {
    const updated = this.updateItem(id, { status: "archived" }, actorId);
    return !!updated;
  }

  // Claims
  getClaims(): Claim[] {
    return this.claims.map((claim) => ({
      ...claim,
      item: this.items.find((i) => i.id === claim.item_id),
      claimant: this.profiles.find((p) => p.id === claim.claimant_id),
      reviewer: claim.reviewed_by ? this.profiles.find((p) => p.id === claim.reviewed_by) : undefined,
    }));
  }

  getClaimsByItemId(itemId: string): Claim[] {
    return this.getClaims().filter((c) => c.item_id === itemId);
  }

  getClaimsByClaimant(claimantId: string): Claim[] {
    return this.getClaims().filter((c) => c.claimant_id === claimantId);
  }

  createClaim(data: { item_id: string; claimant_id: string; evidence: string; contact_info: string }): Claim {
    const existing = this.claims.find((c) => c.item_id === data.item_id && c.claimant_id === data.claimant_id);
    if (existing) {
      throw new Error("You have already submitted an active claim for this item.");
    }

    const newClaim: Claim = {
      id: `claim-${Date.now()}`,
      ...data,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    this.claims.unshift(newClaim);

    // Update item status to pending_claim
    this.updateItem(data.item_id, { status: "pending_claim" }, data.claimant_id);

    // Notify item owner
    const item = this.getItemById(data.item_id);
    if (item && item.user_id !== data.claimant_id) {
      this.addNotification({
        user_id: item.user_id,
        title: "New Claim Submitted",
        message: `An ownership claim was filed on your post "${item.title}". Administrative review is underway.`,
        type: "claim",
        link: `/items/${item.id}`,
      });
    }

    return newClaim;
  }

  resolveClaim(claimId: string, status: "approved" | "rejected", reviewerId: string, adminNotes?: string): Claim | null {
    const index = this.claims.findIndex((c) => c.id === claimId);
    if (index === -1) return null;

    const claim = this.claims[index];
    claim.status = status;
    claim.reviewed_by = reviewerId;
    claim.reviewed_at = new Date().toISOString();
    claim.admin_notes = adminNotes || null;

    const item = this.getItemById(claim.item_id);

    if (status === "approved" && item) {
      // Mark item as reunited
      this.updateItem(item.id, { status: "reunited" }, reviewerId);
      // Notify claimant
      this.addNotification({
        user_id: claim.claimant_id,
        title: "Ownership Claim Approved!",
        message: `Your ownership claim for "${item.title}" was approved. Please collect your item from Proctor Office.`,
        type: "claim",
        link: "/dashboard/claims",
      });
    } else if (status === "rejected" && item) {
      // Revert item back to active
      this.updateItem(item.id, { status: "active" }, reviewerId);
      this.addNotification({
        user_id: claim.claimant_id,
        title: "Claim Verification Declined",
        message: `Your ownership claim for "${item.title}" could not be verified: ${adminNotes || "Insufficient proof"}`,
        type: "claim",
        link: "/dashboard/claims",
      });
    }

    return claim;
  }

  // Notifications
  getNotifications(userId: string): Notification[] {
    return this.notifications.filter((n) => n.user_id === userId);
  }

  addNotification(data: Omit<Notification, "id" | "created_at" | "is_read">): Notification {
    const newNotif: Notification = {
      ...data,
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    this.notifications.unshift(newNotif);
    return newNotif;
  }

  markNotificationAsRead(id: string): boolean {
    const notif = this.notifications.find((n) => n.id === id);
    if (notif) {
      notif.is_read = true;
      return true;
    }
    return false;
  }

  markAllNotificationsRead(userId: string): void {
    for (const notif of this.notifications) {
      if (notif.user_id === userId) {
        notif.is_read = true;
      }
    }
  }

  // Reports
  getReports(): Report[] {
    return this.reports.map((r) => ({
      ...r,
      item: this.items.find((i) => i.id === r.item_id),
      reporter: this.profiles.find((p) => p.id === r.reporter_id),
    }));
  }

  createReport(data: { item_id: string; reporter_id: string; reason: string; description?: string }): Report {
    const newRep: Report = {
      id: `rep-${Date.now()}`,
      ...data,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    this.reports.unshift(newRep);
    return newRep;
  }

  resolveReport(reportId: string, status: "reviewed" | "dismissed", reviewerId: string): Report | null {
    const report = this.reports.find((r) => r.id === reportId);
    if (report) {
      report.status = status;
      report.reviewed_by = reviewerId;
      return report;
    }
    return null;
  }

  // History & Audit
  getItemHistory(itemId?: string): ItemHistory[] {
    return this.history
      .filter((h) => (!itemId ? true : h.item_id === itemId))
      .map((h) => ({
        ...h,
        actor: this.profiles.find((p) => p.id === h.actor_id),
      }));
  }

  // Platform Analytics Stats
  getPlatformStats(): PlatformStats {
    const totalUsers = this.profiles.length;
    const approvedUsers = this.profiles.filter((p) => p.account_status === "approved").length;
    const pendingMemberships = this.profiles.filter((p) => p.account_status === "pending").length;

    const totalLostPosts = this.items.filter((i) => i.type === "lost" && i.status !== "archived").length;
    const totalFoundPosts = this.items.filter((i) => i.type === "found" && i.status !== "archived").length;
    const pendingClaims = this.claims.filter((c) => c.status === "pending").length;
    const reunitedItems = this.items.filter((i) => i.status === "reunited").length;
    const reportedPosts = this.reports.filter((r) => r.status === "pending").length;

    const totalResolved = reunitedItems;
    const totalEligible = totalLostPosts + totalFoundPosts;
    const recoveryRate = totalEligible > 0 ? Math.round((totalResolved / totalEligible) * 100) : 0;

    return {
      totalUsers,
      approvedUsers,
      pendingMemberships,
      totalLostPosts,
      totalFoundPosts,
      pendingClaims,
      reunitedItems,
      reportedPosts,
      recoveryRate,
    };
  }
}

// Global singleton instance
export const store = new FindoraStore();

