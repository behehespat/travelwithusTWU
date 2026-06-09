"use client";

import { useCallback, useEffect, useState } from "react";

import { TourPhoto } from "@/components/tour/TourPhoto";
import type { TourGallerySlide } from "@/lib/tourGallery";

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
    return <div className="twu-animate-in mb-12 aspect-[4/3] w-full rounded-[20px] bg-[#f7f7f6] sm:aspect-[21/9]" />;
  }

  const slide = slides[index]!;

  return (
    <section className="twu-animate-in-up mb-12" aria-label="Фотогалерея тура">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-[#f7f7f6] sm:aspect-[21/9]">
        <TourPhoto
          key={slide.src}
          src={slide.src}
          className="twu-gallery-photo absolute inset-0 h-full w-full object-cover"
          priority={index === 0}
        />

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="twu-btn-soft absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#27304f]/75 text-[22px] font-bold text-white hover:bg-[#27304f]"
              aria-label="Предыдущее фото"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="twu-btn-soft absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#27304f]/75 text-[22px] font-bold text-white hover:bg-[#27304f]"
              aria-label="Следующее фото"
            >
              ›
            </button>
          </>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#27304f]/80 to-transparent px-5 pb-4 pt-12">
          <p key={slide.title} className="twu-animate-in text-[16px] font-bold text-white sm:text-[18px]">
            {slide.title}
          </p>
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
              className={`twu-btn-soft h-2.5 w-2.5 rounded-full transition ${
                i === index ? "scale-125 bg-[#ec9b74]" : "bg-[#27304f]/25 hover:scale-110 hover:bg-[#27304f]/45"
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
