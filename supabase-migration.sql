-- ============================================================
-- AS Performance Business OS — Full Supabase Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ===== 1. PROFILES =====
-- Extends Supabase auth.users with app-specific data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('admin', 'technician', 'customer')),
  phone TEXT DEFAULT '',
  company_name TEXT DEFAULT '',
  picture TEXT DEFAULT '',
  provider TEXT DEFAULT 'email',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===== 2. VEHICLES =====
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER,
  ecu_type TEXT DEFAULT '',
  plate_number TEXT DEFAULT '',
  vehicle_type TEXT DEFAULT 'Car',
  fuel_type TEXT DEFAULT '',
  engine_code TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===== 3. REQUESTS (File Service Orders) =====
CREATE TABLE IF NOT EXISTS public.requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  service_type TEXT NOT NULL,
  services_selected TEXT[] DEFAULT '{}',
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed', 'delivered', 'cancelled')),
  credits_charged INTEGER DEFAULT 0,
  price NUMERIC(10,2),
  is_paid BOOLEAN DEFAULT false,
  tool_used TEXT DEFAULT '',
  read_method TEXT DEFAULT '',
  checksum_mode TEXT DEFAULT '',
  dtc_codes TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  start_date DATE,
  finish_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===== 4. REQUEST MESSAGES =====
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.requests(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===== 5. REQUEST FILES (attachments) =====
CREATE TABLE IF NOT EXISTS public.request_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.requests(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER DEFAULT 0,
  file_type TEXT DEFAULT '',
  direction TEXT DEFAULT 'upload' CHECK (direction IN ('upload', 'download')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===== 6. WALLETS (Credit Balance) =====
CREATE TABLE IF NOT EXISTS public.wallets (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  balance INTEGER DEFAULT 0 CHECK (balance >= 0),
  total_purchased INTEGER DEFAULT 0,
  total_used INTEGER DEFAULT 0,
  priority TEXT DEFAULT 'Standard',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===== 7. TRANSACTIONS (Credit History) =====
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('credit', 'debit')),
  amount INTEGER NOT NULL CHECK (amount > 0),
  description TEXT NOT NULL DEFAULT '',
  reference TEXT DEFAULT '',
  reference_id TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Idempotency: prevent duplicate credits from the same Payhip transaction
CREATE UNIQUE INDEX IF NOT EXISTS idx_transactions_idempotent 
  ON public.transactions(reference_id, type) 
  WHERE type = 'credit' AND reference_id != '';

-- ===== 8. REFERRAL CODES =====
CREATE TABLE IF NOT EXISTS public.referral_codes (
  code TEXT PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  owner_name TEXT NOT NULL DEFAULT '',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===== 9. REFERRAL SIGNUPS =====
CREATE TABLE IF NOT EXISTS public.referral_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL REFERENCES public.referral_codes(code) ON DELETE CASCADE,
  referrer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  referred_name TEXT DEFAULT '',
  order_amount NUMERIC(10,2) DEFAULT 0,
  qualifies BOOLEAN DEFAULT false,
  discount_issued BOOLEAN DEFAULT false,
  discount_amount NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===== 10. REFERRAL REWARDS =====
CREATE TABLE IF NOT EXISTS public.referral_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  referrer_name TEXT DEFAULT '',
  code TEXT NOT NULL,
  referred_name TEXT DEFAULT '',
  order_amount NUMERIC(10,2) DEFAULT 0,
  discount_percent NUMERIC(5,2) DEFAULT 15,
  discount_value NUMERIC(10,2) DEFAULT 0,
  used BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===== 11. NOTIFICATIONS =====
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT DEFAULT 'info' CHECK (type IN ('assignment', 'status', 'message', 'request', 'referral', 'system', 'info')),
  title TEXT NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  read BOOLEAN DEFAULT false,
  link TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===== 12. INBOX MESSAGES =====
CREATE TABLE IF NOT EXISTS public.inbox_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  from_name TEXT NOT NULL DEFAULT '',
  from_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  subject TEXT NOT NULL DEFAULT '',
  preview TEXT DEFAULT '',
  read BOOLEAN DEFAULT false,
  request_id UUID REFERENCES public.requests(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===== 13. ACTIVITY LOG =====
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===== INDEXES FOR PERFORMANCE =====
CREATE INDEX IF NOT EXISTS idx_vehicles_customer ON public.vehicles(customer_id);
CREATE INDEX IF NOT EXISTS idx_requests_customer ON public.requests(customer_id);
CREATE INDEX IF NOT EXISTS idx_requests_assigned ON public.requests(assigned_to);
CREATE INDEX IF NOT EXISTS idx_requests_status ON public.requests(status);
CREATE INDEX IF NOT EXISTS idx_messages_request ON public.messages(request_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON public.notifications(user_id) WHERE read = false;
CREATE INDEX IF NOT EXISTS idx_inbox_user ON public.inbox_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_user ON public.activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_created ON public.activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_referral_codes_owner ON public.referral_codes(owner_id);
CREATE INDEX IF NOT EXISTS idx_request_files_request ON public.request_files(request_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.request_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inbox_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Helper: check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper: check if current user is technician
CREATE OR REPLACE FUNCTION public.is_technician()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'technician'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ── PROFILES ──
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.is_admin());
CREATE POLICY "Technicians can view customer profiles" ON public.profiles FOR SELECT USING (public.is_technician());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can update any profile" ON public.profiles FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can insert profiles" ON public.profiles FOR INSERT WITH CHECK (public.is_admin() OR auth.uid() = id);

-- ── VEHICLES ──
CREATE POLICY "Customers see own vehicles" ON public.vehicles FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Admins/Techs see all vehicles" ON public.vehicles FOR SELECT USING (public.is_admin() OR public.is_technician());
CREATE POLICY "Customers can add vehicles" ON public.vehicles FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Customers can update own vehicles" ON public.vehicles FOR UPDATE USING (auth.uid() = customer_id);
CREATE POLICY "Admins can manage all vehicles" ON public.vehicles FOR ALL USING (public.is_admin());

-- ── REQUESTS ──
CREATE POLICY "Customers see own requests" ON public.requests FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Techs see assigned requests" ON public.requests FOR SELECT USING (auth.uid() = assigned_to);
CREATE POLICY "Admins see all requests" ON public.requests FOR SELECT USING (public.is_admin());
CREATE POLICY "Customers can create requests" ON public.requests FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Customers can update own requests" ON public.requests FOR UPDATE USING (auth.uid() = customer_id);
CREATE POLICY "Techs can update assigned requests" ON public.requests FOR UPDATE USING (auth.uid() = assigned_to);
CREATE POLICY "Admins can manage all requests" ON public.requests FOR ALL USING (public.is_admin());

-- ── MESSAGES ──
CREATE POLICY "Participants can view messages" ON public.messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.requests r 
    WHERE r.id = request_id 
    AND (r.customer_id = auth.uid() OR r.assigned_to = auth.uid() OR public.is_admin())
  )
);
CREATE POLICY "Participants can send messages" ON public.messages FOR INSERT WITH CHECK (
  auth.uid() = sender_id AND EXISTS (
    SELECT 1 FROM public.requests r 
    WHERE r.id = request_id 
    AND (r.customer_id = auth.uid() OR r.assigned_to = auth.uid() OR public.is_admin())
  )
);

-- ── REQUEST FILES ──
CREATE POLICY "Participants can view files" ON public.request_files FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.requests r 
    WHERE r.id = request_id 
    AND (r.customer_id = auth.uid() OR r.assigned_to = auth.uid() OR public.is_admin())
  )
);
CREATE POLICY "Participants can upload files" ON public.request_files FOR INSERT WITH CHECK (
  auth.uid() = uploaded_by
);

-- ── WALLETS ──
CREATE POLICY "Users see own wallet" ON public.wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins see all wallets" ON public.wallets FOR SELECT USING (public.is_admin());
CREATE POLICY "System can update wallets" ON public.wallets FOR ALL USING (public.is_admin() OR auth.uid() = user_id);

-- ── TRANSACTIONS ──
CREATE POLICY "Users see own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins see all transactions" ON public.transactions FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert transactions" ON public.transactions FOR INSERT WITH CHECK (public.is_admin());

-- ── REFERRAL CODES ──
CREATE POLICY "Anyone can view active codes" ON public.referral_codes FOR SELECT USING (active = true);
CREATE POLICY "Users can create own codes" ON public.referral_codes FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Admins can manage codes" ON public.referral_codes FOR ALL USING (public.is_admin());

-- ── REFERRAL SIGNUPS ──
CREATE POLICY "Referrers see own signups" ON public.referral_signups FOR SELECT USING (auth.uid() = referrer_id);
CREATE POLICY "Admins see all signups" ON public.referral_signups FOR SELECT USING (public.is_admin());
CREATE POLICY "System can insert signups" ON public.referral_signups FOR INSERT WITH CHECK (true);

-- ── REFERRAL REWARDS ──
CREATE POLICY "Users see own rewards" ON public.referral_rewards FOR SELECT USING (auth.uid() = referrer_id);
CREATE POLICY "Admins see all rewards" ON public.referral_rewards FOR SELECT USING (public.is_admin());

-- ── NOTIFICATIONS ──
CREATE POLICY "Users see own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can insert notifications" ON public.notifications FOR INSERT WITH CHECK (true);

-- ── INBOX MESSAGES ──
CREATE POLICY "Users see own inbox" ON public.inbox_messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own inbox" ON public.inbox_messages FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can insert inbox" ON public.inbox_messages FOR INSERT WITH CHECK (true);

-- ── ACTIVITY LOG ──
CREATE POLICY "Admins see all activity" ON public.activity_log FOR SELECT USING (public.is_admin());
CREATE POLICY "Users see own activity" ON public.activity_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert activity" ON public.activity_log FOR INSERT WITH CHECK (true);

-- ============================================================
-- TRIGGERS & FUNCTIONS
-- ============================================================

-- Auto-create profile + wallet on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, provider)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer'),
    COALESCE(NEW.raw_user_meta_data->>'provider', 'email')
  );
  
  INSERT INTO public.wallets (user_id, balance, total_purchased, total_used, priority)
  VALUES (NEW.id, 0, 0, 0, 'Standard');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if present, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS vehicles_updated_at ON public.vehicles;
