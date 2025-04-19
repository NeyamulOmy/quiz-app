"use client";

import { Form, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import useUserStore from "@/store/store"; // Import the Zustand store

export default function LoginPage() {
  const login = useUserStore((state) => state.login); // Zustand login action
  const error = useUserStore((state) => state.error); // Zustand error state
  const isLoggedIn = useUserStore((state) => state.isLoggedIn); // Zustand login state
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleSubmit = (values: { username: string; password: string }) => {
    setLoading(true);
    login(values.username, values.password); // Call Zustand's login action
    setTimeout(() => {
      setLoading(false);
      if (useUserStore.getState().isLoggedIn) {
        router.push("/"); // Redirect to the home page
      }
    }, 1000); // Simulate a network request
  };

  // Redirect to home page when logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/"); // Redirect to the home page
    }
  }, [isLoggedIn, router]); // Run this effect when isLoggedIn changes

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        margin: 0,
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          width: 300,
          padding: 24,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login</h2>
        <Form
          name="login"
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          {error && (
            <div style={{ color: "red", marginBottom: 16, textAlign: "center" }}>
              {error}
            </div>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}