import React, { useState } from "react";
import { Modal, Form, Select, Button, Row, Col } from "antd";
import ButtonComponent from "../button_component/ButtonComponent";

const { Option } = Select;

const SignatureModal = ({ isVisible, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Validation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isVisible && <div className="modal-blur"></div>} {/* Blur background */}
      <Modal
        title="Select Institution Details"
        open={isVisible}
        onCancel={onClose}
        closable={false}
        footer={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ButtonComponent
              bgColor="#F9A828"
              height="40px"
              width="269px"
              label="Submit"
              loading={loading}
              onClick={handleSubmit}
            />
          </div>
        }
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="institution"
                label="Select Institution"
                rules={[
                  { required: true, message: "Please select an institution" },
                ]}
              >
                <Select placeholder="Select an institution">
                  <Option value="institution1">Institution 1</Option>
                  <Option value="institution2">Institution 2</Option>
                  <Option value="institution3">Institution 3</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="university"
                label="Select University"
                rules={[
                  { required: true, message: "Please select a university" },
                ]}
              >
                <Select placeholder="Select a university">
                  <Option value="university1">University 1</Option>
                  <Option value="university2">University 2</Option>
                  <Option value="university3">University 3</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="course"
                label="Select Course"
                rules={[{ required: true, message: "Please select a course" }]}
              >
                <Select placeholder="Select a course">
                  <Option value="course1">Course 1</Option>
                  <Option value="course2">Course 2</Option>
                  <Option value="course3">Course 3</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="subject"
                label="Select Subject"
                rules={[{ required: true, message: "Please select a subject" }]}
              >
                <Select placeholder="Select a subject">
                  <Option value="subject1">Subject 1</Option>
                  <Option value="subject2">Subject 2</Option>
                  <Option value="subject3">Subject 3</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="class"
                label="Select Class"
                rules={[{ required: true, message: "Please select a class" }]}
              >
                <Select placeholder="Select a class">
                  <Option value="class1">Class 1</Option>
                  <Option value="class2">Class 2</Option>
                  <Option value="class3">Class 3</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default SignatureModal;
