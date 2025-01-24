import React from "react";
import "./QuestionBankCard.css";

function QuestionBankCard({ columns = 6 }) {
  return (
    <div className="question-bank-card">
      {/* Fixed Column */}
      <div className="fixed-column">
        <div className="card-head">0/0 questions added</div>
        <div>0/0 marks added</div>
      </div>

      {/* Scrollable Columns */}
      <div className="scrollable-columns">
        {Array.from({ length: columns }, (_, index) => (
          <div key={index} className="scrollable-column">
            <div className="d-flex align-items-center">
              <div className="columns-head">SECTION {index + 1}</div>{" "}
              <div>(0)</div>
            </div>
            <div>0 questions to be added</div>
            <div>0 marks remaining</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionBankCard;
