import React from "react";
import { Layout, Input, Badge, Dropdown, Space, Button, Row, Col } from "antd";
import {
  SearchOutlined,
  CaretDownOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useUserLogout } from "../hooks/useAuth";
import { useSelector } from "react-redux";

const { Header } = Layout;

function MainHeader({
  setDrawerVisible,
  setCollapsed,
  drawerVisible,
  collapsed,
  isMobile,
}) {
  const logout = useUserLogout();
  const userProfile = useSelector((state) => state.auth.profile);
  console.log("userProfile:", userProfile);

  const handleLogout = () => {
    logout(); // Perform logout action
  };
  const profileData = {
    name: `Helo ${userProfile?.firstName}`,
    role: userProfile?.roleDto?.name,
    avatar: "/exam_images/profile.jpg",
    menuItems: [
      { key: "1", label: "Profile" },
      { key: "2", label: "Settings" },
      { key: "3", label: "Logout", onClick: handleLogout },
    ],
  };

  const notificationData = [
    {
      icon: <BellOutlined style={{ fontSize: "20px", color: "#797979" }} />,
      count: 2,
      alt: "Notifications",
    },
    {
      icon: <SettingOutlined style={{ fontSize: "20px", color: "#797979" }} />,
      count: 0,
      alt: "Setting",
    },
    {
      icon: "/icons/png/question_icon.png",
      count: 0,
      alt: "Question",
    },
  ];

  const handleSearch = (value) => {
    console.log("Search Value:", value);
  };

  const toggleCollapsed = () => {
    if (isMobile) {
      setDrawerVisible(!drawerVisible);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <Header
      style={{
        background: "#F5F7FA",
        padding: "0 30px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderBottom: "none",
        width: "100%",
        height: "80px",
      }}
    >
      <Row
        className="w-100 align-items-center justify-content-between"
        style={{ width: "100%" }}
      >
        {/* Left Section */}
        <Col xs="auto" className="d-md-none">
          <Button
            type="primary"
            onClick={toggleCollapsed}
            className="toggle-header-button"
            icon={<AiOutlineMenuUnfold />}
          />
        </Col>

        {/* Center Section */}
        <Col
          xs={3} // Full width on small screens
          sm={6} // Adjusted for small screens
          md={8} // 8/12 on medium screens
          lg={12} // 6/12 on large screens
          className="pr-3"
        >
          <Input
            placeholder="Search for questions, exams and more"
            prefix={<SearchOutlined style={{ color: "#373737" }} />}
            onChange={(e) => handleSearch(e.target.value)}
            className="global-search"
            style={{
              width: "100%", // Ensure the input takes up 100% width of its container
              height: "40px",
              background: "#F5F7FA",
              borderColor: "#4C4A4F",
              fontFamily: "Montserrat, sans-serif", // Apply Montserrat font
              color: "#373737", // Apply font color
            }}
          />
        </Col>

        {/* Right Section */}
        <Col xs="auto">
          <Space size="large" align="center">
            {notificationData.map((notification, index) => (
              <Badge
                key={index}
                count={notification.count > 0 ? notification.count : null} // Show count only if > 0
                dot={notification.count > 0} // Show a red dot if count > 0
                offset={[0, 0]}
                className="custom-badge"
              >
                <img
                  src={
                    typeof notification.icon === "string"
                      ? notification.icon
                      : null
                  }
                  alt={notification.alt}
                  style={{
                    width: 22,
                    height: 21,
                    display:
                      typeof notification.icon === "string"
                        ? "inline-block"
                        : "none",
                  }}
                />
                {typeof notification.icon !== "string" && notification.icon}{" "}
                {/* Render icon if it's a React component */}
              </Badge>
            ))}
            <Dropdown
              menu={{ items: profileData.menuItems }}
              trigger={["click"]}
            >
              <Space className="cursor-pointer">
                <img
                  src={profileData.avatar}
                  alt={profileData.name || "User"}
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
                <div className="d-none d-md-block">
                  <div className="profile-info">
                    <div className="label-16-600-b">{profileData.name}</div>
                    <div className="label-12-600-grey">{profileData.role}</div>
                  </div>
                </div>
                <CaretDownOutlined className="pointer" />
              </Space>
            </Dropdown>
          </Space>
        </Col>
      </Row>
    </Header>
  );
}

export default MainHeader;
