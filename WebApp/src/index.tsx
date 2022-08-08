import * as React from "react";
import { createRoot } from "react-dom/client";
import { WebApp } from "./WebApp";

const root = createRoot(
  document.getElementById("root")
);

root.render(<WebApp />);
