import React from 'react';
import '../styles/Status.css'
import '../styles/Dropdown.css'
import '../styles/Dropdown.css'
import { useState } from 'react';

function Dropdown(props) {
  // Initialize state with values from localStorage or fallback to defaults
  const [selectedValue, setSelectedValue] = useState(localStorage.getItem('grouping'));
  const [selectedValueorder, setSelectedValueorder] = useState(localStorage.getItem('order'));

  // Update grouping state and localStorage on change
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    props.setGroupingValue(`${event.target.value}`);
    localStorage.setItem('grouping', `${event.target.value}`);
    
  };
 
  // Update ordering state and localStorage on change
  const handleSelectChangeorder = (event) => {
    setSelectedValueorder(event.target.value);
    console.log(`${event.target.value}`);
    props.setOrderingValue(`${event.target.value}`);
    localStorage.setItem('order', `${event.target.value}`);
    
  };

  return (
    <>
      <div className='dropdown'>
        <ul>Grouping <div>
          <select name="grouping"  value={selectedValue} onChange={handleSelectChange} >
            <option value="status"  >Status</option>
            <option value="priority" >Priority</option>
            <option value="user">User</option>
          </select>
        </div>
        </ul>
        <ul>Ordering<div>
            <select name="ordering"  value={selectedValueorder} onChange={handleSelectChangeorder} >
            <option value="Priority">Priority</option>
            <option value="Title">Title</option>
          </select>
        </div>
        </ul>
      </div>

    </>

  );
}

export default Dropdown;
