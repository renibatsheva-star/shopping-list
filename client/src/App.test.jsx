import { render, screen } from "@testing-library/react";
import { vi, test, expect } from "vitest";
import App from "./App";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

test("renders Shopping List title", async () => {
  render(<App />);

  expect(await screen.findByText("Shopping List")).toBeInTheDocument();
});


