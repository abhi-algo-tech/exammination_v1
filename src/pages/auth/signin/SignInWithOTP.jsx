import React, { useRef, useState } from "react";
import { Form, Input, Button } from "antd";
import InputOtp from "../../../components/input/InputOtp";
import { Link } from "react-router-dom";

const SignInWithOTP = ({ setSignInWith }) => {
  const [form] = Form.useForm();
  const otpRef = useRef(null);
  const [otp, setOtp] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [formStep, setFormStep] = useState(1);
  const [isOtpValid, setIsOtpValid] = useState(true);

  const handleFormChange = (_, allFields) => {
    const validateField =
      formStep === 1 ? allFields.phone_or_email : allFields.otp;
    if (formStep === 2) {
      // Check if OTP is exactly 6 digits
      setIsButtonDisabled(
        validateField && validateField.length === 6 ? false : true
      );
    } else {
      setIsButtonDisabled(!validateField);
    }
  };

  const onFinish = (values) => {
    if (formStep === 1) {
      setFormStep(2);
      setIsButtonDisabled(true);
    } else {
      console.log("OTP Verified", values);
    }
  };

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue); // Update OTP state
    form.setFieldsValue({ otp: otpValue }); // Update form field value
  };
  const handleVerify = (otp) => {
    const otpString = otp.join(""); // Join the array elements to form a single string
    console.log("otpString", otpString);

    if (otpString === "123456") {
      // Example OTP validation logic
      setIsOtpValid(true); // If OTP is correct
    } else {
      setIsOtpValid(false); // If OTP is incorrect
    }
    // Add OTP verification logic here
  };
  const renderFormContent = () => {
    if (formStep === 1) {
      return (
        <>
          <div>
            <span className="label-18-400-b">
              Phone no. /Email ID <span className="text-danger">*</span>
            </span>
          </div>
          <Form.Item
            name="phone_or_email"
            rules={[
              {
                required: true,
                message:
                  "* Please ensure that the credentials used are linked to the institution",
              },
            ]}
          >
            <Input
              size="large"
              className="auth-input"
              placeholder="Enter your phone no. or email ID"
            />
          </Form.Item>
        </>
      );
    } else if (formStep === 2) {
      return (
        <Form.Item
          name="otp"
          rules={[
            {
              required: true,
              message: "Please enter the OTP",
            },
          ]}
        >
          <InputOtp
            value={otp}
            onChange={handleOtpChange}
            ref={otpRef}
            onVerify={handleVerify}
            error={!isOtpValid}
            setIsOtpValid={() => setIsOtpValid}
          />
        </Form.Item>
      );
    }
  };

  return (
    <div className="d-flex flex-column align-items-center auth-form-container">
      <img
        src="/icons/png/auth-logo.png"
        alt="Logo"
        style={{ transition: "width 0.3s", width: "300px" }}
      />
      <div className=" text-center">
        <div className="label-36-600-b">
          {formStep === 1 ? "Sign in to your account" : "Enter OTP"}
        </div>
        <div className="label-16-400">
          {formStep === 1
            ? "Please enter your phone no. or email ID."
            : "Please enter the 6 digit OTP you have received"}
        </div>
      </div>

      <Form
        name="signinwithotp"
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={handleFormChange}
        style={{ width: "100%" }}
        className="mt36"
      >
        {renderFormContent()}

        <div className="d-flex justify-content-start mt-4 mb-4">
          <div
            onClick={() => setSignInWith("password")}
            className="lable-18-600-U pointer"
          >
            Sign in with Password
          </div>
        </div>

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
            {formStep === 1
              ? "Generate OTP"
              : !isOtpValid
              ? "Try Again"
              : "Verify OTP"}
          </Button>
        </Form.Item>
      </Form>

      <div className="d-flex justify-content-center">
        <span style={{ color: "#6c757d" }}>Don’t have an account?</span>
        <Link to="/SignUp">
          <div
            className="ms-2 lable-18-600-U"
            style={{ fontWeight: "bold", textDecoration: "underline" }}
          >
            Sign Up
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SignInWithOTP;
