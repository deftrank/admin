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
import EducationEdit from "../pages/student/studentProfile/educationalDetails"
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
import { Transactions } from "../pages/transaction";
import UpdatePlan from "../pages/subscription/updatePlan";
import MarketingBanner from "../pages/marketing-content/index";
import AddContent from "../pages/marketing-content/addContent/index"
import XobinTests from "../pages/xobinTests";
import CompTest from "../pages/compTest";


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
        { path: "student-education-edit/:id", element: < EducationEdit/> },
        { path: "company", element: <Compnany /> },
        { path: "company-add", element: <EditCompnany /> },
        { path: "company-edit/:id", element: <EditCompnany /> },
        { path: "company-details/:id", element: <CompnanyProfile /> },
        { path: "job", element: <Job /> },
        { path: "job-details/:id", element: <ViewDetails /> },
        { path: "internship-details/:id", element: <ViewDetails /> },
        { path: "internship", element: <Internship /> },
        { path: "transaction", element: <Transactions /> },
        { path: "xobin-tests", element: <XobinTests /> },
        { path: "comp-test", element: <CompTest /> },
        { path: "query-test-list", element: <CompTestList /> },
        { path: "raised-tickets", element: <RaisedTicket /> },
        { path: "badges", element: <Badges/> },
        { path: "subscription-plans", element: <Plans/> },
        { path: "marketing-banner", element: <MarketingBanner/> },
        { path: "subscription-plan/:id", element: <UpdatePlan/> },
        { path: "add-content", element: <AddContent/> },
        { path: "marketing-banner/edit-content/:id", element: <AddContent/> },
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
