import React from "react";
import "./ExamResultsCard.css";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";
import { useExamResultByExamAndStudent } from "../../hooks/useExamResult";
import { useSelector } from "react-redux";

export default function ExamResultsCard({ examId, stuentId }) {
  const firstName = useSelector((state) => state.auth?.profile?.firstName);
  const lastName = useSelector((state) => state.auth?.profile?.lastName);
  const name = `${firstName} ${lastName}`;
  const { data: examResult, isLoading } = useExamResultByExamAndStudent(
    examId,
    stuentId
  );

  console.log("examResult:", examResult);
  const studentData = {
    name: "Virat Kholi",
    type: "Average Student",
    id: "1234-567",
    score: 54,
    maxScore: 80,
    profileImage: "/exam_images/profile.jpg",
  };

  const examData = {
    name: "PRELIMS END EXAMINATION - March/April 2025",
    paperCode: "1657",
    examType: "Final Exam 2024",
    curriculum: "CBSE",
    subject: "Chemistry (1646)",
    date: "12/08/24",
    institution: "NPS, South",
    maxMarks: 80,
  };

  const topicData = {
    strongest: "Organic Chemistry",
    weakest: "The Periodic Tables - d block elements",
  };

  //   const sectionData = [
  //     { name: "SECTION - A", questions: 12, incorrect: 4, correct: 8, marks: 20 },
  //     { name: "SECTION - B", questions: 12, incorrect: 4, correct: 8, marks: 20 },
  //     { name: "SECTION - C", questions: 12, incorrect: 4, correct: 8, marks: 20 },
  //     { name: "SECTION - D", questions: 12, incorrect: 4, correct: 8, marks: 20 },
  //   ];
  const sectionData = [
    {
      id: "A",
      name: "SECTION - A",
      marks: 12,
      questionsAttempted: 12,
      questions: 12,
      incorrect: 4,
      correct: 12,
    },
    {
      id: "B",
      name: "SECTION - B",
      marks: 26,
      questionsAttempted: 12,
      questions: 12,
      incorrect: 4,
      correct: 12,
    },
    {
      id: "C",
      name: "SECTION - C",
      marks: 16,
      questionsAttempted: 12,
      questions: 12,
      incorrect: 4,
      correct: 12,
    },
    {
      id: "D",
      name: "SECTION - D",
      marks: 6,
      questionsAttempted: 12,
      questions: 12,
      incorrect: 4,
      correct: 12,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="header">
        <img
          src="/exam_images/schoollogo.png"
          alt="School Logo"
          className="school-logo"
        />
        <div className="student-info">
          <img
            src={studentData.profileImage}
            alt={name}
            className="profile-pic"
          />
          <div>
            <h2>{name}</h2>
            <div className="student-meta">
              <span className="student-type">
                {examResult?.data?.studentType} student
              </span>
              <span className="dot">•</span>
              <span>Student ID: {examResult?.data?.id}</span>
            </div>
          </div>
          <div className="marks-card">
            <div>Marks Scored</div>
            <div className="score-circle">
              {examResult?.data?.marksObtained}
            </div>
            <div>/{examResult?.data?.marks} marks</div>
          </div>
        </div>
      </div>
      {/* Exam Details */}
      <div className="exam-details-container">
        {/* First Row */}
        <div className="exam-details-row">
          <div className="exam-details-col">
            <p className="label">Name of the Exam</p>
            <p>{examResult?.data?.examName}</p>
          </div>
          <div className="exam-details-col">
            <p className="label">Paper Code</p>
            <p>{examResult?.data?.uniquePaperCode}</p>
          </div>
          <div className="exam-details-col">
            <p className="label">Subject</p>
            <p>{examResult?.data?.subject}</p>
          </div>
          <div className="exam-details-col">
            <p className="label">Exam Date</p>
            <p>{examResult?.data?.dateOfExam}</p>
          </div>
        </div>
        {/* Second Row */}
        <div className="exam-details-row">
          <div className="exam-details-col">
            <p className="label">Type</p>
            <p>{examData.examType}</p>
          </div>
          <div className="exam-details-col">
            <p className="label">Curriculum</p>
            <p>{examResult?.data?.curriculum}</p>
          </div>
          <div className="exam-details-col">
            <p className="label">Institution</p>
            <p>{examResult?.data?.institution}</p>
          </div>
          <div className="exam-details-col">
            <p className="label">Max Marks</p>
            <p>{examResult?.data?.marks}</p>
          </div>
        </div>
      </div>

      <div className="w-full d-flex justify-content-center">
        <div className="view-question-btn">
          <div className="view-question-text">View Question Paper</div>
        </div>
      </div>

      <div className="exam-divider"></div>

      <div className="exam-card">
        {/* Topics */}
        <div className="d-flex gap-4 ">
          <div className="strongest-topic">
            Strongest: {examResult?.data?.strongTopic}
          </div>
          <div className="weakest-topic">
            Weakest: {examResult?.data?.weekTopic}
          </div>
        </div>
        {/* Marks Breakdown */}
        <div className="mt20 ">
          <div class="d-flex gap10 align-items-center">
            <label
              style={{
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {" "}
              Breakdown of Marks
            </label>
            <div>
              {examResult?.data?.marksObtained}/{examResult?.data?.marks}
            </div>
          </div>
          {/* <div className="mt10 d-flex gap10 ">
            {sectionData.map((section, index) => (
              <div
                style={{
                  fontSize: 11,
                }}
                key={index}
              >{`${section.name} (${section.marks} marks)`}</div>
            ))}
          </div> */}

          {/* <div className="marks-breakdown mt20">
            {sectionData.map((section, index) => (
              <div key={index} className="section">
                <p className="section-name">{section.name}</p>
                <div>
                  Q attempted: {section.questionsAttempted}
                  <p
                    style={{
                      fontSize: 10,
                    }}
                  >
                    Total Q: {section.questions}
                  </p>
                </div>

                <p className="incorrect">
                  Incorrect:
                  <p>{section.incorrect}</p>
                </p>
                <p className="correct">
                  Correct:
                  <p>{section.correct}</p>
                </p>
              </div>
            ))}
          </div> */}
          {/* nosection marks */}
          <div className="mt10  gap10 ">
            <div>
              Q attempted:{" "}
              {examResult?.data?.correctAnswer + examResult?.data?.wrongAnswer}
              <p
                style={{
                  fontSize: 10,
                }}
              >
                Total Q: {examResult?.data?.totalQuestion}
              </p>
            </div>

            <p className="incorrect">
              Incorrect: {examResult?.data?.wrongAnswer}
            </p>
            <p className="correct ">
              Correct: {examResult?.data?.correctAnswer}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full d-flex justify-content-center mt20">
        <div className="view-question-btn">
          <div className="view-question-text">View Corrected Paper</div>
        </div>
      </div>

      {/* Actions */}
      <div>
        {/* <button className="submit-btn">Submit Report</button>
        <button className="edit-btn">Edit Report</button> */}
        <div
          className="d-flex mt-2 "
          style={{
            justifyContent: "center",
          }}
        >
          <div style={{ paddingRight: "20px" }}>
            <ButtonComponent
              bgColor="#F9A828"
              height="40px"
              width="150px"
              label="Download Report"
            />
          </div>
          <div>
            <ButtonComponent
              bgColor="#215988"
              height="40px"
              width="150px"
              label="Cancel"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
