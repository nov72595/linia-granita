"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import type { ReactNode } from "react";

export default function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    setIsFirst(false);
  }, []);

  return (
    <div className="min-h-screen pb-[calc(74px+env(safe-area-inset-bottom))] md:pb-0">
      <AnimatePresence mode="wait" initial={!isFirst}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <MobileNav />
    </div>
  );
}

