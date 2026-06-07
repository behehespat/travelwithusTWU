"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { confirmPasswordReset } from "@/lib/authApi";

const field =
  "box-border w-full rounded-[10px] border border-black bg-white px-3 py-2.5 text-[18px] text-[#27304f] outline-none placeholder:text-[#d9d9d9] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)]";
const label = "mb-1 block text-[14px] font-bold text-[#27304f]";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid") ?? "";
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const linkInvalid = !uid || !token;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (linkInvalid) return;
    setError(null);
    setLoading(true);
    try {
      await confirmPasswordReset({ uid, token, password, password_confirm: passwordConfirm });
      router.push("/login?reset=1");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось сменить пароль.");
    } finally {
      setLoading(false);
    }
  }

  if (linkInvalid) {
    return (
      <div className="mx-auto max-w-md space-y-4">
        <p className="text-[14px] font-bold text-red-700">Ссылка для сброса пароля недействительна или устарела.</p>
        <Link href="/forgot-password" className="inline-block font-bold text-[#ec9b74] hover:underline">
          Запросить новую ссылку
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-4">
      <div>
        <label className={label} htmlFor="reset-password">
          Новый пароль
        </label>
        <input
          id="reset-password"
          type="password"
          className={field}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <p className="mt-1 text-[12px] text-[#27304f]/70">Не менее 8 символов.</p>
      </div>
      <div>
        <label className={label} htmlFor="reset-password2">
          Повтор пароля
        </label>
        <input
          id="reset-password2"
          type="password"
          className={field}
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
          minLength={8}
        />
      </div>
      {error ? <p className="text-[14px] font-bold text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-[69px] bg-[#ec9b74] py-3 text-center text-[18px] font-bold text-white disabled:opacity-60"
      >
        {loading ? "…" : "Сохранить пароль"}
      </button>
    </form>
  );
}
