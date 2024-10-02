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
    const [tick, setTick] = useState([]);
    const [inProgressno, setinProgressno] = useState([]);
    const [doneno, setdoneno] = useState([]);
    const [cancelled, setcancelled] = useState([]);
    const [backlog, setbacklog] = useState([]);
    const [Order, setOrder] = useState(localStorage.getItem('order'));
    const [users, setusers] = useState([]);
    let available = true;
    const [todonum, setTodonum] = useState([]);

    // Fetching data from the API
    useEffect(() => {
        fetchData();
    }, []);

    // Filtering and sorting tickets based on their status
    useEffect(() => {
        filterAndSortTickets();
    }, [tick, Order]);

    useEffect(() => {
        setOrder(localStorage.getItem('order'));

    }, [localStorage.getItem('order')])

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
    function filterAndSortTickets() {
        let todoList = [];
        let doneList = [];
        let cancelledList = [];
        let backlogList = [];
        let inProgressList = [];
        tick.map((ticket) => {

            if (ticket.status === "Todo") todoList.push(ticket);
            if (ticket.status === "Done") doneList.push(ticket);
            if (ticket.status === "cancelled") cancelledList.push(ticket);
            if (ticket.status === "Backlog") backlogList.push(ticket);
            if (ticket.status === "In progress") inProgressList.push(ticket);

        }

        )

        // Sort based on the selected order (Title or Priority)
        if (Order === "Title") {
            todoList.sort((a, b) => a.title.localeCompare(b.title));
            inProgressList.sort((a, b) => a.title.localeCompare(b.title));
            backlogList.sort((a, b) => a.title.localeCompare(b.title));
            doneList.sort((a, b) => a.title.localeCompare(b.title));
            cancelledList.sort((a, b) => a.title.localeCompare(b.title));

            setTodonum(todoList);
            setbacklog(backlogList);
            setcancelled(cancelledList);
            setdoneno(doneList);
            setinProgressno(inProgressList);
        }
        else {
            todoList.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
            inProgressList.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
            backlogList.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
            doneList.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
            cancelledList.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));

            setTodonum(todoList);
            setbacklog(backlogList);
            setcancelled(cancelledList);
            setdoneno(doneList);
            setinProgressno(inProgressList);
        }
        setTodonum(todoList);
        setbacklog(backlogList);
        setcancelled(cancelledList);
        setdoneno(doneList);
        setinProgressno(inProgressList);

    }
    // Rendering each status column with tickets
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