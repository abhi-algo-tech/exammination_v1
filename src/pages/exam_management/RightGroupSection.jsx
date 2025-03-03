import { Tabs, Select, Button, Input, Row, Col, Space } from "antd";
import { PlusOutlined, UploadOutlined, BankOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
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

function RightGroupSection({ examData = [], setSelectedQuestion, onPreview }) {
  const navigate = useNavigate();
  const [selectedQuestion1, setSelectedQuestion1] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (examData?.data?.examGroupQuestions) {
      setQuestions(examData.data.examGroupQuestions);
      setSelectedQuestion(examData.data.examGroupQuestions[0]);
      setSelectedQuestion1(examData.data.examGroupQuestions[0]);
    }
  }, [examData]);

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setSelectedQuestion1(question);
    console.log("Selected Question:", question);
  };

  console.log("examData:", examData);

  const handleMarksChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && parseInt(value, 10) <= 20)) {
      setMarks(value === "" ? "" : parseInt(value, 10));
    }
  };

  const handleAddQuestionThroughBank = () =>
    navigate("/add-question-by-bank", { state: examData });

  const handleUpload = () => navigate("/upload-questions", { state: examData });

  return (
    <div
      className="left-container-question-create"
      style={{ padding: "37px 36px" }}
    >
      <QuestionGrid>
        {questions.map((q, index) => (
          <QuestionBox
            key={index}
            style={{
              backgroundColor: selectedQuestion1 === q ? "green" : "white",
              color: selectedQuestion1 === q ? "white" : "black",
              border:
                selectedQuestion1 === q
                  ? "2px solid darkgreen"
                  : "1px solid gray",
            }}
            selected={selectedQuestion1 === q.questionNumber}
            onClick={() => handleQuestionClick(q)}
          >
            {q.questionNumber}
          </QuestionBox>
        ))}
      </QuestionGrid>
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

export default RightGroupSection;
