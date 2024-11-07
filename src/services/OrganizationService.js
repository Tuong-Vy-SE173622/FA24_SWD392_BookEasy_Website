import api from "../config/axios";

export const getOrganization = async (pageNumber, pageSize) => {
  try {
    const res = await api.get(
      `/api/organization?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return res.data;
  } catch (err) {
    console.error("Error during get Organization: ", err);
    throw err;
  }
};

export const createOrganization = async (organizationData) => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await api.post("/api/organization", organizationData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error during create Organization:", err);
    throw err;
  }
};

export const updateOrganization = async (organizationData) => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await api.put(`/api/organization`, organizationData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error during update Organization:", err);
    throw err;
  }
};

export const deleteOrganization = async (organizationID) => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await api.delete(`/api/organization/${organizationID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // có thể trả về kết quả từ server nếu cần
  } catch (err) {
    console.error("Error during delete Organization:", err);
    throw err;
  }
};
