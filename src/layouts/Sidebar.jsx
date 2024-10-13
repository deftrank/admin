// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import menuData from "../data/menuData.json";
import logo from "../assets/img/black_logo.svg";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme"
      >
        <div className="app-brand demo">
          <Link
            aria-label="Navigate to sneat homepage"
            to="/"
            className="app-brand-link"
          >
            <span className="app-brand-logo demo">
              <img src={logo} alt="sneat-logo" aria-label="Sneat logo image" />
            </span>
            <span className="app-brand-text demo menu-text fw-bold ms-2">
              Deft Rank
            </span>
          </Link>

          <a
            href="#"
            className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
          >
            <i className="bx bx-chevron-left bx-sm align-middle"></i>
          </a>
        </div>

        <div className="menu-inner-shadow"></div>

        <ul className="menu-inner py-1">
          {menuData.map((section) => (
            <React.Fragment key={section.header}>
              {section.header && (
                <li className="menu-header small text-uppercase">
                  <span className="menu-header-text">{section.header}</span>
                </li>
              )}
              {section.items.map(MenuItem)}
            </React.Fragment>
          ))}
        </ul>
      </aside>
    </>
  );
};

const MenuItem = (item) => {
  const location = useLocation();
  const isActive = location.pathname === item.link;
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const isSubmenuActive =
    hasSubmenu &&
    item.submenu.some((subitem) => location.pathname === subitem.link);
  let pathArray = location.pathname.split("/");
  const active =
    location.pathname === item.path
      ? true
      : `/${pathArray[1]}/${pathArray[2]}` === item.path
      ? true
      : false;

  return (
    <li
      className={`menu-item ${isActive || isSubmenuActive ? "active" : ""} ${
        hasSubmenu && isSubmenuActive ? "open" : ""
      }`}
    >
      <NavLink
        aria-label={`Navigate to ${item.text} ${!item.available ? "Pro" : ""}`}
        to={item.link}
        className={`menu-link ${item.submenu ? "menu-toggle" : ""}`}
        target={item.link.includes("http") ? "_blank" : undefined}
      >
        {/* <i className={`menu-icon tf-icons ${item.icon}`}></i> */}
        <Icon
          icon={item.icon}
          height={20}
          color={active ? "#A1A8B6" : ""}
          className={`menu-icon`}
        />
        <div>{item.text}</div>{" "}
        {item.available === false && (
          <div className="badge bg-label-primary fs-tiny rounded-pill ms-auto">
            Pro
          </div>
        )}
      </NavLink>
      {item.submenu && (
        <ul className="menu-sub">{item.submenu.map(MenuItem)}</ul>
      )}
    </li>
  );
};

export default Sidebar;
