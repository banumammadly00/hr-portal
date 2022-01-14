import React from 'react';
import Modal from 'react-bootstrap/Modal'


function CalendarDayModal(props) {

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            className="modal-sure"
            centered>

            <Modal.Body>
                <h4>Ləğv etmək istədiyinizə <br/> əminsinizmi? </h4>
                <ul className="btn-block flex-end list-unstyled m-0">
                    <li>
                        <button type="button" className="btn-main-border" onClick={props.onHide}>
                            Xeyr
                        </button>
                    </li>
                    <li>
                        <button type="button" className="btn-main" onClick={() => {
                            props.click(props.data.id, props.data.description, false, props.data.date)
                        }}>
                            Bəli
                        </button>
                    </li>
                </ul>
            </Modal.Body>
        </Modal>
    );
}

export default CalendarDayModal
