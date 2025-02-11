import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  DatePicker,
  Card,
  TimePicker,
} from "antd";
import Select from "react-select";
import CustomSelect from "../../exam_components/select/CustomSelect";
import DynamicNumericInput from "../../exam_components/dynamic_numeric_input/DynamicNumericInput";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useCreateExam, useExamById, useUpdateExam } from "../../hooks/useExam";
import { CustomMessage } from "../../utils/CustomMessage";
import { useDispatch } from "react-redux";
import { setExam } from "../../store/authSlice";
import moment from "moment/moment";

// Options for Select and Multi-select
const examTypeOptions = [
  { value: 1, label: "Midterm" },
  { value: 2, label: "Final" },
  { value: 3, label: "Quiz" },
];

const classTypeOptions = [
  { value: 1, label: "Class 8" },
  { value: 2, label: "Class 9" },
  { value: 3, label: "Class 10" },
];

const subjectOptions = [
  { value: 1, label: "Math" },
  { value: 2, label: "Science" },
  { value: 3, label: "History" },
  { value: 4, label: "Geography" },
];

const curriculumTypeOptions = [
  { value: 1, label: "CBSC" },
  { value: 2, label: "ICSE" },
  { value: 3, label: "SB" },
  { value: 4, label: "IB" },
];

// Assuming you have this convertToPayload function already defined
const convertToPayload = (values) => {
  console.log(values);
  console.log("🚀 Debugging subjectCode:", values?.subjectCode);
  console.log("Type of subjectCode:", typeof values.subjectCode);

  return {
    nameOfExam: values.examName,
    typeOfExamId: values.examType?.value,
    curriculumId: values.curriculum?.value,
    classId: values.class?.value,
    division: values?.division,
    subjectId: values.subject?.value,
    subjectCode: Array.isArray(values.subjectCode)
      ? parseInt(values.subjectCode.join("")) // ✅ Ensure it's an array before joining
      : parseInt(values.subjectCode) || null, // ✅ Convert if it's not an array
    dateOfExam: values.examDate?.toISOString().split("T")[0], // Convert to YYYY-MM-DD format
    examCreatedBy: 1, // Replace with actual user ID
    examEvaluatedBy: 2, // Replace with actual evaluator ID
    institution: values?.institution,
    duration: values.duration?.toISOString().substr(11, 8), // Convert to HH:MM:SS format
    marks: parseInt(values.totalMarks), // Assuming marks are integers
    uniquePaperCode: Array.isArray(values.uniquePaperCode)
      ? parseInt(values.uniquePaperCode.join(""))
      : parseInt(values.uniquePaperCode) || null, // ✅ Fix the same issue for uniquePaperCode
    createdBy: 1, // Replace with actual user ID
    statusId: 1, // Replace with actual status ID
    sections: values.numberSections
      ? Array.from({ length: values.numberSections }, (_, i) => ({
          sectionName: String.fromCharCode(65 + i), // A, B, C, etc.
          questionCount:
            i < values.numberSections / 2
              ? parseInt(values.noOfQuestionSectionA)
              : parseInt(values.noOfQuestionSectionB),
        }))
      : [],
  };
};

const name = "Abhi.s"; // Example variable for name
const time = "12:14 - 11.12.24"; // Example variable for time

