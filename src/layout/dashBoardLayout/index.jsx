import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
// import "./DashboardLayout.css"; // Ensure you have this CSS file for custom styles

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
     <header className={`header d-flex justify-content-between align-items-center p-3 collapsed`}>
        <button className="btn btn-primary" onClick={toggleSidebar}>
          <Icon icon={isOpen ? "ci:hamburger-md" : "ci:close-md"} />
        </button>
      </header>

      <div className={`sidebar ${isOpen ? "" : "active"}`}>
        <div className="d-flex justify-content-between align-items-center p-2">
          <h4 className={`text-center ${isOpen ? "d-none" : ""}`}>
            Sidebar Menu
          </h4>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <Icon icon={"ci:hamburger-md"} />
              {isOpen && "Dashboard"}
            </a>
          </li>
        </ul>
      </div>

      <div
        className={`bodyActive ${isOpen ? "" : "collapsed"}`} // Add collapsed class based on state
      >
        <h1>Welcome to the Dashboard</h1>
        <p>This is your main content area.</p>
      </div>
    </>
  );
}
