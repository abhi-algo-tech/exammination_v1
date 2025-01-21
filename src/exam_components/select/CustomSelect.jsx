import React from "react";
import Select from "react-select";

const CustomSelect = ({
  options,
  isMulti = false,
  placeholder,
  value,
  onChange,
  name,
}) => {
  // Custom styles for react-select
  const customStyles = {
    control: (base) => ({
      ...base,
      border: "1px solid #797979",
      borderRadius: "8px",
      padding: "2px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#5a5a5a", // Darker border on hover
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "8px",
      overflow: "hidden",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#f0f0f0" : "white",
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
    }),
  };

  return (
    <Select
      options={options}
      isMulti={isMulti}
      placeholder={placeholder}
      styles={customStyles}
      value={value}
      onChange={onChange}
      name={name}
      isSearchable
    />
  );
};

export default CustomSelect;
