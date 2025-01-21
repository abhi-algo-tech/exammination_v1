import React, { useState, useRef } from "react";
import { Form, Input, Row, Col } from "antd";

const DynamicNumericInput = ({ n, name, label, required = false, form }) => {
  const [inputs, setInputs] = useState(Array(n).fill("")); // Initialize an array with `n` empty values
  const inputRefs = useRef([]); // Store refs for each input field

  const handleInputChange = (index, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value.replace(/[^0-9]/g, ""); // Allow only numbers (0-9)
    setInputs(updatedInputs);

    // Automatically move to the next input if a digit is entered
    if (value.length === 1 && index < n - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Update the form value for questionSections
    form.setFieldsValue({ [name]: updatedInputs });
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        // Custom validation rule to check if all sections are filled and numeric
        required && {
          validator(_, value) {
            const isValid = inputs.every((input) => input !== "");
            if (!isValid) {
              return Promise.reject(new Error("Please fill all sections!"));
            }
            return Promise.resolve();
          },
        },
        required && { required: true },
      ].filter(Boolean)} // Filter out undefined rule if required is false
    >
      <Row gutter={8}>
        {inputs.map((value, index) => (
          <Col span={24 / n} key={index}>
            <Input
              ref={(el) => (inputRefs.current[index] = el)} // Assign ref to the current input
              value={value}
              placeholder={`0`}
              maxLength={1} // Restrict to a single digit (0-9)
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !value && index > 0) {
                  // Move to the previous input on Backspace if empty
                  inputRefs.current[index - 1]?.focus();
                }
              }}
              className="input-box"
            />
          </Col>
        ))}
      </Row>
      {/* Hidden input to store the combined value */}
      <input type="hidden" name={name} value={JSON.stringify(inputs)} />
    </Form.Item>
  );
};

export default DynamicNumericInput;
