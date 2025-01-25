import React, { useState } from "react";
import { Tabs, Select, Button, Input, Row, Col, Space, Checkbox } from "antd";
import { PlusOutlined, UploadOutlined, BankOutlined } from "@ant-design/icons";
import styled from "styled-components";
import ShortType from "../questionType/ShortType";
import { useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";
import CommonModalComponent from "../../components/CommonModalComponent";
import ReviewModal from "./ReviewModal";
import RightSection from "./RightSection";

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
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
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
          <div className="mb10">
            <ButtonComponent
              bgColor="#F9A828"
              height="40px"
              width="222px"
              label="Change Questions"
              // onClick={handleUploadClick}
            />
          </div>
          <RightSection
            sections={sections}
            onPreview={() => setReviewModalOpen(true)}
          />
        </Col>
      </Row>
      {isReviewModalOpen && (
        <CommonModalComponent
          open={isReviewModalOpen}
          setOpen={setReviewModalOpen}
          modalWidthSize={696}
          modalHeightSize={599}
          isClosable={true}
        >
          <ReviewModal
            // CardTitle={"Add Student"}
            // classroomId={null}
            closeModal={() => setReviewModalOpen(false)}
          />
        </CommonModalComponent>
      )}
    </div>
  );
};

export default ReviewQuestions;
