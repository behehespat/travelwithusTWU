/**
 * Один фиксированный порт и 127.0.0.1 — без каскада 3000…3010 и без типичных проблем localhost/IPv6 на Windows.
 * Порт и хост совпадают с kill-node-dev-ports.ps1 (диапазон 3330–3340).
 */
const { spawn } = require("child_process");
const path = require("path");

const HOST = "127.0.0.1";
const PORT = 3333;
const root = path.join(__dirname, "..");
const nextCli = path.join(root, "node_modules", "next", "dist", "bin", "next");

const useTurbo = process.argv.includes("--turbo");

const args = [nextCli, "dev", "-H", HOST, "-p", String(PORT)];
if (useTurbo) args.splice(2, 0, "--turbopack");

// eslint-disable-next-line no-console
console.log(`
----------------------------------------------------------------
  TravelWithUs — открой в браузере (скопируй целиком):

    http://${HOST}:${PORT}/

  Не используй старые закладки :3010 / :3000.
  Если «порт занят» или зомби-next:  npm run dev:reset
----------------------------------------------------------------
`);

const child = spawn(process.execPath, args, {
  stdio: "inherit",
  cwd: root,
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code === 0 || code === null ? 0 : code);
});
