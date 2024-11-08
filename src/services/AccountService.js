import api from "../config/axios";

export const getAllAccounts = async () => {
  try {
    const res = await api.get("/api/user/get-all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error during get All Accounts:", err);
    throw err;
  }
};

export const createAccount = async (accountData) => {
  try {
    const res = await api.post("/api/authenticate/register", accountData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error during create Account:", err);
    throw err;
  }
};

export const updateAccount = async (accountData) => {
  try {
    const res = await api.put("/api/user/update", accountData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error during update Account:", err);
    throw err;
  }
};

export const deleteAccount = async (accountId) => {
  try {
    const res = await api.delete(`/api/user/deactive?userId=${accountId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error during delete Account:", err);
    throw err;
  }
};
