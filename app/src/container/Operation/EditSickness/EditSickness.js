import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Container, Tabs, Tab, Table, Button, OverlayTrigger, Tooltip, Form, Row, Col} from 'react-bootstrap';
import {Link, useHistory, useLocation, useParams, useRouteMatch} from 'react-router-dom';
import {mainAxios} from "../../../components/Axios/axios";
import Paginate from "../../../components/Pagination/Pagination";
import Swal from "sweetalert2";
import moment from "moment";
import Select from "react-select";
import {customStyles} from "../../../components/Select/SelectStyle";
import DatePicker from "react-datepicker";
import Indicator from "../../../components/Loading/Indicator";

const sickStatusOptions = [
    {value: "OPEN", label: "Açıq"},
    {value: 'CLOSE', label: 'Bağlı'},
]


function EditSickness() {
    const history = useHistory();


    let params = useParams();
    let location = useLocation()
    let id = params.id;

    /*General*/
    const [joinDate, setJoinDate] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [employee, setEmployee] = useState([]);
    const [department, setDepartment] = useState('')
    const [subDepartment, setSubDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [errors, setErrors] = useState({});
    const [loadingIndicator, setLoadingIndicator] = useState(false);
    const [sicknessSerialNum, setSicknessSerialNum] = useState('');
    const [obeyDepartment, setObeyDepartment] = useState(false);
    const [practice, setPractice] = useState('');
    const [generalPractice, setGeneralPractice] = useState('');
    const [ssn, setSSn] = useState('');
    const [selectedSickStatus, setSelectedSickStatus] = useState(null);

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
            setEmployee(arr);
        });
    }

    const getEmployeeDetail = (id) => {
        mainAxios({
            method: 'get',
            url: `/employees/${id}/operation-info`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let data = res.data
            setDepartment(data.department);
            setSubDepartment(data.subDepartment);
            setPosition(data.position);
            setObeyDepartment(data.obeyDepartmentName);
        });
    }

    const getSicknessData = () => {
        mainAxios({
            method: 'get',
            url: '/sick/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let data = res.data;
            data.startDate !== null ? setStartDate(new Date(data.startDate)) : setStartDate(null);
            setSelectedStaff({id: data.employeeId, name: data.fullName});
            getEmployeeDetail(data.employeeId);
            data.endDate !==null ? setEndDate(new Date(data.endDate)) : setEndDate(new Date(data.endDate));
            data.joinDate !==null ? setJoinDate(new Date(data.startJobDate)) : setJoinDate(new Date(data.startJobDate));
            setPractice(parseFloat(data.portExperience));
            setGeneralPractice(data.totalExperience);
            setSSn(data.ssn);
            setSicknessSerialNum(data.series);
            for (let i of sickStatusOptions) {
                if (data.sickStatus === i.label) {
                    setSelectedSickStatus(i)
                }
            }
        });
    }

    const senData = () => {
        setLoadingIndicator(true);
        let data = {
            "employeeId": selectedStaff !== null ? selectedStaff.id : null,
            "endDate": endDate !== null ? moment(endDate).format("YYYY-MM-DD") : null,
            "series": sicknessSerialNum !== '' ? sicknessSerialNum : null,
            "startDate": startDate !== null ? moment(startDate).format("YYYY-MM-DD") : null,
            "startJobDate": joinDate !== null ? moment(joinDate).format("YYYY-MM-DD") : null,
            "sickStatus": selectedSickStatus !== null ? selectedSickStatus.value : null,
        }

        mainAxios({
            method: 'post',
            url: '/sick',
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setLoadingIndicator(false);
            Swal.fire({
                icon: 'success',
                text: 'Məlumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
            history.push("/operation")
        }).catch((error) => {
            setLoadingIndicator(false)
            Swal.fire({
                icon: 'error',
                text: 'Məlumatlar qeyd edilmədi!',
                cancelButtonText: 'Bağla',
                showCancelButton: true,
                showConfirmButton: false,
            });
            if (error.response.data.validations) {
                setErrors(error.response.data.validations)
            } else {
                setErrors({})
            }
        });
    }

    useEffect(() => {
        getSicknessData();
        getEmployee();
    }, []);

    return (
        <Aux>
            <div className="create-operation">
                <Container fluid>
                    <div className="title-block flex">
                        <div className="title flex-center">
                            <Link to="/operation" className="flex">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.3333 14H7.58333M12.25 8.75L7 14L12.25 19.25" stroke="#193651"
                                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                            Xəstəlik
                        </div>
                    </div>
                    <div className="block">
                        <Form className="form-list">
                            <div className="operation-tab">
                                <Row>
                                    <Col xs={6}>
                                        <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin adı, soyadı, atasının adı *</span>
                                            <Select
                                                placeholder="İşçinin adı, soyadı, atasının adı"
                                                value={selectedStaff}
                                                onChange={(val) => {
                                                    console.log(val);
                                                    let id = val.id
                                                    getEmployeeDetail(id);
                                                    setSelectedStaff(val);
                                                }}
                                                isSearchable={employee ? employee.length > 5 ? true : false : false}
                                                options={employee}
                                                getOptionLabel={(option) => (option.name)}
                                                getOptionValue={(option) => (option.name)}
                                                styles={customStyles}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="form-group">
                                            <span className="input-title">İşlədiyi struktur bölmə</span>
                                            <Form.Label>
                                                <Form.Control placeholder="Struktur bölmənin adı daxil edin"
                                                              value={department || ''} disabled={true}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                            <Form.Label>
                                                <Form.Control placeholder="Tabe struktur bölmənin adı"
                                                              value={subDepartment || ''}
                                                              disabled={true}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group className="form-group">
                                            <span className="input-title">Tabe struktur bölmənin adı </span>
                                            <Form.Label>
                                                <Form.Control placeholder="Tabe struktur bölmənin adı"
                                                              value={obeyDepartment || ''}
                                                              disabled={true}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group className="form-group">
                                            <span className="input-title">İşlədiyi vəzifəsi</span>
                                            <Form.Label>
                                                <Form.Control placeholder="Alt struktur bölmənin adı daxil edin"
                                                              value={position || ''} disabled={true}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Xəstəlik statusu</span>
                                            <Select
                                                placeholder="Xəstəlik statusunu seçin"
                                                value={selectedSickStatus}
                                                onChange={(val) => {
                                                    setSelectedSickStatus(val);
                                                }}
                                                isSearchable={sickStatusOptions ? sickStatusOptions.length > 5 ? true : false : false}
                                                options={sickStatusOptions}
                                                styles={customStyles}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="form-group">
                                            <span className="input-title">Xəstəlik vərəqəsinin nömrəsi</span>
                                            <Form.Label>
                                                <Form.Control placeholder="Xəstəlik vərəqəsinin nömrəsi"
                                                              value={sicknessSerialNum || ''}
                                                              onChange={(e) => setSicknessSerialNum(e.target.value)}
                                                />
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Xəstəliyin başladığı tarix </span>
                                            <Form.Label className="relative m-0">
                                                <DatePicker selected={startDate}
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selectsStart
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            onChange={(date) => setStartDate(date)}/>
                                                <Button className="btn-transparent">
                                                    <svg width="18" height="18"
                                                         viewBox="0 0 18 18" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <g opacity="0.8"
                                                           clipPath="url(#clip0)">
                                                            <path
                                                                d="M5.34327 8.75391H4.25583C3.97432 8.75391 3.74609 8.99002 3.74609 9.28125C3.74609 9.57248 3.97432 9.80859 4.25583 9.80859H5.34327C5.62478 9.80859 5.853 9.57248 5.853 9.28125C5.853 8.99002 5.62478 8.75391 5.34327 8.75391Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M5.34327 11.0039H4.25583C3.97432 11.0039 3.74609 11.24 3.74609 11.5312C3.74609 11.8225 3.97432 12.0586 4.25583 12.0586H5.34327C5.62478 12.0586 5.853 11.8225 5.853 11.5312C5.853 11.24 5.62478 11.0039 5.34327 11.0039Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M5.34327 13.2539H4.25583C3.97432 13.2539 3.74609 13.49 3.74609 13.7812C3.74609 14.0725 3.97432 14.3086 4.25583 14.3086H5.34327C5.62478 14.3086 5.853 14.0725 5.853 13.7812C5.853 13.49 5.62478 13.2539 5.34327 13.2539Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M9.69092 8.75391H8.60349C8.32198 8.75391 8.09375 8.99002 8.09375 9.28125C8.09375 9.57248 8.32198 9.80859 8.60349 9.80859H9.69092C9.97243 9.80859 10.2007 9.57248 10.2007 9.28125C10.2007 8.99002 9.97243 8.75391 9.69092 8.75391Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M9.69092 11.0039H8.60349C8.32198 11.0039 8.09375 11.24 8.09375 11.5312C8.09375 11.8225 8.32198 12.0586 8.60349 12.0586H9.69092C9.97243 12.0586 10.2007 11.8225 10.2007 11.5312C10.2007 11.24 9.97243 11.0039 9.69092 11.0039Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M9.69092 13.2539H8.60349C8.32198 13.2539 8.09375 13.49 8.09375 13.7812C8.09375 14.0725 8.32198 14.3086 8.60349 14.3086H9.69092C9.97243 14.3086 10.2007 14.0725 10.2007 13.7812C10.2007 13.49 9.97243 13.2539 9.69092 13.2539Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M14.0425 8.75391H12.955C12.6735 8.75391 12.4453 8.99002 12.4453 9.28125C12.4453 9.57248 12.6735 9.80859 12.955 9.80859H14.0425C14.324 9.80859 14.5522 9.57248 14.5522 9.28125C14.5522 8.99002 14.324 8.75391 14.0425 8.75391Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M14.0425 11.0039H12.955C12.6735 11.0039 12.4453 11.24 12.4453 11.5312C12.4453 11.8225 12.6735 12.0586 12.955 12.0586H14.0425C14.324 12.0586 14.5522 11.8225 14.5522 11.5312C14.5522 11.24 14.324 11.0039 14.0425 11.0039Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M14.0425 13.2539H12.955C12.6735 13.2539 12.4453 13.49 12.4453 13.7812C12.4453 14.0725 12.6735 14.3086 12.955 14.3086H14.0425C14.324 14.3086 14.5522 14.0725 14.5522 13.7812C14.5522 13.49 14.324 13.2539 14.0425 13.2539Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M16.319 2.28516H15.0956V1.40625C15.0956 1.11502 14.8674 0.878906 14.5859 0.878906C14.3044 0.878906 14.0762 1.11502 14.0762 1.40625V2.28516H9.65845V1.40625C9.65845 1.11502 9.43023 0.878906 9.14872 0.878906C8.86721 0.878906 8.63898 1.11502 8.63898 1.40625V2.28516H4.22127V1.40625C4.22127 1.11502 3.99304 0.878906 3.71153 0.878906C3.43002 0.878906 3.20179 1.11502 3.20179 1.40625V2.28516H1.97843C1.13522 2.28516 0.449219 2.99486 0.449219 3.86719V15.5391C0.449219 16.4114 1.13522 17.1211 1.97843 17.1211H16.319C17.1622 17.1211 17.8482 16.4114 17.8482 15.5391C17.8482 15.1987 17.8482 4.16338 17.8482 3.86719C17.8482 2.99486 17.1622 2.28516 16.319 2.28516ZM1.46869 3.86719C1.46869 3.57641 1.69736 3.33984 1.97843 3.33984H3.20179V4.21875C3.20179 4.50998 3.43002 4.74609 3.71153 4.74609C3.99304 4.74609 4.22127 4.50998 4.22127 4.21875V3.33984H8.63898V4.21875C8.63898 4.50998 8.86721 4.74609 9.14872 4.74609C9.43023 4.74609 9.65845 4.50998 9.65845 4.21875V3.33984H14.0762V4.21875C14.0762 4.50998 14.3044 4.74609 14.5859 4.74609C14.8674 4.74609 15.0956 4.50998 15.0956 4.21875V3.33984H16.319C16.6001 3.33984 16.8287 3.57641 16.8287 3.86719V5.94141H1.46869V3.86719ZM16.319 16.0664H1.97843C1.69736 16.0664 1.46869 15.8298 1.46869 15.5391V6.99609H16.8287V15.5391C16.8287 15.8298 16.6001 16.0664 16.319 16.0664Z"
                                                                fill="#181818"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0">
                                                                <rect width="17.399"
                                                                      height="18"
                                                                      fill="white"
                                                                      transform="translate(0.449219)"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </Button>
                                            </Form.Label>
                                            <div className="validation-block flex-start">
                                                {

                                                    errors['temporaryPass.from'] !== '' ?
                                                        <span
                                                            className="text-validation">{errors['temporaryPass.from']}</span>
                                                        : null
                                                }
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group className="form-group">
                                            <span className="input-title">Xəstəliyin bitdiyi tarix </span>
                                            <Form.Label className="relative m-0">
                                                <DatePicker
                                                    selected={endDate}
                                                    dateFormat="dd-MM-yyyy"
                                                    placeholderText="DD-MM-YYYY"
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    onChange={(date) => setEndDate(date)}
                                                    selectsEnd
                                                    startDate={startDate}
                                                    endDate={endDate}
                                                    minDate={startDate}/>
                                                <Button className="btn-transparent">
                                                    <svg width="18" height="18"
                                                         viewBox="0 0 18 18" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <g opacity="0.8"
                                                           clipPath="url(#clip0)">
                                                            <path
                                                                d="M5.34327 8.75391H4.25583C3.97432 8.75391 3.74609 8.99002 3.74609 9.28125C3.74609 9.57248 3.97432 9.80859 4.25583 9.80859H5.34327C5.62478 9.80859 5.853 9.57248 5.853 9.28125C5.853 8.99002 5.62478 8.75391 5.34327 8.75391Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M5.34327 11.0039H4.25583C3.97432 11.0039 3.74609 11.24 3.74609 11.5312C3.74609 11.8225 3.97432 12.0586 4.25583 12.0586H5.34327C5.62478 12.0586 5.853 11.8225 5.853 11.5312C5.853 11.24 5.62478 11.0039 5.34327 11.0039Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M5.34327 13.2539H4.25583C3.97432 13.2539 3.74609 13.49 3.74609 13.7812C3.74609 14.0725 3.97432 14.3086 4.25583 14.3086H5.34327C5.62478 14.3086 5.853 14.0725 5.853 13.7812C5.853 13.49 5.62478 13.2539 5.34327 13.2539Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M9.69092 8.75391H8.60349C8.32198 8.75391 8.09375 8.99002 8.09375 9.28125C8.09375 9.57248 8.32198 9.80859 8.60349 9.80859H9.69092C9.97243 9.80859 10.2007 9.57248 10.2007 9.28125C10.2007 8.99002 9.97243 8.75391 9.69092 8.75391Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M9.69092 11.0039H8.60349C8.32198 11.0039 8.09375 11.24 8.09375 11.5312C8.09375 11.8225 8.32198 12.0586 8.60349 12.0586H9.69092C9.97243 12.0586 10.2007 11.8225 10.2007 11.5312C10.2007 11.24 9.97243 11.0039 9.69092 11.0039Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M9.69092 13.2539H8.60349C8.32198 13.2539 8.09375 13.49 8.09375 13.7812C8.09375 14.0725 8.32198 14.3086 8.60349 14.3086H9.69092C9.97243 14.3086 10.2007 14.0725 10.2007 13.7812C10.2007 13.49 9.97243 13.2539 9.69092 13.2539Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M14.0425 8.75391H12.955C12.6735 8.75391 12.4453 8.99002 12.4453 9.28125C12.4453 9.57248 12.6735 9.80859 12.955 9.80859H14.0425C14.324 9.80859 14.5522 9.57248 14.5522 9.28125C14.5522 8.99002 14.324 8.75391 14.0425 8.75391Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M14.0425 11.0039H12.955C12.6735 11.0039 12.4453 11.24 12.4453 11.5312C12.4453 11.8225 12.6735 12.0586 12.955 12.0586H14.0425C14.324 12.0586 14.5522 11.8225 14.5522 11.5312C14.5522 11.24 14.324 11.0039 14.0425 11.0039Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M14.0425 13.2539H12.955C12.6735 13.2539 12.4453 13.49 12.4453 13.7812C12.4453 14.0725 12.6735 14.3086 12.955 14.3086H14.0425C14.324 14.3086 14.5522 14.0725 14.5522 13.7812C14.5522 13.49 14.324 13.2539 14.0425 13.2539Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M16.319 2.28516H15.0956V1.40625C15.0956 1.11502 14.8674 0.878906 14.5859 0.878906C14.3044 0.878906 14.0762 1.11502 14.0762 1.40625V2.28516H9.65845V1.40625C9.65845 1.11502 9.43023 0.878906 9.14872 0.878906C8.86721 0.878906 8.63898 1.11502 8.63898 1.40625V2.28516H4.22127V1.40625C4.22127 1.11502 3.99304 0.878906 3.71153 0.878906C3.43002 0.878906 3.20179 1.11502 3.20179 1.40625V2.28516H1.97843C1.13522 2.28516 0.449219 2.99486 0.449219 3.86719V15.5391C0.449219 16.4114 1.13522 17.1211 1.97843 17.1211H16.319C17.1622 17.1211 17.8482 16.4114 17.8482 15.5391C17.8482 15.1987 17.8482 4.16338 17.8482 3.86719C17.8482 2.99486 17.1622 2.28516 16.319 2.28516ZM1.46869 3.86719C1.46869 3.57641 1.69736 3.33984 1.97843 3.33984H3.20179V4.21875C3.20179 4.50998 3.43002 4.74609 3.71153 4.74609C3.99304 4.74609 4.22127 4.50998 4.22127 4.21875V3.33984H8.63898V4.21875C8.63898 4.50998 8.86721 4.74609 9.14872 4.74609C9.43023 4.74609 9.65845 4.50998 9.65845 4.21875V3.33984H14.0762V4.21875C14.0762 4.50998 14.3044 4.74609 14.5859 4.74609C14.8674 4.74609 15.0956 4.50998 15.0956 4.21875V3.33984H16.319C16.6001 3.33984 16.8287 3.57641 16.8287 3.86719V5.94141H1.46869V3.86719ZM16.319 16.0664H1.97843C1.69736 16.0664 1.46869 15.8298 1.46869 15.5391V6.99609H16.8287V15.5391C16.8287 15.8298 16.6001 16.0664 16.319 16.0664Z"
                                                                fill="#181818"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0">
                                                                <rect width="17.399"
                                                                      height="18"
                                                                      fill="white"
                                                                      transform="translate(0.449219)"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </Button>
                                            </Form.Label>
                                            <div className="validation-block flex-start">
                                                {

                                                    errors['temporaryPass.to'] !== '' ?
                                                        <span
                                                            className="text-validation">{errors['temporaryPass.to']}</span>
                                                        : null
                                                }
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group className="form-group">
                                            <span className="input-title">İşə başlama tarixi</span>
                                            <Form.Label className="relative m-0">
                                                <DatePicker selected={joinDate}
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            onChange={(date) => setJoinDate(date)}/>
                                                <Button className="btn-transparent">
                                                    <svg width="18" height="18"
                                                         viewBox="0 0 18 18" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <g opacity="0.8"
                                                           clipPath="url(#clip0)">
                                                            <path
                                                                d="M5.34327 8.75391H4.25583C3.97432 8.75391 3.74609 8.99002 3.74609 9.28125C3.74609 9.57248 3.97432 9.80859 4.25583 9.80859H5.34327C5.62478 9.80859 5.853 9.57248 5.853 9.28125C5.853 8.99002 5.62478 8.75391 5.34327 8.75391Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M5.34327 11.0039H4.25583C3.97432 11.0039 3.74609 11.24 3.74609 11.5312C3.74609 11.8225 3.97432 12.0586 4.25583 12.0586H5.34327C5.62478 12.0586 5.853 11.8225 5.853 11.5312C5.853 11.24 5.62478 11.0039 5.34327 11.0039Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M5.34327 13.2539H4.25583C3.97432 13.2539 3.74609 13.49 3.74609 13.7812C3.74609 14.0725 3.97432 14.3086 4.25583 14.3086H5.34327C5.62478 14.3086 5.853 14.0725 5.853 13.7812C5.853 13.49 5.62478 13.2539 5.34327 13.2539Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M9.69092 8.75391H8.60349C8.32198 8.75391 8.09375 8.99002 8.09375 9.28125C8.09375 9.57248 8.32198 9.80859 8.60349 9.80859H9.69092C9.97243 9.80859 10.2007 9.57248 10.2007 9.28125C10.2007 8.99002 9.97243 8.75391 9.69092 8.75391Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M9.69092 11.0039H8.60349C8.32198 11.0039 8.09375 11.24 8.09375 11.5312C8.09375 11.8225 8.32198 12.0586 8.60349 12.0586H9.69092C9.97243 12.0586 10.2007 11.8225 10.2007 11.5312C10.2007 11.24 9.97243 11.0039 9.69092 11.0039Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M9.69092 13.2539H8.60349C8.32198 13.2539 8.09375 13.49 8.09375 13.7812C8.09375 14.0725 8.32198 14.3086 8.60349 14.3086H9.69092C9.97243 14.3086 10.2007 14.0725 10.2007 13.7812C10.2007 13.49 9.97243 13.2539 9.69092 13.2539Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M14.0425 8.75391H12.955C12.6735 8.75391 12.4453 8.99002 12.4453 9.28125C12.4453 9.57248 12.6735 9.80859 12.955 9.80859H14.0425C14.324 9.80859 14.5522 9.57248 14.5522 9.28125C14.5522 8.99002 14.324 8.75391 14.0425 8.75391Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M14.0425 11.0039H12.955C12.6735 11.0039 12.4453 11.24 12.4453 11.5312C12.4453 11.8225 12.6735 12.0586 12.955 12.0586H14.0425C14.324 12.0586 14.5522 11.8225 14.5522 11.5312C14.5522 11.24 14.324 11.0039 14.0425 11.0039Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M14.0425 13.2539H12.955C12.6735 13.2539 12.4453 13.49 12.4453 13.7812C12.4453 14.0725 12.6735 14.3086 12.955 14.3086H14.0425C14.324 14.3086 14.5522 14.0725 14.5522 13.7812C14.5522 13.49 14.324 13.2539 14.0425 13.2539Z"
                                                                fill="#181818"/>
                                                            <path
                                                                d="M16.319 2.28516H15.0956V1.40625C15.0956 1.11502 14.8674 0.878906 14.5859 0.878906C14.3044 0.878906 14.0762 1.11502 14.0762 1.40625V2.28516H9.65845V1.40625C9.65845 1.11502 9.43023 0.878906 9.14872 0.878906C8.86721 0.878906 8.63898 1.11502 8.63898 1.40625V2.28516H4.22127V1.40625C4.22127 1.11502 3.99304 0.878906 3.71153 0.878906C3.43002 0.878906 3.20179 1.11502 3.20179 1.40625V2.28516H1.97843C1.13522 2.28516 0.449219 2.99486 0.449219 3.86719V15.5391C0.449219 16.4114 1.13522 17.1211 1.97843 17.1211H16.319C17.1622 17.1211 17.8482 16.4114 17.8482 15.5391C17.8482 15.1987 17.8482 4.16338 17.8482 3.86719C17.8482 2.99486 17.1622 2.28516 16.319 2.28516ZM1.46869 3.86719C1.46869 3.57641 1.69736 3.33984 1.97843 3.33984H3.20179V4.21875C3.20179 4.50998 3.43002 4.74609 3.71153 4.74609C3.99304 4.74609 4.22127 4.50998 4.22127 4.21875V3.33984H8.63898V4.21875C8.63898 4.50998 8.86721 4.74609 9.14872 4.74609C9.43023 4.74609 9.65845 4.50998 9.65845 4.21875V3.33984H14.0762V4.21875C14.0762 4.50998 14.3044 4.74609 14.5859 4.74609C14.8674 4.74609 15.0956 4.50998 15.0956 4.21875V3.33984H16.319C16.6001 3.33984 16.8287 3.57641 16.8287 3.86719V5.94141H1.46869V3.86719ZM16.319 16.0664H1.97843C1.69736 16.0664 1.46869 15.8298 1.46869 15.5391V6.99609H16.8287V15.5391C16.8287 15.8298 16.6001 16.0664 16.319 16.0664Z"
                                                                fill="#181818"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0">
                                                                <rect width="17.399"
                                                                      height="18"
                                                                      fill="white"
                                                                      transform="translate(0.449219)"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </Button>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group className="form-group">
                                            <span className="input-title">Əmək q. itirdiyi günədək Limanda işlə. fasiləsiz staj.</span>
                                            <Form.Label>
                                                <Form.Control placeholder="Əmək q. itirdiyi günədək Limanda işlə. fasiləsiz staj"
                                                              value={practice} disabled={true} type="number"/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group className="form-group">
                                            <span className="input-title">Ümumi əmək stajı</span>
                                            <Form.Label>
                                                <Form.Control placeholder="Ümumi əmək stajı"
                                                              value={generalPractice} disabled={true} type="number"/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group className="form-group">
                                            <span className="input-title">SSN</span>
                                            <Form.Label>
                                                <Form.Control placeholder="SSN"
                                                              value={ssn || ''} disabled={true}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                            <div className="flex-vertical-center btn-block">
                                <Button className="btn-effect" onClick={() => senData()}>
                                    Yadda saxla
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Container>
            </div>
            {
                loadingIndicator ? <Indicator/> : null
            }
        </Aux>

    );
}

export default EditSickness
