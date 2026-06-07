import { SiteFooter } from "@/components/layout/SiteFooter";
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
      <div className="flex w-full flex-1 justify-center overflow-x-auto">
        <TwuAuthRootMark />
        <FigmaMain tours={tours} testimonials={testimonials} faqs={faqs} />
      </div>
      <SiteFooter className="mt-auto shrink-0 bg-[#27304f]" />
    </div>
  );
}
