"use client";

import React, { useState } from "react";

const SERVICES = [
  "AI Voice Agents & Telephony",
  "Modern Website & Web App Development",
  "Motion Graphics & Interactive Animation",
  "Custom AI Automation & Workflows",
  "Full-Stack Platform / Other",
];

export function LeadCaptureForm({
  title = "Talk to our engineering team",
  subtitle = "Tell us about your project requirements and our team will get back to you within 2 hours.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: SERVICES[0],
    requirements: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-blue-500/30 bg-[#0e112a] p-8 sm:p-10 text-center shadow-2xl">
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-500/40">
          ✓
        </div>
        <h3 className="mt-5 text-2xl font-bold text-white">Thank You, {formData.name}!</h3>
        <p className="mt-2 text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
          Your inquiry for <span className="text-cyan-300 font-semibold">{formData.service}</span> has been received. Our team will review your requirements and reach out to <span className="text-white font-semibold">{formData.email}</span> / <span className="text-white font-semibold">{formData.phone}</span> within 2 hours.
        </p>
        <div className="mt-6 rounded-2xl bg-white/[0.04] p-4 border border-white/10 text-xs text-zinc-400">
          <p>Direct inquiry email: <a href="mailto:hello@nexivratech.in" className="text-cyan-400 font-bold hover:underline">hello@nexivratech.in</a></p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              company: "",
              service: SERVICES[0],
              requirements: "",
            });
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-600/20 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-600/40 transition cursor-pointer"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-b from-[#0e112a]/95 to-[#080918]/95 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
      <div className="mb-6">
        <span className="inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold text-cyan-300 uppercase tracking-wider mb-2">
          Project Scoping & Quote
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{title}</h3>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Full Name <span className="text-cyan-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Alex Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Work Email <span className="text-cyan-400">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="alex@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Phone Number <span className="text-cyan-400">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Company / Organization
            </label>
            <input
              type="text"
              placeholder="Acme Corp"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Service Required <span className="text-cyan-400">*</span>
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full rounded-xl border border-white/15 bg-[#0e112a] px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
          >
            {SERVICES.map((s) => (
              <option key={s} value={s} className="bg-[#0e112a] text-white">
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Project Requirements & Goals <span className="text-cyan-400">*</span>
          </label>
          <textarea
            required
            rows={4}
            placeholder="Tell us what you want to build (e.g. AI voice agent for real phone calls in Marathi/Hindi, modern website, interactive 3D motion design)..."
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/30 hover:opacity-95 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Submitting Request..." : "Send Request ✨"}
        </button>

        <p className="text-center text-[11px] text-zinc-500">
          Direct email: <a href="mailto:hello@nexivratech.in" className="text-cyan-400 font-semibold hover:underline">hello@nexivratech.in</a> • 2-hour response guarantee
        </p>
      </form>
    </div>
  );
}
