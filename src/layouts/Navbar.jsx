// @ts-nocheck
import secureLocalStorage from "react-secure-storage";
import getGreetingMessage from "../utils/greetingHandler";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../assets/img/default.jpg";
import { Icon } from "@iconify/react";
import ChangepasswordModel from "../components/models/changepassword/changepasswordModel";
import { useState } from "react";

const Navbar = () => {
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    secureLocalStorage.clear();
    navigate("/");
  };

  return (
    <>
      <nav
        className="layout-navbar navbar navbar-expand-xl  align-items-center bg-navbar-theme p-3"
        id="layout-navbar"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a
            aria-label="toggle for sidebar"
            className="nav-item nav-link px-0 me-xl-4"
            href="#"
          >
            <i className="bx bx-menu bx-sm"></i>
          </a>
        </div>

        <div
          className="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          {getGreetingMessage()}
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a
                aria-label="dropdown profile"
                className="nav-link dropdown-toggle hide-arrow"
                href="#"
                data-bs-toggle="dropdown"
              >
                <div className="avatar-online">
                  <img
                    src={defaultProfile}
                    className="w-px-40 h-auto rounded-circle"
                    alt="avatar-image"
                    aria-label="Avatar Image"
                  />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a
                    aria-label="go to profile"
                    className="dropdown-item"
                    href="#"
                  >
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className=" avatar-online">
                          <img
                            src={defaultProfile}
                            className="w-px-40 h-auto rounded-circle"
                            alt="avatar-image"
                            aria-label="Avatar Image"
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <small className="text-muted">Admin</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                </li>
                <li>
                  <a
                    aria-label="go to setting"
                    className="dropdown-item"
                    onClick={() => {
                      setChangePasswordModal(true);
                    }}
                  >
                    <Icon
                      icon="mdi:password-outline"
                      height={16}
                      color="#757c83"
                      className={`menu-icon`}
                    />
                    <span className="align-middle">Change Password</span>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                </li>
                <li>
                  <a aria-label="click to log out" className="dropdown-item">
                    <i className="bx bx-power-off me-2"></i>
                    <span className="align-middle" onClick={handleLogout}>
                      Log Out
                    </span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
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
