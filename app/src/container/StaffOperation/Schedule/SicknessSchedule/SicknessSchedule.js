import React, {useState, useEffect} from 'react';
import Aux from "../../../../hoc/Auxiliary";
import {Button, Table} from 'react-bootstrap';
import {Link, useHistory,useLocation} from 'react-router-dom';
import {mainAxios} from "../../../../components/Axios/axios";
import Paginate from "../../../../components/Pagination/Pagination";
import EmptyData from "../../../../components/EmptyData/EmptyData";
import Swal from "sweetalert2";

const statuses = {
    'Açıq': 'OPEN',
    'Bağlı': 'CLOSE',
};


function SicknessSchedule() {
    const history = useHistory();
    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordSize, setRecordSize] = useState(20);

    const [sicknessArr, setSicknessArr] = useState([]);

    const getSickness = (page) => {
        mainAxios({
            method: 'get',
            url: '/sick',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                page: page - 1,
                size: recordSize,
            }
        }).then((res) => {
            setCurrentPage(page);
            setSicknessArr(res.data.content);
            setTotalRecord(res.data.totalElements);
        });
    }

    const changeStatus = (status, id) => {
        Swal.fire({
            text: 'Ləğv etmək istədiyinizə əminsinizmi?',
            showCancelButton: true,
            confirmButtonText: 'Bəli',
            confirmButtonColor: '#2ed06a',
            cancelButtonText: 'Xeyr',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                mainAxios({
                    method: 'put',
                    url: `/sick/${id}/change-status`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    params: {
                        sickStatus : status
                    }
                }).then((res) => {
                    getSickness(1)
                });
            }
        })
    }


    const handleRowClick = (item) => {
        history.push({pathname: `/operation/sickness/edit/${item.id}`})}

    useEffect(() => {
        getSickness(1)
    }, []);

    return (
        <Aux>
            <div>
                <div className="title-block flex">
                    <div className="title">
                        Xəstəliklər
                    </div>
                    <div className="btn-block flex-end">
                        <Link to={`/operation/sickness/create`} className="btn-main">
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
                <div className="block">
                    {
                        sicknessArr.length > 0 ?
                            <Table responsive="sm" hover>
                                <thead>
                                <tr>
                                    <th>İd</th>
                                    <th>A.S.A.</th>
                                    <th>Başladığı tarix</th>
                                    <th>Bitdiyi tarix</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    sicknessArr.map((item, index) =>
                                        <tr key={index} onClick={(e) =>  item.sickStatus === 'Açıq' ? handleRowClick(item) : e.stopPropagation()}>
                                                <td >{item.id}</td>
                                                <td>{item.fullName}</td>
                                                <td>
                                                    {item.startDate}
                                                </td>
                                                <td>{item.startJobDate}
                                                </td>
                                            <td>
                                                <div className="flex">
                                                         <span
                                                             className={statuses[item.sickStatus].toLowerCase()}>
                                                     {item.sickStatus}
                                                 </span>
                                                    <ul className="btn-block list-unstyled flex m-0">
                                                        {
                                                            item.sickStatus === 'Açıq' ?
                                                               <>
                                                                   <li>
                                                                       <Button className="btn-cancel"
                                                                               onClick={(e) =>{
                                                                                   e.stopPropagation()
                                                                                   changeStatus('CLOSE', item.id)
                                                                               }}>
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
                                                               </>
                                                                :
                                                                null
                                                        }
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                            : <EmptyData/>
                    }
                </div>
                <Paginate count={totalRecord} recordSize={recordSize} currentPage={currentPage}
                          click={(page) => getSickness(page)}/>
            </div>
        </Aux>

    );
}

export default SicknessSchedule
