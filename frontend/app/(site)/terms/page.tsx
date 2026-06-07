import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Пользовательское соглашение",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-3xl font-bold text-[#27304f]">Пользовательское соглашение</h1>
      <p className="text-[17px] leading-relaxed text-[#27304f]/88">
        Используя сайт TravelWithUs, вы соглашаетесь с правилами размещения информации о турах, порядком регистрации и
        оформления заявок. Условия конкретного тура и оплаты фиксируются в договоре и сопутствующих документах.
        Администрация вправе обновлять интерфейс и описание услуг; актуальная версия документов публикуется на сайте.
      </p>
    </div>
  );
}
