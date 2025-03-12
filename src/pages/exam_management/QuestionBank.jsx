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
import CommonModalComponent from "../../components/CommonModalComponent";
import AddQuestionModal from "./AddQuestionModal";

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

function QuestionBank() {
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
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [exam, setExam] = useState({});
  const [examId, setExamId] = useState(null);
  const [sectionId, setSectionId] = useState(null);
  const [section, setSection] = useState(null);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [selectedRowsMap, setSelectedRowsMap] = useState([]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
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
    setExam(value.label);
  };
  const handleFilterSection = (value) => {
    setSectionId(value.value);
    setSection(value.label);
  };
  useEffect(() => {
    if (examValue?.data?.sections) {
      const formattedSections = examValue.data.sections.map((section) => ({
        value: section.id,
        label: `Section - ${section.sectionName}`,
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
    console.log("data:", data);
    setSelectedRow(data);
    // setSelectedRowsMap((prev) => {
    //   const updatedSelection = {
    //     ...prev,
    //     [examId]: {
    //       ...(prev[examId] || {}),
    //       [sectionId]: data,
    //     },
    //   };

    //   console.log("Updated Selection:", updatedSelection);
    //   return updatedSelection;
    // });
    const updatedSelection = {
      examId,
      exam, // Keeping exam label
      sectionId,
      section, // Keeping section label
      data: Array.isArray(data) ? data : [data], // Ensure data is an array
    };

    setSelectedRowsMap((prev) => {
      const existingItem = prev.find(
        (item) => item.examId === examId && item.sectionId === sectionId
      );

      let newList;
      if (existingItem) {
        // Ensure existingItem.data is an array before merging
        const existingData = Array.isArray(existingItem.data)
          ? existingItem.data
          : [];

        // ✅ Merge only if `data` is an array
        const newData = Array.isArray(data) ? data : [data];
        const mergedData = [...existingData, ...newData];

        const updatedItem = {
          ...existingItem,
          data: mergedData,
        };

        newList = prev.map((item) =>
          item.examId === examId && item.sectionId === sectionId
            ? updatedItem
            : item
        );
      } else {
        // ✅ If no existing entry, ensure `data` is an array
        newList = [...prev, updatedSelection];
      }

      return newList;
    });
  };

  const handleAdd = () => {
    setAddModalOpen(true);
  };
  const handleSelectedQuestionThroughBank = () => {
    if (selectedCount > 0) {
      navigate("/selected-question-by-bank", {
        state: {
          selectedRowsMap: selectedRowsMap,
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
  console.log("examValue:", examValue);

  const handlePageChange = (page, newSize) => {
    setCurrentPage(page - 1);
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
              onChange={(value) => handleFilterSection(value)}
            />
          </div>
          <div style={{ marginLeft: "100px" }}>
            <ButtonComponent
              bgColor="#F9A828"
              height="40px"
              width="150px"
              label="Add Question"
              onClick={handleAdd}
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
            sectionId={sectionId}
            examId={examId}
            examValue={examValue}
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
          {/* <QuestionBankCard columns={8} /> */}
        </div>
        <div className="d-flex mt20 justify-content-center gap20">
          <div>
            <ButtonComponent
              bgColor="#F9A828"
              height="40px"
              width="236px"
              label="Save Question"
              onClick={handleSelectedQuestionThroughBank}
            />
          </div>
        </div>
      </div>
      {isAddModalOpen && (
        <CommonModalComponent
          open={isAddModalOpen}
          setOpen={setAddModalOpen}
          modalWidthSize={696}
          modalHeightSize={599}
          isClosable={true}
        >
          <AddQuestionModal closeModal={() => setAddModalOpen(false)} />
          {/* <ReviewModal
            updatedQuestion={updatedQuestion}
            // CardTitle={"Add Student"}
            // classroomId={null}
            closeModal={() => setAddModalOpen(false)}
          /> */}
        </CommonModalComponent>
      )}
    </div>
  );
}

export default QuestionBank;
