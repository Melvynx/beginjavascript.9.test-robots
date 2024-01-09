import { beforeAll, beforeEach, vi } from "vitest";

const originalConsoleLog = console.log;

beforeAll(() => {
  console.log = vi.fn((...params) => {
    originalConsoleLog(...params);
  });
});

beforeEach(() => {
  // Réinitialiser le mock de console.log avant chaque test
  vi.mocked(console.log).mockReset();
});
