import { Layout, Menu, Button } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdOutlineCollectionsBookmark,
  MdOutlineDashboard,
  MdOutlineLibraryBooks,
} from "react-icons/md";
import { TbEyeCheck } from "react-icons/tb";
import "./MainMenu.css";

const { Sider } = Layout;

const menuItems = [
  {
    key: "dashboard",
    icon: <MdOutlineDashboard style={{ width: 25, height: 25 }} />,
    // icon: (
    //   <img
    //     src="/icons/png/Dashboard.png"
    //     width={22}
    //     height={22}
    //     alt="Dashboard"
    //   />
    // ),
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    key: "exam-management",
    icon: <MdOutlineLibraryBooks style={{ width: 25, height: 25 }} />,
    // icon: (
    //   <img
    //     src="/icons/png/exam-management.png"
    //     width={22}
    //     height={22}
    //     alt="Exam Management"
    //   />
    // ),
    label: "Exam Management",
    link: "/exam-management",
  },
  {
    key: "question-bank",
    icon: <MdOutlineCollectionsBookmark style={{ width: 25, height: 25 }} />,
    label: "Question Bank",
    link: "/question-bank",
    children: [
      { key: "theme-1", label: "Theme 1", link: "/question-bank/theme1" },
      { key: "theme-2", label: "Theme 2", link: "/question-bank/theme2" },
    ],
  },
  {
    key: "learning-hub",
    icon: (
      <img
        src="/icons/png/learning-hub.png"
        width={22}
        height={22}
        alt="Learning Hub"
      />
    ),
    label: "The Learning Hub",
    link: "/learning-hub",
  },
  {
    key: "proctoring",
    icon: <TbEyeCheck style={{ width: 25, height: 25 }} />,
    // icon: (
    //   <img
    //     src="/icons/png/proctoring.png"
    //     width={22}
    //     height={18}
    //     alt="Proctoring"
    //   />
    // ),
    label: "Proctoring",
    link: "/proctoring",
  },
  {
    key: "student-management",
    icon: (
      <img
        src="/icons/png/student.png"
        width={22}
        height={18}
        alt="Student Management"
      />
    ),
    label: "Student Management",
    link: "/student-management",
  },
  {
    key: "grading-assessment",
    icon: (
      <img
        src="/icons/png/grading-assessment.png"
        width={22}
        height={18}
        alt="Grading & Assessment"
      />
    ),
    label: "Grading & Assessment",
    link: "/grading-assessment",
  },
  {
    key: "ai-integration",
    icon: (
      <img
        src="/icons/png/ai.png"
        width={22}
        height={18}
        alt="AI Integration"
      />
    ),
    label: "AI Integration",
    link: "/ai-integration",
  },
];

function MainMenu({ collapsed, setCollapsed }) {
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    const activeItem = menuItems.find((item) => pathname.startsWith(item.link));
    if (activeItem) {
      setSelectedKeys([activeItem.key]);
    }
  }, [pathname]);

  return (
    <Sider
      width={collapsed ? 80 : 250}
      collapsed={collapsed}
      trigger={null}
      collapsible
      style={{
        overflowY: "auto",
        height: "auto",
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
        boxShadow: "none",
      }}
    >
      {/* Sidebar Logo */}
      <div className=" text-center d-flex justify-content-center  my-2">
        <div className="main-menu-icon d-flex justify-content-center align-items-center">
          <img
            src="/icons/png/Sketch-board-logo.png"
            alt="Logo"
            width={collapsed ? 50 : 100}
            style={{ transition: "width 0.3s", height: "34px", width: "31px" }}
          />
        </div>
      </div>
      <div>
        {!collapsed && (
          <div
            style={{
              marginTop: "2px",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#797979",
              textAlign: "center",
            }}
          >
            Create Exam Now
          </div>
        )}
      </div>
      {/* Collapse Button */}
      <div style={{ textAlign: "center", paddingBottom: "30px 0" }}>
        <Button
          type="text"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle Sidebar"
          style={{ padding: 0 }} // To remove extra padding around the button
        >
          <img
            src={collapsed ? "/icons/png/expand.png" : "/icons/png/colapse.png"}
            alt={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            width={40} // Set an appropriate width
            height={24} // Set an appropriate height
            style={{ transition: "transform 0.3s" }}
          />
        </Button>
      </div>

      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        items={menuItems.map((item) => ({
          key: item.key,
          label: <Link to={item.link || "#"}>{item.label}</Link>,
          icon: (
            <span
              style={{
                color: selectedKeys.includes(item.key) ? "#fff" : "#797979",
              }}
            >
              {item.icon}
            </span>
          ),
          children: item.children
            ? item.children.map((child) => ({
                key: child.key,
                label: <Link to={child.link}>{child.label}</Link>,
              }))
            : undefined, // Ensures `children` is only added when present
        }))}
        className="custom-menu"
        style={{
          background: "transparent",
          border: "none",
        }}
      />
    </Sider>
  );
}

export default MainMenu;
