type Props = {
  src: string;
  className?: string;
  priority?: boolean;
};

/** Локальные файлы из /public/tours — через нативный img (без next/image). */
export function TourPhoto({ src, className = "object-cover", priority = false }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
