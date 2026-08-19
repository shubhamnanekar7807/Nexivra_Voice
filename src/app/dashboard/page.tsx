import { requireActiveMembership } from "@/lib/auth/require-active-membership";
import { AiVoiceAgent } from "@/components/voice/ai-voice-agent";

export default async function DashboardPage() {
  const membership = await requireActiveMembership();

  return (
    <section className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300 border border-violet-500/20 uppercase tracking-wider">
            {membership.role} Access
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
            {membership.businesses?.name}
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Tenant ID: <span className="font-mono text-zinc-300">{membership.business_id}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-right">
            <p className="text-xs text-zinc-400">Voice Agent Status</p>
            <p className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5 justify-end">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Online & Ready
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Voice Agent Tester & Quick Stats */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Live AI Voice Agent Playground */}
        <div className="lg:col-span-7">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-200">
              Live Voice Agent Playground
            </h2>
            <span className="text-xs text-zinc-400">Interactive Simulation</span>
          </div>
          <AiVoiceAgent />
        </div>

        {/* Right Column: Key Metrics & Setup Status */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-sm font-semibold text-white">Voice Agent Analytics</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/[0.03] p-3.5 border border-white/5">
                <p className="text-xs text-zinc-400">Average Latency</p>
                <p className="text-xl font-bold text-white mt-1">420ms</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-3.5 border border-white/5">
                <p className="text-xs text-zinc-400">Resolution Rate</p>
                <p className="text-xl font-bold text-emerald-400 mt-1">98.2%</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-3.5 border border-white/5">
                <p className="text-xs text-zinc-400">Total Conversations</p>
                <p className="text-xl font-bold text-white mt-1">128</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-3.5 border border-white/5">
                <p className="text-xs text-zinc-400">Knowledge Items</p>
                <p className="text-xl font-bold text-violet-400 mt-1">24</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h2 className="text-sm font-semibold text-white">Quick Action Checklist</h2>
            <div className="mt-4 space-y-3">
              {[
                { title: "Business Profile Configured", done: true },
                { title: "Voice Agent Prompt Grounded", done: true },
                { title: "Connected to Knowledge Base", done: true },
                { title: "Phone Number & Inbound Triage", done: false },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3.5 py-2.5 border border-white/5 text-xs"
                >
                  <span className="text-zinc-300">{item.title}</span>
                  <span
                    className={`font-semibold ${
                      item.done ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    {item.done ? "Ready" : "Pending Setup"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
