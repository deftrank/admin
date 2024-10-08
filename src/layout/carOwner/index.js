import React, { useState } from "react";
import "./index.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/img/Logo.svg";
// import { handleSideBar } from '../../store/slice/auth';
import { config } from "./config";
import SideItem from "./sideItem";
import Header from "./header";
// import { useResponsive } from '../../themes/useResponsive';
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { useResponsive } from "../../hooks/useResponsive";
export default function CarOwnerLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { screenType } = useResponsive();
  // const { isOpenSideBar } = useSelector((state) => state.auth);
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div id="wrapper">
        <div
          id="sidebar-wrapper"
          style={{
            width:
              screenType === "MOBILE"
                ? isOpenSideBar
                  ? "280px"
                  : "0px"
                : "283px",
          }}
        >
          <div className="d-flex justify-content-end">
            {screenType === "MOBILE" ? (
              <Icon
                icon="basil:cross-outline"
                color="white"
                height={40}
                onClick={() => {
                  // dispatch(handleSideBar(false));
                }}
              />
            ) : (
              ""
            )}
          </div>
          <div className="text-center mt-5 pt-3">
            {screenType === "MOBILE" ? (
              <img
                src={logo}
                height={"50%"}
                width={"70%"}
                style={{ marginTop: "-3rem" }}
              />
            ) : (
              <img src={logo} height={"20%"} width={"40%"} />
            )}
          </div>
          <div className="list-group" id="list-tab" role="tablist"></div>
          <div
            className="d-flex flex-column justify-content-between  "
            style={{ minHeight: "80%" }}
          >
            <div className="sideItem">
              {config.map((item) => {
                let pathArray = location.pathname.split("/");

                const active =
                  location.pathname === item.path
                    ? true
                    : `/${pathArray[1]}/${pathArray[2]}` === item.path
                    ? true
                    : false;
                return (
                  <SideItem
                    active={active}
                    disabled={item.disabled}
                    icon={item.icon}
                    key={item.title}
                    path={item.path}
                    title={item.title}
                  />
                );
              })}
            </div>
            {/* style={{ position: 'absolute', bottom: 0 }} */}
            {/* <div className="position-relative ">
              <div
                className=" my-5 "
                style={{ top: screenType === "MOBILE" ? "80" : "100%" }}
              >
                <div
                  className="d-flex my-4 px-4"
                  style={{
                    borderRadius: 15,
                    width: "100%",
                  }}
                >
                  <div
                    onClick={() => navigate("/")}
                    style={{
                      borderRadius: 15,

                      height: 50,
                      cursor: "pointer",
                      width: 50,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#314569",
                    }}
                  >
                    <Icon
                      icon={"humbleicons:logout"}
                      height={30}
                      color={"#A1A8B6"}
                    />
                  </div>
                  <div
                    onClick={() => navigate("/")}
                    style={{
                      color: "#A1A8B6",
                      fontSize: 17,
                      paddingLeft: "1rem",
                      cursor: "pointer",
                      fontFamily: "Circular Std Medium",
                      display: "flex",
                      alignItems: "center",
                      paddingTop: "0.5rem",
                    }}
                  >
                    Go To Website
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div
          id="page-content-wrapper"
          style={{ background: "#e5e5e591", height: "auto" }}
        >
          <Header/>
          <div className="container-fluid body">
            <div className="row">
              <div className="col-lg-12">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
