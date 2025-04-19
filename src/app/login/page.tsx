"use client";

import { Form, Input, Button } from "antd";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: { username: string; password: string }) => {
    setLoading(true);
    console.log("Username:", values.username);
    console.log("Password:", values.password);
    // Add your login logic here
    setTimeout(() => setLoading(false), 1000); // Simulate a network request
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div style={{ width: 300, padding: 24, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
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