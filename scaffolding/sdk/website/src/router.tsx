import * as React from "react";
import { WebApp } from "./WebApp";
import { Upload, GroupSelection, GroupList } from '../../src/react/index';
import { DrawerPage, ModalPage } from './pages';
import { IndexPage } from './pages/IndexPage';

export const router = [
  {
    path: "/",
    element: <WebApp />,
    errorElement: (
      <div>
        error
      </div>
    ),
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: "upload/",
        element: <Upload />,
      },
      {
        path: "drawer/",
        element: <DrawerPage />,
      },
      {
        path: "modal/",
        element: <ModalPage />,
      },
    ],
  },
] as any;
