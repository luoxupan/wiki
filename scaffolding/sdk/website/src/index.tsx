import * as React from "react";
import { createRoot } from "react-dom/client";
import { router } from './router';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <RouterProvider router={createBrowserRouter(router)} />
  </React.StrictMode>
);
