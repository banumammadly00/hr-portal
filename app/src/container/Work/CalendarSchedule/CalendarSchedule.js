import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
import 'react-big-scheduler/lib/css/style.css'


function WorkSchedule() {

    const [days, setDays] = useState([]);
    const [events, setEvents] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalData, setModalData] = useState()
    const [modalEventShow, setModalEventShow] = React.useState(false);


    useEffect(() => {
    }, []);

    return (
        <Aux>
            <div className="calendar">

            </div>
        </Aux>
    );
}

export default WorkSchedule
