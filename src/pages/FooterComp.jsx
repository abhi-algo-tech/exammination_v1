import React from "react";

function FooterComp() {
  // Data variable storing footer content
  const data = {
    companyName: "Sketchboard",
    privacyPolicy: "/privacy-policy", // You can link this to an actual page
    termsConditions: "/terms-conditions", // You can link this to an actual page
  };

  return (
    <div
      style={{
        // position: "fixed",
        // bottom: 0,
        // left: 0,
        // width: "100%",
        bordertop: "1px solid var(--Gray-400, #CED4DA)",
        backgroundColor: "#215988", // Add background color to make footer visible
        zIndex: 1000, // Ensure the footer stays on top of other content
        padding: "20px 20px",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.1)", // Optional shadow for footer
      }}
    >
      <div
        className="d-flex justify-content-between"
        style={{
          color: "#fff",
        }}
      >
        <div>
          <a href={data.privacyPolicy} style={{ color: "#fff" }}>
            Privacy Policy
          </a>
        </div>
        <div>
          © {new Date().getFullYear()} Powered by {data.companyName}.
        </div>
        <div>
          <a href={data.termsConditions} style={{ color: "#fff" }}>
            Terms & Conditions
          </a>
        </div>
      </div>
    </div>
  );
}

export default FooterComp;
