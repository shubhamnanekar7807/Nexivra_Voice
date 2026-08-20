import Link from "next/link";
import { dashboardNavigation } from "@/config/navigation";
import { Logo } from "@/components/brand/logo";

interface DashboardSidebarProps { businessName: string; }

export function DashboardSidebar({ businessName }: DashboardSidebarProps) {
  return <aside className="flex w-full shrink-0 flex-col border-b border-white/10 bg-zinc-950 p-5 md:min-h-screen md:w-64 md:border-r md:border-b-0">
    <Logo size="sm" href="/dashboard" dark={true} />
    <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"><p className="truncate text-sm font-medium">{businessName}</p><p className="mt-0.5 text-xs text-zinc-500">Workspace</p></div>
    <nav aria-label="Dashboard" className="mt-6 flex gap-1 overflow-x-auto md:flex-col">{dashboardNavigation.map((item) => <Link className="whitespace-nowrap rounded-md px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400" href={item.href} key={item.href}>{item.label}</Link>)}</nav>
    <p className="mt-auto hidden pt-8 text-xs text-zinc-600 md:block">Tenant-isolated workspace</p>
  </aside>;
}
