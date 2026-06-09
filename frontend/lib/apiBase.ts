/** URL бэкенда для SSR (сервер Next → Django). */
export function serverApiBase(): string {
  return (
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://127.0.0.1:8000"
  ).replace(/\/$/, "");
}

/**
 * Базовый URL для fetch в браузере.
 * Пустая строка = same-origin `/api/...` через rewrite в next.config.ts.
 * Так регистрация/логин работают на Railway без bake-in NEXT_PUBLIC_* при сборке.
 */
export function publicApiBase(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (configured && !configured.includes("127.0.0.1") && !configured.includes("localhost")) {
    return configured;
  }
  return "";
}
