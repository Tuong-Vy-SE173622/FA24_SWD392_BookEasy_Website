import api from "../config/axios";

export const getEvents = async (pageNumber, pageSize) => {
  const response = await api.get(
    `/api/event?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await api.post("/api/event", eventData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const updateEvent = async (eventData) => {
  const response = await api.put(`/api/event`, eventData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const deleteEvent = async (id) => {
  await api.delete(`/api/event/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};
