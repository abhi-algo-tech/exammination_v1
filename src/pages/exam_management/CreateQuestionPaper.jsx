import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  DatePicker,
  Card,
} from "antd";
import Select from "react-select";

function CreateQuestionPaper() {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };

  // Options for Select and Multi-select
  const examTypeOptions = [
    { value: "midterm", label: "Midterm" },
    { value: "final", label: "Final" },
    { value: "quiz", label: "Quiz" },
  ];

  const subjectOptions = [
    { value: "math", label: "Math" },
    { value: "science", label: "Science" },
    { value: "history", label: "History" },
    { value: "geography", label: "Geography" },
  ];

  return (
    <div className="container mt-2">
      <h2 className="page-head mb-4">Enter the Exam Details</h2>
      <Card
        style={{
          background: "#fff",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="row g-3"
        >
          {/* Input Field */}
          <Col md={6}>
            <Form.Item
              label="Exam Title"
              name="examTitle"
              rules={[
                { required: true, message: "Please enter the exam title!" },
              ]}
            >
              <Input placeholder="Enter exam title" className="input-box" />
            </Form.Item>
          </Col>

          {/* React-Select Field */}
          <Col md={6}>
            <Form.Item
              label="Select Exam Type"
              name="examType"
              rules={[
                { required: true, message: "Please select an exam type!" },
              ]}
            >
              <Select
                options={examTypeOptions}
                placeholder="Select an option"
                className="select"
                isSearchable
              />
            </Form.Item>
          </Col>

          {/* Multi-select Field with React-Select */}
          <Col md={6}>
            <Form.Item
              label="Select Subjects"
              name="subjects"
              rules={[{ required: true, message: "Please select subjects!" }]}
            >
              <Select
                options={subjectOptions}
                isMulti
                placeholder="Select subjects"
                isSearchable
              />
            </Form.Item>
          </Col>

          {/* Input Number Field */}
          <Col md={6}>
            <Form.Item
              label="Total Marks"
              name="totalMarks"
              rules={[{ required: true, message: "Please enter total marks!" }]}
            >
              <InputNumber
                placeholder="Enter total marks"
                min={1}
                max={1000}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          {/* Date Picker Field */}
          <Col md={6}>
            <Form.Item
              label="Exam Date"
              name="examDate"
              rules={[
                { required: true, message: "Please select the exam date!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {/* Input Group with 4 Boxes */}
          <Col md={12}>
            <Form.Item
              label="Enter Question Sections"
              name="questionSections"
              rules={[{ required: true, message: "Please fill all sections!" }]}
            >
              <Input.Group compact>
                <Row gutter={8}>
                  <Col span={6}>
                    <InputNumber
                      placeholder="Section 1"
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col span={6}>
                    <InputNumber
                      placeholder="Section 2"
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col span={6}>
                    <InputNumber
                      placeholder="Section 3"
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col span={6}>
                    <InputNumber
                      placeholder="Section 4"
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>
              </Input.Group>
            </Form.Item>
          </Col>

          {/* Submit Button */}
          <Col md={12}>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Question Paper
              </Button>
            </Form.Item>
          </Col>
        </Form>
      </Card>
    </div>
  );
}

export default CreateQuestionPaper;
