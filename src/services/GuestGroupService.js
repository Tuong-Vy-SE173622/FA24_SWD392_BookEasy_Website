import api from "../config/axios";

export const getGuestGroups = async () => {
  const response = await api.get("/api/guestgroup", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data.$values;
};

export const createGuestGroup = async (guestGroupData) => {
  const response = await api.post("/api/guestgroup", guestGroupData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const deleteGuestGroup = async (id) => {
  await api.delete(`/api/guestgroup/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

export const updateGuestGroup = async (guestGroupData) => {
  const response = await api.put(`/api/guestgroup`, guestGroupData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};
