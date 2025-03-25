import React, { useEffect, useState } from "react";
import { Table, Select, Input, Button, Tag } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonModal from "../../exam_components/model_window/CommonModal";
import CommonModalComponent from "../../components/CommonModalComponent";
import ExamResultsCard from "./ExamResultsCard";
import { useSearchExamSchedules } from "../../hooks/useExamSchedules";
import { formatTime } from "../../utils/common";

const { Option } = Select;

// Updated exam data with Time, Author, and Subject
// const examsData = [
//   {
//     id: 1,
//     name: "Math Exam",
//     date: "2025-03-10",
//     time: "10:00 AM",
//     author: "Mr. Smith",
//     subject: "Mathematics",
//     status: "Upcoming",
//   },
//   {
//     id: 2,
//     name: "Science Exam",
//     date: "2025-03-12",
//     time: "11:30 AM",
//     author: "Dr. Johnson",
//     subject: "Science",
//     status: "Ongoing",
//   },
//   {
//     id: 3,
//     name: "History Exam",
//     date: "2025-03-05",
//     time: "09:00 AM",
//     author: "Ms. Brown",
//     subject: "History",
//     status: "Completed",
//   },
//   {
//     id: 4,
//     name: "Physics Exam",
//     date: "2025-03-15",
//     time: "02:00 PM",
//     author: "Dr. Taylor",
//     subject: "Physics",
//     status: "Upcoming",
//   },
//   {
//     id: 5,
//     name: "Biology Exam",
//     date: "2025-03-20",
//     time: "03:15 PM",
//     author: "Mrs. Davis",
//     subject: "Biology",
//     status: "Ongoing",
//   },
//   {
//     id: 6,
//     name: "Chemistry Exam",
//     date: "2025-03-25",
//     time: "01:45 PM",
//     author: "Mr. Wilson",
//     subject: "Chemistry",
//     status: "Completed",
//   },
// ];\\

const transformExamData = (examsList) => {
  if (!examsList || !Array.isArray(examsList)) return [];

  return examsList.map((exam) => ({
    id: exam.examId,
    scheduleId: exam.id,
    name: exam.examName || "Unknown Exam",
    date: exam.examDate || "N/A",
    time: formatTime(exam?.examTime) || "--", // Convert time to hh:mm AM/PM format
    author: exam.examAuthor || "--",
    subject: exam.subject || "N/A",
    status: exam.status || "N/A",
  }));
};

function StudentQuestionPaper() {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [filteredExams, setFilteredExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedExamId, setSelectedExamId] = useState();

  const name = useSelector((state) => state.auth?.profile?.firstName);

  // console.log(
  //   "profile:",
  //   useSelector((state) => state.auth?.profile)
  // );

  const classId = useSelector((state) => state.auth?.profile?.classId);
  const userId = useSelector((state) => state.auth?.profile?.id);

  // Fetch exam schedules using the custom hook
  const { data: examsList, isLoading } = useSearchExamSchedules({
    customUserId: userId,
    classId: classId,
  });

  useEffect(() => {
    setFilteredExams(transformExamData(examsList?.data));
  }, [examsList]);
  const capitalizedName = name
    ? name.charAt(0).toUpperCase() + name.slice(1)
    : "";

  const handleCancel = () => {
    setIsModal(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterData(value, selectedStatus);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    filterData(searchTerm, value);
  };
  const handleViewResult = (record) => {
    setIsModal(true);
    setSelectedExamId(record.id);
  };

  // Filter Function
  const filterData = (search, status) => {
    let filtered = transformExamData(examsList?.data) || [];

    if (search) {
      filtered = filtered.filter((exam) =>
        exam.name.toLowerCase().includes(search)
      );
    }

    if (status) {
      filtered = filtered.filter((exam) => exam.status === status);
    }

    setFilteredExams(filtered);
  };

  // Table Columns
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Ongoing"
            ? "blue"
            : status === "Completed"
            ? "green"
            : "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          {record.status === "Ongoing" && (
            <Button
              style={{
                backgroundColor: "#F9A828",
                borderColor: "#F9A828",
                color: "#fff",
              }}
              // onClick={() => alert(`Starting exam: ${record.id}`)}
              onClick={() => {
                // console.log("record:", record);
                navigate("/student-paper-nosection", {
                  state: {
                    examId: record.id,
                    scheduleId: record.scheduleId,
                  },
                });
              }}
            >
              Start Exam
            </Button>
          )}
          {record.status === "Completed" && (
            <Button type="default" onClick={() => handleViewResult(record)}>
              View Result
            </Button>
          )}

          {record.status === "Upcoming" && <span>Not Started</span>}
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="label-28-600">
        Welcome, {capitalizedName}! Ready to Ace Your Exams? 🎯 Here’s Your Exam
        List
      </div>

      {/* Search & Filter Controls */}
      <div
        className="mt-2"
        style={{ display: "flex", gap: "10px", marginBottom: "15px" }}
      >
        <Input
          placeholder="Search Exam Name"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: 200 }}
        />

        <Select
          placeholder="Filter by Status"
          value={selectedStatus || undefined} // Ensures placeholder is visible when no value is selected
          onChange={handleStatusChange}
          style={{ width: 200 }}
          allowClear
        >
          <Option value="Upcoming">Upcoming</Option>
          <Option value="Ongoing">Ongoing</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      </div>

      {/* Exam Table with Pagination */}
      <Table
        columns={columns}
        dataSource={filteredExams}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {isModal && (
        <CommonModalComponent
          open={isModal}
          setOpen={setIsModal}
          modalWidthSize={696}
          modalHeightSize={599}
          isClosable={true}
        >
          <ExamResultsCard examId={selectedExamId} stuentId={userId} />
          {/* <AddQuestionModal closeModal={() => setIsModal(false)} /> */}
        </CommonModalComponent>
      )}
    </div>
  );
}

export default StudentQuestionPaper;
