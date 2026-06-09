"use client";

import Link from "next/link";
import { useState } from "react";

import { requestPasswordReset } from "@/lib/authApi";

const field =
  "box-border w-full rounded-[10px] border border-black bg-white px-3 py-2.5 text-[18px] text-[#27304f] outline-none placeholder:text-[#d9d9d9] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)]";
const label = "mb-1 block text-[14px] font-bold text-[#27304f]";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const data = await requestPasswordReset(email.trim());
      setMessage(data.detail);
      setEmail("");
    } catch {
      setError("Не удалось отправить запрос. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="twu-animate-in-up mx-auto max-w-md space-y-4">
      <p className="text-[14px] leading-relaxed text-[#27304f]/80">
        Укажите email, который вы указали при регистрации. Мы отправим ссылку для создания нового пароля.
      </p>
      <div>
        <label className={label} htmlFor="forgot-email">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="forgot-email"
          type="email"
          className={field}
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="example@gmail.com"
        />
      </div>
      {message ? (
        <p className="rounded-[12px] border border-[#ec9b74]/40 bg-[#f7f7f6] px-4 py-3 text-[14px] font-bold text-[#27304f]">
          {message}
        </p>
      ) : null}
      {error ? <p className="text-[14px] font-bold text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="twu-btn-soft w-full rounded-[69px] bg-[#ec9b74] py-3 text-center text-[18px] font-bold text-white disabled:opacity-60"
      >
        {loading ? "…" : "Отправить ссылку"}
      </button>
      <p className="text-center text-[14px] text-[#27304f]">
        <Link href="/login" className="font-bold text-[#ec9b74] hover:underline">
          Вернуться ко входу
        </Link>
      </p>
    </form>
  );
}
