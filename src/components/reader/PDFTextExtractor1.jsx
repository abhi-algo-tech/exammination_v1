import React, { useState } from "react";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.min"; // Import the worker explicitly
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Fix the worker path
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js"; // Use CDN

const PDFTextExtractor1 = () => {
  const [pdfData, setPdfData] = useState([]);
  const [excelData, setExcelData] = useState([]);

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjs.getDocument(typedArray).promise;
        let extractedData = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          extractedData.push({ page: i, content: pageText });
        }

        setPdfData(extractedData);
        convertToExcel(extractedData);
      };
    }
  };

  // Convert extracted PDF text to Excel format
  const convertToExcel = (data) => {
    console.log("Extracted data:", data);

    const sheetData = data.map((item, index) => ({
      "Page Number": item.page,
      "Question Text": item.content,
    }));

    setExcelData(sheetData);
  };

  // Download Excel file
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

  // Upload data to the database (dummy function)
  const uploadToDatabase = async () => {
    try {
      const response = await fetch("http://localhost:5000/upload-excel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(excelData),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>PDF to Excel Converter</h2>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />

      {pdfData.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Extracted Questions (Preview):</h3>
          <table border="1" cellPadding="5" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Page</th>
                <th>Question Text</th>
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, index) => (
                <tr key={index}>
                  <td>{row["Page Number"]}</td>
                  <td>{row["Question Text"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {excelData.length > 0 && (
        <>
          <button onClick={downloadExcel} style={{ margin: "10px" }}>
            Download Excel
          </button>
          <button onClick={uploadToDatabase} style={{ margin: "10px" }}>
            Upload to Database
          </button>
        </>
      )}
    </div>
  );
};

export default PDFTextExtractor1;
