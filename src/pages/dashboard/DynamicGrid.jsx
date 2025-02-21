import { Row, Col, Card } from "antd";

// const subjects = () => [
//   {
//     name: "Math",
//     totalNoPaper: 10,
//     publishcount: 5,
//     reviewCount: 2,
//     onprocesscount: 3,
//   },

//   {
//     name: "History",
//     totalNoPaper: 7,
//     publishcount: 3,
//     reviewCount: 2,
//     onprocesscount: 2,
//   },
//   {
//     name: "Geography",
//     totalNoPaper: 12,
//     publishcount: 6,
//     reviewCount: 3,
//     onprocesscount: 3,
//   },
// ];

const DynamicGrid = ({ subjects }) => {
  const totalSubjects = subjects().length + 1; // +1 for "Total Subjects" card

  // Determine column size dynamically based on the total number of cards
  let colSpan;
  if (totalSubjects === 1) colSpan = 24; // 1 card → full width
  else if (totalSubjects === 2) colSpan = 12; // 2 cards → 50% width
  else if (totalSubjects === 3) colSpan = 8; // 3 cards → 33.33% width
  else colSpan = 6; // 4 or more cards → 25% width (4 per row)

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      {/* Dynamic "Total Subjects" Card */}
      <Col span={colSpan}>
        <Card
          title="Total Subjects"
          bordered={false}
          style={{
            textAlign: "center",
            fontSize: "2rem",
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

      {/* Dynamically Adjusting Subject Cards */}
      {subjects().map((subject, index) => (
        <Col key={index} span={colSpan}>
          <Card
            bordered={false}
            hoverable
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
            <div className="container">
              <div className="row">
                <div className="col-6 text-start">
                  <strong>Total Papers:</strong>
                </div>
                <div className="col-6 text-end">
                  <span>{subject.totalNoPaper}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-6 text-start">
                  <strong>Published:</strong>
                </div>
                <div className="col-6 text-end">
                  <span>{subject.publishcount}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-6 text-start">
                  <strong>Review:</strong>
                </div>
                <div className="col-6 text-end">
                  <span>{subject.reviewCount}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-6 text-start">
                  <strong>In Process:</strong>
                </div>
                <div className="col-6 text-end">
                  <span>{subject.onprocesscount}</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DynamicGrid;
