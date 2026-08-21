-- ==============================================================================
-- NEXIVRA TECH: SUPABASE APPOINTMENTS & LEADS DATABASE SCHEMA
-- Run this SQL in your Supabase Project -> SQL Editor to initialize the tables
-- ==============================================================================

-- 1. Appointments Table (Voice Agent & Direct Bookings)
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL DEFAULT 'Voice Inquirer',
    contact_info TEXT DEFAULT NULL,
    service_requested TEXT NOT NULL DEFAULT 'AI Voice Agent & Automation',
    preferred_time TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'en', -- 'en' | 'hi' | 'mr'
    transcript TEXT DEFAULT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'confirmed' | 'completed' | 'cancelled'
    source TEXT NOT NULL DEFAULT 'voice_agent', -- 'voice_agent' | 'web_form' | 'telephony'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for fast status and date querying
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON public.appointments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);

-- 2. Leads Table (Contact Form Inquiries)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT DEFAULT NULL,
    service TEXT NOT NULL DEFAULT 'Custom AI Solution',
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new', -- 'new' | 'contacted' | 'closed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- 3. Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow public insertion (e.g. from Voice Agent & Contact Form on website)
CREATE POLICY "Allow public inserts on appointments" ON public.appointments
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow public select on appointments" ON public.appointments
    FOR SELECT TO anon, authenticated
    USING (true);

CREATE POLICY "Allow public updates on appointments" ON public.appointments
    FOR UPDATE TO anon, authenticated
    USING (true);

CREATE POLICY "Allow public inserts on leads" ON public.leads
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Allow public select on leads" ON public.leads
    FOR SELECT TO anon, authenticated
    USING (true);
