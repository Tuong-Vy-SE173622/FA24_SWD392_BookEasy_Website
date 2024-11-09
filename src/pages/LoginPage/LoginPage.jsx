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
      // localStorage.setItem("accessToken", data.verificationToken);
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
        navigate("/admin/dashboard");
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

// import React, { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Button, message } from "antd";
// import { saveTokenToCookie } from "../../services"; // Hàm lưu token vào cookie

// function LoginPage() {
//   const navigate = useNavigate();

//   // Hàm xử lý đăng nhập Google
//   const handleGoogleLogin = () => {
//     window.location.href =
//       "https://eventcheckinmanagement-h7bggygec8esg5cd.southeastasia-01.azurewebsites.net/api/authenticate/login-google";
//   };

//   // const navigate = useNavigate();

//   useEffect(() => {
//     // Kiểm tra nếu URL hiện tại là google-response
//     if (
//       window.location.href ===
//       "https://eventcheckinmanagement-h7bggygec8esg5cd.southeastasia-01.azurewebsites.net/api/authenticate/google-response"
//     ) {
//       // Chuyển hướng về trang đăng nhập
//       navigate("/login");
//     }
//   }, [navigate]);

//   // Hàm lấy dữ liệu từ `google-response`
//   const fetchGoogleResponse = async () => {
//     try {
//       const response = await axios.get(
//         "https://eventcheckinmanagement-h7bggygec8esg5cd.southeastasia-01.azurewebsites.net/api/authenticate/google-response"
//       );

//       const data = response.data;
//       if (data?.verificationToken) {
//         saveTokenToCookie(data.verificationToken);
//         localStorage.setItem("userId", data.userId);
//         localStorage.setItem("username", data.username);
//         localStorage.setItem("role", data.roleName);

//         message.success("Đăng nhập Google thành công!");
//         navigate("/admin/dashboard");
//       } else {
//         message.error("Đăng nhập thất bại. Vui lòng thử lại.");
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error(error);
//       message.error("Đăng nhập thất bại. Vui lòng thử lại.");
//       navigate("/login");
//     }
//   };

//   // Kiểm tra trạng thái đăng nhập Google
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     if (urlParams.get("status") === "success") {
//       fetchGoogleResponse(); // Gọi hàm lấy dữ liệu khi đăng nhập thành công
//     }
//   }, []);

//   return (
//     <div>
//       <Button type="primary" onClick={handleGoogleLogin}>
//         Đăng nhập với Google
//       </Button>
//     </div>
//   );
// }

// export default LoginPage;

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button, message } from "antd";
// import { saveTokenToCookie } from "../../services"; // Hàm lưu token vào cookie

// function LoginPage() {
//   const navigate = useNavigate();

//   // Hàm xử lý đăng nhập Google
//   const handleGoogleLogin = () => {
//     window.location.href =
//       "https://eventcheckinmanagement-h7bggygec8esg5cd.southeastasia-01.azurewebsites.net/api/authenticate/login-google";
//   };

//   // Kiểm tra nếu URL hiện tại là `google-response`
//   useEffect(() => {
//     const currentUrl = window.location.href;
//     console.log("currentUrl:", currentUrl); // In ra URL để kiểm tra

//     if (currentUrl.includes("google-response")) {
//       // Chuyển hướng về trang http://localhost:4001/
//       // Sử dụng window.location.replace để thay thế trang hiện tại
//       window.location.replace("http://localhost:4001/");
//     }
//   }, []);

//   // Hàm lấy dữ liệu từ `google-response`
//   const fetchGoogleResponse = async () => {
//     try {
//       const response = await axios.get(
//         "https://eventcheckinmanagement-h7bggygec8esg5cd.southeastasia-01.azurewebsites.net/api/authenticate/google-response"
//       );

//       const data = response.data;
//       if (data?.verificationToken) {
//         saveTokenToCookie(data.verificationToken);
//         localStorage.setItem("userId", data.userId);
//         localStorage.setItem("username", data.username);
//         localStorage.setItem("role", data.roleName);

//         message.success("Đăng nhập Google thành công!");
//         navigate("/admin/dashboard");
//       } else {
//         message.error("Đăng nhập thất bại. Vui lòng thử lại.");
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error(error);
//       message.error("Đăng nhập thất bại. Vui lòng thử lại.");
//       navigate("/login");
//     }
//   };

//   return (
//     <div>
//       <Button type="primary" onClick={handleGoogleLogin}>
//         Đăng nhập với Google
//       </Button>
//     </div>
//   );
// }

// export default LoginPage;

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Button, message } from "antd";
// import { saveTokenToCookie } from "../../services"; // Hàm lưu token vào cookie

// function LoginPage() {
//   const navigate = useNavigate();

//   // Hàm xử lý đăng nhập Google
//   const handleGoogleLogin = () => {
//     window.location.href =
//       "https://eventcheckinmanagement-h7bggygec8esg5cd.southeastasia-01.azurewebsites.net/api/authenticate/login-google";
//   };

//   // Hàm lấy dữ liệu từ `google-response`
//   const fetchGoogleResponse = async () => {
//     try {
//       const response = await axios.get(
//         "https://eventcheckinmanagement-h7bggygec8esg5cd.southeastasia-01.azurewebsites.net/api/authenticate/google-response"
//       );

//       const data = response.data;
//       if (data?.verificationToken) {
//         saveTokenToCookie(data.verificationToken);
//         localStorage.setItem("userId", data.userId);
//         localStorage.setItem("username", data.username);
//         localStorage.setItem("role", data.roleName);

//         message.success("Đăng nhập Google thành công!");
//         navigate("/admin/dashboard");
//       } else {
//         message.error("Đăng nhập thất bại. Vui lòng thử lại.");
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error(error);
//       message.error("Đăng nhập thất bại. Vui lòng thử lại.");
//       navigate("/login");
//     }
//   };

//   // Kiểm tra trạng thái đăng nhập Google và điều hướng nếu URL chứa google-response
//   useEffect(() => {
//     const currentUrl = window.location.href;

//     // Log để kiểm tra URL hiện tại từ phía frontend
//     console.log("Frontend currentUrl:", currentUrl);

//     // Kiểm tra nếu URL hiện tại chứa 'google-response' và không phải là trang login
//     if (
//       currentUrl.includes("google-response") &&
//       !currentUrl.includes("login")
//     ) {
//       // Gọi API google-response và lấy dữ liệu
//       fetchGoogleResponse();
//     } else if (
//       currentUrl.includes("google-response") &&
//       currentUrl.includes("login")
//     ) {
//       // Điều hướng về trang login nếu không phải trang google-response
//       console.log("Redirecting to login...");
//       window.location.href = "http://localhost:4001/";
//     }
//   }, []);

//   return (
//     <div>
//       <Button type="primary" onClick={handleGoogleLogin}>
//         Đăng nhập với Google
//       </Button>
//     </div>
//   );
// }

// export default LoginPage;
