import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import {Form} from "react-bootstrap";
import {customStyles} from "../../../../components/Select/SelectStyle";
import Select from "react-select";
import {mainAxios} from "../../../../components/Axios/axios";

function CalendarDayModal(props) {
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [employeeOpt, setEmployeeOpt] = useState(null);

    const getEmployee = () => {
        mainAxios({
            method: 'get',
            url: '/employees/all',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let data = res.data;
            let arr = [];
            if (data.length > 0)
                data.forEach(function (element) {
                    arr.push({id: element.id, name: element.fullName !== null ? element.fullName : null})
                });
            setEmployeeOpt(arr);
        });
    }

    useEffect(()=>{
        getEmployee()
    },[])
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            className="modal-sure modal-calendar"
            centered>
            <Modal.Body>
                <h4>İşçi əlavə et </h4>
                <Form.Group className="form-group">
                    <span className="input-title">İşçinin adı</span>
                        <Select
                            placeholder="İşçinin adı, soyadı, atasının adı"
                            value={selectedStaff}
                            onChange={(val) => {
                                setSelectedStaff(val);
                            }}
                            isSearchable={employeeOpt ? employeeOpt.length > 5 ? true : false : false}
                            options={employeeOpt}
                            getOptionLabel={(option) => (option.name)}
                            getOptionValue={(option) => (option.name)}
                            styles={customStyles}
                        />
                </Form.Group>
                <ul className="btn-block flex-end list-unstyled m-0">
                    <li>
                        <button type="button" className="btn-main-border" onClick={props.onHide}>
                            Bağla
                        </button>
                    </li>
                    <li>
                        <button type="button" className="btn-main" onClick={() => {
                            props.click()
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
