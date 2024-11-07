// import React, { useEffect, useState } from "react";
// import { Row, Col, Card } from "antd";
// import { Line, Pie, Bar } from "react-chartjs-2";
// import Chart from "chart.js/auto";
// import { getGuests } from "../../../services/GuestService";
// import { getEvents } from "../../../services/EventService";
// import { getOrganization } from "../../../services/OrganizationService";
// // import { getOrganizations } from "../../../services/OrganizationService";

// const Dashboard = () => {
//   const [guestData, setGuestData] = useState({});
//   const [eventData, setEventData] = useState({});
//   const [organizationCount, setOrganizationCount] = useState(0);
//   const [staffCount, setStaffCount] = useState(20); // Dữ liệu staff mặc định

//   // Hàm lấy dữ liệu từ API
//   const fetchData = async () => {
//     try {
//       const guestStats = await getGuests();
//       const eventStats = await getEvents();
//       const orgCount = await getOrganization();

//       setGuestData(guestStats);
//       setEventData(eventStats);
//       setOrganizationCount(orgCount);
//       // setStaffCount(staffCount); // Sẽ dùng khi có API
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Data cho biểu đồ đường
//   const lineChartData = {
//     labels: guestData.dates || [],
//     datasets: [
//       {
//         label: "Số lượng khách mời",
//         data: guestData.counts || [],
//         borderColor: "rgba(75,192,192,1)",
//         fill: false,
//       },
//       {
//         label: "Số lượng sự kiện",
//         data: eventData.counts || [],
//         borderColor: "rgba(153,102,255,1)",
//         fill: false,
//       },
//     ],
//   };

//   // Data cho biểu đồ tròn
//   const pieChartData = {
//     labels: ["Có mặt", "Không có mặt"],
//     datasets: [
//       {
//         data: [guestData.presentCount, guestData.absentCount],
//         backgroundColor: ["#36A2EB", "#FF6384"],
//       },
//     ],
//   };

//   // Data cho biểu đồ cột
//   const barChartData = {
//     labels: ["Organizations", "Staff"],
//     datasets: [
//       {
//         label: "Số lượng",
//         data: [organizationCount, staffCount],
//         backgroundColor: ["#FFCE56", "#4BC0C0"],
//       },
//     ],
//   };

//   return (
//     <div>
//       <h2>Dashboard</h2>

//       <Row gutter={16}>
//         <Col span={12}>
//           <Card title="Số lượng Khách mời và Sự kiện theo thời gian">
//             <Line data={lineChartData} />
//           </Card>
//         </Col>

//         <Col span={12}>
//           <Card title="Phân tích Số khách mời có mặt và không có mặt">
//             <Pie data={pieChartData} />
//           </Card>
//         </Col>
//       </Row>

//       <Row gutter={16} style={{ marginTop: 16 }}>
//         <Col span={24}>
//           <Card title="Số lượng Organizations và Staff trong công ty">
//             <Bar data={barChartData} />
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";

function Dashboard() {
  return <div>Dashboard</div>;
}

export default Dashboard;
