// import React from "react";

// function EventPage() {
//   return <div>EventPage</div>;
// }

// export default EventPage;

import { useState } from "react";
import { Modal, ConfigProvider, Table, Pagination, Button } from "antd";
import { GrCalendar } from "react-icons/gr";
import { FaListUl } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import {
  RiDeleteBin5Line,
  RiDeleteBin6Line,
  RiDeleteBinLine,
} from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { IoIosArrowRoundForward, IoMdAddCircleOutline } from "react-icons/io";
// import "./Events.scss";

const Events = () => {
  // const [events] = useState([
  //   {
  //     key: 1,
  //     id: 101,
  //     name: "Web Development Conference",
  //     status: "Upcoming",
  //     link: "https://webdevconf.com",
  //     time: "2024-10-25 09:00",
  //     location: "New York, USA",
  //   },
  //   {
  //     key: 2,
  //     id: 102,
  //     name: "AI & Machine Learning Summit",
  //     status: "Ongoing",
  //     link: "https://aimlsummit.com",
  //     time: "2024-10-10 10:00",
  //     location: "San Francisco, USA",
  //   },
  //   {
  //     key: 3,
  //     id: 103,
  //     name: "Cybersecurity Forum",
  //     status: "Completed",
  //     link: "https://cyberforum.com",
  //     time: "2024-09-15 14:00",
  //     location: "London, UK",
  //   },
  //   {
  //     key: 4,
  //     id: 104,
  //     name: "Mobile App Design Meetup",
  //     status: "Upcoming",
  //     link: "https://mobiledesignmeetup.com",
  //     time: "2024-11-05 11:00",
  //     location: "Los Angeles, USA",
  //   },
  //   {
  //     key: 5,
  //     id: 105,
  //     name: "Blockchain Expo",
  //     status: "Ongoing",
  //     link: "https://blockchainexpo.com",
  //     time: "2024-10-15 16:00",
  //     location: "Singapore",
  //   },
  // ]);
  // const [events] = useState([
  //   {
  //     key: 1,
  //     id: 101,
  //     name: "Web Development Conference",
  //     status: "Upcoming",
  //     startTime: "2024-10-25 09:00",
  //     endTime: "2024-10-25 17:00",
  //     location: "New York, USA",
  //   },
  //   {
  //     key: 2,
  //     id: 102,
  //     name: "AI & Machine Learning Summit",
  //     status: "Ongoing",
  //     startTime: "2024-10-10 10:00",
  //     endTime: "2024-10-10 18:00",
  //     location: "San Francisco, USA",
  //   },
  //   {
  //     key: 3,
  //     id: 103,
  //     name: "Cybersecurity Forum",
  //     status: "Completed",
  //     startTime: "2024-09-15 14:00",
  //     endTime: "2024-09-15 16:00",
  //     location: "London, UK",
  //   },
  //   {
  //     key: 4,
  //     id: 104,
  //     name: "Mobile App Design Meetup",
  //     status: "Upcoming",
  //     startTime: "2024-11-05 11:00",
  //     endTime: "2024-11-05 15:00",
  //     location: "Los Angeles, USA",
  //   },
  //   {
  //     key: 5,
  //     id: 105,
  //     name: "Blockchain Expo",
  //     status: "Ongoing",
  //     startTime: "2024-10-15 16:00",
  //     endTime: "2024-10-15 20:00",
  //     location: "Singapore",
  //   },
  //   {
  //     key: 6,
  //     id: 106,
  //     name: "FinTech Innovation Summit",
  //     status: "Upcoming",
  //     startTime: "2024-11-20 09:30",
  //     endTime: "2024-11-20 17:30",
  //     location: "Sydney, Australia",
  //   },
  //   {
  //     key: 7,
  //     id: 107,
  //     name: "UX/UI Design Workshop",
  //     status: "Ongoing",
  //     startTime: "2024-10-08 09:00",
  //     endTime: "2024-10-08 13:00",
  //     location: "Berlin, Germany",
  //   },
  //   {
  //     key: 8,
  //     id: 108,
  //     name: "Cloud Computing Symposium",
  //     status: "Upcoming",
  //     startTime: "2024-12-01 10:00",
  //     endTime: "2024-12-01 16:00",
  //     location: "Tokyo, Japan",
  //   },
  //   {
  //     key: 9,
  //     id: 109,
  //     name: "Big Data & Analytics Forum",
  //     status: "Completed",
  //     startTime: "2024-09-20 11:00",
  //     endTime: "2024-09-20 18:00",
  //     location: "Amsterdam, Netherlands",
  //   },
  //   {
  //     key: 10,
  //     id: 110,
  //     name: "SaaS Product Development Meetup",
  //     status: "Ongoing",
  //     startTime: "2024-10-09 09:00",
  //     endTime: "2024-10-09 12:00",
  //     location: "Paris, France",
  //   },
  //   {
  //     key: 11,
  //     id: 111,
  //     name: "E-Commerce Expo",
  //     status: "Upcoming",
  //     startTime: "2024-11-10 09:00",
  //     endTime: "2024-11-10 17:00",
  //     location: "Dubai, UAE",
  //   },
  //   {
  //     key: 12,
  //     id: 112,
  //     name: "Robotics and Automation Forum",
  //     status: "Upcoming",
  //     startTime: "2024-12-12 10:00",
  //     endTime: "2024-12-12 18:00",
  //     location: "Seoul, South Korea",
  //   },
  //   {
  //     key: 13,
  //     id: 113,
  //     name: "Tech Leaders Summit",
  //     status: "Completed",
  //     startTime: "2024-09-10 09:00",
  //     endTime: "2024-09-10 18:00",
  //     location: "Toronto, Canada",
  //   },
  //   {
  //     key: 14,
  //     id: 114,
  //     name: "AI in Healthcare Forum",
  //     status: "Upcoming",
  //     startTime: "2024-11-17 10:00",
  //     endTime: "2024-11-17 16:00",
  //     location: "Zurich, Switzerland",
  //   },
  //   {
  //     key: 15,
  //     id: 115,
  //     name: "Future of Work Summit",
  //     status: "Ongoing",
  //     startTime: "2024-10-12 09:00",
  //     endTime: "2024-10-12 17:00",
  //     location: "Boston, USA",
  //   },
  //   {
  //     key: 16,
  //     id: 116,
  //     name: "Green Technology Expo",
  //     status: "Completed",
  //     startTime: "2024-09-05 09:30",
  //     endTime: "2024-09-05 16:30",
  //     location: "Stockholm, Sweden",
  //   },
  //   {
  //     key: 17,
  //     id: 117,
  //     name: "Data Science Meetup",
  //     status: "Upcoming",
  //     startTime: "2024-11-25 10:00",
  //     endTime: "2024-11-25 15:00",
  //     location: "Austin, USA",
  //   },
  //   {
  //     key: 18,
  //     id: 118,
  //     name: "AR/VR Tech Conference",
  //     status: "Ongoing",
  //     startTime: "2024-10-07 09:30",
  //     endTime: "2024-10-07 17:00",
  //     location: "Barcelona, Spain",
  //   },
  //   {
  //     key: 19,
  //     id: 119,
  //     name: "Quantum Computing Forum",
  //     status: "Upcoming",
  //     startTime: "2024-12-15 11:00",
  //     endTime: "2024-12-15 16:00",
  //     location: "Munich, Germany",
  //   },
  //   {
  //     key: 20,
  //     id: 120,
  //     name: "Digital Transformation Summit",
  //     status: "Ongoing",
  //     startTime: "2024-10-11 09:00",
  //     endTime: "2024-10-11 17:00",
  //     location: "New Delhi, India",
  //   },
  // ]);
  const [events] = useState([
    {
      key: 1,
      id: 101,
      name: "Web Development Conference",
      status: "Upcoming",
      startTime: "2024-10-25 09:00",
      endTime: "2024-10-25 17:00",
      location: "123 5th Ave, Midtown Manhattan, New York, NY 10001, USA",
    },
    {
      key: 2,
      id: 102,
      name: "AI & Machine Learning Summit",
      status: "Ongoing",
      startTime: "2024-10-10 10:00",
      endTime: "2024-10-10 18:00",
      location: "789 Howard St, Moscone Center, San Francisco, CA 94103, USA",
    },
    {
      key: 3,
      id: 103,
      name: "Cybersecurity Forum",
      status: "Completed",
      startTime: "2024-09-15 14:00",
      endTime: "2024-09-15 16:00",
      location: "1 Queen Elizabeth St, Tower Bridge, London SE1 2NQ, UK",
    },
    {
      key: 4,
      id: 104,
      name: "Mobile App Design Meetup",
      status: "Upcoming",
      startTime: "2024-11-05 11:00",
      endTime: "2024-11-05 15:00",
      location: "456 Grand Ave, Downtown Los Angeles, CA 90013, USA",
    },
    {
      key: 5,
      id: 105,
      name: "Blockchain Expo",
      status: "Ongoing",
      startTime: "2024-10-15 16:00",
      endTime: "2024-10-15 20:00",
      location:
        "12 Marina Blvd, Sands Expo and Convention Centre, Singapore 018982",
    },
    {
      key: 6,
      id: 106,
      name: "FinTech Innovation Summit",
      status: "Upcoming",
      startTime: "2024-11-20 09:30",
      endTime: "2024-11-20 17:30",
      location:
        "14 Darling Dr, International Convention Centre, Sydney NSW 2000, Australia",
    },
    {
      key: 7,
      id: 107,
      name: "UX/UI Design Workshop",
      status: "Ongoing",
      startTime: "2024-10-08 09:00",
      endTime: "2024-10-08 13:00",
      location:
        "65 Invalidenstraße, Museum für Naturkunde, 10115 Berlin, Germany",
    },
    {
      key: 8,
      id: 108,
      name: "Cloud Computing Symposium",
      status: "Upcoming",
      startTime: "2024-12-01 10:00",
      endTime: "2024-12-01 16:00",
      location: "2 Chome-3-1 Otemachi, Chiyoda City, Tokyo 100-0004, Japan",
    },
    {
      key: 9,
      id: 109,
      name: "Big Data & Analytics Forum",
      status: "Completed",
      startTime: "2024-09-20 11:00",
      endTime: "2024-09-20 18:00",
      location:
        "59 Nieuwezijds Voorburgwal, NH Collection Amsterdam, 1012 RC Amsterdam, Netherlands",
    },
    {
      key: 10,
      id: 110,
      name: "SaaS Product Development Meetup",
      status: "Ongoing",
      startTime: "2024-10-09 09:00",
      endTime: "2024-10-09 12:00",
      location: "12 Place Vendôme, Le Meurice, Paris 75001, France",
    },
    {
      key: 11,
      id: 111,
      name: "E-Commerce Expo",
      status: "Upcoming",
      startTime: "2024-11-10 09:00",
      endTime: "2024-11-10 17:00",
      location: "1 Sheikh Mohammed bin Rashid Blvd, Dubai Mall, Dubai, UAE",
    },
    {
      key: 12,
      id: 112,
      name: "Robotics and Automation Forum",
      status: "Upcoming",
      startTime: "2024-12-12 10:00",
      endTime: "2024-12-12 18:00",
      location:
        "416 Olympic-ro, COEX Convention Center, Gangnam-gu, Seoul, South Korea",
    },
    {
      key: 13,
      id: 113,
      name: "Tech Leaders Summit",
      status: "Completed",
      startTime: "2024-09-10 09:00",
      endTime: "2024-09-10 18:00",
      location:
        "60 Harbour St, Metro Toronto Convention Centre, Toronto, ON M5J 1B7, Canada",
    },
    {
      key: 14,
      id: 114,
      name: "AI in Healthcare Forum",
      status: "Upcoming",
      startTime: "2024-11-17 10:00",
      endTime: "2024-11-17 16:00",
      location: "Bahnhofstrasse 11, Marriott Zurich, 8001 Zürich, Switzerland",
    },
    {
      key: 15,
      id: 115,
      name: "Future of Work Summit",
      status: "Ongoing",
      startTime: "2024-10-12 09:00",
      endTime: "2024-10-12 17:00",
      location:
        "450 Summer St, Boston Convention Center, Boston, MA 02210, USA",
    },
    {
      key: 16,
      id: 116,
      name: "Green Technology Expo",
      status: "Completed",
      startTime: "2024-09-05 09:30",
      endTime: "2024-09-05 16:30",
      location:
        "2 Mässvägen, Stockholm International Fairs, 125 30 Stockholm, Sweden",
    },
    {
      key: 17,
      id: 117,
      name: "Data Science Meetup",
      status: "Upcoming",
      startTime: "2024-11-25 10:00",
      endTime: "2024-11-25 15:00",
      location: "512 E Riverside Dr, Fairmont Austin, Austin, TX 78701, USA",
    },
    {
      key: 18,
      id: 118,
      name: "AR/VR Tech Conference",
      status: "Ongoing",
      startTime: "2024-10-07 09:30",
      endTime: "2024-10-07 17:00",
      location:
        "7 Plaça de Catalunya, Hotel Olivia Plaza, 08002 Barcelona, Spain",
    },
    {
      key: 19,
      id: 119,
      name: "Quantum Computing Forum",
      status: "Upcoming",
      startTime: "2024-12-15 11:00",
      endTime: "2024-12-15 16:00",
      location:
        "38-40 Sonnenstraße, Sofitel Munich Bayerpost, 80331 Munich, Germany",
    },
    {
      key: 20,
      id: 120,
      name: "Digital Transformation Summit",
      status: "Ongoing",
      startTime: "2024-10-11 09:00",
      endTime: "2024-10-11 17:00",
      location:
        "Plot No. 3 Sector-10, Dwarka, ITC WelcomHotel, New Delhi, India",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showModal = (event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getColumns = [
    {
      title: <h3 style={{ textAlign: "center", margin: 0 }}>ID</h3>,
      dataIndex: "id",
      key: "id",
      width: "5%",
      render: (text) => (
        <div style={{ textAlign: "center" }}>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: <h3 style={{ textAlign: "center", margin: "0" }}>Tên sự kiện</h3>,
      dataIndex: "name",
      key: "name",
      width: "22%",
    },
    {
      title: <h3 style={{ textAlign: "center", margin: "0" }}>Trạng thái</h3>,
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <div style={{ textAlign: "center" }}>
          <span>{text}</span>
        </div>
      ),
    },
    // {
    //   title: <h3 style={{ textAlign: "center", margin: "0" }}>Link sự kiện</h3>,
    //   dataIndex: "link",
    //   key: "link",
    //   render: (text) => (
    //     <div style={{ textAlign: "center" }}>
    //       <a href={text} target="_blank" rel="noopener noreferrer">
    //         {text}
    //       </a>
    //     </div>
    //   ),
    // },
    {
      title: <h3 style={{ textAlign: "center", margin: "0" }}>Thời gian</h3>,
      dataIndex: "time",
      key: "time",
      width: "23%",
      render: (_, record) => (
        <div style={{ textAlign: "center" }}>
          <span>
            {record.startTime}{" "}
            <IoIosArrowRoundForward style={{ marginTop: 4 }} /> {record.endTime}
          </span>
        </div>
      ),
    },
    {
      title: <h3 style={{ textAlign: "center", margin: "0" }}>Địa điểm</h3>,
      dataIndex: "location",
      key: "location",
      width: "25%",
    },
    {
      title: <h3 style={{ textAlign: "center", margin: "0" }}>Action</h3>,
      key: "action",
      render: (_, record) => (
        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            style={{
              marginRight: 8,
              // width: "80px",
              // height: "40.5px",
            }}
            // onClick={() => showModal(record)}
          >
            <FaListUl />
          </Button>
          <Button
            type="primary"
            style={{
              marginRight: 8,
              backgroundColor: "green",
              // width: "80px",
              // height: "40.5px",
            }}
            // onClick={() => showModal(record)}
          >
            <FaPenToSquare />
          </Button>
          <Button
            type="primary"
            style={{
              marginRight: 8,
              backgroundColor: "red",
              // width: "80px",
              // height: "40.5px",
            }}
            // onClick={() => showModal(record)}
          >
            <RiDeleteBin6Line size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <Button
        type="primary"
        shape="round"
        size={50}
        // icon={<IoMdAddCircleOutline size={22} />}
        style={{
          marginBottom: "1rem",
          marginLeft: "2.5rem",
          // padding: "15px 5px",
        }}
      >
        <IoMdAddCircleOutline size={22} />
        <h4>Tạo sự kiện</h4>
      </Button>
      <div
        className="events-container"
        style={{
          display: "flex",
          justifyContent: "center",
          // flexDirection: "column",
        }}
      >
        {/* <div className="events-title">
          <GrCalendar /> Upcoming Events
        </div> */}
        <div className="events-data-table" style={{ width: "95%" }}>
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  borderColor: "#d9d9d9",
                  headerBg: "#EAF7FF",
                  headerBorderRadius: 3,
                  fontSize: "1rem",
                },
              },
            }}
          >
            <Table
              columns={getColumns}
              dataSource={currentEvents}
              bordered
              className="events-table-style"
              pagination={false}
            />
          </ConfigProvider>

          <Pagination
            current={currentPage}
            pageSize={eventsPerPage}
            total={events.length}
            onChange={handlePageChange}
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </div>

        <Modal
          title="Event Details"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={600}
        >
          {selectedEvent && (
            <div>
              <p>
                <strong>Event Name:</strong> {selectedEvent.name}
              </p>
              <p>
                <strong>Status:</strong> {selectedEvent.status}
              </p>
              <p>
                <strong>Time:</strong> {selectedEvent.time}
              </p>
              <p>
                <strong>Location:</strong> {selectedEvent.location}
              </p>
              <p>
                <strong>Event Link:</strong>{" "}
                <a
                  href={selectedEvent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedEvent.link}
                </a>
              </p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Events;
