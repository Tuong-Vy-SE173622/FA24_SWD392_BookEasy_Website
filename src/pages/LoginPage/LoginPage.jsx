// import React, { useState } from "react";
// import "./LoginPage.css";
// import { Button, Form, Input } from "antd";
// import { login } from "../../services/authService";
// import { useNavigate } from "react-router-dom";

// function LoginPage() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleLogin = async (e) => {
//     // e.preventDefault();

//     try {
//       const data = await login(email, password);
//       // Xử lý khi đăng nhập thành công (ví dụ: lưu token hoặc chuyển trang)
//       localStorage.setItem("accessToken", data.accessToken);
//       localStorage.setItem("refreshToken", data.refreshToken);
//       navigate("/");
//       console.log("Login successful", data);
//     } catch (error) {
//       setErrorMessage("Login failed. Please check your credentials.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <span className="circle-login-page" />
//       <span className="circle-login-page" />
//       <div className="system-info">
//         <h1>BookEasy</h1>
//         <h3>The Event system is popularly used at FPT</h3>
//       </div>

//       <div className="form-wrapper">
//         <Form
//           className="form"
//           labelCol={{
//             span: 24,
//           }}
//           onFinish={handleLogin} // Thêm để submit form
//         >
//           <h2>Hello Again!</h2>
//           <p>Welcome Back</p>
//           {/* Thêm autocomplete cho input username */}
//           <Form.Item name="username">
//             <Input
//               type="text"
//               placeholder="Username"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)} // Cập nhật email
//               autoComplete="username" // Thêm thuộc tính autocomplete
//             />
//           </Form.Item>
//           {/* Thêm autocomplete cho input password */}
//           <Form.Item name="password">
//             <Input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)} // Cập nhật password
//               autoComplete="current-password" // Thêm thuộc tính autocomplete
//             />
//           </Form.Item>
//           {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
//           {/* Hiển thị lỗi nếu có */}
//           <Form.Item>
//             <Button
//               type="primary"
//               style={{
//                 width: "100%",
//                 borderRadius: "20px",
//                 marginTop: ".5rem",
//               }}
//               htmlType="submit" // Thay thế để submit form
//             >
//               Login
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

import React, { useState } from "react";
import "./LoginPage.css";
import { Button, Form, Input, message } from "antd"; // Import message từ antd
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (values) => {
    // Thay đổi để nhận giá trị từ form
    try {
      const data = await login(email, password);
      // Xử lý khi đăng nhập thành công (ví dụ: lưu token hoặc chuyển trang)
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      message.success("Login successful!"); // Hiện popup thông báo thành công
      navigate("/"); // Chuyển trang sau khi đăng nhập thành công
      console.log("Login successful", data);
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials."); // Thiết lập thông báo lỗi
      message.error("Login failed. Please check your credentials."); // Hiện popup thông báo lỗi
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Cập nhật email
              autoComplete="username" // Thêm thuộc tính autocomplete
            />
          </Form.Item>
          {/* Thêm autocomplete cho input password */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Cập nhật password
              autoComplete="current-password" // Thêm thuộc tính autocomplete
            />
          </Form.Item>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
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
      </div>
    </div>
  );
}

export default LoginPage;
