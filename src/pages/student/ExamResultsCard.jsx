import React from "react";
import "./ExamResultsCard.css";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";

export default function ExamResultsCard() {
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
            alt={studentData.name}
            className="profile-pic"
          />
          <div>
            <h2>{studentData.name}</h2>
            <div className="student-meta">
              <span className="student-type">{studentData.type}</span>
              <span className="dot">•</span>
              <span>Student ID: {studentData.id}</span>
            </div>
          </div>
          <div className="marks-card">
            <div>Marks Scored</div>
            <div className="score-circle">{studentData.score}</div>
            <div>/{examData.maxMarks} marks</div>
          </div>
        </div>
      </div>
      {/* Exam Details */}
      <div className="exam-details-container">
        {/* First Row */}
        <div className="exam-details-row">
          <div className="exam-details-col">
            <p className="label">Name of the Exam</p>
            <p>{examData.name}</p>
          </div>
          <div className="exam-details-col">
            <p className="label">Paper Code</p>
            <p>{examData.paperCode}</p>
          </div>
          <div className="exam-details-col">
            <p className="label">Subject</p>
            <p>{examData.subject}</p>
          </div>
          <div className="exam-details-col">
            <p className="label">Exam Date</p>
            <p>{examData.date}</p>
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
            <p>{examData.curriculum}</p>
          </div>
          <div className="exam-details-col">
            <p className="label">Institution</p>
            <p>{examData.institution}</p>
          </div>
          <div className="exam-details-col">
            <p className="label">Max Marks</p>
            <p>{examData.maxMarks}</p>
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
            Strongest: {topicData.strongest}
          </div>
          <div className="weakest-topic">Weakest: {topicData.weakest}</div>
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
              {studentData.score}/{studentData.maxScore}
            </div>
          </div>
          <div className="mt10 d-flex gap10 ">
            {sectionData.map((section, index) => (
              <div
                style={{
                  fontSize: 11,
                }}
                key={index}
              >{`${section.name} (${section.marks} marks)`}</div>
            ))}
          </div>

          <div className="marks-breakdown mt20">
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
          </div>
          {/* nosection marks */}
          {/* <div className="mt10 d-flex gap10 ">
            
            </div> */}
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
