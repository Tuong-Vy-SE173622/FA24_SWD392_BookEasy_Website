import Cookies from "js-cookie";

// Lưu token vào cookie
export const saveTokenToCookie = (token) => {
  const expires = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 phút tính bằng milliseconds
  Cookies.set("accessToken", token, { expires, secure: true });
};

export const getTokenFromCookie = () => {
  return Cookies.get("accessToken");
};
