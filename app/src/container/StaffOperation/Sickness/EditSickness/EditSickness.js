import React, {useState, useEffect} from 'react';
import Aux from "../../../../hoc/Auxiliary";
import {Container, Tabs, Tab, Table, Button, OverlayTrigger, Tooltip, Form, Row, Col} from 'react-bootstrap';
import {Link, useHistory, useLocation, useParams, useRouteMatch} from 'react-router-dom';
import {mainAxios} from "../../../../components/Axios/axios";
import Paginate from "../../../../components/Pagination/Pagination";
import Swal from "sweetalert2";
import moment from "moment";
import Select from "react-select";
import {customStyles} from "../../../../components/Select/SelectStyle";
import DatePicker from "react-datepicker";
import Indicator from "../../../../components/Loading/Indicator";

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
    const [sicknessFileArr, setSicknessFileArr] = useState(['']);
    const [sickFileNameArr, setSickFileNameArr] = useState([])


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
            data.endDate !== null ? setEndDate(new Date(data.endDate)) : setEndDate(new Date(data.endDate));
            data.joinDate !== null ? setJoinDate(new Date(data.startJobDate)) : setJoinDate(new Date(data.startJobDate));
            setPractice(parseFloat(data.portExperience));
            setGeneralPractice(data.totalExperience);
            setSSn(data.ssn);
            setSicknessSerialNum(data.series);
            setSickFileNameArr(data.fileNames);
            console.log(data.fileNames);
            console.log(sickFileNameArr)
            for (let i of sickStatusOptions) {
                if (data.sickStatus === i.label) {
                    setSelectedSickStatus(i)
                }
            }
        });
    }


    const addSicknessFileArr = () => {
        setSicknessFileArr(sicknessFileArr => [...sicknessFileArr, " "])
    }

    const updateData = () => {
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
            method: 'put',
            url: `/sick/${id}`,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setLoadingIndicator(false);
            sendSicknessFile();
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

    const deleteSicknessFile = (fileName) => {
        mainAxios({
            method: 'delete',
            url: `/sick/file/${fileName}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getSicknessData();
        });
    }

    const downloadSickFile = (fileName) => {
        mainAxios({
            method: 'get',
            url: `/sick/file/${fileName}`,
            params: {
                token : localStorage.getItem('token')
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
        });
    }

    const sendSicknessFile = () => {
        const formData = new FormData();
        for (let i = 0; i < sicknessFileArr.length; i++) {
            formData.append("files", sicknessFileArr[i]);
        }
        mainAxios({
            method: 'post',
            url: `/sick/${id}/attach`,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            history.push("/operation")
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
                                                <Form.Control
                                                    placeholder="Əmək q. itirdiyi günədək Limanda işlə. fasiləsiz staj"
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
                                    <Col xs={12}>
                                        <div className="block-title">
                                            Şəkillər *
                                        </div>
                                        <Col xs={12}>
                                            <ul className="fileList list-unstyled flex-center">
                                                {
                                                    sickFileNameArr.map((item, index) =>
                                                        <li className="fileList-item flex-center">
                                                            <span className="fileList-item-name" onClick={()=> downloadSickFile(item)}>{item}</span>
                                                            <button className="btn-transparent" type="button" onClick={()=> deleteSicknessFile(item)}>
                                                                <svg width="14" height="14" viewBox="0 0 14 14"
                                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M7.87507 7.00003L12.9688 12.0937C13.2104 12.3354 13.2104 12.7271 12.9688 12.9688L12.9688 12.9688C12.8479 13.0896 12.6893 13.15 12.5312 13.15C12.3731 13.15 12.2145 13.0896 12.0937 12.9688L6.99999 7.87509L1.90632 12.9688L1.90631 12.9688C1.7855 13.0896 1.6269 13.15 1.46878 13.15C1.31067 13.15 1.15203 13.0896 1.03124 12.9688M7.87507 7.00003L6.12493 7M7.87507 7.00003L12.9688 1.9063C13.2104 1.66465 13.2104 1.27286 12.9688 1.03123C12.7271 0.789628 12.3353 0.789573 12.0937 1.03124C12.0937 1.03124 12.0937 1.03124 12.0937 1.03124L6.99999 6.12496L1.9063 1.03124C1.66465 0.789591 1.27286 0.789582 1.03123 1.03124C0.789628 1.27288 0.789573 1.66466 1.03124 1.9063C1.03124 1.9063 1.03124 1.9063 1.03124 1.9063L6.12493 7M7.87507 7.00003L6.12493 7M1.03124 12.9688L1.13729 12.8627L1.03124 12.9688C1.03124 12.9688 1.03124 12.9688 1.03124 12.9688ZM1.03124 12.9688C0.789582 12.7272 0.789594 12.3354 1.03124 12.0937L6.12493 7"
                                                                        fill="#3083DC" stroke="#3083DC"
                                                                        strokeWidth="0.3"/>
                                                                </svg>
                                                            </button>
                                                        </li>
                                                    )
                                                }

                                            </ul>
                                        </Col>
                                        <Col xs={6}>
                                            <div className="block-inn relative">
                                                <div className="addition-content">
                                                    {
                                                        sicknessFileArr.map((item, index) =>
                                                            <Form.Group className="form-group input-file" key={index}>
                                                                <div className="flex">
                                                                    <span className="input-title">Fayl daxil edin</span>

                                                                    {
                                                                        index === 0 ? null :
                                                                            <button
                                                                                className=" btn-remove flex-center"
                                                                                onClick={() => {
                                                                                    sicknessFileArr.splice(index, 1);
                                                                                    setSicknessFileArr([...sicknessFileArr], sicknessFileArr)
                                                                                }}>
                                                                                <svg width="14" height="14"
                                                                                     viewBox="0 0 14 14" fill="none"
                                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                                    <path
                                                                                        d="M11.1665 2.69336L10.2739 12.8645H3.7302L2.8378 2.69336L1.70703 2.79248L2.61572 13.1481C2.66354 13.6254 3.07769 13.9997 3.5588 13.9997H10.4453C10.9262 13.9997 11.3405 13.6256 11.3892 13.1413L12.2973 2.79248L11.1665 2.69336Z"
                                                                                        fill="#CF3131"/>
                                                                                    <path
                                                                                        d="M9.08077 0H4.91861C4.397 0 3.97266 0.424348 3.97266 0.945957V2.74326H5.10778V1.13512H8.89155V2.74323H10.0267V0.94593C10.0267 0.424348 9.60238 0 9.08077 0Z"
                                                                                        fill="#CF3131"/>
                                                                                    <path
                                                                                        d="M13.0507 2.17578H0.942574C0.629078 2.17578 0.375 2.42986 0.375 2.74336C0.375 3.05685 0.629078 3.31093 0.942574 3.31093H13.0507C13.3642 3.31093 13.6183 3.05685 13.6183 2.74336C13.6183 2.42986 13.3642 2.17578 13.0507 2.17578Z"
                                                                                        fill="#CF3131"/>
                                                                                </svg>
                                                                                <span>Sil</span>
                                                                            </button>
                                                                    }
                                                                </div>

                                                                <Form.Label className="relative m-0 upload-content">
                                                                    <Form.Control
                                                                        placeholder="Alt struktur bölmənin adı daxil edin"
                                                                        type="file"
                                                                        onChange={(e) => {
                                                                            sicknessFileArr[index] = e.target.files[0];
                                                                            setSicknessFileArr([...sicknessFileArr], sicknessFileArr);
                                                                        }}
                                                                    />
                                                                    <p className="m-0 flex-center">{item !== undefined ? item.name : ''}</p>
                                                                    <Button className="btn-transparent">
                                                                        <svg width="20" height="20" viewBox="0 0 20 20"
                                                                             fill="none"
                                                                             xmlns="http://www.w3.org/2000/svg">
                                                                            <g clipPath="url(#clip0_2354_34)">
                                                                                <path
                                                                                    d="M5.45996 20C4.11644 20 2.85691 19.4801 1.91322 18.536C0.969524 17.5919 0.449219 16.3328 0.449219 14.9893C0.449219 13.6461 0.969144 12.3866 1.91322 11.4429L12.2866 1.06951C13.7708 -0.413877 16.077 -0.347366 17.6508 1.22647C19.2247 2.80031 19.2923 5.10614 17.8082 6.59066L8.063 16.3358C7.14819 17.2506 5.65835 17.2522 4.74202 16.3358C3.82645 15.4199 3.82683 13.93 4.74202 13.0149L11.3433 6.41356C11.566 6.19084 11.9267 6.19084 12.1494 6.41356C12.3721 6.63627 12.3721 6.99695 12.1494 7.21967L5.54813 13.821C5.07723 14.2919 5.07723 15.0584 5.54813 15.5297C6.01979 16.0006 6.78599 15.9999 7.25689 15.5297L17.0021 5.78455C18.0263 4.75991 17.9591 3.14692 16.8447 2.03258C15.7304 0.918241 14.1174 0.85097 13.0927 1.87562L2.71933 12.249C1.99075 12.9776 1.5894 13.9509 1.5894 14.9893C1.5894 16.028 1.99075 17.0013 2.71933 17.7299C3.44791 18.4585 4.42125 18.8598 5.45996 18.8598C6.49828 18.8598 7.47162 18.4585 8.2002 17.7299L18.5736 7.35649C18.7963 7.13377 19.157 7.13377 19.3797 7.35649C19.6024 7.57921 19.6024 7.93988 19.3797 8.1626L9.00631 18.536C8.06262 19.4797 6.80309 20 5.45996 20Z"
                                                                                    fill="#193651"/>
                                                                            </g>
                                                                            <defs>
                                                                                <clipPath id="clip0_2354_34">
                                                                                    <rect width="20" height="20"
                                                                                          fill="white"/>
                                                                                </clipPath>
                                                                            </defs>
                                                                        </svg>
                                                                    </Button>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        )
                                                    }
                                                    <div className="flex-end">
                                                        <button type="button" className=" add-btn btn-color"
                                                                onClick={() => addSicknessFileArr()}
                                                        >
                                                            <svg width="12" height="12" viewBox="0 0 12 12"
                                                                 fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M0.667969 6.00033H11.3346M6.0013 0.666992V11.3337V0.666992Z"
                                                                    stroke="#3083DC" strokeWidth="1.3"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"/>
                                                            </svg>
                                                            <span>əlavə et</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Col>
                                </Row>
                            </div>
                            <div className="flex-vertical-center btn-block">
                                <Button className="btn-effect" onClick={() => updateData()}>
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
