import { useState, useEffect } from "react";
import { Row, Col, Space, Progress, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextArea from "antd/lib/input/TextArea";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";
import "./StudentPaperSecond.css";
import CommonModal from "../../exam_components/model_window/CommonModal";
import ConfirmSubmit from "../exam_management/ConfirmSubmit";

const questions = [
  {
    id: 1,
    isPublished: false,
    marks: 5,
    questionName:
      "Read the following and answer any four questions from 1.1 to 1.5",
    questionBody:
      "<p>Marble's popularity began in ancient Rome and Greece, where white and off-white marble were used to construct a variety of structures, from hand-held sculptures to massive pillars and buildings.</p>",
    questionType: "Group Question",
    subQuestions: [
      {
        id: 52,
        marks: 1,
        questionName: "<p>The chemical reaction between MnO</p>",
        questionType: "Multiple Choice",
        options: [
          "displacement reaction",
          "combination reaction",
          "redox",
          "decomposition .",
        ],
        correctAnswer: "displacement reaction",
      },
      {
        id: 53,
        marks: 1,
        questionName:
          "<p>A student added 10g of calcium carbonate in a rigid container, secured it tightly and started to heat it. After some time, an increase in pressure was observed, the pressure reading was then noted at intervals of 5 mins and plotted against time, in a graph as shown below. During which time interval did maximum decomposition take place?</p>",
        questionType: "Multiple Choice",
        options: ["15-20 min", "25-30 min", "20-25 min", "10-15 min"],
        correctAnswer: "15-20 min",
      },
      {
        id: 54,
        marks: 1,
        questionName:
          "<p>Gas A, obtained above is a reactant for a very important biochemical process which occurs in the presence of sunlight. Identify the name of the process -</p>",
        questionType: "Multiple Choice",
        options: [
          "Respiration",
          "Photosynthesis",
          "Transpiration",
          "sphotolysis",
        ],
        correctAnswer: "Respiration",
      },
      {
        id: 55,
        marks: 1,
        questionName:
          "<p>Marble statues are corroded or stained when they repeatedly come into contact with polluted rain water. Identify the main reason</p>",
        questionType: "Multiple Choice",
        options: [
          "decomposition of calcium carbonate to calcium oxide",
          "polluted water is basic in nature hence it reacts with calcium carbonate",
          "polluted water is acidic in nature hence it reacts with calciumcarbonate",
          "calcium carbonate dissolves in water to give calcium hydroxide.",
        ],
        correctAnswer: "decomposition of calcium carbonate to calcium oxide",
      },
      {
        id: 56,
        marks: 1,
        questionName:
          "<p>Calcium oxide can be reduced to calcium, by heating with sodium metal. Which compound would act as an oxidizing agent in the above process?</p>",
        questionType: "Multiple Choice",
        options: ["Sodium", "Sodium oxide", "Calcium", "Calcium oxide"],
        correctAnswer: "Sodium",
      },
    ],
  },
  {
    id: 2,
    isPublished: false,
    marks: 1,
    questionName:
      "<p>Which gas is released when hydrochloric acid reacts with calcium carbonate?</p>",
    questionType: "Multiple Choice",
    options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"],
    correctAnswer: "Carbon dioxide",
  },
  {
    id: 3,
    isPublished: false,
    marks: 1,
    questionName: "<p>Which metal is the best conductor of electricity?</p>",
    questionType: "Multiple Choice",
    options: ["Gold", "Silver", "Copper", "Aluminum"],
    correctAnswer: "Silver",
  },
  {
    id: 4,
    isPublished: false,
    marks: 1,
    questionName:
      "<p>Water boils at 100°C under normal atmospheric pressure.</p>",
    questionType: "True or False",
    correctAnswer: "True",
  },
  {
    id: 5,
    isPublished: false,
    marks: 2,
    questionName: "<p>Explain why iron rusts when exposed to moist air.</p>",
    questionType: "Short Answer",
    correctAnswer:
      "Iron reacts with oxygen and moisture in the air to form iron oxide, commonly known as rust.",
  },
];

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

  &.active {
    background-color: #6366f1;
    color: white;
    border-color: #6366f1;
  }

  &.answered {
    background-color: #10b981;
    color: white;
    border-color: #10b981;
  }
`;

const EnhancedStudentPaper = () => {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(8100); // 2:15:00 in seconds

  // Calculate progress
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const progressPercentage = Math.round(
    (answeredQuestions / totalQuestions) * 100
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          // Auto-submit when time is up
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}: ${minutes
      .toString()
      .padStart(2, "0")}: ${secs.toString().padStart(2, "0")}`;
  };

  const onAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    // Here you would typically send the answers to a server
    console.log("Submitting answers:", answers);
    navigate("/submit-confirmation");
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
  };

  const isQuestionAnswered = (questionId) => {
    return answers[questionId] !== undefined;
  };

  const showModal = () => {
    setIsModal(true);
  };

  const handleCancel = () => {
    setIsModal(false);
  };

  const handleOk = () => {
    console.log("Confirmed");
    setIsModal(false);
  };

  const renderQuestionContent = (q) => {
    switch (q.questionType) {
      case "Multiple Choice":
        return (
          <Radio.Group onChange={(e) => onAnswerChange(q.id, e.target.value)}>
            <Space direction="vertical">
              {q.options.map((option, index) => (
                <Radio key={index} value={option}>
                  {option}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        );
      case "True or False":
        return (
          <Radio.Group onChange={(e) => onAnswerChange(q.id, e.target.value)}>
            <Space direction="vertical">
              <Radio value="True">True</Radio>
              <Radio value="False">False</Radio>
            </Space>
          </Radio.Group>
        );
      case "Short Answer":
      case "Long Answer Type":
        return (
          <TextArea
            rows={q.questionType === "Short Answer" ? 4 : 8}
            placeholder="Type your answer here..."
            onChange={(e) => onAnswerChange(q.id, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  const renderQuestion = (question, index = 1, parentIndex = "") => {
    const questionNumber = parentIndex ? `${parentIndex}.${index}` : index;

    if (question.questionType === "Group Question" && question.subQuestions) {
      return (
        <div className="question-group">
          <div
            className="d-flex justify-content-between items-start"
            style={{ fontSize: "16px", fontWeight: "700" }}
          >
            <div className="mb-3">
              {questionNumber}. {question.questionName}
            </div>
            <span className="font-bold text-gray-700">
              {question.marks} {question.marks === 1 ? "mark" : "marks"}
            </span>
          </div>
          <div
            className="question-body mb-4"
            dangerouslySetInnerHTML={{ __html: question.questionBody }}
          />

          <div className="sub-questions">
            {question.subQuestions.map((subQ, subIndex) => (
              <div
                key={subQ.id}
                className="sub-question mb-4 p-3 border rounded relative"
              >
                <div className="d-flex justify-content-between items-start">
                  <div className="d-flex gap4">
                    {questionNumber}.{subIndex + 1}
                    <div
                      dangerouslySetInnerHTML={{ __html: subQ.questionName }}
                    />
                  </div>

                  <span className="font-bold text-gray-700">
                    {subQ.marks} {subQ.marks === 1 ? "mark" : "marks"}
                  </span>
                </div>
                {renderQuestionContent(subQ)}
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="question">
          <div className="flex justify-between items-start">
            <span className="font-bold text-gray-700">
              {question.marks} {question.marks === 1 ? "mark" : "marks"}
            </span>
            <div
              dangerouslySetInnerHTML={{
                __html: `${questionNumber} ${question.questionName}`,
              }}
              className="mb-3"
            />
          </div>
          {renderQuestionContent(question)}
        </div>
      );
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <div className="label-28-600">Math Summative Assessment - I</div>
        <div className="label-14-600-blue">View Examination Details</div>
      </div>
      <div>
        <div className="lable-marks">Total No. of Marks</div>
        <div className="value-marks">80</div>
      </div>

      <Row gutter={[24, 24]}>
        {/* Left Section */}
        <Col xs={24} md={16}>
          <div className="card-student-paper">
            <div className="d-flex gap30">
              <div>
                <div className="rule-lable">Name of the Student</div>
                <div className="rule-value">Abhi Sahani</div>
              </div>

              <div>
                <div className="rule-lable">Student Candidate No </div>
                <div className="rule-value">123-678</div>
              </div>
              <div>
                <div className="rule-lable">Division </div>
                <div className="rule-value">A</div>
              </div>
              <div>
                <div className="rule-lable">Subject </div>
                <div className="rule-value">Math</div>
              </div>
            </div>
          </div>

          {/* Question Display Area */}
          <div className="question-area mt-4 p-4 border rounded">
            {renderQuestion(questions[currentQuestionIndex])}
            <div className="navigation-buttons mt-4 d-flex justify-content-between">
              <button
                className="btn btn-outline-primary"
                onClick={() =>
                  setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
                }
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() =>
                  setCurrentQuestionIndex((prev) =>
                    Math.min(questions.length - 1, prev + 1)
                  )
                }
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        </Col>

        {/* Right Section */}
        <Col xs={24} md={8}>
          <div>
            <div className="lable-marks">Time Left</div>
            <div className="value-marks">{formatTime(timeLeft)}</div>
          </div>
          <div
            className="left-container-question-create mt-4"
            style={{ padding: "37px 36px" }}
          >
            {/* Question Navigation Grid */}
            <div className="mb-4">
              <div className="d-flex justify-content-between mb-3">
                <div className="font-medium">Question Navigation</div>
                <div className="text-sm text-gray-500">
                  {answeredQuestions}/{totalQuestions} answered
                </div>
              </div>
              <Progress percent={progressPercentage} size="small" />
              <QuestionGrid>
                {questions.map((q, index) => (
                  <QuestionBox
                    key={index}
                    className={`
                      ${currentQuestionIndex === index ? "active" : ""}
                      ${isQuestionAnswered(q.id) ? "answered" : ""}
                    `}
                    onClick={() => handleQuestionSelect(index)}
                  >
                    {index + 1}
                  </QuestionBox>
                ))}
              </QuestionGrid>
            </div>

            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div>
                <ButtonComponent
                  bgColor="#F9A828"
                  height="40px"
                  width="100%"
                  label="Submit Paper"
                  onClick={showModal}
                />
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="15"
                    viewBox="0 0 9 15"
                    fill="none"
                  >
                    <path
                      d="M3.01431 12.75H5.27504V15H3.01431V12.75ZM4.52146 0C8.55309 0.165 10.3089 4.215 7.91255 7.2525C7.28708 8.0025 6.27729 8.4975 5.77993 9.1275C5.27504 9.75 5.27504 10.5 5.27504 11.25H3.01431C3.01431 9.9975 3.01431 8.94 3.5192 8.19C4.01656 7.44 5.02635 6.9975 5.65182 6.5025C7.47548 4.8225 7.02333 2.445 4.52146 2.25C3.92188 2.25 3.34685 2.48705 2.92288 2.90901C2.49891 3.33097 2.26073 3.90326 2.26073 4.5H0C0 3.30653 0.476367 2.16193 1.3243 1.31802C2.17224 0.474106 3.32229 0 4.52146 0Z"
                      fill="#215988"
                    />
                  </svg>
                  <span className="label-16-500-g-u">Help</span>
                </div>
              </div>
            </Space>
          </div>
        </Col>
      </Row>
      {isModal && (
        <CommonModal
          title=" "
          isVisible={isModal}
          onClose={handleCancel}
          onOk={handleOk}
          confirmLabel="Submit Paper"
          cancelLabel="Cancel"
        >
          <ConfirmSubmit />
        </CommonModal>
      )}
    </div>
  );
};

export default EnhancedStudentPaper;
