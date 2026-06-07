import type { Metadata } from "next";

import { REMINDER_BLOCKS } from "@/lib/content/reminder";

export const metadata: Metadata = {
  title: "Памятка туристу",
};

export default function ReminderPage() {
  return (
    <article className="mx-auto max-w-3xl pb-10">
      <header className="relative mb-10 overflow-hidden rounded-[24px] border border-[#27304f]/10 bg-white px-6 py-8 shadow-[0_16px_48px_-24px_rgba(39,48,79,0.15)] md:px-10 md:py-9">
        <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#27304f] via-[#27304f] to-[#ec9b74]" aria-hidden />
        <p className="pl-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#ec9b74]">Перед поездкой</p>
        <h1 className="mt-2 pl-3 text-[30px] font-bold tracking-tight text-[#27304f] md:text-[36px]">Памятка туристу</h1>
        <p className="mt-3 max-w-2xl pl-3 text-[15px] leading-relaxed text-[#27304f]/85">
          Чек-лист перед поездкой в Китай: документы, деньги, связь, здоровье и ещё несколько важных моментов. Текст
          можно позже заменить на копию из макета Figma («reminder»).
        </p>
      </header>

      <div className="relative pl-6">
        <div className="absolute bottom-2 left-[11px] top-2 w-0.5 bg-gradient-to-b from-[#27304f] via-[#ec9b74]/60 to-[#ec9b74]" aria-hidden />

        <div className="space-y-6">
          {REMINDER_BLOCKS.map((b, i) => (
            <section key={b.title} className="relative">
              <div
                className="absolute -left-6 top-5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#27304f] text-[11px] font-bold text-white shadow-sm"
                aria-hidden
              >
                {i + 1}
              </div>
              <div className="ml-4 overflow-hidden rounded-[18px] border border-[#27304f]/10 bg-white shadow-[0_6px_24px_-12px_rgba(39,48,79,0.14)]">
                <div className="border-b border-[#27304f]/8 bg-[#f7f7f6] px-5 py-3.5 md:px-6">
                  <h2 className="text-[18px] font-bold leading-tight text-[#27304f] md:text-[20px]">{b.title}</h2>
                </div>
                <div className="space-y-3 px-5 py-4 text-[15px] leading-[1.65] text-[#27304f]/88 md:px-6 md:py-5">
                  {b.paragraphs.map((p, j) => (
                    <p key={j} className="flex gap-3">
                      <span
                        className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#ec9b74]/15 text-[10px] font-bold text-[#ec9b74]"
                        aria-hidden
                      >
                        ✓
                      </span>
                      <span>{p}</span>
                    </p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
