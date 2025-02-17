"use client";

import React from "react";
import html2pdf from "html2pdf.js";
import styled from "styled-components";

const QuestionWrapper = styled.div`
  /* Force question to stay together */
  page-break-inside: avoid !important;
  break-inside: avoid !important;
  display: table; /* This helps maintain content integrity */
  width: 100%;
  margin-bottom: 1.5rem;
`;

const OptionsGroup = styled.div`
  /* Keep options together */
  page-break-inside: avoid !important;
  break-inside: avoid !important;
  display: table; /* This helps maintain content integrity */
  width: 100%;
`;

const ExamContainer = styled.div`
  /* Container styles */
  .exam-header {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }

  /* Force section headers to stay with content */
  .section-header {
    page-break-after: avoid !important;
    break-after: avoid !important;
  }

  /* Add more space between questions to encourage natural breaks */
  .question-item {
    margin-bottom: 2rem;
  }
`;

const ExamTemplate = ({ paperData, groupedQuestions, questionTypes }) => {
  const handleDownloadPdf = () => {
    const element = document.getElementById("exam-template");
    const opt = {
      margin: [0.75, 0.75, 0.75, 0.75], // Increased margins for better breaks
      filename: "exam-paper.pdf",
      image: { type: "png", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollY: -window.scrollY, // Fix positioning issues
        windowWidth: document.documentElement.offsetWidth,
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
        compress: true,
        hotfixes: ["px_scaling"], // Fix scaling issues
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
        before: ".page-break-before",
        after: ".page-break-after",
        avoid: [
          "QuestionWrapper",
          "OptionsGroup",
          ".question-item",
          ".radio-group",
        ],
      },
    };

    // Create worker for better performance
    const worker = html2pdf().from(element).set(opt);

    // Add custom processing
    worker
      .save()
      .then(() => {
        console.log("PDF generated successfully");
      })
      .catch((err) => {
        console.error("PDF generation failed:", err);
      });
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-primary mb-3" onClick={handleDownloadPdf}>
        Download PDF
      </button>

      <ExamContainer id="exam-template" className="border border-dark">
        {/* Header Section */}
        <div className="exam-header text-center p-2">
          <h4 className="mb-1">{paperData?.data?.institution}</h4>
          <div className="mb-1">{paperData?.data?.nameOfExam}</div>
          <div className="bg-warning d-inline-block px-2">
            Class & Semester : {paperData?.data?.className}
          </div>
          <div className="mt-1">Subject: {paperData?.data?.subject}</div>
          <div className="d-flex justify-content-between px-4 mt-2">
            <div>Date: {paperData?.data?.dateOfExam}</div>
            <div>Time: {paperData?.data?.duration}</div>
            <div>Marks: {paperData?.data?.marks}</div>
          </div>
        </div>

        {Object.entries(groupedQuestions).map(([typeId, questions]) => (
          <div key={typeId} className="p-3 border-top border-dark">
            <div className="section-header mb-2 d-flex justify-content-between">
              <div className="fw-bold">
                Q.{typeId}) {questionTypes[typeId]}:
              </div>
              <div className="text-end">
                <i>
                  <b>8 Marks</b>
                </i>
              </div>
            </div>

            <div className="ps-4">
              {questions.map((q, index) => (
                <QuestionWrapper key={q.id} className="question-item">
                  <div className="question-text mb-2">
                    {q.questionNumber}. {q.question.name}
                  </div>

                  {q.question.typeId === 3 && q.question.options && (
                    <OptionsGroup className="radio-group ms-3">
                      {q.question.options
                        .split(", ")
                        .map((option, optIndex) => (
                          <div key={optIndex} className="form-check mb-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`question${q.questionNumber}`}
                              id={`q${q.questionNumber}${optIndex}`}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`q${q.questionNumber}${optIndex}`}
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                    </OptionsGroup>
                  )}

                  {q.question.typeId === 4 && (
                    <OptionsGroup className="true-false-group ms-3">
                      <div className="d-flex gap-4">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`tf${q.questionNumber}`}
                            id={`tf${q.questionNumber}true`}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`tf${q.questionNumber}true`}
                          >
                            True
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`tf${q.questionNumber}`}
                            id={`tf${q.questionNumber}false`}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`tf${q.questionNumber}false`}
                          >
                            False
                          </label>
                        </div>
                      </div>
                    </OptionsGroup>
                  )}
                </QuestionWrapper>
              ))}
            </div>
          </div>
        ))}
      </ExamContainer>
    </div>
  );
};

export default ExamTemplate;
