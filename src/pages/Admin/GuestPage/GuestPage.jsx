// import React, { useEffect, useState } from "react";
// import { Table, Button, Modal, Form, Input, DatePicker } from "antd";
// import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
// // import "./GuestPage.css";
// import {
//   createGuest,
//   deleteGuest,
//   getGuests,
//   updateGuest,
// } from "../../../services/GuestService";
// import { getGuestGroups } from "../../../services/GuestGroupService";

// const GuestPage = () => {
//   const [guests, setGuests] = useState([]);
//   const [guestGroups, setGuestGroups] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingGuest, setEditingGuest] = useState(null);
//   const [form] = Form.useForm();
//   const pageSize = 5;

//   const openModal = (record = null) => {
//     setEditingGuest(record);
//     setIsModalOpen(true);
//     form.setFieldsValue(record || {});
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     form.resetFields();
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteGuest(id); // Gọi API xóa khách
//       setGuests(guests.filter((guest) => guest.guestID !== id));
//     } catch (error) {
//       console.error("Failed to delete guest:", error);
//     }
//   };

//   const handleSave = () => {
//     form.validateFields().then(async (values) => {
//       try {
//         if (editingGuest) {
//           // Gọi API cập nhật khách
//           await updateGuest({ ...editingGuest, ...values });
//           setGuests(
//             guests.map((guest) =>
//               guest.guestID === editingGuest.guestID
//                 ? { ...editingGuest, ...values }
//                 : guest
//             )
//           );
//         } else {
//           const newGuest = await createGuest(values);
//           setGuests([...guests, newGuest]);
//         }
//       } catch (error) {
//         console.error("Failed to save guest:", error);
//       }
//       closeModal();
//     });
//   };

//   const columns = [
//     { title: "Name", dataIndex: "name", key: "name" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     { title: "Phone", dataIndex: "phoneNumber", key: "phoneNumber" },
//     { title: "Address", dataIndex: "address", key: "address" },
//     { title: "Guest Group ID", dataIndex: "guestGroupID", key: "guestGroupID" },
//     {
//       title: "Birthday",
//       dataIndex: "birthday",
//       key: "birthday",
//       render: (text) => {
//         const date = new Date(text);
//         return date.toLocaleString("vi-VN", {
//           day: "2-digit",
//           month: "2-digit",
//           year: "numeric",
//         });
//       },
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (record) => (
//         <div style={{ display: "flex", flexWrap: "nowrap" }}>
//           <Button
//             icon={<EditOutlined />}
//             onClick={() => openModal(record)}
//             style={{ marginRight: 5 }}
//           />
//           <Button
//             icon={<DeleteOutlined />}
//             onClick={() => handleDelete(record.guestID)}
//             danger
//           />
//         </div>
//       ),
//     },
//   ];

//   const fetchGuests = async () => {
//     try {
//       const data = await getGuests();
//       setGuests(data);
//     } catch (err) {
//       console.error("Failed to fetch guest data", err);
//     }
//   };

//   const fetchGuestGroups = async () => {
//     try {
//       const data = await getGuestGroups();
//       setGuestGroups(Array.isArray(data) ? data : []); // Chỉ set nếu data là mảng
//     } catch (err) {
//       console.error("Failed to fetch guest group data", err);
//       setGuestGroups([]); // Đặt guestGroups thành mảng rỗng nếu lỗi
//     }
//   };

//   useEffect(() => {
//     fetchGuests();
//     fetchGuestGroups();
//   }, []);

//   return (
//     <div className="admin-page-container">
//       <Button
//         type="primary"
//         icon={<PlusOutlined />}
//         onClick={() => openModal()}
//         style={{ marginBottom: 16, marginLeft: 28 }}
//       >
//         Add Guest
//       </Button>

//       <div className="table-style">
//         <Table
//           dataSource={guests}
//           columns={columns}
//           rowKey="guestID"
//           pagination={{ pageSize: pageSize }}
//           style={{ width: 1100 }}
//           className="custom-table"
//         />
//       </div>

//       <Modal
//         title={editingGuest ? "Edit Guest" : "Add Guest"}
//         open={isModalOpen}
//         onCancel={closeModal}
//         onOk={handleSave}
//         style={{ top: 10 }}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             label="Name"
//             name="name"
//             rules={[{ required: true, message: "Please enter guest name" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               {
//                 required: true,
//                 type: "email",
//                 message: "Please enter a valid email",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Phone Number"
//             name="phoneNumber"
//             rules={[{ required: true, message: "Please enter phone number" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Address"
//             name="address"
//             rules={[{ required: true, message: "Please enter address" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Guest Group ID"
//             name="guestGroupID"
//             rules={[{ required: true, message: "Please enter guest group ID" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Birthday"
//             name="birthday"
//             rules={[{ required: true, message: "Please enter birthday" }]}
//           >
//             <Input type="date" />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default GuestPage;

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  createGuest,
  deleteGuest,
  getGuests,
  updateGuest,
} from "../../../services/GuestService";
import { getGuestGroups } from "../../../services/GuestGroupService";

