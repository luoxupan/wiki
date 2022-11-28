import * as React from "react";
import { WebApp } from "./WebApp";
import { ErrorPage } from './pages/error-page';
import { UndoRedo, Options } from './components/index';

export const router = [
  {
    path: "/",
    element: <WebApp />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "undoredo/",
        element: <UndoRedo />,
      },
      {
        path: "options/",
        element: <Options />,
      },
    ],
  },
] as any;
