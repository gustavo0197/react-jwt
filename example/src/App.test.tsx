import React from "react";
import { createRoot } from "react-dom/client";
import { test } from "vitest";
import App from "./App";

test("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);

  root.render(<App />);

  root.unmount();
});
