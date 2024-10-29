import api from "../config/axios";

export const login = async (userName, password) => {
  const loginData = {
    userName: userName,
    password: password,
  };

  try {
    const response = await api.post("/api/authenticate/login", loginData);
    return response.data;
  } catch (err) {
    console.error("Error during login: ", err);
    throw err;
  }
};
