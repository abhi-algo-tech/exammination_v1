import { useState, useEffect, useRef } from "react";
import { Form, Input, Row, Col } from "antd";

const DynamicNumericInput = ({
  n = 4,
  name,
  label,
  required = false,
  form,
}) => {
  const inputRefs = useRef([]);

  const [inputs, setInputs] = useState(() => {
    const initialValues = form.getFieldValue(name);
    if (Array.isArray(initialValues) && initialValues.length === n) {
      return initialValues.map(String);
    } else {
      return Array(n).fill("");
    }
  });

  useEffect(() => {
    const initialValues = form.getFieldValue(name);
    if (Array.isArray(initialValues) && initialValues.length === n) {
      setInputs(initialValues.map(String));
    }
  }, [form, name, n]);

  useEffect(() => {
    form.setFieldsValue({ [name]: inputs });
  }, [inputs, form, name]);

  const handleInputChange = (index, value) => {
    value = value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;

    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);

    if (value.length === 1 && index < n - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    form.setFieldsValue({ [name]: updatedInputs });
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          validator(_, value) {
            const isValid = inputs.every((input) => input !== "");
            return isValid
              ? Promise.resolve()
              : Promise.reject(new Error("Please fill all 4 digits!"));
          },
        },
      ]}
    >
      <Row gutter={8} justify="center">
        {inputs.map((value, index) => (
          <Col key={index}>
            <Input
              ref={(el) => (inputRefs.current[index] = el)}
              value={value}
              placeholder="0"
              maxLength={1}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !value && index > 0) {
                  inputRefs.current[index - 1]?.focus();
                }
              }}
              className="input-box"
              style={{
                width: "40px",
                textAlign: "center",
                fontSize: "20px",
                marginRight: "5px",
              }}
            />
          </Col>
        ))}
      </Row>
    </Form.Item>
  );
};

export default DynamicNumericInput;
