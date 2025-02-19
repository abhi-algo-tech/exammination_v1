// "use client";

// import React from "react";
// import html2pdf from "html2pdf.js";
// import styled from "styled-components";

// const QuestionWrapper = styled.div`
//   /* Force question to stay together */
//   page-break-inside: avoid !important;
//   break-inside: avoid !important;
//   display: table; /* This helps maintain content integrity */
//   width: 100%;
//   margin-bottom: 1.5rem;
// `;

// const OptionsGroup = styled.div`
//   /* Keep options together */
//   page-break-inside: avoid !important;
//   break-inside: avoid !important;
//   display: table; /* This helps maintain content integrity */
//   width: 100%;
// `;

// const ExamContainer = styled.div`
//   /* Container styles */
//   .exam-header {
//     page-break-inside: avoid !important;
//     break-inside: avoid !important;
//   }

//   /* Force section headers to stay with content */
//   .section-header {
//     page-break-after: avoid !important;
//     break-after: avoid !important;
//   }

//   /* Add more space between questions to encourage natural breaks */
//   .question-item {
//     margin-bottom: 2rem;
//   }
// `;

// const ExamTemplate = ({ paperData, groupedQuestions, questionTypes }) => {
//   // console.log("paperData:", paperData);
//   console.log("groupedQuestions:", groupedQuestions);
//   // console.log("questionTypes:", questionTypes);
//   const handleDownloadPdf = () => {
//     const element = document.getElementById("exam-template");
//     const opt = {
//       margin: [0.75, 0.75, 0.75, 0.75], // Increased margins for better breaks
//       filename: "exam-paper.pdf",
//       image: { type: "png", quality: 1 },
//       html2canvas: {
//         scale: 2,
//         useCORS: true,
//         letterRendering: true,
//         scrollY: -window.scrollY, // Fix positioning issues
//         windowWidth: document.documentElement.offsetWidth,
//       },
//       jsPDF: {
//         unit: "in",
//         format: "letter",
//         orientation: "portrait",
//         compress: true,
//         hotfixes: ["px_scaling"], // Fix scaling issues
//       },
//       pagebreak: {
//         mode: ["avoid-all", "css", "legacy"],
//         before: ".page-break-before",
//         after: ".page-break-after",
//         avoid: [
//           "QuestionWrapper",
//           "OptionsGroup",
//           ".question-item",
//           ".radio-group",
//         ],
//       },
//     };

//     // Create worker for better performance
//     const worker = html2pdf().from(element).set(opt);

//     // Add custom processing
//     worker
//       .save()
//       .then(() => {
//         console.log("PDF generated successfully");
//       })
//       .catch((err) => {
//         console.error("PDF generation failed:", err);
//       });
//   };

//   return (
//     <div className="container mt-4">
//       <button className="btn btn-primary mb-3" onClick={handleDownloadPdf}>
//         Download PDF
//       </button>

//       <ExamContainer id="exam-template" className="border border-dark">
//         {/* Header Section */}
//         <div className="exam-header text-center p-2">
//           <h4 className="mb-1">{paperData?.data?.institution}</h4>
//           <div className="mb-1">{paperData?.data?.nameOfExam}</div>
//           <div className="bg-warning d-inline-block px-2">
//             Class & Semester : {paperData?.data?.className}
//           </div>
//           <div className="mt-1">Subject: {paperData?.data?.subject}</div>
//           <div className="d-flex justify-content-between px-4 mt-2">
//             <div>Date: {paperData?.data?.dateOfExam}</div>
//             <div>Time: {paperData?.data?.duration}</div>
//             <div>Marks: {paperData?.data?.marks}</div>
//           </div>
//         </div>

//         {Object.entries(groupedQuestions).map(([typeId, group], index) => (
//           <div key={typeId} className="p-3 border-top border-dark">
//             <div className="section-header mb-2 d-flex justify-content-between">
//               <div className="fw-bold">
//                 Q.{index + 1}) {questionTypes[typeId]}:
//               </div>
//               <div className="text-end">
//                 <i>
//                   <b>{group.totalMarks} Marks</b>
//                 </i>
//               </div>
//             </div>

//             <div className="ps-4">
//               {group.questions.map((q, qIndex) => (
//                 <QuestionWrapper key={q.id} className="question-item">
//                   <div className="question-text mb-2">
//                     {q.questionNumber}. {q.question.name}
//                   </div>

//                   {q.question.typeId === 7 && q.question.options && (
//                     <OptionsGroup className="radio-group ms-3">
//                       {q.question.options
//                         .split(", ")
//                         .map((option, optIndex) => (
//                           <div key={optIndex} className="form-check mb-2">
//                             <input
//                               className="form-check-input"
//                               type="radio"
//                               name={`question${q.questionNumber}`}
//                               id={`q${q.questionNumber}${optIndex}`}
//                             />
//                             <label
//                               className="form-check-label"
//                               htmlFor={`q${q.questionNumber}${optIndex}`}
//                             >
//                               {option}
//                             </label>
//                           </div>
//                         ))}
//                     </OptionsGroup>
//                   )}

