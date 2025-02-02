import React, { useCallback, useState } from "react";
import { Table, Select, Input, Button, Tag, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import InputWithSearch from "../../components/input/InputWithSearch";
import { useExams } from "../../hooks/useExam";
import { debounce } from "lodash";

function transformExamData(apiResponse) {
  if (!apiResponse || !apiResponse.data || !Array.isArray(apiResponse.data)) {
    return []; // Return empty array for invalid input
  }

  return apiResponse.data.map((exam, index) => ({
    key: String(exam.id || index + 1), // Use exam.id if available, otherwise index
    name: exam.nameOfExam || "Unknown Exam", // Provide default values
    subject: getSubjectName(exam.subjectId), // Implement this function (see below)
    class: getClassString(exam.classId, exam.division), // Implement this function (see below)
    curriculum: getCurriculumName(exam.curriculumId), // Implement this function (see below)
    totalMarks: exam.marks || 0,
    status: getStatusString(exam.statusId), // Implement this function (see below)
    author: getAuthorName(exam.examCreatedBy), // Implement this function (see below)
    lastEdited: formatDate(exam.createdOn), // Implement this function (see below)
  }));
}

// Helper functions (you'll need to implement these based on your data)

function getSubjectName(subjectId) {
  // Replace with your logic to get the subject name from the ID
  // Example:
  const subjectMap = {
    1: "Chemistry",
    2: "Physics",
    3: "Mathematics",
    5: "Science", // Add more mappings as needed
  };
  return subjectMap[subjectId] || "Unknown Subject";
}

function getCurriculumName(curriculumId) {
  const curriculumMap = {
    1: "CBSE",
    2: "ICSE",
    // ... other curriculum mappings
  };
  return curriculumMap[curriculumId] || "Unknown Curriculum";
}

function getClassString(classId, division) {
  return `${classId}${division}`; // Or add logic if you have class names
}

function getStatusString(statusId) {
  const statusMap = {
    1: "Published (100%)", // Replace with your actual status mappings
    // ... other status mappings
  };
  return statusMap[statusId] || "Unknown Status";
}

function getAuthorName(authorId) {
  const authorMap = {
    1: "Shaila.N",
    2: "Nalini.M",
  };
  return authorMap[authorId] || "Unknown Author";
}

function formatDate(dateString) {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is 0-indexed
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12; // Handle midnight (0)
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${day}/${month} ${formattedHours}:${formattedMinutes} ${ampm}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return original string if formatting fails
  }
}

function DashboardTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [subjectId, setSubjectId] = useState(null);
  const [classId, setClassId] = useState(null);
  const [curriculumId, setCurriculumId] = useState(null);
  const [statusId, setStatusId] = useState(null);
  const [search, setSearch] = useState("");
  const columns = [
    {
      className: "label-14-400",
      title: (
        <span className="label-16-700-g">Name of the Question Paper/Bank</span>
      ),
      dataIndex: "name",
      key: "name",
    },
    {
      className: "label-14-400",
      title: <span className="label-16-700-g">Subject</span>,
      dataIndex: "subject",
      key: "subject",
    },
    {
      className: "label-14-400",
      title: <span className="label-16-700-g">Class</span>,
      dataIndex: "class",
      key: "class",
    },
    {
      className: "label-14-400",
      title: <span className="label-16-700-g">Curriculum</span>,
      dataIndex: "curriculum",
      key: "curriculum",
    },
    {
      className: "label-14-400",
      title: <span className="label-16-700-g">Total Marks</span>,
      dataIndex: "totalMarks",
      key: "totalMarks",
    },
    {
      className: "label-14-400",
      title: <span className="label-16-700-g">Paper Status</span>,
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        const statusColors = {
          Published: { color: "#F59E0B", bg: "#FEF3C7" },
          "In-Progress": { color: "#10B981", bg: "#D1FAE5" },
          "In-Review": { color: "#3B82F6", bg: "#EFF6FF" },
          "Exam Details": { color: "#EF4444", bg: "#FEE2E2" },
        };
        const statusType = status.split(" ")[0];
        return (
          <Tag
            color={statusColors[statusType]?.bg}
            style={{
              color: statusColors[statusType]?.color,
              height: "28px",
              display: "flex",
              alignItems: "center",
              borderRadius: "14px",
            }}
          >
            <span className="label-12-600"> {status}</span>
          </Tag>
        );
      },
    },
    {
      className: "label-14-400",
      title: <span className="label-16-700-g">Author</span>,
      dataIndex: "author",
      key: "author",
    },
    {
      className: "label-14-400",
      title: <span className="label-16-700-g">Last Edited</span>,
      dataIndex: "lastEdited",
      key: "lastEdited",
    },
    {
      className: "label-14-400",
      title: <span className="label-16-700-g"></span>,
      key: "action",
      render: () => (
        <Dropdown
          menu={{
            items: [
              { key: "1", label: "Edit" },
              { key: "2", label: "Delete" },
            ],
          }}
          trigger={["click"]}
        >
          <EllipsisOutlined style={{ cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];

  // State for pagination and sorting
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [sorter, setSorter] = useState({
    field: "createdOn",
    order: "ascend",
  });

  // Fetch dataList using the custom hook
  const { data, isLoading, error, refetch } = useExams({
    page: pagination.current - 1,
    size: pagination.pageSize,
    sortBy: sorter?.field,
    sortDirection:
      sorter?.order === "ascend"
        ? "asc"
        : sorter?.order === "descend"
        ? "desc"
        : undefined,
    subjectId,
    classId,
    curriculumId,
    statusId,
    search,
  });

  console.log("data123", data); // Log the 'data'
  const exam = data && data ? transformExamData(data) : [];
  console.log("exam:", exam);

  // Handle table changes (pagination & sorting)
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });

    setSorter(sorter.order ? sorter : null); // Update sorter or set to null if no sorting

    refetch();
  };

  const debouncedSearch = useCallback(
    debounce((value) => setSearch(value), 3000), // 500ms delay
    []
  );

  const handleFilterChange = (type, value) => {
    switch (type) {
      case "subject":
        setSubjectId(value);
        break;
      case "class":
        setClassId(value);
        break;
      case "curriculum":
        setCurriculumId(value);
        break;
      case "status":
        setStatusId(value);
        break;
      case "search":
        console.log("value:", value);
        debouncedSearch(value);
        break;
      default:
        break;
    }
    refetch(); // Trigger refetch after filter change
  };

  return (
    <div className="mt36">
      {/* Filters */}
      <div className="filters d-flex mb32">
        <Select
          value={subjectId}
          onChange={(value) => handleFilterChange("subject", value)}
          className="mr14 alignCenter"
          style={{ width: 137 }}
          placeholder="Subject"
        >
          <Option value={1}>Chemistry</Option>
          <Option value={2}>Physics</Option>
          <Option value={3}>Maths</Option>
        </Select>

        <Select
          value={classId}
          onChange={(value) => handleFilterChange("class", value)}
          className="mr14 alignCenter"
          style={{ width: 137 }}
          placeholder="class"
        >
          <Option value={10}>Class 10</Option>
          <Option value={9}>Class 9</Option>
        </Select>

        <Select
          value={curriculumId}
          onChange={(value) => handleFilterChange("curriculum", value)}
          className="mr14 alignCenter"
          style={{ width: 137 }}
          placeholder="curriculum"
        >
          <Option value={1}>CBSE</Option>
          <Option value={2}>ICSE</Option>
        </Select>

        <Select
          value={statusId}
          onChange={(value) => handleFilterChange("status", value)}
          className="mr14 alignCenter"
          style={{ width: 137 }}
          placeholder="status"
        >
          <Option value={1}>Published</Option>
          <Option value={2}>In-Progress</Option>
          <Option value={3}>In-Review</Option>
          <Option value={4}>Exam Details</Option>
        </Select>

        <Input
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="mr14 alignCenter"
          placeholder="Search"
          style={{ width: "300px" }}
        />
      </div>

      {/* Table */}
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        position="bottomCenter"
        columns={columns}
        dataSource={exam}
        loading={isLoading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data?.totalElements,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default DashboardTable;
