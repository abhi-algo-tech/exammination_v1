import React from "react";
import { Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useUpdateExamQuestionStatus } from "../../hooks/useExamQuestion";
import { CustomMessage } from "../../utils/CustomMessage";
// import "./review-modal.css";

export default function ReviewModal({
  updatedQuestion,
  closeModal,
  //   onReview = () => {},
}) {
  const navigate = useNavigate();
  const {
    mutate: UpdateExamQuestion,
    isLoading,
    isError,
  } = useUpdateExamQuestionStatus();
  // const incompleteQuestions = [
  //   { number: 19, subject: "Practical Chemistry", marks: 1 },
  //   { number: 20, subject: "Practical Chemistry", marks: 1 },
  //   { number: 21, subject: "Organic Chemistry", marks: 3 },
  //   { number: 22, subject: "Acids & Bases", marks: 4 },
  //   { number: 23, subject: "Metals & Compounds", marks: 1 },
  //   { number: 24, subject: "Organic Compounds", marks: 1 },
  //   { number: 25, subject: "Practical Chemistry", marks: 1 },
  //   { number: 26, subject: "Practical Chemistry", marks: 1 },
  //   { number: 27, subject: "Practical Chemistry", marks: 1 },
  //   { number: 28, subject: "Organic Chemistry", marks: 1 },
  //   { number: 29, subject: "Practical Chemistry", marks: 1 },
  //   { number: 30, subject: "Practical Chemistry", marks: 1 },
  // ];

  const handlePublish = () => {
    const payload = updatedQuestion.flatMap((section) =>
      section.questions.map((question) => ({
        id: question.examQuestionId,
        isPublished: question.isChecked,
      }))
    );

    // console.log("payload:", payload);

    // Call mutation function to update exam question statuses
    UpdateExamQuestion(payload, {
      onSuccess: () => {
        CustomMessage.success("Exam questions updated successfully");
        navigate("/preview-paper"); // Navigate only after a successful update
      },
      onError: (error) => {
        CustomMessage.error("Error updating exam questions");
      },
    });
  };

  const incompleteQuestions = updatedQuestion.flatMap((section) =>
    section.questions
      .filter((question) => question.isChecked === false)
      .map((question) => ({
        number: question.id,
        subject: question.topic,
        marks: question.marks,
      }))
  );

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