const GuestPage = () => {
  const [guests, setGuests] = useState([]);
  const [guestGroups, setGuestGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);
  const [form] = Form.useForm();
  const pageSize = 5;

  const openModal = (record = null) => {
    setEditingGuest(record);
    setIsModalOpen(true);
    form.setFieldsValue(record || {});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    try {
      await deleteGuest(id);
      setGuests(guests.filter((guest) => guest.guestID !== id));
    } catch (error) {
      console.error("Failed to delete guest:", error);
    }
  };

  const handleSave = () => {
    form.validateFields().then(async (values) => {
      try {
        if (editingGuest) {
          await updateGuest({ ...editingGuest, ...values });
          setGuests(
            guests.map((guest) =>
              guest.guestID === editingGuest.guestID
                ? { ...editingGuest, ...values }
                : guest
            )
          );
        } else {
          const newGuest = await createGuest(values);
          setGuests([...guests, newGuest]);
        }
      } catch (error) {
        console.error("Failed to save guest:", error);
      }
      closeModal();
    });
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Guest Group",
      dataIndex: "guestGroupID",
      key: "guestGroupID",
      render: (guestGroupID) =>
        guestGroups.find((group) => group.guestGroupID === guestGroupID)
          ?.name || "N/A",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <Button
            icon={<EditOutlined />}
            onClick={() => openModal(record)}
            style={{ marginRight: 5 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.guestID)}
            danger
          />
        </div>
      ),
    },
  ];

  const fetchGuests = async () => {
    try {
      const data = await getGuests();
      setGuests(data);
    } catch (err) {
      console.error("Failed to fetch guest data", err);
    }
  };

  const fetchGuestGroups = async () => {
    try {
      const data = await getGuestGroups();
      setGuestGroups(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch guest group data", err);
      setGuestGroups([]);
    }
  };

  useEffect(() => {
    fetchGuests();
    fetchGuestGroups();
  }, []);

  return (
    <div className="admin-page-container">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => openModal()}
        style={{ marginBottom: 16, marginLeft: 28 }}
      >
        Add Guest
      </Button>

      <div className="table-style">
        <Table
          dataSource={guests}
          columns={columns}
          rowKey="guestID"
          pagination={{ pageSize: pageSize }}
          style={{ width: 1100 }}
          className="custom-table"
        />
      </div>

      <Modal
        title={editingGuest ? "Edit Guest" : "Add Guest"}
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleSave}
        style={{ top: 10 }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter guest name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Guest Group"
            name="guestGroupID"
            rules={[{ required: true, message: "Please select guest group" }]}
          >
            <Select placeholder="Select Guest Group">
              {guestGroups.map((group) => (
                <Select.Option
                  key={group.guestGroupID}
                  value={group.guestGroupID}
                >
                  {group.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[{ required: true, message: "Please enter birthday" }]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GuestPage;
