import React, { useState } from "react";
import { Checkbox, Select, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

const QuestionContainer = styled.div`
  margin-bottom: 24px;
`;

const QuestionInput = styled(Input)`
  border: none;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 0;
  padding: 8px 0;

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
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-decoration-line: underline;

  &:hover {
    color: #4f46e5;
  }
`;

export default function ShortType() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "",
      type: "Short Answer Type",
      marks: 0,
      isChecked: false,
      options: [],
    },
  ]);

  //   console.log("questions", questions);

  const questionTypes = [
    "Short Answer Type",
    "Long Answer Type",
    "Multiple Choice",
    "True/False",
  ];

  const handleQuestionChange = (id, field, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, [field]: value } : question
      )
    );
  };

  const handleOptionChange = (id, index, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? {
              ...question,
              options: question.options.map((option, i) =>
                i === index ? value : option
              ),
            }
          : question
      )
    );
  };

  const addOption = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? { ...question, options: [...question.options, ""] }
          : question
      )
    );
  };

  const addNewQuestion = () => {
    const newId = Math.max(...questions.map((q) => q.id)) + 1;
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: newId,
        text: "",
        type: "Short Answer Type",
        marks: 0,
        isChecked: false,
        options: [],
      },
    ]);
  };

  return (
    <div>
      {questions.map((question, index) => (
        <QuestionContainer key={question.id}>
          <div className="d-flex justify-content-between mb12 align-items-center">
            <Checkbox
              className="label-18-500-b"
              checked={question.isChecked}
              onChange={(e) =>
                handleQuestionChange(question.id, "isChecked", e.target.checked)
              }
            >
              Question {index + 1}
            </Checkbox>

            <Select
              value={question.type}
              onChange={(value) =>
                handleQuestionChange(question.id, "type", value)
              }
              style={{
                display: "flex",
                width: "363px",
                height: "44px",
                alignItems: "center",
                gap: "139px",
                flexShrink: 0,
                borderRadius: "8px",
                border: "1px solid #797979",
              }}
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
                value={question.marks}
                onChange={(e) =>
                  handleQuestionChange(question.id, "marks", e.target.value)
                }
                style={{ width: 50 }}
                type="number"
              />
              <span className="label-16-500-g-i">Marks</span>
            </div>
          </div>

          <QuestionInput
            placeholder="Type the question here"
            value={question.text}
            onChange={(e) =>
              handleQuestionChange(question.id, "text", e.target.value)
            }
          />

          {/* Render additional fields based on the question type */}
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
        </QuestionContainer>
      ))}

      <AddButton type="link" icon={<PlusOutlined />} onClick={addNewQuestion}>
        Add a New Question
      </AddButton>
    </div>
  );
}
