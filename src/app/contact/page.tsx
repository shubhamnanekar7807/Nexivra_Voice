import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";

export const metadata = {
  title: "Contact Us | Nexivra Tech",
  description: "Get in touch with Nexivra Tech for AI Voice Agents, Modern Web Applications, and Motion Design.",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#060913] text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 size-[650px] rounded-full bg-gradient-to-tr from-blue-600/25 via-cyan-500/20 to-fuchsia-600/20 blur-[130px]" />
        <div className="absolute top-[500px] -right-40 size-[550px] rounded-full bg-gradient-to-br from-fuchsia-600/25 via-pink-500/20 to-indigo-600/20 blur-[140px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060913]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo size="md" href="/" />

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <Link href="/#services" className="hover:text-cyan-400 transition">Services</Link>
            <Link href="/#live-agent" className="hover:text-blue-400 transition">AI Voice Agent</Link>
            <Link href="/#use-cases" className="hover:text-pink-400 transition">Use Cases</Link>
            <Link href="/contact" className="text-cyan-400 font-bold transition">Contact Us</Link>
          </nav>

          <Link
            href="/contact"
            className="rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:scale-105 transition"
          >
            Get a Quote ✨
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Contact Details & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-4 py-1.5 text-xs font-bold text-emerald-300">
                <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                <span>We are open for new projects</span>
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Let&apos;s Build Something{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Extraordinary.
                </span>
              </h1>
              <p className="mt-4 text-base text-slate-300 leading-relaxed">
                Whether you need sub-second multilingual AI Voice Agents, modern web applications, or custom interactive motion design, Nexivra Tech is ready to engineer your solution.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0a152e]/90 to-[#060913]/90 p-7 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-2xl text-white shadow-lg shadow-cyan-500/30">
                  ✉️
                </span>
                <div>
                  <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Direct Inquiries & Support</p>
                  <a
                    href="mailto:hello@nexivratech.in"
                    className="text-xl font-extrabold text-white hover:text-cyan-400 transition"
                  >
                    hello@nexivratech.in
                  </a>
                </div>
              </div>
              <div className="mt-5 border-t border-white/10 pt-4 flex items-center justify-between text-xs text-slate-300 font-medium">
                <span>Response Guarantee:</span>
                <span className="text-emerald-400 font-bold">Under 2 Hours</span>
              </div>
            </div>

            {/* Key Service Highlights */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">Our Core Capabilities</h3>
              {[
                "AI Voice Agents (Marathi, Hindi & English Telephony)",
                "High-Speed Next.js & React Web Applications",
                "Motion Graphics, 3D & Interactive UI Animation",
                "Supabase Backend & Custom API Integrations",
              ].map((cap) => (
                <div key={cap} className="flex items-center gap-3 text-sm text-slate-200 font-medium">
                  <span className="grid size-5 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                    ✓
                  </span>
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <LeadCaptureForm
              title="Get in Touch"
              subtitle="Fill in the details below and we will get back to you with a custom plan and quote."
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#04060e] py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" href="/" />
          <p className="text-xs text-slate-400">
            © 2026 Nexivra Tech Inc. Official Email: <a href="mailto:hello@nexivratech.in" className="text-cyan-400 font-bold hover:underline">hello@nexivratech.in</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
