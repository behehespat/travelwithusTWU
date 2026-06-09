import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { serverApiBase } from "@/lib/apiBase";
import { isLocalTourImage, withLocalTourImages } from "@/lib/tourAssets";
import type { TourDetailDto } from "@/lib/types";
import { TourBookingCta } from "@/components/tour/TourBookingCta";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

async function fetchTour(slug: string): Promise<TourDetailDto | null> {
  const base = serverApiBase();
  try {
    const res = await fetch(`${base}/api/tours/${slug}/`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as TourDetailDto;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = await fetchTour(slug);
  if (!tour) return { title: "Тур" };
  return { title: tour.title };
}

function formatPrice(n: number) {
  if (!n) return "-";
  return new Intl.NumberFormat("ru-RU").format(n) + " ₽";
}

function tourImageUnoptimized(src: string): boolean {
  return isLocalTourImage(src) || src.includes("figma.com");
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  const raw = await fetchTour(slug);
  if (!raw) notFound();
  const tour = withLocalTourImages(raw);

  return (
    <article>
      <p className="mb-2">
        <Link href="/#tours" className="text-[14px] font-bold text-[#ec9b74] hover:underline">
          ← Все туры
        </Link>
      </p>
      <h1 className="mb-4 text-[30px] font-bold leading-tight text-[#27304f] md:text-[36px]">{tour.title}</h1>
      <p className="mb-6 max-w-3xl text-[17px] leading-relaxed text-[#27304f]/90">{tour.description}</p>

      <div className="mb-8 flex flex-wrap gap-3 text-[15px] font-bold text-[#27304f]">
        <span className="rounded-full bg-[#ec9b74] px-3 py-1.5 text-white">{tour.duration_days} дней</span>
        <span className="rounded-full border border-[#27304f]/25 px-3 py-1.5">{tour.tariff_label}</span>
        <span className="rounded-full border border-[#27304f]/25 px-3 py-1.5">от {formatPrice(tour.price_from_rub)}</span>
      </div>

      {tour.dates_display ? (
        <section className="mb-10 rounded-[16px] border border-black/10 bg-[#f7f7f6] px-5 py-4">
          <h2 className="mb-2 text-[18px] font-bold text-[#27304f]">Даты выездов</h2>
          <p className="text-[16px] leading-relaxed text-[#27304f]/90">{tour.dates_display}</p>
        </section>
      ) : null}

      <div className="relative mb-12 aspect-[21/9] w-full overflow-hidden rounded-[20px] bg-[#f7f7f6]">
        <Image
          src={tour.image_url}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 896px"
          unoptimized={tourImageUnoptimized(tour.image_url)}
          priority
        />
      </div>

      <h2 className="mb-6 text-[24px] font-bold text-[#27304f]">Места и акценты маршрута</h2>
      <div className="space-y-10">
        {tour.places?.length ? (
          tour.places.map((place) => (
            <section
              key={place.name}
              className="grid gap-6 border-b border-black/10 pb-10 last:border-0 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] bg-[#f7f7f6]">
                <Image
                  src={place.image_url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 480px"
                  unoptimized={tourImageUnoptimized(place.image_url)}
                />
              </div>
              <div>
                <h3 className="mb-2 text-[20px] font-bold text-[#27304f]">{place.name}</h3>
                <p className="text-[16px] leading-relaxed text-[#27304f]/88">{place.detail}</p>
              </div>
            </section>
          ))
        ) : (
          <p className="text-[#27304f]/75">Список локаций уточняется.</p>
        )}
      </div>

      <TourBookingCta tourSlug={tour.slug} tourTitle={tour.title} />
    </article>
  );
}
