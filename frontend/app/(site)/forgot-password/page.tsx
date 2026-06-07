import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";

import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Сброс пароля",
};

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell
      title="Забыли пароль?"
      subtitle={
        <>
          Письмо придёт на email, указанный при регистрации. Отправитель:{" "}
          <span className="font-semibold">travelwithuswtu@gmail.com</span>.{" "}
          <Link href="/login" className="font-bold text-[#ec9b74] hover:underline">
            Войти
          </Link>
        </>
      }
    >
      <Suspense fallback={null}>
        <ForgotPasswordForm />
      </Suspense>
    </AuthPageShell>
  );
}
