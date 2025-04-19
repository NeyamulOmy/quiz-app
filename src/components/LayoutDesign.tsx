"use client";

import { Layout } from "antd";
import React from "react";

const { Header, Footer, Content } = Layout;

export default function LayoutDesign({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Header style={{ backgroundColor: "#001529", color: "#fff", textAlign: "center", fontSize: "20px" }}>
        Quiz App
      </Header>

      {/* Content */}
      <Content style={{ padding: "24px" }}>
        {children}
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: "center", backgroundColor: "#f0f2f5" }}>
        © {new Date().getFullYear()} Quiz App. All rights reserved.
      </Footer>
    </Layout>
  );
}
