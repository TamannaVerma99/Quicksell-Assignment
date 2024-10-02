import React, { useEffect, useRef, useState } from 'react';
import '../styles/Status.css'
import optionsImg from '../assets/options.png'
import Dropdown from './Dropdown.js'
import '../styles/Dropdown.css'
import dropdownImg from '../assets/dropdown.png'

function Navbar( props) {
  const [isDropdownOpen, setisDropdownOpen] = useState(false);
  const dropdownButtonRef = useRef(null);

    function onClickHandler(){
      console.log("hello");
      setisDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = (event) => {
      if (isDropdownOpen && !dropdownButtonRef.current.contains(event.target)) {
        setisDropdownOpen(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', closeDropdown);
      return () => {
        document.removeEventListener('mousedown', closeDropdown);
      };
    }, [isDropdownOpen]);

    return (
      <div className='randombar'>
        
        <div className='topBar' onClick={onClickHandler}>

          <img src={optionsImg} className='optionsImg' alt=''></img>

          <button className='button' >Display</button>  

          <img src={dropdownImg} className='optionsImg2' alt=''></img>        
          

        </div>
        {isDropdownOpen && <div ref={dropdownButtonRef} >
            <Dropdown order={props.order} grouping={props.grouping} setGroupingValue={props.setGroupingValue} setOrderingValue={props.setOrderingValue}/>
            </div>} 
      </div>
        
    );
}

export default Navbar;