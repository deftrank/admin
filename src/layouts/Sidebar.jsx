// @ts-nocheck
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import menuData from "../data/menuData.json";
import logo from "../assets/img/logo_white_icon.png";
import { Icon } from "@iconify/react";

const sectionMeta = {
  "": { icon: "solar:home-smile-angle-outline", label: "Home" },
  STUDENTS: { icon: "ph:student", label: "Students" },
  Companies: { icon: "mdi:office-building-outline", label: "Companies" },
  Test: { icon: "solar:clipboard-list-outline", label: "Tests" },
  SUBSCRIPTIONS: { icon: "solar:wallet-money-outline", label: "Subscriptions" },
  "Raised Tickets": { icon: "solar:chat-round-dots-outline", label: "Support" },
  "Marketing Banner": { icon: "solar:gallery-outline", label: "Marketing" },
};

const Sidebar = () => {
  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme sidebar-deft"
    >
      <div className="app-brand demo sidebar-deft__brand-wrap">
        <Link aria-label="Navigate to dashboard" to="/dashboard" className="app-brand-link sidebar-deft__brand-link">
          <span className="app-brand-logo demo sidebar-deft__brand-logo-wrap">
            <img
              src={logo}
              alt="Deft Rank logo"
              aria-label="Deft Rank logo"
              className="sidebar-deft__logo"
            />
          </span>
          <span className="sidebar-deft__brand-copy">
            <span className="text-white app-brand-text demo menu-text fw-bold sidebar-deft__title">
              Deft Rank
            </span>
            <span className="sidebar-deft__subtitle">Admin control room</span>
          </span>
        </Link>

        <a
          href="#"
          className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none sidebar-deft__mobile-toggle"
        >
          <i className="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
      </div>

      <div className="sidebar-deft__workspace">
        <div className="sidebar-deft__workspace-title">Workspace</div>
        <div className="sidebar-deft__workspace-value">Operations and reporting</div>
      </div>

      <div className="menu-inner-shadow"></div>

      <ul className="menu-inner py-2">
        {menuData.map((section) => {
          const meta = sectionMeta[section.header] || null;
          return (
            <React.Fragment key={section.header || "root"}>
              {section.header && (
                <li className="menu-header small text-uppercase sidebar-deft__section-header">
                  <span className="menu-header-text fw-bolder d-inline-flex align-items-center gap-2">
                    {meta?.icon && <Icon icon={meta.icon} width="14" height="14" />}
                    {meta?.label || section.header}
                  </span>
                </li>
              )}
              {section.items.map((item) => (
                <MenuItem key={item.link} item={item} depth={0} />
              ))}
            </React.Fragment>
          );
        })}
      </ul>
    </aside>
  );
};

const MenuItem = ({ item, depth = 0 }) => {
  const location = useLocation();
  const isActive = location.pathname === item.link;
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const isSubmenuActive =
    hasSubmenu && item.submenu.some((subitem) => location.pathname === subitem.link);

  return (
    <li
      className={`menu-item ${isActive || isSubmenuActive ? "active" : ""} ${
        hasSubmenu && isSubmenuActive ? "open" : ""
      }`}
    >
      <NavLink
        aria-label={`Navigate to ${item.text} ${!item.available ? "Pro" : ""}`}
        to={item.link}
        className={`menu-link ${hasSubmenu ? "menu-toggle" : ""}`}
        style={{ paddingLeft: depth > 0 ? "2.85rem" : "1rem" }}
      >
        <Icon icon={item.icon} height={20} className="menu-icon" />
        <div>{item.text}</div>
        {item.available === false && (
          <div className="badge bg-label-primary fs-tiny rounded-pill ms-auto">
            Pro
          </div>
        )}
      </NavLink>
      {hasSubmenu && (
        <ul className="menu-sub">
          {item.submenu.map((subitem) => (
            <MenuItem key={subitem.link} item={subitem} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Sidebar;
