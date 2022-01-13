import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import {Col, Form, Row} from "react-bootstrap";
import TimePicker from "react-time-picker";


function WorkDayModal(props) {
    console.log(props);
    const [checkHoliday, setCheckHoliday] = useState(false);
    const [checkRepeat, setCheckRepeat] = useState(false);
    const [checkBreak, setCheckBreak] = useState(false);
    const [checkOverTime, setCheckOverTime] = useState(false);
    const [day, setDay] = useState(props.data.repeatFrom);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [workHour, setWorkHour] = useState('');

    useEffect(() => {
        console.log(props);
        console.log(props.weekday)
        setCheckHoliday(props.data.offDay);
        setCheckBreak(props.data.breakHour);
        setCheckOverTime(props.data.jobOnOffDay);
        setDay(props.data.repeatFrom);
        setStartTime(props.data.shiftFrom);
        setEndTime(props.data.shiftTo);
    }, [props.data.offDay, props.data.breakHour, props.data.jobOnOffDay, props.data.repeatFrom, props.data.shiftFrom, props.data.shiftTo])

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            className="modal-work-schedule"
            centered>
            <Modal.Body>
                <h4> {props.data.name}, {props.data.weekday} </h4>
                <div className="holiday-in">
                    <div className="check-content flex-center">
                        <div className="check-block">
                            <label className="check-button">
                                <input type="checkbox"
                                       checked={checkHoliday}
                                       onChange={(e) => {
                                           setCheckHoliday(e.target.checked);
                                           setCheckRepeat(false);
                                           setDay('')
                                       }}/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <span>İstirahət   günü</span>
                    </div>
                </div>
                {
                    checkHoliday ?
                        <div className="repeat-block flex-center">
                            Hər
                            <Form.Group className="form-group">
                                <Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={day}
                                        onChange={(e => setDay(e.target.value))}/>
                                </Form.Label>
                            </Form.Group>
                            gündən bir
                        </div>
                        :
                        <div className="work-schedule-data">
                            <div className="flex work-hours-content">
                                <Col xs={6}>
                                    <div className="work-hours-block flex-end">
                                        <Form.Group className="form-group m-0 w-100">
                                            <span className="input-title">Tarixdən</span>
                                            <Form.Label className="relative m-0">
                                                <TimePicker
                                                    onChange={(val) => {
                                                        setStartTime(val);
                                                    }}
                                                    disableClock={true}
                                                    clearIcon={false}
                                                    value={startTime}
                                                />
                                            </Form.Label>
                                        </Form.Group>
                                        <span className="break-line"></span>
                                        <Form.Group className="form-group  m-0 w-100">
                                            <span className="input-title">Tarixə</span>
                                            <Form.Label>
                                                <TimePicker
                                                    onChange={(val) => {
                                                        setEndTime(val);
                                                    }}
                                                    disableClock={true}
                                                    clearIcon={false}
                                                    value={endTime}
                                                />
                                            </Form.Label>
                                        </Form.Group>
                                    </div>
                                </Col>
                                <Col xs={4}>
                                    <Form.Group className="form-group m-0 w-100">
                                        <span className="input-title">Toplam iş saatı</span>
                                        <Form.Label className="relative m-0">
                                            <Form.Control
                                                type="number"
                                                value={workHour}
                                                placeholder="iş saatı"
                                                disabled={true}/>
                                        </Form.Label>
                                    </Form.Group>
                                </Col>
                            </div>
                            <div className="flex-wrap flex">
                                <Col xs={6}>
                                    <div className="check-content flex-center">
                                        <div className="check-block">
                                            <label className="check-button">
                                                <input type="checkbox"
                                                       checked={checkBreak}
                                                       onChange={(e) => {
                                                           setCheckBreak(e.target.checked);
                                                       }}/>
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <span>Fasilə</span>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="check-content flex-center">
                                        <div className="check-block">
                                            <label className="check-button">
                                                <input type="checkbox"
                                                       checked={checkOverTime}
                                                       onChange={(e) => {
                                                           setCheckOverTime(e.target.checked);
                                                       }}/>
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <span>Əlavə iş saatı</span>
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="check-content flex-center">
                                        <div className="check-block">
                                            <label className="check-button">
                                                <input type="checkbox"
                                                       checked={checkRepeat}
                                                       onChange={(e) => {
                                                           setCheckRepeat(e.target.checked);
                                                       }}/>
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <span>Təkrarla</span>
                                    </div>
                                </Col>
                            </div>
                            {
                                checkRepeat ?
                                    <div className="repeat-block flex-center">
                                        Hər
                                        <Form.Group className="form-group">
                                            <Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={day}
                                                    onChange={(e => setDay(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                        gündən bir
                                    </div>
                                    : null
                            }
                        </div>
                }
                <ul className="btn-block flex-end list-unstyled">
                    <li>
                        <button type="button" className="btn-main-border" onClick={props.onHide}>
                            Bağla
                        </button>
                    </li>
                    <li>
                        <button type="button" className="btn-main" onClick={() => {
                            props.click(checkBreak, checkOverTime, checkHoliday, startTime, endTime, day, props.data)
                        }}>
                            Əlavə et
                        </button>
                    </li>
                </ul>
            </Modal.Body>
        </Modal>
    );
}

export default WorkDayModal
