"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="ru">
      <body className="flex min-h-screen items-center justify-center bg-white p-6 font-sans text-[#27304f]">
        <div className="max-w-md text-center">
          <h1 className="mb-3 text-xl font-bold">Ошибка приложения</h1>
          <p className="mb-6 text-sm text-[#27304f]/80">
            Закройте лишние окна с <code className="rounded bg-black/5 px-1">npm run dev</code>, удалите <code className="rounded bg-black/5 px-1">frontend/.next</code> и
            запустите сервер заново.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-[#ec9b74] px-5 py-2.5 text-sm font-bold text-white hover:opacity-95"
          >
            Снова
          </button>
        </div>
      </body>
    </html>
  );
}
