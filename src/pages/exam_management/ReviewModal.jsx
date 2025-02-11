import React from "react";
import { Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
// import "./review-modal.css";

export default function ReviewModal({
  examQuestionList,
  closeModal,
  //   onReview = () => {},
}) {
  const navigate = useNavigate();
  const incompleteQuestions = [
    { number: 19, subject: "Practical Chemistry", marks: 1 },
    { number: 20, subject: "Practical Chemistry", marks: 1 },
    { number: 21, subject: "Organic Chemistry", marks: 3 },
    { number: 22, subject: "Acids & Bases", marks: 4 },
    { number: 23, subject: "Metals & Compounds", marks: 1 },
    { number: 24, subject: "Organic Compounds", marks: 1 },
    { number: 25, subject: "Practical Chemistry", marks: 1 },
    { number: 26, subject: "Practical Chemistry", marks: 1 },
    { number: 27, subject: "Practical Chemistry", marks: 1 },
    { number: 28, subject: "Organic Chemistry", marks: 1 },
    { number: 29, subject: "Practical Chemistry", marks: 1 },
    { number: 30, subject: "Practical Chemistry", marks: 1 },
  ];

  const handlePublish = () => {
    navigate("/preview-paper");
  };

  console.log("examQuestionList12:", examQuestionList);

  return (
    // <Modal
    //   open={open}
    //   onCancel={onClose}
    //   footer={null}
    //   width={600}
    //   closeIcon={<span className="modal-close">×</span>}
    // >
    <div className="review-modal">
      <div className="modal-content">
        <div className="modal-title">
          Please note that the question paper is incomplete.
        </div>
        <div className="modal-title">
          Would you like to proceed with reviewing the paper?
        </div>
        <div className="modal-subtitle"></div>

        <div className="incomplete-section">
          <p className="section-title">
            The following questions are incomplete
          </p>

          <Row gutter={[16, 16]}>
            {incompleteQuestions.map((question, index) => (
              <Col span={12} key={question.number}>
                <div className="question-item">
                  <div className="question-number ">{question.number}</div>
                  <div className="question-subject">{question.subject}</div>
                  <div className="eclips-mark"></div>
                  <div className="label-10-500-italic">
                    {question.marks} mark{question.marks > 1 ? "s" : ""}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="modal-actions">
          <Button
            className="review-button label-18-700-grey"
            onClick={handlePublish}
          >
            Review Paper
          </Button>
          <Button className="cancel-button" onClick={() => closeModal()}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
    // </Modal>
  );
}
