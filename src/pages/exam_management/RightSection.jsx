import { Tabs, Select, Button, Input, Row, Col, Space } from "antd";
import { PlusOutlined, UploadOutlined, BankOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

function RightSection({ examData = [], sections = [], onPreview }) {
  const navigate = useNavigate();

  const handleMarksChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && parseInt(value, 10) <= 20)) {
      setMarks(value === "" ? "" : parseInt(value, 10));
    }
  };

  // Map sections to get the questions to be highlighted
  const sectionQuestionMap = sections.reduce((acc, section) => {
    acc[section.name] = new Set(
      section.questionList?.map((q) => q.questionNumber) || []
    );
    return acc;
  }, {});

  const handleAddQuestionThroughBank = () =>
    navigate("/add-question-by-bank", { state: examData });
  const handleUpload = () => navigate("/upload-questions", { state: examData });

  const renderQuestionGrid = (section) => {
    const highlightedQuestions = sectionQuestionMap[section.name] || new Set();

    return (
      <div key={section.key} style={{ marginBottom: "24px" }}>
        <div className="d-flex justify-content-between mb12">
          <div className="label-20-500-b">{section.name}</div>
          <div className="label-14-500-g">{section.marks} marks</div>
        </div>
        <QuestionGrid>
          {Array.from({ length: section.questions }, (_, i) => {
            const questionIndex = i + 1;
            const isHighlighted = highlightedQuestions.has(questionIndex);

            return (
              <QuestionBox
                key={i}
                style={{
                  backgroundColor: isHighlighted ? "green" : "white",
                  color: isHighlighted ? "white" : "black",
                  border: isHighlighted
                    ? "2px solid darkgreen"
                    : "1px solid gray",
                }}
              >
                {questionIndex}
              </QuestionBox>
            );
          })}
        </QuestionGrid>
      </div>
    );
  };

  return (
    <div
      className="left-container-question-create"
      style={{ padding: "37px 36px" }}
    >
      {sections.map(renderQuestionGrid)}
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div className="d-flex justify-content-between gap11">
          <Button type="primary" className="btn-review" onClick={onPreview}>
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
            <img
              src="./icons/png/add-question.png"
              className="height15 width16"
              alt="Add Question"
            />
            <span className="label-16-500-g-u">
              Add Questions according to topic
            </span>
          </div>
          <div
            className="d-flex align-items-center gap-3 mb20"
            onClick={handleUpload}
          >
            <img
              src="./icons/png/upload.png"
              className="height15 width12"
              alt="Upload"
            />
            <span className="label-16-500-g-u">Upload Question Paper</span>
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
              alt="AI"
            />
            <span className="label-16-500-g-u">Create with AI</span>
          </div>
        </div>
      </Space>
    </div>
  );
}

export default RightSection;
