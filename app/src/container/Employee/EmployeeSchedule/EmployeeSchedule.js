import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Container, Image, Button, Row, Col, Form} from 'react-bootstrap';
import {Link, useRouteMatch} from 'react-router-dom';
import {mainAxios} from "../../../components/Axios/axios";
import userImage from '../../../assets/img/user.png'
import {useHistory} from "react-router-dom";
import Paginate from "../../../components/Pagination/Pagination";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";
import EmptyData from "../../../components/EmptyData/EmptyData";
import Swal from "sweetalert2";

const statuses = {
    'IN': 'İşləyir',
    'OUT': 'Çıxarılıb',
    'NEW': 'Yeni işçi'
};


const jobStatusOptions = [
    {value: 'NEW', label: 'Yeni işçi'},
    {value: 'IN', label: 'İşləyir'},
    {value: 'OUT', label: 'Çıxarılıb'},
]

function EmployeeSchedule() {
    const history = useHistory();
    const [employee, setEmployee] = useState([])
    const token = localStorage.getItem('token');
    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordSize, setRecordSize] = useState(15);

    /*filter*/

    const [department, setDepartment] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [subDepartment, setSubDepartment] = useState([]);
    const [selectedSubDepartment, setSelectedSubDepartment] = useState( null)
    const [position, setPosition] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null)
    const [fullName, setFullName] = useState('');
    const [selectedJobStatus, setSelectedJobStatus] = useState('');
    const [showFilter, setShowFilter] = useState(false)
    const [emptyData, setEmptyData] = useState(false)

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: '#040647',
            backgroundColor: state.isSelected ? '#F3F8FF' : 'transparent',
            padding: '10px 16px',
            margin: '0',
            fontSize: '16px',
            "&:first-of-type": {
                borderRadius: '2px 2px 0 0',
            },
            "&:hover": {
                backgroundColor: '#FFF',
            },
            "&:last-child": {
                borderBottom: 'none',
                borderRadius: '0 0 2px 2px',
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'relative'

        }),

        indicatorSeparator: () => {
        },

        indicatorsContainer: (provided) => ({
            ...provided,
            paddingRight: '8px'
        }),

        control: (provided) => ({
            ...provided,
            minHeight: '44px',
            fontSize: '14px',
            padding: '0',
            margin: '0',
            color: '#66615b',
            backgroundColor: '#FAFCFF',
            boxShadow: 'none',
            border: '1px solid rgba(4, 6, 71, 0.1)',
            "&:hover": {
                borderColor: 'rgba(4, 6, 71, 0.1)',
            },

        }),

        container: (provided) => ({
            ...provided,
            width: '100%',
        }),

        valueContainer: (provided) => ({
            ...provided,
            padding: '2px 8px 2px 16px'
        }),


        menu: (provided) => ({
            ...provided,
            borderRadius: '2px',
            padding: '0',
            margin: '0',
            borderColor: 'red',
            width: '100%'
        }),

        dropdownIndicator: defaultStyles => ({
            ...defaultStyles,
            'svg path': {
                fill: 'rgba(24,24,24, .8)',
            },

            'svg': {
                width: '18px'
            },
        }),

        menuList: base => ({
            ...base,
            padding: 0,
            borderColor: 'red'

        })

    };

    let depart = selectedDepartment !== null ? selectedDepartment.id : null;
    let subDepart = selectedDepartment !== null ? selectedDepartment.id : null;
    let jobStatus = selectedJobStatus !== null ? selectedJobStatus.id : null;
    let positionId = selectedPosition !== null ? selectedPosition.id : null;
    let name = fullName !== '' ? fullName : null;

    const handleRowClick = (item) => {
        history.push(`/employee/view/${item.id}`);
    }

    const getDepartment = () => {
        mainAxios({
            method: 'get',
            url: '/departments',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setDepartment(res.data);
            //console.log(departmentArr)
        }).catch((error) => {
            setDepartment([])
        });
    }

    const getSubDepartments = (id) => {
        if (id !== undefined) {
            mainAxios({
                method: 'get',
                url: `/departments/${id}/sub-departments`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }).then((res) => {
                setSubDepartment(res.data)
            });
        } else {
            mainAxios({
                method: 'get',
                url: '/sub-departments',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }).then((res) => {
                setSubDepartment(res.data)
            }).catch((error) => {
               setSubDepartment([])
            });
        }
    }

    const getPosition = () => {
        mainAxios({
            method: 'get',
            url: '/positions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setPosition(res.data)
        }).catch((error) => {
            setPosition([])
        });
    }

    const getEmployee = (page, departId, subDepartId, positionId, jobStatus, name) => {
        mainAxios({
            method: 'get',
            url: '/employees',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                page: page - 1,
                size: recordSize,
                departmentId: departId,
                subDepartmentId: subDepartId,
                jobStatus: jobStatus,
                positionId: positionId,
                fullName: name,
            }
        }).then((res) => {
            setEmployee(res.data.content)
            setCurrentPage(page);
            setTotalRecord(res.data.totalElements);
            setEmptyData(true)
        }).catch((error) => {
            setEmployee([])
        });
    }

    const resetFilter = () => {
        setSelectedSubDepartment(null);
        setSelectedPosition(null);
        setSelectedDepartment(null);
        setSelectedJobStatus(null);
        setFullName('')
        getEmployee(1)
    }

    useEffect(() => {
        getEmployee(1);
        getDepartment();
        getSubDepartments();
        getPosition();
    }, []);

    return (
        <Aux>
            <div>
                <div className="staff">
                    <Container fluid>
                        <div className="title-block flex">
                            <div className="title">
                                İşçilər
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
                                <Link to={`/employee/create`} className="btn-main">
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
                                                    <span className="input-title">Struktur vahidinin adı</span>
                                                    <Select
                                                        placeholder="Struktur vahidini seçin"
                                                        value={selectedDepartment}
                                                        onChange={(val) => {
                                                            setSelectedDepartment(val);
                                                            let id = val.id;
                                                            getSubDepartments(id);
                                                            setSelectedSubDepartment(null)
                                                            let subDepartId = selectedSubDepartment !== null ? selectedSubDepartment.id : null;
                                                            let positionId = selectedPosition !== null ? selectedPosition.id : null;
                                                            let jobStatus = selectedJobStatus !== null ? selectedJobStatus.value : null;
                                                            let name = fullName !== '' ? fullName : null
                                                            getEmployee(1, id, subDepartId, positionId, jobStatus, name)
                                                        }}
                                                        isSearchable={department ? department.length > 5 ? true : false : false}
                                                        options={department}
                                                        getOptionLabel={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="filter-item">
                                                <Form.Group className="form-group m-0">
                                                    <span className="input-title">Struktur bölmənin adı</span>
                                                    <Select
                                                        placeholder="Struktur bölməni seçin"
                                                        value={selectedSubDepartment}
                                                        onChange={(val) => {
                                                            setSelectedSubDepartment(val);
                                                            let id = val.id
                                                            let departId = selectedDepartment !== null ? selectedDepartment.id : null;
                                                            let positionId = selectedPosition !== null ? selectedPosition.id : null;
                                                            let jobStatus = selectedJobStatus !== null ? selectedJobStatus.value : null;
                                                            let name = fullName !== '' ? fullName : null
                                                            getEmployee(1, departId, id, positionId, jobStatus, name)

                                                        }}
                                                        isSearchable={subDepartment ? subDepartment.length > 5 ? true : false : false}
                                                        options={subDepartment}
                                                        getOptionLabel={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="filter-item">
                                                <Form.Group className="form-group m-0">
                                                    <span className="input-title">Ştat vahidinin adı</span>
                                                    <Select
                                                        placeholder="Ştat vahidini seçin"
                                                        value={selectedPosition}
                                                        onChange={(val) => {
                                                            setSelectedPosition(val);
                                                            let id = val.id
                                                            let departId = selectedDepartment !== null ? selectedDepartment.id : null;
                                                            let subDepartId = selectedSubDepartment !== null ? selectedSubDepartment.id : null;
                                                            let jobStatus = selectedJobStatus !== null ? selectedJobStatus.value : null;
                                                            let name = fullName !== '' ? fullName : null
                                                            getEmployee(1, departId, subDepartId, id, jobStatus, name)
                                                        }}
                                                        isSearchable={position ? position.length > 5 ? true : false : false}
                                                        options={position}
                                                        getOptionLabel={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="filter-item">
                                                <Form.Group className="form-group m-0">
                                                    <span className="input-title">Status</span>
                                                    <Select
                                                        placeholder="Status seçin"
                                                        value={selectedJobStatus}
                                                        onChange={(val) => {
                                                            setSelectedJobStatus(val);
                                                            let id = val.value
                                                            let departId = selectedDepartment !== null ? selectedDepartment.id : null;
                                                            let subDepartId = selectedSubDepartment !== null ? selectedSubDepartment.id : null;
                                                            let positionId = selectedPosition !== null ? selectedPosition.id : null;
                                                            let name = fullName !== '' ? fullName : null
                                                            getEmployee(1, departId, subDepartId, positionId, id, name)
                                                        }}
                                                        isSearchable={jobStatusOptions ? jobStatusOptions.length > 5 ? true : false : false}
                                                        options={jobStatusOptions}
                                                        getOptionLabel={(option) => (option.label)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="filter-item">
                                                <Form.Group className="form-group m-0">
                                                    <span className="input-title">İşçinin adı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İşçinin adı daxil edin"
                                                                      value={fullName}
                                                                      onChange={(e) => {
                                                                          setFullName(e.target.value)
                                                                          let name = e.target.value !== '' ? e.target.value : null;
                                                                          let departId = selectedDepartment !== null ? selectedDepartment.id : null;
                                                                          let subDepartId = selectedSubDepartment !== null ? selectedSubDepartment.id : null;
                                                                          let positionId = selectedPosition !== null ? selectedPosition.id : null;
                                                                          let jobStatus = selectedJobStatus !== null ? selectedJobStatus.value : null;
                                                                          const timer = setTimeout(() => {
                                                                              getEmployee(1, departId, subDepartId, positionId, jobStatus, name)
                                                                          }, 1000);
                                                                          return () => clearTimeout(timer);
                                                                      }}/>
                                                    </Form.Label>
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
                        <div className="block-list">
                            {
                                employee.length > 0 ?
                                    employee.map((item, index) =>
                                        <div className="block-item" key={index}>
                                            <div className="block-item-top">
                                                <div className="img-block flex-vertical-center"
                                                     onClick={() => handleRowClick(item)}>
                                                    <Image
                                                        src={item.photo ? `https://hr-portal-api-v2.herokuapp.com/employees/image/${item.photo}?token=${token}` : userImage}/>
                                                </div>
                                                <button type="button" className="btn-transparent">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <g opacity="0.7" clipPath="url(#clip0)">
                                                            <path
                                                                d="M18.3019 11.9756C18.1402 11.5756 17.6848 11.3823 17.2848 11.5441C16.8848 11.7058 16.6916 12.1611 16.8533 12.5612L17.7734 14.8372L15.0407 13.6326C14.8429 13.5454 14.6177 13.544 14.4189 13.6288C13.485 14.0273 12.4845 14.2293 11.4453 14.2293C7.26279 14.2293 4.45314 10.9545 4.45314 7.89592C4.45314 4.40366 7.58982 1.5625 11.4453 1.5625C15.3008 1.5625 18.4375 4.40366 18.4375 7.89592C18.4375 8.16838 18.4121 8.49463 18.3679 8.79096C18.3043 9.21772 18.5986 9.61526 19.0253 9.67893C19.4521 9.74275 19.8497 9.44826 19.9133 9.02151C19.9692 8.6469 20 8.24713 20 7.89592C20 5.77366 19.1013 3.78234 17.4694 2.28878C15.8568 0.81285 13.7174 0 11.4453 0C9.17321 0 7.03384 0.81285 5.42123 2.28875C3.96295 3.62343 3.09076 5.35577 2.92158 7.2237C1.08733 8.43838 2.60473e-05 10.3848 2.60473e-05 12.4814C2.60473e-05 13.7911 0.412642 15.0338 1.19807 16.1032L0.0569791 18.9259C-0.0622004 19.2207 0.00916666 19.5583 0.237487 19.7796C0.386275 19.9239 0.58233 20 0.781431 20C0.887798 20 0.995063 19.9783 1.09639 19.9336L4.38658 18.4832C5.21424 18.7913 6.08912 18.9473 6.99216 18.9473C7.01169 18.9473 7.03087 18.9457 7.05005 18.9443C8.35618 18.9345 9.62598 18.5909 10.7257 17.948C11.7108 17.372 12.5211 16.5809 13.0892 15.6465C13.6439 15.5469 14.186 15.3965 14.7121 15.1953L18.9036 17.043C19.005 17.0876 19.1122 17.1094 19.2185 17.1094C19.4176 17.1093 19.6137 17.0332 19.7625 16.889C19.9908 16.6677 20.0622 16.3301 19.943 16.0353L18.3019 11.9756ZM6.99224 17.3828C6.98158 17.3828 6.97119 17.384 6.9606 17.3844C6.16287 17.3803 5.39506 17.2235 4.67799 16.9176C4.4792 16.8327 4.25408 16.8341 4.05627 16.9213L2.2267 17.7278L2.8169 16.2678C2.926 15.9979 2.87596 15.6897 2.68713 15.4682C1.95139 14.6051 1.56252 13.5723 1.56252 12.4814C1.56252 11.2329 2.08772 10.05 3.00662 9.15307C3.29272 10.7126 4.09994 12.2045 5.31763 13.3765C6.8329 14.8348 8.8372 15.6796 11.0015 15.7813C9.98536 16.7815 8.5313 17.3828 6.99224 17.3828Z"
                                                                fill="#3083DC"/>
                                                            <path
                                                                d="M11.4062 8.71093C11.8377 8.71093 12.1875 8.36116 12.1875 7.92969C12.1875 7.49821 11.8377 7.14844 11.4062 7.14844C10.9748 7.14844 10.625 7.49821 10.625 7.92969C10.625 8.36116 10.9748 8.71093 11.4062 8.71093Z"
                                                                fill="#3083DC"/>
                                                            <path
                                                                d="M14.5312 8.71093C14.9627 8.71093 15.3125 8.36116 15.3125 7.92969C15.3125 7.49821 14.9627 7.14844 14.5312 7.14844C14.0998 7.14844 13.75 7.49821 13.75 7.92969C13.75 8.36116 14.0998 8.71093 14.5312 8.71093Z"
                                                                fill="#3083DC"/>
                                                            <path
                                                                d="M8.28125 8.71093C8.71272 8.71093 9.06249 8.36116 9.06249 7.92969C9.06249 7.49821 8.71272 7.14844 8.28125 7.14844C7.84978 7.14844 7.5 7.49821 7.5 7.92969C7.5 8.36116 7.84978 8.71093 8.28125 8.71093Z"
                                                                fill="#3083DC"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0">
                                                                <rect width="20" height="20" fill="white"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="block-item-bottom">
                                                <div className="block-user-name" onClick={() => handleRowClick(item)}>
                                                <span className="user-fullName">
                                                    {item.fullName}
                                                </span>
                                                    <span className={item.jobStatus.toLowerCase()}>
                                                    {statuses[item.jobStatus]}
                                                 </span>
                                                </div>
                                                <div className="profession">
                                                    <p className="m-0">{item.department !== null ? item.department.name : null}</p>
                                                    <p className="m-0">{item.position !== null ? item.position.name : null}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    :
                                    emptyData ?
                                        <EmptyData/>
                                        : null
                            }
                        </div>
                        <Paginate count={totalRecord} recordSize={recordSize} currentPage={currentPage}
                                  click={(page) => getEmployee(page, depart, subDepart, jobStatus, positionId, name)}/>
                    </Container>
                </div>
            </div>
        </Aux>

    );
}

export default EmployeeSchedule
