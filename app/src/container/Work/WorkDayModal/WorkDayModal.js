import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import {Col, Form} from "react-bootstrap";
import TimePicker from "react-time-picker";

function WorkDayModal(props) {
    const [checkHoliday, setCheckHoliday] = useState(false);
    const [checkRepeat, setCheckRepeat] = useState(props.data.repeatFrom !== null ? 1 : 0);
    const [checkBreak, setCheckBreak] = useState(props.data.breakHour);
    const [checkOverTime, setCheckOverTime] = useState(props.data.jobOnOffDay);
    const [day, setDay] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [checkChangeTime, setCheckChangeTime] = useState(props.data.changeTime);
    const [workHour, setWorkHour] = useState(props.data.workHour !== undefined ? props.data.workHour : '');

    const setBreakHour = async (checkBreak) => {
        if (props.data.workHour !== undefined) {
            checkChangeTime ?
                checkBreak ? await setWorkHour(workHour - 1) : await setWorkHour(workHour + 1)
                :
                checkBreak ? await setWorkHour(props.data.workHour - 1) : await setWorkHour(props.data.workHour);
        }
    }

    useEffect(async () => {
        setCheckHoliday(props.data.offDay);
        setCheckBreak(props.data.breakHour);
        setCheckOverTime(props.data.jobOnOffDay);
        setDay(props.data.repeatFrom);
        setCheckRepeat(props.data.repeatFrom !== null ? 1 : 0);
        setStartTime(props.data.shiftFrom);
        setEndTime(props.data.shiftTo);
        setWorkHour(props.data.workHour !== undefined ? props.data.workHour : '');
        setCheckChangeTime(props.data.changeTime);
        await setBreakHour(props.data.breakHour);
    }, [props])

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            className="modal-work-schedule"
            backdrop="static"
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
                                           e.target.checked ? setDay('') : setDay(props.data.repeatFrom)
                                       }}/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <span>??stirah??t   g??n??</span>
                    </div>
                </div>
                {
                    checkHoliday ?
                        <div className="repeat-block flex-center">
                            H??r
                            <Form.Group className="form-group">
                                <Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={day}
                                        onChange={(e => setDay(e.target.value))}/>
                                </Form.Label>
                            </Form.Group>
                            g??nd??n bir
                        </div>
                        :
                        <div className="work-schedule-data">
                            <div className="flex work-hours-content">
                                <Col xs={6}>
                                    <div className="work-hours-block flex-end">
                                        <Form.Group className="form-group m-0 w-100">
                                            <span className="input-title">Tarixd??n</span>
                                            <Form.Label className="relative m-0">
                                                <TimePicker
                                                    onChange={(val) => {
                                                        setStartTime(val);
                                                        setCheckChangeTime(true);
                                                        setWorkHour(props.function(props.data.today, val, endTime));
                                                    }}
                                                    disableClock={true}
                                                    clearIcon={false}
                                                    locale="sv-sv"
                                                    value={startTime}
                                                />
                                            </Form.Label>
                                        </Form.Group>
                                        <span className="break-line"></span>
                                        <Form.Group className="form-group  m-0 w-100">
                                            <span className="input-title">Tarix??</span>
                                            <Form.Label>
                                                <TimePicker
                                                    onChange={(val) => {
                                                        setEndTime(val);
                                                        setCheckChangeTime(true);
                                                        setWorkHour(props.function(props.data.today, startTime, val));
                                                    }}
                                                    disableClock={true}
                                                    clearIcon={false}
                                                    locale="sv-sv"
                                                    value={endTime}
                                                />
                                            </Form.Label>
                                        </Form.Group>
                                    </div>
                                </Col>
                                <Col xs={4}>
                                    <Form.Group className="form-group m-0 w-100">
                                        <span className="input-title">Toplam i?? saat??</span>
                                        <Form.Label className="relative m-0">
                                            <Form.Control
                                                type="number"
                                                value={workHour}
                                                placeholder="i?? saat??"
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
                                                       onChange={async (e) => {
                                                           setCheckBreak(e.target.checked);
                                                           await setBreakHour(e.target.checked);
                                                       }}/>
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <span>Fasil??</span>
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
                                        <span>??lav?? i?? saat??</span>
                                    </div>
                                </Col>
                                {
                                    props.data.repeatFrom !== null ?
                                        null
                                        :
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
                                                <span>T??krarla</span>
                                            </div>
                                        </Col>
                                }
                            </div>

                            {
                                checkRepeat ?
                                    <div className="repeat-block flex-center">
                                        H??r
                                        <Form.Group className="form-group">
                                            <Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={day}
                                                    onChange={(e => setDay(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                        g??nd??n bir
                                    </div>
                                    : null
                            }
                        </div>
                }
                <div className={['btn-block', props.data.id !== null ? 'flex' : 'flex-end'].join(' ')}>
                    {
                        props.data.id !== null ?
                            <button type="button" className="btn btn-cancel" onClick={() => {
                                props.delete(props.data)
                            }}>
                                Sil
                            </button>
                            : null
                    }
                    <ul className="flex-end list-unstyled m-0">
                        <li>
                            <button type="button" className="btn-main-border" onClick={() => {
                                props.onHide();
                            }}>
                                Ba??la
                            </button>
                        </li>
                        <li>
                            <button type="button" className="btn-main" onClick={() => {
                                props.click(checkBreak, checkOverTime, checkHoliday, startTime, endTime, day, props.data)
                            }}>
                                ??lav?? et
                            </button>
                        </li>
                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default WorkDayModal
