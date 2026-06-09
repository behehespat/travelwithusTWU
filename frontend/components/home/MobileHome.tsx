import Link from "next/link";

import { HomeFaqAccordion } from "@/components/home/HomeFaqAccordion";
import { HomeGuestLeadBlock } from "@/components/home/HomeGuestLeadBlock";
import { HomeReviewsMobile } from "@/components/home/HomeReviewsMobile";
import { MainStyleHeader } from "@/components/layout/MainStyleHeader";
import { ChinaGalleryMarquee } from "@/components/pixel/ChinaGalleryMarquee";
import { MAIN_PAGE_IMAGES, resolveTourImage } from "@/lib/mainPictures";
import type { FaqDto, TestimonialDto, TourDto } from "@/lib/types";

const HERO_BADGES = [
  "Продуманный сервис: местные гиды и проверенное жильё",
  "Безопасное бронирование по минимальной предоплате",
  "Максимальная забота: полное сопровождение",
  "от ≈ 115 000 ₽: стоимость тура за 1 человека",
] as const;

const ADVANTAGES = [
  { title: "4 года", text: "возим путешественников в путешествия по Китаю", accent: true },
  { title: "Гарантия цены", text: "никаких скрытых платежей, всё строго по договору без сюрпризов", accent: false },
  { title: "Полное доверие", text: "вы — проживаете опыт, мы — окружаем вас комфортом и безопасностью", accent: false },
  { title: "Любим то, что делаем", text: "каждый год улучшаем наши программы, собирая обратную связь", accent: false },
] as const;

const INCLUDED = [
  {
    title: "Транспорт",
    text: "Перемещение на микроавтобусах, высокоскоростных поездах или внутренних авиарейсах между городами",
    image: MAIN_PAGE_IMAGES.includedTransport,
  },
  {
    title: "Впечатления",
    text: "Все активности и моменты полного релакса, обзорные экскурсии, проходы без очередей для максимального комфорта",
    image: MAIN_PAGE_IMAGES.includedImpressions,
  },
  {
    title: "Проживание",
    text: "Проживание в современных проверенных отелях, где вас ждёт двухместный номер со всеми удобствами",
    image: MAIN_PAGE_IMAGES.includedStay,
  },
  {
    title: "Организация",
    text: "Сопровождение проф. турлидера 24/7 с момента встречи в аэропорту, который говорит по-китайски и позаботится о вас",
    image: MAIN_PAGE_IMAGES.includedGuide,
  },
] as const;

const BOOKING_STEPS = [
  {
    title: "Заявка",
    text: "Вы сами выбираете ваше путешествие и оставляете контактные данные",
  },
  {
    title: "Всё официально",
    text: "Мы составляем договор и гарантируем, что поездка состоится в соответствии с выбранным маршрутом",
  },
  {
    title: "Предоплата",
    text: "Предоплата всего 20% от стоимости тура, остальное — в первый день тура",
  },
  {
    title: "Чат участников",
    text: "Добавим в чат с другими участниками, поделимся важной информацией и будем ждать встречи!",
  },
] as const;

const DEFAULT_TOUR_SLUGS = ["shanghai-suzhou", "shanghai-avatar", "great-china", "contrasts"] as const;

function TourCard({ tour, index }: { tour: TourDto | undefined; index: number }) {
  const slug = tour?.slug ?? DEFAULT_TOUR_SLUGS[index];
  const title = tour?.title ?? "Авторский тур";
  const description =
    tour?.description ??
    "Маршрут с продуманной программой, комфортным проживанием и сопровождением команды TWU.";

  return (
    <article className="overflow-hidden rounded-[20px] bg-[#f7f7f6] shadow-[0_8px_28px_-12px_rgba(39,48,79,0.12)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          alt=""
          src={resolveTourImage(tour?.image_url, index)}
          className="h-full w-full max-w-none object-cover"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#ec9b74] px-3 py-1 text-[13px] font-bold text-white">
            {tour?.tariff_label ?? "Базовый тариф"}
          </span>
          <span className="rounded-full bg-[#ec9b74] px-3 py-1 text-[13px] font-bold text-white">
            {tour?.duration_days ?? 5} дней
          </span>
        </div>
      </div>
      <div className="space-y-3 p-4 sm:p-5">
        <h3 className="text-[18px] font-bold leading-snug text-[#27304f] sm:text-[20px]">{title}</h3>
        <p className="text-[15px] leading-relaxed text-[#27304f]/85">{description}</p>
        <Link
          href={`/tours/${slug}`}
          className="inline-flex h-11 items-center justify-center rounded-full bg-[#ec9b74] px-6 text-[15px] font-bold text-white transition hover:opacity-95"
        >
          Подробнее
        </Link>
      </div>
    </article>
  );
}

export type MobileHomeProps = {
  tours: TourDto[];
  testimonials: TestimonialDto[];
  faqs: FaqDto[];
};

