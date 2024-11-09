import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Select } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
} from "@ant-design/icons";
// import { TiStarOutline } from "react-icons/ti";
import "./EventPage.css";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../../../services/EventService";
import { getOrganization } from "../../../services/OrganizationService";
import moment from "moment/moment";

const { Option } = Select;

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form] = Form.useForm();
  const pageSize = 4;
  const [current, setCurrent] = useState(1);
  const [totalEvent, setTotalEvent] = useState();

  const openModal = (record = null) => {
    setEditingEvent(record);
    setIsModalOpen(true);
    form.setFieldsValue({
      ...record,
      organizationID: record ? record.organizationID : null,
      startDate: record ? moment(record.startDate) : null,
      endDate: record ? moment(record.endDate) : null,
      capacity: record ? record.capacity : 0,
      status: record ? record.status : null,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((event) => event.eventID !== id));
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const handleSave = () => {
    form.validateFields().then(async (values) => {
      try {
        if (editingEvent) {
          await updateEvent({ ...editingEvent, ...values });
          setEvents(
            events.map((event) =>
              event.eventID === editingEvent.eventID
                ? { ...editingEvent, ...values }
                : event
            )
          );
        } else {
          const newEvent = await createEvent(values);
          setEvents([...events, newEvent]);
        }
      } catch (error) {
        console.error("Failed to save event:", error);
      }
      closeModal();
    });
  };

  const columns = [
    { title: "Event Name", dataIndex: "name", key: "name", width: 180 },
    {
      title: "Organization Name",
      dataIndex: "organizationName",
      key: "organizationName",
      // render: (_, record) => {
      //   const organization = organizations.find(
      //     (org) => org.organizationID === record.organizationID
      //   );
      //   return organization ? organization.name : "Unknown";
      // },
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 170,
      render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: 155,
      render: (text) => new Date(text).toLocaleString("vi-VN"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      width: 155,
      render: (text) => new Date(text).toLocaleString("vi-VN"),
    },
    { title: "Capacity", dataIndex: "capacity", key: "capacity" },
    { title: "Status", dataIndex: "status", key: "status", width: 120 },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => openModal(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.eventID)}
            danger
            style={{ marginRight: 8 }}
          />
          <Button icon={<StarOutlined />} />
        </>
      ),
    },
  ];

  const fetchEvents = async (pageNumber) => {
    try {
      const data = await getEvents(pageNumber, pageSize);
      setEvents(data.items.$values || []);
      setTotalEvent(data.totalCount);
    } catch (err) {
      console.error("Failed to fetch event data", err);
      setEvents([]);
    }
  };

  const fetchOrganization = async () => {
    try {
      const data = await getOrganization(1, 100);
      setOrganizations(data.items.$values || []);
    } catch (err) {
      console.error("Failed to fetch Organization data", err);
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents(current);
    fetchOrganization();
  }, [current]);

  return (
    <div className="admin-page-container">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => openModal()}
        style={{ marginBottom: 16, marginLeft: 28 }}
      >
        Add Event
      </Button>

      <div className="table-style">
        <Table
          dataSource={events}
          columns={columns}
          rowKey="eventID"
          pagination={{
            total: totalEvent,
            pageSize: pageSize,
            current: current,
            onChange: (page) => setCurrent(page),
          }}
          style={{ width: 1200 }}
          className="custom-table"
        />
      </div>

      <Modal
        title={editingEvent ? "Edit Event" : "Add Event"}
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleSave}
        style={{ top: 10 }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Event Name"
            name="name"
            rules={[{ required: true, message: "Please enter event name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Organization"
            name="organizationID"
            rules={[{ required: true, message: "Please select organization" }]}
          >
            <Select placeholder="Select an organization">
              {organizations?.map((org) => (
                <Option key={org.organizationID} value={org.organizationID}>
                  {org.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: "Please enter start date" }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: "Please enter end date" }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please enter location" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Capacity"
            name="capacity"
            initialValue={0}
            rules={[{ required: true, message: "Please enter capacity" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select placeholder="Select a status">
              <Option value="Đang diễn ra">Đang diễn ra</Option>
              <Option value="Sắp diễn ra">Sắp diễn ra</Option>
              <Option value="Đã kết thúc">Đã kết thúc</Option>
              <Option value="Đã hủy">Đã hủy</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventPage;
