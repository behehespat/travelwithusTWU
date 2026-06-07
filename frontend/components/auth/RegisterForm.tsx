"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { publicApiBase } from "@/lib/apiBase";

const field =
  "box-border w-full rounded-[10px] border border-black bg-white px-3 py-2.5 text-[18px] text-[#27304f] outline-none placeholder:text-[#d9d9d9] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)]";
const label = "mb-1 block text-[14px] font-bold text-[#27304f]";

export function RegisterForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vkUrl, setVkUrl] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${publicApiBase()}/api/auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email: email.trim(),
          phone: phone.trim(),
          vk_url: vkUrl.trim(),
          password,
          password_confirm: passwordConfirm,
        }),
      });
      const data = (await res.json()) as Record<string, unknown>;
      if (!res.ok) {
        const msgs: string[] = [];
        for (const v of Object.values(data)) {
          if (typeof v === "string") msgs.push(v);
          else if (Array.isArray(v)) for (const x of v) if (typeof x === "string") msgs.push(x);
        }
        setError(msgs[0] ?? "Не удалось зарегистрироваться");
        return;
      }
      router.push("/login?registered=1");
      router.refresh();
    } catch {
      setError("Нет соединения с сервером.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-4">
      <div>
        <label className={label} htmlFor="reg-username">
          Логин
        </label>
        <input
          id="reg-username"
          className={field}
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label className={label} htmlFor="reg-email">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          id="reg-email"
          type="email"
          className={field}
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="example@gmail.com"
        />
        <p className="mt-1 text-[12px] text-[#27304f]/70">Нужен для восстановления пароля.</p>
      </div>
      <div>
        <label className={label} htmlFor="reg-phone">
          Телефон <span className="text-red-600">*</span>
        </label>
        <input
          id="reg-phone"
          type="tel"
          className={field}
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="+7 900 000-00-00"
        />
        <p className="mt-1 text-[12px] text-[#27304f]/70">Не менее 10 цифр.</p>
      </div>
      <div>
        <label className={label} htmlFor="reg-vk">
          Ссылка на страницу ВКонтакте <span className="text-red-600">*</span>
        </label>
        <input
          id="reg-vk"
          className={field}
          value={vkUrl}
          onChange={(e) => setVkUrl(e.target.value)}
          required
          placeholder="https://vk.com/id… или vk.com/…"
        />
        <p className="mt-1 text-[12px] text-[#27304f]/70">Только ссылки на vk.com или vk.ru (можно без https://).</p>
      </div>
      <div>
        <label className={label} htmlFor="reg-password">
          Пароль
        </label>
        <input
          id="reg-password"
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
        <label className={label} htmlFor="reg-password2">
          Повтор пароля
        </label>
        <input
          id="reg-password2"
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
        {loading ? "…" : "Создать аккаунт"}
      </button>
      <p className="text-center text-[14px] text-[#27304f]">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="font-bold text-[#ec9b74] hover:underline">
          Войти
        </Link>
      </p>
    </form>
  );
}
