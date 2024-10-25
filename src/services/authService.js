import api from "../config/axios";

export const login = async (email, password) => {
  const loginData = {
    email: email,
    password: password,
    twoFactorCode: "string",
    twoFactorRecoveryCode: "string",
  };

  try {
    const response = await api.post(
      "/login?useCookies=false&useSessionCookies=false",
      loginData
    );
    return response.data;
  } catch (err) {
    console.error("Error during login: ", err);
    throw err;
  }
};
