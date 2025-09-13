import React, { useState } from 'react';
import { FaSearch,FaAngleRight,FaAngleDown,FaRegBell} from 'react-icons/fa';
import './Navbar.css'; 

const Navbar = ({searchTerm,setSearchTerm}) => {

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    < div className="navbar">
      <div className="nav-links">
        <h3 style={{color:'gray'}}>Home</h3>
        <FaAngleRight/>
        <h3>Dashboard</h3>
      </div>
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search anything..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div 
      style={{display:'flex',gap:'30px'}}
      >
      <FaAngleDown />
      <FaRegBell/>

      </div>
 </div>
  );
};

export default Navbar;
