import type { ReactNode } from "react";

import { MainStyleHeader } from "@/components/layout/MainStyleHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#27304f]">
      <div className="twu-header-bar sticky top-0 z-50 flex justify-center bg-white/95 px-3 py-2 shadow-[0_1px_0_rgba(39,48,79,0.06)] backdrop-blur">
        <MainStyleHeader className="w-full max-w-[min(1569px,calc(100vw-1.5rem))]" />
      </div>
      <main className="twu-animate-in mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
      <SiteFooter className="mt-auto bg-[#27304f]" />
    </div>
  );
}
