// @ts-nocheck
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./page-auth.css";
import logo from "../../assets/img/logo_white.png";

export default function AuthWrapper() {
  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center">
                <Link
                  aria-label="Go to Home Page"
                  to="/"
                  className="app-brand-link gap-2"
                >
                  <span className="app-brand-logo center-content">
                    <img src={logo} alt="sneat-logo" style={{width:"30%"}}/>
                  </span>
                  {/* <span className="app-brand-text demo text-body fw-bold">
                    Deft Rank
                  </span> */}
                </Link>
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
