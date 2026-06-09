import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileHome } from "@/components/home/MobileHome";
import { FigmaMain } from "@/components/pixel/FigmaMain";
import { TwuAuthRootMark } from "@/components/site/TwuAuthRootMark";
import type { FaqDto, TestimonialDto, TourDto } from "@/lib/types";

export type HomeViewProps = {
  tours: TourDto[];
  testimonials: TestimonialDto[];
  faqs: FaqDto[];
};

export function HomeView({ tours, testimonials, faqs }: HomeViewProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <TwuAuthRootMark />

      <div className="lg:hidden">
        <MobileHome tours={tours} testimonials={testimonials} faqs={faqs} />
      </div>

      <div className="hidden w-full flex-1 justify-center overflow-x-auto lg:flex">
        <FigmaMain tours={tours} testimonials={testimonials} faqs={faqs} />
      </div>

      <SiteFooter className="mt-auto shrink-0 bg-[#27304f]" />
    </div>
  );
}
