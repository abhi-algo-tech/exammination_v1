import React, { useState } from "react";
import { Tabs, Select, Button, Input, Row, Col, Space, Checkbox } from "antd";
import { PlusOutlined, UploadOutlined, BankOutlined } from "@ant-design/icons";
import styled from "styled-components";
import ShortType from "../questionType/ShortType";
import { useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";

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
  { key: 1, name: "SECTION - A", marks: 15, questions: 11 },
  { key: 2, name: "SECTION - B", marks: 15, questions: 19 },
  { key: 3, name: "SECTION - C", marks: 15, questions: 9 },
  { key: 4, name: "SECTION - D", marks: 15, questions: 6 },
];

const questionTypes = [
  "Short Answer Type",
  "Long Answer Type",
  "Multiple Choice",
  "True/False",
];

const ReviewQuestions = () => {
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
        <div className="label-28-600">Summative Assessment - I</div>
        <div className="label-14-600-blue">View Examination Details</div>
      </div>
      <div>
        Exam Now has added questions to the question. Please review them.
      </div>
      <Row gutter={[24, 24]}>
        {/* Left Section */}
        <Col xs={24} md={16}>
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
                  <QuestionList />
                </>
              ),
            }))}
          />
        </Col>

        {/* Right Section */}
        <Col xs={24} md={8}>
          <div>
            <ButtonComponent
              bgColor="#F9A828"
              height="40px"
              width="222px"
              label="Change Questions"
              // onClick={handleUploadClick}
            />
          </div>
          <div
            className="left-container-question-create mt-4"
            style={{ padding: "37px 36px" }}
          >
            {sections.map(renderQuestionGrid)}
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div className="d-flex justify-content-between gap11">
                <Button
                  type="primary"
                  className="btn-review"
                  onClick={handlePublish}
                >
                  Review Paper
                </Button>
                <Button className="btn-save-draft">Save as Draft</Button>
              </div>
              <div className="diflex gap-3 mb20">
                <div className="d-flex align-items-center gap-3 mb20">
                  <PlusOutlined style={{ color: "#215988" }} />
                  <span className="label-16-500-g-u">Add a New Question</span>
                </div>
                <div className="d-flex align-items-center gap-3 mb20">
                  {/* <PlusOutlined style={{ color: "#215988" }} /> */}
                  <img
                    src="./icons/png/add-question.png"
                    className="height15 width16"
                  />
                  <span className="label-16-500-g-u">Add All Questions</span>
                </div>
                <div
                  className="d-flex align-items-center gap-3 mb20"
                  onClick={handleUpload}
                >
                  {/* <UploadOutlined style={{ color: "#215988" }} /> */}
                  <img
                    src="./icons/png/upload.png"
                    className="height15 width12"
                  />
                  <span className="label-16-500-g-u">Upload Questions</span>
                </div>

                <div
                  className="d-flex align-items-center gap-3 mb20"
                  onClick={handleAddQuestionThroughBank}
                >
                  <BankOutlined style={{ color: "#215988" }} />
                  <span className="label-16-500-g-u">
                    Add Questions from Question Bank
                  </span>
                </div>

                <div className="d-flex align-items-center gap-3 mb20">
                  <img
                    src="./icons/png/ai-green.png"
                    className="height15 width16"
                  />
                  <span className="label-16-500-g-u">Create with AI</span>
                </div>
              </div>
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ReviewQuestions;
