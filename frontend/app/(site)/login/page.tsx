import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";

import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Вход",
};

export default function LoginPage() {
  return (
    <AuthPageShell
      title="Вход"
      subtitle={
        <>
          Войдите в аккаунт, чтобы оставлять заявки на туры и пользоваться личным кабинетом. Нет аккаунта?{" "}
          <Link href="/register" className="font-bold text-[#ec9b74] hover:underline">
            Зарегистрируйтесь
          </Link>
          .
        </>
      }
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthPageShell>
  );
}
