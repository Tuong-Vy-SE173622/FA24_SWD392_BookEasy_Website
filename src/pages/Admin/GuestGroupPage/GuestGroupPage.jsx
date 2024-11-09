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
import { getEvents } from "../../../services/EventService";

const { Option } = Select;

const GroupGuestPage = () => {
  const [guestGroups, setGuestGroups] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [event, setEvent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [form] = Form.useForm();
  const pageSize = 5;
  const [current, setCurrent] = useState(1);
  const [totalGroup, setTotalGroup] = useState();

  const openModal = (record = null) => {
    setEditingGroup(record);
    setIsModalOpen(true);
    form.setFieldsValue({
      ...record,
      organizationID: record ? record.organizationID : undefined,
      eventID: record ? record.eventID : undefined, // Đảm bảo truyền eventID vào form nếu có
      Type: record ? record.type : undefined, //
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
    { title: "Group Name", dataIndex: "name", key: "name", width: "23%" },
    {
      title: "Organization",
      dataIndex: "organizationName",
      key: "organizationName",
      width: "22%",
    },
    { title: "Event", dataIndex: "eventName", key: "eventName", width: "22%" },
    { title: "Type", dataIndex: "type", key: "type", width: "20%" },
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

  const fetchGuestGroups = async (pageNumber) => {
    try {
      const data = await getGuestGroups(pageNumber, pageSize);
      setGuestGroups(data.items.$values);
      setTotalGroup(data.totalCount);
    } catch (err) {
      console.error("Failed to fetch guest group data", err);
      setGuestGroups([]); // Đặt guestGroups thành mảng rỗng nếu lỗi
    }
  };

  const fetchOrganizations = async () => {
    try {
      const data = await getOrganization(1, 100);
      setOrganizations(data.items.$values || []);
    } catch (err) {
      console.error("Failed to fetch organization data", err);
    }
  };

  const fetchEvents = async () => {
    try {
      const data = await getEvents(1, 100);
      setEvent(data.items.$values || []);
      // setTotalEvent(data.totalCount);
    } catch (err) {
      console.error("Failed to fetch event data", err);
      setEvent([]);
    }
  };

  useEffect(() => {
    fetchGuestGroups(current);
    fetchOrganizations();
    fetchEvents();
  }, [current]);

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
          pagination={{
            total: totalGroup,
            pageSize: pageSize,
            current: current,
            onChange: (page) => setCurrent(page),
          }}
          style={{ width: 1200 }}
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
            label="Event"
            name="eventID"
            rules={[{ required: true, message: "Please enter event ID" }]}
          >
            <Select placeholder="Select an organization">
              {event.map((event) => (
                <Option key={event.eventID} value={event.eventID}>
                  {event.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Type"
            name="Type"
            rules={[{ required: true, message: "Please select type" }]}
          >
            <Select placeholder="Select a type">
              <Option value="VIP">VIP</Option>
              <Option value="Diễn giả">Diễn giả</Option>
              <Option value="Nhà tài trợ">Nhà tài trợ</Option>
              <Option value="Truyền thông">Truyền thông</Option>
              <Option value="Người tham dự">Người tham dự</Option>
              <Option value="Nghệ sĩ biểu diễn">Nghệ sĩ biểu diễn</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GroupGuestPage;
