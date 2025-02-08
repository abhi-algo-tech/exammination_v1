import React, { useEffect, useState } from "react";
import { Tabs, Checkbox, Select, Input, Button, Divider, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  useCreateQuestion,
  useQuestionById,
  useUpdateQuestion,
} from "../../hooks/useQuestion";
import { CustomMessage } from "../../utils/CustomMessage";
import { useExamById } from "../../hooks/useExam";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";

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

const formatSections = (sections) => {
  return sections.map((section, index) => ({
    key: index + 1, // Using 'id' as a unique key
    name: `SECTION - ${section.sectionName.toUpperCase()}`, // Formatting name
    marks: 0, // Default marks
    questions: [], // Empty questions array
  }));
};

export default function ShortType({ examQuestionList, refetch, exam }) {
  const [form] = Form.useForm(); // Move useForm here
  const [activeSection, setActiveSection] = useState(1);
  // const exam = useSelector((state) => state.auth.exam);

  const sections = formatSections(exam?.sections);
  const [sectionsData, setSectionsData] = useState(sections);

  const { mutate: createQuestion, isLoading, isError } = useCreateQuestion();
  const { mutate: updateQuestion } = useUpdateQuestion();
  // const { data: examQuestionList, refetch } = useExamById(id);

  useEffect(() => {
    if (examQuestionList?.data?.examQuestions) {
      const updatedSections = sections.map((section) => {
        const questions = examQuestionList.data.examQuestions
          .filter((q) => q.section === section.name) // Match section names
          .map((q, index) => ({
            questionId: q.question.id,
            id: index + 1,
            isChecked: false,
            level: q.question.levelId.toString(),
            marks: q.question.marks,
            options: q.question.options ? q.question.options.split(", ") : [],
            text: q.question.name,
            topic: q.question.topic,
            type: q.question.typeId.toString(),
          }));

        return { ...section, questions };
      });

      setSectionsData(updatedSections);
    }
  }, [examQuestionList]); // Dependency array to trigger effect when examQuestionList updates

  const questionTypes = {
    1: "Short Answer Type",
    2: "Long Answer Type",
    3: "Multiple Choice",
    4: "True/False",
  };

  const questionDifficulty = {
    1: "Hard",
    2: "Normal",
    3: "Easy",
    4: "Very Easy",
  };

  const handleQuestionChange = (sectionKey, questionId, field, value) => {
    setSectionsData((prevSections) => {
      const updatedSections = structuredClone(prevSections);
      updatedSections.forEach((section) => {
        if (section.key === sectionKey) {
          section.questions.forEach((question) => {
            if (question.id === questionId) {
              question[field] = value;
            }
          });
        }
      });
      return updatedSections;
    });
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
    setSectionsData((prevSections) => {
      return prevSections.map((section) => {
        if (section.key === sectionKey) {
          const latestQuestion = section.questions;

          const latestQuestionId =
            latestQuestion[latestQuestion?.length - 1]?.questionId || 0;

          // Check if latestQuestion is empty or the last object has a questionId
          if (!latestQuestion || latestQuestion.length === 0) {
            // Skip form validation and directly create a new question

            const newQuestion = {
              id: section.questions.length + 1,
              text: "",
              // type: "", // Default type
              // level: "Select Level", // Default level
              topic: "",
              marks: 0,
              isChecked: false,
              options: [], // Options are initially empty
            };

            return {
              ...section,
              questions: [...section.questions, newQuestion],
            };
          } else if (!latestQuestionId == 0) {
            console.log("second:", latestQuestionId);
            const newQuestion = {
              id: section.questions.length + 1,
              text: "",
              // type: "Select Type", // Default type
              // level: "Select Level", // Default level
              topic: "",
              marks: 0,
              isChecked: false,
              options: [], // Options are initially empty
            };

            return {
              ...section,
              questions: [...section.questions, newQuestion],
            };
          }

          // Perform form validation before adding a new question
          form
            .validateFields()
            .then(() => {
              const newLatestQuestion =
                latestQuestion[latestQuestion?.length - 1];
              const payload = {
                name: newLatestQuestion.text,
                options: newLatestQuestion?.options?.join(", ") || "",
                optionLength: newLatestQuestion?.options?.length,
                // answer: "",
                typeId: newLatestQuestion.type,
                levelId: newLatestQuestion.level,
                topic: newLatestQuestion.topic || "",
                marks: newLatestQuestion.marks,
                isDeleted: false,
                examQuestion: {
                  exam: exam?.id,
                  questionNumber: latestQuestion.length,
                  section: section.name,
                  isPublished: false,
                },
              };

              createQuestion(payload, {
                onSuccess: () => {
                  CustomMessage.success("Question created successfully!");
                  refetch();

                  const newQuestion = {
                    id: section.questions.length + 1,
                    text: "",
                    // type: "Select Type",
                    // level: "Select Level",
                    topic: "",
                    marks: 0,
                    isChecked: false,
                    options: [],
                  };

                  return {
                    ...section,
                    questions: [...section.questions, newQuestion],
                  };
                },
                onError: (error) => {
                  CustomMessage.error(
                    "Failed to create question. Please try again."
                  );
                  console.error("Error creating question:", error);
                },
              });
            })
            .catch((error) => {
              console.log("Form validation failed:", error);
            });
        }

        return section;
      });
    });
  };

  const allQuestions = sectionsData.flatMap((section) => ({
    section: section.name,
    questions: section.questions,
  }));

  const handleTabChange = (key) => {
    setActiveSection(Number(key));
    refetch();
  };

  const handleUpdate = ({ question, sectionName }) => {
    form
      .validateFields()
      .then(() => {
        const payload = {
          name: question.text,
          options: question?.options?.join(", ") || "",
          optionLength: question?.options?.length || 0,
          // answer: "",
          typeId: question.type,
          levelId: question.level,
          topic: question.topic || "",
          marks: question.marks,
          isDeleted: false,
          examQuestion: {
            exam: exam?.id,
            questionNumber: question.questionNumber ?? 0,
            section: sectionName,
            isPublished: false,
          },
        };

        updateQuestion(
          { id: question.questionId, payload },
          {
            onSuccess: () => {
              CustomMessage.success("Question updated successfully!");
              refetch();
            },
            onError: (error) => {
              CustomMessage.error(
                "Failed to update question. Please try again."
              );
              console.error("Error updating question:", error);
            },
          }
        );
      })
      .catch((error) => {
        console.log("Form validation failed:", error);
      });
  };

  return (
    <div>
      <Tabs
        activeKey={String(activeSection)}
        onChange={handleTabChange}
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
            <Form form={form}>
              {section.questions.map((question) => (
                <QuestionContainer key={question.id}>
                  <div className="d-flex  mb12 gap-4">
                    <Form.Item
                      name={`question-${question.id}-${section.name}-checked`}
                      initialValue={question.isChecked}
                      valuePropName="checked"
                    >
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
                        <label style={{ width: "100px" }}>
                          {" "}
                          Question {question.id}
                        </label>
                      </Checkbox>
                    </Form.Item>

                    <Form.Item
                      name={`question-${question.id}-${section.name}-type`}
                      initialValue={question.type}
                      rules={[
                        {
                          required: true,
                          message: "Please select a question type!",
                        },
                      ]}
                    >
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
                        {Object.entries(questionTypes).map(([key, type]) => (
                          <Select.Option key={key} value={key}>
                            {type}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name={`question-${question.id}-${section.name}-level`}
                      initialValue={question.level}
                      rules={[
                        {
                          required: true,
                          message: "Please select a difficulty level!",
                        },
                      ]}
                    >
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
                        {Object.entries(questionDifficulty).map(
                          ([key, level]) => (
                            <Select.Option key={key} value={key}>
                              {level}
                            </Select.Option>
                          )
                        )}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name={`question-${question.id}-${section.name}-marks`}
                      initialValue={question.marks} // ✅ Set initial value
                      rules={[
                        { required: true, message: "Please enter marks!" },
                        {
                          validator: (_, value) => {
                            // Handling empty input or non-numeric input
                            if (
                              value === "" ||
                              value === undefined ||
                              value === null
                            ) {
                              return Promise.reject("Please enter marks!");
                            }
                            if (isNaN(value) || value < 1 || value > 20) {
                              return Promise.reject(
                                "Marks must be between 0 and 20"
                              );
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <div className="d-flex text-center align-items-center gap8 w-10px">
                        <Input
                          type="number"
                          value={question.marks}
                          onChange={(e) => {
                            const newValue = Number(e.target.value); // Ensure it's a number
                            form.setFieldsValue({
                              [`question-${question.id}-marks`]: newValue,
                            });
                            handleQuestionChange(
                              section.key,
                              question.id,
                              "marks",
                              newValue
                            );
                          }}
                        />
                        <span className="label-16-500-g-i">Marks</span>
                      </div>
                    </Form.Item>
                  </div>

                  <div className="d-flex  gap-4 ">
                    <div style={{ width: "100%" }}>
                      <Form.Item
                        name={`question-${question.id}-${section.name}-text`}
                        initialValue={question.text}
                        rules={[
                          {
                            required: true,
                            message: "Please enter the question text!",
                          },
                        ]}
                      >
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
                      </Form.Item>
                    </div>
                    <div>
                      <Form.Item
                        name={`question-${question.id}-${section.name}-topic`}
                        initialValue={question.topic}
                        rules={[
                          { required: true, message: "Please enter a topic!" },
                        ]}
                      >
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
                      </Form.Item>
                    </div>
                  </div>

                  {question.type == 3 && (
                    <div>
                      {question.options.map((option, idx) => (
                        <Form.Item
                          key={idx}
                          name={`question-${question.id}-${section.name}-option-${idx}`}
                          initialValue={option}
                          rules={[
                            {
                              required: true,
                              message: "Please enter an option!",
                            },
                          ]}
                        >
                          <Input
                            placeholder={`Option ${idx + 1}`}
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(
                                question.id,
                                idx,
                                e.target.value
                              )
                            }
                            style={{ marginTop: 8 }}
                          />
                        </Form.Item>
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

                  {question.type == 4 && (
                    <div>
                      <Checkbox disabled>True</Checkbox>
                      <Checkbox disabled style={{ marginLeft: 16 }}>
                        False
                      </Checkbox>
                    </div>
                  )}

                  {question?.questionId && (
                    <div style={{ textAlign: "right" }}>
                      <Form.Item>
                        <ButtonComponent
                          bgColor="#F9A828"
                          height="30px"
                          width="150px"
                          label="Update"
                          onClick={() =>
                            handleUpdate({
                              question,
                              sectionName: section.name,
                            })
                          }
                        />
                      </Form.Item>
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
            </Form>
          ),
        }))}
      />
    </div>
  );
}
