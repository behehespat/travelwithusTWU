"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { HeaderAuthNav } from "@/components/layout/HeaderAuthNav";

const NAV = [
  { href: "/#about", label: "О нас" },
  { href: "/#tours", label: "Маршруты" },
  { href: "/#advantages", label: "Преимущества" },
  { href: "/reminder", label: "Памятка" },
  { href: "/phrasebook", label: "Словарик" },
] as const;

const navRow =
  "block rounded-xl px-4 py-2.5 text-left text-[16px] font-bold text-[#27304f] transition hover:bg-[#f7f7f6] active:bg-[#ececea]";

export function HeaderBurger() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <div className="relative shrink-0">
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-[118] cursor-default bg-black/40"
          aria-label="Закрыть меню"
          onClick={close}
        />
      ) : null}

      <button
        type="button"
        aria-expanded={open}
        aria-controls="header-burger-panel"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        onClick={() => setOpen((v) => !v)}
        className="relative z-[121] flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-[10px] border border-white/30 bg-white/10 transition hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span
          className={`block h-[2.5px] w-[22px] rounded-full bg-white transition-transform ${open ? "translate-y-[7.5px] rotate-45" : ""}`}
        />
        <span className={`block h-[2.5px] w-[22px] rounded-full bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
        <span
          className={`block h-[2.5px] w-[22px] rounded-full bg-white transition-transform ${open ? "-translate-y-[7.5px] -rotate-45" : ""}`}
        />
      </button>

      {open ? (
        <div
          id="header-burger-panel"
          role="dialog"
          aria-modal="true"
          className="absolute right-0 top-[calc(100%+8px)] z-[119] w-[min(288px,calc(100vw-1.5rem))] overflow-hidden rounded-[14px] border border-black/10 bg-white py-2 shadow-[0_12px_40px_rgba(39,48,79,0.18)]"
        >
          <nav className="flex max-h-[min(70vh,520px)] flex-col overflow-y-auto px-1.5 pb-1" aria-label="Разделы сайта">
            {NAV.map(({ href, label }) => (
              <Link key={href} href={href} className={navRow} onClick={close}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-black/[0.08] px-1.5 pb-2 pt-1">
            <HeaderAuthNav variant="menu" onMenuNavigate={close} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
