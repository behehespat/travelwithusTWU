/* Удаляет кэш .next (полезно при «битых» сборках Turbopack). Запуск из каталога frontend. */
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", ".next");
if (fs.existsSync(dir)) {
  fs.rmSync(dir, { recursive: true, force: true });
  console.log("[dev:fresh] Removed .next");
} else {
  console.log("[dev:fresh] No .next folder");
}
