import React from "react";
import "./PublishView.css";

const data = ["class 8A", "class 8C", "class 8B"];

function PublishView() {
  return (
    <div>
      <div className="publish-view-head">
        Please note that when this question paper is published, it can no longer
        be edited.
      </div>
      <div className="mt12">
        The following sets will be assigned to the classes selected
      </div>
      <div className="d-flex publish-view-card mt4">
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              paddingTop: "22px",
              paddingBottom: "22px",
              paddingRight: "10px",
              paddingLeft: "10px",
            }}
          >
            <div className="publish-lable">{item}</div>
            <div className="hiperLink publish-preview mt-2">
              <span>Preview Set {index + 1}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="hiperLink mt4">
        <span>Share Question Paper</span>
      </div>
    </div>
  );
}

export default PublishView;
