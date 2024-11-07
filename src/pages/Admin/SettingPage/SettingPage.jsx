// // import React, { useState } from "react";
// // import { uploadImage } from "../../../services/uploadImage";
// // import { Button, Form, message, Upload } from "antd";
// // import { PlusOutlined } from "@ant-design/icons";

// // function SettingPage() {
// //   const [fileList, setFileList] = useState([]);
// //   const [imageUrl, setImageUrl] = useState(""); // URL ảnh sau khi tải lên

// //   const handleUpload = async (options) => {
// //     const { file, onSuccess, onError } = options;

// //     try {
// //       // Gọi hàm upload và nhận URL ảnh
// //       const url = await uploadImage(file);
// //       setImageUrl(url); // Lưu URL để hiển thị hoặc sử dụng
// //       onSuccess(null, file); // Thông báo thành công
// //       message.success("Image uploaded successfully!");
// //     } catch (error) {
// //       onError(error);
// //       message.error("Image upload failed.");
// //     }
// //   };
// //   return (
// //     // <Form>
// //     //   <Form.Item label="Upload" valuePropName="fileList">
// //     //     <Upload
// //     //       customRequest={handleUpload}
// //     //       listType="picture-card"
// //     //       fileList={fileList}
// //     //       onChange={({ fileList }) => setFileList(fileList)}
// //     //     >
// //     //       {fileList.length >= 1 ? null : (
// //     //         <Button icon={<PlusOutlined />}>Upload</Button>
// //     //       )}
// //     //     </Upload>
// //     //   </Form.Item>

// //     //   {/* Hiển thị URL ảnh nếu upload thành công */}
// //     //   {imageUrl && (
// //     //     <div>
// //     //       <p>Uploaded Image URL:</p>
// //     //       <a href={imageUrl} target="_blank" rel="noopener noreferrer">
// //     //         {imageUrl}
// //     //       </a>
// //     //       <img
// //     //         src={imageUrl}
// //     //         alt="Uploaded"
// //     //         style={{ width: "100px", marginTop: "10px" }}
// //     //       />
// //     //     </div>
// //     //   )}
// //     // </Form>
// //     <Form>
// //       <Form.Item label="Upload" valuePropName="fileList">
// //         <Upload
// //           customRequest={handleUpload}
// //           listType="picture-card"
// //           fileList={fileList}
// //           onChange={({ fileList }) => setFileList(fileList)}
// //         >
// //           {fileList.length >= 1 ? null : (
// //             <Button icon={<PlusOutlined />}>Upload</Button>
// //           )}
// //         </Upload>
// //       </Form.Item>

// //       {/* Hiển thị URL ảnh nếu upload thành công */}
// //       {imageUrl && (
// //         <div>
// //           <p>Uploaded Image URL:</p>
// //           <a href={imageUrl} target="_blank" rel="noopener noreferrer">
// //             {imageUrl}
// //           </a>
// //           <img
// //             src={imageUrl}
// //             alt="Uploaded"
// //             style={{ width: "100px", marginTop: "10px" }}
// //           />
// //         </div>
// //       )}
// //     </Form>
// //   );
// // }

// // export default SettingPage;

// import React, { useState } from "react";
// import { uploadImage } from "../../../services/uploadImage";

// function SettingPage() {
//   const [file, setFile] = useState(null);
//   const [imageURL, setImageURL] = useState("");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFile(file);
//     }
//   };

//   const handleUpload = async () => {
//     if (file) {
//       try {
//         const url = await uploadImage(file);
//         setImageURL(url); // Lưu URL của ảnh đã upload
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       }
//     } else {
//       alert("Please select a file to upload.");
//     }
//   };
//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>

//       {imageURL && (
//         <div>
//           <p>Image uploaded successfully:</p>
//           <img src={imageURL} alt="Uploaded" width="300" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default SettingPage;

import React from "react";

function SettingPage() {
  return <div>SettingPage</div>;
}

export default SettingPage;
