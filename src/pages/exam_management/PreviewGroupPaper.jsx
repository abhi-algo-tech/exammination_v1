import { useState, useEffect } from "react";
import { Row, Col, Space } from "antd";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";
import { useExamById } from "../../hooks/useExam";
import { useSelector } from "react-redux";

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

const SubQuestionBox = styled.div`
  background: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 12px 16px;
  margin-bottom: 12px;
`;

const QuestionItem = styled.div`
  background: white;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const QuestionTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
`;

const QuestionContent = styled.div`
  margin-bottom: 16px;
`;

function transformExamGroupQuestions(examGroupQuestions) {
  // if (!Array.isArray(examGroupQuestions)) {
  //   throw new Error("Input must be an array");
  // }

  return examGroupQuestions?.map((item) => {
    const groupQuestion = item.groupQuestion;

    // Process subquestions
    const subQuestions = groupQuestion.subGroupQuestions
      ? groupQuestion.subGroupQuestions.map((subQ) => {
          const baseSubQuestion = {
            id: subQ.id,
            questionName: subQ.name || "",

            marks: subQ.marks || 0,
          };

          // Add Multiple Choice specific properties if applicable
          if (subQ.type === "Multiple Choice" && subQ.options) {
            const options = subQ.options.split(",").map((opt) => opt.trim());
            return {
              ...baseSubQuestion,
              questionType: subQ.type,
              options: options.map((opt) => opt),
              correctAnswer: options[0], // Assuming first option is correct, adjust as needed
            };
          }

          return baseSubQuestion;
        })
      : [];

    return {
      id: item.id || 0,
      questionName: groupQuestion.name || "",
      questionBody: groupQuestion.body || "",
      marks: groupQuestion.marks || 0,
      questionType: groupQuestion.type,
      option: groupQuestion?.options?.split(",") || [],
      isPublished: item.isPublished || false,
      subQuestions: subQuestions,
    };
  });
}

// Helper function to strip HTML tags
function stripHtmlTags(html) {
  if (!html) return "";
  return html.replace(/<\/?[^>]+(>|$)/g, "");
}

// Sample data for questions and sub-questions
// const sampleQuestions = [
//   {
//     id: 1,
//     questionName: "Explain the process of photosynthesis in plants.",
//     marks: 5,
//     questionType: "Long Answer Type",
//     isPublished: true,
//     subQuestions: [],
//   },
//   {
//     id: 2,
//     questionName: "Solve the following mathematical problems:",
//     marks: 10,
//     questionType: "Short Answer Type",
//     isPublished: true,
//     subQuestions: [
//       {
//         id: 2.1,
//         questionName: "If x + y = 10 and xy = 21, find the value of x² + y².",
//         marks: 2,
//       },
//       {
//         id: 2.2,
//         questionName: "Solve the quadratic equation: 2x² - 5x + 3 = 0",
//         marks: 2,
//       },
//       {
//         id: 2.3,
//         questionName: "Find the derivative of f(x) = x³ - 4x² + 7x - 2",
//         marks: 3,
//       },
//       {
//         id: 2.4,
//         questionName: "Evaluate the integral: ∫(2x + 3)dx from 0 to 4",
//         marks: 3,
//       },
//     ],
//   },
//   {
//     id: 3,
//     questionName: "Answer the following questions about World War II:",
//     marks: 8,
//     questionType: "Short Answer Type",
//     isPublished: true,
//     subQuestions: [
//       {
//         id: 3.1,
//         questionName: "When did World War II begin and end?",
//         marks: 2,
//       },
//       {
//         id: 3.2,
//         questionName: "Name the major Allied Powers during World War II.",
//         marks: 2,
//       },
//       {
//         id: 3.3,
//         questionName: "What was the significance of D-Day?",
//         marks: 4,
//       },
//     ],
//   },
//   {
//     id: 4,
//     questionName: "Discuss the impact of climate change on global ecosystems.",
//     marks: 8,
//     questionType: "Long Answer Type",
//     isPublished: true,
//     subQuestions: [],
//   },
//   {
//     id: 5,
//     questionName: "Analyze the following chemical reactions:",
//     marks: 9,
//     questionType: "Multiple Choice",
//     isPublished: true,
//     subQuestions: [
//       {
//         id: 6.1,
//         questionName: "Who is known as the father of computers?",
//         marks: 2,
//         questionType: "Multiple Choice",
//         options: [
//           "A) Charles Babbage",
//           "B) Alan Turing",
//           "C) John von Neumann",
//           "D) Blaise Pascal",
//         ],
//         correctAnswer: "A) Charles Babbage",
//       },
//       {
//         id: 6.2,
//         questionName: "Which planet is known as the Red Planet?",
//         marks: 2,
//         questionType: "Multiple Choice",
//         options: ["A) Earth", "B) Mars", "C) Jupiter", "D) Venus"],
//         correctAnswer: "B) Mars",
//       },
//       {
//         id: 6.3,
//         questionName: "Solve the logical sequence: 2, 6, 12, 20, ?",
//         marks: 2,
//         questionType: "Multiple Choice",
//         options: ["A) 28", "B) 30", "C) 32", "D) 34"],
//         correctAnswer: "B) 30",
//       },
//       {
//         id: 6.4,
//         questionName: "Briefly explain the significance of the Turing Test.",
//         marks: 4,
//         questionType: "Short Answer Type",
//       },
//     ],
//   },
// ];

