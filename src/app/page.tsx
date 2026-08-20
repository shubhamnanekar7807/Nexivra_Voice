import Link from "next/link";
import { RobotScrollytelling } from "@/components/scrollytelling/robot-scrollytelling";
import { AiVoiceAgent } from "@/components/voice/ai-voice-agent";
import { Logo } from "@/components/brand/logo";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";

const AGENT_WORKFLOWS = [
  {
    category: "Conversational Telephony",
    title: "AI Voice Agents",
    description: "Intelligent voice agents that answer incoming phone calls, qualify leads, schedule appointments, and provide customer support with sub-500ms latency in Marathi, Hindi & English.",
    features: ["Sub-500ms voice response time", "Fluent in Marathi, Hindi & English", "Real phone numbers & PBX routing", "Automated appointment booking"],
  },
  {
    category: "Workflow Execution",
    title: "AI Automation Agents",
    description: "Autonomous task agents that monitor email inboxes, process complex documents, trigger multi-step webhooks, and eliminate repetitive operational bottlenecks.",
    features: ["End-to-end task automation", "Database & API synchronizations", "Document parsing & data extraction", "Custom webhook orchestrations"],
  },
  {
    category: "Enterprise Intelligence",
    title: "AI Knowledge Agents",
    description: "Context-aware AI agents connected directly to your proprietary company knowledge, SOPs, guidelines, and databases for instant, accurate problem resolution.",
    features: ["Semantic retrieval over company docs", "Zero hallucination verification", "Role-based knowledge access", "Real-time updates & sync"],
  },
  {
    category: "Tailored Architecture",
    title: "Custom AI Agents",
    description: "Bespoke full-stack AI systems engineered around your exact industry specifications, internal business logic, and security compliance standards.",
    features: ["Custom model fine-tuning", "On-premise or cloud deployment", "Multi-tenant tenant isolation", "Dedicated SLA & 24/7 monitoring"],
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    num: "01",
    step: "UNDERSTAND",
    title: "Contextual Perception",
    desc: "The AI agent ingests voice, text, intent, and historical memory to understand the exact needs of the user.",
  },
  {
    num: "02",
    step: "THINK",
    title: "Neural Reasoning",
    desc: "Our high-speed cognitive engine analyzes constraints, checks policy guidelines, and determines the optimal path of action.",
  },
  {
    num: "03",
    step: "CONNECT",
    title: "Tool & System Orchestration",
    desc: "The agent interfaces with your databases, CRM, telephony lines, APIs, and calendars in real time.",
  },
  {
    num: "04",
    step: "ACT",
    title: "Flawless Execution",
    desc: "The agent resolves the request, delivers natural speech feedback, logs analytics, and updates all systems instantaneously.",
  },
];

