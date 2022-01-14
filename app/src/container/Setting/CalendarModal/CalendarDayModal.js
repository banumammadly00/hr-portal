import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import {Form} from "react-bootstrap";


function CalendarDayModal(props) {
    const [reason, setReason] = useState('');
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            className="modal-sure modal-calendar"
            centered>
            <Modal.Body>
                <h4>Səbəb əlavə et </h4>
                <Form.Group className="form-group">
                    <span className="input-title">Səbəb adı</span>
                    <Form.Label>
                        <Form.Control placeholder="Səbəb adı"
                                      value={reason}
                                      onChange={(e => setReason(e.target.value))}/>
                    </Form.Label>
                </Form.Group>
                <ul className="btn-block flex-end list-unstyled m-0">
                    <li>
                        <button type="button" className="btn-main-border" onClick={props.onHide}>
                            Bağla
                        </button>
                    </li>
                    <li>
                        <button type="button" className="btn-main" onClick={() => {
                            props.click(props.data.id, reason, true, props.data.date)
                        }}>
                            Əlavə et
                        </button>
                    </li>
                </ul>
            </Modal.Body>
        </Modal>
    );
}

export default CalendarDayModal
