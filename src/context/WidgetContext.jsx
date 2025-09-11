import React, { createContext, useState, useContext, useEffect } from "react";
import dashboardData from "../data/dashboardData";

const WidgetContext = createContext();

export const WidgetProvider = ({ children }) => {
  const [addWidgets,serAddWidgets]=useState([]);
  const [removedWidgets, setRemovedWidgets] = useState(() => {

    const saved = localStorage.getItem("removedWidgets");
    return saved ? JSON.parse(saved) : [];
  });

  const [addedWidgets, setAddedWidgets] = useState(() => {
    const saved = localStorage.getItem("addedWidgets");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("removedWidgets", JSON.stringify(removedWidgets));
  }, [removedWidgets]);

  useEffect(() => {
    localStorage.setItem("addedWidgets", JSON.stringify(addedWidgets));
  }, [addedWidgets]);

  const addWidget = (category, widget) => {
    // Remove from removedWidgets if present
    setRemovedWidgets((prev) => prev.filter(id => id !== widget.id));

    // Avoid duplicates
    setAddedWidgets((prev) => {
      const exists = prev.some(w => w.id === widget.id && w.category === category);
      if (exists) return prev;
      return [...prev, { ...widget, category }];
    });
  };

//   const removeWidget = (category, id) => {
//   setWidgets((prevWidgets) => ({
//     ...prevWidgets,
//     [category]: prevWidgets[category].filter((widget) => widget.id !== id),
//   }));
// };
   
const removeWidget = (category, id) => {
    setRemovedWidgets((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setAddedWidgets((prev) => prev.filter(w => !(w.id === id && w.category === category)));
  };

  




  const widgets = {};
  Object.keys(dashboardData).forEach((category) => {
    const base = dashboardData[category].filter(w => !removedWidgets.includes(w.id));
    const custom = addedWidgets.filter(w => w.category === category && !removedWidgets.includes(w.id));
    widgets[category] = [...base, ...custom];
  });

  return (
    <WidgetContext.Provider value={{ widgets, addWidget, removeWidget }}>
      {children}
    </WidgetContext.Provider>
  );
};

export const useWidgets = () => useContext(WidgetContext);
