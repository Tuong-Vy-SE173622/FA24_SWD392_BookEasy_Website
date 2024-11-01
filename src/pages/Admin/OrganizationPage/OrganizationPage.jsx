import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./OrganizationPage.css";
import {
  createOrganization,
  deleteOrganization,
  getOrganization,
  updateOrganization,
} from "../../../services/OrganizationService";

const OrganizationPage = () => {
  const [organizations, setOrganizations] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);
  const [form] = Form.useForm();
  const pageSize = 5;

  const openModal = (record = null) => {
    setEditingOrg(record);
    setIsModalOpen(true);
    form.setFieldsValue(record || {});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrganization(id); // Gọi API xóa tổ chức
      setOrganizations(
        organizations.filter((org) => org.organizationID !== id)
      );
    } catch (error) {
      console.error("Failed to delete organization:", error);
    }
  };

  const handleSave = () => {
    form.validateFields().then(async (values) => {
      try {
        if (editingOrg) {
          // Gọi API cập nhật tổ chức
          await updateOrganization({ ...editingOrg, ...values });
          setOrganizations(
            organizations.map((org) =>
              org.organizationID === editingOrg.organizationID
                ? { ...editingOrg, ...values }
                : org
            )
          );
        } else {
          const newOrganization = await createOrganization(values);
          setOrganizations([...organizations, newOrganization]);
        }
      } catch (error) {
        console.error("Failed to save organization:", error);
      }
      closeModal();
    });
  };

  const columns = [
    // { title: "ID", dataIndex: "organizationID", key: "organizationID" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Established Date",
      dataIndex: "establishedDate",
      key: "establishedDate",
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
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          <Button
            icon={<EditOutlined />}
            onClick={() => openModal(record)}
            style={{ marginRight: 5 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.organizationID)}
            danger
          />
        </div>
      ),
    },
  ];

  const fetchOrganization = async () => {
    try {
      const data = await getOrganization();
      console.log("Organization", data);

      setOrganizations(data);
    } catch (err) {
      console.error("Failed to fetch Organization data", err);
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, [organizations]);

  return (
    <div className="admin-page-container">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => openModal()}
        style={{ marginBottom: 16, marginLeft: 28 }}
      >
        Add Organization
      </Button>

      <div className="table-style">
        <Table
          dataSource={organizations}
          columns={columns}
          rowKey="organizationID"
          pagination={{
            pageSize: pageSize,
          }}
          style={{ width: 1100 }}
          // scroll={{ y: 250 }}
          className="custom-table"
        />
      </div>

      <Modal
        title={editingOrg ? "Edit Organization" : "Add Organization"}
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleSave}
        style={{ top: 10 }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter organization name" },
            ]}
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
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Established Date"
            name="establishedDate"
            rules={[
              { required: true, message: "Please enter established date" },
            ]}
          >
            <Input type="date" />
            {/* <DatePicker showTime format="DD/MM/YYYY HH:mm:ss" /> */}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrganizationPage;
