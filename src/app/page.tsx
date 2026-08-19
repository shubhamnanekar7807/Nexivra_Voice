import Link from "next/link";
import { AiVoiceAgent } from "@/components/voice/ai-voice-agent";
import { Logo } from "@/components/brand/logo";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";

const SERVICES_EXPANDED = [
  {
    category: "Voice AI & Automation",
    title: "AI Voice Agents & Telephony OS",
    description: "Multi-lingual, human-like voice agents for inbound support, live appointment scheduling, and automated outbound follow-ups with sub-500ms latency.",
    highlights: ["Sub-500ms conversational latency", "24/7/365 zero hold times", "CRM & Google Calendar integration", "Custom knowledge grounding"],
    badge: "Flagship",
    color: "from-violet-600 to-indigo-600",
  },
  {
    category: "Full-Stack Development",
    title: "Modern Websites & Web Applications",
    description: "Blazing-fast, responsive web applications built with Next.js, React, TypeScript, Tailwind CSS, and scalable Supabase/PostgreSQL backends.",
    highlights: ["High performance & SEO optimized", "SaaS platforms & client portals", "Secure authentication & database RLS", "Custom dashboard architecture"],
    badge: "High Demand",
    color: "from-blue-600 to-cyan-600",
  },
  {
    category: "Creative Engineering",
    title: "Motion Graphics & Interactive Animation",
    description: "Stunning interactive motion design, scroll-driven visual effects, smooth transitions, and dynamic branding that captivate visitors and convert leads.",
    highlights: ["Smooth micro-interactions", "Interactive product visualizers", "High-converting motion landing pages", "Brand identity & vector animations"],
    badge: "Creative",
    color: "from-fuchsia-600 to-pink-600",
  },
  {
    category: "Cloud & Integrations",
    title: "Custom AI & Workflow Automation",
    description: "Streamline business operations with custom LLM tools, automated customer onboarding pipelines, webhook integrations, and data synchronization.",
    highlights: ["Automated lead triage", "API & Webhook orchestrations", "Database sync & analytics", "Enterprise security compliance"],
    badge: "Automation",
    color: "from-emerald-600 to-teal-600",
  },
];

