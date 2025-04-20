"use client";

import { Layout, Button, Space } from "antd";
import React from "react";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname for current route
import useUserStore from "@/store/store"; // Import Zustand store
import Link from "next/link";

const { Header, Footer, Content } = Layout;

export default function LayoutDesign({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user); // Get the logged-in user
  const isLoggedIn = useUserStore((state) => state.isLoggedIn); // Check if the user is logged in
  const logout = useUserStore((state) => state.logout); // Logout action from Zustand store
  const router = useRouter(); // Initialize the router
  const pathname = usePathname(); // Get the current route

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Header
        style={{
          backgroundColor: "#001529",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        {/* Centered Title */}
        <div style={{ flex: 1, textAlign: "center", fontSize: "20px", color: "#fff" }}>
          <Link href="/">Quiz App</Link>
        </div>

        {/* Conditional Buttons */}
        <Space style={{ marginLeft: "auto" }}>
          {isLoggedIn && user?.role === "admin" && pathname !== "/questions" && (
            <Button
              type="primary"
              onClick={() => router.push("/questions")} // Navigate to /questions
            >
              Manage Questions
            </Button>
          )}
          {isLoggedIn && pathname !== "/" && (
            <Button
              type="primary"
              onClick={() => router.push("/")} // Navigate to /
            >
              Take Quiz
            </Button>
          )}
          {isLoggedIn && (
            <Button
              type="default"
              onClick={() => {
                logout(); // Call the logout action
                router.push("/login"); // Redirect to the login page
              }}
            >
              Logout
            </Button>
          )}
        </Space>
      </Header>

      {/* Content */}
      <Content style={{ padding: "24px" }}>{children}</Content>

      {/* Footer */}
      <Footer style={{ textAlign: "center", backgroundColor: "#f0f2f5" }}>
        © {new Date().getFullYear()} Quiz App. All rights reserved.
      </Footer>
    </Layout>
  );
}
