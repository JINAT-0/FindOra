-- ============================================================
-- FINDORA: Seed Data
-- Pundra University of Science & Technology, Bogura
-- ============================================================

-- Categories
INSERT INTO public.categories (id, name, slug, icon, description) VALUES
('c0000001-0000-0000-0000-000000000001', 'Electronics & Gadgets', 'electronics', 'Laptop', 'Laptops, mobile phones, chargers, power banks, headphones, calculators'),
('c0000001-0000-0000-0000-000000000002', 'Documents & IDs', 'documents', 'FileText', 'Student IDs, National ID cards, admit cards, certificates, passports, licenses'),
('c0000001-0000-0000-0000-000000000003', 'Bags & Wallets', 'bags-wallets', 'Briefcase', 'Backpacks, purses, wallets, pouches, clutch bags'),
('c0000001-0000-0000-0000-000000000004', 'Keys & Accessories', 'keys', 'Key', 'Room keys, motorbike keys, bicycle locks, keychains'),
('c0000001-0000-0000-0000-000000000005', 'Books & Stationery', 'books-stationery', 'BookOpen', 'Textbooks, lab notebooks, registers, pens, art supplies'),
('c0000001-0000-0000-0000-000000000006', 'Clothing & Wearables', 'clothing', 'Shirt', 'Jackets, sweaters, caps, umbrellas, smartwatches, wristwatches'),
('c0000001-0000-0000-0000-000000000007', 'Personal Belongings', 'personal', 'HeartHandshake', 'Water bottles, spectacles/glasses, medical devices, sports gear'),
('c0000001-0000-0000-0000-000000000008', 'Other', 'other', 'HelpCircle', 'Miscellaneous items not classified above')
ON CONFLICT (id) DO NOTHING;