const USE_CASES = [
  {
    title: "Healthcare & Dental Clinics",
    description: "Automate patient scheduling, prescription refill inquiries, and triage 24/7.",
    stats: "82% reduction in call hold times",
  },
  {
    title: "Real Estate & Leasing Agencies",
    description: "Instantly qualify buyer inquiries, answer property FAQs, and book private viewing tours.",
    stats: "3.4x faster lead engagement",
  },
  {
    title: "SaaS & High-Growth Startups",
    description: "Combine interactive motion landing pages with AI agents for Tier-1 customer support.",
    stats: "70% first-contact resolution",
  },
  {
    title: "Legal & Professional Services",
    description: "Screen prospective clients, collect intake details, and schedule attorney consultations.",
    stats: "100% after-hours coverage",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#09090b] text-zinc-100 selection:bg-violet-500 selection:text-white">
      {/* Background Decorative Gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute top-[600px] -left-40 size-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />
        <div className="absolute top-[1400px] -right-40 size-[500px] rounded-full bg-fuchsia-600/10 blur-[140px]" />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo size="md" href="/" />

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#services" className="hover:text-white transition">Services</a>
            <a href="#live-agent" className="hover:text-white transition">Live Voice Agent</a>
            <a href="#use-cases" className="hover:text-white transition">Use Cases</a>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition"
            >
              Contact Us
            </Link>
            <Link
              href="/get-started"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-violet-600/30 hover:from-violet-500 hover:to-indigo-500 transition"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-24 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1.5 text-xs font-medium text-violet-300 backdrop-blur-md">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Nexivra Tech • AI Voice, Web & Motion Engineering</span>
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Next-Gen Voice AI, Modern Web Apps & <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-400 bg-clip-text text-transparent">Motion Design.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-zinc-400 max-w-xl">
              We engineer intelligent AI voice agents that talk naturally, high-performance web applications, and stunning interactive motion websites tailored for your business growth.
            </p>

            {/* Metrics Row */}
            <div className="mt-8 grid grid-cols-3 gap-6 border-y border-white/10 py-6 w-full max-w-lg">
              <div>
                <p className="text-2xl font-bold text-white tracking-tight">&lt;500ms</p>
                <p className="text-xs text-zinc-400 mt-0.5">Voice Latency</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white tracking-tight">100%</p>
                <p className="text-xs text-zinc-400 mt-0.5">Custom Code</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white tracking-tight">24/7/365</p>
                <p className="text-xs text-zinc-400 mt-0.5">Always Live</p>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-600/30 hover:from-violet-500 hover:to-indigo-500 transition-all hover:scale-[1.02]"
              >
                <span>Get Started / Request Quote</span>
              </Link>
              <a
                href="#live-agent"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-medium text-zinc-200 hover:bg-white/[0.1] hover:text-white transition"
              >
                <span>Test Live Voice Demo</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live AI Voice Agent Studio Card */}
          <div id="live-agent" className="lg:col-span-6">
            <div className="relative">
              {/* Glow Behind Card */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-600/40 via-fuchsia-600/30 to-indigo-600/40 opacity-70 blur-xl" />
              
              {/* Embedded Live Agent Component */}
              <div className="relative">
                <div className="absolute -top-3.5 left-6 z-20 inline-flex items-center gap-1.5 rounded-full bg-violet-600 px-3 py-0.5 text-[11px] font-semibold text-white shadow-md">
                  <span>Interactive Live Voice Agent</span>
                </div>
                <AiVoiceAgent />
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <section id="services" className="mt-32">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400">Our Services</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              End-to-End Technology & Creative Solutions
            </p>
            <p className="mt-4 text-sm text-zinc-400">
              From ultra-low latency voice agents to bespoke interactive web experiences and motion design.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {SERVICES_EXPANDED.map((service) => (
              <div
                key={service.title}
                className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-zinc-950/80 p-8 backdrop-blur-sm transition-all hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-600/10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    {service.category}
                  </span>
                  <span className="rounded-full bg-violet-500/10 px-3 py-1 text-[11px] font-semibold text-violet-300 border border-violet-500/20">
                    {service.badge}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-white group-hover:text-violet-300 transition">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-2 border-t border-white/10 pt-6">
                  {service.highlights.map((hl) => (
                    <li key={hl} className="flex items-center gap-2 text-xs text-zinc-300">
                      <span className="text-violet-400 font-bold">✓</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition"
                  >
                    Inquire about this service →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Industry Solutions */}
        <section id="use-cases" className="mt-32">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400">Proven Results</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Industry Use Cases
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {USE_CASES.map((uc) => (
              <div
                key={uc.title}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7 transition-all hover:border-violet-500/30"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{uc.title}</h3>
                  <span className="rounded-full bg-violet-500/10 px-3 py-1 text-[11px] font-semibold text-violet-300 border border-violet-500/20">
                    {uc.stats}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{uc.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Embedded Project Consultation Section */}
        <section id="contact-form" className="mt-32">
          <div className="max-w-4xl mx-auto">
            <LeadCaptureForm
              title="Tell Us About Your Project"
              subtitle="Ready to build your Voice AI Agent, Web Application, or Motion Experience? Send us your requirements and we will reply within 2 hours."
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950 py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo size="md" href="/" />
          
          <div className="flex flex-col sm:flex-row items-center gap-6 text-xs text-zinc-400">
            <a href="mailto:hello@nexivratech.in" className="hover:text-white font-medium transition">
              hello@nexivratech.in
            </a>
            <Link href="/contact" className="hover:text-white transition">Contact Page</Link>
            <Link href="/get-started" className="hover:text-white transition">Request Quote</Link>
          </div>

          <p className="text-xs text-zinc-500">
            © 2026 Nexivra Tech Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
