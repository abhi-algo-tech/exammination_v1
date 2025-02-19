import { Form, Layout } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";
import DashboardCard from "./DashboardCard";
import DashboardTable from "./DashboardTable";
import SignatureModal from "../../exam_components/modal/SignatureModal";
import { useGetUserProfile } from "../../hooks/useAuth";

function Dashboard() {
  const { data: userProfile, isLoading, error } = useGetUserProfile();

  const hasInstitution =
    !userProfile?.institution || userProfile?.institution.trim() === "";

  console.log("hasInstitution:", hasInstitution, userProfile?.institution);
  const assessmentCards = [
    {
      title: "Summative Assessment - I",
      subject: "Mathematics",
      classes: "10A, 10B, 10D",
      status: "Published",
      totalMarks: 80,
      totalSections: 4,
    },
    {
      title: "Unit Test - III",
      subject: "Science",
      classes: "10A, 10B, 10D",
      status: "In-Progress",
      statusPercent: "44%",
      totalMarks: 40,
      totalSections: 4,
    },
    {
      title: "Formative Assessment - IV",
      subject: "English",
      classes: "10A, 10B, 10D",
      status: "In-Review",
      statusPercent: "44%",
      totalMarks: 40,
      totalSections: 4,
    },
  ];
  return (
    <div className="mt-2">
      {hasInstitution && <SignatureModal isVisible={hasInstitution} />}

      <div className="d-flex justify-content-end">
        <div className="d-flex mt-2">
          <div style={{ paddingRight: "20px" }}>
            <Form.Item>
              <ButtonComponent
                bgColor="#F9A828"
                height="40px"
                width="269px"
                label="Create Question Paper"
                icon={<PlusOutlined />}
                //   onClick={handleCreateQuestionPaper} // Attach the navigation function
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item>
              <ButtonComponent
                bgColor="#215988"
                height="40px"
                width="235px"
                label="Create Classroom"
                icon={<PlusOutlined />}
              />
            </Form.Item>
          </div>
        </div>
      </div>
      <div className="question-paper-manager">
        {/* Assessment Cards */}
        <DashboardCard assessmentCards={assessmentCards} />
        {/* Assessment Table */}
        <DashboardTable />
      </div>
    </div>
  );
}

export default Dashboard;
