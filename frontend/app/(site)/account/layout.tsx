import type { ReactNode } from "react";

/** ЛК на всю ширину экрана (как в ВК), без боковых отступов оболочки. */
export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 -my-6 sm:-my-10">
      {children}
    </div>
  );
}
