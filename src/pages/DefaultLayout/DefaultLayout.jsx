import React, { useEffect } from "react";
import "./DefaultLayout.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RiCalendarEventFill, RiDashboardFill } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";
import { FaBell, FaRegBuilding, FaRegStar } from "react-icons/fa";
import { IoSearch, IoSettingsOutline } from "react-icons/io5";
import { Avatar, Badge } from "antd";
import { HiOutlineUserGroup } from "react-icons/hi";
import { getTokenFromCookie } from "../../services";
// import { IoIosArrowDropdown } from "react-icons/io";
// import Sidebar from "../../components/SideBar/Sidebar";
// import { Outlet } from "react-router-dom";
// import Header from "../.S./components/Header/Header";

function DefaultLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const username = localStorage.getItem("username");

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <RiDashboardFill /> },
    {
      path: "/admin/organization",
      label: "Organizations",
      icon: <FaRegBuilding />,
    },
    { path: "/admin/events", label: "Events", icon: <RiCalendarEventFill /> },
    {
      path: "/admin/guest-groups",
      label: "Guest Group",
      icon: <HiOutlineUserGroup />,
    },
    { path: "/admin/guests", label: "Guest", icon: <BsPeople /> },
    { path: "/admin/accounts", label: "Account", icon: <FaRegStar /> },
    { path: "/admin/setting", label: "Setting", icon: <IoSettingsOutline /> },
  ];

  const currentMenuItem = menuItems.find((item) => item.path === pathname);

  useEffect(() => {
    const isAuthenticated = getTokenFromCookie(); // Kiểm tra xem người dùng có accessToken chưa

    if (!isAuthenticated) {
      navigate("/"); // Nếu không, điều hướng tới trang login
    }
  }, [navigate]);

  return (
    <div>
      {/* DefaultLayout */}
      {/* <Header />
      <Sidebar />
      <Outlet /> */}
      <div className="layout-container-l1">
        <div className="sidebar-wrapper">
          <img src="/logo.png" alt="" />
          <div className="menu">
            {menuItems.map(({ path, label, icon }) => (
              <div
                key={path}
                className={`menu-item ${
                  pathname === path ||
                  (path === "/dashboard" && pathname === "/")
                    ? "active"
                    : ""
                }`}
                onClick={() => navigate(path)}
              >
                <span className="icon">{icon}</span>
                <span className="label">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="main-wrapper">
          <div className="header-container">
            <div className="header-title">
              {currentMenuItem?.label || "Page Not Found"}
            </div>
            {/* <div className="header-search">
              <div className="search">
                <input type="text" name="" id="" placeholder="Search" />
                <span className="search-icon">
                  <IoSearch size={"18px"} />
                </span>
              </div>
            </div> */}
            {/* <div className="notification">
              <Badge count={99}>
                <FaBell size={28} className="notification-icon" />
              </Badge>
            </div> */}
            <div className="header-account">
              {/* <Avatar
                src="https://petnow.com.vn/wp-content/uploads/2023/07/z4512403771355_aed28eee2080f124fa47a5f1c302723a.jpg"
                alt="avatar"
                size={45}
              /> */}
              <div className="username-acount">
                {username}
                {/* <IoIosArrowDropdown className="icon" /> */}
              </div>
            </div>
          </div>
          <div className="main-container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
