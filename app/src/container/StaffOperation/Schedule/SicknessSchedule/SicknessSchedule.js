import React, {useState, useEffect} from 'react';
import Aux from "../../../../hoc/Auxiliary";
import {Table} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {mainAxios} from "../../../../components/Axios/axios";
import Paginate from "../../../../components/Pagination/Pagination";
import EmptyData from "../../../../components/EmptyData/EmptyData";

const sickStatuses = {
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

    const handleRowClick = (item) => {
        history.push(`/operation/sickness/edit/${item.id}`);
    }


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
                                        <tr onClick={() => handleRowClick(item)} key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.fullName}</td>
                                            <td>
                                                {item.startDate}
                                            </td>
                                            <td>{item.startJobDate}
                                            </td>
                                            <td>
                                                                 <span
                                                                     className={sickStatuses[item.sickStatus].toLowerCase()}>
                                                                     {item.sickStatus}
                                                                 </span>
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
