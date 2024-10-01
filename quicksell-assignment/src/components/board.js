import React from 'react'
import { useEffect, useState } from 'react';
import Card from './Card.js'
import '../styles/Status.css'
import plusmore from '../assets/plusmore.png'

const  Board=(props)=> {
    const [todono, settodono] = useState();
    const [tick, setTick] = useState([{ "id": "CAM" }]);
    const [countInProgress, setcountInProgress] = useState(0);
    const [countDone, setcountDone] = useState(0);
    const [countCancelled, setcountCancelled] = useState(0);
    const [backlog, setbacklog] = useState(0);
    const [todonum, setTodonum] = useState(0);

    useEffect(() => {

        hello();
        count();


    }, []);

    async function hello() {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
            const result = await response.json();
            setTick(result.tickets);
            console.log("tickets", tick);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    function count() {
        tick.map((ticket) => {
            if (ticket.status === "Todo") {
                settodono(todono + 1)
                console.log("smd")
            }
            if (ticket.status === "In Progress") setcountInProgress(countInProgress + 1)
            if (ticket.status === "Done") setcountDone(countDone + 1);
            if (ticket.status === "countCancelled") setcountCancelled(countCancelled + 1);
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
