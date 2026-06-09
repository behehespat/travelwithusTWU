"use client";

import { useCallback, useEffect, useState } from "react";

import { TourPhoto } from "@/components/tour/TourPhoto";

export type TourGallerySlide = {
  src: string;
  title: string;
};

type Props = {
  slides: TourGallerySlide[];
};

export function TourGallerySlider({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const go = useCallback(
    (next: number) => {
      if (!total) return;
      setIndex((next + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (total <= 1) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + total) % total);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % total);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  if (!total) {
    return <div className="mb-12 aspect-[21/9] w-full rounded-[20px] bg-[#f7f7f6]" />;
  }

  const slide = slides[index];

  return (
    <section className="mb-12" aria-label="Фотогалерея тура">
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[20px] bg-[#f7f7f6]">
        <TourPhoto
          key={slide.src}
          src={slide.src}
          className="absolute inset-0 h-full w-full object-cover"
          priority={index === 0}
        />

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#27304f]/75 text-[22px] font-bold text-white transition hover:bg-[#27304f]"
              aria-label="Предыдущее фото"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#27304f]/75 text-[22px] font-bold text-white transition hover:bg-[#27304f]"
              aria-label="Следующее фото"
            >
              ›
            </button>
          </>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#27304f]/80 to-transparent px-5 pb-4 pt-12">
          <p className="text-[16px] font-bold text-white sm:text-[18px]">{slide.title}</p>
          {total > 1 ? (
            <p className="mt-0.5 text-[13px] text-white/80">
              {index + 1} / {total}
            </p>
          ) : null}
        </div>
      </div>

      {total > 1 ? (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? "bg-[#ec9b74] scale-110" : "bg-[#27304f]/25 hover:bg-[#27304f]/45"
              }`}
              aria-label={`Фото ${i + 1}: ${s.title}`}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function buildTourGallerySlides(tour: {
  title: string;
  image_url: string;
  places?: { name: string; image_url: string }[];
}): TourGallerySlide[] {
  const slides: TourGallerySlide[] = [];
  const seen = new Set<string>();

  const add = (src: string, title: string) => {
    if (!src || seen.has(src)) return;
    seen.add(src);
    slides.push({ src, title });
  };

  add(tour.image_url, tour.title);
  for (const place of tour.places ?? []) {
    add(place.image_url, place.name);
  }

  return slides;
}
