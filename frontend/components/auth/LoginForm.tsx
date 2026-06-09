"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { setStoredToken } from "@/lib/authToken";
import { publicApiBase } from "@/lib/apiBase";

const field =
  "box-border w-full rounded-[10px] border border-black bg-white px-3 py-2.5 text-[18px] text-[#27304f] outline-none placeholder:text-[#d9d9d9] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)]";
const label = "mb-1 block text-[14px] font-bold text-[#27304f]";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${publicApiBase()}/api/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as Record<string, unknown>;
      if (!res.ok) {
        const msgs: string[] = [];
        for (const v of Object.values(data)) {
          if (typeof v === "string") msgs.push(v);
          else if (Array.isArray(v)) for (const x of v) if (typeof x === "string") msgs.push(x);
        }
        setError(msgs[0] ?? "Не удалось войти");
        return;
      }
      if (typeof data.token === "string") setStoredToken(data.token);
      const nextRaw = searchParams.get("next");
      const next =
        nextRaw && nextRaw.startsWith("/") && !nextRaw.startsWith("//") ? nextRaw : "/";
      router.push(next);
      router.refresh();
    } catch {
      setError("Нет соединения с сервером.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="twu-animate-in-up mx-auto max-w-md space-y-4">
      {searchParams.get("registered") === "1" ? (
        <p className="rounded-[12px] border border-[#ec9b74]/40 bg-[#f7f7f6] px-4 py-3 text-[14px] font-bold text-[#27304f]">
          Аккаунт создан. Войдите с тем же логином и паролем.
        </p>
      ) : null}
      {searchParams.get("reset") === "1" ? (
        <p className="rounded-[12px] border border-[#ec9b74]/40 bg-[#f7f7f6] px-4 py-3 text-[14px] font-bold text-[#27304f]">
          Пароль изменён. Войдите с новым паролем.
        </p>
      ) : null}
      <div>
        <label className={label} htmlFor="login-username">
          Логин
        </label>
        <input
          id="login-username"
          className={field}
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label className={label} htmlFor="login-password">
          Пароль
        </label>
        <input
          id="login-password"
          type="password"
          className={field}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <Link href="/forgot-password" className="text-[14px] font-bold text-[#ec9b74] hover:underline">
          Забыли пароль?
        </Link>
      </div>
      {error ? <p className="text-[14px] font-bold text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="twu-btn-soft w-full rounded-[69px] bg-[#ec9b74] py-3 text-center text-[18px] font-bold text-white disabled:opacity-60"
      >
        {loading ? "…" : "Войти"}
      </button>
    </form>
  );
}
