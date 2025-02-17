import React, { useState } from "react";
import { Card, Checkbox, Row, Col, Pagination } from "antd";
import "./TableCardComponent.css";
import QuestionBankCard from "../card/QuestionBankCard";

function transformData(data) {
  return data.map((item) => ({
    id: item.id,
    level: item.level,
    topic: item.topic,
    questionName: item.name,
    subject: item.subject,
    class: item.classes, // or you can add any other transformation if needed
    curriculum: item.curriculum || "Not Available", // Default value if curriculum is null
    marks: item.marks,
    questionType: item.type,
    options: item.options.split(", "), // Converting the options string to an array
    author: "Unknown", // Assuming you need to add an author dynamically
    datePublished: new Date().toISOString().split("T")[0], // You can customize the date format
  }));
}

const TableCardComponent = ({
  questions,
  onSelectedCountChange,
  onSelectedRows,
  currentPage,
  pageSize,
  onPageChange,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const data = transformData(questions);

  const handleSelectRow = (id) => {
    setSelectedRows((prev) => {
      const updatedSelection = prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id];

      // Filter data based on updatedSelection (selected ids)
      const selectedData = data.filter((item) =>
        updatedSelection.includes(item.id)
      );

      // Update selected rows in the parent component or wherever needed
      onSelectedRows(selectedData); // Assuming setSelectedRow is a function passed as a prop
      onSelectedCountChange(updatedSelection.length); // Pass the updated selected count to the parent

      return updatedSelection;
    });
  };

  // Paginate data
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div className="table-card-grid">
      {/* Table Header */}
      <Row className="table-header">
        <Col style={{ width: "3%" }}></Col> {/* For checkbox */}
        <Col style={{ width: "30%" }}>
          <strong>Name</strong>
        </Col>
        <Col style={{ width: "10%" }}>
          <strong>Subject</strong>
        </Col>
        <Col style={{ width: "8%" }}>
          <strong>Class</strong>
        </Col>
        <Col style={{ width: "10%" }}>
          <strong>Curriculum</strong>
        </Col>
        <Col style={{ width: "8%" }}>
          <strong>Marks</strong>
        </Col>
        <Col style={{ width: "13%" }}>
          <strong>Question Type</strong>
        </Col>
        <Col style={{ width: "9%" }}>
          <strong>Author</strong>
        </Col>
        <Col style={{ width: "9%" }}>
          <strong>Published</strong>
        </Col>
      </Row>

      {/* Table Rows */}
      {paginatedData.map((item, index) => {
        const isSelected = selectedRows.includes(item.id);
        return (
          <Card
            key={item.id}
            className={`table-card ${isSelected ? "selected" : ""}`}
            bodyStyle={{ padding: "0px" }}
          >
            <Row className="table-row">
              <Col style={{ width: "3%" }}>
                <Checkbox
                  checked={isSelected}
                  onChange={() => handleSelectRow(item.id)}
                />
              </Col>
              <Col style={{ width: "30%" }}>
                {!isSelected && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="quextion-sr">
                      {"Question " + (index + 1)}{" "}
                    </div>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      style={{ margin: "0 5px" }}
                    >
                      <circle cx="7" cy="7" r="4" fill="#D9D9D9" />
                    </svg>
                    {item.level}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      style={{ margin: "0 5px" }}
                    >
                      <circle cx="7" cy="7" r="4" fill="#e1e2e3" />
                    </svg>
                    <div className="topic">{item.topic}</div>
                  </div>
                )}

                {item.questionName}
                {item.questionType === "Multiple Choice" && (
                  <ul className="options-list">
                    {item.options.map((option, index) => (
                      <li key={index} className="option-item">
                        <span className="option-letter">
                          {String.fromCharCode(97 + index)}){" "}
                        </span>
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </Col>
              <Col style={{ width: "10%" }}>{item.subject}</Col>
              <Col style={{ width: "10%" }}>{item.class}</Col>
              <Col style={{ width: "8%" }}>{item.curriculum}</Col>
              <Col style={{ width: "8%" }}>{item.marks}</Col>
              <Col style={{ width: "13%" }}>{item.questionType}</Col>
              <Col style={{ width: "9%" }}>{item.author}</Col>
              <Col style={{ width: "9%" }}>{item.datePublished}</Col>
            </Row>
          </Card>
        );
      })}

      {/* Pagination */}
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={questions[0]?.totalRecords}
          onChange={(page) => onPageChange(page, pageSize)}
          showSizeChanger
          onShowSizeChange={(current, newSize) => onPageChange(1, newSize)} // Reset to page 1 when size changes
          pageSizeOptions={["5", "10", "15", "20"]} // Options for page sizes
        />
      </div>
    </div>
  );
};

export default TableCardComponent;
