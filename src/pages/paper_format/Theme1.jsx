import React from "react";
import html2pdf from "html2pdf.js";
import "./Theme1.css";
import { useExamById } from "../../hooks/useExam";
import { useSelector } from "react-redux";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";
import ExamTemplate from "./ExamTemplate";

// const paperData = {
//   message: "Exam retrieved successfully",
//   httpStatus: 200,
//   flag: true,
//   data: {
//     id: 2,
//     nameOfExam: "SEM-1",
//     typeOfExamId: 1,
//     curriculumId: 1,
//     classId: 3,
//     division: "A,C",
//     subjectId: 2,
//     subjectCode: 1028,
//     dateOfExam: "2025-02-14",
//     examCreatedBy: 1,
//     examEvaluatedBy: 2,
//     institution: "WOW",
//     duration: "00:00:00",
//     marks: 80,
//     uniquePaperCode: 1122,
//     createdBy: 18,
//     createdOn: "2025-02-14T05:40:18.000+00:00",
//     updatedBy: null,
//     updatedOn: null,
//     isDeleted: false,
//     statusId: 1,
//     sections: [
//       {
//         id: 82,
//         sectionName: "A",
//         questionCount: 4,
//         examId: null,
//         createdBy: null,
//         createdOn: "2025-02-14T05:40:18.000+00:00",
//         updatedBy: null,
//         updatedOn: null,
//         isDeleted: false,
//       },
//       {
//         id: 83,
//         sectionName: "B",
//         questionCount: 4,
//         examId: null,
//         createdBy: null,
//         createdOn: "2025-02-14T05:40:18.000+00:00",
//         updatedBy: null,
//         updatedOn: null,
//         isDeleted: false,
//       },
//       {
//         id: 84,
//         sectionName: "C",
//         questionCount: 4,
//         examId: null,
//         createdBy: null,
//         createdOn: "2025-02-14T05:40:18.000+00:00",
//         updatedBy: null,
//         updatedOn: null,
//         isDeleted: false,
//       },
//     ],
//     examQuestions: [
//       {
//         id: 5,
//         exam: 2,
//         question: {
//           id: 55,
//           name: "What is JAVA",
//           options: "C, C++, Pyhon, PHP",
//           optionLength: 4,
//           answer: null,
//           imageUrl: null,
//           typeId: 3,
//           subTypeId: null,
//           levelId: 3,
//           topic: "IT",
//           marks: 1,
//           isDeleted: false,
//           createdOn: "2025-02-14T05:19:51.000+00:00",
//           createdBy: null,
//           modifiedBy: null,
//           modifiedOn: null,
//           examQuestion: null,
//         },
//         questionNumber: 1,
//         section: "SECTION - A",
//         isPublished: true,
//         createdBy: null,
//         modifiedBy: 18,
//       },
//       {
//         id: 6,
//         exam: 2,
//         question: {
//           id: 56,
//           name: "Select Laptop",
//           options: "Intel, HP, Mac, Linux",
//           optionLength: 4,
//           answer: null,
//           imageUrl: null,
//           typeId: 3,
//           subTypeId: null,
//           levelId: 1,
//           topic: "IT",
//           marks: 1,
//           isDeleted: false,
//           createdOn: "2025-02-14T05:22:02.000+00:00",
//           createdBy: null,
//           modifiedBy: null,
//           modifiedOn: null,
//           examQuestion: null,
//         },
//         questionNumber: 2,
//         section: "SECTION - A",
//         isPublished: true,
//         createdBy: null,
//         modifiedBy: 18,
//       },
//       {
//         id: 7,
//         exam: 2,
//         question: {
//           id: 57,
//           name: "Who discover gravity",
//           options: "Newton, Chandan, Abhi, Riken",
//           optionLength: 4,
//           answer: null,
//           imageUrl: null,
//           typeId: 3,
//           subTypeId: null,
//           levelId: 1,
//           topic: "gravity",
//           marks: 1,
//           isDeleted: false,
//           createdOn: "2025-02-14T05:23:48.000+00:00",
//           createdBy: null,
//           modifiedBy: null,
//           modifiedOn: null,
//           examQuestion: null,
//         },
//         questionNumber: 3,
//         section: "SECTION - A",
//         isPublished: true,
//         createdBy: null,
//         modifiedBy: 18,
//       },
//       {
//         id: 8,
//         exam: 2,
//         question: {
//           id: 58,
//           name: "What is boiling point of water",
//           options: "50, 55, 100, 102",
//           optionLength: 4,
//           answer: null,
//           imageUrl: null,
//           typeId: 3,
//           subTypeId: null,
//           levelId: 3,
//           topic: "thermo",
//           marks: 1,
//           isDeleted: false,
//           createdOn: "2025-02-14T05:25:16.000+00:00",
//           createdBy: null,
//           modifiedBy: null,
//           modifiedOn: null,
//           examQuestion: null,
//         },
//         questionNumber: 4,
//         section: "SECTION - A",
//         isPublished: true,
//         createdBy: null,
//         modifiedBy: 18,
//       },
//       {
//         id: 9,
//         exam: 2,
//         question: {
//           id: 59,
//           name: "Luckhnow is capital of Uttar pradesh ",
//           options: "",
//           optionLength: 0,
//           answer: null,
//           imageUrl: null,
//           typeId: 4,
//           subTypeId: null,
//           levelId: 1,
//           topic: "Gk",
//           marks: 1,
//           isDeleted: false,
//           createdOn: "2025-02-14T05:27:47.000+00:00",
//           createdBy: null,
//           modifiedBy: null,
//           modifiedOn: null,
//           examQuestion: null,
//         },
//         questionNumber: 1,
//         section: "SECTION - B",
//         isPublished: true,
//         createdBy: null,
//         modifiedBy: 18,
//       },
//       {
//         id: 10,
//         exam: 2,
//         question: {
//           id: 60,
//           name: "Bike has four wheel ",
//           options: "",
//           optionLength: 0,
//           answer: null,
//           imageUrl: null,
//           typeId: 4,
//           subTypeId: null,
//           levelId: 1,
//           topic: "automobile",
//           marks: 1,
//           isDeleted: false,
//           createdOn: "2025-02-14T05:28:35.000+00:00",
//           createdBy: null,
//           modifiedBy: null,
//           modifiedOn: null,
//           examQuestion: null,
//         },
//         questionNumber: 2,
//         section: "SECTION - B",
//         isPublished: true,
//         createdBy: null,
//         modifiedBy: 18,
//       },
//       {
//         id: 11,
//         exam: 2,
//         question: {
//           id: 61,
//           name: "Tree consume oxygen",
//           options: "",
//           optionLength: 0,
//           answer: null,
//           imageUrl: null,
//           typeId: 4,
//           subTypeId: null,
//           levelId: 2,
//           topic: "science",
//           marks: 1,
//           isDeleted: false,
//           createdOn: "2025-02-14T05:29:54.000+00:00",
//           createdBy: null,
//           modifiedBy: null,
//           modifiedOn: null,
//           examQuestion: null,
//         },
//         questionNumber: 3,
//         section: "SECTION - B",
//         isPublished: true,
//         createdBy: null,
//         modifiedBy: 18,
//       },
//       {
//         id: 12,
//         exam: 2,
//         question: {
//           id: 62,
//           name: "Molecular formula of water is H3O ",
//           options: "",
//           optionLength: 0,
//           answer: null,
//           imageUrl: null,
//           typeId: 4,
//           subTypeId: null,
//           levelId: 2,
//           topic: "science",
//           marks: 1,
//           isDeleted: false,
//           createdOn: "2025-02-14T05:31:26.000+00:00",
//           createdBy: null,
//           modifiedBy: null,
//           modifiedOn: null,
//           examQuestion: null,
//         },
//         questionNumber: 4,
//         section: "SECTION - B",
//         isPublished: true,
//         createdBy: null,
//         modifiedBy: 18,
//       },
//       {
//         id: 13,
//         exam: 2,
//         question: {
//           id: 63,
//           name: "Explain JAVA",
//           options: "",
//           optionLength: 0,
//           answer: null,
//           imageUrl: null,
//           typeId: 1,
//           subTypeId: null,
//           levelId: 1,
//           topic: "IT",
//           marks: 2,
//           isDeleted: false,
//           createdOn: "2025-02-14T05:32:09.000+00:00",
//           createdBy: null,
//           modifiedBy: null,
//           modifiedOn: null,
//           examQuestion: null,
//         },
//         questionNumber: 1,
//         section: "SECTION - C",
//         isPublished: true,
//         createdBy: null,
//         modifiedBy: 18,
//       },
//       {
//         id: 14,
//         exam: 2,
//         question: {
//           id: 64,
//           name: "Expain Photosynthesis",
//           options: "",
//           optionLength: 0,
//           answer: null,
//           imageUrl: null,
//           typeId: 1,
//           subTypeId: null,
//           levelId: 2,
//           topic: "Science",
//           marks: 2,
//           isDeleted: false,
//           createdOn: "2025-02-14T05:32:51.000+00:00",
//           createdBy: null,
//           modifiedBy: null,
//           modifiedOn: null,
//           examQuestion: null,
//         },
//         questionNumber: 2,
//         section: "SECTION - C",
//         isPublished: true,
//         createdBy: null,
//         modifiedBy: 18,
//       },
//       {
//         id: 15,
//         exam: 2,
//         question: {
//           id: 65,
//           name: "What is force",
//           options: "",
//           optionLength: 0,
//           answer: null,
//           imageUrl: null,
//           typeId: 1,
//           subTypeId: null,
//           levelId: 2,
//           topic: "science",
//           marks: 2,
//           isDeleted: false,
//           createdOn: "2025-02-14T05:33:41.000+00:00",
//           createdBy: null,
//           modifiedBy: null,
//           modifiedOn: null,
//           examQuestion: null,
//         },
//         questionNumber: 3,
//         section: "SECTION - C",
//         isPublished: true,
//         createdBy: null,
//         modifiedBy: 18,
//       },
//       {
//         id: 16,
//         exam: 2,
//         question: {
//           id: 66,
//           name: "Explain Gravity",
//           options: "",
//           optionLength: 0,
//           answer: null,
//           imageUrl: null,
//           typeId: 1,
//           subTypeId: null,
//           levelId: 2,
//           topic: "Science",
//           marks: 2,
//           isDeleted: false,
//           createdOn: "2025-02-14T05:34:22.000+00:00",
//           createdBy: null,
//           modifiedBy: null,
//           modifiedOn: null,
//           examQuestion: null,
//         },
//         questionNumber: 4,
//         section: "SECTION - C",
//         isPublished: true,
//         createdBy: null,
//         modifiedBy: 18,
//       },
//     ],
//     totalRecords: 0,
//   },
// };
const Theme1 = () => {
  const exam = useSelector((state) => state.auth.exam);
  // console.log("exam", exam);

  const { data: paperData, refetch } = useExamById(exam?.id);

  let sequenceNumber = 1;
  const handleDownloadPdf = () => {
    const element = document.getElementById("exam-template");
    const opt = {
      margin: 0.7, // Reduced padding
      filename: "exam-paper.pdf",
      image: { type: "png", quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const questionTypes = {
    1: "Short Answer Questions", //"Short Answer Questions",
    2: "Long Answer Questions", //"Long Answer Questions",
    3: "Choose the correct option from the following", //"Multiple Choice Questions",
    4: "State whether the following statements are True or False", //"True/False Questions",
  };

  const groupByTypeId = (questions) => {
    if (!Array.isArray(questions) || questions.length === 0) {
      return {}; // Return empty object if no questions
    }

    const order = [4, 3, 1, 2];
    const grouped = questions.reduce((acc, question) => {
      const typeId = question?.question?.typeId;
      if (!typeId) return acc; // Skip invalid questions

      if (!acc[typeId]) {
        acc[typeId] = [];
      }
      acc[typeId].push(question);
      return acc;
    }, {});

    return Object.fromEntries(
      order
        .map((type) => [type, grouped[type] || []])
        .filter(([_, q]) => q && q.length > 0)
    );
  };

  const groupedQuestions = groupByTypeId(paperData?.data?.examQuestions);
  // console.log("groupedQuestions", groupedQuestions);
  return (
    <>
      <ExamTemplate
        paperData={paperData}
        groupedQuestions={groupedQuestions}
        questionTypes={questionTypes}
      />
    </>
  );
};

// Helper functions to provide question content
const getQuestion = (index) => {
  const questions = [
    "_____ is not a partition value.",
    "10-20, 20-30, 30-40 _____ are called _______ class intervals.",
    "Number of students in the class is an example of _______ data.",
    "If the variance of the data is σ², then the standard deviation is ______.",
    "To calculate the rank correlation coefficient, we find the _______ between the ranks.",
    "For the probability distribution of random variable X, sum of all probabilities of the values of X is always _______.",
    "Cost of living index number is also called as _______ index number.",
    "We use regret table for calculating _______.",
    "If the regression equation is X = 2 + 3Y, then regression coefficient bxy = ___.",
    "Geometric mean of 4 and 9 is _______.",
  ];
  return questions[index] || "";
};

const getOption = (qIndex, optIndex) => {
  const options = {
    0: ["Mode", "Median", "Quartile", "Decile"],
    1: ["Inclusive", "Exclusive", "Discrete", "Continuous"],
    2: ["Qualitative", "Quantitative", "Primary", "Secondary"],
    // Add more options for other questions
  };
  return options[qIndex]?.[optIndex] || `Option ${optIndex + 1}`;
};

const getTrueFalseStatement = (index) => {
  const statements = [
    "If premium of the insurance policy is not paid within the grace period, the policy lapse.",
    "Statistics gives results only on an average.",
    "In Laspeyres price index number, quantity of the current year is used as weight.",
    "In examination of n objects taken r at a time, the order in which the selection is done is not important.",
    "In Decision Theory, Maximin criterion is under risk.",
    "If the data contains subdivisions or components of a total then multiple bar diagram can be used.",
    "If the arithmetic mean is 25 and standard deviation is 5, then the coefficient of variation is 20%.",
    "Correlation coefficient always lies between -1 and +1 including both = 1.",
    "If bxy = 0.4 and byx = 1.6, then correlation coefficient r = 0.64.",
    "The data collected for the first time is known as secondary data.",
  ];
  return statements[index] || "";
};

export default Theme1;
