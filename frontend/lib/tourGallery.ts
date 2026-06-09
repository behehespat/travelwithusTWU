export type TourGallerySlide = {
  src: string;
  title: string;
};

export function buildTourGallerySlides(tour: {
  title: string;
  image_url: string;
  places?: { name: string; image_url: string }[];
}): TourGallerySlide[] {
  const slides: TourGallerySlide[] = [];
  const seen = new Set<string>();

  const add = (src: string, title: string) => {
    if (!src || seen.has(src)) return;
    seen.add(src);
    slides.push({ src, title });
  };

  add(tour.image_url, tour.title);
  for (const place of tour.places ?? []) {
    add(place.image_url, place.name);
  }

  return slides;
}
