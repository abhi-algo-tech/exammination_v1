import React from "react";
import html2pdf from "html2pdf.js";

const Theme2 = () => {
  const handleDownloadPdf = () => {
    const element = document.getElementById("exam-template");
    const opt = {
      margin: 0.7,
      filename: "exam-paper.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-primary mb-3" onClick={handleDownloadPdf}>
        Download PDF
      </button>

      <div id="exam-template" className="p-4 bg-white">
        {/* Header Section */}
        <div className="text-center border border-dark">
          <h4 className="mb-1">M.L.DAHANUKAR COLLEGE COMMERCE</h4>
          <div className="mb-1">
            SEMESTER END EXAMINATION - October/November 2023
          </div>
          <div className="bg-warning p-1">
            Class & Semester : FYBBI - Semester-1
          </div>
          <div className="d-flex justify-content-between px-3">
            <div>Subject: Quantitative Methods - 1</div>
            <div>Marks: 75</div>
          </div>
          <div className="d-flex justify-content-between px-3 mb-2">
            <div>Date: _____________</div>
            <div>Time: _____________</div>
          </div>
        </div>

        {/* Q.1A Multiple Choice */}
        <div className="mt-3">
          <div className="d-flex justify-content-between">
            <div>Q.1A)</div>
            <div>
              Choose the correct option from the following: ( any 8 out of 10)
            </div>
            <div>8 marks</div>
          </div>

          <table className="table table-bordered mt-2">
            <tbody>
              <tr>
                <td width="5%">1.</td>
                <td>
                  -------- is not a partition value.
                  <div>
                    a) Mode &nbsp;&nbsp; b) Decile &nbsp;&nbsp; c) Median
                    &nbsp;&nbsp; d) Quartile
                  </div>
                </td>
              </tr>
              <tr>
                <td>2.</td>
                <td>
                  10-20, 20-30, 30-40 -------- are called --------- class
                  intervals.
                  <div>
                    a) Inclusive &nbsp;&nbsp; b) Exclusive &nbsp;&nbsp; c)
                    Discrete &nbsp;&nbsp; d) Secondary
                  </div>
                </td>
              </tr>
              <tr>
                <td>3.</td>
                <td>
                  Number of students in the class is an example of ---------
                  data.
                  <div>
                    a) Qualitative &nbsp;&nbsp; b) Continuous &nbsp;&nbsp; c)
                    Secondary &nbsp;&nbsp; d) Primary
                  </div>
                </td>
              </tr>
              {/* Add more questions as needed */}
            </tbody>
          </table>
        </div>

        {/* Q.1B True/False */}
        <div className="mt-4">
          <div className="d-flex justify-content-between">
            <div>Q.1B)</div>
            <div>
              State whether the following statements are True or False: (any 7
              out of 10)
            </div>
            <div>7 marks</div>
          </div>

          <table className="table table-bordered mt-2">
            <tbody>
              <tr>
                <td width="5%">1.</td>
                <td>
                  If premium of the insurance policy is not paid within the
                  grace period, the policy lapse.
                </td>
              </tr>
              <tr>
                <td>2.</td>
                <td>Statistics gives results only in absolute form.</td>
              </tr>
              <tr>
                <td>3.</td>
                <td>
                  In Laspeyres price index number, quantity of the current year
                  is used as weight.
                </td>
              </tr>
              {/* Add more statements as needed */}
            </tbody>
          </table>
        </div>

        {/* Q.2A Histogram */}
        <div className="mt-4">
          <div className="d-flex justify-content-between">
            <div>Q.2A)</div>
            <div>Draw Histogram and locate mode graphically on it</div>
            <div>7 Marks</div>
          </div>

          <table className="table table-bordered mt-2">
            <thead>
              <tr>
                <th>Class Interval</th>
                <th>30-40</th>
                <th>40-50</th>
                <th>50-60</th>
                <th>60-70</th>
                <th>70-80</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Frequency</td>
                <td>10</td>
                <td>15</td>
                <td>25</td>
                <td>12</td>
                <td>8</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Theme2;
