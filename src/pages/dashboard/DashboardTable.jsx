import React, { useState } from "react";
import { Table, Select, Input, Button, Tag, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import InputWithSearch from "../../components/input/InputWithSearch";

function DashboardTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
            <span className="label-16-600"> {status}</span>
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

  const data = [
    {
      key: "1",
      name: "Summative Assessment - 1",
      subject: "Chemistry",
      class: "10A, 10B",
      curriculum: "CBSE",
      totalMarks: 80,
      status: "In-Progress (44%)",
      author: "Shaila.N",
      lastEdited: "12/12 7:00 am",
    },
    {
      key: "2",
      name: "Chemistry Paper Draft (Question Bank)",
      subject: "Chemistry",
      class: "10C, 10D",
      curriculum: "CBSE",
      totalMarks: 80,
      status: "Published (100%)",
      author: "Nalini.M",
      lastEdited: "12/12 7:00 am",
    },
    {
      key: "3",
      name: "Math Assessment - 2",
      subject: "Mathematics",
      class: "9A, 9B",
      curriculum: "ICSE",
      totalMarks: 100,
      status: "Published (100%)",
      author: "Rajesh.K",
      lastEdited: "11/12 5:30 pm",
    },
    {
      key: "4",
      name: "Physics Quiz",
      subject: "Physics",
      class: "10A",
      curriculum: "State Board",
      totalMarks: 50,
      status: "In-Progress (60%)",
      author: "Sangeetha.P",
      lastEdited: "13/12 9:00 am",
    },
    {
      key: "5",
      name: "English Language Test",
      subject: "English",
      class: "8A, 8B, 8C",
      curriculum: "CBSE",
      totalMarks: 70,
      status: "In-Review (80%)",
      author: "Anjali.R",
      lastEdited: "11/12 3:45 pm",
    },
    {
      key: "6",
      name: "History Final Exam",
      subject: "History",
      class: "9C",
      curriculum: "ICSE",
      totalMarks: 60,
      status: "Published (100%)",
      author: "Dinesh.K",
      lastEdited: "10/12 4:00 pm",
    },
    {
      key: "7",
      name: "Geography Worksheet",
      subject: "Geography",
      class: "10A, 10B",
      curriculum: "CBSE",
      totalMarks: 30,
      status: "In-Progress (50%)",
      author: "Madhuri.S",
      lastEdited: "12/12 6:00 pm",
    },
    {
      key: "8",
      name: "Biology Mid-Term Assessment",
      subject: "Biology",
      class: "10C",
      curriculum: "State Board",
      totalMarks: 75,
      status: "In-Review (70%)",
      author: "Krishna.M",
      lastEdited: "14/12 8:15 am",
    },
    {
      key: "9",
      name: "Physics Sample Paper",
      subject: "Physics",
      class: "9D",
      curriculum: "CBSE",
      totalMarks: 90,
      status: "Published (100%)",
      author: "Lalitha.S",
      lastEdited: "13/12 10:45 am",
    },
    {
      key: "10",
      name: "Computer Science Assessment - 1",
      subject: "Computer Science",
      class: "11A, 11B",
      curriculum: "CBSE",
      totalMarks: 100,
      status: "In-Progress (30%)",
      author: "Vikas.G",
      lastEdited: "10/12 2:30 pm",
    },
  ];

  return (
    <div className="mt36">
      {/* Filters */}
      <div className="filters  d-flex mb32">
        <Select
          defaultValue="Chemistry"
          className="mr14 alignCenter"
          style={{ width: 137 }}
        >
          <Option value="Chemistry">Chemistry</Option>
          <Option value="Physics">Physics</Option>
          <Option value="Maths">Maths</Option>
        </Select>

        <Select
          defaultValue="Class 10"
          className="mr14 alignCenter"
          style={{ width: 137 }}
        >
          <Option value="Class 10">Class 10</Option>
          <Option value="Class 9">Class 9</Option>
        </Select>

        <Select
          defaultValue="CBSE"
          className="mr14 alignCenter"
          style={{ width: 127 }}
        >
          <Option value="CBSE">CBSE</Option>
          <Option value="ICSE">ICSE</Option>
        </Select>

        <Select
          defaultValue="Published (100%)"
          className="mr14"
          style={{ width: 188 }}
        >
          <Option value="published">Published (100%)</Option>
          <Option value="in-progress">In-Progress</Option>
          <Option value="in-review">In-Review</Option>
        </Select>
        <InputWithSearch />
        {/* <Input.Search
          placeholder="Search by keyword/question..."
          style={{ width: 300 }}
        /> */}

        {/* <Button type="primary">Apply Filters</Button> */}
      </div>

      {/* Table */}
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        position="bottomCenter"
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </div>
  );
}

export default DashboardTable;
