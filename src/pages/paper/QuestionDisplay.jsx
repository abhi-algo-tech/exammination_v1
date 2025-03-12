import { Radio, Space, Input } from "antd";
import { Typography } from "antd";

const { TextArea } = Input;
const { Title } = Typography;

const QuestionDisplay = ({ question, onAnswerChange }) => {
  const questionNumber = question.id; // Use question.id as the question number

  const renderQuestion = () => {
    if (question.questionType === "Group Question" && question.subQuestions) {
      return (
        <div className="question-group">
          <Title level={5} className="mb-2">
            <div className="d-flex justify-content-between">
              <div>
                {questionNumber}. {question.questionName}
              </div>
              <div>
                <lable>
                  {question.marks} {question.marks === 1 ? "mark" : "marks"}
                </lable>
              </div>
            </div>
          </Title>

          <div
            className="question-body mb-4"
            dangerouslySetInnerHTML={{ __html: question.questionBody }}
          />

          <div className="sub-questions">
            {question.subQuestions.map((subQ, index) => (
              <div
                key={subQ.id}
                className="sub-question mb-4 p-3 border rounded"
              >
                <div className="d-flex justify-content-between gap-2 mb-2 font-semibold">
                  <div className="d-flex gap-2">
                    {questionNumber}.{String.fromCharCode(97 + index)}
                    {/* a, b, c... */}
                    <span
                      dangerouslySetInnerHTML={{ __html: subQ.questionName }}
                    />
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    {subQ.marks} {subQ.marks === 1 ? "mark" : "marks"}
                  </div>
                </div>
                {renderQuestionContent(subQ)}
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="question">
          <div className="d-flex justify-content-between gap-2 mb-3 font-semibold">
            <div className="d-flex gap-2">
              {questionNumber}.{" "}
              <span
                dangerouslySetInnerHTML={{ __html: question.questionName }}
              />
            </div>
            <div className="text-right text-sm text-gray-500">
              {question.marks} {question.marks === 1 ? "mark" : "marks"}
            </div>
          </div>
          {renderQuestionContent(question)}
        </div>
      );
    }
  };

  const renderQuestionContent = (q) => {
    switch (q.questionType) {
      case "Multiple Choice":
        return (
          <Radio.Group onChange={(e) => onAnswerChange(q.id, e.target.value)}>
            <Space direction="vertical">
              {q.options.map((option, index) => (
                <Radio key={index} value={option}>
                  {option}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        );
      case "True or False":
        return (
          <Radio.Group onChange={(e) => onAnswerChange(q.id, e.target.value)}>
            <Space direction="vertical">
              <Radio value="True">True</Radio>
              <Radio value="False">False</Radio>
            </Space>
          </Radio.Group>
        );
      case "Short Answer":
      case "Long Answer Type":
        return (
          <TextArea
            rows={q.questionType === "Short Answer" ? 4 : 8}
            placeholder="Type your answer here..."
            onChange={(e) => onAnswerChange(q.id, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return <div className="question-container">{renderQuestion()}</div>;
};

export default QuestionDisplay;
