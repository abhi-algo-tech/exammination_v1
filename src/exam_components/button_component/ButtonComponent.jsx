import React from "react";
import { Button } from "antd";

const ButtonComponent = ({
  bgColor = "#4CAF50", // Default background color
  height = "40px", // Default height
  width = "150px", // Default width
  borderRadius = "8px", // Default border-radius
  label = "Button", // Default button label
  fontSize = "14px", // Default font size
  labelColor = "#FFFFFF", // Default label color (white)
  onClick, // Custom onClick handler
  htmlType = "button", // Default to button, can be changed to submit or reset
  fontWeight = "400",
  disabled = false, // Default disabled state
  icon = null,
}) => {
  return (
    <Button
      type="primary"
      className="custom-button"
      style={{
        backgroundColor: disabled ? "#d9d9d9" : bgColor, // Change color if disabled
        height: height,
        width: width,
        borderRadius: borderRadius,
        fontSize: fontSize,
        color: labelColor,
        border: "none",
        fontWeight: fontWeight,
        cursor: "pointer !important", // Adjust cursor when disabled
        icon: { icon },
      }}
      onClick={onClick}
      htmlType={htmlType}
      disabled={disabled} // Disable button if necessary
    >
      {icon && (
        <span style={{ marginRight: "8px", color: "#fffF" }}>{icon}</span>
      )}
      {label}
    </Button>
  );
};

export default ButtonComponent;
