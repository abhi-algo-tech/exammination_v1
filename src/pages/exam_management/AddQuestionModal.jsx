import React, { useState } from "react";
import { Button, Row, Col, Form, Input, Select, Divider, Checkbox } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CustomMessage } from "../../utils/CustomMessage";

export default function AddQuestionModal({ closeModal }) {
  const [form] = Form.useForm();
  const [questionType, setQuestionType] = useState(null);
  const [options, setOptions] = useState(["", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [subQuestions, setSubQuestions] = useState([""]);
  //   const { mutate: AddExamQuestion, isLoading } = useAddExamQuestion();

  const handleAddOption = () => setOptions([...options, ""]);
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddSubQuestion = () => setSubQuestions([...subQuestions, ""]);
  const handleSubQuestionChange = (index, value) => {
    const newSubQuestions = [...subQuestions];
    newSubQuestions[index] = value;
    setSubQuestions(newSubQuestions);
  };

  const handleSubmit = (values) => {
    const payload = {
      questionName: values.questionName,
      questionType: values.questionType,
      topic: values.topic,
      marks: values.marks,
      options: questionType === 7 ? options : [],
      correctAnswer: questionType === 7 ? correctAnswer : "",
      subQuestions: questionType === 15 ? subQuestions : [],
    };

    // AddExamQuestion(payload, {
    //   onSuccess: () => {
    //     CustomMessage.success("Question added successfully");
    //     closeModal();
    //   },
    //   onError: () => {
    //     CustomMessage.error("Error adding question");
    //   },
    // });
  };

  return (
    <div className="add-question-modal">
      <div className="modal-content">
        <div className="modal-title">Add a New Question</div>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Question Name"
            name="questionName"
            rules={[
              { required: true, message: "Please enter the question name!" },
            ]}
          >
            <CKEditor
              editor={ClassicEditor}
              data=""
              onChange={(event, editor) =>
                form.setFieldsValue({ questionName: editor.getData() })
              }
            />
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                label="Question Type"
                name="questionType"
                rules={[
                  { required: true, message: "Please select a question type!" },
                ]}
              >
                <Select onChange={(value) => setQuestionType(value)}>
                  <Select.Option value={7}>MCQ</Select.Option>
                  <Select.Option value={8}>True/False</Select.Option>
                  <Select.Option value={15}>Group Question</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Topic"
                name="topic"
                rules={[{ required: true, message: "Please enter a topic!" }]}
              >
                <Input placeholder="Enter Topic" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Marks"
                name="marks"
                rules={[{ required: true, message: "Please enter marks!" }]}
              >
                <Input type="number" min={1} max={20} />
              </Form.Item>
            </Col>
          </Row>

          {questionType === 7 && (
            <>
              <Divider>MCQ Options</Divider>
              {options.map((option, index) => (
                <Form.Item key={index} label={`Option ${index + 1}`}>
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                </Form.Item>
              ))}
              <Button type="dashed" onClick={handleAddOption}>
                Add Option
              </Button>
              <Divider>Correct Answer</Divider>
              <Form.Item
                label="Correct Answer"
                rules={[
                  {
                    required: true,
                    message: "Please enter the correct answer!",
                  },
                ]}
              >
                <Input
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  placeholder="Enter Correct Answer"
                />
              </Form.Item>
            </>
          )}

          {questionType === 8 && (
            <>
              <Divider>True/False</Divider>
              <Checkbox disabled>True</Checkbox>
              <Checkbox disabled style={{ marginLeft: 16 }}>
                False
              </Checkbox>
            </>
          )}

          {questionType === 15 && (
            <>
              <Divider>Group Questions</Divider>
              {subQuestions.map((subQuestion, index) => (
                <Form.Item key={index} label={`Sub-Question ${index + 1}`}>
                  <Input
                    value={subQuestion}
                    onChange={(e) =>
                      handleSubQuestionChange(index, e.target.value)
                    }
                  />
                </Form.Item>
              ))}
              <Button type="dashed" onClick={handleAddSubQuestion}>
                Add Sub-Question
              </Button>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Topic" name="groupTopic">
                    <Input placeholder="Enter Topic" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Marks" name="groupMarks">
                    <Input type="number" min={1} max={20} />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          <div className="modal-actions">
            <Button type="primary" htmlType="submit">
              Add Question
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
