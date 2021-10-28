import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import "@fullcalendar/daygrid/main.css";
import {mainAxios} from "../../../components/Axios/axios";
import CalendarDayModal from "../CalendarModal/CalendarDayModal";
import CalendarEventModal from "../CalendarModal/CalendarEventModal";

function Calendar() {

    const [days, setDays] = useState([]);
    const [events, setEvents] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalData, setModalData] = useState()
    const [modalEventShow, setModalEventShow] = React.useState(false);

    const getDay = (year, month) => {
        mainAxios({
            method: 'get',
            url: '/day',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                month: month,
                year: year
            }
        }).then((res) => {
            let data = res.data.data;
            let events = [];
            for (let i of data) {
                setDays(data)
                if (i.jobDay === false) {
                    events.push({display: 'background', date: i.day, title: i.title === null ? " " : i.title, id: i.id})
                }
            }
            setEvents(events);
        });
    }

    const changeDayEvent = (id, title, jobDay,day) => {
        let year = new Date(day).getFullYear();
        let month = (new Date(day).getMonth() + 1 )
        console.log(day)
        let data = {
            "jobDay": jobDay,
            "text": title === "" ? null : title
        }
        mainAxios({
            method: 'put',
            url: '/day/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data

        }).then((res) => {
            getDay(year,month)
            setModalShow(false);
            setModalEventShow(false)
        });
    }

    const getDayEvent = (date) => {
        for (let i of days) {
            if (i.day === date)
                return i
        }
    }

    const handleDateClick = (arg) => { // bind with an arrow function
        let day = getDayEvent(arg.dateStr);
        setModalData(day)
        if (day.jobDay) {
            setModalShow(true)
        } else {
            setModalEventShow(true)
        }
    }

    useEffect(() => {
    }, []);

    return (
        <Aux>
            <div className="calendar">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dateClick={handleDateClick}
                    showNonCurrentDates={false}
                    fixedWeekCount={false}
                    firstDay={1}
                    events={events}
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
                    click ={(id, title, jobDay, day) => {changeDayEvent(id, title, jobDay, day)}}
                />
                <CalendarEventModal
                    show={modalEventShow}
                    data={modalData}
                    click ={(id, title, jobDay, day) => {changeDayEvent(id, title, jobDay, day)}}
                    onHide={() => setModalEventShow(false)}
                />
            </div>
        </Aux>
    );
}

export default Calendar
