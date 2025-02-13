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

  // Fetch initial values and ensure it's an array of length `n`
  const initialValues = form.getFieldValue(name) || Array(n).fill("");

  const [inputs, setInputs] = useState(() =>
    Array.isArray(initialValues) && initialValues.length === n
      ? initialValues.map(String)
      : Array(n).fill("")
  );

  useEffect(() => {
    const formValues = form.getFieldValue(name);
    if (Array.isArray(formValues) && formValues.length === n) {
      setInputs(formValues.map(String));
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
      initialValue={form.getFieldValue(name)}
      rules={[
        ...(required
          ? [{ required: true, message: `Please enter all ${n} digits!` }]
          : []),
        {
          validator(_, value) {
            if (!required) return Promise.resolve();
            return inputs.every((input) => input !== "")
              ? Promise.resolve()
              : Promise.reject(new Error(`Please fill all ${n} digits!`));
          },
        },
      ]}
    >
      <Row gutter={8}>
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
