import React, { useState } from "react";
import { Checkbox, Pagination, Row, Col, Card, Input } from "antd";
import "./StudentPaperList.css"; // You can add your custom styles here

const dataList = [
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
    datePublished1: "2025-01-15",
    section: "A",
  },
  {
    id: 2,
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
    section: "A",
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
    section: "A",
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
    section: "A",
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
    section: "A",
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
    section: "A",
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
    section: "A",
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
    section: "A",
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
    section: "A",
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
    section: "A",
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
    section: "A",
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
    section: "A",
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
    section: "A",
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
    section: "A",
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
    section: "A",
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
    options: ["True", "False"],
    author: "David Lee",
    datePublished: "2025-01-16",
    section: "B",
  },
  {
    id: 16,
    level: "Difficult",
    topic: "Physics",
    questionName: "Is light a form of energy?",
    subject: "Science",
    class: "10th",
    curriculum: "CBSE",
    marks: 1,
    questionType: "True/False",
    options: ["True", "False"],
    author: "Jane Smith",
    datePublished: "2025-01-17",
    section: "B",
  },
  {
    id: 17,
    level: "Difficult",
    topic: "Chemistry",
    questionName: "Is water a chemical compound?",
    subject: "Science",
    class: "10th",
    curriculum: "ICSE",
    marks: 1,
    questionType: "True/False",
    options: ["True", "False"],
    author: "John Doe",
    datePublished: "2025-01-18",
    section: "B",
  },
  {
    id: 18,
    level: "Difficult",
    topic: "Biology",
    questionName: "Is the heart part of the circulatory system?",
    subject: "Science",
    class: "9th",
    curriculum: "IB",
    marks: 1,
    questionType: "True/False",
    options: ["True", "False"],
    author: "Alice Brown",
    datePublished: "2025-01-19",
    section: "B",
  },
  {
    id: 19,
    level: "Difficult",
    topic: "Math",
    questionName: "Is the sum of angles in a triangle always 180°?",
    subject: "Math",
    class: "9th",
    curriculum: "CBSE",
    marks: 1,
    questionType: "True/False",
    options: ["True", "False"],
    author: "David Lee",
    datePublished: "2025-01-20",
    section: "B",
  },
  {
    id: 20,
    level: "Difficult",
    topic: "Geography",
    questionName: "Is the capital of Japan Tokyo?",
    subject: "Geography",
    class: "10th",
    curriculum: "ICSE",
    marks: 1,
    questionType: "True/False",
    options: ["True", "False"],
    author: "David Lee",
    datePublished: "2025-01-21",
    section: "B",
  },
  {
    id: 21,
    level: "Difficult",
    topic: "History",
    questionName: "Did World War II end in 1945?",
    subject: "History",
    class: "9th",
    curriculum: "IB",
    marks: 1,
    questionType: "True/False",
    options: ["True", "False"],
    author: "John Smith",
    datePublished: "2025-01-22",
    section: "B",
  },
  {
    id: 22,
    level: "Difficult",
    topic: "English",
    questionName: "Is Shakespeare known for writing the play 'Hamlet'?",
    subject: "English",
    class: "10th",
    curriculum: "ICSE",
    marks: 1,
    questionType: "True/False",
    options: ["True", "False"],
    author: "Mary Johnson",
    datePublished: "2025-01-23",
    section: "B",
  },
  {
    id: 23,
    level: "Difficult",
    topic: "Math",
    questionName: "Is pi a rational number?",
    subject: "Math",
    class: "9th",
    curriculum: "CBSE",
    marks: 1,
    questionType: "True/False",
    options: ["True", "False"],
    author: "Alice Brown",
    datePublished: "2025-01-24",
    section: "B",
  },
  {
    id: 24,
    level: "Difficult",
    topic: "Physics",
    questionName: "Is sound a form of energy?",
    subject: "Science",
    class: "10th",
    curriculum: "IB",
    marks: 1,
    questionType: "True/False",
    options: ["True", "False"],
    author: "James Anderson",
    datePublished: "2025-01-25",
    section: "B",
  },
  {
    id: 25,
    level: "Difficult",
    topic: "Chemistry",
    questionName: "Is oxygen a component of water?",
    subject: "Science",
    class: "9th",
    curriculum: "ICSE",
    marks: 1,
    questionType: "True/False",
    options: ["True", "False"],
    author: "David Lee",
    datePublished: "2025-01-26",
    section: "B",
  },
  {
    id: 26,
    level: "Difficult",
    topic: "Biology",
    questionName: "Do plants produce oxygen during photosynthesis?",
    subject: "Science",
    class: "10th",
    curriculum: "IB",
    marks: 1,
    questionType: "True/False",
    options: ["True", "False"],
    author: "Sarah Lee",
    datePublished: "2025-01-27",
    section: "B",
  },
  {
    id: 27,
    level: "Difficult",
    topic: "Math",
    questionName: "Is zero an even number?",
    subject: "Math",
    class: "9th",
    curriculum: "CBSE",
    marks: 1,
    questionType: "True/False",
    options: ["True", "False"],
    author: "John Doe",
    datePublished: "2025-01-28",
    section: "B",
  },
  {
    id: 28,
    level: "Difficult",
    topic: "Geography",
    questionName: "Is Africa the largest continent by area?",
    subject: "Geography",
    class: "10th",
    curriculum: "ICSE",
    marks: 1,
    questionType: "True/False",
    options: ["True", "False"],
    author: "Mary Johnson",
    datePublished: "2025-01-29",
    section: "B",
  },
  {
    id: 29,
    level: "Difficult",
    topic: "History",
    questionName: "Did the French Revolution begin in 1789?",
    subject: "History",
    class: "9th",
    curriculum: "IB",
    marks: 1,
    questionType: "True/False",
    options: ["True", "False"],
    author: "David Lee",
    datePublished: "2025-01-30",
    section: "B",
  },
  {
    id: 30,
    level: "Difficult",
    topic: "English",
    questionName: "Is 'To Kill a Mockingbird' written by Harper Lee?",
    subject: "English",
    class: "10th",
    curriculum: "ICSE",
    marks: 1,
    questionType: "True/False",
    options: ["True", "False"],
    author: "Alice Brown",
    datePublished: "2025-01-31",
    section: "B",
  },
  {
    id: 31,
    level: "Easy",
    topic: "Linear Equations",
    questionName: "Solve for X in 3x + 2 = 11",
    subject: "Math",
    class: "9th",
    curriculum: "ICSE",
    marks: 2,
    questionType: "Short Answer",
    options: [],
    author: "John Doe",
    datePublished: "2025-01-10",
    section: "C",
  },
  {
    id: 32,
    level: "Easy",
    topic: "Linear Equations",
    questionName: "Solve for X in 2x + 5 = 15",
    subject: "Math",
    class: "9th",
    curriculum: "ICSE",
    marks: 2,
    questionType: "Short Answer",
    options: [],
    author: "John Doe",
    datePublished: "2025-01-11",
    section: "C",
  },
  {
    id: 33,
    level: "Easy",
    topic: "Linear Equations",
    questionName: "Solve for X in 4x - 3 = 9",
    subject: "Math",
    class: "9th",
    curriculum: "ICSE",
    marks: 2,
    questionType: "Short Answer",
    options: [],
    author: "John Doe",
    datePublished: "2025-01-12",
    section: "C",
  },
  {
    id: 34,
    level: "Easy",
    topic: "Linear Equations",
    questionName: "Solve for X in 5x + 4 = 19",
    subject: "Math",
    class: "9th",
    curriculum: "ICSE",
    marks: 2,
    questionType: "Short Answer",
    options: [],
    author: "John Doe",
    datePublished: "2025-01-13",
    section: "C",
  },
  {
    id: 35,
    level: "Easy",
    topic: "Linear Equations",
    questionName: "Solve for X in 6x - 2 = 10",
    subject: "Math",
    class: "9th",
    curriculum: "ICSE",
    marks: 2,
    questionType: "Short Answer",
    options: [],
    author: "John Doe",
    datePublished: "2025-01-14",
    section: "C",
  },
  {
    id: 36,
    level: "Easy",
    topic: "Linear Equations",
    questionName: "Solve for X in 3x + 7 = 22",
    subject: "Math",
    class: "9th",
    curriculum: "ICSE",
    marks: 2,
    questionType: "Short Answer",
    options: [],
    author: "John Doe",
    datePublished: "2025-01-15",
    section: "C",
  },
  {
    id: 37,
    level: "Easy",
    topic: "Linear Equations",
    questionName: "Solve for X in 7x - 5 = 16",
    subject: "Math",
    class: "9th",
    curriculum: "ICSE",
    marks: 2,
    questionType: "Short Answer",
    options: [],
    author: "John Doe",
    datePublished: "2025-01-16",
    section: "C",
  },
  {
    id: 38,
    level: "Easy",
    topic: "Linear Equations",
    questionName: "Solve for X in 8x + 3 = 35",
    subject: "Math",
    class: "9th",
    curriculum: "ICSE",
    marks: 2,
    questionType: "Short Answer",
    options: [],
    author: "John Doe",
    datePublished: "2025-01-17",
    section: "C",
  },
  {
    id: 39,
    level: "Easy",
    topic: "Linear Equations",
    questionName: "Solve for X in 2x - 4 = 10",
    subject: "Math",
    class: "9th",
    curriculum: "ICSE",
    marks: 2,
    questionType: "Short Answer",
    options: [],
    author: "John Doe",
    datePublished: "2025-01-18",
    section: "C",
  },
  {
    id: 40,
    level: "Easy",
    topic: "Linear Equations",
    questionName: "Solve for X in 9x + 6 = 42",
    subject: "Math",
    class: "9th",
    curriculum: "ICSE",
    marks: 2,
    questionType: "Short Answer",
    options: [],
    author: "John Doe",
    datePublished: "2025-01-19",
    section: "C",
  },
  {
    id: 41,
    level: "Difficult",
    topic: "Math",
    questionName: "Find the derivative of sin(x) with respect to x.",
    subject: "Math",
    class: "12th",
    curriculum: "ICSE",
    marks: 5,
    questionType: "Brief Answer",
    options: [],
    author: "Benjamin Parker",
    datePublished: "2025-01-16",
    section: "D",
  },
  {
    id: 42,
    level: "Difficult",
    topic: "Math",
    questionName: "Explain the concept of limits in calculus.",
    subject: "Math",
    class: "12th",
    curriculum: "ICSE",
    marks: 5,
    questionType: "Brief Answer",
    options: [],
    author: "Benjamin Parker",
    datePublished: "2025-01-17",
    section: "D",
  },
  {
    id: 43,
    level: "Difficult",
    topic: "Math",
    questionName: "What is the fundamental theorem of calculus?",
    subject: "Math",
    class: "12th",
    curriculum: "ICSE",
    marks: 5,
    questionType: "Brief Answer",
    options: [],
    author: "Benjamin Parker",
    datePublished: "2025-01-18",
    section: "D",
  },
  {
    id: 44,
    level: "Difficult",
    topic: "Math",
    questionName: "Find the area under the curve y = x³ from x = 0 to x = 2.",
    subject: "Math",
    class: "12th",
    curriculum: "ICSE",
    marks: 5,
    questionType: "Brief Answer",
    options: [],
    author: "Benjamin Parker",
    datePublished: "2025-01-19",
    section: "D",
  },
  {
    id: 45,
    level: "Difficult",
    topic: "Math",
    questionName: "Define the concept of a tangent to a curve.",
    subject: "Math",
    class: "12th",
    curriculum: "ICSE",
    marks: 5,
    questionType: "Brief Answer",
    options: [],
    author: "Benjamin Parker",
    datePublished: "2025-01-20",
    section: "D",
  },
];
function StudentPaperList({ section }) {
  const data = dataList.filter((question) => question.section === section);
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

                  <div>{item.questionType}</div>
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
                  <span className="question-topic">{item.topic}</span>

                  {/* Align these to the left */}
                  <div className="marks-container">
                    <span>{item.marks} marks</span>
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="4"
                      height="18"
                      viewBox="0 0 4 18"
                      fill="none"
                    >
                      <circle cx="2" cy="2" r="2" fill="#747474" />
                      <circle cx="2" cy="9" r="2" fill="#747474" />
                      <circle cx="2" cy="16" r="2" fill="#747474" />
                    </svg> */}
                  </div>
                </div>

                <div>{item.questionName}</div>
                {item.questionType === "Multiple Choice" ||
                item.questionType === "True/False" ? (
                  <div className="options-container">
                    {item.options.map((option, idx) => (
                      <div key={idx} className="option-item">
                        <label>
                          <input
                            type="radio"
                            name={`question-${item.id}`}
                            value={option}
                            className="option-radio"
                          />
                          <span className="option-letter ml4">
                            {String.fromCharCode(97 + idx)}){" "}
                          </span>
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Input.TextArea
                    className="answer-input"
                    rows={4}
                    placeholder="Your answer"
                    value={item.answer} // If the answer is stored in the item
                    onChange={(e) => handleInputChange(e, item.id)} // Define handleInputChange for updates
                  />
                )}
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

export default StudentPaperList;