function CreateQuestionPaper() {
  const location = useLocation();
  const id = location.state?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [sections, setSections] = useState(0);

  const { mutate: createExam, isLoading, isError } = useCreateExam();
  const {
    mutate: updateExam,
    isLoading: isUpdating,
    isError: isUpdateError,
  } = useUpdateExam();

  const { data: examData } = useExamById(id);
  if (examData) {
    console.log("examData:", examData);
  }
  useEffect(() => {
    if (examData) {
      const subjectCode = examData.data.subjectCode
        ? examData.data.subjectCode.toString().split("").map(Number)
        : Array(n).fill("");
      console.log("subjectCode:", subjectCode);
      const formValues = {
        examName: examData.data.nameOfExam,
        examType: examTypeOptions.find(
          (option) => option.value === examData.data.typeOfExamId
        ),
        curriculum: curriculumTypeOptions.find(
          (option) => option.value === examData.data.curriculumId
        ),
        class: classTypeOptions.find(
          (option) => option.value === examData.data.classId
        ),
        division: examData.data.division,
        subject: subjectOptions.find(
          (option) => option.value === examData.data.subjectId
        ),
        subjectCode: examData.data.subjectCode
          ? examData.data.subjectCode.toString().split("").map(Number)
          : Array(n).fill(""),
        examDate: examData.data.dateOfExam
          ? moment(examData.data.dateOfExam, "YYYY-MM-DD")
          : null,
        examBy: examData.data.examCreatedBy,
        evaluator: examData.data.examEvaluatedBy,
        institution: examData.data.institution,
        duration: examData.data.duration
          ? moment(examData.data.duration, "HH:mm:ss")
          : null,
        totalMarks: examData.data.marks,
        uniquePaperCode: examData.data.uniquePaperCode
          ? examData.data.uniquePaperCode.toString().split("").map(Number)
          : Array(n).fill(""),
        numberSections: examData.data.sections.length || 0,
      };

      // **Dynamically Add Sections**
      examData.data.sections.forEach((section, index) => {
        const sectionLabel = String.fromCharCode(65 + index); // 'A', 'B', 'C', ...
        formValues[`noOfQuestionSection${sectionLabel}`] =
          section.questionCount || 0;
      });

      setSections(examData.data.sections.length);

      // **Set form values**
      form.setFieldsValue(formValues);
    }
  }, [examData, form]);

  // const handleSubmit = (values) => {
  //   // console.log("values", values);
  //   const payload = convertToPayload(values);

  //   if (id) {
  //     updateExam(id, payload, {
  //       onSuccess: (result) => {
  //         CustomMessage.success("Exam updated successfully!");
  //         // Store the exam ID in Redux
  //         console.log("result:", result);
  //         dispatch(setExam(result.data));
  //         navigate("/add-question");
  //       },
  //       onError: (error) => {
  //         CustomMessage.error("Failed to updated exam. Please try again.");
  //         console.error("Error updating exam:", error);
  //       },
  //     });
  //   } else {
  //     createExam(payload, {
  //       onSuccess: (result) => {
  //         CustomMessage.success("Exam created successfully!");
  //         // Store the exam ID in Redux
  //         console.log("result:", result);
  //         dispatch(setExam(result.data));
  //         navigate("/add-question");
  //       },
  //       onError: (error) => {
  //         CustomMessage.error("Failed to create exam. Please try again.");
  //         console.error("Error creating exam:", error);
  //       },
  //     });
  //   }
  // };

  const handleSubmit = (values) => {
    const payload = convertToPayload(values);
    const examId = id; // Ensure correct exam ID

    const onSuccess = (result) => {
      CustomMessage.success(
        examId ? "Exam updated successfully!" : "Exam created successfully!"
      );
      dispatch(setExam(result.data)); // Store the exam ID in Redux
      navigate("/add-question");
    };

    const onError = (error) => {
      CustomMessage.error(
        examId
          ? "Failed to update exam. Please try again."
          : "Failed to create exam. Please try again."
      );
      console.error(`Error ${examId ? "updating" : "creating"} exam:`, error);
    };

    if (examId) {
      updateExam({ id: examId, payload }, { onSuccess, onError }); // ✅ Fix: Pass as a single object
    } else {
      createExam(payload, { onSuccess, onError });
    }
  };

  const handleAsignStudent = () => {
    console.log("assign Student");
  };

  // Handle dynamic section generation
  const handleNumberOfSection = (value) => {
    setSections(value);
  };

  // const createQuestion = () => {
  //   navigate("/add-question");
  // };
  return (
    <div className="mt-2">
      <h2 className="page-head mb-4">
        {id ? "Update the Exam Details" : "Enter the Exam Details"}
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="row g-3"
      >
        <Card
          style={{
            background: "#fff",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Row gutter={20}>
            {/* Input Field */}
            <Col md={6} lg={8}>
              <Form.Item
                label="Name of the Exam"
                name="examName"
                rules={[
                  { required: true, message: "Please enter the exam title!" },
                ]}
              >
                <Input placeholder="Enter Exam Name" className="input-box" />
              </Form.Item>
            </Col>

            {/* React-Select Field */}
            <Col md={6} lg={8}>
              <Form.Item
                label="Select Exam Type"
                name="examType"
                // rules={[
                //   { required: true, message: "Please select an exam type!" },
                // ]}
              >
                <CustomSelect
                  options={examTypeOptions}
                  placeholder="Select"
                  isSearchable
                />
              </Form.Item>
            </Col>

            <Col md={6} lg={8}>
              {/* <Form.Item
                label="Curriculum"
                name="curriculum"
                // rules={[
                //   { required: true, message: "Please enter the curriculum!" },
                // ]}
              >
                <Input
                  placeholder="Enter the curriculum"
                  className="input-box"
                />
              </Form.Item> */}
              <Form.Item
                label="Curriculum"
                name="curriculum"
                // rules={[
                //   { required: true, message: "Please select an exam type!" },
                // ]}
              >
                <CustomSelect
                  options={curriculumTypeOptions}
                  placeholder="Select"
                  isSearchable
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="d-flex justify-content-center">
            <Row gutter={[16, 24]} className="w-100">
              {/* First Row */}
              <Col md={9} lg={11}>
                <Form.Item
                  label="Select Class"
                  name="class"
                  rules={[
                    { required: true, message: "Please select a class!" },
                  ]}
                >
                  <CustomSelect
                    options={classTypeOptions}
                    placeholder="Choose Class"
                    isSearchable
                  />
                </Form.Item>
                <div className="mt-2">
                  <ButtonComponent
                    bgColor="#07617D"
                    height="30px"
                    width="140px"
                    label="Assign Students"
                    onClick={handleAsignStudent}
                  />
                </div>
              </Col>

              <Col
                md={1}
                className="d-flex align-items-center justify-content-center"
                style={{ marginBottom: "30px" }}
              >
                <span>-</span>
              </Col>

              <Col md={9} lg={11}>
                <Form.Item label="Division" name="division">
                  <Input placeholder="A, D, E" className="input-box" />
                </Form.Item>
              </Col>
            </Row>

            {/* Second Row */}
            <Row gutter={[16, 24]} className="w-100 ">
              <Col md={9} lg={11}>
                <Form.Item
                  label="Subject"
                  name="subject"
                  rules={[
                    { required: true, message: "Please select a subject!" },
                  ]}
                >
                  <CustomSelect
                    options={subjectOptions}
                    placeholder="Select Subject"
                    isSearchable
                  />
                </Form.Item>
              </Col>

              <Col
                md={1}
                className="d-flex align-items-center justify-content-center"
                style={{ marginBottom: "30px" }}
              >
                <span>-</span>
              </Col>

              <Col md={9} lg={11}>
                <DynamicNumericInput
                  n={4}
                  name="subjectCode"
                  label="Subject Code"
                  form={form}
                />
              </Col>
            </Row>
          </div>

          <Row gutter={20}>
            {/* Date Picker Field */}
            <Col md={5}>
              <Form.Item
                label="Date of the Exam"
                name="examDate"
                // rules={[
                //   { required: true, message: "Please select the exam date!" },
                // ]}
              >
                <DatePicker
                  placeholder="dd/mm/yy"
                  style={{ width: "100%" }}
                  className="input-box"
                />
              </Form.Item>
            </Col>
            <Col md={5}>
              <Form.Item
                label="Exam Created By"
                name="examBy"
                // rules={[
                //   { required: true, message: "Please enter the curriculum!" },
                // ]}
              >
                <Input placeholder="Exam Author" className="input-box" />
                <div className="hiperLink mt-2">
                  <span>Add Author</span>
                </div>
              </Form.Item>
            </Col>
            <Col md={5}>
              <Form.Item
                label="Exam Evaluator"
                name="evaluator"
                // rules={[
                //   { required: true, message: "Please enter the curriculum!" },
                // ]}
              >
                <Input placeholder="Exam Evaluator" className="input-box" />
                <div className="hiperLink mt-2">
                  <span>Add Evaluator</span>
                </div>
              </Form.Item>
            </Col>
            <Col md={5}>
              <Form.Item
                label="Institution"
                name="institution"
                rules={[
                  { required: true, message: "Please enter the institution!" },
                ]}
              >
                <Input placeholder="Institution Name" className="input-box" />
              </Form.Item>
            </Col>
            <div
              className="hiperLink"
              style={{ paddingTop: "50px", paddingLeft: "10px" }}
            >
              <span>Add More Details</span>
            </div>
          </Row>

          <Row gutter={20}>
            <Col md={6}>
              <Form.Item
                label="Duration"
                name="duration"
                rules={[
                  { required: true, message: "Please select the Duration!" },
                ]}
              >
                <TimePicker
                  placeholder="0 hrs 0 mins"
                  style={{ width: "100%" }}
                  className="input-box"
                />
              </Form.Item>
            </Col>

            {/* Input Number Field */}
            <Col md={6}>
              <Form.Item
                label="Total Marks"
                name="totalMarks"
                rules={[
                  { required: true, message: "Please enter total marks!" },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Please enter only numeric values!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter total marks"
                  maxLength={4} // Optional: To limit input length (e.g., max 1000)
                  style={{ width: "100%" }}
                  className="input-box"
                />
              </Form.Item>
            </Col>

            {/* Input Group with 4 Boxes */}
            <Col md={6}>
              <DynamicNumericInput
                n={4}
                name="uniquePaperCode"
                label="Unique Paper Code"
                required={true}
                form={form} // Pass form to DynamicNumericInput
              />
            </Col>
          </Row>

          {/* Horizontal Line */}
          <div
            style={{
              width: "100%",
              height: "2px",
              background: "#CED4DA",
              margin: "20px 0",
            }}
          ></div>

          <div className="d-flex">
            <Row gutter={[16, 24]}>
              {/* Input Number Field */}
              <Col>
                <Form.Item
                  label="Total sections"
                  name="numberSections"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Total number of sections!",
                    },
                    {
                      pattern: /^[0-9]+$/,
                      message: "Please enter only numeric values!",
                    },
                    {
                      validator: (_, value) =>
                        value && value > 20
                          ? Promise.reject("Value cannot be more than 20!")
                          : Promise.resolve(),
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Number of Sections"
                    style={{ width: "100%", alignContent: "center" }}
                    className="input-box"
                    onChange={handleNumberOfSection}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div
              className="w-100"
              style={{
                paddingLeft: "20px",
              }}
            >
              {Array.from({ length: sections }, (_, index) => {
                const isNewRow = index % 2 === 0; // Start a new row every two sections
                return isNewRow ? (
                  <Row gutter={[16, 24]} className="w-100" key={`row-${index}`}>
                    {Array.from({ length: 2 }, (_, subIndex) => {
                      const currentIndex = index + subIndex;
                      if (currentIndex >= sections) return null;
                      const currentAlpha = String.fromCharCode(
                        65 + currentIndex
                      ); // Generate current section letter
                      return (
                        <Col md={11} key={`col-${currentIndex}`}>
                          <Form.Item
                            label={`Total Question At Section ${currentAlpha}`}
                            name={`noOfQuestionSection${currentAlpha}`}
                            rules={[
                              {
                                pattern: /^[0-9]+$/,
                                message: "Please enter only numeric values!",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Total Question"
                              maxLength={4} // Optional: To limit input length
                              style={{ width: "100%" }}
                              className="input-box"
                            />
                          </Form.Item>
                        </Col>
                      );
                    })}
                  </Row>
                ) : null;
              })}
              <div className="hiperLink mt-2">
                <span>Add More Details</span>
              </div>
            </div>
          </div>

          <div className="hiperLink mt-2">
            <span>Edit Examination Rules</span>
          </div>
        </Card>
        <div
          className="d-flex "
          style={{
            fontFamily: "Poppins",
            justifyContent: "flex-end",
            fontSize: "14px",
            fontStyle: "italic",
            fontWeight: "300",
            lineHeight: "normal",
          }}
        >
          <div style={{ color: "#07617D", fontWeight: "300" }}>
            Last Edited by <label style={{ fontWeight: "600" }}>{name}</label>
          </div>
          <div
            style={{
              height: "20px",
              width: "2px",
              background: "#6E6E6E",
              margin: "0 10px",
            }}
          ></div>
          <div style={{ color: "#07617D", fontWeight: "300" }}>
            Last Edited at <label style={{ fontWeight: "600" }}>{time}</label>
          </div>
        </div>
        {/* Submit Button */}
        <div className="d-flex w-100 justify-content-between">
          <div className="d-flex">
            <div style={{ paddingRight: "20px" }}>
              <Form.Item>
                <ButtonComponent
                  bgColor="#F9A828"
                  height="40px"
                  width="236px"
                  label={id ? "Update Question Paper" : "Create Question Paper"}
                  htmlType="submit"
                  disabled={isLoading}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item>
                <ButtonComponent
                  bgColor="#215988"
                  height="40px"
                  width="185px"
                  label="Save as a Draft"
                />
              </Form.Item>
            </div>
          </div>
          <div>
            <Form.Item>
              <ButtonComponent
                bgColor="rgba(7, 97, 125, 0.2)"
                height="40px"
                width="236px"
                label="Cancel"
                labelColor="#6E6E6E"
                fontWeight="700"
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default CreateQuestionPaper;
