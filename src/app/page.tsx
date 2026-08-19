import Link from "next/link";
import { AiVoiceAgent } from "@/components/voice/ai-voice-agent";
import { Logo } from "@/components/brand/logo";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";

const SERVICES_EXPANDED = [
  {
    category: "Voice AI & Telephony",
    title: "AI Voice Agents & Phone Systems",
    description: "Multi-lingual, human-like voice agents that answer customer calls, book appointments, and follow up 24/7 with zero wait times.",
    highlights: ["Sub-500ms real-time conversation", "Fluent in Marathi, Hindi & English", "Direct calendar & CRM synchronization", "Zero hold times & instant triage"],
    badge: "Most Popular",
    gradient: "from-blue-500 via-indigo-500 to-violet-600",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    icon: "🎙️",
  },
  {
    category: "Full-Stack Web Engineering",
    title: "Modern Websites & Web Applications",
    description: "Ultra-fast, high-converting digital platforms built with Next.js, React, TypeScript, and robust cloud databases for maximum performance.",
    highlights: ["High-speed 100/100 Lighthouse performance", "Custom SaaS dashboards & portals", "Seamless payment & API integrations", "Mobile-first responsive design"],
    badge: "High Growth",
    gradient: "from-cyan-500 via-teal-500 to-emerald-500",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    icon: "🚀",
  },
  {
    category: "Creative Visuals & UI",
    title: "Motion Graphics & Interactive Animation",
    description: "Eye-catching interactive animations, smooth scroll-driven storytelling, and 3D visual experiences that engage users and boost conversions.",
    highlights: ["Fluid scroll-driven storytelling", "Custom 3D & vector brand assets", "Dynamic micro-interactions", "High-converting visual layouts"],
    badge: "Creative Excellence",
    gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
    badgeBg: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/30",
    icon: "✨",
  },
  {
    category: "Enterprise Automation",
    title: "Custom AI Workflows & Cloud Pipelines",
    description: "Automate repetitive business processes with custom LLMs, intelligent document parsing, automated lead routing, and webhook orchestrations.",
    highlights: ["Automated customer onboarding", "Real-time webhook & CRM sync", "Custom knowledge-base grounding", "Enterprise bank-grade security"],
    badge: "Smart Automation",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    icon: "⚡",
  },
];

