import Link from "next/link";

import { MAIN_PAGE_IMAGES } from "@/lib/mainPictures";
import type { TestimonialDto } from "@/lib/types";

const VK_ICONS = [MAIN_PAGE_IMAGES.vkReview0, MAIN_PAGE_IMAGES.vkReview1, MAIN_PAGE_IMAGES.vkReview2] as const;

const CARD_TOP = "calc(6869px - var(--twu-lead-gap, 0px))";
const CARD_H = 900;
const LEFT = [182, 716, 1250] as const;

type Enriched = TestimonialDto & {
  initials: string;
  extra: string;
  dateLabel: string;
  dateIso: string;
  tourLabel: string;
  rating: number;
};

function initialsFromName(name: string): string {
  const p = name.trim().split(/\s+/).filter(Boolean);
  if (p.length >= 2) return (p[0][0] + p[1][0]).toUpperCase();
  return name.trim().slice(0, 2).toUpperCase() || "?";
}

const DEFAULT_SLOTS: [string, string][] = [
  [
    "Владимир",
    "Организация на высшем уровне: чёткие сроки, отзывчивые гиды и насыщенная программа.",
  ],
  ["Ангелина", "Путешествие превзошло ожидания - Китай открылся с совершенно новой стороны."],
  ["Александр", "Спасибо команде TWU за заботу и безопасность на всём маршруте."],
];

const EXTRA_BY_INDEX = [
  "Отдельно отмечу слаженность команды на месте: трансферы без суеты, гиды на связи в мессенджере, а в программе остаётся время и на прогулки «для себя». Это не пакетный «беги и смотри», а выстроенное путешествие с человеческим лицом - хочется вернуться и посмотреть другие маршруты.",
  "До поездки волновалась из‑за языка и логистики, но всё оказалось проще, чем я думала: нас встретили, проводили в отель, на экскурсиях всё объясняли спокойно и с юмором. Особенно запомнились рассветы в горах и вечерние прогулки по набережным - атмосфера, которую не передаст ни один гидбук.",
  "Маршрут продуман так, что и активности хватает, и силы берегут: ночёвки в нормальных отелях, питание согласовали заранее под наши пожелания. Впечатления только положительные; друзьям уже скинул контакты TWU и ссылку на регистрацию.",
] as const;

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

function enrichSlot(index: number, api?: TestimonialDto): Enriched {
  const [dName, dText] = DEFAULT_SLOTS[index];
  const name = api?.name?.trim() || dName;
  const text = api?.text?.trim() || dText;
  return {
    id: api?.id ?? index + 1,
    name,
    text,
    initials: initialsFromName(name),
    extra: EXTRA_BY_INDEX[index],
    dateLabel: DATE_META[index].label,
    dateIso: DATE_META[index].iso,
    tourLabel: TOUR_LABELS[index],
    rating: 5,
  };
}

function StarRow({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5 text-[#ec9b74]" aria-label={`Оценка ${n} из 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < n ? "text-[#ec9b74]" : "text-white/25"} aria-hidden>
          ★
        </span>
      ))}
      <span className="ml-2 text-[13px] font-semibold uppercase tracking-wide text-white/70">5,0</span>
    </div>
  );
}

export function HomeReviewsSection({ testimonials }: { testimonials: TestimonialDto[] }) {
  const items = [0, 1, 2].map((i) => enrichSlot(i, testimonials[i]));

  return (
    <section className="pointer-events-auto absolute left-0 top-0 z-[12] w-[1920px]" aria-labelledby="home-reviews-heading">
      <div
        id="home-reviews-heading"
        className="-translate-x-1/2 absolute left-[935px] text-center font-bold leading-[0] text-[#27304f] not-italic top-[calc(6720px-var(--twu-lead-gap,0px))] w-[1064px] text-[48px]"
        data-node-id="113:301"
      >
        <p className="mb-0 leading-[normal]">Что пишут люди</p>
        <p className="leading-[normal]">о путешествиях с нами</p>
      </div>

      {items.map((rev, i) => (
        <article
          key={`${rev.id}-${i}`}
          className="absolute flex w-[487px] flex-col rounded-[20px] bg-[#27304f] p-7 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.35)]"
          style={{ left: LEFT[i], top: CARD_TOP, height: CARD_H }}
          data-node-id={i === 0 ? "113:344" : i === 1 ? "113:345" : "113:347"}
        >
          <div className="pointer-events-none absolute right-5 top-5 size-[72px] opacity-95">
            <img alt="" src={VK_ICONS[i]} className="size-full object-contain" />
          </div>

          <div className="flex gap-4 pr-20">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ec9b74]/25 text-[18px] font-bold text-[#ec9b74] ring-2 ring-[#ec9b74]/40"
              aria-hidden
            >
              {rev.initials}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[32px] font-bold leading-tight text-white md:text-[36px]">{rev.name}</h3>
              <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50">Проверенный отзыв</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/10 pb-4">
            <StarRow n={rev.rating} />
            <time className="text-[14px] text-white/65" dateTime={rev.dateIso}>
              {rev.dateLabel}
            </time>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-white/90">
              {rev.tourLabel}
            </span>
          </div>

          <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1 text-[15px] leading-[1.55] text-white/95 [scrollbar-width:thin]">
            <p className="mb-0">{rev.text}</p>
            <p className="mt-3 mb-0 text-white/90">{rev.extra}</p>
          </div>

          <details className="group mt-4 border-t border-white/10 pt-3 text-[14px] text-[#ec9b74] [&_summary::-webkit-details-marker]:hidden">
            <summary className="cursor-pointer list-none select-none font-bold outline-none hover:underline focus-visible:underline">
              Читать полностью
            </summary>
            <p className="mt-2 text-[14px] leading-relaxed text-white/80">
              Полный текст отзыва также опубликован в нашем сообществе ВКонтакте - там больше фото и комментариев от
              участников группы. Если хотите задать вопрос автору отзыва, напишите нам после регистрации в личном
              кабинете.
            </p>
          </details>

          <div className="mt-auto pt-4">
            <Link
              href="https://vk.com"
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
    </section>
  );
}
