// @ts-nocheck
import React, { useEffect, useState } from "react"; // Import useEffect
import { Navigate, useRoutes } from "react-router-dom";
import Home from "../pages/dashboard";
import CarOwnerLayout from "../layout/carOwner/index.js";
import AuthLayout from "../layout/authLayout";
import Login from "../pages/auth/login";
import NotFoundPage from "../pages/error_page";
import BasicDetails from "../pages/onBoarding/basicDetails";
import OnBoardingLayout from "../pages/onBoarding"; // Make sure this is the correct import
import PersonalDetails from "../pages/onBoarding/personalDetails";
import EmployabilityDetails from "../pages/onBoarding/employabilityDetails";
import CareerPath from "../pages/onBoarding/careerPath";
import EducationDetails from "../pages/onBoarding/educationDetails";
import secureLocalStorage from "react-secure-storage";

export default function AppRoutes() {
  const loginData = secureLocalStorage.getItem(
    import.meta.env.VITE_TOKEN_STORAGE_KEY
  );

  // Use isDashboard state instead of a static false

  return useRoutes([
    {
      path: "/",
      element: loginData ? <CarOwnerLayout /> : <Navigate to="/auth/login" />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: "dashboard", element: <Home /> },
      ],
    },
    {
      path: "/auth",
      element: !loginData ? <AuthLayout /> : <Navigate to="/" />,
      children: [{ path: "/auth/login", element: <Login /> }],
    },
    // {
    //   path: "/register",
    //   element: <BasicDetails />,
    // },
    // {
    //   path: "/student-onboarding",
    //   element: <OnBoardingLayout />,
    //   children: [
    //     { path: "personal-detail", element: <PersonalDetails /> },
    //     { path: "educational-detail", element: <EducationDetails /> },
    //     { path: "employability-detail", element: <EmployabilityDetails /> },
    //     { path: "career-path", element: <CareerPath /> },
    //   ],
    // },
    // 404 page
    { path: "*", element: <NotFoundPage /> },
  ]);
}
