import { publicApiBase } from "@/lib/apiBase";
import type { AdminBookingDto, MeDto } from "@/lib/types";

export async function fetchMe(token: string): Promise<MeDto> {
  const res = await fetch(`${publicApiBase()}/api/auth/me/`, {
    headers: { Authorization: `Token ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("me_failed");
  return (await res.json()) as MeDto;
}

export async function patchMe(
  token: string,
  body: { first_name?: string; birth_date?: string | null; phone?: string; vk_url?: string },
): Promise<MeDto> {
  const res = await fetch(`${publicApiBase()}/api/auth/me/`, {
    method: "PATCH",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("me_patch_failed");
  return (await res.json()) as MeDto;
}

export async function createTourBooking(token: string, tourSlug: string): Promise<{ detail: string }> {
  const res = await fetch(`${publicApiBase()}/api/bookings/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tour_slug: tourSlug }),
  });
  const data = (await res.json()) as { detail?: string };
  if (!res.ok) throw new Error(data.detail ?? "booking_failed");
  return { detail: data.detail ?? "Готово." };
}

export async function fetchAdminBookings(token: string): Promise<AdminBookingDto[]> {
  const res = await fetch(`${publicApiBase()}/api/admin/bookings/`, {
    headers: { Authorization: `Token ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("admin_bookings_failed");
  return (await res.json()) as AdminBookingDto[];
}

export async function patchAdminBooking(
  token: string,
  bookingId: number,
  status: AdminBookingDto["status"],
): Promise<AdminBookingDto> {
  const res = await fetch(`${publicApiBase()}/api/admin/bookings/${bookingId}/`, {
    method: "PATCH",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("admin_booking_patch_failed");
  return (await res.json()) as AdminBookingDto;
}

export async function deleteAdminBooking(token: string, bookingId: number): Promise<void> {
  const res = await fetch(`${publicApiBase()}/api/admin/bookings/${bookingId}/`, {
    method: "DELETE",
    headers: { Authorization: `Token ${token}` },
  });
  if (!res.ok) throw new Error("admin_booking_delete_failed");
}

export async function requestPasswordReset(email: string): Promise<{ detail: string }> {
  const res = await fetch(`${publicApiBase()}/api/auth/password-reset/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = (await res.json()) as { detail?: string };
  if (!res.ok) throw new Error(data.detail ?? "password_reset_failed");
  return { detail: data.detail ?? "Готово." };
}

export async function confirmPasswordReset(body: {
  uid: string;
  token: string;
  password: string;
  password_confirm: string;
}): Promise<{ detail: string }> {
  const res = await fetch(`${publicApiBase()}/api/auth/password-reset/confirm/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as Record<string, unknown>;
  if (!res.ok) {
    const msgs: string[] = [];
    for (const v of Object.values(data)) {
      if (typeof v === "string") msgs.push(v);
      else if (Array.isArray(v)) for (const x of v) if (typeof x === "string") msgs.push(x);
    }
    throw new Error(msgs[0] ?? "password_reset_confirm_failed");
  }
  return { detail: (data.detail as string) ?? "Готово." };
}

export async function deleteAccount(token: string, password: string): Promise<void> {
  const res = await fetch(`${publicApiBase()}/api/auth/me/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });
  if (res.ok) return;

  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  const msgs: string[] = [];
  if (typeof data.detail === "string") msgs.push(data.detail);
  for (const v of Object.values(data)) {
    if (typeof v === "string") msgs.push(v);
    else if (Array.isArray(v)) for (const x of v) if (typeof x === "string") msgs.push(x);
  }
  throw new Error(msgs[0] ?? "account_delete_failed");
}
