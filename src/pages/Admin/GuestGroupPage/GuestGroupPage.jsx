import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  createGuestGroup,
  deleteGuestGroup,
  getGuestGroups,
  updateGuestGroup,
} from "../../../services/GuestGroupService";
import { getOrganization } from "../../../services/OrganizationService";

const { Option } = Select;

const GroupGuestPage = () => {
  const [guestGroups, setGuestGroups] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [form] = Form.useForm();
  const pageSize = 5;

  const openModal = (record = null) => {
    setEditingGroup(record);
    setIsModalOpen(true);
    form.setFieldsValue({
      ...record,
      organizationID: record ? record.organizationID : undefined,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    try {
      await deleteGuestGroup(id);
      setGuestGroups(guestGroups.filter((group) => group.guestGroupID !== id));
    } catch (error) {
      console.error("Failed to delete guest group:", error);
    }
  };

  const handleSave = () => {
    form.validateFields().then(async (values) => {
      try {
        if (editingGroup) {
          await updateGuestGroup({ ...editingGroup, ...values });
          setGuestGroups(
            guestGroups.map((group) =>
              group.guestGroupID === editingGroup.guestGroupID
                ? { ...editingGroup, ...values }
                : group
            )
          );
        } else {
          const newGroup = await createGuestGroup(values);
          setGuestGroups([...guestGroups, newGroup]);
        }
      } catch (error) {
        console.error("Failed to save guest group:", error);
      }
      closeModal();
    });
  };

  const columns = [
    { title: "Group Name", dataIndex: "name", key: "name" },
    {
      title: "Organization ID",
      dataIndex: "organizationID",
      key: "organizationID",
    },
    { title: "Event ID", dataIndex: "eventID", key: "eventID" },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => openModal(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.guestGroupID)}
            danger
          />
        </>
      ),
    },
  ];

  const fetchGuestGroups = async () => {
    try {
      const data = await getGuestGroups();
      setGuestGroups(Array.isArray(data) ? data : []); // Chỉ set nếu data là mảng
    } catch (err) {
      console.error("Failed to fetch guest group data", err);
      setGuestGroups([]); // Đặt guestGroups thành mảng rỗng nếu lỗi
    }
  };

  const fetchOrganizations = async () => {
    try {
      const data = await getOrganization();
      setOrganizations(data);
    } catch (err) {
      console.error("Failed to fetch organization data", err);
    }
  };

  useEffect(() => {
    fetchGuestGroups();
    fetchOrganizations();
  }, []);

  return (
    <div className="admin-page-container">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => openModal()}
        style={{ marginBottom: 16, marginLeft: 28 }}
      >
        Add Guest Group
      </Button>

      <div className="table-style">
        <Table
          dataSource={guestGroups}
          columns={columns}
          rowKey="guestGroupID"
          pagination={{ pageSize: pageSize }}
          style={{ width: 1080 }}
          className="custom-table"
        />
      </div>

      <Modal
        title={editingGroup ? "Edit Guest Group" : "Add Guest Group"}
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleSave}
        style={{ top: 10 }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Group Name"
            name="name"
            rules={[{ required: true, message: "Please enter group name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Organization"
            name="organizationID"
            rules={[
              { required: true, message: "Please select an organization" },
            ]}
          >
            <Select placeholder="Select an organization">
              {organizations.map((org) => (
                <Option key={org.organizationID} value={org.organizationID}>
                  {org.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Event ID"
            name="eventID"
            rules={[{ required: true, message: "Please enter event ID" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="Type"
            rules={[{ required: true, message: "Please select type" }]}
          >
            <Select placeholder="Select a type">
              <Option value="VIP Guests">VIP Guests</Option>
              <Option value="Speakers">Speakers</Option>
              <Option value="Organizers">Organizers</Option>
              <Option value="Participants">Participants</Option>
              <Option value="Press">Press</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GroupGuestPage;
