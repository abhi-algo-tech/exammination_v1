import React, { useState } from "react";
import { Row, Col } from "antd";
import SignInWithPin from "./SignInWithPin";
import SignInWithOTP from "./SignInWithOTP";

const SignIn = () => {
  const [signInWith, setSignInWith] = useState("password");

  return (
    <div
      className=" d-flex align-items-center justify-content-center"
      style={{ background: "#F6F7FA" }}
    >
      <div
        className="shadow-lg p-4 bg-white rounded"
        style={{ maxWidth: "1440px", width: "100%" }}
      >
        <Row gutter={24}>
          {/* Image Section */}
          <Col
            md={12}
            xs={24}
            className="d-flex justify-content-center align-items-start"
          >
            <img
              src="./exam_images/auth-main.png"
              alt="Sign In Illustration"
              style={{
                width: "100%",
                maxWidth: "720px",
                boxShadow: "0px 4px 12px 4px rgba(0, 0, 0, 0.10)",
                borderRadius: "8px",
              }}
            />
          </Col>

          {/* Form Section */}
          <Col md={12} xs={24}>
            {signInWith === "password" ? (
              <SignInWithPin setSignInWith={setSignInWith} />
            ) : (
              <SignInWithOTP setSignInWith={setSignInWith} />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignIn;
