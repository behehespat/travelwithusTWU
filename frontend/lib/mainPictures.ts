/**
 * Локальные ассеты главной страницы (`public/main-pictures/`).
 * Имена файлов - как в экспорте из Figma.
 */
const BASE = "/main-pictures";

export function mainPicture(fileName: string): string {
  return `${BASE}/${encodeURIComponent(fileName)}`;
}

/** Картинки макета main (не туры). */
export const MAIN_PAGE_IMAGES = {
  hero: mainPicture("image 109.png"),
  star: mainPicture("Group 19.png"),
  aboutCardLeft: mainPicture("image 110.png"),
  aboutCardRight: mainPicture("image 111.png"),
  includedTransport: mainPicture("image 117.png"),
  includedImpressions: mainPicture("image 118.png"),
  includedStay: mainPicture("image 119.png"),
  includedGuide: mainPicture("image 120.png"),
  bookingBackground: mainPicture("p1140239 1.png"),
  bookingArrowCenter: mainPicture("Right 2.png"),
  bookingArrowRight: mainPicture("Right 4.png"),
  bookingArrowLeft: mainPicture("Right 3.png"),
  logo: mainPicture("аа 1.png"),
  /** Логотип для подвала (209×214), не масштабировать выше натурального размера. */
  footerLogo: mainPicture("аа 2.png"),
  vkReview0: mainPicture("VK Circled.png"),
  vkReview1: mainPicture("VK Circled-1.png"),
  vkReview2: mainPicture("VK Circled-2.png"),
  leadSection: mainPicture("image 116.png"),
} as const;

/**
 * Фото карточек туров на главной (в main-pictures не выгружались - берём из main-slider).
 * Порядок: t0…t3 как в API (shanghai-suzhou, shanghai-avatar, great-china, contrasts).
 */
export const TOUR_CARD_FALLBACK_IMAGES = [
  "/main-slider/2db74eac499e5f20e615a2ad1217eb40.jpg",
  "/main-slider/93fd31c5b9ccc8aa8c96233ff208fd72.jpg",
  "/main-slider/f839bd446b760fab027bb93bc414b6d8.jpg",
  "/main-slider/59cb1804b8c18b58bd2171fcc1e96a26.jpg",
] as const;

export function resolveTourImage(apiUrl: string | undefined, tourIndex: number): string {
  const fallback = TOUR_CARD_FALLBACK_IMAGES[tourIndex] ?? TOUR_CARD_FALLBACK_IMAGES[0];
  if (!apiUrl || apiUrl.includes("figma.com")) return fallback;
  return apiUrl;
}
