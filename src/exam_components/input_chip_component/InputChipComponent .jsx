import React, { useState } from "react";
import { Input, Tag } from "antd";

export const InputChipComponent = ({ form, name }) => {
  const [chips, setChips] = useState([]);
  const [input, setInput] = useState("");

  const handleAddChip = (event) => {
    if (event.key === "Enter" && input.trim()) {
      // Add the chip only if it's not empty and if Enter is pressed
      setChips((prevChips) => [...prevChips, input.trim()]);
      setInput(""); // Reset the input field
      form.setFieldsValue({
        [name]: [...chips, input.trim()],
      });
    }
  };

  const handleDeleteChip = (chipToDelete) => {
    // Remove the chip from the array when deleted
    const updatedChips = chips.filter((chip) => chip !== chipToDelete);
    setChips(updatedChips);
    form.setFieldsValue({ [name]: updatedChips });
  };

  return (
    <div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleAddChip}
        placeholder={`Enter a ${name}`}
        style={{ marginBottom: 10 }}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {chips.map((chip, index) => (
          <Tag
            key={index}
            closable
            onClose={() => handleDeleteChip(chip)}
            color="gray"
          >
            {chip}
          </Tag>
        ))}
      </div>
    </div>
  );
};
