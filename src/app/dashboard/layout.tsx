import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { requireActiveMembership } from "@/lib/auth/require-active-membership";

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const membership = await requireActiveMembership();
  return <div className="min-h-screen bg-zinc-950 md:flex"><DashboardSidebar businessName={membership.businesses!.name} /><main className="min-w-0 flex-1">{children}</main></div>;
}
