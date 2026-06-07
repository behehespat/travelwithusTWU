"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { fetchMe } from "@/lib/authApi";
import {
  AUTH_TOKEN_CHANGE_EVENT,
  AUTH_TOKEN_STORAGE_KEY,
  clearStoredToken,
  getStoredToken,
} from "@/lib/authToken";

const navItem =
  "shrink-0 text-[18px] font-bold text-white/95 hover:opacity-90 sm:text-[20px]";

const loginBtn =
  "inline-flex shrink-0 items-center justify-center rounded-[39px] bg-white px-4 py-2 text-[18px] font-bold text-[#27304f] hover:opacity-95 sm:px-5 sm:text-[20px]";

const adminBtn =
  "inline-flex shrink-0 items-center justify-center rounded-[39px] border border-white/40 bg-white/10 px-3 py-1.5 text-[15px] font-bold text-white hover:bg-white/20 sm:px-4 sm:text-[16px]";

const menuItem =
  "block w-full rounded-xl px-4 py-2.5 text-left text-[16px] font-bold text-[#27304f] transition hover:bg-[#f7f7f6] active:bg-[#ececea]";

const menuLogin =
  "block w-full rounded-xl bg-[#27304f] px-4 py-2.5 text-center text-[16px] font-bold text-white transition hover:opacity-95 active:opacity-90";

type HeaderAuthNavProps = {
  /** В бургер-панели: тёмный текст, вертикальный блок. */
  variant?: "inline" | "menu";
  onMenuNavigate?: () => void;
};

export function HeaderAuthNav({ variant = "inline", onMenuNavigate }: HeaderAuthNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [greeting, setGreeting] = useState<string | null>(null);
  const [isStaff, setIsStaff] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      setGreeting(null);
      setIsStaff(false);
      return;
    }
    setLoading(true);
    try {
      const me = await fetchMe(token);
      setGreeting(me.username);
      setIsStaff(Boolean(me.is_staff));
    } catch {
      clearStoredToken();
      setGreeting(null);
      setIsStaff(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load, pathname]);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === AUTH_TOKEN_STORAGE_KEY) void load();
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [load]);

  useEffect(() => {
    function onLocalTokenChange() {
      void load();
    }
    window.addEventListener(AUTH_TOKEN_CHANGE_EVENT, onLocalTokenChange);
    return () => window.removeEventListener(AUTH_TOKEN_CHANGE_EVENT, onLocalTokenChange);
  }, [load]);

  function logout() {
    clearStoredToken();
    setGreeting(null);
    setIsStaff(false);
    onMenuNavigate?.();
    router.refresh();
    if (pathname?.startsWith("/account") || pathname?.startsWith("/admin-panel")) router.push("/");
  }

  if (variant === "menu") {
    if (loading && greeting === null && getStoredToken()) {
      return <p className="px-4 py-2 text-[15px] font-bold text-[#27304f]/60">Загрузка…</p>;
    }
    if (greeting) {
      return (
        <div className="flex flex-col gap-1 pt-1">
          <p className="px-4 text-[11px] font-bold uppercase tracking-wide text-[#27304f]/50">Аккаунт</p>
          <p className="px-4 pb-1 text-[14px] font-bold leading-snug text-[#27304f]">Привет, {greeting}!</p>
          {isStaff ? (
            <Link href="/admin-panel" className={menuItem} onClick={onMenuNavigate}>
              Админ панель
            </Link>
          ) : null}
          <Link href="/account" className={menuItem} onClick={onMenuNavigate}>
            Личный кабинет
          </Link>
          <button type="button" className={`${menuItem} cursor-pointer border-0 bg-transparent text-left`} onClick={logout}>
            Выйти
          </button>
        </div>
      );
    }
    return (
      <div className="pt-1">
        <Link href="/login" className={menuLogin} onClick={onMenuNavigate}>
          Войти
        </Link>
      </div>
    );
  }

  if (loading && greeting === null && getStoredToken()) {
    return <span className={`${navItem} opacity-70`}>…</span>;
  }

  if (greeting) {
    return (
      <div className="flex max-w-[min(420px,52vw)] flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:gap-2">
        <span className={`truncate text-right ${navItem}`}>Привет, {greeting}!</span>
        {isStaff ? (
          <Link href="/admin-panel" className={adminBtn}>
            Админ панель
          </Link>
        ) : null}
        <Link href="/account" className={navItem}>
          Кабинет
        </Link>
        <button type="button" onClick={logout} className={`${navItem} cursor-pointer border-0 bg-transparent p-0`}>
          Выйти
        </button>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center">
      <Link href="/login" className={loginBtn}>
        Войти
      </Link>
    </div>
  );
}
