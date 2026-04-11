// Suppress jsdom errors that don't affect test correctness
const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  const msg = String((args[0] as Error)?.message ?? args[0] ?? "");
  if (msg.includes("Not implemented")) return;
  originalConsoleError(...args);
};
