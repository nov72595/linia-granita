"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Calculator, Grid2X2, Home, Phone } from "lucide-react";
import type { ComponentType } from "react";

type NavItem = {
  id: "home" | "catalog" | "calculator" | "contacts";
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
  accent?: boolean;
};

const navItems: NavItem[] = [
  { id: "home", label: "Главная", href: "/", Icon: Home },
  { id: "catalog", label: "Каталог", href: "/catalog", Icon: Grid2X2 },
  { id: "calculator", label: "Калькулятор", href: "/calculator", Icon: Calculator, accent: true },
  { id: "contacts", label: "Контакты", href: "/contacts", Icon: Phone },
];

function isItemActive(item: NavItem, pathname: string) {
  if (item.id === "home") return pathname === "/";
  if (item.id === "catalog") return pathname === "/catalog" || pathname.startsWith("/catalog/");
  return pathname === item.href;
}

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-nav md:hidden fixed bottom-0 left-0 right-0 z-[60] border-t border-white/10 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[74px] max-w-7xl items-center justify-around px-4 pb-[env(safe-area-inset-bottom)] pt-2">
        {navItems.map((item) => {
          const active = isItemActive(item, pathname);
          return (
            <Link key={item.id} href={item.href} className="flex-1">
              <motion.div
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className={[
                  "flex flex-col items-center justify-center gap-1.5 rounded-2xl px-2 py-2",
                  "select-none",
                  active ? "text-white/95" : "text-white/65",
                  item.accent && active ? "mobile-nav__accent mobile-nav__accent--active" : item.accent ? "mobile-nav__accent" : "",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                <item.Icon className="h-5 w-5" />
                <span className="text-[10px] uppercase tracking-[0.14em]">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