const FAQS = [
  {
    q: "What makes Nexivra AI Agents different from standard chatbots?",
    a: "Nexivra AI Agents don't just generate text — they possess active memory, reason through complex requests, handle actual telephone phone calls with sub-500ms voice synthesis in Marathi, Hindi & English, and execute real actions across your business software.",
  },
  {
    q: "How fast is the conversational voice response latency?",
    a: "Our voice architecture achieves sub-500 millisecond conversational latency with dynamic interruption handling, creating completely natural back-and-forth dialogue.",
  },
  {
    q: "Which languages are natively supported?",
    a: "English, Marathi (मराठी), and Hindi (हिन्दी) are supported natively with authentic regional pronunciation, accent nuances, and contextual vocabulary.",
  },
  {
    q: "Can the AI Voice Agent connect to our existing phone numbers and CRM?",
    a: "Yes. We support direct integration with standard telephony (Twilio, SIP, mobile lines), Google Calendar, Salesforce, HubSpot, Zendesk, Supabase, and custom webhooks.",
  },
  {
    q: "How do we get started with a custom project?",
    a: "Submit your inquiry below or write directly to hello@nexivratech.in. Our engineering team reviews all requests and responds with a scoped implementation plan within 2 hours.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-slate-100 selection:bg-[#00D6FF] selection:text-[#050505]">
      {/* Fixed Apple-Inspired Minimal Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/[0.08] bg-[#050505]/75 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo size="md" href="/" dark={true} />

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Link href="/" className="text-white transition">Home</Link>
            <a href="#agents" className="hover:text-white transition">AI Agents</a>
            <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
            <a href="#voice-studio" className="hover:text-white transition">Voice Studio</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </nav>

          <Link
            href="/get-started"
            className="rounded-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] px-5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:opacity-90 hover:scale-105 transition"
          >
            Let&apos;s Build
          </Link>
        </div>
      </header>

      {/* 400vh Apple-Level Cinematic Scrollytelling Hero */}
      <RobotScrollytelling />

      {/* Continuation into Editorial Sections */}
      <div className="relative z-20 bg-[#050505] px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">

          {/* SECTION: AI AGENTS */}
          <section id="agents" className="border-t border-white/10 pt-24">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00D6FF]">
                Core Architecture
              </span>
              <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                An Agent for Every Workflow.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
                Whether automating high-volume telephone calls or orchestrating multi-system pipelines, Nexivra deploys specialized AI agents configured for your domain.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {AGENT_WORKFLOWS.map((agent) => (
                <div
                  key={agent.title}
                  className="rounded-3xl border border-white/[0.08] bg-[#0A0A0C] p-8 sm:p-10 transition-all hover:border-[#00D6FF]/30 hover:shadow-2xl hover:shadow-cyan-500/5"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#00D6FF]">
                    {agent.category}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-white">{agent.title}</h3>
                  <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {agent.description}
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-white/10 pt-6">
                    {agent.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-xs text-zinc-300">
                        <span className="text-[#00D6FF] font-bold">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: HOW IT WORKS */}
          <section id="how-it-works" className="mt-36 border-t border-white/10 pt-24">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00D6FF]">
                Execution Flow
              </span>
              <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                How It Works.
              </h2>
              <p className="mt-4 text-sm text-zinc-400">
                Four synchronizing phases that turn raw conversational requests into completed business operations.
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {HOW_IT_WORKS_STEPS.map((s) => (
                <div
                  key={s.num}
                  className="rounded-3xl border border-white/[0.08] bg-[#0A0A0C] p-6 sm:p-8 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-3xl font-black text-[#00D6FF]/40">{s.num}</span>
                    <h3 className="mt-4 text-xs font-bold uppercase tracking-widest text-[#00D6FF]">{s.step}</h3>
                    <h4 className="mt-1 text-lg font-bold text-white">{s.title}</h4>
                    <p className="mt-3 text-xs text-zinc-400 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: AI VOICE AGENTS STUDIO */}
          <section id="voice-studio" className="mt-36 border-t border-white/10 pt-24">
            <div className="grid gap-12 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00D6FF]">
                  Live Voice Simulation
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                  Conversations That Take Action.
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                  Test Nexivra&apos;s real-time voice intelligence right here. Speak in English, Hindi (हिन्दी), or Marathi (मराठी) and experience sub-500ms dialogue with dynamic interruption handling.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    "Sub-500ms conversational turn-taking",
                    "Native fluency in Marathi, Hindi & English",
                    "Push-to-speak voice recognition & custom personas",
                    "Instant connection to CRM, Calendars & Telephony",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
                      <span className="text-[#00D6FF] font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] px-7 py-3.5 text-xs font-bold text-white shadow-xl shadow-blue-500/25 hover:scale-105 transition"
                  >
                    Deploy Voice Agent For Your Business →
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <AiVoiceAgent />
              </div>
            </div>
          </section>

          {/* SECTION: WHY NEXIVRA */}
          <section className="mt-36 border-t border-white/10 pt-24">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00D6FF]">
                Engineering Philosophy
              </span>
              <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                Built for Real Business.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 text-center">
              {[
                { title: "INTELLIGENT", desc: "Adaptive neural reasoning rather than brittle decision trees." },
                { title: "RELIABLE", desc: "99.9% uptime SLA with continuous fallbacks & verification." },
                { title: "CONNECTED", desc: "Direct integrations with phone lines, CRMs, APIs and DBs." },
                { title: "SCALABLE", desc: "Handle 1 or 10,000 concurrent calls with zero hold times." },
                { title: "CUSTOM", desc: "Tuned specifically for your business domain, vocabulary and rules." },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/[0.08] bg-[#0A0A0C] p-6 sm:p-8">
                  <h3 className="text-sm font-black tracking-widest text-[#00D6FF]">{item.title}</h3>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: FAQ */}
          <section id="faq" className="mt-36 border-t border-white/10 pt-24 max-w-4xl mx-auto">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00D6FF]">FAQ</span>
              <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                Answers to Common Questions.
              </h2>
            </div>

            <div className="mt-12 space-y-4">
              {FAQS.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-white/[0.08] bg-[#0A0A0C] p-6 sm:p-8 transition hover:border-[#00D6FF]/30"
                >
                  <h3 className="text-base font-bold text-white">{faq.q}</h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: FINAL DRAMATIC CTA */}
          <section className="mt-36 border-t border-white/10 pt-24 max-w-4xl mx-auto">
            <LeadCaptureForm
              title="Ready to Build Your AI Workforce?"
              subtitle="Let's create intelligent AI voice and automation agents designed around the way your business actually works. We reply within 2 hours."
            />
          </section>
        </div>
      </div>

      {/* Minimal Luxury Footer */}
      <footer className="border-t border-white/10 bg-[#050505] py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Logo size="md" href="/" dark={true} />
          
          <div className="flex flex-col sm:flex-row items-center gap-6 text-xs font-medium text-zinc-400">
            <a href="mailto:hello@nexivratech.in" className="text-[#00D6FF] hover:underline font-semibold transition">
              hello@nexivratech.in
            </a>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
            <Link href="/get-started" className="hover:text-white transition">Get Started</Link>
          </div>

          <p className="text-xs text-zinc-500">
            © 2026 Nexivra Tech Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
