import React, {useState, useEffect} from 'react';
import Aux from "../../../../hoc/Auxiliary";
import {Table, Container, Button, OverlayTrigger, Tooltip, Form, Tabs, Tab} from 'react-bootstrap';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {mainAxios} from "../../../../components/Axios/axios";
import Paginate from "../../../../components/Pagination/Pagination";
import Swal from "sweetalert2";
import Select from "react-select";
import EmptyData from "../../../../components/EmptyData/EmptyData";
import {customStyles} from "../../../../components/Select/SelectStyle";
import SicknessSchedule from "../SicknessSchedule/SicknessSchedule";
import OvertimeSchedule from "../OvertimeSchedule/OvertimeSchedule";

const statuses = {
    'Təsdiq gözləyir': 'pending',
    'Təsdiqlənib': 'confirmed',
    'Ləğv edildi': 'cancelled',
    'Hesablandı': 'done'
};

const statusOptions = [
    {value: 'PENDING', label: "Təsdiq gözləyir"},
    {value: 'APPROVED', label: "Təsdiqlənib"},
    {value: 'DONE', label: "Hesablandı"},
    {value: 'REJECTED', label: "Ləğv edildi"},
];

function OperationSchedule() {
    let location = useLocation();
    const [key, setKey] = useState(location.state !== null ? location.state : 'sickness')

    const [operation, setOperation] = useState([]);
    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordSize, setRecordSize] = useState(20);

    const [showFilter, setShowFilter] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(false);

    let status = selectedStatus !== null ? selectedStatus.value : null;

    const getOperation = (page, status) => {
        mainAxios({
            method: 'get',
            url: '/operations',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                page: page - 1,
                size: recordSize,
                status: status
            }
        }).then((res) => {
            setCurrentPage(page);
            setOperation(res.data.content);
            setTotalRecord(res.data.totalElements);
        });
    }

    const changeStatus = (status, id) => {
        let statusText = status === 2 ? 'Ləğv etmək istədiyinizə əminsinizmi?' : 'Təsdiq etmək istədiyinizə əminsinizmi?'
        Swal.fire({
            text: statusText,
            showCancelButton: true,
            confirmButtonText: 'Bəli',
            confirmButtonColor: '#2ed06a',
            cancelButtonText: 'Xeyr',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                mainAxios({
                    method: 'put',
                    url: `/operations/${id}/status`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    params: {
                        status: status
                    }
                }).then((res) => {
                    getOperation(1)
                });
            }
        })
    }

    const getExportDocument = (id, operationName) => {
        mainAxios({
            method: 'get',
            url: `/operations/${id}/export`,
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

        }).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = window.document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${operationName}.doc`);
            window.document.body.appendChild(link);
            link.click();
        })
    }

    const resetFilter = () => {
        setSelectedStatus(null);
        getOperation(1)
    }

    useEffect(() => {
        getOperation(1)
    }, []);

    return (
        <Aux>
            <div className="staff operation">
                <Container fluid>
                    <div className="inner-tab flex-vertical-center">
                        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                            <Tab eventKey="sickness" title="Xəstəliklər">
                                <SicknessSchedule key={key}/>
                            </Tab>
                            <Tab eventKey="operation" title="Əmrlər">
                                <div className="title-block flex">
                                    <div className="title">
                                        Kadr əməliyyatları
                                    </div>
                                    <div className="btn-block flex-end" onClick={() => {
                                        setShowFilter(!showFilter)
                                    }}>
                                        <button type="button" className="btn-border">
                                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M15.7099 2.90769C15.7145 2.89385 15.7053 2.88 15.7053 2.86615V0.461538C15.7145 0.216923 15.5206 0.00923077 15.2714 0C15.2668 0 15.2622 0 15.2576 0H0.732947C0.488331 0 0.285254 0.203077 0.28987 0.447692C0.28987 0.452308 0.28987 0.456923 0.28987 0.461538V2.86615C0.28987 2.88 0.280639 2.89385 0.285254 2.90769C0.285254 2.91231 0.280639 2.92154 0.285254 2.92615C0.285254 2.93538 0.285254 2.94462 0.285254 2.94923C0.285254 2.95846 0.285254 2.96308 0.28987 2.97231C0.294485 2.98154 0.294485 2.98615 0.294485 2.99077C0.294485 2.99538 0.299101 3.00462 0.299101 3.01385C0.299101 3.01846 0.303716 3.02769 0.303716 3.03231C0.308331 3.04154 0.308331 3.04615 0.312947 3.05538C0.317562 3.06 0.317562 3.06923 0.322178 3.07385C0.326793 3.07846 0.326793 3.08769 0.331408 3.09231C0.336024 3.09692 0.340639 3.10615 0.340639 3.11077C0.340639 3.11538 0.34987 3.12462 0.34987 3.12923C0.354485 3.13385 0.359101 3.14308 0.363716 3.14769C0.368331 3.15231 0.372947 3.15692 0.372947 3.16154C0.372947 3.16154 0.382178 3.16154 0.386793 3.16615L5.92064 9.67385V17.5385C5.91602 17.7138 6.01295 17.8754 6.17449 17.9538C6.23449 17.9815 6.2991 18 6.36833 18C6.47448 18 6.57602 17.9631 6.65448 17.8985L9.91295 15.2538C10.0191 15.1662 10.0791 15.0323 10.0745 14.8938V9.67385L15.6037 3.16615C15.6037 3.16615 15.6083 3.16615 15.6129 3.16154C15.6176 3.15692 15.6222 3.15231 15.6268 3.14769C15.6314 3.14308 15.636 3.13385 15.6406 3.12923C15.6453 3.12462 15.6499 3.11538 15.6545 3.11077C15.6591 3.10615 15.6637 3.09692 15.6637 3.09231C15.6683 3.08769 15.6729 3.07846 15.6729 3.07385C15.6776 3.06923 15.6776 3.06 15.6822 3.05538C15.6868 3.04615 15.6868 3.04154 15.6914 3.03231C15.696 3.02769 15.696 3.01846 15.696 3.01385C15.7006 3.00462 15.7006 3 15.7006 2.99077C15.7006 2.98154 15.7053 2.97692 15.7053 2.97231C15.7053 2.96769 15.7099 2.95846 15.7099 2.94923C15.7099 2.94 15.7145 2.93077 15.7145 2.92615C15.7145 2.92154 15.7053 2.91231 15.7099 2.90769ZM9.27141 9.20308C9.19756 9.28615 9.15602 9.39231 9.15141 9.50308V14.6723L6.84372 16.5692V9.50308C6.8391 9.39231 6.79756 9.28615 6.72372 9.20308L1.72987 3.32308H14.2653L9.27141 9.20308ZM14.7822 2.4H1.21295V0.923077H14.7822V2.4Z"
                                                    fill="#040647"/>
                                            </svg>
                                            Filters
                                        </button>
                                        <Link to={`/operation/create`} className="btn-main">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M15.8346 10.8337H10.8346V15.8337H9.16797V10.8337H4.16797V9.16699H9.16797V4.16699H10.8346V9.16699H15.8346V10.8337Z"
                                                    fill="white"/>
                                            </svg>
                                            Əlavə et
                                        </Link>
                                    </div>
                                </div>
                                {
                                    showFilter ?
                                        <div className="filter-block">
                                            <div className="block flex">
                                                <div className="filter-left">
                                                    <div className="filter-item">
                                                        <Form.Group className="form-group m-0">
                                                            <span className="input-title">Status</span>
                                                            <Select
                                                                placeholder="Statusu seçin"
                                                                value={selectedStatus}
                                                                onChange={(val) => {
                                                                    setSelectedStatus(val);
                                                                    let id = val.value;
                                                                    getOperation(1, id)
                                                                }}
                                                                isSearchable={statusOptions ? statusOptions.length > 5 ? true : false : false}
                                                                options={statusOptions}
                                                                getOptionLabel={(option) => (option.label)}
                                                                styles={customStyles}
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                                <Button className="btn-border" onClick={() => resetFilter()}>
                                                    Təmizlə
                                                </Button>
                                            </div>
                                        </div>
                                        : null
                                }
                                <div className="block">
                                    {
                                        operation.length > 0 ?
                                            <Table responsive="sm">
                                                <thead>
                                                <tr>
                                                    <th>İd</th>
                                                    <th>Əmr</th>
                                                    <th className="th-date">Tarix</th>
                                                    <th>Status</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    operation.map((item, index) =>
                                                        <tr key={index}>
                                                            <td>{item.id}</td>
                                                            <td>
                                                                {
                                                                    item.type.length > 30 ?
                                                                        <OverlayTrigger placement="top-start"
                                                                                        overlay={<Tooltip
                                                                                            id="tooltip-disabled">{item.type}</Tooltip>}>
                                                                            <p className="m-0 operation-name">{item.type}</p>
                                                                        </OverlayTrigger>
                                                                        :
                                                                        <p className="m-0 operation-name">{item.type}</p>
                                                                }
                                                            </td>
                                                            <td>{item.createdAt}</td>
                                                            <td>
                                                                <div className="flex">
                                                                     <span className={statuses[item.statusAz]}>
                                                                         {item.statusAz}
                                                                     </span>
                                                                    <ul className="btn-block list-unstyled flex m-0">
                                                                        <li>
                                                                            <Button className="btn-export"
                                                                                    onClick={() => getExportDocument(item.id, item.type)}>
                                                                                <svg width="20" height="20"
                                                                                     viewBox="0 0 22 22"
                                                                                     fill="none"
                                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                                    <path
                                                                                        d="M17.1875 19.25H4.81247C4.63013 19.25 4.45527 19.1776 4.32635 19.0486C4.19742 18.9197 4.125 18.7448 4.125 18.5625V3.4375C4.125 3.25517 4.19742 3.0803 4.32635 2.95137C4.45527 2.82244 4.63013 2.75 4.81247 2.75H13.0627L17.875 7.5625V18.5625C17.875 18.7448 17.8026 18.9197 17.6737 19.0486C17.5447 19.1776 17.3699 19.25 17.1875 19.25V19.25Z"
                                                                                        stroke="#040647"
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"/>
                                                                                    <path
                                                                                        d="M13.0625 2.75V7.5625H17.8757"
                                                                                        stroke="#040647"
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"/>
                                                                                    <path d="M8.25 11.6875H13.75"
                                                                                          stroke="#040647"
                                                                                          strokeLinecap="round"
                                                                                          strokeLinejoin="round"/>
                                                                                    <path d="M8.25 14.4375H13.75"
                                                                                          stroke="#040647"
                                                                                          strokeLinecap="round"
                                                                                          strokeLinejoin="round"/>
                                                                                </svg>

                                                                            </Button>
                                                                        </li>
                                                                        {
                                                                            item.statusAz === 'Təsdiq gözləyir' ?
                                                                                <li>
                                                                                    <Button className="btn-cancel"
                                                                                            onClick={() => changeStatus('REJECTED', item.id)}>
                                                                                        <svg width="14" height="14"
                                                                                             viewBox="0 0 12 12"
                                                                                             fill="none"
                                                                                             xmlns="http://www.w3.org/2000/svg">
                                                                                            <path
                                                                                                d="M5.99688 5.08435L11.0339 0.047383C11.0388 0.0422913 11.0438 0.0372908 11.0489 0.0323831C11.0489 0.0323654 11.0489 0.0323479 11.049 0.0323302L11.1531 0.140279C11.3516 -0.0514605 11.668 -0.0459554 11.8598 0.152578C12.0515 0.351111 12.046 0.667475 11.8475 0.859214L5.99688 5.08435ZM5.99688 5.08435L0.959034 0.0464826L0.95905 0.0464665L0.957171 0.0446523C0.69905 -0.204637 0.287728 -0.197483 0.038437 0.0606401C-0.20476 0.312441 -0.20476 0.711621 0.038437 0.963421L0.0384207 0.963437L0.0402643 0.965281L5.07811 6.00312L0.0402643 11.041L0.0402564 11.041C-0.213419 11.2947 -0.213419 11.706 0.0402564 11.9597L0.0402802 11.9597C0.293992 12.2134 0.705306 12.2134 0.959018 11.9597L0.959033 11.9597L5.99688 6.92189L11.0347 11.9597L11.0347 11.9597L11.0366 11.9616C11.2947 12.2109 11.706 12.2037 11.9553 11.9456L11.9553 11.9456C12.1985 11.6938 12.1985 11.2946 11.9553 11.0428L11.9553 11.0428L11.9535 11.041L6.91568 6.00312L11.9526 0.96616L5.99688 5.08435Z"
                                                                                                fill="#CF3131"
                                                                                                stroke="#CF3131"
                                                                                                strokeWidth="0.3"/>
                                                                                        </svg>
                                                                                    </Button>
                                                                                </li>
                                                                                : null
                                                                        }
                                                                        {
                                                                            item.statusAz === 'Təsdiq gözləyir' ?
                                                                                <li>
                                                                                    <Button className="btn-confirm"
                                                                                            onClick={() => changeStatus('APPROVED', item.id)}>
                                                                                        <svg width="16" height="12"
                                                                                             viewBox="0 0 16 12"
                                                                                             fill="none"
                                                                                             xmlns="http://www.w3.org/2000/svg">
                                                                                            <path
                                                                                                d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                                                                fill="#2ED06A"/>
                                                                                        </svg>
                                                                                    </Button>
                                                                                </li>
                                                                                : null
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                </tbody>
                                            </Table>
                                            :
                                            <EmptyData/>
                                    }
                                </div>
                                <Paginate count={totalRecord} recordSize={recordSize} currentPage={currentPage}
                                          click={(page) => getOperation(page, status)}/>
                            </Tab>
                            <Tab eventKey="overtime" title="Overtime">
                                <OvertimeSchedule/>
                            </Tab>
                        </Tabs>
                    </div>
                </Container>
            </div>
        </Aux>

    );
}

export default OperationSchedule
