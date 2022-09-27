import * as React from "react";
import { createRoot } from "react-dom/client";
import { WebApp } from "./WebApp";
import 'antd/dist/antd.css';

const root = createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<WebApp />);
