import React from 'react'
import todo from '../assets/to do.png'
import { useEffect, useState } from 'react';
import '../styles/Status.css'
import plusmore from '../assets/plusmore.png'
import done from '../assets/Done.png'
import Cancelled from '../assets/canceled.png'
import backlogimg from '../assets/backlog.png'
import inprogressimg from '../assets/in progress.png'
import CardStatus from './CardStatus';


const Status = (props) => {
    const [tick, setTick] = useState([]);// All tickets fetched from the API
    // Grouped tickets by status
    const [inProgressno, setinProgressno] = useState([]);
    const [doneno, setdoneno] = useState([]);
    const [cancelled, setcancelled] = useState([]); 
    const [backlog, setbacklog] = useState([]);
    const [Order, setOrder] = useState(localStorage.getItem('order'));// Order state for sorting
    const [users, setusers] = useState([]);// User data fetched from the API
    let available = true;
    const [todonum, setTodonum] = useState([]);

    // Fetch ticket and user data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Group and sort tickets whenever tickets or order changes
    useEffect(() => {
        groupAndSortTickets();
    }, [tick, Order]);

    useEffect(() => {
        setOrder(localStorage.getItem('order'));

    }, [localStorage.getItem('order')])

    // Function to fetch data from the API
    async function fetchData() {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");

            const result = await response.json();

            setTick(result.tickets);
            setusers(result.users);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Function to group and sort tickets based on their status
    function groupAndSortTickets() {
        let todopre = [];
        let donepre = [];
        let cancelledpre = [];
        let backlogpre = [];
        let inprogresspre = [];
        tick.map((ticket) => {
            if (ticket.status === "Todo") todopre.push(ticket);
            if (ticket.status === "Done") donepre.push(ticket);
            if (ticket.status === "cancelled") cancelledpre.push(ticket);
            if (ticket.status === "Backlog") backlogpre.push(ticket);
            if (ticket.status === "In progress") inprogresspre.push(ticket);

        }
        )
        if (Order === "Title") {
            todopre.sort((a, b) => a.title.localeCompare(b.title));
            inprogresspre.sort((a, b) => a.title.localeCompare(b.title));
            backlogpre.sort((a, b) => a.title.localeCompare(b.title));
            donepre.sort((a, b) => a.title.localeCompare(b.title));
            cancelledpre.sort((a, b) => a.title.localeCompare(b.title));

            setTodonum(todopre);
            setbacklog(backlogpre);
            setcancelled(cancelledpre);
            setdoneno(donepre);
            setinProgressno(inprogresspre);
        } else {

            todopre.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
            inprogresspre.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
            backlogpre.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
            donepre.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
            cancelledpre.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));

            setTodonum(todopre);
            setbacklog(backlogpre);
            setcancelled(cancelledpre);
            setdoneno(donepre);
            setinProgressno(inprogresspre);
        }

        setTodonum(todopre);
        setbacklog(backlogpre);
        setcancelled(cancelledpre);
        setdoneno(donepre);
        setinProgressno(inprogresspre);

    }

    return (
        <div className='Boards'>
            <div className='Board'>
                <div className='boardHeading'>
                    <img src={backlogimg} className='headingImg' alt=''></img>
                    <p className='cText'>Backlog</p>
                    <p className='cText'>{backlog.length}</p>
                    <div className='boardHeading' id='pluske'>

                        <img src={plusmore} className='headingImg' alt=''></img>
                    </div>


                </div>

                <div className='Cards'>
              {
                        backlog.length > 0 &&
                        backlog.map((ticket) => {
                            users.map((item) => {

                                if (
                                    ticket &&
                                    item.id === ticket.userId) {
                                    available = item.available;
                                }

                            })
                            return (
                                (ticket.status === "Backlog" && <CardStatus ticket={ticket} available={available}></CardStatus>)
                            )
                        })
                    }
                </div>

            </div>
            <div className='Board'>
                <div className='boardHeading'>
                    <img src={todo} className='headingImg' alt=''></img>
                    <p className='cText'>Todo</p>
                    <p className='cText'>{todonum.length}</p>
                    <div className='boardHeading' id='pluske'>

                        <img src={plusmore} className='headingImg' alt=''></img>
                    </div>


                </div>

                <div className='Cards'>

                    {
                        todonum.length > 0 &&
                        todonum.map((ticket) => {
                            users.map((item) => {

                                if (
                                    ticket &&
                                    item.id === ticket.userId) {
                                    available = item.available;
                                }

                            })
                            return (
                                (ticket.status === "Todo" && <CardStatus ticket={ticket} available={available}></CardStatus>)
                            )
                        })
                    }
                </div>

            </div>
            <div className='Board'>
                <div className='boardHeading'>

                    <img src={inprogressimg} className='headingImg' alt=''></img>
                    <p className='cText' style={{ width: "190px" }}>In-Progress</p>
                    <p className='cText'>{inProgressno.length}</p>
                    <div className='boardHeading' id='pluske'>

                        <img src={plusmore} className='headingImg' alt=''></img>
                    </div>

                </div>

                <div className='Cards'>
                    {
                        inProgressno.length > 0 &&
                        inProgressno.map((ticket) => {
                            users.map((item) => {

                                if (
                                    ticket &&
                                    item.id === ticket.userId) {
                                    available = item.available;
                                }

                            })
                            return (
                                (ticket.status === "In progress" && <CardStatus ticket={ticket} available={available}></CardStatus>)
                            )
                        })
                    }
                </div>

            </div>
            <div className='Board'>
                <div className='boardHeading'>
                    <img src={done} className='headingImg' alt=''></img>
                    <p className='cText'>Done</p>
                    <p className='cText'>{doneno.length}</p>
                    <div className='boardHeading' id='pluske'>

                        <img src={plusmore} className='headingImg' alt=''></img>
                    </div>
                </div>
                <div className='Cards'>
                    {
                        doneno.length > 0 &&
                        doneno.map((ticket) => {
                            users.map((item) => {

                                if (
                                    ticket &&
                                    item.id === ticket.userId) {
                                    available = item.available;

                                }

                            })
                            return (
                                (ticket.status === "Done" && <CardStatus ticket={ticket} available={available}></CardStatus>)
                            )
                        })
                    }
                </div>

            </div>
            <div className='Board'>
                <div className='boardHeading'>
                    <img src={Cancelled} className='headingImg' alt=''></img>
                    <p className='cText'>Canceled</p>
                    <p className='cText'>{cancelled.length}</p>
                    <div className='boardHeading' id='pluske'>

                        <img src={plusmore} className='headingImg' alt=''></img>
                    </div>


                </div>

                <div className='Cards'>

                    {
                        cancelled.length > 0 &&
                        cancelled.map((ticket) => {
                            users.map((item) => {

                                if (
                                    ticket &&
                                    item.id === ticket.userId) {
                                    available = item.available;

                                }

                            })
                            return (
                                (ticket.status === "Cancelled" && <CardStatus ticket={ticket} available={available}></CardStatus>)
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Status