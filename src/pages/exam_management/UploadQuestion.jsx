import { useState } from "react";
import { Button, Row, Col, Table, Tooltip } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import CommonUploads from "../../exam_components/upload/CommonUploads";
import RightSection from "./RightSection";
import ButtonComponent from "../../exam_components/button_component/ButtonComponent";
import {
  useDownloadTemplate,
  useUploadQuestions,
} from "../../hooks/useQuestion";
import { CustomMessage } from "../../utils/CustomMessage";
import { useLocation, useNavigate } from "react-router-dom";

const sections = [
  { key: 1, name: "SECTION - A", marks: 15, questions: 11 },
  { key: 2, name: "SECTION - B", marks: 15, questions: 19 },
  { key: 3, name: "SECTION - C", marks: 15, questions: 9 },
  { key: 4, name: "SECTION - D", marks: 15, questions: 6 },
];

const UploadQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const examData = location.state || {};
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isUploading, setIsUploading] = useState(false); // Local loading state
  const { mutate: downloadTemplate } = useDownloadTemplate();
  const { mutateAsync: uploadQuestions } = useUploadQuestions(); // Get mutateAsync

  const handleUploadChange = (newFileList, files) => {
    setFileList(newFileList);

    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
          type: "array",
        });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (jsonData.length > 0) {
          const newColumns = jsonData[0].map((col, index) => ({
            title: col,
            dataIndex: index.toString(),
            key: index.toString(),
          }));
          setColumns(newColumns);

          const newExcelData = jsonData.slice(1).map((row, rowIndex) =>
            row.reduce(
              (acc, value, colIndex) => {
                acc[colIndex.toString()] = value;
                return acc;
              },
              { key: rowIndex.toString() }
            )
          );
          setExcelData(newExcelData);
        }
      };

      reader.readAsArrayBuffer(file);
    } else {
      setExcelData([]);
      setColumns([]);
    }
  };

  const handleDownloadClick = () => {
    downloadTemplate();
  };

  const handleUploadClick = async () => {
    if (fileList.length === 0) {
      CustomMessage.error("No file selected for upload.");
      return;
    }

    const file = fileList[0].originFileObj;

    try {
      setIsUploading(true); // Start loading

      // Await the mutation function properly
      await uploadQuestions({
        file,
        curriculumId: examData?.data?.curriculumId,
        classesId: examData?.data?.classId,
        subjectId: examData?.data?.subjectId,
      });

      CustomMessage.success("File successfully uploaded!");

      setFileList([]); // Clear file list after success
      setExcelData([]); // Clear preview data
      setColumns([]); // Clear table columns
      navigate("/add-question-by-bank", { state: examData });
    } catch (error) {
      CustomMessage.error(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false); // Stop loading
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <div className="label-28-600">{examData?.data?.nameOfExam}</div>
        <div className="label-14-600-blue">View Examination Details</div>
      </div>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={24}>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <div>Upload your Question Paper here.</div>
            <Tooltip title="Download Template">
              <Button icon={<DownloadOutlined />} onClick={handleDownloadClick}>
                Download Template
              </Button>
            </Tooltip>
          </div>
          <div className="mt-4">
            <CommonUploads
              onChange={handleUploadChange}
              accept=".xlsx, .xls"
              fileList={fileList}
            />
          </div>
          {excelData.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div className="d-flex justify-content-between align-items-center">
                <h3>Preview Excel Data</h3>
                <ButtonComponent
                  bgColor="#215988"
                  height="40px"
                  width="236px"
                  label={isUploading ? "Uploading..." : "Upload"}
                  labelColor="#ffff"
                  fontWeight="700"
                  onClick={handleUploadClick}
                  disabled={isUploading}
                />
              </div>
              <div className="mt-4">
                <Table
                  dataSource={excelData}
                  columns={columns}
                  pagination={false}
                  scroll={{ x: true }}
                />
              </div>
            </div>
          )}
        </Col>
        {/* <Col xs={24} md={8}>
          <RightSection examData={examData} sections={sections} />
        </Col> */}
      </Row>
    </div>
  );
};

export default UploadQuestion;
