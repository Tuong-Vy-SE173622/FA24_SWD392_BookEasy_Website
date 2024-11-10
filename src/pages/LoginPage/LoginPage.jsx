import React, { useState } from "react";
import "./LoginPage.css";
import { Button, Checkbox, Form, Input, message } from "antd"; // Import message từ antd
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { saveTokenToCookie } from "../../services";

function LoginPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (values) => {
    // Thay đổi để nhận giá trị từ form
    try {
      const data = await login(userName, password);
      // Xử lý khi đăng nhập thành công (ví dụ: lưu token hoặc chuyển trang)
      localStorage.setItem("accessToken", data.verificationToken);
      // localStorage.setItem("refreshToken", data.resetToken);

      saveTokenToCookie(data.verificationToken);

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("username", data.username);
      // localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.roleName);
      message.success("Login successful!");
      if (rememberMe) {
        localStorage.setItem(
          "rememberMe",
          JSON.stringify({ userName, password })
        );
      } else {
        localStorage.removeItem("rememberMe");
      }
      if (data.roleName == "admin") {
        navigate("/admin/organization");
      }

      console.log("Login successful", data);
    } catch (error) {
      // setErrorMessage("Login failed. Please check your credentials."); // Thiết lập thông báo lỗi
      message.error("Login failed. Please check your credentials."); // Hiện popup thông báo lỗi
    }
  };

  const handleGoogleLogin = () => {
    // Chuyển hướng đến link đăng nhập Google
    window.location.href =
      "https://eventcheckinmanagement-h7bggygec8esg5cd.southeastasia-01.azurewebsites.net/api/authenticate/login-google";
  };

  return (
    <div className="login-container">
      <span className="circle-login-page" />
      <span className="circle-login-page" />
      <div className="system-info">
        <h1>BookEasy</h1>
        <h3>The Event system is popularly used at FPT</h3>
      </div>

      <div className="form-wrapper">
        <Form
          className="form"
          labelCol={{ span: 24 }}
          onFinish={handleLogin} // Thêm để submit form
        >
          <h2>Hello Again!</h2>
          <p>Welcome Back</p>
          {/* Thêm autocomplete cho input username */}
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)} // Cập nhật email
              autoComplete="username" // Thêm thuộc tính autocomplete
            />
          </Form.Item>
          {/* Thêm autocomplete cho input password */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              autoComplete="current-password"
            />
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            >
              Remember Me
            </Checkbox>
          </Form.Item>
          {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "} */}
          {/* Hiển thị lỗi nếu có */}
          <Form.Item>
            <Button
              type="primary"
              style={{
                width: "100%",
                borderRadius: "20px",
                marginTop: ".5rem",
              }}
              htmlType="submit" // Thay thế để submit form
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <p style={{ margin: 0, marginTop: -10 }}>Or</p>
        <button className="btn-login-google" onClick={handleGoogleLogin}>
          <img src="/google_icon.png" alt="google logo" />
          <p>Login with Google</p>
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
