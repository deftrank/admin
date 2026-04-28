// @ts-nocheck
import secureLocalStorage from "react-secure-storage";
import getGreetingMessage from "../utils/greetingHandler";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../assets/img/default.jpg";
import { Icon } from "@iconify/react";
import ChangepasswordModel from "../components/models/changepassword/changepasswordModel";
import { useMemo, useState } from "react";

const Navbar = () => {
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const navigate = useNavigate();

  const greeting = getGreetingMessage("Admin");
  const shortDate = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date()),
    []
  );

  const handleLogout = () => {
    secureLocalStorage.clear();
    navigate("/");
  };

  return (
    <>
      <nav
        className="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme p-0 deft-topbar"
        id="layout-navbar"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a
            aria-label="toggle for sidebar"
            className="nav-item nav-link px-0 me-xl-4 deft-topbar__menu-toggle"
            href="#"
          >
            <i className="bx bx-menu bx-sm"></i>
          </a>
        </div>

        <div className="navbar-nav-right d-flex align-items-center w-100" id="navbar-collapse">
          <div className="deft-topbar__greeting-card d-flex align-items-center gap-3 flex-grow-1">
            <div className="deft-topbar__greeting-icon">
              <Icon icon="solar:shield-user-bold-duotone" width="22" height="22" />
            </div>
            <div className="min-w-0">
              <div className="deft-topbar__greeting-title">{greeting}</div>
              <div className="deft-topbar__greeting-subtitle">
                Centralized admin overview for operations, listings, and user management
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 ms-auto">
            <div className="deft-topbar__date-pill d-none d-md-inline-flex">
              <Icon icon="solar:calendar-mark-outline" width="16" height="16" />
              {shortDate}
            </div>
            <ul className="navbar-nav flex-row align-items-center">
              <li className="nav-item navbar-dropdown dropdown-user dropdown">
                <a
                  aria-label="dropdown profile"
                  className="nav-link dropdown-toggle hide-arrow p-0"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  <div className="deft-topbar__profile-trigger">
                    <img
                      src={defaultProfile}
                      className="rounded-circle"
                      alt="avatar-image"
                      aria-label="Avatar Image"
                    />
                    <span className="deft-topbar__profile-meta d-none d-md-flex">
                      <span className="deft-topbar__profile-name">Admin</span>
                      <span className="deft-topbar__profile-role">Super admin</span>
                    </span>
                  </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end deft-topbar__dropdown">
                  <li>
                    <div className="dropdown-item-text">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={defaultProfile}
                          className="rounded-circle"
                          alt="avatar-image"
                          aria-label="Avatar Image"
                          style={{ width: 44, height: 44, objectFit: "cover" }}
                        />
                        <div>
                          <div className="fw-bold text-dark">Admin</div>
                          <small className="text-muted">Platform operations</small>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li><div className="dropdown-divider"></div></li>
                  <li>
                    <a
                      aria-label="go to setting"
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => setChangePasswordModal(true)}
                    >
                      <Icon icon="mdi:password-outline" height={18} color="#64748b" />
                      <span className="align-middle">Change Password</span>
                    </a>
                  </li>
                  <li><div className="dropdown-divider"></div></li>
                  <li>
                    <a
                      aria-label="click to log out"
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={handleLogout}
                    >
                      <Icon icon="solar:logout-3-outline" height={18} color="#64748b" />
                      <span className="align-middle">Log Out</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {changePasswordModal && (
        <ChangepasswordModel
          open={changePasswordModal}
          handleClose={() => setChangePasswordModal(false)}
        />
      )}
    </>
  );
};
export default Navbar;