//                   {q.question.typeId === 8 && (
//                     <OptionsGroup className="true-false-group ms-3">
//                       <div className="d-flex gap-4">
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="radio"
//                             name={`tf${q.questionNumber}`}
//                             id={`tf${q.questionNumber}true`}
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor={`tf${q.questionNumber}true`}
//                           >
//                             True
//                           </label>
//                         </div>
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="radio"
//                             name={`tf${q.questionNumber}`}
//                             id={`tf${q.questionNumber}false`}
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor={`tf${q.questionNumber}false`}
//                           >
//                             False
//                           </label>
//                         </div>
//                       </div>
//                     </OptionsGroup>
//                   )}
//                 </QuestionWrapper>
//               ))}
//             </div>
//           </div>
//         ))}
//       </ExamContainer>
//     </div>
//   );
// };

// export default ExamTemplate;

// import React from "react";
// import html2pdf from "html2pdf.js";
// import styled from "styled-components";

// const ExamContainer = styled.div`
//   width: 100%;
//   padding: 1rem;
//   background: white;

//   .exam-header,
//   .section-header {
//     page-break-inside: avoid;
//     break-inside: avoid;
//   }

//   .question-item {
//     page-break-inside: avoid;
//     break-inside: avoid;
//     display: table;
//     width: 100%;
//     margin-bottom: 2rem;
//   }

//   @page {
//     size: A4;
//     margin: 20mm 15mm 25mm 15mm; /* Adjust for footer space */
//   }

// `;

// const ExamTemplate = ({ paperData, groupedQuestions, questionTypes }) => {
//   const handleDownloadPdf = () => {
//     const element = document.getElementById("exam-template");
//     const opt = {
//       margin: [0.75, 0.75, 0.75, 0.75],
//       filename: "exam-paper.pdf",
//       image: { type: "png", quality: 1 },
//       html2canvas: {
//         scale: 2,
//         useCORS: true,
//         letterRendering: true,
//         scrollY: -window.scrollY,
//         windowWidth: document.documentElement.offsetWidth,
//       },
//       jsPDF: {
//         unit: "in",
//         format: "a4",
//         orientation: "portrait",
//         compress: true,
//         hotfixes: ["px_scaling"],
//         footer: function (currentPage, totalPages, doc) {
//           // Set the font and size for the footer
//           doc.setFont("helvetica", "normal");
//           doc.setFontSize(10);
//           // Add the page number at the bottom of the page
//           doc.text(`Page ${currentPage} of ${totalPages}`, 3.5, 10.75); // Adjusted position for bottom center
//         },
//       },
//       pagebreak: {
//         mode: ["avoid-all", "css", "legacy"],
//         before: ".page-break-before",
//         after: ".page-break-after",
//         avoid: [".question-item", ".radio-group"],
//       },
//     };

//     const worker = html2pdf().from(element).set(opt);
//     worker
//       .save()
//       .then(() => console.log("PDF generated successfully"))
//       .catch((err) => console.error("PDF generation failed:", err));
//   };

//   return (
//     <div className="container mt-4">
//       <button className="btn btn-primary mb-3" onClick={handleDownloadPdf}>
//         Download PDF
//       </button>

//       <ExamContainer id="exam-template">
//         {/* Header Section */}
//         <div className="exam-header text-center p-2">
//           <h4 className="mb-1">{paperData?.data?.institution}</h4>
//           <div className="mb-1">{paperData?.data?.nameOfExam}</div>
//           <div className="bg-warning d-inline-block px-2">
//             Class & Semester : {paperData?.data?.className}
//           </div>
//           <div className="mt-1">Subject: {paperData?.data?.subject}</div>
//           <div className="d-flex justify-content-between px-4 mt-2">
//             <div>Date: {paperData?.data?.dateOfExam}</div>
//             <div>Time: {paperData?.data?.duration}</div>
//             <div>Marks: {paperData?.data?.marks}</div>
//           </div>
//         </div>

//         {/* Question Sections */}
//         {Object.entries(groupedQuestions).map(([typeId, group], index) => (
//           <div key={typeId} className="p-3 border-top border-dark">
//             <div className="section-header mb-2 d-flex justify-content-between">
//               <div className="fw-bold">
//                 Q.{index + 1}) {questionTypes[typeId]}:
//               </div>
//               <div className="text-end">
//                 <i>
//                   <b>{group.totalMarks} Marks</b>
//                 </i>
//               </div>
//             </div>

//             <div className="ps-4">
//               {group.questions.map((q, qIndex) => (
//                 <div key={q.id} className="question-item">
//                   <div className="question-text mb-2">
//                     {q.questionNumber}. {q.question.name}
//                   </div>

