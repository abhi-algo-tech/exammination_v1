import React, { useEffect, useState } from "react";
import { Tabs, Select, Button, Input, Row, Col, Space, Checkbox } from "antd";
import { PlusOutlined, UploadOutlined, BankOutlined } from "@ant-design/icons";
import styled from "styled-components";
import ShortType from "../questionType/ShortType";
import { useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";
import CommonModalComponent from "../../components/CommonModalComponent";
import ReviewModal from "./ReviewModal";
import PaperList from "./PaperList";
import { useSelector } from "react-redux";
import { useExamById } from "../../hooks/useExam";

const { TabPane } = Tabs;

const QuestionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 16px;
`;

const QuestionBox = styled.div`
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  width: 35px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #6366f1;
    color: #6366f1;
  }
`;

// const sections = [
//   { key: 1, name: "SECTION - A", marks: 15, questions: 11 },
//   { key: 2, name: "SECTION - B", marks: 15, questions: 19 },
//   { key: 3, name: "SECTION - C", marks: 15, questions: 9 },
//   { key: 4, name: "SECTION - D", marks: 15, questions: 6 },
// ];

const questionTypes = [
  "Short Answer Type",
  "Long Answer Type",
  "Multiple Choice",
  "True/False",
];

const formatSections = (sections, lists) => {
  return sections.map((section, index) => {
    // Filter all matching lists for this section
    const matchingLists = lists?.filter(
      (list) =>
        list.section === `SECTION - ${section.sectionName.toUpperCase()}`
    );

    // Merge all questions from matching lists
    const allQuestions = matchingLists
      ?.flatMap((list) => list)
      .filter((question) => question.isPublished === true);

    return {
      key: index + 1, // Unique key
      name: `SECTION - ${section.sectionName.toUpperCase()}`, // Formatted section name
      marks: 0, // Default marks
      questions: section.questionCount, // Number of questions
      questionList: allQuestions, // Assign all matching questions
    };
  });
};

const PreviewPaper = () => {
  const navigate = useNavigate();
  const exam = useSelector((state) => state.auth.exam);
  const id = exam?.id;
  const [activeSection, setActiveSection] = useState(1);
  const [questionType, setQuestionType] = useState("Short Answer Type");
  const [marks, setMarks] = useState(0);
  const [questionList, setQuestionList] = useState([]);

  const { data: ExamQuestionList, refetch } = useExamById(id);
  // console.log("ExamQuestionList:", ExamQuestionList);

  const sections = formatSections(
    exam.sections,
    ExamQuestionList?.data?.examQuestions
  );

  console.log("sections:", sections);

  useEffect(() => {
    if (ExamQuestionList?.data?.examQuestions) {
      console.log("first:", ExamQuestionList?.data?.examQuestions);
      const transformedQuestions = ExamQuestionList.data.examQuestions
        .filter((q) => q.isPublished === true) // ✅ Filter only published questions
        .map((q) => ({
          id: q.questionNumber,
          level: q.question.level,
          topic: q.question.topic,
          questionName: q.question.name,
          subject: q.question.subject,
          class: q.question.class,
          curriculum: q.question.curriculum,
          marks: q.question.marks,
          // questionType: q.question.type,
          questionType: "Short Answer Type",
          options: q.question.options ? q.question.options.split(", ") : [],
          author: q.question.author,
          datePublished: q.question.datePublished,
          section: q.section,
        }));
      console.log("transformedQuestions:", transformedQuestions);
      setQuestionList(transformedQuestions);
    }
  }, [ExamQuestionList]);

  const handleAddQuestionThroughBank = () => {
    navigate("/add-question-by-bank");
  };
  const handleUpload = () => {
    navigate("/upload-questions");
  };

  const handlePublish = () => {
    navigate("/publish-questions");
  };

  const handleMarksChange = (e) => {
    const value = e.target.value; // Get the input value as a string

    // Allow empty input (for backspace) and numbers within the range
    if (
      value === "" ||
      (/^\d+$/.test(value) &&
        parseInt(value, 10) >= 0 &&
        parseInt(value, 10) <= 20)
    ) {
      setMarks(value === "" ? "" : parseInt(value, 10)); // Allow empty or valid number
    }
  };

  const handleTabChange = (key) => setActiveSection(Number(key));

  // Map sections to get the questions to be highlighted
  const sectionQuestionMap = sections.reduce((acc, section) => {
    acc[section.name] = new Set(
      section.questionList?.map((q) => q.questionNumber) || []
    );
    return acc;
  }, {});

  const renderQuestionGrid = (section) => {
    const highlightedQuestions = sectionQuestionMap[section.name] || new Set();

    return (
      <div key={section.key} style={{ marginBottom: "24px" }}>
        <div className="d-flex justify-content-between mb12">
          <div className="label-20-500-b">{section.name}</div>
          <div className="label-14-500-g">{section.marks} marks</div>
        </div>
        <QuestionGrid>
          {Array.from({ length: section.questions }, (_, i) => {
            const questionIndex = i + 1;
            const isHighlighted = highlightedQuestions.has(questionIndex);

            return (
              <QuestionBox
                key={i}
                style={{
                  backgroundColor: isHighlighted ? "green" : "white",
                  color: isHighlighted ? "white" : "black",
                  border: isHighlighted
                    ? "2px solid darkgreen"
                    : "1px solid gray",
                }}
              >
                {questionIndex}
              </QuestionBox>
            );
          })}
        </QuestionGrid>
      </div>
    );
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <div className="label-28-600">
          You are currently viewing the paper in Review Mode
        </div>
        <div className="label-14-600-blue">View Examination Details</div>
      </div>
      <Row gutter={[24, 24]}>
        {/* Left Section */}
        <Col xs={24} md={16}>
          <Tabs
            activeKey={String(activeSection)} // Ensure this is a string matching the `key`
            onChange={(key) => setActiveSection(Number(key))}
            items={sections.map((section) => {
              const filteredQuestions = questionList.filter(
                (question) => question.section === section.name
              ); // ✅ Filter questions for the selected section

              return {
                key: String(section.key), // Ensure key is a string
                label: (
                  <span
                    className={
                      activeSection === section.key
                        ? "label-20-600"
                        : "label-20-500"
                    }
                    style={{
                      color:
                        activeSection === section.key ? "#4B4B4B" : "#797979",
                    }}
                  >
                    {section.name}
                  </span>
                ),
                children: <PaperList data={filteredQuestions} />, // ✅ Pass filtered data
              };
            })}
          />
        </Col>

        {/* Right Section */}

        <Col xs={24} md={8}>
          <div
            className="left-container-question-create mt-4"
            style={{ padding: "37px 36px" }}
          >
            {sections.map(renderQuestionGrid)}
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div className="d-flex justify-content-between gap11">
                <div>
                  <ButtonComponent
                    bgColor="#F9A828"
                    height="40px"
                    width="222px"
                    label="Publish Paper"
                    onClick={handlePublish}
                  />
                </div>
              </div>
              <div className="diflex gap-3 mb20">
                <div className="d-flex align-items-center gap-3 mb20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="13"
                    viewBox="0 0 11 13"
                    fill="none"
                  >
                    <path
                      d="M5.52746 2.28225C6.9776 2.28225 8.35868 2.81925 9.39449 3.82613C11.5352 5.907 11.5352 9.33038 9.39449 11.4113C8.15152 12.6866 6.42517 13.1565 4.76787 12.9551L5.11314 11.6126C6.28706 11.7469 7.53003 11.3441 8.42774 10.4715C10.016 8.92763 10.016 6.37688 8.42774 4.76588C7.66814 4.0275 6.56328 3.62475 5.52746 3.62475V6.71251L2.07476 3.35625L5.52746 0V2.28225ZM1.59138 11.4113C-0.204023 9.66601 -0.48024 6.98101 0.762734 4.90013L1.79854 5.907C1.03895 7.38376 1.31517 9.26326 2.62719 10.4715C2.97246 10.8071 3.38679 11.0756 3.87017 11.277L3.45584 12.6195C2.7653 12.351 2.14382 11.9483 1.59138 11.4113Z"
                      fill="#215988"
                    />
                  </svg>
                  <span className="label-16-500-g-u">Restart Paper</span>
                </div>
                <div className="d-flex align-items-center gap-3 mb20">
                  {/* <img
                    src="./icons/png/add-question.png"
                    className="height15 width16"
                  /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="11"
                    viewBox="0 0 12 11"
                    fill="none"
                  >
                    <path
                      d="M11.4316 2.47007C11.2121 2.67782 10.9991 2.87946 10.9926 3.0811C10.9733 3.27663 11.1927 3.47827 11.3993 3.66769C11.7091 3.9732 12.0125 4.24816 11.9996 4.54756C11.9867 4.84697 11.6575 5.15859 11.3283 5.4641L8.66243 7.99375L7.74584 7.12609L10.4892 4.53534L9.8695 3.94876L8.9529 4.8103L6.53233 2.51896L9.011 0.178725C9.26274 -0.0595751 9.6823 -0.0595751 9.92113 0.178725L11.4316 1.60853C11.6833 1.83461 11.6833 2.23177 11.4316 2.47007ZM0 8.70865L6.17086 2.86113L8.59143 5.15248L2.42058 11H0V8.70865Z"
                      fill="#215988"
                    />
                  </svg>
                  <span className="label-16-500-g-u">Go to to Edit Mode</span>
                </div>
              </div>
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PreviewPaper;
