import React, { useState } from "react";
import { Tabs, Checkbox, Select, Input, Button, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

const QuestionContainer = styled.div`
  margin-bottom: 24px;
`;

const QuestionInput = styled(Input)`
  border: none;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 0;
  padding: 8px 15px;

  &:focus {
    box-shadow: none;
    border-bottom-color: #000;
  }

  &::placeholder {
    color: #9ca3af;
    font-style: italic;
  }
`;

const AddButton = styled(Button)`
  color: #215988;
  padding: 0;
  height: auto;
  font-size: 16px;
  font-weight: 500;
  text-decoration: underline;

  &:hover {
    color: #4f46e5;
  }
`;

const sections = [
  { key: 1, name: "SECTION - A", marks: 15, questions: [] },
  { key: 2, name: "SECTION - B", marks: 15, questions: [] },
  { key: 3, name: "SECTION - C", marks: 15, questions: [] },
  { key: 4, name: "SECTION - D", marks: 15, questions: [] },
];

export default function ShortType() {
  const [activeSection, setActiveSection] = useState(1);
  const [sectionsData, setSectionsData] = useState(sections);

  const questionTypes = [
    "Short Answer Type",
    "Long Answer Type",
    "Multiple Choice",
    "True/False",
  ];
  const questionDifficulty = ["Hard", "Normal", "Easy", "Very Easy"];

  const handleQuestionChange = (sectionKey, questionId, field, value) => {
    setSectionsData((prevSections) =>
      prevSections.map((section) =>
        section.key === sectionKey
          ? {
              ...section,
              questions: section.questions.map((question) =>
                question.id === questionId
                  ? { ...question, [field]: value }
                  : question
              ),
            }
          : section
      )
    );
  };

  const handleOptionChange = (questionId, idx, value) => {
    setSectionsData((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        questions: section.questions.map((question) =>
          question.id === questionId
            ? {
                ...question,
                options: question.options.map((opt, i) =>
                  i === idx ? value : opt
                ),
              }
            : question
        ),
      }))
    );
  };

  const addOption = (id) => {
    setSectionsData((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        questions: section.questions.map((question) =>
          question.id === id
            ? {
                ...question,
                options:
                  question.options.length === 0 ||
                  question.options.at(-1).trim() !== ""
                    ? [...question.options, ""]
                    : question.options, // Only add a new option if the last one is not empty
              }
            : question
        ),
      }))
    );
  };

  const addQuestionToSection = (sectionKey) => {
    setSectionsData((prevSections) =>
      prevSections.map((section) =>
        section.key === sectionKey
          ? {
              ...section,
              questions: [
                ...section.questions,
                {
                  id: section.questions.length + 1,
                  text: "",
                  type: "Short Answer Type",
                  level: "Normal",
                  topic: "",
                  marks: 0,
                  isChecked: false,
                  options: [],
                },
              ],
            }
          : section
      )
    );
  };

  const allQuestions = sectionsData.flatMap((section) => ({
    section: section.name,
    questions: section.questions,
  }));

  return (
    <div>
      <Tabs
        activeKey={String(activeSection)}
        onChange={(key) => setActiveSection(Number(key))}
        items={sectionsData.map((section) => ({
          key: String(section.key),
          label: (
            <span
              className={
                activeSection === section.key ? "label-20-600" : "label-20-500"
              }
              style={{
                color: activeSection === section.key ? "#4B4B4B" : "#797979",
              }}
            >
              {section.name}
            </span>
          ),
          children: (
            <div>
              {section.questions.map((question) => (
                <QuestionContainer key={question.id}>
                  <div className="d-flex justify-content-between mb12 align-items-center">
                    <Checkbox
                      checked={question.isChecked}
                      onChange={(e) =>
                        handleQuestionChange(
                          section.key,
                          question.id,
                          "isChecked",
                          e.target.checked
                        )
                      }
                    >
                      Question {question.id}
                    </Checkbox>

                    <Select
                      className="height36"
                      value={question.type}
                      onChange={(value) =>
                        handleQuestionChange(
                          section.key,
                          question.id,
                          "type",
                          value
                        )
                      }
                      style={{ width: 200 }}
                      placeholder="Select Type"
                    >
                      {questionTypes.map((type) => (
                        <Select.Option key={type} value={type}>
                          {type}
                        </Select.Option>
                      ))}
                    </Select>
                    <Select
                      className="height36"
                      value={question.level}
                      onChange={(value) =>
                        handleQuestionChange(
                          section.key,
                          question.id,
                          "level",
                          value
                        )
                      }
                      style={{ width: 200 }}
                      placeholder="Answer Difficulty"
                    >
                      {questionDifficulty.map((level) => (
                        <Select.Option key={level} value={level}>
                          {level}
                        </Select.Option>
                      ))}
                    </Select>

                    <div className="d-flex text-center align-items-center gap8">
                      <Input
                        className="text-center"
                        value={question.marks}
                        onChange={(e) =>
                          handleQuestionChange(
                            section.key,
                            question.id,
                            "marks",
                            e.target.value
                          )
                        }
                        style={{ width: 38, height: 36 }}
                        type="text"
                        min={0}
                        max={20}
                      />
                      <span className="label-16-500-g-i">Marks</span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between gap-2 align-items-center">
                    <QuestionInput
                      placeholder="Type the question here"
                      value={question.text}
                      onChange={(e) =>
                        handleQuestionChange(
                          section.key,
                          question.id,
                          "text",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      className="enter-topic"
                      placeholder="Enter Topic"
                      value={question.topic}
                      onChange={(e) =>
                        handleQuestionChange(
                          section.key,
                          question.id,
                          "topic",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {question.type === "Multiple Choice" && (
                    <div>
                      {question.options.map((option, idx) => (
                        <Input
                          key={idx}
                          placeholder={`Option ${idx + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(question.id, idx, e.target.value)
                          }
                          style={{ marginTop: 8 }}
                        />
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => addOption(question.id)}
                        style={{ marginTop: 8 }}
                      >
                        Add Option
                      </Button>
                    </div>
                  )}

                  {question.type === "True/False" && (
                    <div>
                      <Checkbox disabled>True</Checkbox>
                      <Checkbox disabled style={{ marginLeft: 16 }}>
                        False
                      </Checkbox>
                    </div>
                  )}

                  <Divider />
                </QuestionContainer>
              ))}

              <AddButton
                type="link"
                icon={<PlusOutlined />}
                onClick={() => addQuestionToSection(section.key)}
              >
                Add a New Question
              </AddButton>
            </div>
          ),
        }))}
      />

      {/* <h3>All Questions:</h3> */}
      {/* <pre>{JSON.stringify(allQuestions, null, 2)}</pre> */}
    </div>
  );
}
