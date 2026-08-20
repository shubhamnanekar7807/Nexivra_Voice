import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";

export const metadata = {
  title: "Contact Us | Nexivra Tech",
  description: "Get in touch with Nexivra Tech for AI Voice Agents, Modern Web Applications, and Motion Design.",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#080918] text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 size-[650px] rounded-full bg-gradient-to-tr from-blue-700/25 to-fuchsia-700/25 blur-[140px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080918]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo size="md" href="/" dark={true} />

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/#services" className="hover:text-white transition">Services</Link>
            <Link href="/#live-agent" className="hover:text-white transition">Voice Studio</Link>
            <Link href="/contact" className="text-cyan-400 font-bold transition">Contact Us</Link>
          </nav>

          <Link
            href="/contact"
            className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/30 hover:scale-105 transition"
          >
            Get a Quote
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Contact Details & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-3.5 py-1.5 text-xs font-bold text-cyan-300">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open for new projects & consultations</span>
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Let&apos;s Build Something{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  Extraordinary.
                </span>
              </h1>
              <p className="mt-4 text-base text-slate-300 leading-relaxed">
                Whether you need sub-second multilingual AI Voice Agents, modern web applications, or custom motion design, Nexivra Tech is ready to engineer your solution.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="rounded-3xl border border-blue-500/20 bg-[#0e112a] p-6 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3.5">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-xl text-white shadow-lg shadow-blue-500/30">
                  ✉️
                </span>
                <div>
                  <p className="text-xs text-cyan-300 font-bold uppercase tracking-wider">Direct Inquiries & Support</p>
                  <a
                    href="mailto:hello@nexivratech.in"
                    className="text-lg font-bold text-white hover:text-cyan-300 transition"
                  >
                    hello@nexivratech.in
                  </a>
                </div>
              </div>
              <div className="mt-4 border-t border-white/10 pt-4 flex items-center justify-between text-xs text-slate-300">
                <span>Response Guarantee:</span>
                <span className="text-emerald-400 font-bold">Under 2 Hours</span>
              </div>
            </div>

            {/* Key Service Highlights */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Our Core Capabilities</h3>
              {[
                "AI Voice Agents (Marathi, Hindi & English Telephony)",
                "High-Speed Next.js & React Web Applications",
                "Motion Graphics, 3D & Interactive UI Animation",
                "Supabase Backend & Custom API Integrations",
              ].map((cap) => (
                <div key={cap} className="flex items-center gap-2.5 text-sm text-slate-200 font-medium">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <LeadCaptureForm
              title="Talk to our engineering team"
              subtitle="Fill in the details below and we will get back to you with a custom plan and quote."
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#050611] py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" href="/" dark={true} />
          <p className="text-xs text-slate-500">
            © 2026 Nexivra Tech Inc. Official Email: <a href="mailto:hello@nexivratech.in" className="text-cyan-400 font-semibold hover:underline">hello@nexivratech.in</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
