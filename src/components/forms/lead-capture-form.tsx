"use client";

import React, { useState } from "react";

const SERVICES = [
  "AI Voice Agents & Telephony",
  "Modern Website & Web App Development",
  "Motion Graphics & Interactive Animation",
  "Custom AI Automation & Workflows",
  "Full-Stack Platform / Other",
];

export function LeadCaptureForm({ title = "Request a Consultation & Quote", subtitle = "Tell us about your project requirements and our team will get back to you within 2 hours." }: { title?: string; subtitle?: string }) {
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

    // Simulate clean submission handling
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/40 via-zinc-900 to-zinc-950 p-8 sm:p-10 text-center shadow-2xl backdrop-blur-xl">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/20 text-3xl text-emerald-400 border border-emerald-500/30">
          OK
        </div>
        <h3 className="mt-5 text-2xl font-bold text-white">Thank You, {formData.name}!</h3>
        <p className="mt-2 text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
          Your project inquiry for <span className="text-violet-400 font-medium">{formData.service}</span> has been received. Our team will review your requirements and reach out to <span className="text-white font-medium">{formData.email}</span> / <span className="text-white font-medium">{formData.phone}</span> within 2 hours.
        </p>
        <div className="mt-6 rounded-2xl bg-white/[0.04] p-4 border border-white/10 text-xs text-zinc-400">
          <p>Direct inquiry email: <a href="mailto:hello@nexivratech.in" className="text-violet-400 hover:underline font-semibold">hello@nexivratech.in</a></p>
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
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2 text-xs font-semibold text-white hover:bg-white/20 transition"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
        <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Full Name <span className="text-violet-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Work Email <span className="text-violet-400">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="alex@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Phone Number <span className="text-violet-400">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Company / Organization
            </label>
            <input
              type="text"
              placeholder="e.g. Acme Corp"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Service Required <span className="text-violet-400">*</span>
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-white focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition"
          >
            {SERVICES.map((s) => (
              <option key={s} value={s} className="bg-zinc-900 text-white">
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Project Requirements & Goals <span className="text-violet-400">*</span>
          </label>
          <textarea
            required
            rows={4}
            placeholder="Tell us what you are looking to build (e.g. custom AI receptionist for incoming customer calls, new animated website, web application, timeline, etc.)..."
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-600/30 hover:opacity-95 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Submitting Request..." : "Send Project Request"}
        </button>

        <p className="text-center text-[11px] text-zinc-500">
          Direct email: <a href="mailto:hello@nexivratech.in" className="text-violet-400 hover:underline">hello@nexivratech.in</a> • Quick response guaranteed
        </p>
      </form>
    </div>
  );
}