export function MobileHome({ tours, testimonials, faqs }: MobileHomeProps) {
  return (
    <div className="w-full overflow-x-hidden bg-white text-[#27304f]">
      <div className="twu-header-bar sticky top-0 z-50 bg-white/95 px-3 py-2 shadow-[0_1px_0_rgba(39,48,79,0.06)] backdrop-blur">
        <MainStyleHeader className="w-full" />
      </div>

      {/* Hero */}
      <section id="about" className="relative min-h-[420px] overflow-hidden sm:min-h-[480px]">
        <img alt="" src={MAIN_PAGE_IMAGES.hero} className="absolute inset-0 h-full w-full max-w-none object-cover" />
        <div className="absolute inset-0 bg-[#27304f]/25" />
        <div className="relative flex min-h-[420px] flex-col items-center justify-center px-4 py-16 text-center text-white sm:min-h-[480px] sm:px-6">
          <h1 className="text-[52px] font-bold tracking-[0.12em] sm:text-[72px]">КИТАЙ</h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed sm:text-[18px]">
            <span className="font-bold">5–8–9 дней</span>, до 5 городов в одном авторском туре. Великая Китайская
            стена, Горы Аватара, китайская Венеция, Терракотовая армия
          </p>
          <div className="mt-8 grid w-full max-w-lg grid-cols-1 gap-3 sm:max-w-2xl sm:grid-cols-2">
            {HERO_BADGES.map((label) => (
              <div
                key={label}
                className="rounded-[18px] border border-white/20 bg-[rgba(39,48,79,0.88)] px-4 py-3 text-[14px] font-bold leading-snug sm:text-[15px]"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="mx-auto max-w-2xl px-4 py-10 sm:max-w-3xl sm:px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ADVANTAGES.map(({ title, text, accent }) => (
            <div
              key={title}
              className={`rounded-[18px] px-4 py-4 ${accent ? "bg-[#27304f] text-white" : "bg-[#f7f7f6] text-[#27304f]"}`}
            >
              <p className="text-[16px] font-bold">{title}</p>
              <p className={`mt-2 text-[14px] leading-relaxed ${accent ? "text-white/90" : "text-[#27304f]/85"}`}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-2xl px-4 pb-10 sm:max-w-3xl sm:px-6">
        <h2 className="text-[26px] font-bold leading-tight sm:text-[32px]">Все заботы берём на себя</h2>
        <p className="mt-3 text-[17px] leading-relaxed text-[#27304f]/90 sm:text-[18px]">
          Ваша единственная задача — наслаждаться путешествием!
        </p>
        <div className="mt-4 flex gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <img key={i} alt="" src={MAIN_PAGE_IMAGES.star} className="h-10 w-10 max-w-none sm:h-12 sm:w-12" />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
            <img alt="" src={MAIN_PAGE_IMAGES.aboutCardLeft} className="h-full w-full max-w-none object-cover" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
            <img alt="" src={MAIN_PAGE_IMAGES.aboutCardRight} className="h-full w-full max-w-none object-cover" />
          </div>
        </div>
      </section>

      {/* Tours */}
      <section id="tours" className="mx-auto max-w-2xl px-4 py-10 sm:max-w-3xl sm:px-6">
        <h2 className="text-center text-[24px] font-bold leading-tight sm:text-[28px]">
          4 авторских маршрута — выберите тур, а мы сделаем всё остальное
        </h2>
        <div className="mt-8 space-y-5">
          {[0, 1, 2, 3].map((i) => (
            <TourCard key={i} tour={tours[i]} index={i} />
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-8" aria-label="Фотогалерея Китая">
        <ChinaGalleryMarquee inline />
      </section>

      {/* Guest lead */}
      <section className="mx-auto max-w-2xl px-4 py-6 sm:max-w-3xl sm:px-6">
        <HomeGuestLeadBlock />
      </section>

      {/* Included */}
      <section className="mx-auto max-w-2xl px-4 py-10 sm:max-w-3xl sm:px-6">
        <h2 className="text-center text-[24px] font-bold leading-tight sm:text-[28px]">
          Всё самое главное уже включено в стоимость тура
        </h2>
        <div className="mt-8 space-y-4">
          {INCLUDED.map(({ title, text, image }) => (
            <div key={title} className="overflow-hidden rounded-[14px] bg-[#f7f7f6]">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img alt="" src={image} className="h-full w-full max-w-none object-cover" />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-[18px] font-bold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#27304f]/85">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking */}
      <section className="relative overflow-hidden py-12">
        <img
          alt=""
          src={MAIN_PAGE_IMAGES.bookingBackground}
          className="absolute inset-0 h-full w-full max-w-none object-cover opacity-40 blur-[1px]"
        />
        <div className="absolute inset-0 bg-white/75" />
        <div className="relative mx-auto max-w-2xl px-4 sm:max-w-3xl sm:px-6">
          <h2 className="text-center text-[24px] font-bold leading-tight sm:text-[28px]">
            Как забронировать место в группе?
          </h2>
          <ol className="mt-8 space-y-4">
            {BOOKING_STEPS.map(({ title, text }, i) => (
              <li key={title} className="rounded-[16px] bg-[#27304f] p-5 text-white">
                <div className="mb-2 inline-flex rounded-[12px] border border-white/30 px-3 py-1 text-[14px] font-bold">
                  {i + 1}. {title}
                </div>
                <p className="text-[15px] leading-relaxed text-white/90">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-2xl px-4 py-10 sm:max-w-3xl sm:px-6">
        <h2 className="mb-6 text-center text-[24px] font-bold leading-tight sm:text-[28px]">
          Ответы на популярные вопросы
        </h2>
        <HomeFaqAccordion faqs={faqs} />
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-2xl px-4 pb-12 sm:max-w-3xl sm:px-6">
        <HomeReviewsMobile testimonials={testimonials} />
      </section>
    </div>
  );
}
