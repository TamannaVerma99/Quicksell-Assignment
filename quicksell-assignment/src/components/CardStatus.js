import React, { useEffect, useState } from 'react';
import '../styles/Card.css';
import tag from '../assets/tag.png'
import img0 from '../assets/priority.png'
import img4 from '../assets/urgent.png'
import img3 from '../assets/high.png'
import img2 from '../assets/medium.png'
import img1 from '../assets/low.png'
import done from '../assets/Done.png'
import Cancelled from '../assets/canceled.png'
import backlogimg from '../assets/backlog.png'
import inprogressimg from '../assets/in progress.png'
import todo from '../assets/to do.png'
import usr1 from '../assets/usr-1.png'
import usr2 from '../assets/usr-2.png'
import usr3 from '../assets/usr-3.png'
import usr4 from '../assets/usr-4.png'
import usr5 from '../assets/usr-5.png'

const CardStatus = (props) => {
    const [available, setavailable] = useState(false);
    let dotuser;
    const [users, setusers] = useState([]);
    const [tick, setTick] = useState([]);

// Fetch user data on component mount
    useEffect(() => {
        fetchUserData();
    }, []);

// Fetch user and ticket data from the API
    async function fetchUserData() {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");

            const result = await response.json();

        setTick(result.tickets);
        setusers(result.users);
        } catch (error) {
            console.error("Error:", error);
        }
    }

// Maps for priority and status images
    const priorityImageMap = {
        0: img0,
        1: img1,
        2: img2,
        3: img3,
        4: img4,
      };
    const statusImageMap={
        "Todo": todo,
        "In progress":inprogressimg,
        "Backlog":backlogimg,
        "Done":done,
        "Cancelled":Cancelled,

    }
    const usrImageMap = {
        "usr-1": usr1,
        "usr-2": usr2,
        "usr-3": usr3,
        "usr-4": usr4,
        "usr-5": usr5,
      };

    // Update availability based on selected user
      useEffect(() => {
        users.map((user) => {
                               
            if(
                props.ticket &&
                 user.id === props.ticket.userId){
                    setavailable(user.available);
                
            }  })   
      }, [users])
      
    // Determine images for user, priority, and status 
      const usrImage=usrImageMap[props.ticket.userId]||usr1;
      const imgSrc = priorityImageMap[props.ticket.priority] || img0;
    
    // Conditional rendering of user availability 
    if(available===true){
        dotuser=<div className='availableUser' />;
    }else{
        dotuser=<div className='notavailableUser' />;
    }
   
    

    return (
        <div className='cardBox'>
            <div className='cardBoxrow'>
                <div className='cardBoxin'>
                    <text className='cardId'>{props.ticket.id}</text>
                    <text className='cardTitle'>
                        {props.ticket.title}</text>
                </div >
                <div style={{ height: "38px" }}>
                    <img className='userImg' src={usrImage} alt='' />
                    {dotuser}
                </div>
            </div>


            <div className='lowerBox'>
                <div className='priorityBox'><img className='priorityImg' src={imgSrc} alt='logo' /></div>
                <div className='tagBox'>
                    <img className='tagImg' src={tag} alt='logo' />
                    <tag className='tagText'>{props.ticket.tag}</tag>
                </div>

            </div>
        </div>
    );
};

export default CardStatus;