import React, { useState } from "react";
import { Tabs, Select, Button, Input, Row, Col, Space, Checkbox } from "antd";
import { PlusOutlined, UploadOutlined, BankOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";
import "./StudentPaper.css";
import StudentPaperList from "./StudentPaperList";

const { TabPane } = Tabs;

const QuestionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 16px;
`;

const QuestionBox = styled.div`
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  width: 35px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #6366f1;
    color: #6366f1;
  }
`;

const sections = [
  { key: 1, name: "SECTION - A", marks: 15, questions: 11, subKey: "A" },
  { key: 2, name: "SECTION - B", marks: 15, questions: 19, subKey: "B" },
  { key: 3, name: "SECTION - C", marks: 15, questions: 9, subKey: "C" },
  { key: 4, name: "SECTION - D", marks: 15, questions: 6, subKey: "D" },
];

const questionTypes = [
  "Short Answer Type",
  "Long Answer Type",
  "Multiple Choice",
  "True/False",
];

const StudentPaper = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(1);
  const [questionType, setQuestionType] = useState("Short Answer Type");
  const [marks, setMarks] = useState(0);

  const handleAddQuestionThroughBank = () => {
    navigate("/add-question-by-bank");
  };
  const handleUpload = () => {
    navigate("/upload-questions");
  };

  const handlePublish = () => {
    navigate("/publish-questions");
  };

  const handleMarksChange = (e) => {
    const value = e.target.value; // Get the input value as a string

    // Allow empty input (for backspace) and numbers within the range
    if (
      value === "" ||
      (/^\d+$/.test(value) &&
        parseInt(value, 10) >= 0 &&
        parseInt(value, 10) <= 20)
    ) {
      setMarks(value === "" ? "" : parseInt(value, 10)); // Allow empty or valid number
    }
  };

  const handleTabChange = (key) => setActiveSection(Number(key));

  const renderQuestionGrid = (section) => (
    <div key={section.key} style={{ marginBottom: "24px" }}>
      <div className="d-flex justify-content-between mb12">
        <div className="label-20-500-b">{section.name}</div>
        <div className="label-14-500-g">{section.marks} marks</div>
      </div>
      <QuestionGrid>
        {Array.from({ length: section.questions }, (_, i) => (
          <QuestionBox key={i}>{i + 1}</QuestionBox>
        ))}
      </QuestionGrid>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <div className="label-28-600">Chemistry Summative Assessment - I</div>
        <div className="label-14-600-blue">View Examination Details</div>
      </div>
      <div>
        <div className="lable-marks">Total No. of Marks</div>
        <div className="value-marks">80</div>
      </div>

      <Row gutter={[24, 24]}>
        {/* Left Section */}
        <Col xs={24} md={16}>
          <div className="card-student-paper">
            <div className="d-flex gap30">
              <div>
                <div className="rule-lable">Name of the Student</div>
                <div className="rule-value">Abhi Sahani</div>
              </div>

              <div>
                <div className="rule-lable">Student Candidate No </div>
                <div className="rule-value">123-678</div>
              </div>
              <div>
                <div className="rule-lable">Division </div>
                <div className="rule-value">A</div>
              </div>
              <div>
                <div className="rule-lable">Subject </div>
                <div className="rule-value">Math</div>
              </div>
            </div>
            <div className="hiperLink mt-2">
              <span>Edit Student Details</span>
            </div>
          </div>
          <Tabs
            activeKey={String(activeSection)} // Ensure this is a string matching the `key`
            onChange={(key) => setActiveSection(Number(key))}
            items={sections.map((section) => ({
              key: String(section.key), // Ensure key is a string
              label: (
                <span
                  className={
                    activeSection === section.key
                      ? "label-20-600"
                      : "label-20-500"
                  }
                  style={{
                    color:
                      activeSection === section.key ? "#4B4B4B" : "#797979",
                  }}
                >
                  {section.name}
                </span>
              ),
              children: (
                <>
                  <StudentPaperList section={section.subKey} />
                </>
              ),
            }))}
          />
        </Col>

        {/* Right Section */}

        <Col xs={24} md={8}>
          <div>
            <div className="lable-marks">Time Left</div>
            <div className="value-marks">02: 15: 00</div>
          </div>
          <div
            className="left-container-question-create mt-4"
            style={{ padding: "37px 36px" }}
          >
            {sections.map(renderQuestionGrid)}
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div>
                <div>
                  <ButtonComponent
                    bgColor="#F9A828"
                    height="40px"
                    width="100%"
                    label="Submit Paper"
                    onClick={handlePublish}
                  />
                </div>
              </div>
              <div className="diflex gap-3 mb20">
                <div className="d-flex align-items-center gap-3 mb20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="13"
                    viewBox="0 0 11 13"
                    fill="none"
                  >
                    <path
                      d="M5.52746 2.28225C6.9776 2.28225 8.35868 2.81925 9.39449 3.82613C11.5352 5.907 11.5352 9.33038 9.39449 11.4113C8.15152 12.6866 6.42517 13.1565 4.76787 12.9551L5.11314 11.6126C6.28706 11.7469 7.53003 11.3441 8.42774 10.4715C10.016 8.92763 10.016 6.37688 8.42774 4.76588C7.66814 4.0275 6.56328 3.62475 5.52746 3.62475V6.71251L2.07476 3.35625L5.52746 0V2.28225ZM1.59138 11.4113C-0.204023 9.66601 -0.48024 6.98101 0.762734 4.90013L1.79854 5.907C1.03895 7.38376 1.31517 9.26326 2.62719 10.4715C2.97246 10.8071 3.38679 11.0756 3.87017 11.277L3.45584 12.6195C2.7653 12.351 2.14382 11.9483 1.59138 11.4113Z"
                      fill="#215988"
                    />
                  </svg>
                  <span className="label-16-500-g-u">Restart Paper</span>
                </div>
                <div className="d-flex align-items-center gap-3 mb20">
                  {/* <img
                    src="./icons/png/add-question.png"
                    className="height15 width16"
                  /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="15"
                    viewBox="0 0 9 15"
                    fill="none"
                  >
                    <path
                      d="M3.01431 12.75H5.27504V15H3.01431V12.75ZM4.52146 0C8.55309 0.165 10.3089 4.215 7.91255 7.2525C7.28708 8.0025 6.27729 8.4975 5.77993 9.1275C5.27504 9.75 5.27504 10.5 5.27504 11.25H3.01431C3.01431 9.9975 3.01431 8.94 3.5192 8.19C4.01656 7.44 5.02635 6.9975 5.65182 6.5025C7.47548 4.8225 7.02333 2.445 4.52146 2.25C3.92188 2.25 3.34685 2.48705 2.92288 2.90901C2.49891 3.33097 2.26073 3.90326 2.26073 4.5H0C0 3.30653 0.476367 2.16193 1.3243 1.31802C2.17224 0.474106 3.32229 0 4.52146 0Z"
                      fill="#215988"
                    />
                  </svg>
                  <span className="label-16-500-g-u">Help</span>
                </div>
              </div>
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StudentPaper;
