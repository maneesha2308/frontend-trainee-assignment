import React from "react";
import "./AddWidget.css";
import { useWidgets } from '../../context/WidgetContext';

const AddWidget = ({ title, text ,category, id }) => {
  const { removeWidget } = useWidgets();

  return (
    <div className="widget-card">
      <div className="widget-header">
          <h5>{title}</h5>
            <div className="widget-text">
            <p>{text}</p></div>
          
        <button className="remove-btn" onClick={() => removeWidget(category, id)}>✕</button>
      </div>
           
    </div>
  );
};

export default AddWidget;






