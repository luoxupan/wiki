import * as React from "react";
import './WebApp.less';
import { Outlet, Link } from "react-router-dom";

export function WebApp() {
  return (
    <div className="web-app">
      <div className="layout-left">
        <Link to={`/`}>index page</Link>
        {/* <Link to={`Upload`}>Upload</Link>
        <Link to={`modal`}>Modal</Link>
        <Link to={`drawer`}>Drawer</Link> */}
      </div>
      <div className="layout-main">
        <Outlet />
      </div>
    </div>
  );
}
