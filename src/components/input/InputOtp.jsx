import React, { useState, useEffect } from "react";
import { InputOTP } from "antd-input-otp";
import styled from "styled-components";
import "./InputOtp.css"; // Assuming your styles are kept here

const Timer = styled.span`
  color: #6b7280;
  font-size: 0.9rem;
`;

export default function InputOtp({
  value = "", // Value from Form.Item (Ant Design Form)
  onChange, // onChange from Form.Item (Ant Design Form)
  phoneNumber = "948 XXX XXXX",
  onVerify = () => {}, // onVerify function to trigger OTP verification
  ref,
  error = false,
  setIsOtpValid,
}) {
  const [timeLeft, setTimeLeft] = useState(30); // Countdown for timer
  const [canResend, setCanResend] = useState(false); // Enables Resend button

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1); // Decrement timer by 1 every second
      }, 1000);
      return () => clearTimeout(timer); // Cleanup on unmount or change
    } else {
      setCanResend(true); // Enable resend when timer reaches 0
    }
  }, [timeLeft]);

  // Resend OTP handler
  const handleResendOTP = () => {
    if (canResend) {
      setIsOtpValid(true);
      onChange();
      setTimeLeft(30); // Reset timer
      setCanResend(false); // Disable resend button until timer reaches 0

      console.log("Resending OTP...");
    }
  };

  // Handle OTP change
  const handleChange = (otp) => {
    if (onChange) {
      onChange(otp); // Pass OTP value to Ant Design Form
    }
    if (otp.length === 6) {
      onVerify(otp); // Trigger verification if OTP length is 6
    }
  };

  // Formatting time to MM:SS format
  const formatTime = (seconds) => `${seconds.toString().padStart(2, "0")}:00`;

  // Inline styles for input error state
  const inputStyle = {
    border: error ? "2px solid red" : "1px solid #d9d9d9",
    color: error ? "red" : "inherit",
  };
  return (
    <>
      <div className="lable-18-400-b mb16">
        Enter the OTP that you have received to {phoneNumber}
      </div>

      {/* OTP input field */}
      <InputOTP
        value={value} // Bind Ant Design Form value
        onChange={handleChange} // Bind Ant Design Form onChange
        length={6} // OTP length must be 6
        autoFocus // Auto-focus on OTP input field
        inputType="number" // Numeric OTP input
        separator={<span className="ant-input-otp-separator">-</span>} // Separator after every 3 digits
        separatorIndex={3} // Where to place the separator
        ref={ref}
        style={inputStyle}
      />

      {/* Timer and Resend button */}
      <div className="d-flex justify-content-between mt-4">
        {error ? (
          <div className="lable-18-600-r">Incorrect OTP {timeLeft}</div>
        ) : (
          <Timer>{formatTime(timeLeft)}</Timer>
        )}

        <div
          className="lable-resend-otp"
          onClick={handleResendOTP}
          disabled={!canResend}
        >
          Re-send OTP
        </div>
      </div>
    </>
  );
}
