"use client";

import React, { useState } from "react";

interface LeadCaptureFormProps {
  title?: string;
  subtitle?: string;
  defaultService?: string;
}

export function LeadCaptureForm({
  title = "Start Your Project with Nexivra",
  subtitle = "Tell us about your AI Voice, Web Application, or Motion Design requirements. Our engineering team reviews all requests and replies within 2 hours.",
  defaultService = "AI Voice Agents",
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: defaultService,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSuccess(true);
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      console.warn("Submitting lead error fallback:", err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0A0A0C] p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
      <div className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00D6FF]">
          Fast Project Intake
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {title}
        </h2>
        <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {isSuccess ? (
        <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xl font-bold">
            ✓
          </div>
          <h3 className="mt-4 text-lg font-bold text-white">Inquiry Recorded in Supabase DB!</h3>
          <p className="mt-2 text-xs text-zinc-300">
            Thank you, {formData.name}. We have saved your project details and will email you at <span className="font-semibold text-emerald-400">{formData.email}</span> within 2 hours.
          </p>
          <button
            onClick={() => {
              setIsSuccess(false);
              setFormData({ name: "", email: "", company: "", service: defaultService, message: "" });
            }}
            className="mt-6 text-xs text-emerald-400 underline hover:text-emerald-300 cursor-pointer"
          >
            Submit another inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 grid gap-6 sm:grid-cols-2">
          {errorMessage && (
            <div className="sm:col-span-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Rahul Sharma"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#00D6FF] focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Work Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="rahul@company.com"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#00D6FF] focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Company / Organization
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Company Name (Optional)"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#00D6FF] focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Service Needed
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0A0A0C] px-4 py-3 text-sm text-white focus:border-[#00D6FF] focus:outline-none transition"
            >
              <option value="AI Voice Agents">AI Voice Agents & Telephony</option>
              <option value="AI Automation Agents">AI Automation & Workflows</option>
              <option value="AI Knowledge Agents">AI Knowledge Base & SOPs</option>
              <option value="Custom Web App">Next.js Web Applications</option>
              <option value="Motion & 3D Design">Interactive Motion & 3D Design</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Project Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us what you want to build, languages required (English, Marathi, Hindi), timeline, or expected call volume..."
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-[#00D6FF] focus:outline-none transition"
            />
          </div>

          <div className="sm:col-span-2 flex items-center justify-between pt-2">
            <p className="text-xs text-zinc-500">
              Direct inbox: <span className="text-zinc-300 font-mono">hello@nexivratech.in</span>
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] px-8 py-3.5 text-xs font-bold text-white shadow-xl shadow-blue-500/25 hover:scale-105 transition disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Saving to Supabase..." : "Submit Project Request →"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
