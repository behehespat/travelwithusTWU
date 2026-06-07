import type { Metadata } from "next";

import { AdminPanelClient } from "@/components/admin/AdminPanelClient";

export const metadata: Metadata = {
  title: "Админ панель",
};

export default function AdminPanelPage() {
  return (
    <div className="mx-auto max-w-6xl pb-8">
      <AdminPanelClient />
    </div>
  );
}
