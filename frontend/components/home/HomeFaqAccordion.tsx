"use client";

import { useMemo, useState } from "react";

import type { FaqDto } from "@/lib/types";

type Props = {
  faqs: FaqDto[];
  className?: string;
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
        <p className="min-w-0 flex-1 text-left text-[16px] font-bold leading-snug text-black sm:text-[18px]">
          {item.question}
        </p>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ec9b74] text-[28px] font-light leading-none text-white transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#27304f] sm:h-12 sm:w-12 sm:text-[32px]"
        >
          <span className={`block transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>+</span>
        </button>
      </div>
      {isOpen ? (
        <p className="mt-3 text-[15px] font-normal leading-relaxed text-[#27304f]/95 sm:text-[16px]">
          {item.answer}
        </p>
      ) : null}
    </div>
  );
}

export function HomeFaqAccordion({ faqs, className = "" }: Props) {
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

  if (!faqs.length) return null;

  function toggle(id: number) {
    setOpenId((cur) => (cur === id ? null : id));
  }

  return (
    <div className={`rounded-[20px] bg-[#f7f7f6] px-4 py-5 sm:px-5 sm:pb-6 sm:pt-5 ${className}`}>
      <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-10">
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
