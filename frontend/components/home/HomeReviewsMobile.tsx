import Link from "next/link";

import { MAIN_PAGE_IMAGES } from "@/lib/mainPictures";
import type { TestimonialDto } from "@/lib/types";

const VK_ICONS = [MAIN_PAGE_IMAGES.vkReview0, MAIN_PAGE_IMAGES.vkReview1, MAIN_PAGE_IMAGES.vkReview2] as const;

const DEFAULT_SLOTS: [string, string][] = [
  [
    "Владимир",
    "Организация на высшем уровне: чёткие сроки, отзывчивые гиды и насыщенная программа.",
  ],
  ["Ангелина", "Путешествие превзошло ожидания — Китай открылся с совершенно новой стороны."],
  ["Александр", "Спасибо команде TWU за заботу и безопасность на всём маршруте."],
];

const DATE_META = [
  { label: "12 июня 2025", iso: "2025-06-12" },
  { label: "3 сентября 2025", iso: "2025-09-03" },
  { label: "21 октября 2025", iso: "2025-10-21" },
] as const;

const TOUR_LABELS = [
  "Тур: «Великий Китай», 8 дней",
  "Тур: «Шанхай и Аватар», 5 дней",
  "Тур: «Контрасты Поднебесной», 9 дней",
] as const;

function initialsFromName(name: string): string {
  const p = name.trim().split(/\s+/).filter(Boolean);
  if (p.length >= 2) return (p[0][0] + p[1][0]).toUpperCase();
  return name.trim().slice(0, 2).toUpperCase() || "?";
}

function StarRow({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5 text-[#ec9b74]" aria-label={`Оценка ${n} из 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < n ? "text-[#ec9b74]" : "text-white/25"} aria-hidden>
          ★
        </span>
      ))}
      <span className="ml-2 text-[12px] font-semibold uppercase tracking-wide text-white/70">5,0</span>
    </div>
  );
}

export function HomeReviewsMobile({ testimonials }: { testimonials: TestimonialDto[] }) {
  const items = [0, 1, 2].map((i) => {
    const [dName, dText] = DEFAULT_SLOTS[i];
    const api = testimonials[i];
    const name = api?.name?.trim() || dName;
    const text = api?.text?.trim() || dText;
    return {
      id: api?.id ?? i + 1,
      name,
      text,
      initials: initialsFromName(name),
      dateLabel: DATE_META[i].label,
      dateIso: DATE_META[i].iso,
      tourLabel: TOUR_LABELS[i],
    };
  });

  return (
    <section className="space-y-5" aria-labelledby="home-reviews-mobile-heading">
      <h2 id="home-reviews-mobile-heading" className="text-center text-[26px] font-bold leading-tight text-[#27304f] sm:text-[32px]">
        Что пишут люди
        <span className="block">о путешествиях с нами</span>
      </h2>

      <div className="space-y-4">
        {items.map((rev, i) => (
          <article
            key={`${rev.id}-${i}`}
            className="relative flex flex-col rounded-[20px] bg-[#27304f] p-5 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.35)] sm:p-6"
          >
            <div className="pointer-events-none absolute right-4 top-4 size-12 opacity-95 sm:size-14">
              <img alt="" src={VK_ICONS[i]} className="size-full max-w-none object-contain" />
            </div>

            <div className="flex gap-3 pr-14">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ec9b74]/25 text-[16px] font-bold text-[#ec9b74] ring-2 ring-[#ec9b74]/40"
                aria-hidden
              >
                {rev.initials}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[22px] font-bold leading-tight text-white sm:text-[26px]">{rev.name}</h3>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">
                  Проверенный отзыв
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-white/10 pb-4">
              <StarRow n={5} />
              <time className="text-[13px] text-white/65" dateTime={rev.dateIso}>
                {rev.dateLabel}
              </time>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/90">
                {rev.tourLabel}
              </span>
            </div>

            <p className="mt-4 text-[15px] leading-relaxed text-white/95">{rev.text}</p>

            <div className="mt-4 pt-2">
              <Link
                href="https://vk.com/travelwithustwu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[14px] font-bold text-white/90 underline-offset-4 hover:text-[#ec9b74] hover:underline"
              >
                Открыть отзыв в VK
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
