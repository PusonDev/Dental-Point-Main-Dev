-- Dr. Jarin's Dental Point — Full Database Schema
-- Run in Supabase SQL Editor

-- TABLE 1: Patient Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name       TEXT NOT NULL,
  phone           TEXT UNIQUE NOT NULL,
  email           TEXT UNIQUE,
  photo_url       TEXT,
  date_of_birth   DATE,
  gender          TEXT CHECK (gender IN ('male','female','other')),
  address         TEXT,
  blood_group     TEXT,
  emergency_contact TEXT,
  show_payment    BOOLEAN DEFAULT TRUE,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 2: Staff
CREATE TABLE IF NOT EXISTS staff (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name       TEXT NOT NULL,
  role            TEXT NOT NULL CHECK (role IN ('admin','receptionist')),
  phone           TEXT,
  email           TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 3: Visits
CREATE TABLE IF NOT EXISTS visits (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID REFERENCES profiles(id) ON DELETE CASCADE,
  visit_date      DATE NOT NULL,
  chief_complaint TEXT,
  treatment_done  TEXT,
  doctor_notes    TEXT,
  prescription    TEXT,
  next_visit_date DATE,
  next_visit_note TEXT,
  created_by      UUID REFERENCES staff(id),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 4: Reports
CREATE TABLE IF NOT EXISTS reports (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id        UUID REFERENCES visits(id) ON DELETE CASCADE,
  patient_id      UUID REFERENCES profiles(id) ON DELETE CASCADE,
  file_name       TEXT NOT NULL,
  file_url        TEXT NOT NULL,
  file_type       TEXT CHECK (file_type IN ('xray','prescription','report','other')),
  file_size_kb    INTEGER,
  uploaded_by     UUID REFERENCES staff(id),
  uploaded_at     TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 5: Appointments
CREATE TABLE IF NOT EXISTS appointments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID REFERENCES profiles(id),
  patient_name    TEXT,
  patient_phone   TEXT,
  requested_date  DATE,
  requested_time  TEXT,
  reason          TEXT,
  special_note    TEXT,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled','completed')),
  confirmed_date  DATE,
  confirmed_time  TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 6: Payments
CREATE TABLE IF NOT EXISTS payments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID REFERENCES profiles(id) ON DELETE CASCADE,
  visit_id        UUID REFERENCES visits(id),
  total_amount    DECIMAL(10,2) NOT NULL,
  paid_amount     DECIMAL(10,2) DEFAULT 0,
  due_amount      DECIMAL(10,2) DEFAULT 0,
  payment_type    TEXT CHECK (payment_type IN ('cash','bkash','nagad','online','other')),
  payment_status  TEXT DEFAULT 'due' CHECK (payment_status IN ('paid','partial','due')),
  transaction_id  TEXT,
  payment_date    DATE,
  notes           TEXT,
  recorded_by     UUID REFERENCES staff(id),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 7: Leads
CREATE TABLE IF NOT EXISTS leads (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       TEXT NOT NULL,
  phone           TEXT NOT NULL,
  email           TEXT,
  source          TEXT DEFAULT 'funnel',
  status          TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','converted','lost')),
  notes           TEXT,
  converted_to    UUID REFERENCES profiles(id),
  whatsapp_sent   BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 8: WhatsApp Queue
CREATE TABLE IF NOT EXISTS whatsapp_queue (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_phone TEXT NOT NULL,
  recipient_name  TEXT,
  patient_id      UUID REFERENCES profiles(id),
  trigger_type    TEXT NOT NULL,
  message_body    TEXT NOT NULL,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','sent','rejected')),
  approved_by     UUID REFERENCES staff(id),
  approved_at     TIMESTAMPTZ,
  sent_at         TIMESTAMPTZ,
  error_message   TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- TABLE 9: Clinic Settings
CREATE TABLE IF NOT EXISTS clinic_settings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key             TEXT UNIQUE NOT NULL,
  value           JSONB NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_visits_patient ON visits(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_whatsapp_status ON whatsapp_queue(status);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_settings ENABLE ROW LEVEL SECURITY;

-- Patient policies
CREATE POLICY "patient_own_profile" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "patient_own_visits" ON visits FOR SELECT USING (auth.uid() = patient_id);
CREATE POLICY "patient_own_reports" ON reports FOR SELECT USING (auth.uid() = patient_id);
CREATE POLICY "patient_own_appointments" ON appointments FOR ALL USING (auth.uid() = patient_id);
CREATE POLICY "patient_own_payments" ON payments FOR SELECT USING (
  auth.uid() = patient_id AND
  (SELECT show_payment FROM profiles WHERE id = auth.uid()) = TRUE
);

-- Staff can read own record
CREATE POLICY "staff_own_record" ON staff FOR SELECT USING (auth.uid() = user_id);

-- Public can insert appointments (handled via API with service role for admin reads)
-- Leads and whatsapp_queue: admin only via service role API routes

-- Storage bucket (run separately in dashboard or via API):
-- CREATE BUCKET reports WITH (public = false);
