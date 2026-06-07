import Link from "next/link";
import type { ReactNode } from "react";

type AuthPageShellProps = {
  title: string;
  subtitle: ReactNode;
  children: ReactNode;
};

export function AuthPageShell({ title, subtitle, children }: AuthPageShellProps) {
  return (
    <div className="mx-auto max-w-md">
      <div className="mb-8 overflow-hidden rounded-[24px] border border-[#27304f]/10 bg-gradient-to-br from-[#27304f] via-[#27304f] to-[#ec9b74] p-[1px] shadow-[0_20px_50px_-20px_rgba(39,48,79,0.35)]">
        <div className="rounded-[23px] bg-white px-6 py-7 md:px-8 md:py-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ec9b74]">TravelWithUs</p>
          <h1 className="mt-2 text-[28px] font-bold tracking-tight text-[#27304f] md:text-[32px]">{title}</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-[#27304f]/80">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
