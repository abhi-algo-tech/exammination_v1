import { useState } from "react";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.min";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button, Table, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

const PDFTextExtractor = () => {
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = async (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result);
      const pdf = await pdfjs.getDocument(typedArray).promise;
      const extractedData = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        // debugger;
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" \n");
        extractedData.push({ page: i, content: pageText });
      }

      convertToExcel(extractedData);
      message.success("PDF processed successfully!");
    };
  };

  const convertToExcel = (data) => {
    const sheetData = [];
    let currentQuestion = "";
    let currentOptions = [];
    let currentType = "";

    data.forEach((page) => {
      const lines = page.content.split("\n");
      lines.forEach((line) => {
        if (line.startsWith("Q.")) {
          if (currentQuestion) {
            sheetData.push({
              "Question Number": currentQuestion,
              "Question Type": currentType,
              "Question Text": currentOptions.join(" "),
              Options: currentOptions.slice(1).join(", "),
            });
          }
          currentQuestion = line.trim();
          currentOptions = [];
          currentType = line.includes("Choose the correct option")
            ? "Multiple Choice"
            : line.includes("True or False")
            ? "True/False"
            : "Other";
        } else if (/^[a-d]\)/.test(line.trim())) {
          currentOptions.push(line.trim());
        } else if (line.trim()) {
          currentOptions.push(line.trim());
        }
      });
    });

    if (currentQuestion) {
      sheetData.push({
        "Question Number": currentQuestion,
        "Question Type": currentType,
        "Question Text": currentOptions.join(" "),
        Options: currentOptions.slice(1).join(", "),
      });
    }

    setExcelData(sheetData);
  };

  console.log(excelData);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exam Paper");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "ExamPaper.xlsx");
  };

  const columns = [
    {
      title: "Question Number",
      dataIndex: "Question Number",
      key: "Question Number",
    },
    {
      title: "Question Type",
      dataIndex: "Question Type",
      key: "Question Type",
    },
    {
      title: "Question Text",
      dataIndex: "Question Text",
      key: "Question Text",
    },
    {
      title: "Options",
      dataIndex: "Options",
      key: "Options",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>PDF to Excel Converter</h2>
      <Upload
        beforeUpload={(file) => {
          handleFileUpload(file);
          return false;
        }}
        accept="application/pdf"
      >
        <Button icon={<UploadOutlined />}>Upload PDF</Button>
      </Upload>

      {excelData.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Extracted Questions (Preview):</h3>
          <Table
            dataSource={excelData}
            columns={columns}
            rowKey="Question Number"
            pagination={{ pageSize: 5 }}
          />
          <Button
            type="primary"
            onClick={downloadExcel}
            style={{ marginTop: "10px" }}
          >
            Download Excel
          </Button>
        </div>
      )}
    </div>
  );
};

export default PDFTextExtractor;
