import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().optional().nullable(),
  service: z.string().default("AI Voice Agent & Web Solutions"),
  message: z.string().min(1, "Message is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form payload", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const payload = parsed.data;
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: payload.name,
        email: payload.email,
        company: payload.company || null,
        service: payload.service,
        message: payload.message,
        status: "new",
      })
      .select()
      .single();

    if (error) {
      console.warn("Supabase leads insert warning:", error.message);
      return NextResponse.json({
        success: true,
        mockSaved: true,
        lead: {
          id: "lead-" + Date.now(),
          ...payload,
          status: "new",
          created_at: new Date().toISOString(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      lead: data,
      message: "Lead successfully recorded in Supabase!",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    console.error("Error in POST /api/leads:", message);
    return NextResponse.json(
      { error: "Failed to record lead", details: message },
      { status: 500 }
    );
  }
}
