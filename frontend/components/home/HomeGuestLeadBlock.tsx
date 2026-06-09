"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { AUTH_TOKEN_CHANGE_EVENT, AUTH_TOKEN_STORAGE_KEY, getStoredToken } from "@/lib/authToken";
import { MAIN_PAGE_IMAGES } from "@/lib/mainPictures";

export function HomeGuestLeadBlock() {
  const [visible, setVisible] = useState(true);

  const sync = useCallback(() => {
    setVisible(!getStoredToken());
  }, []);

  useEffect(() => {
    sync();
    const onToken = () => sync();
    const onStorage = (e: StorageEvent) => {
      if (e.key === AUTH_TOKEN_STORAGE_KEY) sync();
    };
    window.addEventListener(AUTH_TOKEN_CHANGE_EVENT, onToken);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(AUTH_TOKEN_CHANGE_EVENT, onToken);
      window.removeEventListener("storage", onStorage);
    };
  }, [sync]);

  if (!visible) return null;

  return (
    <section
      id="lead"
      className="relative overflow-hidden rounded-[20px] bg-white shadow-[0_18px_44px_-12px_rgba(39,48,79,0.14)]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={MAIN_PAGE_IMAGES.leadSection}
          alt=""
          fill
          className="object-cover object-right"
          sizes="(max-width: 768px) 100vw, 720px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white from-35% via-white/92 via-55% to-white/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#27304f]/[0.12] via-transparent to-transparent" />
      </div>

      <div className="relative z-[1] flex flex-col justify-center gap-5 px-5 py-8 sm:px-8 sm:py-10">
        <div className="max-w-lg space-y-3">
          <h2 className="text-[26px] font-bold leading-[1.15] tracking-tight text-[#27304f] sm:text-[34px]">
            Не знаете какой тур подойдёт вам?
          </h2>
          <p className="text-[16px] leading-relaxed text-[#27304f]/90 sm:text-[18px]">
            Зарегистрируйтесь, и мы с радостью поможем вам выбрать подходящий для вас маршрут!
          </p>
        </div>
        <Link
          href="/login"
          className="inline-flex h-14 w-full max-w-xs items-center justify-center rounded-[69px] bg-[#ec9b74] px-8 text-center text-[18px] font-bold text-white shadow-[0_10px_28px_-8px_rgba(236,155,116,0.65)] transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27304f] sm:h-[72px] sm:text-[20px]"
        >
          Войти
        </Link>
      </div>
    </section>
  );
}
