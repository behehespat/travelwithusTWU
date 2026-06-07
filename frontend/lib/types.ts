export type TourPlaceDto = {

  name: string;

  detail: string;

  image_url: string;

};



export type TourDto = {

  slug: string;

  title: string;

  description: string;

  duration_days: number;

  tariff_label: string;

  image_url: string;

  price_from_rub: number;

  dates_display: string;

};



export type TourDetailDto = TourDto & {

  places: TourPlaceDto[];

};



export type FaqDto = {

  id: number;

  question: string;

  answer: string;

  column: number;

};



export type TestimonialDto = {

  id: number;

  name: string;

  text: string;

};


export type TourBookingDto = {

  tour_slug: string;

  tour_title: string;

  status: "new" | "in_progress" | "reviewed";

  created_at: string;

};



export type MeDto = {

  username: string;

  email: string;

  first_name: string;

  birth_date: string | null;

  phone: string;

  vk_url: string;

  is_staff: boolean;

  bookings: TourBookingDto[];

};

export type AdminBookingDto = {
  id: number;
  username: string;
  first_name: string;
  phone: string;
  vk_url: string;
  tour_slug: string;
  tour_title: string;
  status: TourBookingDto["status"];
  created_at: string;
  vk_notified_at: string | null;
  vk_notify_error: string;
};

