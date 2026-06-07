"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { deleteAdminBooking, fetchAdminBookings, fetchMe, patchAdminBooking } from "@/lib/authApi";
import { getStoredToken } from "@/lib/authToken";
import {
  BOOKING_STATUSES,
  bookingStatusBadgeClass,
  bookingStatusLabel,
  type BookingStatus,
} from "@/lib/bookingStatus";
import type { AdminBookingDto } from "@/lib/types";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("ru-RU", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function AdminPanelClient() {
  const router = useRouter();
  const [rows, setRows] = useState<AdminBookingDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      router.replace(`/login?next=${encodeURIComponent("/admin-panel")}`);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const me = await fetchMe(token);
      if (!me.is_staff) {
        router.replace("/account");
        return;
      }
      const data = await fetchAdminBookings(token);
      setRows(data);
    } catch {
      setError("Не удалось загрузить заявки. Проверьте права доступа.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  async function onStatusChange(id: number, status: BookingStatus) {
    const token = getStoredToken();
    if (!token) return;
    setBusyId(id);
    setActionError(null);
    try {
      const updated = await patchAdminBooking(token, id, status);
      setRows((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch {
      setActionError("Не удалось обновить статус заявки.");
    } finally {
      setBusyId(null);
    }
  }

  async function onDelete(id: number) {
    const row = rows.find((r) => r.id === id);
    if (!row || row.status !== "reviewed") return;
    if (!window.confirm("Удалить рассмотренную заявку? Пользователь сможет подать её снова.")) return;

    const token = getStoredToken();
    if (!token) return;
    setBusyId(id);
    setActionError(null);
    try {
      await deleteAdminBooking(token, id);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch {
      setActionError("Не удалось удалить заявку.");
    } finally {
      setBusyId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-[#27304f]/10 bg-white px-6 py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#27304f]/20 border-t-[#ec9b74]" />
        <p className="text-[16px] font-bold text-[#27304f]/70">Загрузка заявок…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5">
        <p className="text-[16px] font-bold text-red-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[20px] border border-[#27304f]/10 bg-white p-5 shadow-sm md:p-6">
        <h1 className="text-[24px] font-bold text-[#27304f]">Заявки пользователей</h1>
        <p className="mt-2 text-[14px] text-[#27304f]/70">
          Меняйте статус заявки. Удалять можно только заявки со статусом «Рассмотрена».
        </p>
        {actionError ? <p className="mt-3 text-[14px] font-bold text-red-700">{actionError}</p> : null}
      </div>

      {rows.length === 0 ? (
        <div className="rounded-[18px] border border-dashed border-[#27304f]/20 bg-white px-6 py-12 text-center">
          <p className="text-[16px] text-[#27304f]/75">Пока нет заявок на туры.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-[18px] border border-[#27304f]/10 bg-white shadow-sm">
          <table className="min-w-full text-left text-[14px] text-[#27304f]">
            <thead className="border-b border-[#27304f]/10 bg-[#f7f7f6] text-[12px] font-bold uppercase tracking-wide text-[#27304f]/60">
              <tr>
                <th className="px-4 py-3">Пользователь</th>
                <th className="px-4 py-3">Телефон</th>
                <th className="px-4 py-3">ВКонтакте</th>
                <th className="px-4 py-3">Тур</th>
                <th className="px-4 py-3">Статус</th>
                <th className="px-4 py-3">Дата</th>
                <th className="px-4 py-3">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27304f]/8">
              {rows.map((row) => {
                const displayName = (row.first_name || "").trim() || row.username;
                const isBusy = busyId === row.id;
                return (
                  <tr key={row.id} className="align-top hover:bg-[#f7f7f6]/60">
                    <td className="px-4 py-3">
                      <p className="font-bold">{displayName}</p>
                      <p className="text-[12px] text-[#27304f]/55">@{row.username}</p>
                    </td>
                    <td className="px-4 py-3">
                      {row.phone ? (
                        <a href={`tel:${row.phone.replace(/\s/g, "")}`} className="font-semibold text-[#ec9b74] hover:underline">
                          {row.phone}
                        </a>
                      ) : (
                        <span className="text-[#27304f]/40">-</span>
                      )}
                    </td>
                    <td className="max-w-[200px] px-4 py-3">
                      {row.vk_url ? (
                        <a
                          href={row.vk_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-all font-semibold text-[#ec9b74] hover:underline"
                        >
                          {row.vk_url.replace(/^https?:\/\//, "")}
                        </a>
                      ) : (
                        <span className="text-[#27304f]/40">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/tours/${row.tour_slug}`} className="font-semibold hover:text-[#ec9b74] hover:underline">
                        {row.tour_title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={row.status}
                        disabled={isBusy}
                        onChange={(e) => void onStatusChange(row.id, e.target.value as BookingStatus)}
                        className={`rounded-lg border border-[#27304f]/15 bg-white px-2 py-1.5 text-[13px] font-semibold outline-none focus:border-[#ec9b74] ${bookingStatusBadgeClass(row.status)}`}
                      >
                        {BOOKING_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {bookingStatusLabel(s)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-[#27304f]/70">{formatDate(row.created_at)}</td>
                    <td className="px-4 py-3">
                      {row.status === "reviewed" ? (
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => void onDelete(row.id)}
                          className="rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-[12px] font-bold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                        >
                          Удалить
                        </button>
                      ) : (
                        <span className="text-[12px] text-[#27304f]/45">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
