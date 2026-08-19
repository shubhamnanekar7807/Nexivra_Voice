import { Logo } from "@/components/brand/logo";

export default function OnboardingPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <section className="max-w-md text-center flex flex-col items-center">
        <Logo size="md" href="/" />
        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-white">Your workspace is being prepared.</h1>
        <p className="mt-3 text-zinc-400">Ask a workspace owner to add you to a business before accessing the dashboard.</p>
      </section>
    </main>
  );
}
