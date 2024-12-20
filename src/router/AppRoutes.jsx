// @ts-nocheck
import { Navigate, useRoutes } from "react-router-dom";
import { LoginPage } from "../pages/authentication/LoginPage";
import { ForgotPasswordPage } from "../pages/authentication/ForgotPasswordPage";
import { DashboardPage } from "../pages/DashboardPage";
import AuthWrapper from "../pages/authentication/AuthWrapper";
import secureLocalStorage from "react-secure-storage";
import Layout from "../layouts/Layout";
import Student from "../pages/student/index";
import Compnany from "../pages/compnany";
import EditStudent from "../pages/student/EditStudentDetail/index";
import StudentProfile from "../pages/student/studentProfile/index";
import EditCompnany from "../pages/compnany/EditCompnanyDetail/index";
import CompnanyProfile from "../pages/compnany/CompnanyProfile/index";
import Job from "../pages/compnany/jobs/index";
import Internship from "../pages/compnany/internship/index";
import CompTestList from "../pages/compnany/compTestQueries";
import ViewDetails from "../pages/compnany/viewDetails";
import RaisedTicket from "../pages/raisedTicket/index";
import Badges from "../pages/student/Badges/index";
import Plans from "../pages/subscription/index";

const AppRoutes = () => {
  const loginData = secureLocalStorage.getItem(
    import.meta.env.VITE_TOKEN_STORAGE_KEY
  );

  return useRoutes([
    {
      path: "/",
      element: loginData ? <Layout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: "dashboard", element: <DashboardPage /> },
        { path: "students", element: <Student /> },
        { path: "student-edit/:id", element: <EditStudent /> },
        { path: "student-details/:id", element: <StudentProfile /> },
        { path: "company", element: <Compnany /> },
        { path: "company-add", element: <EditCompnany /> },
        { path: "company-edit/:id", element: <EditCompnany /> },
        { path: "company-details/:id", element: <CompnanyProfile /> },
        { path: "job", element: <Job /> },
        { path: "job-details/:id", element: <ViewDetails /> },
        { path: "internship-details/:id", element: <ViewDetails /> },
        { path: "internship", element: <Internship /> },
        { path: "transaction", element: <DashboardPage /> },
        { path: "query-test-list", element: <CompTestList /> },
        { path: "raised-tickets", element: <RaisedTicket /> },
        { path: "badges", element: <Badges/> },
        { path: "subscription-plans", element: <Plans/> },
      ],
    },
    {
      path: "/",
      element: !loginData ? <AuthWrapper /> : <Navigate to="/" />,
      children: [
        { path: "/login", element: <LoginPage /> },
        { path: "/forget-password", element: <ForgotPasswordPage /> },
      ],
    },
  ]);
};
export default AppRoutes;
