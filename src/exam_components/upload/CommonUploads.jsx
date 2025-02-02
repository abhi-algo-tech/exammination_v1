import React, { useState } from "react";
import "./CommonUploads.css";
import ButtonComponent from "../button_component/ButtonComponent";

function CommonUploads({ containerHeight = "auto" }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log("Selected file:", file);
  };

  const handleUploadClick = () => {
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }
    console.log("Uploading file:", selectedFile.name);
    // Implement the file upload logic here
  };

  const handleDeleteClick = () => {
    setSelectedFile(null);
    console.log("File deleted");
  };

  return (
    <div className="mt-4">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          width: "100%",
          backgroundColor: "#F0F0F0",
          borderRadius: "8px",
          height: containerHeight,
          justifyContent: "center",
          // alignItems: "flex-end",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="20"
          viewBox="0 0 11 15"
          fill="none"
        >
          <path
            d="M3.14286 11.4706V6.17647H0L5.5 0L11 6.17647H7.85714V11.4706H3.14286ZM0 15V13.2353H11V15H0Z"
            fill="#215988"
          />
        </svg>
        <label
          className="upload-label"
          htmlFor="file-upload"
          style={{ marginLeft: "6px", cursor: "pointer" }}
        >
          Upload Question Paper
        </label>
      </div>

      <input
        type="file"
        id="file-upload"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Display selected file and delete option */}
      {selectedFile && (
        <div
          style={{ marginTop: "10px", display: "flex", alignItems: "center" }}
        >
          <p style={{ margin: "0 10px 0 0" }}>
            Selected File: {selectedFile.name}
          </p>
          <button
            onClick={handleDeleteClick}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "0",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6L18.3333 20H5.66667L5 6"></path>
              <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      )}

      <div className="mt-2">
        <ButtonComponent
          bgColor="#07617D"
          height="40px"
          width="100px"
          label="Upload"
          onClick={handleUploadClick}
        />
      </div>
    </div>
  );
}

export default CommonUploads;
