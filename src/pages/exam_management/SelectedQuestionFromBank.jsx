import React, { useState } from "react";
import CreateQuestionPaper from "./CreateQuestionPaper";
import AddQuestion from "./AddQuestion";
import CustomSelect from "../../exam_components/select/CustomSelect";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";
import QuestionBankCard from "../../exam_components/card/QuestionBankCard";
import { Col, Row, Checkbox, Space, Popconfirm, message } from "antd";
import { useLocation } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const examNameOptions = [
  { value: "1", label: "Summative Assessment - I" },
  { value: "2", label: "Summative Assessment - II" },
  { value: "3", label: "Summative Assessment - III" },
];

function SelectedQuestionFromBank() {
  const location = useLocation();
  const {
    selectedRow: initialSelectedRows,
    selectedCount: initialSelectedCount,
  } = location.state || {
    selectedRow: [],
    selectedCount: 0,
  };

  const [selectedRows, setSelectedRows] = useState(initialSelectedRows || []);
  const [selectedCount, setSelectedCount] = useState(initialSelectedCount);
  const [examName, setExamName] = useState(null);

  const handleFilterChange = (value) => {
    setExamName(value);
    console.log("examName", value);
  };

  const handleCheckboxChange = (questionId, checked) => {
    setSelectedRows((prevRows) => {
      if (checked) {
        return [...prevRows, questionId];
      } else {
        return prevRows.filter((id) => id !== questionId);
      }
    });
  };

  const confirm = (questionId) => {
    setSelectedRows((prevRows) => prevRows.filter((id) => id !== questionId));
    setSelectedCount((prevRows) => prevRows.length - 1);
    message.success("Question removed!");
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const getQuestionsByType = (type) => {
    console.log("initialSelectedRows", initialSelectedRows);
    return (initialSelectedRows || []).filter(
      (question) => question.questionType === type
    );
  };

  const questionTypes = [
    "Multiple Choice",
    "Short Answer",
    "Long Answer",
    "True/False",
  ];

  return (
    <div className="mt-2">
      <h2 className="page-head gap10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
        >
          <path
            d="M7.42 1.41L2.83 6L7.42 10.59L6 12L0 6L6 0L7.42 1.41ZM13.42 1.41L8.83 6L13.42 10.59L12 12L6 6L12 0L13.42 1.41ZM19.42 1.41L14.83 6L19.42 10.59L18 12L12 6L18 0L19.42 1.41Z"
            fill="black"
          />
        </svg>
        {` Add (${selectedCount}) Selected Questions`}
      </h2>

      <div className="d-flex align-items-center mt-2">
        <div>You are adding questions to</div>
        <div style={{ paddingLeft: "10px", maxWidth: "40%", width: "100%" }}>
          <CustomSelect
            options={examNameOptions}
            placeholder="Select Exam"
            isSearchable
            onChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="mt-4">
        <Row gutter={[16, 16]}>
          {questionTypes.map((type) => {
            const questionsOfType = getQuestionsByType(type);
            if (questionsOfType.length > 0) {
              return (
                <Col span={12} key={type}>
                  <div className="select-question-type">
                    {`${type} (${questionsOfType.length} selected)`}
                  </div>
                  {questionsOfType.map((question) => (
                    <div
                      className="d-flex align-items-center mb-2 mt-3"
                      key={question.id}
                    >
                      <div className="ml2 ">
                        <Checkbox
                          checked={selectedRows.includes(question.id)}
                          onChange={(e) =>
                            handleCheckboxChange(question.id, e.target.checked)
                          }
                        />
                        <span style={{ paddingRight: 2, paddingLeft: 2 }}>
                          {" "}
                          {/* Added padding styles */}{" "}
                        </span>
                        <span style={{ paddingRight: 2, paddingLeft: 2 }}>
                          {" "}
                          {/* Added padding styles */}
                          {question.questionName}
                        </span>
                        <span style={{ paddingRight: 2, paddingLeft: 2 }}>
                          {" "}
                          {/* Added padding styles */}{" "}
                        </span>
                        <DeleteOutlined style={{ cursor: "pointer" }} />
                        {question.options && (
                          <ul className="options-list">
                            {question.options.map((option, index) => (
                              <li key={index} className="option-item">
                                <span className="option-letter">
                                  {String.fromCharCode(97 + index)}){" "}
                                </span>
                                {option}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </Col>
              );
            }
            return null;
          })}
        </Row>
      </div>

      <div
        style={{
          paddingTop: "20px",
          paddingRight: "100px",
          paddingLeft: "100px",
        }}
      >
        <QuestionBankCard columns={8} />
      </div>

      <div className="d-flex mt-4 justify-content-center gap20">
        <ButtonComponent
          bgColor="#F9A828"
          height="40px"
          width="186px"
          label="Confirm"
          labelColor="#FFF"
          fontWeight="700"
        />
        <ButtonComponent
          bgColor="rgba(7, 97, 125, 0.2)"
          height="40px"
          width="186px"
          label="Cancel"
          labelColor="#6E6E6E"
          fontWeight="700"
        />
      </div>
    </div>
  );
}

export default SelectedQuestionFromBank;
