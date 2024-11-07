import api from "../config/axios";

export const getGuestGroups = async (pageNumber, pageSize) => {
  const response = await api.get(
    `/api/guestgroup?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
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
