import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./EventPage.css";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../../../services/EventService";
import { getOrganization } from "../../../services/OrganizationService";
import moment from "moment/moment";

const { Option } = Select; // Import Select Option

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form] = Form.useForm();
  const pageSize = 5;

  const openModal = (record = null) => {
    setEditingEvent(record);
    setIsModalOpen(true);
    form.setFieldsValue({
      ...record,
      startDate: record ? moment(record.startDate) : null,
      endDate: record ? moment(record.endDate) : null,
      capacity: record ? record.capacity : 0,
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
            events.map((org) =>
              org.eventID === editingEvent.eventID
                ? { ...editingEvent, ...values }
                : org
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
    { title: "Event Name", dataIndex: "name", key: "name" },
    {
      title: "Organization ID",
      dataIndex: "organizationID",
      key: "organizationID",
    },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => new Date(text).toLocaleString("vi-VN"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => new Date(text).toLocaleString("vi-VN"),
    },
    { title: "Capacity", dataIndex: "capacity", key: "capacity" },
    { title: "Status", dataIndex: "status", key: "status" },
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
            onClick={() => handleDelete(record.eventID)}
            danger
          />
        </>
      ),
    },
  ];

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch event data", err);
    }
  };

  const fetchOrganization = async () => {
    try {
      const data = await getOrganization();
      setOrganizations(data);
    } catch (err) {
      console.error("Failed to fetch Organization data", err);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchOrganization();
  }, []);

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
          pagination={{ pageSize: pageSize }}
          style={{ width: 1080 }}
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
              {organizations.map((org) => (
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
            initialValue={0} // Set default capacity to 0
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
              <Option value="Scheduled">Scheduled</Option>
              <Option value="Cancelled">Cancelled</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventPage;
