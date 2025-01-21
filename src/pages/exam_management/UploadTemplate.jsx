import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function UploadTemplate() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Retrieve uploaded files from local storage on component load
  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    setUploadedFiles(storedFiles);
  }, []);

  // Show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hide the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle file upload
  const handleUpload = ({ file }) => {
    if (file.status === "done") {
      const { name, response } = file;
      const fileType = file.type;
      const filePath = response?.path || "N/A"; // Adjust based on backend response
      const newFile = { key: name, name, path: filePath, type: fileType };

      const updatedFiles = [...uploadedFiles, newFile];
      setUploadedFiles(updatedFiles);

      // Save uploaded files to local storage
      localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));

      message.success(`${name} uploaded successfully!`);
    } else if (file.status === "error") {
      message.error(`${file.name} upload failed.`);
    }
  };

  // Table columns
  const columns = [
    {
      title: "File Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "File Path",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "File Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  return (
    <div className="mt-2">
      <h2 className="page-head mb-4">Upload Template</h2>
      <Button type="primary" onClick={showModal}>
        Upload File
      </Button>
      <Modal
        title="Upload File"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Upload
          action="/api/upload" // Backend upload endpoint
          listType="text"
          onChange={handleUpload}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Modal>
      <Table
        className="mt-4"
        dataSource={uploadedFiles}
        columns={columns}
        pagination={false}
      />
    </div>
  );
}

export default UploadTemplate;
