import type { Metadata } from "next";

import { PHRASE_ROWS } from "@/lib/content/phrasebook";

export const metadata: Metadata = {
  title: "Словарик фраз",
};

export default function PhrasebookPage() {
  return (
    <article className="mx-auto max-w-3xl pb-10">
      <header className="relative mb-8 overflow-hidden rounded-[24px] bg-[#27304f] px-6 py-8 text-white shadow-[0_24px_60px_-28px_rgba(39,48,79,0.5)] md:px-10 md:py-10">
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#ec9b74]/25 blur-2xl"
          aria-hidden
        />
        <p className="relative text-[11px] font-bold uppercase tracking-[0.22em] text-[#ec9b74]">Справочник</p>
        <h1 className="relative mt-2 text-[30px] font-bold tracking-tight md:text-[36px]">Словарик фраз</h1>
        <p className="relative mt-3 max-w-lg text-[15px] leading-relaxed text-white/85">
          Ходовые выражения для поездки в Китай: иероглифы, перевод, пиньинь и{" "}
          <span className="font-bold text-white">как сказать по-русски</span> - приблизительное произнесение
          русскими буквами.
        </p>
      </header>

      <ol className="list-none space-y-3 p-0">
        {PHRASE_ROWS.map((row, index) => (
          <li
            key={row.zh}
            className="overflow-hidden rounded-[18px] border border-[#27304f]/10 bg-white shadow-[0_4px_20px_-8px_rgba(39,48,79,0.12)] transition hover:border-[#ec9b74]/40 hover:shadow-[0_8px_28px_-10px_rgba(236,155,116,0.25)]"
          >
            <div className="flex gap-0">
              <div
                className="flex w-11 shrink-0 flex-col items-center justify-center bg-gradient-to-b from-[#27304f] to-[#ec9b74] text-[13px] font-bold text-white"
                aria-hidden
              >
                {index + 1}
              </div>
              <div className="min-w-0 flex-1 p-4 md:p-5">
                <p className="text-[15px] font-bold leading-snug text-[#27304f] md:text-[16px]">{row.ru}</p>
                <div className="mt-3 rounded-[14px] bg-[#f7f7f6] px-4 py-3 text-center">
                  <p className="text-[28px] font-semibold leading-none tracking-wide text-[#27304f] md:text-[32px]">
                    {row.zh}
                  </p>
                </div>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#27304f]/8 bg-white px-3 py-2.5">
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-[#27304f]/45">Пиньинь</dt>
                    <dd className="mt-0.5 font-mono text-[14px] text-[#27304f]/90">{row.pinyin}</dd>
                  </div>
                  <div className="rounded-xl border border-[#ec9b74]/25 bg-[#ec9b74]/[0.06] px-3 py-2.5">
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-[#ec9b74]">Как произнести</dt>
                    <dd className="mt-0.5 text-[14px] font-semibold leading-snug text-[#27304f]">{row.transcriptionRu}</dd>
                  </div>
                </dl>
                {row.note ? (
                  <p className="mt-3 flex gap-2 rounded-xl bg-[#27304f]/[0.04] px-3 py-2 text-[13px] leading-relaxed text-[#27304f]/75">
                    <span className="shrink-0 text-[#ec9b74]" aria-hidden>
                      ●
                    </span>
                    {row.note}
                  </p>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
