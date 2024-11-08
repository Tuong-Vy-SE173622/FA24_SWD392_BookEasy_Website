import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import DefaultLayout from "../pages/DefaultLayout/DefaultLayout";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import EventPage from "../pages/Admin/EventPage/EventPage";
import GuestPage from "../pages/Admin/GuestPage/GuestPage";
// import StaffPage from "../pages/Admin/StaffPage/StaffPage";
import SettingPage from "../pages/Admin/SettingPage/SettingPage";
import OrganizationPage from "../pages/Admin/OrganizationPage/OrganizationPage";
import Home from "../pages/Staff/Home/Home";
import GuestGroupPage from "../pages/Admin/GuestGroupPage/GuestGroupPage";
import AccountPage from "../pages/Admin/AccountPage/AccountPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: (
      <>
        <DefaultLayout />
      </>
    ),
    children: [
      // {
      //   index: true,
      //   element: <Dashboard />,
      // },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "events",
        element: <EventPage />,
      },
      {
        path: "guests",
        element: <GuestPage />,
      },
      {
        path: "guest-groups",
        element: <GuestGroupPage />,
      },
      {
        path: "accounts",
        element: <AccountPage />,
      },
      {
        path: "organization",
        element: <OrganizationPage />,
      },
      {
        path: "setting",
        element: <SettingPage />,
      },
    ],
  },
  {
    path: "user",
    element: <Home />,
  },
]);
