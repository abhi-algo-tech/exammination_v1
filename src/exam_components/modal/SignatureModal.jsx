import React, { useState } from "react";
import { Modal, Form, Select, Button, Row, Col, Input } from "antd";
import ButtonComponent from "../button_component/ButtonComponent";
import { useSelector } from "react-redux";
import { useUpdateUserProfile } from "../../hooks/useAuth";
import { CustomMessage } from "../../utils/CustomMessage";
import { InputChipComponent } from "../input_chip_component/InputChipComponent ";

const { Option } = Select;

const SignatureModal = ({ isVisible, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const userProfile = useSelector((state) => state.auth.profile);
  const updateUserProfile = useUpdateUserProfile();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      console.log("values:", values);

      // ✅ Construct payload with user ID
      const payload = {
        userId: userProfile?.id, // Ensure the user ID is included
        firstName: userProfile?.firstName,
        lastName: userProfile?.lastName,
        username: userProfile?.username,
        email: userProfile?.email,
        role: userProfile?.role,
        phone: userProfile?.phone,
        institution: values.institution,
        university: values.university,
        course: values.course,
        subject: values.subject,
        className: values.class,
      };

      // ✅ Call the mutation to update the profile
      updateUserProfile.mutate(payload, {
        onSuccess: () => {
          form.resetFields();
          onClose();
        },
      });
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
        title="Add Institution Details"
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
              <div className="mb-2">
                Institution <span className="text-danger">*</span>
              </div>
              <Form.Item
                name="institution"
                rules={[
                  { required: true, message: "Please enter an institution" },
                ]}
              >
                <Input placeholder="Enter an institution" />
              </Form.Item>
            </Col>

            {/* <Col xs={24} sm={12}>
              <div className="mb-2">
                University <span className="text-danger">*</span>
              </div>
              <Form.Item
                name="university"
                label=""
                rules={[
                  { required: true, message: "Please enter a university" },
                ]}
              >
                <Input placeholder="Enter a university" />
              </Form.Item>
            </Col> */}
            <Col xs={24} sm={12}>
              <div className="mb-2">
                Course <span className="text-danger">*</span>
              </div>
              <Form.Item
                name="course"
                rules={[{ required: true, message: "Please enter a course" }]}
              >
                <Input placeholder="Enter a course" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <div className="mb-2">
                University <span className="text-danger">*</span>
              </div>
              <Form.Item
                name="university"
                rules={[
                  {
                    required: true,
                    message: "Please add at least one university",
                  },
                ]}
              >
                <InputChipComponent form={form} name="university" />
              </Form.Item>
            </Col>

            {/* <Col xs={24} sm={12}>
              <div className="mb-2">
                Subject <span className="text-danger">*</span>
              </div>
              <Form.Item
                name="subject"
                rules={[{ required: true, message: "Please enter a subject" }]}
              >
                <Input placeholder="Enter a subject" />
              </Form.Item>
            </Col> */}
            <Col xs={24} sm={12}>
              <div className="mb-2">
                Subject <span className="text-danger">*</span>
              </div>
              <Form.Item
                name="subject"
                rules={[
                  {
                    required: true,
                    message: "Please add at least one subject",
                  },
                ]}
              >
                <InputChipComponent form={form} name="subject" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* <Col xs={24} sm={12}>
              <div className="mb-2">
                Class <span className="text-danger">*</span>
              </div>
              <Form.Item
                name="class"
                rules={[{ required: true, message: "Please enter a class" }]}
              >
                <Input placeholder="Enter a class" />
              </Form.Item>
            </Col> */}
            <Col xs={24} sm={12}>
              <div className="mb-2">
                Class <span className="text-danger">*</span>
              </div>
              <Form.Item
                name="class"
                rules={[
                  {
                    required: true,
                    message: "Please add at least one class",
                  },
                ]}
              >
                <InputChipComponent form={form} name="class" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default SignatureModal;
