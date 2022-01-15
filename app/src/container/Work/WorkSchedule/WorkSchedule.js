import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {mainAxios} from "../../../components/Axios/axios";
import {Button, Col, Container, Form, OverlayTrigger, Row, Tab, Table, Tabs, Tooltip} from "react-bootstrap";
import {ReactSVG} from 'react-svg';
import WorkDayModal from '../WorkDayModal/WorkDayModal'
import moment from "moment";
import EmployeeAddModal from "../EmployeeModal/EmployeeAddModal/EmployeeAddModal";
import Paginate from "../../../components/Pagination/Pagination";

const months = ['Yan', 'Fev', 'Mart', 'Apr', 'May', 'İyun', 'İyul', 'Avq', 'Sent', 'Okt', 'Nov', 'Dek']

function WorkSchedule() {
    const [firstDay, setFirstDay] = useState();
    const [weekdays, setWeekdays] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [employeeArr, setEmployeeArr] = React.useState(false);
    const [modalData, setModalData] = React.useState('');
    const [modalEmployee, setModalEmployee] = React.useState(false);

    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordSize, setRecordSize] = useState(15);

    let today = moment(new Date()).format('YYYY-MM-DD')


    const prevWeekDays = () => {
        let date = new Date(firstDay);
        date.setDate(date.getDate() - 7)
        setFirstDay(date)
    }

    const nextWeekDays = () => {
        let date = new Date(firstDay);
        date.setDate(date.getDate() + 7)
        setFirstDay(date)
    }

    const setData = (day) => {
        setModalData(day)
        setModalShow(true)
    }

    const setDays = (page) => {
        let arr = [];
        for (let i = 0; i <= 6; i++) {
            let date = new Date(firstDay);
            date.setDate(date.getDate() + i)
            arr[i] = {
                day: date.getDate(),
                month: date.getMonth(),
                date: moment(date).format('YYYY-MM-DD')
            }
        }
        setWeekdays(arr);
        getShiftSchedule(page, arr[0], arr[6])
    }

    const timeDiffer = (day, startTime, endTime) => {
        if (startTime !== null && endTime !== null) {
            let startDate = new Date(day.concat(" , ", startTime));
            let endDate = new Date(day.concat(" , ", endTime));
            if (endDate.getTime() > startDate.getTime()) {
                let timestampDiff = endDate.getTime() - startDate.getTime();
                let diffHour = Math.floor(new Date(timestampDiff) / (60 * 60 * 1000));
                let diffMinute = (new Date(timestampDiff) / (60000)) - diffHour * 60;
                return diffHour
            }
        }

    }

    const getShiftSchedule = (page, startDate, endDate) => {
        if (!isNaN(startDate.day)) {
            mainAxios({
                method: 'get',
                url: '/shift-schedule',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                params: {
                    page: page - 1,
                    endDate: endDate.date,
                    startDate: startDate.date,
                    size: recordSize,
                }
            }).then((res) => {
                setCurrentPage(page);
                setEmployeeArr(res.data.content);
                setTotalRecord(res.data.totalElements);

            });
        }
    }

    const sendData = (breakHour, jobOnOffDay, offDay, shiftFrom, shiftTo, repeatFrom, propsData) => {
        let data = {
            "breakHour": breakHour,
            "dayId": propsData.dayId,
            "employeeId": propsData.employeeId,
            "jobOnOffDay": jobOnOffDay,
            "offDay": offDay,
            "repeatFrom": repeatFrom,
            "shiftFrom": shiftFrom !== '' ? shiftFrom : null,
            "shiftTo": shiftTo !== '' ? shiftTo : null,
        }
        mainAxios({
            method: propsData.id !== null ? 'put' : 'post',
            url: propsData.id !== null ? `/shift-schedule/${propsData.id}` : '/shift-schedule',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            setModalShow(false);
            getShiftSchedule(currentPage, propsData.startDate, propsData.endDate)
        });
    }

    const getMonday = async () => {
        let d = new Date();
        let day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1);
        await setFirstDay(new Date(d.setDate(diff)));
    }

    useEffect(async () => {
        await getMonday();
    }, []);

    useEffect(() => {

        setDays(1);
    }, [firstDay])

    return (
        <Aux>
            {
                weekdays.length > 0 ? <div className="table-weekly-calendar">
                    <Container fluid>
                        <div className="title-block flex-vertical-center">
                            <Col xs={2}>
                                <div className="table-month flex">
                                    <button className="btn-transparent" onClick={() => prevWeekDays()}>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.8" clipPath="url(#clip0_2235_385)">
                                                <path
                                                    d="M2.8707 6.42826L8.26704 11.8228C8.50383 12.059 8.88747 12.059 9.12485 11.8228C9.36164 11.5866 9.36164 11.203 9.12485 10.9668L4.15654 6.00028L9.12425 1.03376C9.36104 0.797565 9.36104 0.413931 9.12425 0.177143C8.88747 -0.0590475 8.50323 -0.0590475 8.26645 0.177143L2.8701 5.57165C2.63695 5.80539 2.63695 6.19506 2.8707 6.42826Z"
                                                    fill="#193651"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2235_385">
                                                    <rect width="12" height="12" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                    <span>{weekdays[0].day} {months[weekdays[0].month]} - {weekdays[6].day} {months[weekdays[6].month]}</span>
                                    <button className="btn-transparent" onClick={() => nextWeekDays()}>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.8" clipPath="url(#clip0_2236_409)">
                                                <path
                                                    d="M9.1293 6.42826L3.73296 11.8228C3.49617 12.059 3.11253 12.059 2.87515 11.8228C2.63836 11.5866 2.63836 11.203 2.87515 10.9668L7.84346 6.00028L2.87575 1.03376C2.63896 0.797565 2.63896 0.413931 2.87575 0.177143C3.11253 -0.0590475 3.49677 -0.0590475 3.73355 0.177143L9.1299 5.57165C9.36305 5.80539 9.36305 6.19506 9.1293 6.42826Z"
                                                    fill="#193651"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_2236_409">
                                                    <rect width="12" height="12" fill="white"
                                                          transform="matrix(-1 0 0 1 12 0)"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                </div>
                            </Col>
                        </div>
                        <div className="table-striped p-0">
                            <Table responsive="sm">
                                <thead>
                                <tr>
                                    <th>İşçilər</th>
                                    <th>B.e {weekdays[0].day}</th>
                                    <th>Ç.a {weekdays[1].day}</th>
                                    <th>Ç {weekdays[2].day}</th>
                                    <th>C.a {weekdays[3].day}</th>
                                    <th>C {weekdays[4].day}</th>
                                    <th>Ş {weekdays[5].day}</th>
                                    <th>B {weekdays[6].day}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    Object.keys(employeeArr).length > 0 ?
                                        Object.keys(employeeArr).map((item, index) =>
                                            <tr key={index}>
                                                <td className="td-name">{item}</td>
                                                {
                                                    weekdays.length > 0 ?
                                                        weekdays.map((day, dayIndex) =>
                                                            <td className={[today !== day.date ? '' : 'td-today', 'td-weekday'].join(' ')}
                                                                onClick={() => setData(Object.assign(employeeArr[item][day.date],
                                                                    {startDate: weekdays[0]}, {endDate: weekdays[6]},
                                                                    {name: item},
                                                                    {weekday: `${day.day} ${months[day.month]}`},
                                                                    {today: day.date}
                                                                ))}
                                                                key={dayIndex}>
                                                                {
                                                                    employeeArr[item][day.date] !== undefined ?
                                                                        employeeArr[item][day.date].offDay ?
                                                                            <span className="td-holiday">İstirahət <br/> günü </span>
                                                                            :
                                                                            <>
                                                                                {
                                                                                    employeeArr[item][day.date].shiftFrom !== null ?
                                                                                        <span
                                                                                            className="flex">{employeeArr[item][day.date].shiftFrom} - {employeeArr[item][day.date].shiftTo}</span>
                                                                                        : null
                                                                                }
                                                                                {
                                                                                    timeDiffer(day.date, employeeArr[item][day.date].shiftFrom, employeeArr[item][day.date].shiftTo) > 0 ?
                                                                                        <span className="td-hour">
                                                                                              { timeDiffer(day.date, employeeArr[item][day.date].shiftFrom, employeeArr[item][day.date].shiftTo)} saat
                                                                                        </span>
                                                                                        : null
                                                                                }

                                                                                {
                                                                                    employeeArr[item][day.date].shiftType !== null ?
                                                                                        <ReactSVG
                                                                                            src={require(`../../../assets/img/${employeeArr[item][day.date].shiftType}.svg`).default}
                                                                                            wrapper="span"
                                                                                            className="wrapper-svg"/>
                                                                                        : null
                                                                                }
                                                                            </>
                                                                        : null
                                                                }

                                                            </td>
                                                        )
                                                        : null
                                                }
                                            </tr>
                                        )
                                        : null
                                }
                                </tbody>
                            </Table>
                            <WorkDayModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                data={modalData}
                                click={(breakHour, jobOnOffDay, offDay, shiftFrom, shiftTo, repeatFrom, propsData) => {
                                    sendData(breakHour, jobOnOffDay, offDay, shiftFrom, shiftTo, repeatFrom, propsData)
                                }}
                            />
                            <EmployeeAddModal
                                show={modalEmployee}
                                onHide={() => setModalEmployee(false)}
                                data={modalData}
                                click={(breakHour, jobOnOffDay, offDay, shiftFrom, shiftTo, repeatFrom, propsData) => {
                                    sendData(breakHour, jobOnOffDay, offDay, shiftFrom, shiftTo, repeatFrom, propsData)
                                }}
                            />
                        </div>
                        <Paginate count={totalRecord} recordSize={recordSize} currentPage={currentPage}
                                  click={(page) => setDays(page)}/>
                    </Container>
                </div> : ''
            }
        </Aux>
    );
}

export default WorkSchedule
