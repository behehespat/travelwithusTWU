import type { Metadata } from "next";
import Link from "next/link";

import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Регистрация",
};

export default function RegisterPage() {
  return (
    <AuthPageShell
      title="Регистрация"
      subtitle={
        <>
          Создайте аккаунт за минуту. Уже есть профиль?{" "}
          <Link href="/login" className="font-bold text-[#ec9b74] hover:underline">
            Войдите
          </Link>
          .
        </>
      }
    >
      <RegisterForm />
    </AuthPageShell>
  );
}