const USE_CASES = [
  {
    title: "Healthcare & Dental Clinics",
    description: "Automate patient appointments, triage inquiries, and follow-ups 24/7 in Marathi, Hindi & English.",
    stats: "85% reduction in call wait times",
    accent: "border-emerald-500/30 bg-emerald-950/20",
    pill: "bg-emerald-500/20 text-emerald-300",
    icon: "🏥",
  },
  {
    title: "Real Estate & Housing Agencies",
    description: "Instantly capture buyer inquiries, answer property questions, and schedule private viewing tours.",
    stats: "3.5x faster lead response",
    accent: "border-blue-500/30 bg-blue-950/20",
    pill: "bg-blue-500/20 text-blue-300",
    icon: "🏡",
  },
  {
    title: "SaaS & High-Growth Startups",
    description: "Combine interactive motion websites with real-time AI voice agents for instant user support.",
    stats: "75% first-call resolution",
    accent: "border-fuchsia-500/30 bg-fuchsia-950/20",
    pill: "bg-fuchsia-500/20 text-fuchsia-300",
    icon: "💻",
  },
  {
    title: "Legal & Consulting Practices",
    description: "Screen prospective clients, collect intake requirements, and book partner consultations.",
    stats: "100% after-hours coverage",
    accent: "border-amber-500/30 bg-amber-950/20",
    pill: "bg-amber-500/20 text-amber-300",
    icon: "⚖️",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#060913] text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Eye-catching Radiant Multi-color Ambient Aurora Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 size-[600px] rounded-full bg-gradient-to-tr from-blue-600/25 via-indigo-500/20 to-cyan-400/20 blur-[130px]" />
        <div className="absolute top-[300px] -right-20 size-[550px] rounded-full bg-gradient-to-br from-fuchsia-600/25 via-pink-500/20 to-purple-600/20 blur-[140px]" />
        <div className="absolute top-[1000px] -left-32 size-[500px] rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-cyan-500/15 blur-[140px]" />
        <div className="absolute top-[1600px] right-10 size-[600px] rounded-full bg-gradient-to-tr from-amber-500/15 via-rose-500/15 to-violet-600/20 blur-[150px]" />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060913]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo size="md" href="/" />

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
            <a href="#live-agent" className="hover:text-blue-400 transition-colors">Live Voice Agent</a>
            <a href="#use-cases" className="hover:text-pink-400 transition-colors">Use Cases</a>
            <Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/[0.08] transition"
            >
              Contact Us
            </Link>
            <Link
              href="/get-started"
              className="rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Get a Quote ✨
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-24 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-fuchsia-500/15 px-4 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur-md shadow-sm">
              <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Nexivra Tech • AI Voice, Web & Motion Studio</span>
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Supercharge Your Business With{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
                Voice AI
              </span>
              ,{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Web Apps
              </span>{" "}
              &{" "}
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                Motion Design.
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300 max-w-xl">
              We build human-like multilingual AI voice agents (English, मराठी, हिन्दी), high-performance modern web platforms, and stunning motion experiences designed to scale your business.
            </p>

            {/* Metrics Row with colorful badges */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-y border-white/10 py-6 w-full max-w-lg">
              <div className="rounded-xl bg-white/[0.03] p-3 border border-blue-500/20">
                <p className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">&lt;500ms</p>
                <p className="text-xs font-medium text-slate-400 mt-0.5">Voice Latency</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-3 border border-fuchsia-500/20">
                <p className="text-2xl font-black bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">3 Languages</p>
                <p className="text-xs font-medium text-slate-400 mt-0.5">En • हिं • मरा</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-3 border border-emerald-500/20">
                <p className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">24/7/365</p>
                <p className="text-xs font-medium text-slate-400 mt-0.5">Zero Downtime</p>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <span>🚀 Request a Project Quote</span>
              </Link>
              <a
                href="#live-agent"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-white/[0.12] hover:text-white transition-all"
              >
                <span>🎙️ Test Live Voice Agent</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live AI Voice Agent Studio Card */}
          <div id="live-agent" className="lg:col-span-6">
            <div className="relative">
              {/* Vibrant Multi-Color Glow Behind Card */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500/40 via-blue-600/40 to-fuchsia-600/40 opacity-80 blur-2xl animate-pulse" />
              
              {/* Embedded Live Agent Component */}
              <div className="relative">
                <div className="absolute -top-3.5 left-6 z-20 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-600 px-3.5 py-0.5 text-[11px] font-bold text-white shadow-lg shadow-blue-500/40">
                  <span>✨</span>
                  <span>Live Interactive Multilingual Voice Studio</span>
                </div>
                <AiVoiceAgent />
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <section id="services" className="mt-32">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-gradient-to-r from-blue-500/20 to-fuchsia-500/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-cyan-300 border border-cyan-400/30">
              What We Do Best
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              End-to-End Technology & Creative Solutions
            </h2>
            <p className="mt-4 text-base text-slate-300">
              Everything your brand needs: intelligent voice receptionists, high-speed custom web applications, and mesmerizing motion animation.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {SERVICES_EXPANDED.map((service) => (
              <div
                key={service.title}
                className="group relative rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.05] to-[#0a0f24]/90 p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{service.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      {service.category}
                    </span>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold border ${service.badgeBg}`}>
                    {service.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
                  {service.highlights.map((hl) => (
                    <li key={hl} className="flex items-center gap-2.5 text-xs font-medium text-slate-200">
                      <span className="grid size-4 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                        ✓
                      </span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Inquire about {service.title} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Industry Solutions with Vibrant Accents */}
        <section id="use-cases" className="mt-32">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block rounded-full bg-emerald-500/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-emerald-300 border border-emerald-400/30">
              Real World Impact
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Proven Industry Results
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {USE_CASES.map((uc) => (
              <div
                key={uc.title}
                className={`group relative rounded-3xl border p-8 transition-all duration-300 hover:scale-[1.02] backdrop-blur-xl ${uc.accent}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{uc.icon}</span>
                    <h3 className="text-lg font-bold text-white">{uc.title}</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold border border-white/10 ${uc.pill}`}>
                    {uc.stats}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">{uc.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Embedded Project Consultation Section */}
        <section id="contact-form" className="mt-32">
          <div className="max-w-4xl mx-auto">
            <LeadCaptureForm
              title="Let's Build Your Vision Together"
              subtitle="Ready for a Custom AI Voice Agent, Modern Web Application, or Motion Design? Tell us your goals and we'll reply within 2 hours."
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#04060e] py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo size="md" href="/" />
          
          <div className="flex flex-col sm:flex-row items-center gap-6 text-xs font-medium text-slate-400">
            <a href="mailto:hello@nexivratech.in" className="text-cyan-400 hover:text-cyan-300 font-bold transition">
              hello@nexivratech.in
            </a>
            <Link href="/contact" className="hover:text-white transition">Contact Page</Link>
            <Link href="/get-started" className="hover:text-white transition">Get a Quote</Link>
          </div>

          <p className="text-xs text-slate-500">
            © 2026 Nexivra Tech Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
