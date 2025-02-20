import React, { useCallback, useEffect, useState } from "react";
import { Table, Select, Input, Button, Tag, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import InputWithSearch from "../../components/input/InputWithSearch";
import { useExams } from "../../hooks/useExam";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { useGetMasterLookupByType } from "../../hooks/useMasterLookup";
import { useGetAllClasses } from "../../hooks/useClass";
import { useGetAllSubjects } from "../../hooks/useSubject";
import { useGetAllCurriculums } from "../../hooks/useCurriculum";

function transformExamData(apiResponse) {
  if (!apiResponse || !apiResponse.data || !Array.isArray(apiResponse.data)) {
    return { exam: [], totalRecords: 0 };
  }

  const exam = apiResponse.data.map((exam, index) => ({
    key: String(exam.id || index + 1),
    name: exam.nameOfExam || "Unknown Exam",
    subject: exam.subject,
    class: exam.className,
    curriculum: exam.curriculum,
    totalMarks: exam.marks || 0,
    status: exam.statusName,
    author: getAuthorName(exam.examCreatedBy),
    lastEdited: formatDate(exam.createdOn),
  }));

  // Assuming all exam objects have the same totalRecords value
  const totalRecords = apiResponse.data[0]?.totalRecords || 0;

  return { exam, totalRecords };
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
  const navigate = useNavigate();
  const { data: statusTypelist } = useGetMasterLookupByType("status");
  const { data: classTypelist } = useGetAllClasses();
  const { data: subjectlist } = useGetAllSubjects();
  const { data: curriculumslist } = useGetAllCurriculums();

  const statusTypes =
    statusTypelist?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];
  const classTypes =
    classTypelist?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];
  const subjectTypes =
    subjectlist?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];
  const curriculumsTypes =
    curriculumslist?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];
  const handleEditClick = (id) => {
    navigate("/create-question-paper", { state: { id } });
  };
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
      render: (record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: "Edit",
                onClick: () => handleEditClick(record.key),
              },
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
    total: 0,
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

  // console.log("data123", data); // Log the 'data'
  const { exam, totalRecords } = data
    ? transformExamData(data)
    : { exam: [], totalRecords: 0 };

  useEffect(() => {
    if (totalRecords !== undefined) {
      console.log("Total records from API:", totalRecords);
      setPagination((prev) => ({
        ...prev,
        total: totalRecords,
      }));
    }
  }, [totalRecords]);

  useEffect(() => {
    console.log("Current pagination state:", pagination);
  }, [pagination]);

  const handleTableChange = (newPagination, filters, sorter) => {
    console.log("New pagination:", newPagination);
    setPagination((prev) => ({
      ...prev,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    }));

    setSorter(sorter.order ? sorter : null);

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
          {subjectTypes.map((type) => (
            <Select.Option key={type.value} value={type.value}>
              {type.label}
            </Select.Option>
          ))}
        </Select>

        <Select
          value={classId}
          onChange={(value) => handleFilterChange("class", value)}
          className="mr14 alignCenter"
          style={{ width: 137 }}
          placeholder="class"
        >
          {classTypes.map((type) => (
            <Select.Option key={type.value} value={type.value}>
              {type.label}
            </Select.Option>
          ))}
        </Select>

        <Select
          value={curriculumId}
          onChange={(value) => handleFilterChange("curriculum", value)}
          className="mr14 alignCenter"
          style={{ width: 137 }}
          placeholder="curriculum"
        >
          {statusTypes.map((type) => (
            <Select.Option key={type.value} value={type.value}>
              {type.label}
            </Select.Option>
          ))}
        </Select>

        <Select
          value={statusId}
          onChange={(value) => handleFilterChange("status", value)}
          className="mr14 alignCenter"
          style={{ width: 137 }}
          placeholder="status"
        >
          {statusTypes.map((type) => (
            <Select.Option key={type.value} value={type.value}>
              {type.label}
            </Select.Option>
          ))}
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
        columns={columns}
        dataSource={exam}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        loading={isLoading}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default DashboardTable;
