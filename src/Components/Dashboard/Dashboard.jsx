import React from 'react'
import './Dashboard.css'
import {useState} from 'react'
import { FaSyncAlt, FaEllipsisV, FaClock } from 'react-icons/fa';
import { MdBarChart } from 'react-icons/md';
import AddWidget from '../Addwidget/AddWidget';
import dashboardData from '../../data/dashboardData';
import { useWidgets } from '../../context/WidgetContext';

const Dashboard = ({ searchTerm }) => {
  const [showWidgetPanel, setShowWidgetPanel] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState([]); 
  const [activeTab, setActiveTab] = useState("CSPM"); 
  const [tempTitle, setTempTitle] = useState("");
  const [tempText, setTempText] = useState("");
  const { widgets, addWidget } = useWidgets();
  const allWidgets = Object.keys(widgets).flatMap(cat =>
    widgets[cat].map(w => ({ ...w, category: cat }))
  );
  const handleConfirm = () => {
    // Add selected existing widgets
    selectedWidgets.forEach((title) => {
      const widget = dashboardData[activeTab].find(w => w.title === title);
      if (widget) {
        addWidget(activeTab, { ...widget, id: Date.now(), category: activeTab });
      }
    });

    if (tempTitle.trim() !== "") {
      const newWidget = {
        id: Date.now() + Math.random(),
      
        title: tempTitle,
        text: tempText,
        type: "text",
        category: activeTab,
      };
      addWidget(activeTab, newWidget);
    }

    setTempTitle("");
    setTempText("");
    setSelectedWidgets([]);
    setShowWidgetPanel(false);
  };

  const handleCheckboxChange = (title) => {
    if (selectedWidgets.includes(title)) {
      setSelectedWidgets(selectedWidgets.filter((w) => w !== title));
    } else {
      setSelectedWidgets([...selectedWidgets, title]);
    }
  };

  const filteredWidgets = dashboardData[activeTab].filter((w) =>
    w.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className='dashboard-container'>

      {searchTerm && (
        <div className="search-results">
          <h4>Search Results for: "{searchTerm}"</h4>
          <div className="cards-container">
            {allWidgets
              .filter(
                (w) =>
                  w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (w.text && w.text.toLowerCase().includes(searchTerm.toLowerCase()))
              )
              .map((w) => (
                <AddWidget key={w.id} {...w} category={w.category} />
              ))}
          </div>
        </div>
      )}
      <div className='top'>
        <span><h3 className='title'>CNAPP Dashboard</h3></span>
        <div className="actions">
          <button onClick={() => setShowWidgetPanel(true)}> Add Widget +</button>
          <button><FaSyncAlt /></button>
          <button><FaEllipsisV /></button>
          <button style={{ color: 'darkblue', borderColor: 'darkblue' }}> <FaClock style={{ margin: 'auto' }} /> |  Last 2 days</button>
        </div>
      </div>
      <h4> CSPM Dashboard</h4>
      <div className='cards-container'>
        <div className='cards'><h5>Cloud Accounts</h5>
          <div className="donut-chart1">
            <div className="donut-center">
              <span>2</span>
              <p>Total</p>
            </div>
          </div>

          <div className="legend1">
            <div><span className="box connected"></span>Connected (2)</div>
            <div><span className="box not-connected"></span>Not Connected (2)</div>
          </div>
        </div>


        <div className='cards'><h5>Cloud Account Risk Assessment</h5>
          <div className="donut-chart2">
            <div className="donut-center">
              <span>9659</span>
              <p>Total</p>
            </div>
          </div>

          <div className="legend2">
            <div><span className="box failed"></span>Failed</div>
            <div><span className="box warning"></span>Warning</div>
            <div><span className="box notavailable"></span>Not Available</div>
            <div><span className="box passed"></span>Passed</div>

          </div>
        </div>
        <div className='cards'><h5><button onClick={() => setShowWidgetPanel(true)}>
          + Add Widget</button></h5></div>
      </div>
      <h4>CWPP Dashboard</h4>
      <div className='cards-container'>
        <div className='cards'><h5 >Top 5 Namespace Specific Alerts</h5>
          <div className='barchart'>
            <p style={{ marginTop: '80px', marginRight: '80px' }}>No Graph data available</p>
          </div>
        </div>
        <div className='cards'><h5>Weekload Alerts</h5>
          <div className='barchart'>
            <div>
              <MdBarChart />

            </div>
            <p style={{ marginTop: '80px', marginRight: '80px' }}>No Graph data available</p>
          </div>
        </div>
        <div className='cards'><h5><button onClick={() => setShowWidgetPanel(true)}>
          + Add Widget</button></h5></div>
      </div>
      <h4>Registry Scan</h4>
      <div className='cards-container'>
        <div className='cards'><h5>Image Risk Assessment</h5>
          <div className="risk-bar">
            <p><strong>1470</strong> Total vulnerabilities</p>
            <div className="bar" style={{ width: '300px' }}>
              <div className="brown1" ></div>
              <div className="red1" ></div>
              <div className="orange1" ></div>
              <div className="yellow1" ></div>
              <div className="grey1"></div>
            </div>
            <div className='legend3'>
              <div><span className="box critical"></span>Critical(9)</div>
              <div><span className="box high"></span>High(50)</div>
            </div>
          </div>
        </div>
        <div className='cards'><h5>Image Security Issues</h5>
          <div className="risk-bar">
            <p><strong>2</strong> Total Images</p>
            <div className="bar" style={{ width: '300px' }}>
              <div className="brown2" ></div>
              <div className="red2" ></div>
              <div className="orange2" ></div>
              <div className="yellow2" ></div>
              <div className="grey2"  ></div>
            </div>
            <div className='legend3'>
              <div><span className="box critical"></span>Critical(2)</div>
              <div><span className="box high"></span>High(2)</div>
            </div>
          </div>

        </div>
        <div className='cards'><h5><button onClick={() => setShowWidgetPanel(true)}>
          + Add Widget</button></h5>

        </div>

      </div>


      <div className="widgets-display bottom-left-row">
        {Object.keys(widgets).map((cat) => (
          widgets[cat].length > 0 && (
            <div key={cat} className="category-section">
              <h4>{cat}</h4>  {/* Category name */}
              <div className="cards-container">
                {widgets[cat].map((w) => (
                  <AddWidget key={w.id} {...w} category={cat} id={w.id} />
                ))}
              </div>
            </div>
          )
        ))}
      </div>


      {showWidgetPanel && (
        <aside className="widget-panel">


          <div className="widget-panel-header" >
            <h4 style={{ padding: '10px' }}>Add Widget</h4>
            <button className="close-btn" onClick={() => setShowWidgetPanel(false)}
            >✕</button>
          </div>

          <p style={{ paddingLeft: '10px' }}>Personalise your dashboard by adding the following widget</p>

        
          <div className="tabs" style={{ paddingLeft: '15px' }}>
            {["CSPM", "CWPP", "Image", "Ticket"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        
          <div className="widget-options" >

            {Object.keys(dashboardData).map((category) => {
              const widgetsInCategory = dashboardData[category].filter((w) =>
                w.title.toLowerCase().includes(searchTerm.toLowerCase())
              );

              return (
                widgetsInCategory.length > 0 && (
                  <div key={category}>
                    <h5>{category}</h5>
                    {widgetsInCategory.map((w) => (
                      <label
                        key={w.title}
                        style={{ border: "2px solid gray", padding: "5px", display: "block", marginBottom: "5px" }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedWidgets.includes(w.title)}
                          onChange={() => handleCheckboxChange(w.title)}
                        />
                        {w.title}
                      </label>
                    ))}
                  </div>
                )
              );
            })}
          </div>
          <div className="widget-options">
            <h4>Add New Widget</h4>
            <input
              type="text"
              placeholder="Widget Name"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              style={{ marginBottom: '10px', width: '95%', padding: '5px' }}
            />
            <textarea
              placeholder="Widget Text"
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              style={{ marginBottom: '10px', width: '95%', padding: '5px' }}
            />
          </div>
          <div className="panel-actions">
            <button onClick={() => setShowWidgetPanel(false)} style={{ padding: '10px', width: '100px', borderRadius: '15px' }}>Cancel</button>
            <button onClick={handleConfirm} style={{ padding: '10px', width: '100px', borderRadius: '15px' }}>Confirm</button>
          </div>
        </aside>
      )}
    </div>
  )
}
export default Dashboard