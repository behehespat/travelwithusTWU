"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { createTourBooking } from "@/lib/authApi";
import { AUTH_TOKEN_CHANGE_EVENT, getStoredToken } from "@/lib/authToken";

type Props = {
  tourSlug: string;
  tourTitle: string;
};

export function TourBookingCta({ tourSlug, tourTitle }: Props) {
  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setToken(getStoredToken());
    function onTokenChange() {
      setToken(getStoredToken());
    }
    window.addEventListener(AUTH_TOKEN_CHANGE_EVENT, onTokenChange);
    return () => window.removeEventListener(AUTH_TOKEN_CHANGE_EVENT, onTokenChange);
  }, []);

  const loginHref = `/login?next=${encodeURIComponent(`/tours/${tourSlug}`)}`;

  async function onBook() {
    const t = getStoredToken();
    if (!t) return;
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const { detail } = await createTourBooking(t, tourSlug);
      setMessage(detail);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось отправить заявку.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="twu-animate-in-up twu-hover-lift mt-4 rounded-[16px] bg-[#27304f] px-6 py-5 text-center text-white">
      <p className="mb-2 text-[17px] font-bold">Хотите этот тур?</p>
      <p className="mb-4 text-[14px] font-medium text-white/85">
        Оставьте заявку - она появится в вашем{" "}
        <Link href="/account" className="font-bold text-[#ec9b74] underline-offset-2 hover:underline">
          личном кабинете
        </Link>
        .
      </p>
      {!mounted ? (
        <span className="inline-block rounded-[69px] bg-[#ec9b74]/60 px-6 py-2.5 text-[16px] font-bold">…</span>
      ) : token ? (
        <div className="space-y-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => void onBook()}
            className="twu-btn-soft inline-block rounded-[69px] bg-[#ec9b74] px-6 py-2.5 text-[16px] font-bold text-white hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Отправка…" : `Подать заявку: «${tourTitle}»`}
          </button>
          {message ? <p className="text-[14px] font-bold text-emerald-200">{message}</p> : null}
          {error ? <p className="text-[14px] font-bold text-amber-200">{error}</p> : null}
        </div>
      ) : (
        <div className="space-y-3">
          <Link
            href={loginHref}
            className="twu-btn-soft inline-block rounded-[69px] bg-[#ec9b74] px-6 py-2.5 text-[16px] font-bold text-white hover:opacity-95"
          >
            Войти, чтобы подать заявку
          </Link>
          <p className="text-[13px] text-white/75">
            Или{" "}
            <Link href="/#lead" className="font-bold text-[#ec9b74] underline-offset-2 hover:underline">
              зарегистрируйтесь на главной
            </Link>{" "}
            без входа в аккаунт.
          </p>
        </div>
      )}
    </div>
  );
}
