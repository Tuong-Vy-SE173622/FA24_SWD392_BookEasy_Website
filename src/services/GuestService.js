import api from "../config/axios";

export const getGuests = async () => {
  try {
    const res = await api.get("/api/guest");
    return res.data.$values;
  } catch (err) {
    console.error("Error during get Guests:", err);
    throw err;
  }
};

export const createGuest = async (guestData) => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await api.post("/api/guest", guestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error during create Guest:", err);
    throw err;
  }
};

export const updateGuest = async (guestData) => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await api.put("/api/guest", guestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error during update Guest:", err);
    throw err;
  }
};

export const deleteGuest = async (guestID) => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await api.delete(`/api/guest/${guestID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error during delete Guest:", err);
    throw err;
  }
};
