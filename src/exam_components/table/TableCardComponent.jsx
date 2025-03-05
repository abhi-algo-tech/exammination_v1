import React, { useState, useEffect } from "react";
import { Card, Checkbox, Row, Col, Pagination } from "antd";
import "./TableCardComponent.css";
import QuestionBankCard from "../card/QuestionBankCard";
import { CustomMessage } from "../../utils/CustomMessage";

function convertOptions(optionsString) {
  if (!optionsString) {
    return []; // Return an empty array if the input is null or undefined
  }
  console.log(
    "option:",
    optionsString.split(",").map((opt) => opt.trim())
  );
  return optionsString.split(",").map((opt) => opt.trim());
}

function transformData(data) {
  console.log("datanew:", data);
  return data.map((item) => ({
    id: item.id,
    level: item.level,
    topic: item.topic,
    questionNumber: item.examQuestion?.questionNumber,
    questionName: item.name,
    subject: item.subject,
    class: item.classes,
    curriculum: item.curriculum || "Not Available",
    marks: item.marks,
    questionType: item.type,
    options: convertOptions(item.options), // Converting the options string to an array
    author: "Unknown", // Assuming you need to add an author dynamically
    datePublished: new Date().toISOString().split("T")[0], // Custom date format
  }));
}

const TableCardComponent = ({
  questions,
  onSelectedCountChange,
  onSelectedRows,
  currentPage,
  pageSize,
  sectionId,
  examId,
  examValue,
  onPageChange,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [finalSelectedRows, inalSelectedRows] = useState([]);

  const data = transformData(questions);

  // Initialize selection based on examValue's data
  useEffect(() => {
    if (examValue?.data?.examQuestions) {
      const selectedQuestionIds = examValue?.data?.examQuestions.map(
        (examQuestion) => examQuestion?.question?.id
      );
      setSelectedRows(selectedQuestionIds);
    }
  }, [examValue]);

  const handleSelectRow = (id) => {
    if (examId) {
      if (sectionId) {
        // setSelectedRows((prev) => {
        //   const updatedSelection = prev.includes(id)
        //     ? prev.filter((rowId) => rowId !== id) // Unselect if already selected
        //     : [...prev, id]; // Select if not selected
        //   console.log("updatedSelection:", updatedSelection);

        //   // console.log("data", data);

        //   // Filter data based on updatedSelection (selected ids)
        //   // const selectedData = data.filter((item) =>
        //   //   updatedSelection.includes(item.id)
        //   // );
        //   const selectedData = data.find((item) => item.id === id);

        //   // console.log("selectedData:", selectedData);

        //   // Update selected rows in the parent component or wherever needed
        //   onSelectedRows(selectedData); // Assuming setSelectedRow is a function passed as a prop
        //   onSelectedCountChange(updatedSelection.length); // Pass the updated selected count to the parent

        //   return updatedSelection;
        // });
        setSelectedRows((prev) => {
          const isAlreadySelected = prev.includes(id);

          // ✅ Toggle checkFlag based on selection status
          const updatedSelection = isAlreadySelected
            ? prev.filter((rowId) => rowId !== id) // Remove if already selected
            : [...prev, id]; // Add if not selected

          // console.log("updatedSelection:", updatedSelection);

          // ✅ Find the selected data and update `checkFlag`
          let selectedData = data.find((item) => item.id === id);
          if (selectedData) {
            selectedData = { ...selectedData, checkFlag: !isAlreadySelected };
          }

          // console.log("selectedData:", selectedData);

          // ✅ Pass selected data to the parent
          onSelectedRows(selectedData);
          onSelectedCountChange(updatedSelection.length); // Pass updated count

          return updatedSelection;
        });
      } else {
        CustomMessage.error("First select Section");
      }
    } else {
      CustomMessage.error("First select Exam");
    }
  };

  const paginatedData = data;

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
        const isSelected = selectedRows.includes(item.id); // Check if the item is selected
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
          current={currentPage + 1}
          pageSize={pageSize}
          total={questions[0]?.totalRecords}
          onChange={(page) => onPageChange(page, pageSize)}
          showSizeChanger
          onShowSizeChange={(current, newSize) =>
            onPageChange(current, newSize)
          } // Reset to page 1 when size changes
          pageSizeOptions={["5", "10", "15", "20"]} // Options for page sizes
        />
      </div>
    </div>
  );
};

export default TableCardComponent;