export default function PreviewGroupPaper() {
  const navigate = useNavigate();
  const exam = useSelector((state) => state.auth.exam);
  const id = exam?.id;
  const [highlightedQuestions, setHighlightedQuestions] = useState(new Set());
  const [questionList, setQuestionList] = useState([]);

  const [expanded, setExpanded] = useState(false);

  const [publishedQuestions, setPublishedQuestions] = useState({});
  const { data: ExamQuestionList, refetch } = useExamById(id);

  console.log("ExamQuestionList:", ExamQuestionList?.data?.examGroupQuestions);

  const sampleQuestions = transformExamGroupQuestions(
    ExamQuestionList?.data?.examGroupQuestions
  );
  console.log("transformedQuestions:", sampleQuestions);

  useEffect(() => {
    setQuestionList(sampleQuestions);
  }, [ExamQuestionList]);

  const handleCheckboxChange = (questionId) => {
    setPublishedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const updateHighlightedQuestions = () => {
    const highlightedIds = new Set();

    questionList?.forEach((question) => {
      if (publishedQuestions[question.id]) {
        highlightedIds.add(question.id);
      }
    });

    setHighlightedQuestions(highlightedIds);
  };

  useEffect(() => {
    // Initialize publishedQuestions state based on isPublished property
    const initialPublishedState = {};
    questionList?.forEach((q) => {
      initialPublishedState[q.id] = q.isPublished;
    });
    setPublishedQuestions(initialPublishedState);

    // Update highlighted questions based on publishedQuestions
    updateHighlightedQuestions();
  }, [questionList]);

  useEffect(() => {
    updateHighlightedQuestions();
  }, [publishedQuestions]);

  const handlePublish = () => {
    navigate("/publish-questions");
  };

  // const totalQuestions = questionList.length;
  // const totalSubQuestions = questionList.reduce(
  //   (total, question) => total + question.subQuestions.length,
  //   0
  // );
  const totalMarks = questionList?.reduce(
    (total, question) => total + question.marks,
    0
  );

  const renderQuestionGrid = () => {
    return (
      <div style={{ marginBottom: "24px" }}>
        <div className="d-flex justify-content-between mb12">
          <div className="label-20-500-b">QUESTIONS</div>
          <div className="label-14-500-g">{totalMarks} marks</div>
        </div>
        <QuestionGrid>
          {questionList?.map((question, i) => {
            const isHighlighted = highlightedQuestions.has(question.id);

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
                {i + 1}
              </QuestionBox>
            );
          })}
        </QuestionGrid>
      </div>
    );
  };

  const renderQuestionList = () => {
    return (
      <div>
        {questionList?.map((question, index) => (
          <QuestionItem key={question.id}>
            <QuestionTitle>
              <div className="d-flex gap-2">
                <div>
                  <input
                    type="checkbox"
                    checked={!!publishedQuestions[question.id]}
                    onChange={() => handleCheckboxChange(question.id)}
                  />
                </div>
                <div>
                  <span>Question {index + 1}</span>
                </div>
              </div>
              <div>
                <span>{question.marks} marks</span>
              </div>
            </QuestionTitle>
            <QuestionContent>
              <div
                className="label-16-500"
                dangerouslySetInnerHTML={{ __html: question.questionName }}
              />
              <div
                className="label-14-400-g"
                dangerouslySetInnerHTML={{ __html: question.questionBody }}
              />
            </QuestionContent>

            {/* Handle Multiple Choice Options */}
            {question.questionType === "Multiple Choice" && (
              <div className="Multiple Choice-options">
                {question?.options?.map((option, optionIndex) => (
                  <div key={optionIndex} className="Multiple Choice-option">
                    <label
                      htmlFor={`option-${question.id}-${optionIndex}`}
                      className="label-14-400"
                    >
                      {/* {String.fromCharCode(97 + optionIndex)}. */}
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {/* Handle Sub-questions */}
            {question.subQuestions.length > 0 && (
              <div>
                {question.subQuestions.map((subQuestion, subIndex) => (
                  <SubQuestionBox key={subQuestion.id}>
                    <div className="d-flex justify-content-between">
                      <span className="d-flex  label-14-500">
                        <div>({String.fromCharCode(97 + subIndex)}) </div>
                        {/* {subQuestion.questionName} */}
                        <div
                          className="label-14-500"
                          dangerouslySetInnerHTML={{
                            __html: subQuestion.questionName,
                          }}
                        />
                      </span>
                      <span className="label-14-400-g">
                        {subQuestion.marks} marks
                      </span>
                    </div>

                    {/* Handle Multiple Choice Options for Sub-questions */}
                    {subQuestion?.questionType === "Multiple Choice" && (
                      <div className="Multiple Choice-options">
                        {subQuestion.options.map((option, subOptionIndex) => (
                          <div
                            key={subOptionIndex}
                            className="Multiple Choice-option "
                          >
                            <label
                              htmlFor={`subOption-${subQuestion.id}-${subOptionIndex}`}
                              className="label-14-300 "
                              style={{ paddingLeft: "10px" }}
                            >
                              {String.fromCharCode(97 + subOptionIndex)}.{" "}
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </SubQuestionBox>
                ))}
              </div>
            )}
          </QuestionItem>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <div className="label-28-600">{ExamQuestionList?.data?.nameOfExam}</div>
        <div className="d-flex justify-content-between">
          <div>
            <div className="label-18-500-b">
              You are currently viewing the paper in Review Mod e
            </div>
            <div className="label-14-600-blue">View Examination Details</div>
          </div>
          <div>
            {!expanded && (
              <div>
                <ButtonComponent
                  bgColor="#F9A828"
                  height="40px"
                  width="222px"
                  label="Publish Paper"
                  onClick={handlePublish}
                />
              </div>
            )}

            {/* Expand/Collapse Button */}
            <div
              className="label-14-600-blue"
              style={{
                cursor: "pointer",
                marginTop: "5px",
              }}
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "Collapse Details ▲" : "Expand Details ▼"}
            </div>
          </div>
        </div>
      </div>
      <Row gutter={[24, 24]}>
        {/* Left Section - Question List */}
        <Col xs={24} md={expanded ? 15 : 24}>
          <div className="paper-container">{renderQuestionList()}</div>
        </Col>

        {/* Right Section - Question Grid and Actions */}
        {expanded && (
          <Col xs={24} md={8}>
            <div
              className="left-container-question-create"
              style={{ padding: "17px 36px" }}
            >
              {renderQuestionGrid()}
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
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
                <div className="d-flex gap-3 mb20">
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
                    <span className="label-16-500-g-u">Go to Edit Mode</span>
                  </div>
                </div>
              </Space>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
}
