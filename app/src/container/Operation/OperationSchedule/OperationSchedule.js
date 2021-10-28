import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Table, Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {mainAxios} from "../../../components/Axios/axios";
import Paginate from "../../../components/Pagination/Pagination";
import Swal from "sweetalert2";

const statuses = {
    'Təsdiq gözləyir': 'pending',
    'Təsdiqlənib': 'confirmed',
    'Ləğv edildi': 'cancelled',
    'Hesablandı': 'calculated'
};

function OperationSchedule() {
    const [document, setDocument] = useState([]);
    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordSize, setRecordSize] = useState(15)

    const getDocument = (page) => {
        mainAxios({
            method: 'get',
            url: '/document',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                page: page - 1,
                size: recordSize
            }
        }).then((res) => {
            setCurrentPage(page)
            setDocument(res.data.data.data);
            setTotalRecord(res.data.data.totalElement);
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
                    url: '/document/status/' + id,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    params: {
                        status: status
                    }
                }).then((res) => {
                    getDocument(1)
                });
            }
        })
    }

    const getExportDocument = (id, operationName) => {
        mainAxios({
            method: 'get',
            url: '/document/export/' + id,
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

        }).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = window.document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${operationName}.pdf`);
            window.document.body.appendChild(link);
            link.click();
        })
    }

    useEffect(() => {
        getDocument(1)
    }, []);

    return (
        <Aux>
            <div className="staff operation">
                <Container fluid>
                    <div className="title-block flex">
                        <div className="title">
                            Kadr əməliyyatları
                        </div>
                        <div className="btn-block flex-end">
                            {/* <Button className="btn-border">
                                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.7099 2.90769C15.7145 2.89385 15.7053 2.88 15.7053 2.86615V0.461538C15.7145 0.216923 15.5206 0.00923077 15.2714 0C15.2668 0 15.2622 0 15.2576 0H0.732947C0.488331 0 0.285254 0.203077 0.28987 0.447692C0.28987 0.452308 0.28987 0.456923 0.28987 0.461538V2.86615C0.28987 2.88 0.280639 2.89385 0.285254 2.90769C0.285254 2.91231 0.280639 2.92154 0.285254 2.92615C0.285254 2.93538 0.285254 2.94462 0.285254 2.94923C0.285254 2.95846 0.285254 2.96308 0.28987 2.97231C0.294485 2.98154 0.294485 2.98615 0.294485 2.99077C0.294485 2.99538 0.299101 3.00462 0.299101 3.01385C0.299101 3.01846 0.303716 3.02769 0.303716 3.03231C0.308331 3.04154 0.308331 3.04615 0.312947 3.05538C0.317562 3.06 0.317562 3.06923 0.322178 3.07385C0.326793 3.07846 0.326793 3.08769 0.331408 3.09231C0.336024 3.09692 0.340639 3.10615 0.340639 3.11077C0.340639 3.11538 0.34987 3.12462 0.34987 3.12923C0.354485 3.13385 0.359101 3.14308 0.363716 3.14769C0.368331 3.15231 0.372947 3.15692 0.372947 3.16154C0.372947 3.16154 0.382178 3.16154 0.386793 3.16615L5.92064 9.67385V17.5385C5.91602 17.7138 6.01295 17.8754 6.17449 17.9538C6.23449 17.9815 6.2991 18 6.36833 18C6.47448 18 6.57602 17.9631 6.65448 17.8985L9.91295 15.2538C10.0191 15.1662 10.0791 15.0323 10.0745 14.8938V9.67385L15.6037 3.16615C15.6037 3.16615 15.6083 3.16615 15.6129 3.16154C15.6176 3.15692 15.6222 3.15231 15.6268 3.14769C15.6314 3.14308 15.636 3.13385 15.6406 3.12923C15.6453 3.12462 15.6499 3.11538 15.6545 3.11077C15.6591 3.10615 15.6637 3.09692 15.6637 3.09231C15.6683 3.08769 15.6729 3.07846 15.6729 3.07385C15.6776 3.06923 15.6776 3.06 15.6822 3.05538C15.6868 3.04615 15.6868 3.04154 15.6914 3.03231C15.696 3.02769 15.696 3.01846 15.696 3.01385C15.7006 3.00462 15.7006 3 15.7006 2.99077C15.7006 2.98154 15.7053 2.97692 15.7053 2.97231C15.7053 2.96769 15.7099 2.95846 15.7099 2.94923C15.7099 2.94 15.7145 2.93077 15.7145 2.92615C15.7145 2.92154 15.7053 2.91231 15.7099 2.90769ZM9.27141 9.20308C9.19756 9.28615 9.15602 9.39231 9.15141 9.50308V14.6723L6.84372 16.5692V9.50308C6.8391 9.39231 6.79756 9.28615 6.72372 9.20308L1.72987 3.32308H14.2653L9.27141 9.20308ZM14.7822 2.4H1.21295V0.923077H14.7822V2.4Z" fill="#040647"/>
                                    </svg>
                                    Filters
                                </Button>*/}
                            <Link to="/operation/create" className="btn-main">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.8346 10.8337H10.8346V15.8337H9.16797V10.8337H4.16797V9.16699H9.16797V4.16699H10.8346V9.16699H15.8346V10.8337Z"
                                        fill="white"/>
                                </svg>
                                Əmr yarat
                            </Link>
                        </div>
                    </div>
                    <div className="block">
                        <Table responsive="sm">
                            <thead>
                            <tr>
                                <th>İd</th>
                                <th>Əmr</th>
                                <th>Tarix</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                document.map((item, index) =>
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.documentType}</td>
                                        <td>{item.createDate}</td>
                                        <td>
                                            <div className="flex">
                                                 <span className={statuses[item.status]}>
                                                     {item.status}
                                                 </span>
                                                <ul className="btn-block list-unstyled flex m-0">
                                                    <li>
                                                        <Button className="btn-export"  onClick={() => getExportDocument(item.id, item.documentType)}>
                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M3.75 10.625V3.75C3.75 3.58424 3.81585 3.42527 3.93306 3.30806C4.05027 3.19085 4.20924 3.125 4.375 3.125H11.8756L16.2506 7.5V10.625"
                                                                    stroke="#040647" strokeLinecap="round"
                                                                    strokeLinejoin="round"/>
                                                                <path d="M11.875 3.125V7.5H16.2506" stroke="#040647"
                                                                      strokeLinecap="round" strokeLinejoin="round"/>
                                                                <path
                                                                    d="M3.75 15.625H5C5.33152 15.625 5.64946 15.4933 5.88388 15.2589C6.1183 15.0245 6.25 14.7065 6.25 14.375C6.25 14.0435 6.1183 13.7255 5.88388 13.4911C5.64946 13.2567 5.33152 13.125 5 13.125H3.75V16.875"
                                                                    stroke="#040647" strokeLinecap="round"
                                                                    strokeLinejoin="round"/>
                                                                <path
                                                                    d="M9.6875 16.875C10.1848 16.875 10.6617 16.6775 11.0133 16.3258C11.365 15.9742 11.5625 15.4973 11.5625 15C11.5625 14.5027 11.365 14.0258 11.0133 13.6742C10.6617 13.3225 10.1848 13.125 9.6875 13.125H8.75V16.875H9.6875Z"
                                                                    stroke="#040647" strokeLinecap="round"
                                                                    strokeLinejoin="round"/>
                                                                <path d="M16.25 13.125H14.0625V16.875" stroke="#040647"
                                                                      strokeLinecap="round" strokeLinejoin="round"/>
                                                                <path d="M15.9375 15.3125H14.0625" stroke="#040647"
                                                                      strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </Button>
                                                    </li>
                                                    {
                                                        item.status === 'Təsdiq gözləyir' ?
                                                            <li>
                                                                <Button className="btn-cancel"
                                                                        onClick={() => changeStatus(2, item.id)}>
                                                                    <svg width="14" height="14" viewBox="0 0 12 12"
                                                                         fill="none"
                                                                         xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M5.99688 5.08435L11.0339 0.047383C11.0388 0.0422913 11.0438 0.0372908 11.0489 0.0323831C11.0489 0.0323654 11.0489 0.0323479 11.049 0.0323302L11.1531 0.140279C11.3516 -0.0514605 11.668 -0.0459554 11.8598 0.152578C12.0515 0.351111 12.046 0.667475 11.8475 0.859214L5.99688 5.08435ZM5.99688 5.08435L0.959034 0.0464826L0.95905 0.0464665L0.957171 0.0446523C0.69905 -0.204637 0.287728 -0.197483 0.038437 0.0606401C-0.20476 0.312441 -0.20476 0.711621 0.038437 0.963421L0.0384207 0.963437L0.0402643 0.965281L5.07811 6.00312L0.0402643 11.041L0.0402564 11.041C-0.213419 11.2947 -0.213419 11.706 0.0402564 11.9597L0.0402802 11.9597C0.293992 12.2134 0.705306 12.2134 0.959018 11.9597L0.959033 11.9597L5.99688 6.92189L11.0347 11.9597L11.0347 11.9597L11.0366 11.9616C11.2947 12.2109 11.706 12.2037 11.9553 11.9456L11.9553 11.9456C12.1985 11.6938 12.1985 11.2946 11.9553 11.0428L11.9553 11.0428L11.9535 11.041L6.91568 6.00312L11.9526 0.96616L5.99688 5.08435Z"
                                                                            fill="#CF3131" stroke="#CF3131"
                                                                            strokeWidth="0.3"/>
                                                                    </svg>
                                                                </Button>
                                                            </li>
                                                            : null
                                                    }
                                                    {
                                                        item.status === 'Təsdiq gözləyir' ?
                                                            <li>
                                                                <Button className="btn-confirm"
                                                                        onClick={() => changeStatus(1, item.id)}>
                                                                    <svg width="16" height="12" viewBox="0 0 16 12"
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
                    </div>
                    <Paginate count={totalRecord} recordSize={recordSize} currentPage={currentPage}
                              click={(page) => getDocument(page)}/>
                </Container>
            </div>
        </Aux>

    );
}

export default OperationSchedule
