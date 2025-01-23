import React, { useState } from "react";
import { Card, Checkbox, Row, Col, Pagination } from "antd";
import "./TableCardComponent.css";
import QuestionBankCard from "../card/QuestionBankCard";

const data = [
  {
    id: 1,
    level: "Difficult",
    topic: "Algebra",
    questionName: "Solve for X in 2x + 3 = 11",
    subject: "Math",
    class: "10th",
    curriculum: "CBSE",
    marks: 100,
    questionType: "Multiple Choice",
    options: ["x = 4", "x = 5", "x = 6", "x = 7"],
    author: "Jane Smith",
    datePublished: "2025-01-15",
  },
  {
    id: 2,
    level: "Difficult",
    topic: "Molecule",
    questionName: "Identify the chemical symbol for water",
    subject: "Science",
    class: "9th",
    curriculum: "ICSE",
    marks: 95,
    questionType: "True/False",
    author: "David Lee",
    datePublished: "2025-01-16",
  },
  {
    id: 3,
    level: "Difficult",
    topic: "Map",
    questionName: "What is the capital of France?",
    subject: "Geography",
    class: "8th",
    curriculum: "IB",
    marks: 50,
    questionType: "Multiple Choice",
    options: ["Paris", "Berlin", "Madrid", "London"],
    author: "Emily White",
    datePublished: "2025-01-20",
  },
  {
    id: 4,
    level: "Easy",
    topic: "Linear Equations",
    questionName: "Solve for X in 3x + 2 = 11",
    subject: "Math",
    class: "9th",
    curriculum: "ICSE",
    marks: 90,
    questionType: "Multiple Choice",
    options: ["x = 3", "x = 4", "x = 5", "x = 6"],
    author: "John Doe",
    datePublished: "2025-01-10",
  },
  {
    id: 5,
    level: "Moderate",
    topic: "Periodic Table",
    questionName: "What is the symbol of oxygen?",
    subject: "Science",
    class: "8th",
    curriculum: "CBSE",
    marks: 85,
    questionType: "Multiple Choice",
    options: ["O", "Ox", "O2", "O3"],
    author: "Alice Johnson",
    datePublished: "2025-01-18",
  },
  {
    id: 6,
    level: "Difficult",
    topic: "Trigonometry",
    questionName: "Find the value of sin(30°)",
    subject: "Math",
    class: "10th",
    curriculum: "ICSE",
    marks: 100,
    questionType: "Multiple Choice",
    options: ["0.5", "1", "0.75", "0.25"],
    author: "Mary Brown",
    datePublished: "2025-01-17",
  },
  {
    id: 7,
    level: "Easy",
    topic: "States of Matter",
    questionName: "What is the boiling point of water?",
    subject: "Science",
    class: "8th",
    curriculum: "IB",
    marks: 75,
    questionType: "Multiple Choice",
    options: ["100°C", "0°C", "50°C", "150°C"],
    author: "James Wilson",
    datePublished: "2025-01-19",
  },
  {
    id: 8,
    level: "Moderate",
    topic: "World History",
    questionName: "Who was the first President of the United States?",
    subject: "History",
    class: "9th",
    curriculum: "CBSE",
    marks: 80,
    questionType: "Multiple Choice",
    options: [
      "George Washington",
      "Abraham Lincoln",
      "Thomas Jefferson",
      "John Adams",
    ],
    author: "Lisa Taylor",
    datePublished: "2025-01-12",
  },
  {
    id: 9,
    level: "Difficult",
    topic: "Chemistry",
    questionName: "What is the molecular formula for methane?",
    subject: "Science",
    class: "10th",
    curriculum: "ICSE",
    marks: 90,
    questionType: "Multiple Choice",
    options: ["CH4", "C2H6", "CO2", "CH3OH"],
    author: "Michael Roberts",
    datePublished: "2025-01-14",
  },
  {
    id: 10,
    level: "Easy",
    topic: "Physics",
    questionName: "What is the unit of force?",
    subject: "Physics",
    class: "9th",
    curriculum: "CBSE",
    marks: 70,
    questionType: "Multiple Choice",
    options: ["Newton", "Joule", "Watt", "Ampere"],
    author: "Sophia Davis",
    datePublished: "2025-01-11",
  },
  {
    id: 11,
    level: "Moderate",
    topic: "Grammar",
    questionName:
      "Identify the subject in the sentence: 'The cat sleeps on the mat.'",
    subject: "English",
    class: "8th",
    curriculum: "ICSE",
    marks: 85,
    questionType: "Multiple Choice",
    options: ["The cat", "sleeps", "on the mat", "The mat"],
    author: "Rachel Miller",
    datePublished: "2025-01-20",
  },
  {
    id: 12,
    level: "Difficult",
    topic: "World Geography",
    questionName: "What is the largest country by area?",
    subject: "Geography",
    class: "10th",
    curriculum: "CBSE",
    marks: 95,
    questionType: "Multiple Choice",
    options: ["Russia", "Canada", "United States", "China"],
    author: "Steven Harris",
    datePublished: "2025-01-13",
  },
  {
    id: 13,
    level: "Moderate",
    topic: "Physics",
    questionName:
      "What is the force required to accelerate a 2kg object at 3m/s²?",
    subject: "Physics",
    class: "10th",
    curriculum: "IB",
    marks: 90,
    questionType: "Multiple Choice",
    options: ["6N", "3N", "9N", "12N"],
    author: "Daniel Clark",
    datePublished: "2025-01-18",
  },
  {
    id: 14,
    level: "Easy",
    topic: "Economics",
    questionName: "What is the currency of the United States?",
    subject: "Economics",
    class: "9th",
    curriculum: "CBSE",
    marks: 75,
    questionType: "Multiple Choice",
    options: ["Dollar", "Euro", "Pound", "Yen"],
    author: "Olivia Scott",
    datePublished: "2025-01-16",
  },
  {
    id: 15,
    level: "Difficult",
    topic: "Math",
    questionName: "What is the integral of x² dx?",
    subject: "Math",
    class: "12th",
    curriculum: "ICSE",
    marks: 100,
    questionType: "Multiple Choice",
    options: ["x³/3", "x³", "x²", "2x"],
    author: "Benjamin Parker",
    datePublished: "2025-01-15",
  },
  {
    id: 16,
    level: "Moderate",
    topic: "Chemistry",
    questionName: "What is the atomic number of carbon?",
    subject: "Science",
    class: "10th",
    curriculum: "IB",
    marks: 80,
    questionType: "Multiple Choice",
    options: ["6", "8", "12", "14"],
    author: "Grace Lee",
    datePublished: "2025-01-14",
  },
  {
    id: 17,
    level: "Difficult",
    topic: "Statistics",
    questionName: "Find the mean of the following data: 2, 4, 6, 8, 10",
    subject: "Math",
    class: "10th",
    curriculum: "CBSE",
    marks: 90,
    questionType: "Multiple Choice",
    options: ["6", "5", "7", "8"],
    author: "Jack Williams",
    datePublished: "2025-01-17",
  },
  {
    id: 18,
    level: "Easy",
    topic: "Basic Math",
    questionName: "What is 5 + 3?",
    subject: "Math",
    class: "6th",
    curriculum: "ICSE",
    marks: 50,
    questionType: "Multiple Choice",
    options: ["7", "8", "9", "6"],
    author: "Megan Brown",
    datePublished: "2025-01-19",
  },
  {
    id: 19,
    level: "Moderate",
    topic: "Botany",
    questionName: "What is the process of photosynthesis?",
    subject: "Science",
    class: "9th",
    curriculum: "CBSE",
    marks: 85,
    questionType: "True/False",
    author: "Henry Carter",
    datePublished: "2025-01-12",
  },
  {
    id: 20,
    level: "Difficult",
    topic: "Algebra",
    questionName: "Solve for X in 4x² + 7x - 10 = 0",
    subject: "Math",
    class: "12th",
    curriculum: "ICSE",
    marks: 100,
    questionType: "Multiple Choice",
    options: ["x = -5", "x = 2", "x = 1", "x = 0"],
    author: "Sophia Lee",
    datePublished: "2025-01-20",
  },
];

function TableCardComponent({ onSelectedCountChange }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Default page size

  const handleSelectRow = (id) => {
    setSelectedRows((prev) => {
      const updatedSelection = prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id];

      // Pass the updated selected count to the parent
      onSelectedCountChange(updatedSelection.length);
      return updatedSelection;
    });
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size); // Update the page size dynamically
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
                      <circle cx="7" cy="7" r="4" fill="#e1e2e3" />
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
          total={data.length}
          onChange={handlePageChange}
          showSizeChanger
          onShowSizeChange={handlePageChange}
          pageSizeOptions={["5", "10", "15", "20"]} // Options for page sizes
        />
      </div>
      <div
        style={{
          paddingRight: "100px",
          paddingLeft: "100px",
        }}
      >
        <QuestionBankCard columns={8} />
      </div>
    </div>
  );
}

export default TableCardComponent;
