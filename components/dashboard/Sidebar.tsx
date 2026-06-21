"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  DollarSign,
  Package,
  Droplets,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Calendário", icon: CalendarDays, href: "/dashboard/calendario" },
  { label: "Agendamentos", icon: ClipboardList, href: "/dashboard/agendamentos" },
  { label: "Financeiro", icon: DollarSign, href: "/dashboard/financeiro" },
  { label: "Estoque", icon: Package, href: "/dashboard/estoque" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`flex flex-col bg-neutral-900 text-white transition-all duration-300 ease-in-out flex-shrink-0 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-neutral-800 h-16">
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
          <Droplets className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-sm leading-tight truncate">
            JC Estofados<br />
            <span className="text-primary-400 font-normal text-xs">Painel</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 flex flex-col gap-1 overflow-hidden">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl transition-all duration-200 text-sm font-medium ${
                active
                  ? "bg-primary-600 text-white shadow-md"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-neutral-800 py-3 flex flex-col gap-1">
        <Link
          href="/dashboard/configuracoes"
          className="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all text-sm font-medium"
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Configurações</span>}
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-neutral-400 hover:bg-red-900/40 hover:text-red-400 transition-all text-sm font-medium"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Sair</span>}
        </Link>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-all mx-auto mt-1"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
}
