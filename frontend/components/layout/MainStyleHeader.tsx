import Link from "next/link";

import { HeaderBurger } from "@/components/layout/HeaderBurger";
import { MAIN_PAGE_IMAGES } from "@/lib/mainPictures";

type MainStyleHeaderProps = {
  className?: string;
};

/**
 * Шапка: градиент, логотип и название; навигация и аккаунт - в бургер-меню.
 */
export function MainStyleHeader({ className = "" }: MainStyleHeaderProps) {
  return (
    <header
      className={`pointer-events-auto relative z-[100] flex min-h-[62px] min-w-0 items-center justify-between gap-3 rounded-[17px] bg-gradient-to-r from-[#27304f] from-[62.981%] to-[#ec9b74] to-[99.038%] px-4 py-2 sm:gap-5 sm:px-6 md:px-8 ${className}`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
        <Link href="/" className="relative block h-[42px] w-[40px] shrink-0 overflow-hidden sm:h-[50px] sm:w-[49px]">
          <img
            alt=""
            src={MAIN_PAGE_IMAGES.logo}
            className="pointer-events-none size-full max-w-none object-contain"
          />
        </Link>
        <Link href="/" className="truncate text-[18px] font-bold text-white hover:opacity-90 sm:text-[24px]">
          TravelWithUs
        </Link>
      </div>

      <HeaderBurger />
    </header>
  );
}
