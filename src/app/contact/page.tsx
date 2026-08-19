import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";

export const metadata = {
  title: "Contact Us | Nexivra Tech",
  description: "Get in touch with Nexivra Tech for AI Voice Agents, Modern Web Applications, and Motion Design.",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#09090b] text-zinc-100 selection:bg-violet-500 selection:text-white">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute top-[500px] -right-40 size-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo size="md" href="/" />

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="/#services" className="hover:text-white transition">Services</Link>
            <Link href="/#live-agent" className="hover:text-white transition">AI Voice Agent</Link>
            <Link href="/#work" className="hover:text-white transition">Web & Motion</Link>
            <Link href="/contact" className="text-violet-400 font-semibold transition">Contact Us</Link>
          </nav>

          <Link
            href="/contact"
            className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-violet-600/30 hover:from-violet-500 hover:to-indigo-500 transition"
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
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1.5 text-xs font-medium text-violet-300">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>We are open for new projects</span>
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Let&apos;s Build Something <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-400 bg-clip-text text-transparent">Extraordinary.</span>
              </h1>
              <p className="mt-4 text-base text-zinc-400 leading-relaxed">
                Whether you need sub-second AI Voice Agents, modern web applications, or custom interactive motion design, Nexivra Tech is here to engineer your solution.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-b from-violet-950/40 via-zinc-900 to-zinc-950 p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-xl bg-violet-600/20 text-2xl border border-violet-500/30">
                  @
                </span>
                <div>
                  <p className="text-xs text-zinc-400 font-medium">Direct Inquiries & Support</p>
                  <a
                    href="mailto:hello@nexivratech.in"
                    className="text-lg font-bold text-white hover:text-violet-400 transition"
                  >
                    hello@nexivratech.in
                  </a>
                </div>
              </div>
              <div className="mt-4 border-t border-white/10 pt-4 flex items-center justify-between text-xs text-zinc-400">
                <span>Response Guarantee:</span>
                <span className="text-emerald-400 font-semibold">Under 2 Hours</span>
              </div>
            </div>

            {/* Key Service Highlights */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Our Core Capabilities</h3>
              {[
                "AI Voice Agents & Automated Phone Triage",
                "High-Speed Next.js & React Web Applications",
                "Motion Graphics, 3D & Interactive UI Animation",
                "Supabase Backend & Custom API Integrations",
              ].map((cap) => (
                <div key={cap} className="flex items-center gap-2.5 text-sm text-zinc-300">
                  <span className="text-violet-400 font-bold">✓</span>
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
      <footer className="border-t border-white/10 bg-zinc-950 py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" href="/" />
          <p className="text-xs text-zinc-500">
            © 2026 Nexivra Tech Inc. Official Email: <a href="mailto:hello@nexivratech.in" className="text-zinc-400 hover:underline">hello@nexivratech.in</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
