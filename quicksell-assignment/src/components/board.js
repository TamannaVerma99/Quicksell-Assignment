import React from 'react'
import { useEffect, useState } from 'react';
import Card from './Card.js'
import '../styles/Status.css'
import plusmore from '../assets/plusmore.png'
import nopriorityimg from '../assets/nopriority.png'
const  Board=()=> {
    const [todoticketsets, settodoticketsets] = useState();
    const [tickets, settickets] = useState([{ "id": "CAM" }]);
    const [countticketsetStatusesInProgress, setcountticketsetStatusesInProgress] = useState(0);
    const [countticketsetStatusesDone, setcountticketsetStatusesDone] = useState(0);
    const [countticketsetStatusesCancelled, setcountticketsetStatusesCancelled] = useState(0);
    const [backlog, setbacklog] = useState(0);

    // Fetching ticketsets and count statuses on component mount
    useEffect(() => {
        fetchticketsets();
        countticketsetStatuses();
    }, []);

   // Fetching ticketsets from the API
    async function fetchticketsets() {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const result = await response.json();
            settickets(result.ticketsets);
            console.log("ticketsets", tickets);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Counting the statuses of the ticketsets
    function countticketsetStatuses() {
        tickets.map((ticketset) => {
            if (ticketset.status === "Todo") {
                settodoticketsets(todoticketsets + 1)
                console.log("smd")
            }
            if (ticketset.status === "In Progress") setcountticketsetStatusesInProgress(countticketsetStatusesInProgress + 1)
            if (ticketset.status === "Done") setcountticketsetStatusesDone(countticketsetStatusesDone + 1);
            if (ticketset.status === "countticketsetStatusesCancelled") setcountticketsetStatusesCancelled(countticketsetStatusesCancelled + 1);
            if (ticketset.status === "backlog") setbacklog(backlog + 1);
            console.log("todoticketsets");
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
                        tickets.length > 0 &&
                        tickets.map((ticketset) => {
                            return (
                                (ticketset.priority === 0 && <Card  ticketset={ticketset}></Card>)
                            )
                        })     
                    }
                </div>
            </div>
  )
}
export default Board;
