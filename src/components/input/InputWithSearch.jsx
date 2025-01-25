import React from "react";
import { Select } from "antd";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  width: 100%;

  .ant-select-selector {
    height: 40px !important;
    border-radius: 8px !important;
    border: 1px solid #215988 !important;
    padding: 0 16px !important;

    &:hover {
      border-color: #6366f1 !important;
    }
  }

  .ant-select-selection-placeholder {
    color: #9ca3af;
    font-size: 15px;
    line-height: 40px !important;
  }

  .ant-select-selection-search-input {
    height: 40px !important;
  }

  .ant-select-selection-search {
    inset-inline-start: 16px !important;
    inset-inline-end: 16px !important;
  }

  &.ant-select-focused .ant-select-selector {
    border-color: #6366f1 !important;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1) !important;
  }

  .ant-select-arrow {
    color: #6b7280;
    font-size: 16px;
    right: 16px;
  }
`;

const InputWithSearch = ({
  placeholder = "Search by keyword/question",
  options = [],
  onChange = () => {},
  style = {},
}) => {
  return (
    <div>
      <StyledSelect
        showSearch
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={options}
        style={style}
      />
    </div>
  );
};

export default InputWithSearch;
