import api from "../config/axios";

export const getEvents = async () => {
  const response = await api.get("/api/event", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data.$values;
};

export const createEvent = async (eventData) => {
  const response = await api.post("/api/event", eventData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

//   export const updateEvent = async (eventData) => {
//     const response = await axios.put(`/api/event/${eventData.eventID}`, eventData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//     });
//     return response.data;
//   };

export const deleteEvent = async (id) => {
  await api.delete(`/api/event/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};