//                   {q.question.typeId === 7 && q.question.options && (
//                     <div className="radio-group ms-3">
//                       {q.question.options
//                         .split(", ")
//                         .map((option, optIndex) => (
//                           <div key={optIndex} className="form-check mb-2">
//                             <input
//                               className="form-check-input"
//                               type="radio"
//                               name={`question${q.questionNumber}`}
//                               id={`q${q.questionNumber}${optIndex}`}
//                             />
//                             <label
//                               className="form-check-label"
//                               htmlFor={`q${q.questionNumber}${optIndex}`}
//                             >
//                               {option}
//                             </label>
//                           </div>
//                         ))}
//                     </div>
//                   )}

//                   {q.question.typeId === 8 && (
//                     <div className="true-false-group ms-3">
//                       <div className="d-flex gap-4">
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="radio"
//                             name={`tf${q.questionNumber}`}
//                             id={`tf${q.questionNumber}true`}
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor={`tf${q.questionNumber}true`}
//                           >
//                             True
//                           </label>
//                         </div>
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="radio"
//                             name={`tf${q.questionNumber}`}
//                             id={`tf${q.questionNumber}false`}
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor={`tf${q.questionNumber}false`}
//                           >
//                             False
//                           </label>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}

//         {/* Footer Section (Border at the Bottom of Each Page) */}
//       </ExamContainer>
//     </div>
//   );
// };

// export default ExamTemplate;

import React from "react";
import styled from "styled-components";
import html2pdf from "html2pdf.js";

const ExamContainer = styled.div`
  width: 100%;
  padding: 1rem;
  background: white;

  .exam-header,
  .section-header {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .question-item {
    page-break-inside: avoid;
    break-inside: avoid;
    display: table;
    width: 100%;
  }

  .page-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 2px solid black;
    padding: 5px;
    font-size: 12px;
    text-align: center;
  }

  @page {
    size: A4;
    margin: 10mm 5mm 10mm 5mm; /* Adjust for footer space */
  }

  @media print {
    .page-footer {
      display: block;
      position: fixed;
    }
  }
`;

const ExamTemplate = ({ paperData, groupedQuestions, questionTypes }) => {
  const handleDownloadPdf = () => {
    const element = document.getElementById("exam-template");
    const opt = {
      margin: [0.4, 0.4, 0.4, 0.4],
      filename: "exam-paper.pdf",
      image: { type: "png", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
        compress: true,
        hotfixes: ["px_scaling"],
        footer: function (currentPage, totalPages, doc) {
          // Set the font and size for the footer
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          // Add the page number at the bottom of the page
          doc.text(`Page ${currentPage} of ${totalPages}`, 3.5, 10.75); // Adjusted position for bottom center
        },
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
        before: ".page-break-before",
        after: ".page-break-after",
        avoid: [".question-item", ".radio-group"],
      },
    };

    html2pdf()
      .from(element)
      .set(opt)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.text(
            `Page ${i} of ${totalPages}`,
            pdf.internal.pageSize.getWidth() / 2,
            pdf.internal.pageSize.getHeight() - 1,
            { align: "center" }
          );
        }
      })
      .save();
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-primary mb-3" onClick={handleDownloadPdf}>
        Download PDF
      </button>

      <ExamContainer id="exam-template">
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

        {/* Question Sections */}
        {Object.entries(groupedQuestions).map(([typeId, group], index) => (
          <div key={typeId} className="p-3 border-top border-dark">
            <div className="section-header mb-2 d-flex justify-content-between">
              <div className="fw-bold">
                Q.{index + 1}) {questionTypes[typeId]}:
              </div>
              <div className="text-end">
                <i>
                  <b>{group.totalMarks} Marks</b>
                </i>
              </div>
            </div>

            <div className="ps-4">
              {group.questions.map((q, qIndex) => (
                <div key={q.id} className="question-item">
                  <div className="question-text mb-2">
                    {q.questionNumber}. {q.question.name}
                  </div>

                  {/* {q.question.typeId === 7 && q.question.options && (
                    <div className="radio-group ms-3">
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
                    </div>
                  )} */}
                  {q.question.typeId === 7 && q.question.options && (
                    <div className="radio-group ms-3 d-flex flex-column">
                      {q.question.options
                        .split(", ")
                        .map((option, optIndex) => (
                          <div key={optIndex} className="form-check mb-2 ">
                            {/* Remove the radio button input */}
                            <label
                              className="form-check-label"
                              htmlFor={`q${q.questionNumber}${optIndex}`}
                              style={{ marginRight: "1rem" }}
                            >
                              {/* Custom label like A, B, C */}
                              {String.fromCharCode(65 + optIndex)}. {option}
                            </label>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* {q.question.typeId === 8 && (
                    <div className="true-false-group ms-3">
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
                    </div>
                  )} */}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer Section with Page Numbers */}
        {/* <div className="page-footer">
          Page <span className="page-number"></span> of{" "}
          <span className="total-pages"></span>
        </div> */}
      </ExamContainer>
    </div>
  );
};

export default ExamTemplate;
