import React, { useState, useCallback, useMemo } from "react";
import { Layout, Drawer } from "antd";
import { Outlet } from "react-router-dom";
import { useWindowWidth } from "@react-hook/window-size";

import MainHeader from "./MainHeader";
import Logo from "../components/Logo";
import MainMenu from "./MainMenu";
import SideNavbarMobile from "./SideNavbarMobile";

const { Content } = Layout;

function MainLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  const closeDrawer = useCallback(() => setDrawerVisible(false), []);
  const openDrawer = useCallback(() => setDrawerVisible(true), []);

  const marginLeft = useMemo(
    () => (!isMobile ? (collapsed ? 80 : 250) : 0),
    [isMobile, collapsed]
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar for Desktop */}
      {!isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: collapsed ? "80px" : "250px",
            transition: "margin-left 0.5s ease",
            height: "100vh",
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          <MainMenu collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
      )}

      {/* Drawer for Mobile */}
      {isMobile && (
        <Drawer
          title={<Logo iscollapsed={false} />}
          placement="left"
          closable
          onClose={closeDrawer}
          open={drawerVisible}
          styles={{ body: { padding: 0 } }}
        >
          <SideNavbarMobile
            collapsed={false}
            setDrawerVisible={setDrawerVisible}
          />
        </Drawer>
      )}

      <Layout
        style={{
          marginLeft,
          transition: "margin-left 0.2s ease",
        }}
      >
        <MainHeader
          setCollapsed={setCollapsed}
          setDrawerVisible={setDrawerVisible}
          drawerVisible={drawerVisible}
          collapsed={collapsed}
          isMobile={isMobile}
          openDrawer={openDrawer}
        />

        <Content
          style={{
            padding: "5px 30px",
            margin: 0,
            minHeight: "100vh",
            overflowY: "auto",
            background: "#ffffff",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
