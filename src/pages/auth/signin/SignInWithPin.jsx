import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Checkbox, Divider } from "antd";
import { useUserLogin } from "../../../hooks/useAuth";
import { CustomMessage } from "../../../utils/CustomMessage";
import { useNavigate } from "react-router-dom";

const SignInWithPin = ({ setSignInWith }) => {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const userLoginMutation = useUserLogin();
  const handleFormChange = (_, allFields) => {
    const username = allFields.username;
    const password = allFields.password;

    const areFieldsFilled = username && password; // Ensure both are non-empty
    setIsButtonDisabled(!areFieldsFilled);
  };
  const onFinish = (values) => {
    // console.log("Form values:", values);
    const payload = values;
    userLoginMutation.mutate(payload, {
      onSuccess: () => {
        CustomMessage.success("Login successfully!");
        navigate("/dashboard");
      },
      onError: (error) => {
        CustomMessage.error(`Failed to login: ${error.message}`);
      },
    });
  };
  return (
    <div className="d-flex flex-column align-items-center auth-form-container">
      <img
        src="/icons/png/auth-logo.png"
        alt="Logo"
        style={{ transition: "width 0.3s", width: "300px" }}
      />
      <div className="mt0">
        <div className="label-36-600-b ">Sign in to your account</div>
        <div className="label-16-400">
          Welcome back! Please enter your details.
        </div>
      </div>

      <Form
        name="signinwithpin"
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={handleFormChange}
        style={{ width: "100%" }}
        className="mt36"
      >
        {/* Username Field */}
        <div>
          <span className="lable-18-400-b">
            Username <span className="text-danger"> *</span>
          </span>
        </div>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            size="large"
            className="auth-input"
            placeholder="Enter your username"
          />
        </Form.Item>

        {/* Password Field */}
        <div>
          <span className="lable-18-400-b">
            Password <span className="text-danger"> *</span>
          </span>
        </div>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            size="large"
            className="auth-input"
            placeholder="Enter your password"
          />
        </Form.Item>

        {/* Remember Me */}
        <Form.Item name="remember" valuePropName="checked" className="mb-3">
          <Checkbox defaultChecked={true}>
            <span className="lable-14-400-b">Keep me signed in</span>
          </Checkbox>
        </Form.Item>

        {/* Links */}
        <div className="d-flex justify-content-between mb-4">
          <div
            onClick={() => setSignInWith("otp")}
            className="lable-18-600-U pointer"
          >
            Sign in with OTP
          </div>
          <a href="#" className="lable-18-600-U">
            Forgot Password
          </a>
        </div>

        {/* Sign In Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="auth-btn"
            disabled={isButtonDisabled}
            style={{
              backgroundColor: isButtonDisabled ? "#BDBDC2" : "#215988",
              borderColor: isButtonDisabled ? "#BDBDC2" : "#215988",
              color: "#fff",
            }}
            onMouseEnter={(e) => {
              if (!isButtonDisabled) e.target.style.backgroundColor = "#215988";
            }}
            onMouseLeave={(e) => {
              if (!isButtonDisabled) e.target.style.backgroundColor = "#215988";
            }}
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>

      <div className="d-flex justify-content-center ">
        <span style={{ color: "#6c757d" }}>Don’t have an account?</span>
        <a
          href="#"
          className="ms-2 lable-18-600-U"
          style={{ fontWeight: "bold", textDecoration: "underline" }}
        >
          Sign Up
        </a>
      </div>
      {/* Divider */}
      <Divider>or sign in with</Divider>

      {/* Social Buttons */}
      <Row gutter={[16, 16]}>
        <Col xs={12}>
          <Button
            icon={
              <img
                src="./icons/png/google.png"
                alt="Google Icon"
                style={{ width: 20, height: 20 }}
              />
            }
            block
            size="large"
            className="auth-optional-signin-btn lable-18-400-b"
          >
            Google
          </Button>
        </Col>
        <Col xs={12}>
          <Button
            icon={
              <img
                src="./icons/png/azure.png"
                alt="Google Icon"
                style={{ width: 20, height: 20 }}
              />
            }
            block
            size="large"
            className="auth-optional-signin-btn lable-18-400-b"
          >
            Office
          </Button>
        </Col>
        <Col xs={12}>
          <Button
            icon={
              <img
                src="./icons/png/iphone.png"
                alt="Google Icon"
                style={{ width: 17, height: 20 }}
              />
            }
            block
            size="large"
            className="auth-optional-signin-btn lable-18-400-b"
          >
            Apple
          </Button>
        </Col>

        <Col xs={12}>
          <Button
            icon={
              <img
                src="./icons/png/facebook.png"
                alt="Google Icon"
                style={{ width: 20, height: 20 }}
              />
            }
            block
            size="large"
            className="auth-optional-signin-btn lable-18-400-b"
          >
            Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SignInWithPin;
