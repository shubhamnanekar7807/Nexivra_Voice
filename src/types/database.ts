export type BusinessRole = "owner" | "admin" | "editor" | "viewer";

export interface BusinessMembership {
  business_id: string;
  role: BusinessRole;
  businesses: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  client_name: string;
  contact_info?: string | null;
  service_requested: string;
  preferred_time: string;
  language: "en" | "hi" | "mr";
  transcript?: string | null;
  status: AppointmentStatus;
  source: "voice_agent" | "web_form" | "telephony";
  created_at: string;
  updated_at?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  service: string;
  message: string;
  status: "new" | "contacted" | "closed";
  created_at: string;
}
