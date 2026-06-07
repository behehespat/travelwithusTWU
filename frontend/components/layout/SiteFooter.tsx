import Link from "next/link";

import { MAIN_PAGE_IMAGES } from "@/lib/mainPictures";

const tourLinks = [
  { href: "/tours/shanghai-suzhou", label: "Шанхай - Сучжоу" },
  { href: "/tours/shanghai-avatar", label: "Шанхай и Аватар" },
  { href: "/tours/great-china", label: "Великий Китай" },
  { href: "/tours/contrasts", label: "Контрасты Поднебесной" },
] as const;

const FOOTER_LOGO_WIDTH = 209;
const FOOTER_LOGO_HEIGHT = 214;

export function SiteFooter({ className = "" }: { className?: string }) {
  return (
    <footer className={`text-white ${className}`}>
      <div className="mx-auto max-w-7xl px-8 py-12 sm:px-10 sm:py-14 lg:px-12">
        <div className="flex flex-wrap items-start justify-center gap-x-14 gap-y-12 md:gap-x-16 lg:flex-nowrap lg:items-center lg:justify-between lg:gap-x-10 xl:gap-x-14">
          <div className="flex shrink-0 justify-center sm:justify-start">
            <Link href="/" aria-label="TravelWithUs - на главную">
              <img
                alt=""
                src={MAIN_PAGE_IMAGES.footerLogo}
                width={FOOTER_LOGO_WIDTH}
                height={FOOTER_LOGO_HEIGHT}
                className="h-auto w-[88px] sm:w-[100px] lg:w-[112px] xl:w-[120px]"
              />
            </Link>
          </div>

          <div className="w-[min(100%,280px)] shrink-0 text-left">
            <p className="text-[18px] font-bold leading-snug lg:text-[20px]">
              <span className="text-white">TWU</span>
              <span className="text-white/85"> - туры в Китай</span>
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-white/75">
              Авторские маршруты, сопровождение и спокойная организация: вы выбираете направление - мы берём заботы на себя.
            </p>
          </div>

          <div className="w-[min(100%,200px)] shrink-0 text-left">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#ec9b74]">
              Маршруты
            </p>
            <ul className="mt-3 space-y-2 text-[14px] font-medium text-white/90">
              {tourLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-[#ec9b74] hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-[min(100%,200px)] shrink-0 text-left">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#ec9b74]">
              Сервис
            </p>
            <ul className="mt-3 space-y-2 text-[14px] font-medium text-white/90">
              <li>
                <Link href="/phrasebook" className="hover:text-[#ec9b74] hover:underline">
                  Разговорник
                </Link>
              </li>
              <li>
                <Link href="/reminder" className="hover:text-[#ec9b74] hover:underline">
                  Напоминания в поездке
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#ec9b74] hover:underline">
                  Войти
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-[#ec9b74] hover:underline">
                  Личный кабинет
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-[min(100%,220px)] shrink-0 text-left">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#ec9b74]">
              Контакты
            </p>
            <ul className="mt-3 space-y-2 text-[14px] text-white/85">
              <li>
                <a href="mailto:hello@travelwithus.example" className="hover:text-[#ec9b74] hover:underline">
                  hello@travelwithus.example
                </a>
              </li>
              <li>
                <a
                  href="https://vk.com/travelwithustwu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ec9b74] hover:underline"
                >
                  ВКонтакте
                </a>
              </li>
              <li>
                <Link href="/#tours" className="hover:text-[#ec9b74] hover:underline">
                  Все туры на главной
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-8 py-6 text-left text-[12px] text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12 lg:text-[13px]">
          <p>© {new Date().getFullYear()} TravelWithUs. Все права защищены.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-[#ec9b74] hover:underline">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="hover:text-[#ec9b74] hover:underline">
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
