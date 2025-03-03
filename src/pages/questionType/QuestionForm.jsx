"use client";

import { useEffect, useState } from "react";
import { Form, Input, Select, Button, Checkbox, Divider } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  useCreateGroupQuestion,
  useUpdateGroupQuestion,
} from "../../hooks/useGroupQuestion";
import { useGetMasterLookupByType } from "../../hooks/useMasterLookup";
import { CustomMessage } from "../../utils/CustomMessage";

const { Option } = Select;

export default function QuestionForm({ examQuestionList, selectedQuestion }) {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([]);
  const [questionValue, setQuestionValue] = useState(selectedQuestion);
  const [questionType, setQuestionType] = useState(null);
  const [questionName, setQuestionName] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [options, setOptions] = useState([""]);
  const [subQuestions, setSubQuestions] = useState([]);
  const [questionCount, setQuestionCount] = useState(1);

  const { data: questionTypeslist } =
    useGetMasterLookupByType("question_types");

  const { mutate: createGroupQuestion, isLoading } = useCreateGroupQuestion(); // Use the mutation hook

  const { mutate: updateGroupQuestion } = useUpdateGroupQuestion();

  useEffect(() => {
    if (selectedQuestion) {
      setQuestionValue(selectedQuestion);
      console.log("Pre-filling form with selected question:", selectedQuestion);

      setQuestionCount(selectedQuestion.questionNumber);
      setQuestionName(selectedQuestion?.groupQuestion?.name || "");
      setQuestionType(selectedQuestion?.groupQuestion?.typeId);
      setQuestionBody(selectedQuestion?.groupQuestion?.body || "");

      form.setFieldsValue({
        questionName: selectedQuestion?.groupQuestion?.name || "",
        questionType: selectedQuestion?.groupQuestion?.typeId || null,
        topic: selectedQuestion?.groupQuestion?.topic || "",
        marks: selectedQuestion?.groupQuestion?.marks || "",
      });
      if (selectedQuestion?.groupQuestion?.subGroupQuestions?.length > 0) {
        const formattedSubQuestions =
          selectedQuestion?.groupQuestion?.subGroupQuestions?.map((sq) => ({
            id: sq.id,
            questionNumber: sq.questionNumber,
            name: sq.name || "",
            body: sq.body || "",
            options: sq.options ? sq.options.split(", ") : [""],
            topic: sq.topic || "",
            questionType: sq.typeId,
            marks: sq.marks,
          }));

        console.log("Setting sub-questions:", formattedSubQuestions);
        setSubQuestions(formattedSubQuestions);
      }
    }
  }, [selectedQuestion, form]);

  const questionTypes =
    questionTypeslist?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const handleAddOption = () => setOptions([...options, ""]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddSubQuestion = () => {
    setSubQuestions([
      ...subQuestions,
      {
        QuestionNumber: subQuestions.length + 1,
        body: "",
        questionType: null,
        topic: "",
        marks: "",
        options: [""],
      },
    ]);
  };

  const handleSubQuestionChange = (index, field, value) => {
    setSubQuestions((prevSubQuestions) =>
      prevSubQuestions.map((sq, idx) =>
        idx === index
          ? {
              ...sq,
              questionNumber: sq.questionNumber || sq.id, // Ensure questionNumber is only set once
              [field]:
                field === "marks"
                  ? value === ""
                    ? 0
                    : parseInt(value, 10)
                  : value, // Handle empty marks input
            }
          : sq
      )
    );
  };

  const handleSubQuestionOptionChange = (subIndex, optionIndex, value) => {
    const updatedSubQuestions = [...subQuestions];
    const subOptions = [...updatedSubQuestions[subIndex].options];
    subOptions[optionIndex] = value;
    updatedSubQuestions[subIndex].options = subOptions;
    setSubQuestions(updatedSubQuestions);
  };

  const handleAddSubQuestionOption = (subIndex) => {
    const updatedSubQuestions = [...subQuestions];
    updatedSubQuestions[subIndex].options.push("");
    setSubQuestions(updatedSubQuestions);
  };

  // const handleSave = () => {
  //   form.validateFields().then((values) => {
  //     const questionData = {
  //       srNo: questionCount,
  //       ...values,
  //       name: questionName,
  //       body: questionType == 15 ? questionBody : "",
  //       topic: values.topic,
  //       options: questionType == 7 ? options?.join(", ") || "" : "",
  //       optionLength: options?.length,
  //       examGroupQuestion: {
  //         exam: examQuestionList?.data?.id,
  //         questionNumber: questionCount,
  //         isPublished: false,
  //       },
  //       subGroupQuestions:
  //         questionType === 15
  //           ? subQuestions.map(({ id, ...sq }) => ({
  //               ...sq,
  //               name: sq.name,
  //               marks: sq.marks,
  //               options:
  //                 sq.questionType === 7 ? sq.options?.join(", ") || "" : "",
  //               typeId: sq.questionType,
  //               optionLength: Array.isArray(sq.options)
  //                 ? sq.options?.length
  //                 : 0,
  //               topic: sq.topic,
  //             }))
  //           : [],

  //       marks: parseInt(values.marks, 10) || 0, // Convert marks to an integer
  //       typeId: 7,
  //     };

  //     console.log("Saved Question Data:", questionData);

  //     createGroupQuestion(questionData, {
  //       onSuccess: (data) => {
  //         CustomMessage.success("Question Created Successfully");
  //         // console.log("Group Question Created Successfully:",  );
  //         setQuestions([...questions, data]); // Assuming API returns the saved question
  //         // resetForm();
  //       },
  //       onError: (error) => {
  //         CustomMessage.error("Failed to create Question");
  //         // console.error("Error creating group question:", error);
  //       },
  //     });

  //     setQuestions([...questions, questionData]);
  //     // resetForm();
  //   });
  // };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const questionData = {
        srNo: questionCount,
        ...values,
        name: questionName,
        body: questionType == 15 ? questionBody : "",
        topic: values.topic,
        options: questionType == 7 ? options?.join(", ") || "" : "",
        optionLength: options?.length,
        examGroupQuestion: {
          exam: examQuestionList?.data?.id,
          questionNumber: questionCount,
          isPublished: false,
        },
        subGroupQuestions:
          questionType === 15
            ? subQuestions.map(({ id, ...sq }) => ({
                name: sq.name || "",
                body: sq.body || "",
                marks: sq.marks || 0,
                options:
                  sq.questionType === 7 ? sq.options?.join(", ") || "" : "",
                typeId: sq.questionType,
                optionLength: Array.isArray(sq.options)
                  ? sq.options?.length
                  : 0,
                topic: sq.topic || "",
              }))
            : [],

        marks: Number.parseInt(values.marks, 10) || 0,
        typeId: questionType,
      };

      console.log("Saved Question Data:", questionData);

      if (questionValue === null) {
        console.log("questionValue:", questionValue);
        createGroupQuestion(questionData, {
          onSuccess: (data) => {
            CustomMessage.success("Question Saved Successfully");
            setQuestions([...questions, data]);
            // No form reset here, just save the current question
          },
          onError: (error) => {
            CustomMessage.error("Failed to save Question");
            console.error("Error creating group question:", error);
          },
        });
      } else {
        console.log("questionValue:", questionValue);
        updateGroupQuestion(
          { id: questionValue?.groupQuestion?.id, payload: questionData }, // Pass the correct parameters
          {
            onSuccess: (data) => {
              CustomMessage.success("Question Updated Successfully");
              setQuestions(questions.map((q) => (q.id === data.id ? data : q))); // Update the list
            },
            onError: (error) => {
              CustomMessage.error("Failed to update Question");
              console.error("Error updating group question:", error);
            },
          }
        );
      }
    });
  };

  const handleSaveAndAddNew = () => {
    resetForm();
    setQuestionValue(null);
  };

  const resetForm = () => {
    setQuestionCount(examQuestionList?.data?.examGroupQuestions.length + 1);
    form.resetFields();
    setQuestionName("");
    setQuestionBody("");
    setOptions([""]);
    setSubQuestions([]);
    setQuestionType(null);
  };

  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return {
        upload: async () => {
          const file = await loader.file;
          const url = ""; // Placeholder for upload URL
          return { default: url };
        },
      };
    };
  }

  return (
    <Form form={form} layout="vertical">
      <h3>Question {questionCount}</h3>
      <Form.Item
        label="Question Name"
        name="questionName"
        rules={[{ required: true, message: "Please enter the question name!" }]}
      >
        <CKEditor
          editor={ClassicEditor}
          config={{ extraPlugins: [CustomUploadAdapterPlugin] }}
          data={questionName}
          onChange={(event, editor) => {
            setQuestionName(editor.getData());
          }}
        />
      </Form.Item>

      <div className="row g-2 w-100">
        <div className="col-md-4">
          <Form.Item
            label="Question Type"
            name="questionType"
            rules={[
              { required: true, message: "Please select a question type!" },
            ]}
          >
            <Select
              placeholder="Select question type"
              onChange={(value) => setQuestionType(value)}
            >
              {questionTypes.map((type) => (
                <Select.Option key={type.value} value={type.value}>
                  {type.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="col-md-4">
          <Form.Item
            label="Topic"
            name="topic"
            rules={[{ required: true, message: "Please enter a topic!" }]}
          >
            <Input placeholder="Enter Topic" />
          </Form.Item>
        </div>

        <div className="col-md-4">
          <Form.Item
            label="Marks"
            name="marks"
            rules={[{ required: true, message: "Please enter marks!" }]}
          >
            <Input type="number" placeholder="Enter Marks" min={1} max={20} />
          </Form.Item>
        </div>
      </div>

      {questionType == 15 && (
        <>
          <Divider>Group Questions</Divider>
          <Form.Item
            label="Question Body"
            name="questionBody"
            rules={[
              { required: true, message: "Please enter the question body!" },
            ]}
          >
            <CKEditor
              editor={ClassicEditor}
              config={{ extraPlugins: [CustomUploadAdapterPlugin] }}
              data={questionBody}
              onChange={(event, editor) => {
                setQuestionBody(editor.getData());
              }}
            />
          </Form.Item>
          {subQuestions.map((subQuestion, index) => (
            <div
              key={subQuestion.id}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
              }}
            >
              <Form.Item
                label={`Sub-Question ${index + 1}`}
                rules={[
                  {
                    required: true,
                    message: "Please enter the question!",
                  },
                ]}
              >
                <CKEditor
                  editor={ClassicEditor}
                  config={{ extraPlugins: [CustomUploadAdapterPlugin] }}
                  data={subQuestion.name}
                  onChange={(event, editor) => {
                    handleSubQuestionChange(index, "name", editor.getData());
                  }}
                />
              </Form.Item>
              <div className="row g-2 w-100">
                <div className="col-md-4">
                  <Form.Item label="Question Type">
                    <Select
                      placeholder="Select sub-question type"
                      value={subQuestion.questionType}
                      onChange={(value) =>
                        handleSubQuestionChange(index, "questionType", value)
                      }
                    >
                      {questionTypes
                        .filter((type) => type.label !== "Group Question")
                        .map((type) => (
                          <Select.Option key={type.value} value={type.value}>
                            {type.label}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  <Form.Item label="Topic">
                    <Input
                      placeholder="Enter Topic"
                      value={subQuestion.topic}
                      onChange={(e) =>
                        handleSubQuestionChange(index, "topic", e.target.value)
                      }
                    />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  <Form.Item label="Marks">
                    <Input
                      type="number"
                      placeholder="Enter Marks"
                      min={1}
                      max={20}
                      value={subQuestion.marks}
                      onChange={(e) =>
                        handleSubQuestionChange(index, "marks", e.target.value)
                      }
                    />
                  </Form.Item>
                </div>
              </div>
              {subQuestion.questionType == 7 && (
                <>
                  <Divider>MCQ Options</Divider>
                  {subQuestion.options.map((option, optionIndex) => (
                    <Form.Item
                      key={optionIndex}
                      label={`Option ${optionIndex + 1}`}
                    >
                      <Input
                        value={option}
                        onChange={(e) =>
                          handleSubQuestionOptionChange(
                            index,
                            optionIndex,
                            e.target.value
                          )
                        }
                        placeholder={`Enter Option ${optionIndex + 1}`}
                      />
                    </Form.Item>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => handleAddSubQuestionOption(index)}
                  >
                    Add Option
                  </Button>
                </>
              )}

              {subQuestion.questionType == 8 && (
                <>
                  <Divider>True/False</Divider>
                  <Checkbox disabled>True</Checkbox>
                  <Checkbox disabled style={{ marginLeft: 16 }}>
                    False
                  </Checkbox>
                </>
              )}
            </div>
          ))}
          <Button type="dashed" onClick={handleAddSubQuestion}>
            Add Sub-Question
          </Button>
        </>
      )}

      {questionType == 7 && (
        <>
          <Divider>MCQ Options</Divider>
          {options.map((option, index) => (
            <Form.Item key={index} label={`Option ${index + 1}`}>
              <Input
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Enter Option ${index + 1}`}
              />
            </Form.Item>
          ))}
          <Button type="dashed" onClick={handleAddOption}>
            Add Option
          </Button>
        </>
      )}

      {questionType == 8 && (
        <>
          <Divider>True/False</Divider>
          <Checkbox disabled>True</Checkbox>
          <Checkbox disabled style={{ marginLeft: 16 }}>
            False
          </Checkbox>
        </>
      )}

      <Form.Item style={{ marginTop: 20 }}>
        <Button
          type="primary"
          onClick={handleSave}
          loading={isLoading}
          style={{ marginRight: "10px" }}
        >
          Save
        </Button>
        <Button
          type="primary"
          onClick={handleSaveAndAddNew}
          loading={isLoading}
        >
          Add New Question
        </Button>
      </Form.Item>
    </Form>
  );
}
