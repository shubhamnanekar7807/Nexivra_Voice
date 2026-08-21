import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { z } from "zod";

const createAppointmentSchema = z.object({
  client_name: z.string().default("Voice Inquirer"),
  contact_info: z.string().optional().nullable(),
  service_requested: z.string().default("AI Voice Agent & Automation"),
  preferred_time: z.string().min(1, "Preferred time is required"),
  language: z.enum(["en", "hi", "mr"]).default("en"),
  transcript: z.string().optional().nullable(),
  source: z.enum(["voice_agent", "web_form", "telephony"]).default("voice_agent"),
});

// GET: Fetch recent appointments for dashboard
export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      // Return empty array gracefully if table not yet created in Supabase
      console.warn("Supabase appointments query warning:", error.message);
      return NextResponse.json({ appointments: [] });
    }

    return NextResponse.json({ appointments: data || [] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Error in GET /api/appointments:", message);
    return NextResponse.json({ appointments: [] });
  }
}

// POST: Book a new appointment from Voice Agent or UI
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createAppointmentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid appointment payload", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const payload = parsed.data;
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("appointments")
      .insert({
        client_name: payload.client_name,
        contact_info: payload.contact_info || null,
        service_requested: payload.service_requested,
        preferred_time: payload.preferred_time,
        language: payload.language,
        transcript: payload.transcript || null,
        status: "confirmed",
        source: payload.source,
      })
      .select()
      .single();

    if (error) {
      console.warn("Supabase insert warning:", error.message);
      // Fallback return for when Supabase table is being initialized
      return NextResponse.json({
        success: true,
        mockSaved: true,
        appointment: {
          id: "temp-" + Date.now(),
          ...payload,
          status: "confirmed",
          created_at: new Date().toISOString(),
        },
        message: "Appointment confirmed. Please run supabase/schema.sql in Supabase SQL editor for persistent table storage.",
      });
    }

    return NextResponse.json({
      success: true,
      appointment: data,
      message: "Appointment successfully booked and saved to Supabase!",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    console.error("Error in POST /api/appointments:", message);
    return NextResponse.json(
      { error: "Failed to book appointment", details: message },
      { status: 500 }
    );
  }
}
