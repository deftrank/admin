import { NavLink, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { color } from "../themes/color/color";
import { useResponsive } from "../hooks/useResponsive";
import {
  navConfig,
  userProfileDropwoen,
} from "../layout/dashBoardLayout/appbar/config";
import { useEffect, useState } from "preact/hooks";
import { Dropdown } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import defaultImg from "../assets/img/default.jpg";

export function Header() {
  const { screenType } = useResponsive();
  const [isActive, setActive] = useState("/");
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname;

    if (pathName.includes("/")) {
      setActive("/");
    } else if (pathName.includes("internship")) {
      setActive("/internship");
    } else if (pathName.includes("jobs")) {
      setActive("/jobs");
    } else if (pathName.includes("test")) {
      setActive("/test");
    } else if (pathName.includes("comp_Test")) {
      setActive("/comp_Test");
    } else {
      setActive("/dashboard");
    }
  }, [location.pathname]);

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="header bg-white d-flex align-items-center justify-content fixed-top"
        >
          <Container
            fluid
            className="container-xl position-relative d-flex align-items-center"
          >
            <Navbar.Brand
              href="#"
              style={{ color: "#363F5E" }}
              className="sitename   py-1 pe-3 fs-4 font-size-29"
            >
              Deft rank
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                  className={"font-size-29"}
                  style={{ color: "#363F5E" }}
                >
                  Deft rank
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 pe-3 gap-3 align-items-center">
                  {navConfig?.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={`nav-link font-size-14 ${
                        isActive === item.path ? "active" : ""
                      }`}
                    >
                      {item?.title}
                    </NavLink>
                  ))}

                  <Nav.Link href="/coming-soon">
                    AI Mentor{" "}
                    <span className="coming-soon ms-1 fs-6">(Coming Soon)</span>
                  </Nav.Link>
                </Nav>
                <div
                  className={`d-flex ${
                    screenType === "MOBILE"
                      ? "flex-column gap-3"
                      : "flex-md-column flex-lg-row"
                  }`}
                >
                  <button
                    type="button"
                    class="btn btn-transparent position-relative p-0 shadow-none border-0"
                  >
                    <Icon
                      icon={"ph:bell-bold"}
                      className={"fs-2"}
                      style={{ color: color.secondaryGray, cursor: "pointer" }}
                    />
                    <span
                      class="position-absolute top-0 start-100 translate-middle p-2 border border-light rounded-circle mt-2 font-size-12 text-white"
                      style={{ background: "#EE7373" }}
                    >
                      <span class="visually-hidden">New alerts</span>
                    </span>
                  </button>
                  <Dropdown>
                    <Dropdown.Toggle
                      className={
                        "bg-transparent text-black d-flex gap-3 align-items-center shadow-none border-0"
                      }
                      id="dropdown-basic"
                    >
                      <img
                        src={defaultImg}
                        style={{ width: 35, height: 35 }}
                        className={"rounded-circle"}
                      />
                      <h6
                        className="font-size-14 mb-0"
                        style={{ color: "#363F5E" }}
                      >
                        Ritesh
                      </h6>
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      className={"border-0 bg-white shadow-lg p-2"}
                    >
                      {userProfileDropwoen?.map((dropdown) => {
                        return (
                          <>
                            <NavLink
                              to={dropdown?.path}
                              key={dropdown?.id}
                              className={
                                "text-decoration-none m-1 mb-3 d-flex align-items-center gap-3"
                              }
                            >
                              <Icon
                                icon={dropdown?.src}
                                className={"fs-4 text-black"}
                              />
                              <h6
                                className="font-size-14 m-0"
                                style={{
                                  color: color.thirdGrey,
                                  fontWeight: 600,
                                }}
                              >
                                {dropdown?.title}
                              </h6>
                            </NavLink>
                          </>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
