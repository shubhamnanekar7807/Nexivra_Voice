import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { LeadCaptureForm } from "@/components/forms/lead-capture-form";

export const metadata = {
  title: "Get Started | Nexivra Tech",
  description: "Request a custom project quote or consultation with Nexivra Tech.",
};

export default function GetStartedPage() {
  return (
    <div className="relative min-h-screen bg-[#080918] text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080918]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo size="md" href="/" dark={true} />
          <div className="flex items-center gap-4 text-sm font-semibold">
            <Link href="/" className="text-slate-300 hover:text-white transition">Home</Link>
            <Link href="/contact" className="text-cyan-400 font-bold transition">Direct Contact</Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-6 py-12 sm:py-20">
        <LeadCaptureForm
          title="Start Your Project With Nexivra Tech"
          subtitle="Tell us your goals for Voice AI, Modern Web Development, or Motion Animation. We will review and provide a free scoping consultation."
        />
      </main>
    </div>
  );
}
