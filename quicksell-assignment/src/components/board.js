import React from 'react'
import { useEffect, useState } from 'react';
import Card from './Card.js'
import '../styles/Status.css'
import plusmore from '../assets/plusmore.png'
import nopriorityimg from '../assets/nopriority.png'
const  Board=()=> {
    const [todono, settodono] = useState();
    const [tick, setTick] = useState([{ "id": "CAM" }]);
    const [countTicketStatusesInProgress, setcountTicketStatusesInProgress] = useState(0);
    const [countTicketStatusesDone, setcountTicketStatusesDone] = useState(0);
    const [countTicketStatusesCancelled, setcountTicketStatusesCancelled] = useState(0);
    const [backlog, setbacklog] = useState(0);
   

    useEffect(() => {

        fetchTickets();
        countTicketStatuses();


    }, []);
   // Fetching tickets from the API
    async function fetchTickets() {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const result = await response.json();
            setTick(result.tickets);
            console.log("tickets", tick);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    // Counting the statuses of the tickets
    function countTicketStatuses() {
        tick.map((ticket) => {
            if (ticket.status === "Todo") {
                settodono(todono + 1)
                console.log("smd")
            }
            if (ticket.status === "In Progress") setcountTicketStatusesInProgress(countTicketStatusesInProgress + 1)
            if (ticket.status === "Done") setcountTicketStatusesDone(countTicketStatusesDone + 1);
            if (ticket.status === "countTicketStatusesCancelled") setcountTicketStatusesCancelled(countTicketStatusesCancelled + 1);
            if (ticket.status === "backlog") setbacklog(backlog + 1);
            console.log("todono");
        })


    }
  return (
    <div className='Board'>
                <div className='boardHeading'>
                    <img src={nopriorityimg} className='headingImg' alt=''></img>
                    <p className='cText' style={{width: "190px"}} >No-Priority</p>
                    <p className='cText'>{backlog}</p>
                    <div className='boardHeading' id='pluske'>
                        <img src={plusmore} className='headingImg' alt=''></img>
                    </div>
                </div>
                <div className='Cards'>
                    {
                        tick.length > 0 &&
                        tick.map((ticket) => {
                            return (
                                (ticket.priority === 0 && <Card  ticket={ticket}></Card>)
                            )
                        })     
                    }
                </div>
            </div>
  )
}
export default Board;
