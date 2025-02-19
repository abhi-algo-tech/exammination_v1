import React, { useEffect, useState } from "react";
import { Form, Input, Button, Steps, Select, Row, Col } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { login } from "../../../store/authSlice";
import {
  useCheckUserExistOrNot,
  useGetUserRole,
  useUserSignUp,
} from "../../../hooks/useAuth";

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
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [form] = Form.useForm();
  const [username, setUsername] = useState("");
  const [finalFormData, setFinalFormData] = useState({});
  const userSignUpMutation = useUserSignUp();
  const checkUserExistOrNot = useCheckUserExistOrNot();
  const { data: userRole, isLoading, error } = useGetUserRole();

  // console.log("checkUserExistOrNot:", checkUserExistOrNot);

  useEffect(() => {
    if (current === 1) {
      setIsButtonDisabled(true);
    }
  }, [current]);

  useEffect(() => {
    if (username) {
      const delay = setTimeout(() => {
        checkUserExist();
      }, 1000); // 500ms delay

      return () => clearTimeout(delay); // Clear timeout if user types again
    }
  }, [username]);
  const handleFieldsChange = (_, allFields) => {
    // debugger;
    if (current === 0 || current === 1 || current === 2) {
      // Check if all required fields are filled and have no errors
      const allFieldsFilled = allFields.every(
        (field) => field.value !== undefined && field.value !== ""
      );
      const hasErrors = allFields.some((field) => field.errors.length > 0);

      setIsButtonDisabled(!allFieldsFilled || hasErrors);
    }
  };
  // console.log("form", form);
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
          onFieldsChange={handleFieldsChange}
        >
          <Row gutter={16}>
            {/* First Name */}
            <Col xs={24} sm={12}>
              <div>
                <span className="lable-18-400-b">
                  First Name <span className="text-danger"> *</span>
                </span>
              </div>
              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your first name!" },
                  {
                    pattern: /^[A-Za-z]+$/,
                    message: "First name must contain only alphabets.",
                  },
                ]}
              >
                <Input className="auth-input" placeholder="First name" />
              </Form.Item>
            </Col>

            {/* Last Name */}
            <Col xs={24} sm={12}>
              <div>
                <span className="lable-18-400-b">
                  Last Name <span className="text-danger"> *</span>
                </span>
              </div>
              <Form.Item
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your last name!" },
                  {
                    pattern: /^[A-Za-z]+$/,
                    message: "Last name must contain only alphabets.",
                  },
                ]}
              >
                <Input className="auth-input" placeholder="Last name" />
              </Form.Item>
            </Col>
          </Row>

          {/* Username */}
          <div>
            <span className="lable-18-400-b">
              Username <span className="text-danger"> *</span>
            </span>
          </div>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please enter your username!" },
              // Optionally add a pattern if needed for username validation
            ]}
          >
            <Input
              className="auth-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>

          {/* Phone Number */}
          <div>
            <span className="lable-18-400-b">
              Phone Number <span className="text-danger"> *</span>
            </span>
          </div>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number!" },
              {
                pattern: /^\d{10}$/,
                message: "Phone number must be exactly 10 digits.",
              },
            ]}
          >
            <Input className="auth-input" placeholder="Enter your phone no." />
          </Form.Item>

          {/* Email ID */}
          <div>
            <span className="lable-18-400-b">
              Email ID <span className="text-danger"> *</span>
            </span>
          </div>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email ID!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input className="auth-input" placeholder="Enter your email ID" />
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
          onFieldsChange={handleFieldsChange}
        >
          {/* Password */}
          <div>
            <span className="lable-18-400-b">
              Enter Your Password <span className="text-danger"> *</span>
            </span>
          </div>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character.",
              },
            ]}
          >
            <Input.Password
              className="auth-input"
              placeholder="Enter your password"
            />
          </Form.Item>

          {/* Confirm Password */}
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
          onFieldsChange={handleFieldsChange}
        >
          <div>
            <span className="lable-18-400-b">
              Choose Your Role <span className="text-danger"> *</span>
            </span>
          </div>
          <Form.Item
            className="dropdown"
            name="role"
            rules={[{ required: true, message: "Please choose your role!" }]}
          >
            <Select placeholder="Select your role">
              {userRole &&
                userRole.map((role) => (
                  <Option key={role.id} value={role.id}>
                    {role.name.toUpperCase()}
                  </Option>
                ))}
              {!userRole && (
                <Option value="" disabled={true}>
                  Loading ...
                </Option>
              )}
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

  const next = () => {
    form.validateFields().then((values) => {
      setFinalFormData((prevData) => ({
        ...prevData,
        ...values,
      }));
      setCurrent(current + 1);
      setIsButtonDisabled(true);
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const checkUserExist = () => {
    const payload = { name: username };
    checkUserExistOrNot.mutate(payload, {
      onSuccess: (data) => {
        if (data.data) {
          // Set error below the username field
          form.setFields([
            {
              name: "username",
              errors: ["Username already exists!"],
            },
          ]);
          setIsButtonDisabled(true);
        } else {
          // Clear any existing errors
          form.setFields([
            {
              name: "username",
              errors: [],
            },
          ]);
          setIsButtonDisabled(false);
        }
      },
      onError: (error) => {
        // Optionally set a generic error if the API call fails
        form.setFields([
          {
            name: "username",
            errors: [`Failed to check user: ${error.message}`],
          },
        ]);
      },
    });
  };
  const handleFinish = () => {
    form.validateFields().then((values) => {
      const finalData = {
        ...finalFormData,
        ...values,
        role: Number(values.role),
      };
      // console.log("Final Form Data:", finalData);
      const payload = finalData;
      userSignUpMutation.mutate(payload, {
        onSuccess: () => {
          CustomMessage.success("Login successfully!");
          navigate("/dashboard");
        },
        onError: (error) => {
          CustomMessage.error(`Failed to login: ${error.message}`);
        },
      });
      // Submit the finalData to API or state management
    });
  };

  return (
    <div className="d-flex flex-column align-items-center auth-form-container">
      <div className="box-orange"></div>
      <div className="mt20 text-center">
        {/* <img
          src="/icons/png/auth-logo.png"
          alt="Logo"
          style={{ transition: "width 0.3s", width: "300px" }}
        /> */}
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
        <div className="d-flex justify-content-between mt-3">
          <div>
            {current > 0 && (
              <Button
                onClick={() => prev()}
                htmlType="submit"
                block
                className="auth-btn"
                style={{
                  backgroundColor: "#215988",
                  borderColor: "#215988",
                  color: "#fff",
                }}
              >
                Previous
              </Button>
            )}
          </div>

          <div>
            {" "}
            {current < steps.length - 1 && (
              <Button
                onClick={() => next()}
                type="primary"
                htmlType="submit"
                block
                className="auth-btn w-100"
                disabled={isButtonDisabled}
                style={{
                  backgroundColor: isButtonDisabled ? "#BDBDC2" : "#215988",
                  borderColor: isButtonDisabled ? "#BDBDC2" : "#215988",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  if (!isButtonDisabled)
                    e.target.style.backgroundColor = "#215988";
                }}
                onMouseLeave={(e) => {
                  if (!isButtonDisabled)
                    e.target.style.backgroundColor = "#215988";
                }}
              >
                Next
              </Button>
            )}
          </div>
          {current === steps.length - 1 && (
            <Button
              onClick={handleFinish}
              className="auth-btn"
              disabled={isButtonDisabled}
              style={{
                backgroundColor: isButtonDisabled ? "#BDBDC2" : "#215988",
                borderColor: isButtonDisabled ? "#BDBDC2" : "#215988",
                color: "#fff",
              }}
              onMouseEnter={(e) => {
                if (!isButtonDisabled)
                  e.target.style.backgroundColor = "#215988";
              }}
              onMouseLeave={(e) => {
                if (!isButtonDisabled)
                  e.target.style.backgroundColor = "#215988";
              }}
            >
              Submit
            </Button>
          )}
        </div>
        <div className="d-flex justify-content-start mt-3 ">
          <span style={{ color: "#6c757d" }}>All ready have an account?</span>
          <Link to="/Signin">
            <div
              className="ms-2 lable-18-600-U"
              style={{ fontWeight: "bold", textDecoration: "underline" }}
            >
              Sign In
            </div>
          </Link>
        </div>
      </FormContainer>
    </div>
  );
};

export default SignUpStepForm;
