import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { serverApiBase } from "@/lib/apiBase";
import { withLocalTourImages } from "@/lib/tourAssets";
import type { TourDetailDto } from "@/lib/types";
import { TourBookingCta } from "@/components/tour/TourBookingCta";
import { TourGallerySlider } from "@/components/tour/TourGallerySlider";
import { buildTourGallerySlides } from "@/lib/tourGallery";

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

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  const raw = await fetchTour(slug);
  if (!raw) notFound();
  const tour = withLocalTourImages(raw);
  const gallerySlides = buildTourGallerySlides(tour);

  return (
    <article className="twu-page-enter">
      <p className="twu-animate-in mb-2">
        <Link href="/#tours" className="twu-link-soft text-[14px] font-bold text-[#ec9b74]">
          ← Все туры
        </Link>
      </p>
      <h1 className="twu-animate-in-up twu-delay-1 mb-4 text-[30px] font-bold leading-tight text-[#27304f] md:text-[36px]">
        {tour.title}
      </h1>
      <p className="twu-animate-in-up twu-delay-2 mb-6 max-w-3xl text-[17px] leading-relaxed text-[#27304f]/90">
        {tour.description}
      </p>

      <div className="twu-animate-in-up twu-delay-3 mb-8 flex flex-wrap gap-3 text-[15px] font-bold text-[#27304f]">
        <span className="twu-hover-lift rounded-full bg-[#ec9b74] px-3 py-1.5 text-white">{tour.duration_days} дней</span>
        <span className="twu-hover-lift rounded-full border border-[#27304f]/25 px-3 py-1.5">{tour.tariff_label}</span>
        <span className="twu-hover-lift rounded-full border border-[#27304f]/25 px-3 py-1.5">от {formatPrice(tour.price_from_rub)}</span>
      </div>

      {tour.dates_display ? (
        <section className="twu-animate-in-up twu-delay-4 twu-hover-lift mb-10 rounded-[16px] border border-black/10 bg-[#f7f7f6] px-5 py-4">
          <h2 className="mb-2 text-[18px] font-bold text-[#27304f]">Даты выездов</h2>
          <p className="text-[16px] leading-relaxed text-[#27304f]/90">{tour.dates_display}</p>
        </section>
      ) : null}

      <TourGallerySlider slides={gallerySlides} />

      <h2 className="twu-animate-in-up mb-6 text-[24px] font-bold text-[#27304f]">Места и акценты маршрута</h2>
      <div className="twu-stagger space-y-8">
        {tour.places?.length ? (
          tour.places.map((place) => (
            <section
              key={place.name}
              className="twu-animate-in-up border-b border-black/10 pb-8 last:border-0"
            >
              <h3 className="mb-2 text-[20px] font-bold text-[#27304f]">{place.name}</h3>
              <p className="max-w-3xl text-[16px] leading-relaxed text-[#27304f]/88">{place.detail}</p>
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
