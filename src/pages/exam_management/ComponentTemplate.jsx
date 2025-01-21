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
  TimePicker,
} from "antd";
import Select from "react-select";
import CustomSelect from "../../exam_components/select/CustomSelect";
import DynamicNumericInput from "../../exam_components/dynamic_numeric_input/DynamicNumericInput";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";

function ComponentTemplate() {
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
    <div className="mt-2">
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
              <CustomSelect
                options={examTypeOptions}
                placeholder="Select"
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
              <CustomSelect
                options={subjectOptions}
                isMulti
                placeholder="Select"
                isSearchable
              />
            </Form.Item>
          </Col>

          {/* Input Number Field */}
          <Col md={6}>
            <Form.Item
              label="Total Marks"
              name="totalMarks"
              rules={[
                { required: true, message: "Please enter total marks!" },
                {
                  pattern: /^[0-9]+$/,
                  message: "Please enter only numeric values!",
                },
              ]}
            >
              <Input
                placeholder="Enter total marks"
                maxLength={4} // Optional: To limit input length (e.g., max 1000)
                style={{ width: "100%" }}
                className="input-box"
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
              <DatePicker
                placeholder="dd/mm/yy"
                style={{ width: "100%" }}
                className="input-box"
              />
            </Form.Item>
          </Col>
          <Col md={6}>
            <Form.Item
              label="Duration"
              name="duration"
              rules={[
                { required: true, message: "Please select the Duration!" },
              ]}
            >
              <TimePicker
                placeholder="0 hrs 0 mins"
                style={{ width: "100%" }}
                className="input-box"
              />
            </Form.Item>
          </Col>

          {/* Input Group with 4 Boxes */}
          <Col md={6}>
            <DynamicNumericInput
              n={4}
              name="questionSections"
              label="Enter Question Sections"
              required={true}
              form={form} // Pass form to DynamicNumericInput
            />
          </Col>

          {/* Submit Button */}
          <Col md={12}>
            <Form.Item>
              <ButtonComponent
                bgColor="#07617D"
                height="30px"
                width="140px"
                label="Assign Students"
                htmlType="submit"
              />
              {/* <Button type="primary" htmlType="submit" block>
                Create Question Paper
              </Button> */}
            </Form.Item>
          </Col>
        </Form>
      </Card>
    </div>
  );
}

export default ComponentTemplate;
