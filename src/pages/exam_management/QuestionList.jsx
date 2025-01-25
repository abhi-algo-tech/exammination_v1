import React, { useState } from "react";
import { Checkbox, Pagination, Row, Col, Card } from "antd";
import "./QuestionList.css"; // You can add your custom styles here

const data = [
  {
    id: 1,
    level: "Difficult",
    topic: "Algebra",
    questionName: "Solve for X in 2x + 3 = 11",
    subject: "Math",
    class: "10th",
    curriculum: "CBSE",
    marks: 1,
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
    marks: 1,
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
    marks: 5,
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
    marks: 2,
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
    marks: 3,
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
    marks: 1,
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
    marks: 1,
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
    marks: 1,
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
    marks: 1,
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
    marks: 1,
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
    marks: 1,
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
    marks: 1,
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
    marks: 1,
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
    marks: 1,
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
    marks: 1,
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
    marks: 1,
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
    marks: 1,
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
    marks: 1,
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
    marks: 1,
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
    marks: 1,
    questionType: "Multiple Choice",
    options: ["x = -5", "x = 2", "x = 1", "x = 0"],
    author: "Sophia Lee",
    datePublished: "2025-01-20",
  },
];
function QuestionList() {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleCheckboxChange = (id) => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((questionId) => questionId !== id)
        : [...prevSelected, id]
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      {currentData.map((item, index) => {
        const isSelected = selectedQuestions.includes(item.id);
        return (
          <div
            key={item.id}
            className={`question-card ${isSelected ? "selected" : ""}`}
          >
            <div className="question-list-item">
              <div className="question-content">
                <div className="question-header">
                  <div className="checkbox-container">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </div>
                  <span className="question-index">{`Question ${
                    index + 1
                  }`}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    style={{ margin: "0 5px" }}
                  >
                    <circle cx="7" cy="7" r="4" fill="#D9D9D9" />
                  </svg>
                  <span className="question-level">{item.level}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    style={{ margin: "0 5px" }}
                  >
                    <circle cx="7" cy="7" r="4" fill="#D9D9D9" />
                  </svg>
                  <div>{item.questionType}</div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    style={{ margin: "0 5px" }}
                  >
                    <circle cx="7" cy="7" r="4" fill="#D9D9D9" />
                  </svg>
                  <span className="question-topic">{item.topic}</span>

                  {/* Align these to the left */}
                  <div className="marks-container">
                    <span>{item.marks} marks</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="4"
                      height="18"
                      viewBox="0 0 4 18"
                      fill="none"
                    >
                      <circle cx="2" cy="2" r="2" fill="#747474" />
                      <circle cx="2" cy="9" r="2" fill="#747474" />
                      <circle cx="2" cy="16" r="2" fill="#747474" />
                    </svg>
                  </div>
                </div>

                <div>{item.questionName}</div>
                {item.questionType === "Multiple Choice" && (
                  <ul className="options-list">
                    {item.options.map((option, idx) => (
                      <li key={idx} className="option-item">
                        <span className="option-letter">
                          {String.fromCharCode(97 + idx)}){" "}
                        </span>
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="question-details">
                <div className="hiperLink ">
                  <span>Add a tag</span>
                </div>
                <div className="hiperLink ">
                  <span>Edit tag</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <Pagination
        current={currentPage}
        total={data.length}
        pageSize={pageSize}
        onChange={handlePageChange}
        showSizeChanger={false}
        style={{
          marginTop: "20px",
          textAlign: "center",
          justifyContent: "center",
        }}
      />
    </div>
  );
}

export default QuestionList;
