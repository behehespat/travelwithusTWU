import { HomeView } from "@/components/home/HomeView";
import { serverApiBase } from "@/lib/apiBase";
import type { FaqDto, TestimonialDto, TourDto } from "@/lib/types";

async function fetchJson<T>(path: string): Promise<T> {
  const base = serverApiBase();
  try {
    const res = await fetch(`${base}${path}`, { cache: "no-store" });
    if (!res.ok) {
      return [] as T;
    }
    return (await res.json()) as T;
  } catch {
    return [] as T;
  }
}

export default async function Page() {
  const [tours, testimonials, faqs] = await Promise.all([
    fetchJson<TourDto[]>("/api/tours/"),
    fetchJson<TestimonialDto[]>("/api/testimonials/"),
    fetchJson<FaqDto[]>("/api/faqs/"),
  ]);

  return <HomeView tours={tours} testimonials={testimonials} faqs={faqs} />;
}
