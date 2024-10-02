import React, { useEffect, useState } from 'react';
import '../styles/Card.css';
import tag from '../assets/tag.png'
import priorityImg from '../assets/priority.png'
import img4 from '../assets/urgent.png'
import highImg from '../assets/high.png'
import mediumImg from '../assets/medium.png'
import lowImg from '../assets/low.png'
import doneImg from '../assets/Done.png'
import cancelledImg from '../assets/canceled.png'
import backlogImg from '../assets/backlog.png'
import inProgressImg from '../assets/in progress.png'
import todoImg from '../assets/to do.png'
import usr1 from '../assets/usr-1.png'
import usr2 from '../assets/usr-2.png'
import usr3 from '../assets/usr-3.png'
import usr4 from '../assets/usr-4.png'
import usr5 from '../assets/usr-5.png'



const Card = (props) => {
    const [available, setavailable] = useState(false);
    let dotuser; 
    const [users, setusers] = useState([]);

    // Fetching users on component mount
    useEffect(() => {
         fetchUsers();
    }, []);

    // Fetching users from the API
    async function  fetchUsers() {
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
        0: priorityImg,
        1: lowImg,
        2: mediumImg,
        3: highImg,
        4: img4,
      };
    const statusImageMap={
        "todoImg": todoImg,
        "In progress":inProgressImg,
        "Backlog":backlogImg,
        "doneImg":doneImg,
        "cancelledImg":cancelledImg,

    }
    const usrImageMap = {
        "usr-1": usr1,
        "usr-2": usr2,
        "usr-3": usr3,
        "usr-4": usr4,
        "usr-5": usr5,
   
      };

      // Effect to check user availability based on ticket userId
      useEffect(() => {
        users.map((user) => {
                               
            if(
                props.ticket &&
                 user.id === props.ticket.userId){
                    setavailable(user.available);
                
            }  })   
      }, [users])
      
      //Determine the images for user, priority, and status
      const usrImage=usrImageMap[props.ticket.userId]||usr1;
      const imgSrc = priorityImageMap[props.ticket.priority] || priorityImg;
      const statusImgSrc=statusImageMap[props.ticket.status]||todoImg;
    
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
                    <text className='cardTitle'><img  src={statusImgSrc} ></img>{props.ticket.title}</text>
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

export default Card;