import React, { useState } from "react";
import { Form, Input, Button, Steps, Select, Row, Col } from "antd";
import styled from "styled-components";

const { Step } = Steps;
const { Option } = Select;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const StyledStep = styled.div`
  margin-top: 24px;
`;

const SignUpStepForm = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const UIData = [
    {
      key: 1,
      main: "Welcome!",
      sub: "Your one stop destination to exam management",
    },
    {
      key: 2,
      main: "Create your password",
      sub: "Enter your unique password to secure your account",
    },
    {
      key: 3,
      main: "Select your role",
      sub: "For a personalized experience",
    },
  ];

  const steps = [
    {
      title: <span className="lable-14-400-b">Profile Details</span>,
      content: (
        <Form
          form={form}
          layout="vertical"
          name="step1"
          initialValues={{ remember: true }}
        >
          <Row gutter={16}>
            {" "}
            {/* Add spacing between columns */}
            <Col xs={24} sm={12}>
              {" "}
              {/* First column */}
              <div>
                <span className="lable-18-400-b">
                  First Name <span className="text-danger"> *</span>
                </span>
              </div>
              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your first name!" },
                ]}
              >
                <Input className="auth-input" placeholder="First name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              {" "}
              {/* Second column */}
              <div>
                <span className="lable-18-400-b">
                  Second Name <span className="text-danger"> *</span>
                </span>
              </div>
              <Form.Item
                name="secondName"
                rules={[
                  { required: true, message: "Please enter your second name!" },
                ]}
              >
                <Input className="auth-input" placeholder="Second name" />
              </Form.Item>
            </Col>
          </Row>

          <div>
            <span className="lable-18-400-b">
              Username <span className="text-danger"> *</span>
            </span>
          </div>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input className="auth-input" placeholder="Enter your username" />
          </Form.Item>
          <div>
            <span className="lable-18-400-b">
              Phone Number / Email ID <span className="text-danger"> *</span>
            </span>
          </div>
          <Form.Item
            name="contact"
            rules={[
              {
                required: true,
                message: "Please enter your phone number or email ID!",
              },
            ]}
          >
            <Input
              className="auth-input"
              placeholder="Enter your phone no. / email ID"
            />
          </Form.Item>
          <div>
            <span className="lable-18-400-b">
              Choose Your Institution <span className="text-danger"> *</span>
            </span>
          </div>
          <Form.Item
            name="institution"
            rules={[
              { required: true, message: "Please choose an institution!" },
            ]}
          >
            <Select placeholder="Select your institution">
              <Option value="institution1">Institution 1</Option>
              <Option value="institution2">Institution 2</Option>
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: <span className="lable-14-400-b">Password Creation</span>,
      content: (
        <Form
          form={form}
          layout="vertical"
          name="step2"
          initialValues={{ remember: true }}
        >
          <div>
            <span className="lable-18-400-b">
              Enter Your Password <span className="text-danger"> *</span>
            </span>
          </div>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              className="auth-input"
              placeholder="Enter your password"
            />
          </Form.Item>
          <div>
            <span className="lable-18-400-b">
              Re-enter Your Password <span className="text-danger"> *</span>
            </span>
          </div>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              className="auth-input"
              placeholder="Re-enter your password"
            />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: <span className="lable-14-400-b">Choose your role</span>,
      content: (
        <Form
          form={form}
          layout="vertical"
          name="step3"
          initialValues={{ remember: true }}
        >
          <div>
            <span className="lable-18-400-b">
              Choose Your Role <span className="text-danger"> *</span>
            </span>
          </div>
          <Form.Item
            name="role"
            rules={[{ required: true, message: "Please choose your role!" }]}
          >
            <Select placeholder="Select your role">
              <Option value="student">Student</Option>
              <Option value="teacher">Teacher</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
        </Form>
      ),
    },
  ];

  const renderIcon = (index) => {
    if (index < current) {
      // Completed step
      return (
        <div className="steper-check-box">
          <img
            src="./icons/png/step-checked.png"
            alt={`Step ${index + 1}`}
            width={20}
            height={16}
          />
        </div>
      );
    } else if (index === current) {
      // Active step
      return (
        <div className="steper-check-box">
          <img
            src="./icons/png/step-checked.png"
            alt={`Step ${index + 1}`}
            width={20}
            height={16}
          />
        </div>
      );
    } else {
      // Default unselected step
      return <div className="steper-uncheck-box"></div>;
    }
  };

  const renderTitle = (index) => {
    // Show the title only for the active step
    return index === current ? steps[index].title : null;
  };
  const formLable = (current) => {
    // Find the object in UIData where the key matches the current step
    const activeStep = UIData.find((item) => item.key === current);
    // Return only the `main` title if a match is found
    return activeStep ? activeStep : null;
  };

  console.log("formLable", formLable(current + 1));

  const next = () => {
    form.validateFields().then(() => {
      setCurrent(current + 1);
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleFinish = () => {
    form.validateFields().then((values) => {
      console.log("Form Values:", values);
    });
  };

  return (
    <div className="d-flex flex-column align-items-center auth-form-container">
      <div className="box-orange"></div>
      <div className="mt20 text-center">
        <div className="label-36-600-b">{formLable(current + 1)?.main}</div>
        <div className="label-16-400">{formLable(current + 1)?.sub}</div>
      </div>

      <FormContainer className="mt32">
        <Steps
          className="signup-form"
          current={current}
          labelPlacement="vertical"
        >
          {steps.map((item, index) => (
            <Step
              key={index}
              title={renderTitle(index)}
              icon={renderIcon(index)}
            />
          ))}
        </Steps>
        <StyledStep>{steps[current].content}</StyledStep>
        <div style={{ marginTop: 24 }}>
          {current > 0 && (
            <Button style={{ marginRight: 8 }} onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={handleFinish}>
              Submit
            </Button>
          )}
        </div>
      </FormContainer>
    </div>
  );
};

export default SignUpStepForm;
