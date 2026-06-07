"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { AUTH_TOKEN_CHANGE_EVENT, AUTH_TOKEN_STORAGE_KEY, getStoredToken } from "@/lib/authToken";
import { MAIN_PAGE_IMAGES } from "@/lib/mainPictures";

export function GuestLeadSection() {
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
    <>
      <div
        className="pointer-events-none absolute left-0 top-[3088px] h-[763px] w-[1920px]"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#eef1f8] via-white to-[#faf8f5]" />
        <div className="absolute -left-[8%] top-[12%] h-[420px] w-[420px] rounded-full bg-[#ec9b74]/[0.09] blur-3xl" />
        <div className="absolute -right-[5%] bottom-[8%] h-[380px] w-[380px] rounded-full bg-[#27304f]/[0.06] blur-3xl" />
      </div>

      <div
        id="lead"
        className="absolute left-[198px] top-[3218px] z-[15] h-[504px] w-[1524px] overflow-hidden rounded-[20px] bg-white shadow-[0_18px_44px_-12px_rgba(39,48,79,0.14)]"
        data-node-id="109:161"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src={MAIN_PAGE_IMAGES.leadSection}
            alt=""
            fill
            className="object-cover object-right"
            sizes="1524px"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white from-35% via-white/90 via-50% to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#27304f]/[0.1] via-transparent to-transparent" />
        </div>

        <div className="relative z-[1] flex h-full flex-col justify-center gap-6 px-12 py-10">
          <div className="max-w-[640px] space-y-4">
            <h2 className="text-[44px] font-bold leading-[1.12] tracking-tight text-[#27304f] md:text-[48px]">
              <span className="block">Не знаете какой тур</span>
              <span className="block">подойдет вам?</span>
            </h2>
            <p className="text-[19px] font-normal leading-[1.5] text-[#27304f]/90 md:text-[20px]">
              Зарегистрируйтесь, и мы с радостью поможем вам выбрать подходящий для вас маршрут!
            </p>
          </div>
          <Link
            href="/login"
            className="inline-flex h-[72px] w-fit min-w-[280px] max-w-full items-center justify-center rounded-[69px] bg-[#ec9b74] px-10 text-center text-[22px] font-bold text-white shadow-[0_10px_28px_-8px_rgba(236,155,116,0.65)] transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27304f] md:h-[76px] md:text-[24px]"
          >
            Войти
          </Link>
        </div>
      </div>
    </>
  );
}
