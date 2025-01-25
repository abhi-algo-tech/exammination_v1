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
} from "antd";
import Select from "react-select";
import CustomSelect from "../../exam_components/select/CustomSelect";
import DynamicNumericInput from "../../exam_components/dynamic_numeric_input/DynamicNumericInput";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";
import { Navigate, useNavigate } from "react-router-dom";
import CommonModal from "../../exam_components/model_window/CommonModal";
import PublishView from "./PublishView";

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

function PublishForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [sections, setSections] = useState(0);
  const [isModal, setIsModal] = useState(false);

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

  const showModal = () => {
    setIsModal(true);
  };

  const handleCancel = () => {
    setIsModal(false);
  };

  const handleOk = () => {
    console.log("Confirmed");
    setIsModal(false);
  };

  return (
    <div className="mt-2">
      <h2 className="page-head mb-4">Publish Paper</h2>

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
          <Row gutter={20}>
            {/* Input Field */}
            <Col md={6} lg={8}>
              <Form.Item
                label="Name of the Exam"
                name="examName"
                rules={[
                  { required: true, message: "Please enter the exam title!" },
                ]}
              >
                <Input placeholder="Enter Exam Name" className="input-box" />
              </Form.Item>
            </Col>

            {/* React-Select Field */}
            <Col md={6} lg={8}>
              <Form.Item
                label="Select Exam Type"
                name="examType"
                // rules={[
                //   { required: true, message: "Please select an exam type!" },
                // ]}
              >
                <CustomSelect
                  options={examTypeOptions}
                  placeholder="Select"
                  isSearchable
                />
              </Form.Item>
            </Col>

            <Col md={6} lg={8}>
              <Form.Item
                label="Curriculum"
                name="curriculum"
                // rules={[
                //   { required: true, message: "Please enter the curriculum!" },
                // ]}
              >
                <Input
                  placeholder="Enter the curriculum"
                  className="input-box"
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="d-flex justify-content-center">
            <Row gutter={[16, 24]} className="w-100">
              {/* First Row */}
              <Col md={9} lg={11}>
                <Form.Item
                  label="Select Class"
                  name="class"
                  rules={[
                    { required: true, message: "Please select a class!" },
                  ]}
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

              <Col md={9} lg={11}>
                <Form.Item label="Division" name="division">
                  <Input placeholder="A, D, E" className="input-box" />
                </Form.Item>
              </Col>
            </Row>

            {/* Second Row */}
            <Row gutter={[16, 24]} className="w-100 ">
              <Col md={9} lg={11}>
                <Form.Item
                  label="Subject"
                  name="subject"
                  rules={[
                    { required: true, message: "Please select a subject!" },
                  ]}
                >
                  <CustomSelect
                    options={subjectOptions}
                    placeholder="Select Subject"
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

              <Col md={9} lg={11}>
                <DynamicNumericInput
                  n={4}
                  name="subjectCode"
                  label="Subject Code"
                  form={form}
                />
              </Col>
            </Row>
          </div>
          <div className="d-flex mt-2">
            <div className="hiperLink">
              <span>View More Details</span>
            </div>
            <div className="hiperLink ml10">
              <span>Edit Examination Details</span>
            </div>
          </div>

          {/* Horizontal Line */}
          <div
            style={{
              width: "100%",
              height: "2px",
              background: "#CED4DA",
              margin: "20px 0",
            }}
          ></div>

          <div
            style={{
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Schedule Paper
          </div>
          <div>Enter the time and date for when the paper will go live.</div>
          <div className="d-flex mt20">
            <Row gutter={10}>
              <Col>
                <Form.Item
                  label="Date"
                  name="date"
                  rules={[
                    { required: true, message: "Please select the date!" },
                  ]}
                >
                  <DatePicker
                    placeholder="dd/mm/yy"
                    style={{ width: "100%" }}
                    className="input-box"
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label="Time"
                  name="time"
                  rules={[
                    { required: true, message: "Please select the time!" },
                  ]}
                >
                  <TimePicker
                    placeholder="0 hrs 0 mins"
                    style={{ width: "100%" }}
                    className="input-box"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className="hiperLink mt-2">
            <span>Edit Examination Rules</span>
          </div>
        </Card>
        <div
          className="d-flex "
          style={{
            fontFamily: "Poppins",
            justifyContent: "flex-end",
            fontSize: "14px",
            fontStyle: "italic",
            fontWeight: "300",
            lineHeight: "normal",
          }}
        >
          <div style={{ color: "#07617D", fontWeight: "300" }}>
            Last Edited by <label style={{ fontWeight: "600" }}>{name}</label>
          </div>
          <div
            style={{
              height: "20px",
              width: "2px",
              background: "#6E6E6E",
              margin: "0 10px",
            }}
          ></div>
          <div style={{ color: "#07617D", fontWeight: "300" }}>
            Last Edited at <label style={{ fontWeight: "600" }}>{time}</label>
          </div>
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
                  label="Publish Paper"
                  // htmlType="submit"
                  onClick={showModal}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item>
                <ButtonComponent
                  bgColor="#215988"
                  height="40px"
                  width="288px"
                  label="Download Question Paper"
                />
              </Form.Item>
            </div>
          </div>
          <div>
            <Form.Item>
              <ButtonComponent
                bgColor="rgba(7, 97, 125, 0.2)"
                height="40px"
                width="236px"
                label="Cancel"
                labelColor="#6E6E6E"
                fontWeight="700"
              />
            </Form.Item>
          </div>
        </div>
      </Form>
      {isModal && (
        <CommonModal
          title=" "
          isVisible={isModal}
          onClose={handleCancel}
          onOk={handleOk}
          confirmLabel="Publish Paper"
          cancelLabel="Cancel"
        >
          <PublishView />
        </CommonModal>
      )}
    </div>
  );
}

export default PublishForm;
