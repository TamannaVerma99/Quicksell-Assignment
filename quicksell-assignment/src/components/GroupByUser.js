import React, { useEffect, useState } from 'react';
import '../styles/Status.css';
import plusmore from '../assets/plusmore.png';
import CardUser from './CardUser.js';
import availableImg from '../assets/availableimg.png';
import notAvailableImg from '../assets/notavailableimg.png';
import usr1 from '../assets/usr-1.png';
import usr2 from '../assets/usr-2.png';
import usr3 from '../assets/usr-3.png';
import usr4 from '../assets/usr-4.png';
import usr5 from '../assets/usr-5.png';

const ByUser = ({ order }) => {
  const [tickets, setTickets] = useState([]);// State to hold fetched tickets
  const [users, setUsers] = useState([]);// State to hold fetched users
  const [userTickets, setUserTickets] = useState([]);// State to hold grouped tickets by user
  
  // Map for user images based on user ID
  const usrImageMap = {
    "usr-1": usr1,
    "usr-2": usr2,
    "usr-3": usr3,
    "usr-4": usr4,
    "usr-5": usr5,
  };

  // Fetching tickets and users from the API
  useEffect(() => {
    fetchTickets();
  }, []);

  // Recalculating tickets based on user grouping and sorting
  useEffect(() => {
    groupTicketsByUser();
  }, [tickets, users, order]);

  // Fetching tickets and users from the API
  const fetchTickets = async () => {
    try {
      const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
      const result = await response.json();
      setTickets(result.tickets);
      setUsers(result.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Grouping tickets by user and apply sorting
  const groupTicketsByUser = () => {
    const groupedTickets = users.map(user => {
      let userSpecificTickets = tickets.filter(ticket => ticket.userId === user.id);

      // Sorting based on the selected order (Title or Priority)
      if (order === "Title") {
        userSpecificTickets.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        userSpecificTickets.sort((a, b) => b.priority - a.priority);
      }

      return {
        user,
        tickets: userSpecificTickets,
      };
    });

    setUserTickets(groupedTickets);
  };

  return (
    <div className='Boards'>
      {userTickets.map(({ user, tickets }) => {
        const available = user.available;
        const userImage = usrImageMap[user.id] || usr1; 

        return (
          <div className='Board' key={user.id}>
            <div className='boardHeading'>
              <img src={userImage} className='headingImg2' alt='' />
              <p className='cText' style={{ width: "500px" }}>{user.name}</p>
              <p className='cText'>{tickets.length}</p>
              
              <img src={available ? availableImg : notAvailableImg} className='dot' alt='Availability status' />
              
              <div className='boardHeading' id='pluske'>
                <img src={plusmore} className='headingImg' alt='More options' />
              </div>
            </div>

            <div className='Cards'>
              {tickets.length > 0 && tickets.map(ticket => (
                <CardUser key={ticket.id} ticket={ticket} available={available} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ByUser;
