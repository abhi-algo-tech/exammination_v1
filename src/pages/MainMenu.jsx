import { Layout, Menu, Button, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CloudUploadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import "./MainMenu.css";

const { Sider } = Layout;

const menuItems = [
  {
    key: "dashboard",
    icon: (
      <img
        src="/icons/png/Dashboard.png"
        width={22}
        height={22}
        alt="Dashboard"
      />
    ),
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    key: "exam-management",
    icon: (
      <img
        src="/icons/png/exam-management.png"
        width={22}
        height={22}
        alt="exam-management"
      />
    ),
    label: "Exam Management",
    link: "/exam-management",
  },
  {
    key: "Question Bank",
    icon: (
      <img
        src="/icons/png/question-bank.png"
        width={22}
        height={22}
        alt="Question Bank"
      />
    ),
    label: "Question Bank",
    link: "/question-bank",
  },
  {
    key: "The Learning Hub",
    icon: (
      <img
        src="/icons/png/learning-hub.png"
        width={22}
        height={22}
        alt="The Learning Hubs"
      />
    ),
    label: "The Learning Hubs",
    link: "/learning-hub",
  },
  {
    key: "Proctoring",
    icon: (
      <img
        src="/icons/png/proctoring.png"
        width={22}
        height={18}
        alt="Proctoring"
      />
    ),
    label: "Proctoring",
    link: "/proctoring",
  },
  {
    key: "Student Management",
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
    key: "Grading & Assessment",
    icon: (
      <img
        src="/icons/png/grading-assessment.png"
        width={22}
        height={18}
        alt="Grading & Assessment"
      />
    ),
    label: "Grading & Assessment",
    link: "/grading&assessment",
  },
  {
    key: "AI Integration",
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
  // {
  //   key: "upload",
  //   icon: <CloudUploadOutlined />,
  //   label: "Upload",
  //   link: "/upload",
  // },
  // {
  //   key: "upload",
  //   icon: <CloudUploadOutlined />,
  //   label: "Upload",
  //   link: "/upload",
  // },
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
      className="custom-sider "
      collapsible
      style={{
        overflowY: "auto", // Enables scrolling when content overflows
        height: "70vh", // Ensures the sidebar takes full height
        background: "rgba(0, 0, 0, 0.5)", // Transparent background (you can adjust the opacity)
        backdropFilter: "blur(10px)", // Optional: Adds blur effect to the background
        boxShadow: "none", // Optional: Removes the box shadow
      }}
    >
      {/* Sidebar Logo */}
      <div
        className=" text-center d-flex justify-content-center  my-2"
        // style={{ textAlign: "center", paddingTop: "20px" }}
      >
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

      {/* Menu Items */}
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        items={menuItems.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: collapsed ? (
            <Tooltip title={item.label}>
              <Link
                to={item.link}
                style={{ display: "flex", alignItems: "center" }}
              ></Link>
            </Tooltip>
          ) : (
            <Link
              to={item.link}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <span>{item.label}</span>
            </Link>
          ),
        }))}
        className="custom-menu"
        style={{
          background: "transparent", // Transparent background for the menu
          border: "none", // Optional: Removes the border for a cleaner look
        }}
      />
    </Sider>
  );
}

export default MainMenu;
