// import api from "../config/axios";

// // Fetch guests with pagination
// export const getGuests = async (pageNumber, pageSize) => {
//   try {
//     const res = await api.get(
//       `/api/guest?pageNumber=${pageNumber}&pageSize=${pageSize}`
//     );
//     return res.data;
//   } catch (err) {
//     console.error("Error during get Guests:", err);
//     throw err;
//   }
// };

// // Create a new guest
// export const createGuest = async (guestData, imageFile) => {
//   try {
//     const formData = new FormData();
//     formData.append("name", guestData.name);
//     formData.append("email", guestData.email);
//     formData.append("phoneNumber", guestData.phoneNumber);
//     formData.append("address", guestData.address);
//     formData.append("guestGroupID", guestData.guestGroupID);
//     formData.append("birthday", guestData.birthday);
//     if (imageFile) {
//       formData.append("imageFile", imageFile);
//     }

//     console.log("formData", formData);

//     const res = await api.post("/api/guest", formData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//     });
//     return res.data;
//   } catch (err) {
//     console.error("Error during create Guest:", err);
//     throw err;
//   }
// };

// // Update guest details
// export const updateGuest = async (guestData) => {
//   try {
//     const res = await api.put(`/api/guest/${guestData.guestID}`, guestData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//     });
//     return res.data;
//   } catch (err) {
//     console.error("Error during update Guest:", err);
//     throw err;
//   }
// };

// // Delete a guest
// export const deleteGuest = async (guestID) => {
//   try {
//     await api.delete(`/api/guest/${guestID}`);
//   } catch (err) {
//     console.error("Error during delete Guest:", err);
//     throw err;
//   }
// };

import api from "../config/axios";

// Fetch guests with pagination
export const getGuests = async (pageNumber, pageSize) => {
  try {
    const res = await api.get(
      `/api/guest?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return res.data;
  } catch (err) {
    console.error("Error during get Guests:", err);
    throw err;
  }
};

// Create a new guest
export const createGuest = async (guestData, imageFile) => {
  try {
    const token = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("Name", guestData.name);
    formData.append("Email", guestData.email);
    formData.append("PhoneNumber", guestData.phoneNumber);
    formData.append("Address", guestData.address);
    formData.append("GuestGroupID", guestData.guestGroupID);
    formData.append("Birthday", guestData.birthday);
    formData.append("ImageUrl", "string");
    if (imageFile) formData.append("ImageFile", imageFile);

    const res = await api.post("/api/guest", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error during create guest:", err);
    throw err;
  }
};

// Update guest data
export const updateGuest = async (guestData) => {
  try {
    const res = await api.put(`/api/guest/${guestData.guestID}`, guestData);
    return res.data;
  } catch (err) {
    console.error("Error during update guest:", err);
    throw err;
  }
};

// Delete guest by ID
export const deleteGuest = async (id) => {
  try {
    await api.delete(`/api/guest/${id}`);
  } catch (err) {
    console.error("Error during delete guest:", err);
    throw err;
  }
};
