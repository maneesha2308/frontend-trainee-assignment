import React from "react";

const WidgetRenderer = ({ widget }) => {
  return (
    <div className="cards">
      <h5>{widget.title}</h5>
      <p>{widget.text || "No data available"}</p>
    </div>
  );
};

export default WidgetRenderer;
