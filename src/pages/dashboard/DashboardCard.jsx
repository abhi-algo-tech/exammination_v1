import { Card, Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllSubjects } from "../../hooks/useSubject";

// const subjects = [
//   {
//     name: "Mathematics",
//     totalNoPaper: 0,
//     publishcount: 0,
//     reviewCount: 0,
//     onprocesscount: 0,
//   },
//   {
//     name: "Physics",
//     totalNoPaper: 0,
//     publishcount: 0,
//     reviewCount: 0,
//     onprocesscount: 0,
//   },
//   {
//     name: "Chemistry",
//     totalNoPaper: 0,
//     publishcount: 0,
//     reviewCount: 0,
//     onprocesscount: 0,
//   },
//   {
//     name: "Biology",
//     totalNoPaper: 0,
//     publishcount: 0,
//     reviewCount: 0,
//     onprocesscount: 0,
//   },
// ];

function DashboardCard() {
  const navigate = useNavigate();
  const { data: subjectlist } = useGetAllSubjects();

  const subjects = () => {
    return (
      subjectlist?.data?.map((subject) => ({
        name: subject.name,
        totalNoPaper: 0,
        publishcount: 0,
        reviewCount: 0,
        onprocesscount: 0,
      })) || []
    );
  };

  const handlePaper = (subjectName) => {
    console.log("subjectName:", subjectName);
  };

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            title="Total Subjects"
            bordered={false}
            style={{
              textAlign: "center",
              fontSize: "4rem",
              fontWeight: "bold",
              background: "#ffffff",
              height: "250px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            {subjects().length}
          </Card>
        </Col>

        {subjects().map((subject, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              bordered={false}
              hoverable
              onClick={() => handlePaper(subject.name)}
              style={{
                cursor: "pointer",
                background: "#ffffff",
                height: "250px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <h3 style={{ textAlign: "center", marginBottom: "16px" }}>
                {subject.name}
              </h3>
              <p>
                <strong>Total Papers:</strong> {subject.totalNoPaper}
              </p>
              <p>
                <strong>Published:</strong> {subject.publishcount}
              </p>
              <p>
                <strong>Review:</strong> {subject.reviewCount}
              </p>
              <p>
                <strong>In Process:</strong> {subject.onprocesscount}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default DashboardCard;

{
  /* <Row gutter={[8, 8]}>
        {assessmentCards &&
          assessmentCards.length > 0 &&
          assessmentCards.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card
                styles={{ body: { padding: "12px 14px" } }}
                className="assessment-card"
              >
                <div className="d-flex gap8 align-items-center">
                  <div
                    className="label-14-600-b"
                    style={{ cursor: "pointer" }}
                    onClick={handlePaper}
                  >
                    {card.title}
                  </div>
                  <span className="eclips-mark-4" />
                  <span className="label-10-500-grey">{card.subject}</span>
                </div>
                <div className="mt10 mb25">
                  <div className="row">
                    <div className="col-7 label-12-400-bgrey">
                      Classes Assigned:{" "}
                      <span className="label-12-600-grey-bold">
                        {card.classes}
                      </span>
                    </div>
                    <div className="col-5 label-12-400-bgrey">
                      Total No. of Marks:{" "}
                      <span className="label-12-600-grey-bold">
                        {card.totalMarks}
                      </span>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-7 label-12-400-bgrey">
                      Paper Status:{" "}
                      <span className="label-12-600-grey-bold">
                        {card.status} {card.statusPercent}
                      </span>
                    </div>
                    <div className="col-5 label-12-400-bgrey">
                      Total No. of Sections:{" "}
                      <span className="label-12-600-grey-bold">
                        {card.totalSections}
                      </span>
                    </div>
                  </div>
                </div>
                <div className=" d-flex gap4 justify-content-between label-12-600-blue pointer">
                  {card.status === "Published" && (
                    <>
                      <div>View Question Paper Details</div>
                      <div>Schedule Question Paper</div>
                    </>
                  )}
                  {(card.status === "In-Progress" ||
                    card.status === "In-Review") && (
                    <div>Edit Question Paper Details</div>
                  )}
                </div>
              </Card>
            </Col>
          ))}
      </Row> */
}
