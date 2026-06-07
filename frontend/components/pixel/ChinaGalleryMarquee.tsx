import type { CSSProperties } from "react";

/**
 * Локальные фото из `public/main-slider/` (порядок - как в папке, по имени файла).
 * Плитка макета ~260×416; `object-cover` + 2× размер по ширине даёт чёткость на retina.
 */
const MAIN_SLIDER_IMAGES = [
  "/main-slider/0f0088ad8e9c46c7b22a1beb015c4dcc.jpg",
  "/main-slider/11127e7b9cbe4d39c06b8432a0487b86.jpg",
  "/main-slider/2691130b0b27fec51b4bb305fa70088e.jpg",
  "/main-slider/2db74eac499e5f20e615a2ad1217eb40.jpg",
  "/main-slider/bigpagoda.webp",
  "/main-slider/82c13415f895a600059d24b15ac39a4c.jpg",
  "/main-slider/8a7bb1da3ebd9b5cef7ad49d87d4e9c4.jpg",
  "/main-slider/93fd31c5b9ccc8aa8c96233ff208fd72.jpg",
  "/main-slider/b587eaf9e21d81f155261d9cd52389ec.jpg",
  "/main-slider/b9e426653d5d5e79ccb1bf13d6a2c331.jpg",
  "/main-slider/ec39428874a7e39e3c31ff3652bdd5f5.jpg",
  "/main-slider/f839bd446b760fab027bb93bc414b6d8.jpg",
  "/main-slider/fa9f4d398c700c99ed2aeae9440a2acb.jpg",
  "/main-slider/GBA-Deepseek-768x480.jpg",
  "/main-slider/istockphoto-1061617056-640x640.jpg",
  "/main-slider/istockphoto-1163359555-612x612.jpg",
  "/main-slider/istockphoto-2156082951-612x612.jpg",
  "/main-slider/Paifang,_Nanhai_Guanyin_Temple,_Foshan,_Guangdong,_China,_picture1.jpg",
] as const;

const CHINA_SLIDE_COUNT = MAIN_SLIDER_IMAGES.length;
/** ~5 c на кадр, плавная прокрутка */
const MARQUEE_DURATION_SEC = Math.max(72, Math.round(CHINA_SLIDE_COUNT * 5.2));

const GAP_PX = 64;
/** Чуть крупнее прежних 215×344, то же соотношение сторон. */
const CARD_W = 260;
const CARD_H = 416;

function SlideStrip({ stripId }: { stripId: "a" | "b" }) {
  return (
    <div className="flex shrink-0" style={{ gap: GAP_PX, paddingRight: GAP_PX }}>
      {MAIN_SLIDER_IMAGES.map((src, i) => (
        <div
          key={`${stripId}-${i}`}
          className="shrink-0 overflow-hidden rounded-[20px] bg-[#f7f7f6]"
          style={{ width: CARD_W, height: CARD_H }}
        >
          <img
            alt=""
            src={encodeURI(src)}
            width={520}
            height={832}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Бесконечная горизонтальная прокрутка на месте шести серых карточек макета.
 */
export function ChinaGalleryMarquee() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden"
      style={
        {
          top: "calc(3977px - var(--twu-lead-gap, 0px))",
          height: CARD_H,
          ["--china-slide-count" as string]: CHINA_SLIDE_COUNT,
          ["--china-marquee-duration" as string]: `${MARQUEE_DURATION_SEC}s`,
          ["--china-card-w" as string]: `${CARD_W}px`,
          ["--china-card-gap" as string]: `${GAP_PX}px`,
        } as CSSProperties
      }
      aria-hidden
      data-name="china-gallery-marquee"
    >
      <div className="china-marquee-track flex w-max will-change-transform">
        <SlideStrip stripId="a" />
        <SlideStrip stripId="b" />
      </div>
    </div>
  );
}
