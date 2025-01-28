import React, { useState } from "react";
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
  Checkbox,
} from "antd";
import Select from "react-select";
import CustomSelect from "../../exam_components/select/CustomSelect";
import DynamicNumericInput from "../../exam_components/dynamic_numeric_input/DynamicNumericInput";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";
import { Navigate, useNavigate } from "react-router-dom";
import CommonModal from "../../exam_components/model_window/CommonModal";
import PublishView from "../exam_management/PublishView";
import "./ExamminationRule.css";
import { CustomMessage } from "../../utils/CustomMessage";

const examRules = {
  heading:
    "The CBSE (Central Board of Secondary Education) has a set of rules and guidelines for its examinations.",
  sections: [
    {
      title: "Before the Exam",
      rules: [
        "Carry your admit card to the exam center. It's mandatory for entry.",
        "Bring a valid photo ID (like your school ID) along with your admit card.",
        "Arrive at the exam center at least 30 minutes before the scheduled start time.",
        "Dress modestly and comfortably. Avoid wearing clothes with large buttons or zippers that could make noise.",
        "Bring a blue or black ballpoint pen, a pencil, an eraser, and a sharpener.",
        "You can usually bring a transparent water bottle.",
        "Leave your mobile phone, calculator, smartwatch, and any other electronic devices at home.",
        "Don't bring any textbooks, notes, or other study materials into the exam hall.",
      ],
    },
    {
      title: "During the Exam",
      rules: [
        "Carefully read the instructions on the question paper before starting.",
        "Answer all the questions to the best of your ability.",
        "Maintain a calm and focused mindset throughout the exam.",
        "Refrain from talking to other students during the exam.",
        "Avoid any form of cheating, such as copying from others or using unauthorized materials.",
        "Don't leave the exam hall without permission from the invigilator.",
        "Don't write anything on the question paper that is not part of your answers.",
      ],
    },
    {
      title: "Additional Notes",
      rules: [
        "Adhere to all the rules and regulations to ensure a fair and unbiased examination process.",
        "Show respect to the invigilators and other exam staff.",
        "If you have any questions or need assistance, raise your hand and wait for the invigilator to come to you.",
      ],
    },
  ],
};

// Options for Select and Multi-select
const examTypeOptions = [
  { value: "midterm", label: "Midterm" },
  { value: "final", label: "Final" },
  { value: "quiz", label: "Quiz" },
];

const classTypeOptions = [
  { value: "class 8", label: "Class 8" },
  { value: "class 9", label: "Class 9" },
  { value: "class 10", label: "Class 10" },
];

const subjectOptions = [
  { value: "math", label: "Math" },
  { value: "science", label: "Science" },
  { value: "history", label: "History" },
  { value: "geography", label: "Geography" },
];

const name = "Abhi.s"; // Example variable for name
const time = "12:14 - 11.12.24"; // Example variable for time

