import React, { useState } from "react";
import { Tabs, Select, Button, Input, Row, Col, Space, Checkbox } from "antd";
import { PlusOutlined, UploadOutlined, BankOutlined } from "@ant-design/icons";
import styled from "styled-components";

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
  padding: 4px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #6366f1;
    color: #6366f1;
  }
`;

export default function AddQuestion() {
  const [activeSection, setActiveSection] = useState(1);
  const [questionType, setQuestionType] = useState("Short Answer Type");
  const [marks, setMarks] = useState(0);

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
  const handleMarksChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= 20) {
      setMarks(value);
    }
  };
  const handleTabChange = (key) => {
    if (activeSection !== key) {
      setActiveSection(key);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <div className="label-28-600">Summative Assessment - I</div>
        <div className="label-14-600-blue">View Examination Details</div>
      </div>
      <Row gutter={24} className="d-flex justify-content-between">
        {/* Left Section */}
        <Col>
          <Tabs activeKey={activeSection} onChange={handleTabChange}>
            {sections.map((section) => (
              <TabPane
                tab={
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
                }
                key={section.key}
              >
                <Space
                  direction="vertical"
                  style={{ width: "100%" }}
                  size="large"
                >
                  <div className="d-flex justify-content-between align-items-center gap-5">
                    <Checkbox>Question 1</Checkbox>
                    <Select
                      value={questionType}
                      onChange={setQuestionType}
                      style={{ width: 200 }}
                    >
                      {questionTypes.map((type) => (
                        <Select.Option key={type} value={type}>
                          {type}
                        </Select.Option>
                      ))}
                    </Select>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Input
                        min={0}
                        max={20}
                        value={marks}
                        onChange={handleMarksChange}
                        // style={{ width: 50 }}
                        // type="number"
                      />
                      <span>Marks</span>
                    </div>
                  </div>

                  <Input.TextArea
                    placeholder="Type the question here"
                    rows={4}
                  />

                  <Button type="link" icon={<PlusOutlined />}>
                    Add a New Question
                  </Button>
                </Space>
              </TabPane>
            ))}
          </Tabs>
        </Col>
        {/* Right Section */}
        <div className="left-container-question-create">
          <Col className="p-5">
            {sections.map((section, sectionIndex) => (
              <div key={section.key} style={{ marginBottom: "24px" }}>
                <div className="d-flex justify-content-between mb12">
                  <div className="label-20-500-b">{section.name}</div>
                  <div className="label-14-500-g">{section.marks} marks</div>
                </div>
                <QuestionGrid>
                  {Array.from({ length: section.questions }, (_, i) => (
                    <QuestionBox key={i}>
                      {i + 1 + sectionIndex * 11}
                    </QuestionBox>
                  ))}
                </QuestionGrid>
              </div>
            ))}

            <Space direction="vertical" size="middle">
              <div className="d-flex justify-content-between gap11">
                <Button type="primary" block>
                  Review Paper
                </Button>
                <Button block>Save as Draft</Button>
              </div>
              <div className="d-flex flex-wrap justify-content-start align-items-start gap-3">
                <Button type="link" icon={<PlusOutlined />} block>
                  Add a New Question
                </Button>
                <Button type="link" icon={<PlusOutlined />} block>
                  Add All Questions
                </Button>
                <Button type="link" icon={<UploadOutlined />} block>
                  Upload Question Paper
                </Button>
                <Button type="link" icon={<BankOutlined />} block>
                  Add Questions from Question Bank
                </Button>
                <Button type="link" icon={<PlusOutlined />} block>
                  Create with AI
                </Button>
              </div>
            </Space>
          </Col>
        </div>
      </Row>
    </div>
  );
}
