import React from "react";
import html2pdf from "html2pdf.js";
import "./Theme1.css";

const Theme1 = () => {
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

  return (
    <div className="container-fluid p-4">
      <button className="btn btn-primary mb-3" onClick={handleDownloadPdf}>
        Download Paper PDF
      </button>
      <div id="exam-template" className="border border-dark">
        {/* Header Section */}
        <div className="text-center p-2">
          <h4 className="mb-1">M.L.DAHANUKAR COLLEGE COMMERCE</h4>
          <div className="mb-1">
            SEMESTER END EXAMINATION - October/November 2025
          </div>
          <div className="bg-warning d-inline-block px-2">
            Class & Semester : FYBBI - Semester-1
          </div>
          <div className="mt-1">Subject: Quantitative Methods - 1</div>
          <div className="d-flex justify-content-between px-4 mt-2">
            <div>Date: _____________</div>
            <div>Time: _____________</div>
            <div>Marks: 75</div>
          </div>
        </div>

        {/* Multiple Choice Questions */}
        <div className="p-3 border-top border-dark">
          <div className="mb-2">
            Q.1A) Choose the correct option from the following: ( any 8 out of
            10) 8 marks
          </div>
          <div className="ps-4">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="mb-3">
                {index + 1}. {getQuestion(index)}
                <div className="ms-3">
                  {["a)", "b)", "c)", "d)"].map((option, optIndex) => (
                    <div key={optIndex} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`question${index + 1}`}
                        id={`q${index + 1}${option}`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`q${index + 1}${option}`}
                      >
                        {getOption(index, optIndex)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* True/False Questions */}
        <div className="p-3 border-top border-dark">
          <div className="mb-2">
            Q.1B) State whether the following statements are True or False: (any
            7 out of 10) 7 marks
          </div>
          <div className="ps-4">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="mb-3">
                {index + 1}. {getTrueFalseStatement(index)}
                <div className="ms-3">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`tf${index + 1}`}
                      id={`tf${index + 1}true`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`tf${index + 1}true`}
                    >
                      True
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`tf${index + 1}`}
                      id={`tf${index + 1}false`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`tf${index + 1}false`}
                    >
                      False
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Histogram Question */}
        <div className="p-3 border-top border-dark">
          <div className="mb-2">
            Q.2A) Draw Histogram and locate mode graphically on it 7 Marks
          </div>
          <table className="table table-bordered w-auto">
            <thead>
              <tr>
                <th>Class Interval</th>
                <th>30-40</th>
                <th>40-50</th>
                <th>50-60</th>
                <th>60-70</th>
                <th>70-80</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Frequency</td>
                <td>10</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className="mt-3 border p-3" style={{ minHeight: "300px" }}>
            {/* Space for drawing histogram */}
            <div className="text-center text-muted">
              Space for drawing histogram
            </div>
          </div>
        </div>
      </div>
    </div>
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
