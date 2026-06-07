export type BookingStatus = "new" | "in_progress" | "reviewed";

export const BOOKING_STATUSES: BookingStatus[] = ["new", "in_progress", "reviewed"];

export function bookingStatusLabel(status: BookingStatus): string {
  if (status === "new") return "Новая";
  if (status === "in_progress") return "В процессе";
  return "Рассмотрена";
}

export function bookingStatusBadgeClass(status: BookingStatus): string {
  if (status === "in_progress") return "bg-sky-500/15 text-sky-900";
  if (status === "reviewed") return "bg-emerald-500/15 text-emerald-800";
  return "bg-amber-500/15 text-amber-900";
}
