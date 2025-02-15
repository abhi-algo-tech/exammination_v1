import { Upload, Button, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const CommonUploads = ({ onChange, accept, fileList: propFileList }) => {
  // Rename prop
  const [internalFileList, setInternalFileList] = useState(propFileList || []); // Initialize

  const handleOnChange = (info) => {
    setInternalFileList(info.fileList);
    onChange(info.fileList); // Notify parent with fileList

    // Extract File objects (important!)
    const files = info.fileList.map((file) => {
      if (file.originFileObj) {
        // Check for originFileObj (important for new files)
        return file.originFileObj;
      }
      return file; // Return the file object if originFileObj doesn't exist (e.g., for already uploaded files)
    });

    // Notify parent with the array of File objects
    onChange(info.fileList, files); // Pass both fileList and files
  };

  return (
    <Card
      style={{
        width: "100%",
        height: 250,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Upload
        onChange={handleOnChange}
        accept={accept}
        fileList={internalFileList}
      >
        <Button icon={<UploadOutlined />}>Upload Excel</Button>
      </Upload>
    </Card>
  );
};

export default CommonUploads;
