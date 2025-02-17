import React, { useEffect, useState } from "react";
import CustomSelect from "../../exam_components/select/CustomSelect";
import { Col, Row } from "antd";
import TableCardComponent from "../../exam_components/table/TableCardComponent";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionBankCard from "../../exam_components/card/QuestionBankCard";
import { CustomMessage } from "../../utils/CustomMessage";
import { useExamAll, useExamById } from "../../hooks/useExam";
import { useQuestions } from "../../hooks/useQuestion";

// Options arrays for select inputs (same as before)
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
  const location = useLocation();
  const examData = location.state || {};
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

  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [examId, setExamId] = useState(null);
  const [exam, setExam] = useState({});
  const [sectionOptions, setSectionOptions] = useState([]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: examTypelist } = useExamAll();
  const { data: examValue } = useExamById(examId);

  const examNameOptions =
    examTypelist?.data?.map((item) => ({
      value: item.id,
      label: item.nameOfExam,
    })) || [];

  const handleChangeExam = (value) => {
    setExamId(value.value);
  };

  useEffect(() => {
    if (examValue?.data?.sections) {
      const formattedSections = examValue.data.sections.map((section) => ({
        value: section.id,
        label: `Section ${section.sectionName}`,
      }));
      setSectionOptions(formattedSections);
    }
  }, [examValue]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const toggleFilters = () => {
    setShowMoreFilters(!showMoreFilters);
  };

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
      CustomMessage.error("Please select at least one question to proceed.");
    }
  };

  // Fetch questions based on filters using useQuestions
  const {
    data: questionsData,
    isLoading,
    error,
  } = useQuestions({
    page: currentPage,
    size: pageSize, // Use pageSize for pagination
    sortBy: filters.sortBy,
    sortDirection: "desc",
    subjectId: filters.subjectName?.value,
    classId: filters.className?.value,
    curriculumId: filters.cirriculumName?.value,
    statusId: filters.questionType?.value,
    search: filters.keyword?.value,
  });

  console.log("questionsData:", questionsData);

  const handlePageChange = (page, newSize) => {
    setCurrentPage(page);
    if (newSize !== pageSize) {
      setPageSize(newSize); // Ensure pageSize updates properly
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
              onChange={(value) => handleChangeExam(value)}
            />
          </div>
          <div
            style={{
              paddingLeft: "20px",
            }}
          >
            <CustomSelect
              options={sectionOptions}
              placeholder="Select Section"
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
            questions={questionsData?.data || []}
            onSelectedCountChange={handleSelectedCountChange}
            onSelectedRows={handleSetSelectedRow}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
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
              label="Add Question"
              onClick={handleSelectedQuestionThroughBank}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddQuestionFromBank;
