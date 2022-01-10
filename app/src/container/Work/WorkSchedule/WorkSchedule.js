import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import "@fullcalendar/daygrid/main.css";
import {mainAxios} from "../../../components/Axios/axios";
import CalendarDayModal from "../../Setting/CalendarModal/CalendarDayModal";
import CalendarEventModal from "../../Setting/CalendarModal/CalendarEventModal";

function WorkSchedule() {

    const [days, setDays] = useState([]);
    const [events, setEvents] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalData, setModalData] = useState()
    const [modalEventShow, setModalEventShow] = React.useState(false);

    const getDay = (year, month) => {
        mainAxios({
            method: 'get',
            url: '/days',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                month: month,
                year: year
            }
        }).then((res) => {
            let data = res.data;
            let events = [];
            if (data) {
                for (let i of data) {
                    setDays(data)
                    if (i.holiday === true) {
                        events.push({
                            display: 'background',
                            date: i.date,
                            title: i.description === null ? " " : i.description,
                            id: i.id
                        })
                    }
                }
            }
            setEvents(events);
        });
    }

    const changeDayEvent = (id, title, holiday, day) => {
        let year = new Date(day).getFullYear();
        let month = (new Date(day).getMonth() + 1)
        let data = {
            "holiday": holiday,
            "description": title === "" ? null : title
        }
        mainAxios({
            method: 'put',
            url: '/days/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data

        }).then((res) => {
            getDay(year, month)
            setModalShow(false);
            setModalEventShow(false)
        });
    }

    const getDayEvent = (date) => {
        for (let i of days) {
            if (i.date === date)
                return i
        }

    }

    const handleDateClick = (arg) => { // bind with an arrow function
        let day = getDayEvent(arg.dateStr);
        setModalData(day)
        if (day.holiday) {
            setModalEventShow(true)
        } else {
            setModalShow(true)
        }
    }

    useEffect(() => {
    }, []);

    return (
        <Aux>
            <div className="calendar">
                <FullCalendar
                    plugins={[ dayGridPlugin ] }
                    initialView="dayGridWeek"
                    dateClick={handleDateClick}
                    events={events}
                    header={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                    }}
                    datesSet={(dateInfo) => {
                        let year = dateInfo.start.getFullYear();
                        let month = (dateInfo.start.getMonth() + 1);
                        getDay(year, month)
                    }}
                />
                <CalendarDayModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    data={modalData}
                    click={(id, title, holiday, day) => {
                        changeDayEvent(id, title, holiday, day)
                    }}
                />
                <CalendarEventModal
                    show={modalEventShow}
                    data={modalData}
                    click={(id, title, holiday, day) => {
                        changeDayEvent(id, title, holiday, day)
                    }}
                    onHide={() => setModalEventShow(false)}
                />
            </div>
        </Aux>
    );
}

export default WorkSchedule
