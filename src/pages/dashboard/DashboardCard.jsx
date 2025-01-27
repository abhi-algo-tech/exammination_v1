import { Card, Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function DashboardCard({ assessmentCards = [] }) {
  const navigate = useNavigate();
  //   console.log("assessmentCards", assessmentCards);
  const handlePaper = () => {
    navigate("/paper");
  };

  return (
    <>
      <Row gutter={[8, 8]}>
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
      </Row>
    </>
  );
}

export default DashboardCard;
