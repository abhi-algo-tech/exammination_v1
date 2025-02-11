import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Typography, Button } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState(3600); // Example: 1 hour countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center mt-5"
      style={{ height: "auto", textAlign: "center" }}
    >
      <Spinner animation="border" variant="primary" />

      <Title level={2} style={{ marginTop: 0 }}>
        Coming Soon
      </Title>

      <Text type="secondary">Stay tuned! Something awesome is on the way.</Text>
      {/* <Text strong style={{ fontSize: 18, marginTop: 10 }}>
        Launch in: {formatTime(timeLeft)}
      </Text> */}
      <Link to="/dashboard">
        <Button type="primary" style={{ marginTop: 20 }}>
          Go to Dashboard
        </Button>
      </Link>
    </Container>
  );
}
