import type { TourDetailDto, TourPlaceDto } from "@/lib/types";

/** Путь к файлу в `public/tours/tour N/` с корректным кодированием (запятые, пробелы, апострофы). */
export function tourPublicAsset(tourNumber: 1 | 2 | 3 | 4, filename: string): string {
  const folder = encodeURIComponent(`tour ${tourNumber}`);
  const file = encodeURIComponent(filename);
  return `/tours/${folder}/${file}`;
}

/** В БД в названиях мест мог остаться длинный тире «—» вместо «-». */
export function normalizePlaceName(name: string): string {
  return name.replace(/\u2014/g, "-").replace(/\u2013/g, "-").trim();
}

function mapTourPlaces(places: TourPlaceDto[] | undefined, byPlace: Record<string, string>): TourPlaceDto[] {
  return (places ?? []).map((p) => ({
    ...p,
    image_url:
      byPlace[normalizePlaceName(p.name)] ?? byPlace[p.name] ?? p.image_url,
  }));
}

export function isLocalTourImage(src: string): boolean {
  return src.includes("/tours/");
}

const t1 = (file: string) => tourPublicAsset(1, file);
const t2 = (file: string) => tourPublicAsset(2, file);
const t3 = (file: string) => tourPublicAsset(3, file);
const t4 = (file: string) => tourPublicAsset(4, file);

export function withLocalTourImages(tour: TourDetailDto): TourDetailDto {
  switch (tour.slug) {
    case "shanghai-suzhou":
      return {
        ...tour,
        image_url: t1("ShanghaiBundEmbankment.jpg"),
        places: mapTourPlaces(tour.places, {
          "Шанхай, набережная Бунд": t1("ShanghaiBundEmbankment.jpg"),
          "Сучжоу, классические сады": t1("SuzhouClassicalGardens.jpg"),
          "Шанхай, Старый город": t1("ShanghaiOldTown.jpg"),
        }),
      };
    case "shanghai-avatar":
      return {
        ...tour,
        image_url: t2("Shanghai, Lujiazui.jpg"),
        places: mapTourPlaces(tour.places, {
          "Шанхай, Луцзяцзуй": t2("Shanghai, Lujiazui.jpg"),
          "Чжанцзяцзе, парк Улинъюань": t2("Zhangjiajie, Wulingyuan Park.jpg"),
          "Тяньцзымэнь - стеклянный мост": t2("Tianzimen - the Glass Bridge.jpg"),
        }),
      };
    case "great-china":
      return {
        ...tour,
        image_url: t3("Zhangjiajie.jpg"),
        places: mapTourPlaces(tour.places, {
          Чжанцзяцзе: t3("Zhangjiajie.jpg"),
          "Великая стена (Мутяньюй)": t3("The Great Wall (Mutianyu).jpg"),
          "Сиань, Терракотовая армия": t3("Xi'an, the Terracotta Army.jpg"),
          Шанхай: t3("Shanghai.png"),
        }),
      };
    case "contrasts":
      return {
        ...tour,
        image_url: t4("Yangshuo, Yulong River.png"),
        places: mapTourPlaces(tour.places, {
          "Яншо, река Юйлун": t4("Yangshuo, Yulong River.png"),
          Чжанцзяцзе: t4("Zhangjiajie.jpg"),
          "Пекин, Запретный город": t4("Beijing, the Forbidden City.jpg"),
          Чжуцзяцзяо: t4("Zhujiajiao.webp"),
        }),
      };
    default:
      return tour;
  }
}