function ExamminationRule() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [sections, setSections] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };

  // Handle dynamic section generation
  const handleNumberOfSection = (value) => {
    setSections(value);
  };

  const createQuestion = () => {
    navigate("/add-question");
  };

  const handleRule = () => {
    if (!isAccepted) {
      CustomMessage.error("Please accept the examination rules to continue.");
      return;
    }
    navigate("/student-paper");
  };

  const handleCheckboxChange = (e) => {
    setIsAccepted(e.target.checked);
  };

  return (
    <div className="mt-2">
      <h2 className="page-head mb-4">Examination Details</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="row g-3"
      >
        <Card
          style={{
            background: "#fff",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div>
            <div className="d-flex gap30">
              <div>
                <div className="rule-lable">Name of the Exam </div>
                <div className="rule-value">Summative Assessment - I</div>
              </div>
              <div>
                <div className="rule-lable">Type of Exam </div>
                <div className="rule-value">Final Exam - 2024</div>
              </div>
              <div>
                <div className="rule-lable">Curriculum </div>
                <div className="rule-value">CBSE</div>
              </div>
              <div>
                <div className="rule-lable">Class </div>
                <div className="rule-value">8</div>
              </div>
              <div>
                <div className="rule-lable">Division </div>
                <div className="rule-value">A, C, D</div>
              </div>
              <div>
                <div className="rule-lable">Subject </div>
                <div className="rule-value">Chemistry</div>
              </div>
              <div>
                <div className="rule-lable">Subject-Code </div>
                <div className="rule-value">1846</div>
              </div>
            </div>
            <div className="d-flex gap30 mt-4">
              <div>
                <div className="rule-lable">Duration </div>
                <div className="rule-value">3 hrs</div>
              </div>
              <div>
                <div className="rule-lable">Total No. of Marks </div>
                <div className="rule-value">80</div>
              </div>
              <div>
                <div className="rule-lable">Unique Paper Code </div>
                <div className="rule-value">1846</div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: "2px",
              background: "#CED4DA",
              margin: "20px 0",
            }}
          ></div>
          <h2 className="rule-sub-head mb-4">
            Details to be entered by students
          </h2>
          <Row gutter={20}>
            {/* Input Field */}
            <Col lg={5}>
              <Form.Item
                label="Name of the Student"
                name="Name"
                // rules={[{ required: true, message: "Please enter the title!" }]}
              >
                <Input placeholder="Name" className="input-box" />
              </Form.Item>
            </Col>

            <Col lg={5}>
              <DynamicNumericInput
                n={4}
                name="studentId"
                label="Student ID"
                form={form}
              />
            </Col>

            <Col lg={5}>
              <Form.Item
                label="Select Class"
                name="class"
                // rules={[{ required: true, message: "Please select a class!" }]}
              >
                <CustomSelect
                  options={classTypeOptions}
                  placeholder="Choose Class"
                  isSearchable
                />
              </Form.Item>
            </Col>

            <Col
              md={1}
              className="d-flex align-items-center justify-content-center"
              // style={{ marginBottom: "30px" }}
            >
              <span>-</span>
            </Col>

            <Col lg={5}>
              <Form.Item label="Division" name="division">
                <Input placeholder="A, D, E" className="input-box" />
              </Form.Item>
            </Col>

            <Col lg={5}>
              <Form.Item
                label="Institution"
                name="institution"
                // rules={[
                //   { required: true, message: "Please enter the curriculum!" },
                // ]}
              >
                <Input
                  placeholder="Enter the Institution"
                  className="input-box"
                />
              </Form.Item>
            </Col>

            <Col lg={5}>
              <Form.Item
                label="Date of the Exam"
                name="date"
                rules={[{ required: true, message: "Please select the date!" }]}
              >
                <DatePicker
                  placeholder="dd/mm/yy"
                  style={{ width: "100%" }}
                  className="input-box"
                />
              </Form.Item>
            </Col>
          </Row>
          <h2 className="rule-sub-head mb-4">Exam Rules</h2>
          <div
            style={{
              fontFamily: "Poppins",
              fontSize: "14px",
              color: "#333",
            }}
          >
            {/* Heading */}
            <h2
              style={{
                fontSize: "14px",
                fontWeight: "400",
                marginBottom: "20px",
                color: "#6E6E6E",
              }}
            >
              {examRules.heading}
            </h2>

            {/* Sections */}
            {examRules.sections.map((section, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#6E6E6E",
                  }}
                >
                  {section.title}
                </h3>
                <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
                  {section.rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex} style={{ marginBottom: "10px" }}>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
        <div>
          <Checkbox checked={isAccepted} onChange={handleCheckboxChange} />{" "}
          <label className="checkbox-lable">
            Accept the Examination rules.
          </label>
        </div>
        {/* Submit Button */}
        <div className="d-flex w-100 justify-content-between">
          <div className="d-flex">
            <div style={{ paddingRight: "20px" }}>
              <Form.Item>
                <ButtonComponent
                  bgColor="#F9A828"
                  height="40px"
                  width="236px"
                  label="Continue"
                  // htmlType="submit"
                  onClick={handleRule}
                />
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default ExamminationRule;
