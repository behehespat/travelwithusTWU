"use client";

import { useMemo, useState } from "react";

import type { FaqDto } from "@/lib/types";

type FaqAccordionPixelProps = {
  faqs: FaqDto[];
};

function FaqRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqDto;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-black/[0.06] pb-4 last:border-b-0 last:pb-0">
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 flex-1 text-left text-[20px] font-bold leading-snug text-black">{item.question}</p>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-[#ec9b74] text-[32px] font-light leading-none text-white shadow-none transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27304f]"
        >
          <span className={`block transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>+</span>
        </button>
      </div>
      {isOpen ? (
        <p className="mt-3 max-w-[520px] text-[16px] font-normal leading-relaxed text-[#27304f]/95">{item.answer}</p>
      ) : null}
    </div>
  );
}

/**
 * FAQ «Ответы на популярные вопросы»: две колонки как в макете, плюс раскрывает ответ под вопросом.
 */
export function FaqAccordionPixel({ faqs }: FaqAccordionPixelProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  const { leftCol, rightCol } = useMemo(() => {
    const leftCol: FaqDto[] = [];
    const rightCol: FaqDto[] = [];
    for (const f of faqs) {
      if (f.column === 1) leftCol.push(f);
      else if (f.column === 2) rightCol.push(f);
    }
    return { leftCol, rightCol };
  }, [faqs]);

  function toggle(id: number) {
    setOpenId((cur) => (cur === id ? null : id));
  }

  if (!faqs.length) {
    return null;
  }

  return (
    <div
      className="pointer-events-auto absolute left-[375px] top-[calc(6165px-var(--twu-lead-gap,0px))] z-[30] w-[1170px] rounded-[20px] bg-[#f7f7f6] px-5 pb-6 pt-5 shadow-none"
      data-node-id="113:299"
      data-name="faq-accordion"
    >
      <div className="grid grid-cols-2 gap-x-14 gap-y-0">
        <div className="flex flex-col gap-y-6">
          {leftCol.map((item) => (
            <FaqRow key={item.id} item={item} isOpen={openId === item.id} onToggle={() => toggle(item.id)} />
          ))}
        </div>
        <div className="flex flex-col gap-y-6">
          {rightCol.map((item) => (
            <FaqRow key={item.id} item={item} isOpen={openId === item.id} onToggle={() => toggle(item.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}
