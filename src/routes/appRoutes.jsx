// @ts-nocheck
import React, { useEffect, useState } from "react"; // Import useEffect
import { Navigate, useRoutes } from "react-router-dom";
import Home from "../pages/dashboard";
import Student from "../pages/student";
import StudentProfile from "../pages/student/studentProfile";
import Compnany from "../pages/compnany";
import CarOwnerLayout from "../layout/carOwner/index";
import AuthLayout from "../layout/authLayout";
import Login from "../pages/auth/login";
import Forgetpassword from "../pages/auth/forgetpassword/forgetpassword";
import EditStudentDetail from "../pages/student/EditStudentDetail/index";
import NotFoundPage from "../pages/error_page";
import secureLocalStorage from "react-secure-storage";
import OnBoardingLayout from "../pages/student/onBoarding/index";
import PersonalDetails from "../pages/student/onBoarding/personalDetails/index";
import BasicDetail from "../pages/student/onBoarding/basicDetails/index";

export default function AppRoutes() {
  const loginData = secureLocalStorage.getItem(
    import.meta.env.VITE_TOKEN_STORAGE_KEY
  );

  // Use isDashboard state instead of a static false

  return useRoutes([
    {
      path: "/",
      element: loginData ? <CarOwnerLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: "dashboard", element: <Home /> },
        { path: "students", element: <Student /> },
        {
          path: "student",
          element: <OnBoardingLayout />,
          children: [
            { path: "basic-detail/:id", element: <BasicDetail /> },
            { path: "personal-detail/:id", element: <PersonalDetails /> },
            // { path: "educational-detail", element: <EducationDetails /> },
            // { path: "employability-detail", element: <EmployabilityDetails /> },
            // { path: "career-path", element: <CareerPath /> },
            // { path: "choose-skill", element: <ComingSoon /> },
            // { path: "internship-job", element: <ComingSoon /> },
          ],
        },
        { path: "student-profile/:id", element: <StudentProfile /> },
        { path: "company", element: <Compnany /> },
      ],
    },
    {
      path: "/",
      element: !loginData ? <AuthLayout /> : <Navigate to="/" />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/forget-password", element: <Forgetpassword /> },
      ],
    },
    { path: "*", element: <NotFoundPage /> },
  ]);
}
