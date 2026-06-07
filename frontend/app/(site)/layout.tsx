import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteShell } from "@/components/site/SiteShell";

export const metadata: Metadata = {
  title: {
    default: "TravelWithUs",
    template: "%s - TravelWithUs",
  },
};

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
