import React from "react";

function Fotter() {
  // Data variable storing footer content
  const data = {
    companyName: "Sketchers Technologies",
    privacyPolicy: "/privacy-policy", // You can link this to an actual page
    termsConditions: "/terms-conditions", // You can link this to an actual page
  };

  return (
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
  );
}

export default Fotter;
