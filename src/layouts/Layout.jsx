// @ts-nocheck
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  useEffect(() => {
    let retries = 0;
    const initMenu = () => {
      if (typeof window.Main === "function") {
        window.Main();
        return;
      }
      if (retries < 20) {
        retries += 1;
        setTimeout(initMenu, 100);
      }
    };
    initMenu();
  }, []);

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidebar />
        <div className="layout-page">
          <Navbar />
          <div className="content-wrapper">
            <div className="container-fluid flex-grow-1 container-p-y">
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </div>
  );
};

export default Layout;
