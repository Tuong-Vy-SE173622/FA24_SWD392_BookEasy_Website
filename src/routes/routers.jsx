import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import DefaultLayout from "../pages/DefaultLayout/DefaultLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import EventPage from "../pages/EventPage/EventPage";
import GuestPage from "../pages/GuestPage/GuestPage";
import StaffPage from "../pages/StaffPage/StaffPage";
import SettingPage from "../pages/SettingPage/SettingPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <>
        <DefaultLayout />
      </>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/events",
        element: <EventPage />,
      },
      {
        path: "/guests",
        element: <GuestPage />,
      },
      {
        path: "/staffs",
        element: <StaffPage />,
      },
      {
        path: "/setting",
        element: <SettingPage />,
      },
    ],
  },
]);
