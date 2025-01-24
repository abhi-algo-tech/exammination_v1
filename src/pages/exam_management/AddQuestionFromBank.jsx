import React, { useState } from "react";
import CustomSelect from "../../exam_components/select/CustomSelect";
import { Col, Row } from "antd";
import TableCardComponent from "../../exam_components/table/TableCardComponent";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";
import { useNavigate } from "react-router-dom";
import QuestionBankCard from "../../exam_components/card/QuestionBankCard";
import { CustomMessage } from "../../utils/CustomMessage";

const examNameOptions = [
  { value: "1", label: "Summative Assessment - I" },
  { value: "2", label: "Summative Assessment - II" },
  { value: "3", label: "Summative Assessment - III" },
];

const subjectNameOptions = [
  { value: "math", label: "Mathematics" },
  { value: "sci", label: "Science" },
  { value: "eng", label: "English" },
];

const classNameOptions = [
  { value: "1", label: "Class 1" },
  { value: "2", label: "Class 2" },
  { value: "3", label: "Class 3" },
];

const cirriculumNameOptions = [
  { value: "cbse", label: "CBSE" },
  { value: "icse", label: "ICSE" },
  { value: "state", label: "State Board" },
];

const questionTypeOptions = [
  { value: "mcq", label: "Multiple Choice" },
  { value: "short", label: "Short Answer" },
  { value: "long", label: "Long Answer" },
];

const sortByOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "popular", label: "Most Popular" },
  { value: "difficulty", label: "Difficulty Level" },
];

const topicNameOptions = [
  { value: "algebra", label: "Algebra" },
  { value: "geometry", label: "Geometry" },
  { value: "calculus", label: "Calculus" },
];

const subTopicNameOptions = [
  { value: "linear", label: "Linear Equations" },
  { value: "quadratic", label: "Quadratic Equations" },
  { value: "circles", label: "Circles" },
];

const keywordNameOptions = [
  { value: "keyword1", label: "Keyword 1" },
  { value: "keyword2", label: "Keyword 2" },
  { value: "keyword3", label: "Keyword 3" },
];

function AddQuestionFromBank() {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState({});
  const [filters, setFilters] = useState({
    examName: null,
    subjectName: null,
    className: null,
    cirriculumName: null,
    questionType: null,
    sortBy: null,
    topic: null,
    subTopic: null,
    keyword: null,
  });

  const [showMoreFilters, setShowMoreFilters] = useState(false); // State to manage filter visibility
  const [selectedCount, setSelectedCount] = useState(0); // State for selected questions count

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
    console.log("Updated Filters:", { ...filters, [key]: value }); // To check updated filters
  };

  const toggleFilters = () => {
    setShowMoreFilters(!showMoreFilters); // Toggle the visibility
  };

  // Callback for updating the selected question count
  const handleSelectedCountChange = (count) => {
    setSelectedCount(count);
  };
  const handleSetSelectedRow = (data) => {
    setSelectedRow(data);
  };

  const handleSelectedQuestionThroughBank = () => {
    if (selectedCount > 0) {
      navigate("/selected-question-by-bank", {
        state: {
          selectedRow: selectedRow,
          selectedCount: selectedCount,
        },
      });
    } else {
      CustomMessage.error("Please select at least one question to proceed."); // Show warning message
    }
  };

  return (
    <div>
      <div className="mt-2">
        <h2 className="page-head">Explore the Complete Question Bank</h2>
        <div className="d-flex">
          <div
            style={{
              color: "#000",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "normal",
            }}
          >
            {`You are adding questions to`}
          </div>
          <div
            style={{
              paddingLeft: "10px",
              maxWidth: "40%",
              width: "100%",
            }}
          >
            <CustomSelect
              options={examNameOptions}
              placeholder="Select Exam"
              isSearchable
              onChange={(value) => handleFilterChange("examName", value)}
            />
          </div>
        </div>
        <div>
          <Row gutter={[16, 16]} className="mt-4">
            <Col span={4}>
              <CustomSelect
                options={subjectNameOptions}
                placeholder="Subject"
                isSearchable
                onChange={(value) => handleFilterChange("subjectName", value)}
              />
            </Col>
            <Col span={4}>
              <CustomSelect
                options={classNameOptions}
                placeholder="Class"
                isSearchable
                onChange={(value) => handleFilterChange("className", value)}
              />
            </Col>
            <Col span={4}>
              <CustomSelect
                options={cirriculumNameOptions}
                placeholder="Curriculum"
                isSearchable
                onChange={(value) =>
                  handleFilterChange("cirriculumName", value)
                }
              />
            </Col>
            <Col span={4}>
              <CustomSelect
                options={questionTypeOptions}
                placeholder="Question Type"
                isSearchable
                onChange={(value) => handleFilterChange("questionType", value)}
              />
            </Col>
            <Col span={4}>
              <CustomSelect
                options={sortByOptions}
                placeholder="Sort By"
                isSearchable
                onChange={(value) => handleFilterChange("sortBy", value)}
              />
            </Col>
          </Row>
          {showMoreFilters && (
            <Row gutter={[16, 16]} className="mt-4">
              <Col span={6}>
                <CustomSelect
                  options={topicNameOptions}
                  placeholder="Topic"
                  isSearchable
                  onChange={(value) => handleFilterChange("topic", value)}
                />
              </Col>
              <Col span={6}>
                <CustomSelect
                  options={subTopicNameOptions}
                  placeholder="Sub Topic"
                  isSearchable
                  onChange={(value) => handleFilterChange("subTopic", value)}
                />
              </Col>
              <Col span={8}>
                <CustomSelect
                  options={keywordNameOptions}
                  placeholder="Search by keyword/question"
                  isSearchable
                  onChange={(value) => handleFilterChange("keyword", value)}
                />
              </Col>
            </Row>
          )}
          <div className="hiperLink mt-2" onClick={toggleFilters}>
            {showMoreFilters ? "Show Less Filters" : "Show More Filters"}
          </div>
        </div>
        <div>
          <TableCardComponent
            onSelectedCountChange={handleSelectedCountChange}
            onSelectedRows={handleSetSelectedRow}
          />
        </div>
        <div
          style={{
            paddingTop: "20px",
            paddingRight: "100px",
            paddingLeft: "100px",
          }}
        >
          <QuestionBankCard columns={8} />
        </div>
        <div className="d-flex mt20 justify-content-center gap20">
          <div>
            <ButtonComponent
              bgColor="#F9A828"
              height="40px"
              width="236px"
              label={`Add (${selectedCount}) Questions`}
              labelColor="#FFF"
              fontWeight="700"
              onClick={handleSelectedQuestionThroughBank}
            />
          </div>
          <div>
            <ButtonComponent
              bgColor="rgba(7, 97, 125, 0.2)"
              height="40px"
              width="236px"
              label="Cancel"
              labelColor="#6E6E6E"
              fontWeight="700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuestionFromBank;
