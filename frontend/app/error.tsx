"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[40vh] max-w-lg flex-col items-center justify-center gap-4 px-4 py-16 text-center text-[#27304f]">
      <p className="text-[18px] font-bold">Не удалось загрузить страницу</p>
      <p className="text-[15px] leading-relaxed text-[#27304f]/80">
        Попробуйте обновить. Если сообщение повторяется - остановите все процессы <code className="rounded bg-black/5 px-1">next dev</code>, удалите папку{" "}
        <code className="rounded bg-black/5 px-1">.next</code> и запустите dev снова одним терминалом.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-full bg-[#ec9b74] px-5 py-2.5 text-[15px] font-bold text-white hover:opacity-95"
      >
        Попробовать снова
      </button>
    </div>
  );
}
