export type StaffRole = "admin" | "receptionist";

export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type LeadStatus = "new" | "contacted" | "converted" | "lost";
export type WhatsAppStatus = "pending" | "approved" | "sent" | "rejected";
export type PaymentStatus = "paid" | "partial" | "due";
export type PaymentType = "cash" | "bkash" | "nagad" | "online" | "other";
export type FileType = "xray" | "prescription" | "report" | "other";
export type WhatsAppTrigger = "welcome" | "login" | "reminder" | "followup" | "due" | "festival" | "manual";

export interface Profile {
  id: string;
  full_name: string;
  phone: string;
  email?: string | null;
  photo_url?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  address?: string | null;
  blood_group?: string | null;
  emergency_contact?: string | null;
  show_payment: boolean;
  is_active: boolean;
  is_deleted?: boolean;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Staff {
  id: string;
  user_id: string;
  full_name: string;
  role: StaffRole;
  phone?: string | null;
  email?: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Visit {
  id: string;
  patient_id: string;
  visit_date: string;
  chief_complaint?: string | null;
  treatment_done?: string | null;
  doctor_notes?: string | null;
  prescription?: string | null;
  next_visit_date?: string | null;
  next_visit_note?: string | null;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
  visit_id?: string | null;
  patient_id: string;
  file_name: string;
  file_url: string;
  file_type?: FileType | null;
  file_size_kb?: number | null;
  uploaded_by?: string | null;
  uploaded_at: string;
}

export interface Appointment {
  id: string;
  patient_id?: string | null;
  patient_name?: string | null;
  patient_phone?: string | null;
  requested_date?: string | null;
  requested_time?: string | null;
  reason?: string | null;
  special_note?: string | null;
  status: AppointmentStatus;
  confirmed_date?: string | null;
  confirmed_time?: string | null;
  notes?: string | null;
  is_deleted?: boolean;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  patient_id: string;
  visit_id?: string | null;
  total_amount: number;
  paid_amount: number;
  due_amount: number;
  payment_type?: PaymentType | null;
  payment_status: PaymentStatus;
  transaction_id?: string | null;
  payment_date?: string | null;
  notes?: string | null;
  recorded_by?: string | null;
  is_deleted?: boolean;
  deleted_at?: string | null;
  created_at: string;
}

export interface Lead {
  id: string;
  full_name: string;
  phone: string;
  email?: string | null;
  source: string;
  status: LeadStatus;
  notes?: string | null;
  converted_to?: string | null;
  whatsapp_sent: boolean;
  is_deleted?: boolean;
  deleted_at?: string | null;
  created_at: string;
}

export interface WhatsAppQueueItem {
  id: string;
  recipient_phone: string;
  recipient_name?: string | null;
  patient_id?: string | null;
  trigger_type: WhatsAppTrigger;
  message_body: string;
  status: WhatsAppStatus;
  approved_by?: string | null;
  approved_at?: string | null;
  sent_at?: string | null;
  error_message?: string | null;
  created_at: string;
}
