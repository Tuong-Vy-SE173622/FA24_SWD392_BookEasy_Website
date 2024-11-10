import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  createGuest,
  deleteGuest,
  getGuests,
  updateGuest,
} from "../../../services/GuestService";
import { getGuestGroups } from "../../../services/GuestGroupService";
import moment from "moment/moment";

const GuestPage = () => {
  const [guests, setGuests] = useState([]);
  const [guestGroups, setGuestGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);
  const [form] = Form.useForm();
  const pageSize = 5;
  const [current, setCurrent] = useState(1);
  const [totalGuest, setTotalGuest] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [guestData, setGuestData] = useState({
    guestGroupID: 11,
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    birthday: "",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const openModal = (record = null) => {
    setEditingGuest(record);
    setIsModalOpen(true);
    // form.setFieldsValue(record || {});
    // setFileList(
    //   record
    //     ? [{ uid: record.guestID, name: record.name, url: record.imageURL }]
    //     : []
    // );
    if (record) {
      form.setFieldsValue({
        ...record,
        birthday: record.birthday ? moment(record.birthday) : null,
      });
      setFileList([
        { uid: record.guestID, name: record.name, url: record.imageURL },
      ]);
    } else {
      form.resetFields();
      setFileList([]);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFileList([]);
    setGuestData({
      guestGroupID: 11,
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      birthday: "",
      imageUrl: "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteGuest(id);
      setGuests(guests.filter((guest) => guest.guestID !== id));
    } catch (error) {
      console.error("Failed to delete guest:", error);
    }
  };

  const handleSave = async () => {
    form.validateFields().then(async (values) => {
      try {
        // Prepare guestData
        const updatedData = { ...guestData, ...values };

        if (values.birthday) {
          values.birthday = moment(values.birthday).format("YYYY-MM-DD");
        }

        if (editingGuest) {
          // Update guest
          await updateGuest(updatedData);
          setGuests(
            guests.map((guest) =>
              guest.guestID === editingGuest.guestID
                ? { ...guest, ...updatedData }
                : guest
            )
          );
        } else {
          // Create new guest
          const newGuest = await createGuest(updatedData, imageFile);
          setGuests([...guests, newGuest]);
          message.success("Guest created successfully!");
        }
      } catch (error) {
        console.error("Failed to save guest:", error);
      }
      closeModal();
    });
  };

  const fetchGuests = async (pageNumber) => {
    try {
      const data = await getGuests(pageNumber, pageSize);
      setGuests(data.items.$values);
      setTotalGuest(data.totalCount);
    } catch (err) {
      console.error("Failed to fetch guest data", err);
    }
  };

  const fetchGuestGroups = async () => {
    try {
      const data = await getGuestGroups(1, 100);
      setGuestGroups(
        Array.isArray(data.items.$values) ? data.items.$values : []
      );
    } catch (err) {
      console.error("Failed to fetch guest group data", err);
      setGuestGroups([]);
    }
  };

  useEffect(() => {
    fetchGuests(current);
    fetchGuestGroups();
  }, [current]);

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
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
      render: (text) =>
        new Date(text).toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      title: "Image",
      dataIndex: "imageURL",
      key: "imageURL",
      render: (url) =>
        url ? (
          <img src={url} alt="Guest" style={{ width: 50, height: 50 }} />
        ) : (
          "N/A"
        ),
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
          pagination={{
            total: totalGuest,
            pageSize: pageSize,
            current: current,
            onChange: (page) => setCurrent(page),
          }}
          style={{ width: 1200 }}
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
            <Input
              value={guestData.name}
              onChange={(e) =>
                setGuestData({ ...guestData, name: e.target.value })
              }
            />
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
            <Input
              value={guestData.email}
              onChange={(e) =>
                setGuestData({ ...guestData, email: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input
              value={guestData.phoneNumber}
              onChange={(e) =>
                setGuestData({ ...guestData, phoneNumber: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input
              value={guestData.address}
              onChange={(e) =>
                setGuestData({ ...guestData, address: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Guest Group"
            name="guestGroupID"
            rules={[{ required: true, message: "Please select guest group" }]}
          >
            <Select
              value={guestData.guestGroupID}
              onChange={(value) =>
                setGuestData({ ...guestData, guestGroupID: value })
              }
              placeholder="Select Guest Group"
            >
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
          <Form.Item label="Birthday" name="birthday">
            <DatePicker
              format="DD/MM/YYYY"
              value={guestData.birthday ? moment(guestData.birthday) : null}
              onChange={(date) =>
                setGuestData({
                  ...guestData,
                  birthday: date ? date.toISOString() : "",
                })
              }
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Image">
            <Upload
              fileList={fileList}
              beforeUpload={(file) => {
                setImageFile(file);
                return false; // Prevent auto upload
              }}
              onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GuestPage;
