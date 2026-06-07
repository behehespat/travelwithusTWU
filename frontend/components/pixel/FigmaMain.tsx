import Link from "next/link";
import type { FaqDto, TestimonialDto, TourDto } from "@/lib/types";
import { MainStyleHeader } from "@/components/layout/MainStyleHeader";
import { ChinaGalleryMarquee } from "./ChinaGalleryMarquee";
import { FaqAccordionPixel } from "./FaqAccordionPixel";
import { GuestLeadSection } from "./GuestLeadSection";
import { HomeReviewsSection } from "./HomeReviewsSection";
import { MAIN_PAGE_IMAGES, resolveTourImage } from "@/lib/mainPictures";
import { FIGMA_MAIN_HEIGHT } from "@/lib/figmaLayout";

export type FigmaMainProps = {
  tours: TourDto[];
  testimonials: TestimonialDto[];
  faqs: FaqDto[];
};

export function FigmaMain({ tours, testimonials, faqs }: FigmaMainProps) {
  const t0 = tours[0];
  const t1 = tours[1];
  const t2 = tours[2];
  const t3 = tours[3];
  const starLefts = [197, 263, 327, 391, 455] as const;

  return (
    <div
      className="relative w-[1920px] shrink-0 bg-white font-sans"
      style={{ height: `calc(${FIGMA_MAIN_HEIGHT}px - var(--twu-lead-gap, 0px))` }}
      data-node-id="96:61"
      data-name="main"
    >
      <div id="about" className="absolute blur-[2px] h-[797px] left-0 top-[-1px] w-[1920px]" data-node-id="101:6" data-name="image 109">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={MAIN_PAGE_IMAGES.hero} />
        </div>
      </div>
      <MainStyleHeader className="absolute left-[175px] top-[6px] z-[100] w-[1569px]" />
      <p className="absolute font-bold leading-[normal] left-[673px] not-italic text-[128px] text-white top-[146px] tracking-[37.12px] whitespace-nowrap" data-node-id="101:8">
        КИТАЙ
      </p>
      <p className="-translate-x-1/2 absolute font-bold leading-[0] left-[959.5px] not-italic text-[24px] text-center text-white top-[355px] w-[725px]" data-node-id="101:10">
        <span className="leading-[normal]">5-8-9 дней</span>
        <span className="leading-[normal]">, до 5 городов в одном авторском туре. Великая Китайская стена, Горы Аватара, китайская Венеция, Терракотовая армия</span>
      </p>
      <div id="advantages" className="absolute bg-[#27304f] h-[162px] left-[197px] rounded-[26px] top-[891px] w-[365px]" data-node-id="103:22" />
      <div className="absolute bg-[#f7f7f6] h-[162px] left-[970px] rounded-[26px] top-[891px] w-[365px]" data-node-id="103:25" />
      <div className="absolute bg-[#f7f7f6] h-[162px] left-[1357px] rounded-[26px] top-[891px] w-[365px]" data-node-id="103:27" />
      <div className="absolute bg-[#f7f7f6] h-[162px] left-[583px] rounded-[26px] top-[891px] w-[365px]" data-node-id="103:23" />
      <p className="absolute font-bold leading-[normal] left-[197px] not-italic text-[#27304f] text-[48px] top-[1146px] w-[551px]" data-node-id="103:29">
        Все заботы берем на себя
      </p>
      <div className="absolute font-normal leading-[0] left-[197px] not-italic text-[32px] text-black top-[1284px] whitespace-nowrap" data-node-id="103:30">
        <p className="leading-[normal] mb-0">Ваша единственная задача -</p>
        <p className="leading-[normal]">наслаждаться путешествием!</p>
      </div>
      <div className="absolute contents left-[197px] top-[1385px]" data-node-id="105:55">
        {starLefts.map((left, index) => (
          <div
            key={left}
            className="absolute size-[64px] top-[1385px] overflow-hidden"
            style={{ left }}
            data-node-id={index === 0 ? "104:31" : undefined}
            data-name="Star"
          >
            <img
              alt=""
              className="pointer-events-none h-full w-[322px] max-w-none"
              style={{ marginLeft: -64 * index }}
              src={MAIN_PAGE_IMAGES.star}
            />
          </div>
        ))}
      </div>
      <div className="absolute h-[464px] left-[960px] rounded-[28px] top-[1097px] w-[365px]" data-node-id="105:51" data-name="image 110">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px]">
          <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={MAIN_PAGE_IMAGES.aboutCardLeft} />
        </div>
      </div>
      <div className="absolute h-[463px] left-[1357px] rounded-[28px] top-[1098px] w-[365px]" data-node-id="105:57" data-name="image 111">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px]">
          <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={MAIN_PAGE_IMAGES.aboutCardRight} />
        </div>
      </div>
      <p
        id="tours"
        className="-translate-x-1/2 absolute font-bold leading-[normal] left-[950px] not-italic text-[#27304f] text-[48px] text-center top-[1656px] w-[1064px]"
        data-node-id="105:59"
      >
        4 авторских маршрута - выберите тур, а мы сделаем все остальное
      </p>
      <div className="-translate-x-1/2 absolute font-bold leading-[0] left-[955px] not-italic text-[#27304f] text-[48px] text-center top-[calc(4427px-var(--twu-lead-gap,0px))] w-[1064px] whitespace-pre-wrap" data-node-id="109:151">
        <p className="leading-[normal] mb-0">Все самое главное</p>
        <p className="leading-[normal]">{` уже включено в стоимость тура`}</p>
      </div>
      <div className="absolute bg-[#f7f7f6] h-[514px] left-[179px] rounded-[36.898px] top-[1840px] w-[761px]" data-node-id="107:61" />
      <div className="absolute bg-[#f7f7f6] h-[514px] left-[980px] rounded-[36.898px] top-[1840px] w-[761px]" data-node-id="107:62" />
      <div className="absolute h-[270.583px] left-[232.3px] rounded-[10.249px] top-[1866.65px] w-[652.883px]" data-node-id="108:68" data-name="image 112">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10.249px]">
          <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={resolveTourImage(t0?.image_url, 0)} />
        </div>
      </div>
      <div className="absolute bg-[#ec9b74] h-[32.798px] left-[245.62px] rounded-[70.72px] top-[1881px] w-[170.139px]" data-node-id="108:70" />
      <div className="absolute bg-[#ec9b74] h-[32.798px] left-[426.01px] rounded-[70.72px] top-[1881px] w-[95.319px]" data-node-id="108:72" />
      <p className="-translate-x-1/2 absolute font-bold leading-[normal] left-[473.53px] not-italic text-[16.399px] text-center text-white top-[1885.1px] whitespace-nowrap" data-node-id="108:74">
        {t0?.duration_days ?? 5} дней
      </p>
      <p className="-translate-x-1/2 absolute font-bold leading-[normal] left-[330.74px] not-italic text-[16.399px] text-center text-white top-[1885.1px] whitespace-nowrap" data-node-id="108:75">
        {t0?.tariff_label ?? "Базовый тариф"}
      </p>
      <p className="-translate-x-1/2 absolute font-bold leading-[normal] left-[494.3px] not-italic text-[#27304f] text-[24.598px] text-center top-[2156.7px] whitespace-nowrap" data-node-id="108:76">
        {t0?.title ?? "Китай: Шанхай - Сучжоу, сады и футуристика"}
      </p>
      <p className="absolute font-normal leading-[normal] left-[232.3px] not-italic text-[#27304f] text-[16.399px] top-[2192.58px] w-[652.883px]" data-node-id="108:77">
        {t0?.description ??
          "Мягкое знакомство с Китаем через его сердце - Шанхай. Сбалансированная программа с прогулками по центру Шанхая, знакомством с соседним городом Сучжоу - его садом и китайскими традиционными постройками"}
      </p>
      <p className="-translate-x-1/2 absolute font-bold leading-[normal] left-[1316.29px] not-italic text-[#27304f] text-[24.598px] text-center top-[2156.7px] whitespace-nowrap" data-node-id="109:116">
        {t1?.title ?? "Шанхайские небоскребы и парящие горы Китая"}
      </p>
      <p className="absolute font-normal leading-[normal] left-[1033.79px] not-italic text-[#27304f] text-[16.399px] top-[2192.58px] w-[652.883px]" data-node-id="109:117">
        {t1?.description ??
          "Тур, который удивляет, открывая новые горизонты. Здесь вы столкнетесь с двумя гранями Китая: знакомым Шанхаем с его небоскребами и загадочной природой чарующих Гор Аватар"}
      </p>
      <div className="absolute h-[270.583px] left-[1033.79px] rounded-[10.249px] top-[1866.65px] w-[652.883px]" data-node-id="109:90" data-name="image 113">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[10.249px]">
          <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={resolveTourImage(t1?.image_url, 1)} />
        </div>
      </div>
      <div className="absolute bg-[#ec9b74] h-[32.798px] left-[1048.14px] rounded-[70.72px] top-[1881px] w-[170.139px]" data-node-id="109:92" />
      <div className="absolute bg-[#ec9b74] h-[32.798px] left-[1228.53px] rounded-[70.72px] top-[1881px] w-[95.319px]" data-node-id="109:93" />
      <p className="-translate-x-1/2 absolute font-bold leading-[normal] left-[1276.06px] not-italic text-[16.399px] text-center text-white top-[1885.1px] whitespace-nowrap" data-node-id="109:94">
        {t1?.duration_days ?? 5} дней
      </p>
      <p className="-translate-x-1/2 absolute font-bold leading-[normal] left-[1133.27px] not-italic text-[16.399px] text-center text-white top-[1885.1px] whitespace-nowrap" data-node-id="109:95">
        {t1?.tariff_label ?? "Базовый тариф"}
      </p>
      <div className="absolute contents left-[980px] top-[2464px]" data-node-id="150:221">
        <div className="absolute bg-[#f7f7f6] h-[514px] left-[980px] rounded-[36.898px] top-[2464px] w-[761px]" data-node-id="107:65" />
        <p className="-translate-x-1/2 absolute font-bold h-[35.791px] leading-[normal] left-[1176.8px] not-italic text-[#27304f] text-[24.598px] text-center top-[2773.77px] w-[287px]" data-node-id="109:126">
          {t3?.title ?? "Контрасты Поднебесной"}
        </p>
        <p className="absolute font-normal h-[68.6px] leading-[normal] left-[1033.3px] not-italic text-[#27304f] text-[16.399px] top-[2809.44px] w-[652.883px]" data-node-id="109:127">
          {t3?.description ??
            "Сочетание контрастов Китая и легендарных точек: удивительная природа, аутентичная архитектура и современные мегаполисы. Исследуем горы Яншо и Чжанцзяцзе, посещаем Пекин и Шанхай, знакомимся с китайской Венецией"}
        </p>
        <div className="absolute h-[269.013px] left-[1033.3px] rounded-[10.249px] top-[2485.4px] w-[652.883px]" data-node-id="109:104" data-name="image 114">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10.249px] size-full" src={resolveTourImage(t3?.image_url, 3)} />
        </div>
        <div className="absolute bg-[#ec9b74] h-[32.608px] left-[1047.65px] rounded-[70.72px] top-[2499.66px] w-[170.139px]" data-node-id="109:105" />
        <div className="absolute bg-[#ec9b74] h-[32.608px] left-[1228.04px] rounded-[70.72px] top-[2499.66px] w-[95.319px]" data-node-id="109:106" />
        <p className="-translate-x-1/2 absolute font-bold h-[23.861px] leading-[normal] left-[1275.56px] not-italic text-[16.399px] text-center text-white top-[2503.74px] w-[52px]" data-node-id="109:107">
          {t3?.duration_days ?? 9} дней
        </p>
        <p className="-translate-x-1/2 absolute font-bold h-[23.861px] leading-[normal] left-[1132.77px] not-italic text-[16.399px] text-center text-white top-[2503.74px] w-[119px]" data-node-id="109:108">
          {t3?.tariff_label ?? "Базовый тариф"}
        </p>
      </div>
      <div className="absolute contents left-[179px] top-[2464px]" data-node-id="150:220">
        <div className="absolute bg-[#f7f7f6] h-[509px] left-[179px] rounded-[36.898px] top-[2464px] w-[761px]" data-node-id="107:64" />
        <p className="-translate-x-1/2 absolute font-bold leading-[normal] left-[319.8px] not-italic text-[#27304f] text-[24.598px] text-center top-[2776px] whitespace-nowrap" data-node-id="109:138">
          {t2?.title ?? "Великий Китай"}
        </p>
        <p className="absolute font-normal leading-[normal] left-[232.3px] not-italic text-[#27304f] text-[16.399px] top-[2811.87px] w-[652.883px]" data-node-id="109:139">
          {t2?.description ??
            "Откройте мощь Китая в одном туре: от чуда света до Всемирного наследия ЮНЕСКО и природных красот. Горы Аватара, Великая Китайская стена и Терракотовая армия, а также футуристичные улицы Шанхая"}
        </p>
        <div className="absolute h-[270.583px] left-[232.3px] rounded-[10.249px] top-[2485.94px] w-[652.883px]" data-node-id="109:110" data-name="image 115">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10.249px] size-full" src={resolveTourImage(t2?.image_url, 2)} />
        </div>
        <div className="absolute bg-[#ec9b74] h-[32.798px] left-[246.65px] rounded-[70.72px] top-[2500.29px] w-[170.139px]" data-node-id="109:111" />
        <div className="absolute bg-[#ec9b74] h-[32.798px] left-[427.03px] rounded-[70.72px] top-[2500.29px] w-[95.319px]" data-node-id="109:112" />
        <p className="-translate-x-1/2 absolute font-bold leading-[normal] left-[474.56px] not-italic text-[16.399px] text-center text-white top-[2504.39px] whitespace-nowrap" data-node-id="109:113">
          {t2?.duration_days ?? 8} дней
        </p>
        <p className="-translate-x-1/2 absolute font-bold leading-[normal] left-[331.77px] not-italic text-[16.399px] text-center text-white top-[2504.39px] whitespace-nowrap" data-node-id="109:114">
          {t2?.tariff_label ?? "Базовый тариф"}
        </p>
      </div>
      <p className="absolute font-normal leading-[normal] left-[222px] not-italic text-[20.499px] text-white top-[951px] w-[251px]" data-node-id="111:177">
        возим путешественников в путешествия по Китаю
      </p>
      <p className="absolute font-normal leading-[normal] left-[603px] not-italic text-[#27304f] text-[20.499px] top-[951px] w-[290px]" data-node-id="111:178">
        никаких скрытых платежей, все строго по договору без сюрпризов
      </p>
      <p className="absolute font-normal leading-[normal] left-[987px] not-italic text-[#27304f] text-[20.499px] top-[951px] w-[291px]" data-node-id="111:180">
        вы - проживаете опыт, мы - окружаем вас комфортом и безопасностью
      </p>
      <p className="absolute font-normal leading-[normal] left-[1384px] not-italic text-[#27304f] text-[20.499px] top-[951px] w-[251px]" data-node-id="111:182">
        каждый год улучшаем наши программы, собирая обратную связь
      </p>
      <p className="absolute font-bold leading-[normal] left-[222px] not-italic text-[20.499px] text-white top-[911px] whitespace-nowrap" data-node-id="111:184">
        4 года
      </p>
      <p className="absolute font-bold leading-[normal] left-[603px] not-italic text-[#27304f] text-[20.499px] top-[911px] whitespace-nowrap" data-node-id="111:185">
        Гарантия цены
      </p>
      <p className="absolute font-bold leading-[normal] left-[987px] not-italic text-[#27304f] text-[20.499px] top-[911px] whitespace-nowrap" data-node-id="111:187">
        Полное доверие
      </p>
      <p className="absolute font-bold leading-[normal] left-[1384px] not-italic text-[#27304f] text-[20.499px] top-[911px] whitespace-nowrap" data-node-id="111:189">
        Любим то, что делаем
      </p>
      <div className="absolute bg-[#f7f7f6] h-[202px] left-[199px] rounded-[10px] top-[calc(4612px-var(--twu-lead-gap,0px))] w-[745px]" data-node-id="111:205" />
      <div className="absolute bg-[#f7f7f6] h-[202px] left-[199px] rounded-[10px] top-[calc(4843px-var(--twu-lead-gap,0px))] w-[745px]" data-node-id="111:208" />
      <div className="absolute h-[153.633px] left-[218px] rounded-[20px] top-[calc(4636px-var(--twu-lead-gap,0px))] w-[274px]" data-node-id="111:213" data-name="image 117">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={MAIN_PAGE_IMAGES.includedTransport} />
      </div>
      <p className="absolute font-bold leading-[normal] left-[513px] not-italic text-[#27304f] text-[24px] top-[calc(4636px-var(--twu-lead-gap,0px))] whitespace-nowrap" data-node-id="111:215">
        Транспорт
      </p>
      <p className="absolute font-normal leading-[normal] left-[513px] not-italic text-[20px] text-black top-[calc(4671px-var(--twu-lead-gap,0px))] w-[320px]" data-node-id="111:216">
        Перемещение на микроавтобусах, высокоскоростных поездах или внутренних авиарейсах между городами
      </p>
      <div className="absolute h-[153.633px] left-[218px] rounded-[20px] top-[calc(4861px-var(--twu-lead-gap,0px))] w-[274px]" data-node-id="111:217" data-name="image 118">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={MAIN_PAGE_IMAGES.includedImpressions} />
      </div>
      <p className="absolute font-bold leading-[normal] left-[513px] not-italic text-[#27304f] text-[24px] top-[calc(4861px-var(--twu-lead-gap,0px))] whitespace-nowrap" data-node-id="111:218">
        Впечатления
      </p>
      <p className="absolute font-normal leading-[normal] left-[513px] not-italic text-[20px] text-black top-[calc(4896px-var(--twu-lead-gap,0px))] w-[320px]" data-node-id="111:219">
        Все активности и моменты полного релакса, обзорные экскурсии, проходы без очередей для максимального комфорта
      </p>
      <div className="absolute bg-[#f7f7f6] h-[202px] left-[965px] rounded-[10px] top-[calc(4612px-var(--twu-lead-gap,0px))] w-[745px]" data-node-id="111:221" />
      <div className="absolute bg-[#f7f7f6] h-[202px] left-[965px] rounded-[10px] top-[calc(4843px-var(--twu-lead-gap,0px))] w-[745px]" data-node-id="111:222" />
      <div className="absolute h-[153.633px] left-[984px] rounded-[20px] top-[calc(4636px-var(--twu-lead-gap,0px))] w-[274px]" data-node-id="111:223" data-name="image 119">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={MAIN_PAGE_IMAGES.includedStay} />
      </div>
      <p className="absolute font-bold leading-[normal] left-[1279px] not-italic text-[#27304f] text-[24px] top-[calc(4636px-var(--twu-lead-gap,0px))] whitespace-nowrap" data-node-id="111:224">
        Проживание
      </p>
      <p className="absolute font-normal leading-[normal] left-[1279px] not-italic text-[20px] text-black top-[calc(4671px-var(--twu-lead-gap,0px))] w-[320px]" data-node-id="111:225">
        Проживание в современных проверенных отелях, где вас ждет двухместный номер со всеми удобствами
      </p>
      <div className="absolute h-[153.633px] left-[984px] rounded-[20px] top-[calc(4861px-var(--twu-lead-gap,0px))] w-[274px]" data-node-id="111:226" data-name="image 120">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={MAIN_PAGE_IMAGES.includedGuide} />
      </div>
      <p className="absolute font-bold leading-[normal] left-[1279px] not-italic text-[#27304f] text-[24px] top-[calc(4861px-var(--twu-lead-gap,0px))] whitespace-nowrap" data-node-id="111:227">
        Организация
      </p>
      <p className="absolute font-normal leading-[normal] left-[1279px] not-italic text-[20px] text-black top-[calc(4896px-var(--twu-lead-gap,0px))] w-[320px]" data-node-id="111:228">
        Сопровождение проф. турлидера 24/7 с момента встречи в аэропорту, который говорит по-китайски и позаботится о вас
      </p>
      <div className="-translate-x-1/2 absolute font-bold leading-[0] left-[959.5px] not-italic text-[#27304f] text-[48px] text-center top-[calc(5990px-var(--twu-lead-gap,0px))] w-[557px]" data-node-id="112:274">
        <p className="leading-[normal] mb-0">Ответы на популярные</p>
        <p className="leading-[normal]">вопросы</p>
      </div>
      <FaqAccordionPixel faqs={faqs} />
      <HomeReviewsSection testimonials={testimonials} />
      <div className="absolute contents left-0 top-[calc(5045px-var(--twu-lead-gap,0px))]" data-node-id="181:240">
        <div className="absolute blur-[2px] h-[792px] left-0 top-[calc(5045px-var(--twu-lead-gap,0px))] w-[1920px]" data-node-id="111:239" data-name="p1140239 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={MAIN_PAGE_IMAGES.bookingBackground} />
          </div>
        </div>
        <div className="absolute bg-[#27304f] h-[387px] left-[206px] top-[calc(5310px-var(--twu-lead-gap,0px))] w-[360px]" data-node-id="111:240" />
        <div className="absolute bg-[#27304f] h-[387px] left-[1373px] top-[calc(5310px-var(--twu-lead-gap,0px))] w-[360px]" data-node-id="111:245" />
        <div className="absolute bg-[#27304f] h-[387px] left-[984px] top-[calc(5310px-var(--twu-lead-gap,0px))] w-[360px]" data-node-id="111:243" />
        <div className="absolute bg-[#27304f] h-[387px] left-[595px] top-[calc(5310px-var(--twu-lead-gap,0px))] w-[360px]" data-node-id="111:241" />
        <div className="-translate-x-1/2 absolute font-bold leading-[0] left-[929px] not-italic text-[#27304f] text-[48px] text-center top-[calc(5109px-var(--twu-lead-gap,0px))] w-[1064px]" data-node-id="111:247">
          <p className="leading-[normal] mb-0">Как забронировать место</p>
          <p className="leading-[normal]">в группе?</p>
        </div>
        <div className="absolute bg-[#27304f] border border-solid border-white h-[57px] left-[312px] rounded-[20px] top-[calc(5337px-var(--twu-lead-gap,0px))] w-[147px]" data-node-id="111:249" />
        <div className="absolute bg-[#27304f] border border-solid border-white h-[57px] left-[660px] rounded-[20px] top-[calc(5337px-var(--twu-lead-gap,0px))] w-[229px]" data-node-id="111:250" />
        <div className="absolute bg-[#27304f] border border-solid border-white h-[57px] left-[1072px] rounded-[20px] top-[calc(5337px-var(--twu-lead-gap,0px))] w-[186px]" data-node-id="111:252" />
        <div className="absolute bg-[#27304f] border border-solid border-white h-[57px] left-[1444px] rounded-[20px] top-[calc(5337px-var(--twu-lead-gap,0px))] w-[218px]" data-node-id="111:254" />
        <p className="-translate-x-1/2 absolute font-normal leading-[normal] left-[386px] not-italic text-[24px] text-center text-white top-[calc(5349px-var(--twu-lead-gap,0px))] whitespace-nowrap" data-node-id="111:256">
          Заявка
        </p>
        <p className="-translate-x-1/2 absolute font-normal leading-[normal] left-[775px] not-italic text-[24px] text-center text-white top-[calc(5349px-var(--twu-lead-gap,0px))] whitespace-nowrap" data-node-id="111:257">
          Все официально
        </p>
        <p className="-translate-x-1/2 absolute font-normal leading-[normal] left-[1164.5px] not-italic text-[24px] text-center text-white top-[calc(5349px-var(--twu-lead-gap,0px))] whitespace-nowrap" data-node-id="111:259">
          Предоплата
        </p>
        <p className="-translate-x-1/2 absolute font-normal leading-[normal] left-[1553px] not-italic text-[24px] text-center text-white top-[calc(5349px-var(--twu-lead-gap,0px))] whitespace-nowrap" data-node-id="111:261">
          Чат участников
        </p>
        <p className="-translate-x-1/2 absolute font-normal leading-[normal] left-[386px] not-italic text-[24px] text-center text-white top-[calc(5525px-var(--twu-lead-gap,0px))] w-[292px]" data-node-id="111:263">
          Вы сами выбираете ваше путешествие и оставляете контактные данные
        </p>
        <p className="-translate-x-1/2 absolute font-normal leading-[normal] left-[775px] not-italic text-[24px] text-center text-white top-[calc(5525px-var(--twu-lead-gap,0px))] w-[292px]" data-node-id="111:264">
          Мы составляем договор и гарантируем, что поездка состоится в соответсвии с выбранным маршрутом
        </p>
        <p className="-translate-x-1/2 absolute font-normal leading-[normal] left-[1164.5px] not-italic text-[24px] text-center text-white top-[calc(5525px-var(--twu-lead-gap,0px))] w-[305px]" data-node-id="111:266">
          Предоплата всего 20% от стоимости тура, остальное - в первый день тура
        </p>
        <p className="-translate-x-1/2 absolute font-normal leading-[normal] left-[1552.5px] not-italic text-[24px] text-center text-white top-[calc(5525px-var(--twu-lead-gap,0px))] w-[305px]" data-node-id="111:268">
          Добавим в чат с другими участниками, поделимся важной информацией и будем ждать встречи!
        </p>
      </div>
      <div className="absolute contents left-[1439.42px] top-[538px]" data-node-id="150:234">
        <div className="absolute bg-[rgba(39,48,79,0.85)] border-[0.17px] border-solid border-white h-[114px] left-[1439.42px] rounded-[32.328px] top-[538px] w-[427.075px]" data-node-id="101:14" />
        <p className="-translate-x-1/2 absolute font-bold h-[90.14px] leading-[normal] left-[1652.3px] not-italic text-[27.224px] text-center text-white top-[549.93px] w-[384.419px]" data-node-id="113:323">
          от ≈ 115 000 ₽:
          <br aria-hidden="true" />
          стоимость тура за 1 человека
        </p>
      </div>
      <div className="absolute contents left-[508.7px] top-[538px]" data-node-id="150:235">
        <div className="absolute bg-[rgba(39,48,79,0.85)] border-[0.17px] border-solid border-white h-[114px] left-[508.7px] rounded-[32.328px] top-[538px] w-[420.269px]" data-node-id="101:12" />
        <p className="-translate-x-1/2 absolute font-bold h-[90.179px] leading-[normal] left-[724.79px] not-italic text-[27.224px] text-center text-white top-[555.01px] w-[381.134px]" data-node-id="113:324">
          Безопасное бронирование
          <br aria-hidden="true" />
          по минимальной предоплате
        </p>
      </div>
      <div className="absolute contents left-[51px] top-[538px]" data-node-id="150:236">
        <div className="absolute bg-[rgba(39,48,79,0.85)] border-[0.17px] border-solid border-white h-[114px] left-[51px] rounded-[32.328px] top-[538px] w-[420.269px]" data-node-id="101:18" />
        <p className="-translate-x-1/2 absolute font-bold h-[90.179px] leading-[normal] left-[261.13px] not-italic text-[27.224px] text-center text-white top-[555.01px] w-[420.269px]" data-node-id="113:326">
          Продуманный сервис: местные гиды и проверенное жилье
        </p>
      </div>
      <div className="absolute contents left-[966.4px] top-[538px]" data-node-id="150:237">
        <div className="absolute bg-[rgba(39,48,79,0.85)] border-[0.17px] border-solid border-white h-[114px] left-[973.21px] rounded-[32.328px] top-[538px] w-[420.269px]" data-node-id="101:16" />
        <p className="-translate-x-1/2 absolute font-bold h-[90.179px] leading-[normal] left-[1184.2px] not-italic text-[27.224px] text-center text-white top-[553.69px] w-[435.582px]" data-node-id="113:328">
          Максимальная забота:
          <br aria-hidden="true" />
          полное сопровождение
        </p>
      </div>
      <div className="absolute bg-[#ec9b74] h-[51px] left-[232px] rounded-[40.919px] top-[2275px] w-[189.767px]" data-node-id="101:20" />
      <p className="-translate-x-1/2 absolute font-bold leading-[normal] left-[326.98px] not-italic text-[18.977px] text-center text-white top-[2286.86px] whitespace-nowrap" data-node-id="105:60">
        Подробнее
      </p>
      <div className="absolute bg-[#ec9b74] h-[51px] left-[1034px] rounded-[40.919px] top-[2274px] w-[189.767px]" data-node-id="150:222" />
      <p className="-translate-x-1/2 absolute font-bold leading-[normal] left-[1128.98px] not-italic text-[18.977px] text-center text-white top-[2285.86px] whitespace-nowrap" data-node-id="150:223">
        Подробнее
      </p>
      <div className="absolute bg-[#ec9b74] h-[51px] left-[232px] rounded-[40.919px] top-[2898px] w-[189.767px]" data-node-id="150:225" />
      <p className="-translate-x-1/2 absolute font-bold leading-[normal] left-[326.98px] not-italic text-[18.977px] text-center text-white top-[2909.86px] whitespace-nowrap" data-node-id="150:226">
        Подробнее
      </p>
      <div className="absolute bg-[#ec9b74] h-[51px] left-[1033px] rounded-[40.919px] top-[2898px] w-[189.767px]" data-node-id="150:228" />
      <p className="-translate-x-1/2 absolute font-bold leading-[normal] left-[1127.98px] not-italic text-[18.977px] text-center text-white top-[2909.86px] whitespace-nowrap" data-node-id="150:229">
        Подробнее
      </p>
      <GuestLeadSection />
      <div className="absolute flex items-center justify-center left-[922.63px] size-[121.718px] top-[calc(5254.63px-var(--twu-lead-gap,0px))]">
        <div className="flex-none rotate-[28deg]">
          <div className="relative size-[90px]" data-node-id="181:241" data-name="Right 2">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={MAIN_PAGE_IMAGES.bookingArrowCenter} />
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[1302px] size-[121.718px] top-[calc(5618px-var(--twu-lead-gap,0px))]">
        <div className="flex-none rotate-[28deg]">
          <div className="relative size-[90px]" data-node-id="181:244" data-name="Right 4">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={MAIN_PAGE_IMAGES.bookingArrowRight} />
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[524.21px] size-[121.718px] top-[calc(5618.22px-var(--twu-lead-gap,0px))]">
        <div className="flex-none rotate-[28deg]">
          <div className="relative size-[90px]" data-node-id="181:242" data-name="Right 3">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={MAIN_PAGE_IMAGES.bookingArrowLeft} />
          </div>
        </div>
      </div>
      <ChinaGalleryMarquee />
      <Link
        href={`/tours/${t0?.slug ?? "shanghai-suzhou"}`}
        className="absolute left-[210px] top-[2258px] z-[60] h-[72px] w-[240px]"
        aria-label={`Подробнее: ${t0?.title ?? "тур"}`}
      >
        <span className="sr-only">Подробнее о туре</span>
      </Link>
      <Link
        href={`/tours/${t1?.slug ?? "shanghai-avatar"}`}
        className="absolute left-[1010px] top-[2256px] z-[60] h-[72px] w-[240px]"
        aria-label={`Подробнее: ${t1?.title ?? "тур"}`}
      >
        <span className="sr-only">Подробнее о туре</span>
      </Link>
      <Link
        href={`/tours/${t2?.slug ?? "great-china"}`}
        className="absolute left-[210px] top-[2880px] z-[60] h-[72px] w-[240px]"
        aria-label={`Подробнее: ${t2?.title ?? "тур"}`}
      >
        <span className="sr-only">Подробнее о туре</span>
      </Link>
      <Link
        href={`/tours/${t3?.slug ?? "contrasts"}`}
        className="absolute left-[1010px] top-[2880px] z-[60] h-[72px] w-[240px]"
        aria-label={`Подробнее: ${t3?.title ?? "тур"}`}
      >
        <span className="sr-only">Подробнее о туре</span>
      </Link>
    </div>
  );
}