import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  createAccount,
  deleteAccount,
  getAllAccounts,
  updateAccount,
} from "../../../services/AccountService";
import { getAllRole } from "../../../services/authService";
// import "./AccountPage.css";

const AccountPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [role, setRole] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [form] = Form.useForm();

  const openModal = (record = null) => {
    setEditingAccount(record);
    setIsModalOpen(true);
    form.setFieldsValue(record || {});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    try {
      await deleteAccount(id);
      setAccounts(accounts.filter((account) => account.id !== id));
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  const handleSave = () => {
    form.validateFields().then(async (values) => {
      try {
        if (editingAccount) {
          await updateAccount({ ...editingAccount, ...values });
          setAccounts(
            accounts.map((account) =>
              account.id === editingAccount.id
                ? { ...editingAccount, ...values }
                : account
            )
          );
        } else {
          const newAccount = await createAccount({
            ...values,
            roleID: values.roleID, // Gửi roleID
            password: values.password, // Gửi password
          });
          setAccounts([...accounts, newAccount]);
        }
      } catch (error) {
        console.error("Failed to save account:", error);
      }
      closeModal();
    });
  };

  const columns = [
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
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
            onClick={() => handleDelete(record.id)}
            danger
          />
        </div>
      ),
    },
  ];

  const fetchAccounts = async () => {
    try {
      const data = await getAllAccounts();
      setAccounts(data.$values);
    } catch (err) {
      console.error("Failed to fetch accounts:", err);
    }
  };

  const fetchAllRole = async () => {
    try {
      const data = await getAllRole();
      setRole(data.$values);
    } catch (err) {
      console.error("Failed to fetch role:", err);
    }
  };

  useEffect(() => {
    fetchAccounts();
    fetchAllRole();
  }, []);

  return (
    <div className="admin-page-container">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => openModal()}
        style={{ marginBottom: 16, marginLeft: 28 }}
      >
        Add Account
      </Button>

      <div className="table-style">
        <Table
          dataSource={accounts}
          columns={columns}
          rowKey="username"
          pagination={{ pageSize: 5 }}
          style={{ width: 1200 }}
          className="custom-table"
        />
      </div>

      <Modal
        title={editingAccount ? "Edit Account" : "Add Account"}
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter username" }]}
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
          {!editingAccount && (
            <>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter password" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Role"
                name="roleID"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select placeholder="Select a role">
                  {role.map((role) => (
                    <Select.Option key={role.id} value={role.id}>
                      {role.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default AccountPage;
