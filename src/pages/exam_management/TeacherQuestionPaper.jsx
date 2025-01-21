import React from "react";
import { Form } from "antd"; // Ensure you import Form for Form.Item
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";

function TeacherQuestionPaper() {
  const navigate = useNavigate(); // Initialize the navigate function

  // Sample data fetched from JSON (replace this with dynamic fetching logic if needed)
  const data = {
    teacherName: "Abhi",
    questionBankCount: 3,
    questionPaperCount: 2,
  };

  // Function to handle navigation to CreateQuestionPaper
  const handleCreateQuestionPaper = () => {
    navigate("/create-question-paper"); // Replace this path with your actual route
  };

  return (
    <div className="mt-2">
      <div className="d-flex justify-content-between">
        <div>
          <h2 className="page-head">{`${data.teacherName}'s Exam Library`}</h2>
          <div
            style={{
              color: "#000",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "normal",
            }}
          >
            {`You have ${data.questionBankCount} question banks & ${data.questionPaperCount} question papers in your library`}
          </div>
        </div>
        <div>
          <div className="d-flex mt-2">
            <div style={{ paddingRight: "20px" }}>
              <Form.Item>
                <ButtonComponent
                  bgColor="#F9A828"
                  height="40px"
                  width="269px"
                  label="Create Question Paper"
                  icon={<PlusOutlined />}
                  onClick={handleCreateQuestionPaper} // Attach the navigation function
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item>
                <ButtonComponent
                  bgColor="#215988"
                  height="40px"
                  width="269px"
                  label="Create Question Bank"
                  icon={<PlusOutlined />}
                />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherQuestionPaper;
