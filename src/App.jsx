import React from 'react'
import {useState} from 'react'
import Dashboard from "./Components/Dashboard/Dashboard.jsx"
import Navbar from "./Components/Navbar/Navbar.jsx"
import { WidgetProvider } from './context/WidgetContext.jsx'

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <WidgetProvider>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
         <Dashboard searchTerm={searchTerm} />
      </WidgetProvider>
    </div>
  )
}

export default App