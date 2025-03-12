import React, { useState } from "react";
import { Tag } from "antd";
import "./ConfirmSubmit.css";

const allQuestions = [1, 4, 5, 7];
const answeredQuestions = [4, 7]; // Example of answered question IDs

function ConfirmSubmit() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);

  // Filter out answered questions to get only incomplete ones
  const incompleteQuestions = allQuestions.filter(
    (id) => !answeredQuestions.includes(id)
  );

  return (
    <div>
      <div className="publish-view-head">
        Please note that the question paper is incomplete. Would you like to
        proceed with reviewing the paper?
      </div>
      <div className="mt12">The following questions are incomplete</div>
      <div className="d-flex publish-view-card mt4">
        {incompleteQuestions.map((item, index) => (
          <Tag
            key={index}
            className={`question-box ${
              currentQuestionIndex === index ? "active" : ""
            }`}
            onClick={() => setCurrentQuestionIndex(index)}
          >
            {item}
          </Tag>
        ))}
      </div>
    </div>
  );
}

export default ConfirmSubmit;
