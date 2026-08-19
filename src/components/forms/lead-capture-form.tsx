"use client";

import React, { useState } from "react";

const SERVICES = [
  "AI Voice Agents & Telephony",
  "Modern Website & Web App Development",
  "Motion Graphics & Interactive Animation",
  "Custom AI Automation & Workflows",
  "Full-Stack Platform / Other",
];

export function LeadCaptureForm({ title = "Let's Build Your Vision Together", subtitle = "Tell us about your project requirements and our engineering team will get back to you within 2 hours." }: { title?: string; subtitle?: string }) {
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
    }, 600);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/50 via-[#07131b] to-[#060913] p-8 sm:p-10 text-center shadow-2xl backdrop-blur-xl">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/25 text-3xl text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/30">
          ✓
        </div>
        <h3 className="mt-5 text-2xl font-black text-white">Thank You, {formData.name}!</h3>
        <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          Your project inquiry for <span className="text-cyan-400 font-bold">{formData.service}</span> has been received. Our team will review your requirements and reach out to <span className="text-white font-bold">{formData.email}</span> / <span className="text-white font-bold">{formData.phone}</span> within 2 hours.
        </p>
        <div className="mt-6 rounded-2xl bg-white/[0.06] p-4 border border-white/10 text-xs text-slate-300">
          <p>Direct inquiry email: <a href="mailto:hello@nexivratech.in" className="text-cyan-400 hover:underline font-bold">hello@nexivratech.in</a></p>
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
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/15 px-6 py-2.5 text-xs font-bold text-white hover:bg-white/25 transition"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0a1226]/95 to-[#060913]/95 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
      <div className="mb-6">
        <span className="inline-block rounded-full bg-cyan-500/20 px-3 py-1 text-[11px] font-bold text-cyan-300 border border-cyan-400/30 uppercase tracking-wider mb-2">
          Fast Scoping & Consultation
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{title}</h3>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Full Name <span className="text-cyan-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Work Email <span className="text-cyan-400">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="alex@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Phone Number <span className="text-cyan-400">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Company / Organization
            </label>
            <input
              type="text"
              placeholder="e.g. Acme Corp"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Service Required <span className="text-cyan-400">*</span>
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full rounded-xl border border-white/15 bg-[#0a1226] px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
          >
            {SERVICES.map((s) => (
              <option key={s} value={s} className="bg-[#0a1226] text-white">
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Project Requirements & Goals <span className="text-cyan-400">*</span>
          </label>
          <textarea
            required
            rows={4}
            placeholder="Tell us what you are looking to build (e.g. custom AI receptionist for incoming customer calls in Marathi/Hindi, new interactive motion website, custom web application, etc.)..."
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 py-4 text-sm font-extrabold text-white shadow-xl shadow-blue-500/30 hover:opacity-95 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Submitting Request..." : "Send Project Request ✨"}
        </button>

        <p className="text-center text-[11px] text-slate-400">
          Official Email: <a href="mailto:hello@nexivratech.in" className="text-cyan-400 font-bold hover:underline">hello@nexivratech.in</a> • Quick response guaranteed
        </p>
      </form>
    </div>
  );
}