CREATE TRIGGER vehicles_updated_at BEFORE UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS requests_updated_at ON public.requests;
CREATE TRIGGER requests_updated_at BEFORE UPDATE ON public.requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS wallets_updated_at ON public.wallets;
CREATE TRIGGER wallets_updated_at BEFORE UPDATE ON public.wallets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- STORAGE BUCKET for ECU Files
-- ============================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'ecu-files',
  'ecu-files',
  false,
  52428800,  -- 50MB max
  ARRAY['application/octet-stream', 'application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed', 'application/gzip']
) ON CONFLICT (id) DO NOTHING;

-- Storage RLS: customers can upload to their own folder
CREATE POLICY "Users upload to own folder" ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'ecu-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Storage RLS: users can view their own files, admins/techs can view all
CREATE POLICY "Users view own files" ON storage.objects FOR SELECT 
  USING (bucket_id = 'ecu-files' AND (
    (storage.foldername(name))[1] = auth.uid()::text 
    OR public.is_admin() 
    OR public.is_technician()
  ));

-- Admins can manage all files
CREATE POLICY "Admins manage all files" ON storage.objects FOR ALL 
  USING (bucket_id = 'ecu-files' AND public.is_admin());

-- ============================================================
-- DONE! Schema created successfully.
-- ============================================================
