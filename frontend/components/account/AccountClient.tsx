"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { deleteAccount, fetchMe, patchMe } from "@/lib/authApi";
import { clearStoredToken, getStoredToken } from "@/lib/authToken";
import { bookingStatusBadgeClass, bookingStatusLabel } from "@/lib/bookingStatus";
import type { MeDto, TourBookingDto } from "@/lib/types";

type AccountSection = "info" | "bookings";

const inputClass =
  "w-full rounded-lg border border-[#d3d9de] bg-white px-3 py-2 text-[15px] text-[#27304f] outline-none transition placeholder:text-[#27304f]/35 focus:border-[#ec9b74] focus:ring-1 focus:ring-[#ec9b74]/30";
const labelClass = "mb-1 block text-[13px] font-semibold text-[#626d7a]";

function formatBookingDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("ru-RU", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function accountTitle(me: MeDto): string {
  const first = (me.first_name || "").trim();
  if (first) return first;
  if (me.username.includes("@")) return me.username.split("@")[0] || "Профиль";
  return me.username;
}

const sideNavBtn = (active: boolean) =>
  `block w-full rounded-lg px-3 py-2.5 text-left text-[15px] font-semibold transition ${
    active ? "bg-[#27304f]/10 text-[#27304f]" : "text-[#27304f]/75 hover:bg-[#27304f]/5"
  }`;

export function AccountClient() {
  const router = useRouter();
  const [me, setMe] = useState<MeDto | null>(null);
  const [section, setSection] = useState<AccountSection>("info");
  const [firstName, setFirstName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [vkUrl, setVkUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingOpen, setEditingOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      router.replace(`/login?next=${encodeURIComponent("/account")}`);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMe(token);
      setMe(data);
      setFirstName(data.first_name ?? "");
      setBirthDate(data.birth_date ? data.birth_date.slice(0, 10) : "");
      setPhone(data.phone ?? "");
      setVkUrl(data.vk_url ?? "");
    } catch {
      setError("Не удалось загрузить профиль. Попробуйте войти снова.");
      setMe(null);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    const token = getStoredToken();
    if (!token) return;
    setSaveError(null);
    setSaving(true);
    try {
      const body: {
        first_name: string;
        birth_date: string | null;
        phone?: string;
        vk_url?: string;
      } = {
        first_name: firstName.trim(),
        birth_date: birthDate.trim() ? birthDate.trim() : null,
      };
      const p = phone.trim();
      const v = vkUrl.trim();
      if (p) body.phone = p;
      if (v) body.vk_url = v;
      const data = await patchMe(token, body);
      setMe(data);
      setFirstName(data.first_name ?? "");
      setBirthDate(data.birth_date ? data.birth_date.slice(0, 10) : "");
      setPhone(data.phone ?? "");
      setVkUrl(data.vk_url ?? "");
      setEditingOpen(false);
    } catch {
      setSaveError("Не удалось сохранить изменения.");
    } finally {
      setSaving(false);
    }
  }

  async function onDeleteAccount(e: React.FormEvent) {
    e.preventDefault();
    const token = getStoredToken();
    if (!token) return;
    setDeleteError(null);
    setDeleting(true);
    try {
      await deleteAccount(token, deletePassword);
      clearStoredToken();
      router.replace("/?account_deleted=1");
      router.refresh();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Не удалось удалить аккаунт.");
    } finally {
      setDeleting(false);
    }
  }

  if (loading && !me) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#ebedf0]">
        <div className="flex items-center gap-3 rounded-xl bg-white px-6 py-5 shadow-sm">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#27304f]/20 border-t-[#ec9b74]" />
          <p className="text-[16px] font-semibold text-[#27304f]/70">Загрузка профиля…</p>
        </div>
      </div>
    );
  }

  if (error && !me) {
    return (
      <div className="min-h-[50vh] bg-[#ebedf0] px-4 py-10">
        <div className="mx-auto max-w-lg rounded-xl border border-red-200 bg-white px-6 py-5 shadow-sm">
          <p className="text-[16px] font-bold text-red-800">{error}</p>
          <Link href="/login" className="mt-3 inline-block font-bold text-[#ec9b74] hover:underline">
            На страницу входа
          </Link>
        </div>
      </div>
    );
  }

  if (!me) return null;

  const displayName = accountTitle(me);

  return (
    <div className="min-h-[70vh] bg-[#ebedf0]">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-start">
        <aside className="twu-card-soft twu-animate-in-up w-full shrink-0 rounded-xl border border-[#d3d9de] bg-white p-2 shadow-sm md:w-[240px]">
          <nav className="space-y-0.5" aria-label="Разделы кабинета">
            <button type="button" className={sideNavBtn(section === "info")} onClick={() => setSection("info")}>
              Общая информация
            </button>
            <button type="button" className={sideNavBtn(section === "bookings")} onClick={() => setSection("bookings")}>
              Мои заявки
              {me.bookings.length > 0 ? (
                <span className="ml-2 rounded-full bg-[#ec9b74]/20 px-2 py-0.5 text-[12px] text-[#ec9b74]">
                  {me.bookings.length}
                </span>
              ) : null}
            </button>
            {me.is_staff ? (
              <Link href="/admin-panel" className={sideNavBtn(false)}>
                Админ панель
              </Link>
            ) : null}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 space-y-4">
          {section === "info" ? (
            <>
              <section className="twu-card-soft twu-animate-in-up rounded-xl border border-[#d3d9de] bg-white shadow-sm">
                <div className="border-b border-[#d3d9de] px-5 py-4">
                  <h2 className="text-[17px] font-bold text-[#27304f]">Контактные данные</h2>
                </div>
                <dl className="divide-y divide-[#e7e8ec] px-5">
                  <div className="flex justify-between gap-4 py-3.5">
                    <dt className="text-[14px] text-[#626d7a]">Имя</dt>
                    <dd className="text-right text-[14px] font-semibold text-[#27304f]">{displayName}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-3.5">
                    <dt className="text-[14px] text-[#626d7a]">Телефон</dt>
                    <dd className="text-right text-[14px] font-semibold text-[#27304f]">{me.phone || "-"}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-3.5">
                    <dt className="text-[14px] text-[#626d7a]">ВКонтакте</dt>
                    <dd className="max-w-[65%] truncate text-right text-[14px] font-semibold">
                      {me.vk_url ? (
                        <a href={me.vk_url} target="_blank" rel="noopener noreferrer" className="text-[#ec9b74] hover:underline">
                          {me.vk_url.replace(/^https?:\/\//, "")}
                        </a>
                      ) : (
                        <span className="text-[#27304f]/40">-</span>
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 py-3.5">
                    <dt className="text-[14px] text-[#626d7a]">Email</dt>
                    <dd className="max-w-[65%] truncate text-right text-[14px] font-semibold text-[#27304f]">
                      {me.email || "-"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 py-3.5">
                    <dt className="text-[14px] text-[#626d7a]">Дата рождения</dt>
                    <dd className="text-[14px] font-semibold text-[#27304f]">
                      {me.birth_date ? new Date(me.birth_date).toLocaleDateString("ru-RU") : "-"}
                    </dd>
                  </div>
                </dl>
                <div className="border-t border-[#e7e8ec] px-5 py-4">
                  {!editingOpen ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSaveError(null);
                        setEditingOpen(true);
                      }}
                      className="rounded-lg bg-[#ec9b74] px-5 py-2.5 text-[15px] font-bold text-white transition hover:opacity-95"
                    >
                      Редактировать
                    </button>
                  ) : null}
                </div>
              </section>

              {editingOpen ? (
                <section className="twu-card-soft twu-animate-in-up rounded-xl border border-[#d3d9de] bg-white shadow-sm">
                  <div className="border-b border-[#d3d9de] px-5 py-4">
                    <h2 className="text-[17px] font-bold text-[#27304f]">Редактировать</h2>
                    <p className="mt-1 text-[13px] text-[#626d7a]">Изменения сохраняются в вашем профиле на сайте.</p>
                  </div>
                  <form onSubmit={onSave} className="space-y-4 px-5 py-5">
                    <div>
                      <label className={labelClass} htmlFor="acc-first-name">
                        Имя
                      </label>
                      <input
                        id="acc-first-name"
                        className={inputClass}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        autoComplete="given-name"
                        placeholder="Например, Анна"
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="acc-birth">
                        Дата рождения
                      </label>
                      <input
                        id="acc-birth"
                        type="date"
                        className={inputClass}
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="acc-phone">
                        Телефон
                      </label>
                      <input
                        id="acc-phone"
                        type="tel"
                        className={inputClass}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel"
                        placeholder="+7 …"
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="acc-vk">
                        Ссылка ВКонтакте
                      </label>
                      <input
                        id="acc-vk"
                        className={inputClass}
                        value={vkUrl}
                        onChange={(e) => setVkUrl(e.target.value)}
                        placeholder="https://vk.com/…"
                      />
                    </div>
                    {saveError ? <p className="text-[14px] font-bold text-red-700">{saveError}</p> : null}
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="submit"
                        disabled={saving}
                        className="rounded-lg bg-[#ec9b74] px-6 py-2.5 text-[15px] font-bold text-white transition hover:opacity-95 disabled:opacity-60"
                      >
                        {saving ? "Сохранение…" : "Сохранить"}
                      </button>
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => {
                          setSaveError(null);
                          setEditingOpen(false);
                          setFirstName(me.first_name ?? "");
                          setBirthDate(me.birth_date ? me.birth_date.slice(0, 10) : "");
                          setPhone(me.phone ?? "");
                          setVkUrl(me.vk_url ?? "");
                        }}
                        className="rounded-lg border border-[#d3d9de] px-6 py-2.5 text-[15px] font-semibold text-[#27304f] transition hover:bg-[#f5f6f8] disabled:opacity-60"
                      >
                        Отмена
                      </button>
                    </div>
                  </form>
                </section>
              ) : null}

              {!me.is_staff ? (
                <section className="rounded-xl border border-red-200 bg-white shadow-sm">
                  <div className="border-b border-red-100 px-5 py-4">
                    <h2 className="text-[17px] font-bold text-red-800">Удаление аккаунта</h2>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#626d7a]">
                      Будут безвозвратно удалены профиль, заявки на туры и все персональные данные. Восстановить аккаунт
                      будет нельзя.
                    </p>
                  </div>
                  <div className="px-5 py-4">
                    {!deleteOpen ? (
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteError(null);
                          setDeletePassword("");
                          setDeleteOpen(true);
                        }}
                        className="rounded-lg border border-red-300 bg-red-50 px-5 py-2.5 text-[15px] font-bold text-red-700 transition hover:bg-red-100"
                      >
                        Удалить аккаунт
                      </button>
                    ) : (
                      <form onSubmit={onDeleteAccount} className="space-y-4">
                        <p className="text-[14px] font-semibold text-[#27304f]">
                          Введите пароль для подтверждения удаления.
                        </p>
                        <div>
                          <label className={labelClass} htmlFor="acc-delete-password">
                            Пароль
                          </label>
                          <input
                            id="acc-delete-password"
                            type="password"
                            className={inputClass}
                            autoComplete="current-password"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                            required
                          />
                        </div>
                        {deleteError ? <p className="text-[14px] font-bold text-red-700">{deleteError}</p> : null}
                        <div className="flex flex-wrap gap-3">
                          <button
                            type="submit"
                            disabled={deleting}
                            className="rounded-lg bg-red-600 px-5 py-2.5 text-[15px] font-bold text-white transition hover:bg-red-700 disabled:opacity-60"
                          >
                            {deleting ? "Удаление…" : "Подтвердить удаление"}
                          </button>
                          <button
                            type="button"
                            disabled={deleting}
                            onClick={() => {
                              setDeleteOpen(false);
                              setDeletePassword("");
                              setDeleteError(null);
                            }}
                            className="rounded-lg border border-[#d3d9de] px-5 py-2.5 text-[15px] font-semibold text-[#27304f] transition hover:bg-[#f5f6f8] disabled:opacity-60"
                          >
                            Отмена
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </section>
              ) : null}
            </>
          ) : (
            <section className="twu-card-soft twu-animate-in-up rounded-xl border border-[#d3d9de] bg-white shadow-sm">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#d3d9de] px-5 py-4">
                <div>
                  <h2 className="text-[17px] font-bold text-[#27304f]">Мои заявки на туры</h2>
                  <p className="mt-1 text-[13px] text-[#626d7a]">Заявки после входа на странице тура.</p>
                </div>
                <Link
                  href="/#tours"
                  className="rounded-lg bg-[#27304f] px-4 py-2 text-[13px] font-bold text-white hover:opacity-95"
                >
                  Выбрать тур
                </Link>
              </div>

              {me.bookings.length === 0 ? (
                <p className="px-5 py-10 text-center text-[15px] text-[#626d7a]">
                  Пока нет заявок - загляните в каталог на главной.
                </p>
              ) : (
                <ul className="divide-y divide-[#e7e8ec]">
                  {me.bookings.map((b) => (
                    <li key={`${b.tour_slug}-${b.created_at}`} className="px-5 py-4 hover:bg-[#f5f6f8]">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link href={`/tours/${b.tour_slug}`} className="text-[15px] font-bold text-[#27304f] hover:text-[#ec9b74]">
                            {b.tour_title}
                          </Link>
                          <p className="mt-1 text-[13px] text-[#626d7a]">Подано {formatBookingDate(b.created_at)}</p>
                        </div>
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${bookingStatusBadgeClass(b.status)}`}>
                          {bookingStatusLabel(b.status)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
