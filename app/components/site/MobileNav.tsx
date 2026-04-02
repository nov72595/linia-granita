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
};

const navItems: NavItem[] = [
  { id: "home", label: "Главная", href: "/", Icon: Home },
  { id: "catalog", label: "Каталог", href: "/catalog", Icon: Grid2X2 },
  { id: "calculator", label: "Калькулятор", href: "/calculator", Icon: Calculator },
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
    <nav className="mobile-nav md:hidden fixed bottom-0 left-0 right-0 z-[70] px-3 pb-[env(safe-area-inset-bottom)] pt-2">
      <div className="mobile-nav__dock mx-auto flex min-h-[72px] max-w-[560px] items-center justify-around rounded-[22px] border border-white/10 px-2 py-1.5">
        {navItems.map((item) => {
          const active = isItemActive(item, pathname);
          return (
            <Link key={item.id} href={item.href} className="flex-1 px-1">
              <motion.div
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className={[
                  "flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-2.5",
                  "select-none",
                  "transition-all duration-200",
                  active ? "mobile-nav__item mobile-nav__item--active text-white" : "mobile-nav__item text-white/70",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                <item.Icon className="h-[18px] w-[18px]" />
                <span className="text-[9px] font-medium tracking-[0.04em] uppercase">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

