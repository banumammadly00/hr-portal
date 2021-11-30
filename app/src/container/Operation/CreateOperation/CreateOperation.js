import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Button, Container, Row, Col, Form, Tabs, Tab} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import Select from 'react-select';
import {mainAxios} from "../../../components/Axios/axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import Swal from 'sweetalert2';

const WorkModeOptions = [
    {value: 'DAILY', label: 'Gündəlik'},
    {value: 'ALTERNATELY', label: 'Növbəli'},
]

const disciplineOptions = [
    {value: "TOHMET", label: "Töhmət"},
    {value: "SIDDETLI_TOHMET ", label: "Şiddətli töhmət"},
];

const vacationReasonOptions = [
    {value: 1, label: "Ailə üzvlərindən birinin rəhmətə getməsi"},
    {value: 2, label: "İşçinin ailə həyatı qurması"},
    {value: 3, label: "İşçinin uşağının birinci sinifə getməsi"},
    {value: 4, label: "İşçinin övladının hərbi xidmətə yola salınması və ya hərbi xidmətdə ziyarət"},
]


const reasonOptions = [
    {value: 1, label: "İş vaxtından artıq işə cəlb edilmə haqqında "},
    {value: 2, label: "İstirahət və ya bayram günündə işə cəlb edilmə haqqında "},
]

const monthOptions = [
    {value: 1, label: 'January'},
    {value: 2, label: 'February'},
    {value: 3, label: 'March'},
    {value: 4, label: 'April'},
    {value: 5, label: 'May'},
    {value: 6, label: 'June'},
    {value: 7, label: 'July'},
    {value: 8, label: 'August'},
    {value: 9, label: 'September'},
    {value: 10, label: 'October'},
    {value: 11, label: 'November'},
    {value: 12, label: 'December'},
]

const jobTimeOptions = [
    {value: 'PART_TIME', label: 'Tam'},
    {value: 'FULL_TIME', label: 'Natamam'},
]


function CreateOperation() {
    let history = useHistory();


    const [operationType, setOperationType] = useState([]);
    const [operationTypeArr, setOperationTypeArr] = useState([]);
    const [selectedOperationType, setSelectedOperationType] = useState(null);


    /*------Employee----------*/
    const [employee, setEmployee] = useState([]);

    const [department, setDepartment] = useState('')
    const [subDepartment, setSubDepartment] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dayInEvent, setDayInEvent] = useState('');



    /*------Vacancy----------*/
    const [vacancy, setVacancy] = useState([]);
    const [vacancyPosition, setVacancyPosition] = useState('');
    const [vacancyDepartment, setVacancyDepartment] = useState('');
    const [vacancySubDepartment, setVacancySubDepartment] = useState('');
    const [vacancyId, setVacancyId] = useState('');
    const [vacancyCount, setVacancyCount] = useState('');
    const [vacancyWorkMode, setVacancyWorkMode] = useState('');
    const [vacancyWorkPlace, setVacancyWorkPlace] = useState('');
    const [vacancyCategory, setVacancyCategory] = useState('');
    const [vacancyObeyDepartment, setVacancyObeyDepartment] = useState('');


    /*------General----------*/
    const [testPeriod, setTestPeriod] = useState('');
    const [individualAddition, setIndividualAddition] = useState('');
    const [selectedJobTime, setSelectedJobTime] = useState(null);
    const [grade, setGrade] = useState([])
    const [gradeArr, setGradeArr] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [subGrade, setSubGrade] = useState([]);
    const [selectedSubGrade, setSelectedSubGrade] = useState(null);
    const [vacancyMinGrade, setVacancyMinGrade] = useState(null);
    const [vacancyMaxGrade, setVacancyMaxGrade] = useState(null);
    const [joinDate, setJoinDate] = useState(null);



    const [selectedStaff, setSelectedStaff] = useState(null);
    const [selectedStaffArr, setSelectedStaffArr] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedNewWorkMode, setSelectedNewWorkMode] = useState(null);
    const [selectedDiscipline, setSelectedDiscipline] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [monthArr, setMonthArr] = useState([]);

    const [key, setKey] = useState('')
    const [noteArr, setNoteArr] = useState([""]);
    const [firedDate, setFiredDate] = useState(null);
    const [changeDate, setChangeDate] = useState(null);
    const [startVacationHeldDate, setStartVacationHeldDate] = useState(null);
    const [endVacationHeldDate, setEndVacationHeldDate] = useState(null);
    const [callBackDate, setCallBackDate] = useState(null);
    const [businessTripStart, setBusinessTripStart] = useState(null);
    const [businessTripEnd, setBusinessTripEnd] = useState(null);
    const [nonWorkDay, setNonWorkDay] = useState(null);
    const [givenNonWorkDay, setGivenNonWorkDay] = useState(null);
    const [selectedReason, setSelectedReason] = useState(null);
    const [selectedVacationReason, setSelectedVacationReason] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear());
    const [save, setSave] = useState(false);

    const [firedReason, setFiredReason] = useState('');
    const [compensation, setCompensation] = useState('');

    const [departments, setDepartments] = useState('');
    const [vacancyNames, setVacancyNames] = useState('');

    const [employeeId, setEmployeeId] = useState('');
    const [positionId, setPositionId] = useState('');
    const [employeeIds, setEmployeeIds] = useState([]);
    const [tab, setTab] = useState('')
    const [documentId, setDocumentId] = useState('');
    const [salary, setSalary] = useState('');
    const [vacancyName, setVacancyName] = useState('');
    const [workMode, setWorkMode] = useState('');
    const [mainOfOrder, setMainOfOrder] = useState('');
    const [additionalSalary, setAdditionalSalary] = useState('');
    const [ownAdditionalSalary, setOwnAdditionalSalary] = useState('');
    const [newSalary, setNewSalary] = useState('');
    const [newAdditionalSalary, setNewAdditionalSalary] = useState('');
    //const [newDepartmentName, setNewDepartmentName] = useState('');
    //const [newVacancyName, setNewVacancyName] = useState('');
    const [financialHelp, setFinancialHelp] = useState('');
    const [achievement, setAchievement] = useState('');
    const [changePeriod, setChangePeriod] = useState('');
    const [dayOutEvent, setDayOutEvent] = useState('');
    const [eventName, setEventName] = useState('');
    const [presentationFullName, setPresentationFullName] = useState('');
    const [presentationPosition, setPresentationPosition] = useState('');
    const [presentationDepartment, setPresentationDepartment] = useState('');
    const [callBackReason, setCallBackReason] = useState('');
    const [catchAmount, setCatchAmount] = useState('');
    const [amount, setAmount] = useState('');
    const [businessTripLocation, setBusinessTripLocation] = useState('');
    const [businessTripPeriod, setBusinessTripPeriod] = useState('');

    /*position*/
    const [positionDepartment, setPositionDepartment] = useState('')
    const [positionSubDepartment, setPositionSubDepartment] = useState('');
    const [positionVacancyName, setPositionVacancyName] = useState('');
    const [positionSalary, setPositionSalary] = useState('');
    const [positionAdditionalSalary, setPositionAdditionalSalary] = useState('');
    //const [positionOwnAdditionalSalary, setPositionOwnAdditionalSalary] = useState('');
    const [positionVacancyCount, setPositionVacancyCount] = useState('');
    const [positionWorkMode, setPositionWorkMode] = useState('');
    const [positionVacancyCategory, setPositionVacancyCategory] = useState('');
    const [positionWorkPlace, setPositionWorkPlace] = useState('');

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: '#193651',
            backgroundColor: state.isSelected ? '#F3F8FF' : 'transparent',
            padding: '5px 16px',
            margin: '0',
            fontSize: '14px',
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
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            position: 'relative',
            textAlign: 'left'

        }),

        indicatorSeparator: () => {
        },

        indicatorsContainer: (provided) => ({
            ...provided,
            paddingRight: '4px'
        }),

        control: (provided) => ({
            ...provided,
            minHeight: '42px',
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
            padding: '2px 8px 2px 12px'
        }),


        menu: (provided) => ({
            ...provided,
            borderRadius: '2px',
            padding: '10px 0',
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

        }),

        placeholder: (provided) => ({
            ...provided,
            width: '100%',
            textAlign: 'left',
            whiteSpace : 'nowrap'

        }),

    };

    const getOperationName = () => {
        mainAxios({
            method: 'get',
            url: '/operations/types',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setOperationTypeArr(res.data);
        });
    }

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

    const getGrade = () => {
        mainAxios({
            method: 'get',
            url: '/grades',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let data = res.data;
            setGrade(data);
        });
    }

    const getSubGrade = () => {
        mainAxios({
            method: 'get',
            url: '/sub-grades',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let data = res.data;
            setSubGrade(data);
        });
    }

    const getEmployeeData = (id) => {
        mainAxios({
            method: 'get',
            url: '/employees/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let data = res.data.content

            /*     setDepartment(data.departmentName);
                 setSubDepartment(data.subDepartmentName);
                 setVacancyName(data.vacancyName);
                 setSalary(data.salary)
                 setOwnAdditionalSalary(data.ownAdditionalSalary);
                 setAdditionalSalary(data.additionalSalary);
                 setWorkMode(data.workMode)*/
        });
    }

    const getVacancy = () => {
        mainAxios({
            method: 'get',
            url: '/vacancies/all',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
                let data = res.data;
                let arr = [];
                if (data.length > 0)
                    data.forEach(function (elem) {
                        arr.push({
                            id: elem.id,
                            position: elem.position !== null ? elem.position.name : null,
                            department: elem.department !== null ? elem.department.name : null
                        })
                    });
                setVacancy(arr)
            }
        );
    }

    const getVacancyData = (id) => {
        mainAxios({
            method: 'get',
            url: '/vacancies/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let generalData = res.data.generalInformation;
            if (generalData !== null) {
                setVacancyDepartment(generalData.department !== null ? generalData.department.name : null);
                setVacancySubDepartment(generalData.subDepartment !== null ? generalData.subDepartment.name : null);
                setVacancyPosition(generalData.position !== null ? generalData.position.name : null);
                setVacancyCategory(generalData.positionCategory);
                setVacancyObeyDepartment(generalData.subordinateDepartment);
                setVacancyWorkMode(generalData.workMode);
                setVacancyWorkPlace(generalData.workPlace);
                setVacancyCount(generalData.count);
                let gradeData = generalData.gradeRange
                if (gradeData !== null) {
                    setVacancyMinGrade(gradeData.min);
                    setVacancyMaxGrade(gradeData.max);
                    let arr = []
                    for (let i = gradeData.min; i <= gradeData.max; i++) {
                        for (let j of grade) {
                            if (i === j.grade) {
                                arr.push(j)
                            }
                        }
                    }
                    setGradeArr(arr)
                } else {
                    setGradeArr(grade)
                }
            }


            /*            ;
                        setPositionSalary(data.salary);
                        setPositionVacancyName(data.vacancyName);
                        setPositionVacancyCount(data.vacancyCount);
                        setPositionVacancyCategory(data.vacancyCategory);
                        setPositionWorkMode(data.workMode);
                        setPositionWorkPlace(data.workPlace);
                        setPositionAdditionalSalary(data.additionalSalary)*/
        });
    }

    const resetData = () => {
        /*        setSelectedStaff(null);
                setSelectedPosition(null);
                setMainOfOrder('');
                setDepartment('');
                setSubDepartment('');
                setSalary('');
                setAdditionalSalary('');
                setOwnAdditionalSalary('');
                setPositionSalary('');
                setPositionVacancyCount('');
                setPositionSubDepartment('');
                setPositionDepartment('');
                setPositionVacancyCategory('');
                setPositionAdditionalSalary('');
                setPositionWorkMode('');
                setPositionWorkPlace('');
                setPositionVacancyName('');
                setOwnAdditionalSalary(null);
                setNewOwnAdditionalSalary('');
                setChangePeriod('');
                setNewAdditionalSalary('');
                setJoinDate(null);
                setChangeDate(null);
                setTestPeriod('');
                setNoteArr([""])*/
    }

    const senData = () => {

        let hireData = {
            "date": joinDate !== null ? moment(joinDate).format("YYYY-MM-DD") : null,
            "gradeId": selectedGrade !== null ? selectedGrade.id : null,
            "individualAddition": individualAddition !== '' ? parseFloat(individualAddition) : null,
            "subGradeId": selectedSubGrade !== null ? selectedSubGrade.id : null,
            "testPeriod": testPeriod !== "" ? parseFloat(testPeriod) : null,
            "jobTime": selectedJobTime !== null ? selectedJobTime.value : null
        }

        let workVacation = {
            "from": startDate !== null ? moment(startDate).format("YYYY-MM-DD") : null,
            "to": endDate !== null ? moment(endDate).format("YYYY-MM-DD") : null
        }

        const data = {
            "header": {
                "department": "string",
                "fullName": "string",
                "main": mainOfOrder !== "" ? mainOfOrder : null,
                "note": "string"
            },
            "hire": tab == "7" ? hireData : null,
            "type": operationType !== '' ? operationType : null,
            "vacancyId": vacancyId ? vacancyId : null,
            "employeeId": employeeId ? employeeId : null,
            "workVacation": tab == "17" ? workVacation : null


            /*            "achievementAmount": achievement !== "" ? parseFloat(achievement) : null,
                        "amount": amount !== "" ? parseFloat(amount) : null,
                        "businessTripLocation": businessTripLocation !== "" ? businessTripLocation : null,
                        "businessTripTerm": businessTripPeriod !== "" ? parseFloat(businessTripPeriod) : null,
                        "callBackDate": callBackDate !== null ? moment(callBackDate).format("MM-DD-YYYY") : null,
                        "callBackReason": callBackReason !== "" ? callBackReason : null,
                        "catchAmount": catchAmount !== "" ? parseFloat(catchAmount) : null,
                        "catchMonths": monthArr,
                        "changeDate": changeDate !== null ? moment(changeDate).format("MM-DD-YYYY") : null,
                        "changePeriod": changePeriod !== "" ? parseFloat(changePeriod) : null,
                        "compensation": compensation !== "" ? parseFloat(compensation) : null,
                        "dayInEvent": dayInEvent !== "" ? parseFloat(dayInEvent) : null,
                        "dayInEvent2": dayOutEvent !== "" ? parseFloat(dayOutEvent) : null,
                        "disciplineType": selectedDiscipline !== null ? selectedDiscipline.value : null,
                        "dismissalDate": firedDate !== null ? moment(firedDate).format("MM-DD-YYYY") : null,
                        "dismissalReason": firedReason !== "" ? firedReason : null,
                        "documentType": documentId ? documentId : null,
                        "employeeIds": employeeIds,
                        "eventToBusinessTripDate": businessTripStart !== null ? moment(businessTripStart).format("MM-DD-YYYY") : null,
                        "eventFromBusinessTripDate": businessTripEnd !== null ? moment(businessTripEnd).format("MM-DD-YYYY") : null,
                        "eventFrom": startDate !== null ? moment(startDate).format("MM-DD-YYYY") : null,
                        "eventFrom2": startVacationHeldDate !== null ? moment(startVacationHeldDate).format("MM-DD-YYYY") : null,
                        "eventName": eventName !== "" ? eventName : null,
                        "eventTo": endDate !== null ? moment(endDate).format("MM-DD-YYYY") : null,
                        "eventTo2": endVacationHeldDate !== null ? moment(endVacationHeldDate).format("MM-DD-YYYY") : null,
                        "financialHelp": financialHelp !== "" ? parseFloat(financialHelp) : null,
                        "givenNonWorkDay": givenNonWorkDay !== null ? moment(givenNonWorkDay).format("MM-DD-YYYY") : null*/,
            /*
                        "joinDate": joinDate !== null ? moment(joinDate).format("MM-DD-YYYY") : null,
            */
            /*
                        "mainOfOrder": mainOfOrder !== "" ? mainOfOrder : null,
            */
            /*            "newAdditionalSalary": newAdditionalSalary !== "" ? newAdditionalSalary : null,
                        "newOwnAdditionalSalary": newOwnAdditionalSalary !== '' ? newOwnAdditionalSalary : null,
                        "newSalary": newSalary !== "" ? newSalary : null,
                        "newWorkMode": selectedNewWorkMode !== null ? selectedNewWorkMode.value : null,
                        "nonWorkDay": nonWorkDay !== null ? moment(nonWorkDay).format("MM-DD-YYYY") : null,
                        "notes": noteArr.length > 0 ? noteArr : null,
                        "ownAdditionalSalary": ownAdditionalSalary !== "" ? parseFloat(ownAdditionalSalary) : null,
                        "positionId": positionId ? positionId : null,
                        "presentationOwnerDepartment": presentationDepartment !== "" ? presentationDepartment : null,
                        "presentationOwnerName": presentationFullName !== "" ? presentationFullName : null,
                        "presentationOwnerPosition": presentationPosition !== "" ? presentationPosition : null,
                        "testPeriod": testPeriod !== "" ? parseFloat(testPeriod) : null,
                        "reason": selectedReason !== null ? selectedReason.label : null,
                        "serialNumber1": null,
                        "serialNumber2": null,
                        "titleDepartment": null,
                        "titleFullName": null,
                        "vacationReason": selectedVacationReason !== null ? selectedVacationReason.label : null,*/
        }

        mainAxios({
            method: 'post',
            url: '/operations',
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            Swal.fire({
                icon: 'success',
                text: 'Məlumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
            setSelectedOperationType('');
            setTab('');
            resetData();
            setSave(false);
            history.push("/operation")
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                text: 'Məlumatlar qeyd edilmədi!',
                cancelButtonText: 'Bağla',
                showCancelButton: true,
                showConfirmButton: false,
            })
        });
    }

    useEffect(() => {
        getOperationName();
        getVacancy();
        getEmployee();
        getGrade();
        getSubGrade();
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
                            Kadr əməliyyatı yarat
                        </div>
                    </div>
                    <div className="block">
                        <Form className="form-list">
                            <Row>
                                <Col xs={12}>
                                    <Form.Group className="form-group">
                                        <span className="input-title">Əmrin adı *</span>
                                        <Select
                                            placeholder="Vəzifə dəyişikliyi"
                                            value={selectedOperationType}
                                            onChange={(val) => {
                                                setSelectedOperationType(val);
                                                resetData()
                                                setOperationType(val.type)
                                                setSave(true);
                                                setTab(val.orderNo)
                                                setKey(val.label)
                                            }}
                                            options={operationTypeArr}
                                            isSearchable={operationTypeArr ? operationTypeArr.length > 5 ? true : false : false}
                                            getOptionLabel={(option) => (option.valueAz)}
                                            styles={customStyles}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="operation-tab">
                                <Tabs activeKey={tab}>

                                    <Tab eventKey="1" title="" disabled={tab !== "1"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ştatın nömrəsi</span>
                                                    <Select
                                                        placeholder="Ştatın nömrəsini seç"
                                                        value={selectedPosition}
                                                        onChange={(val) => {
                                                            setSelectedPosition(val);
                                                            getVacancyData(val.id);
                                                            setVacancyId(val.id);
                                                        }}
                                                        isSearchable={vacancy ? vacancy.length > 5 ? true : false : false}
                                                        options={vacancy}
                                                        getOptionLabel={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əmrin əsası</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ştat cədvəli dəyişiklik edilən struktur bölmə: </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Ştat cədvəli dəyişiklik edilən struktur bölmə adı daxil edin"
                                                            value={vacancyDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Struktur bölmənin adı </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Struktur bölmənin adı"
                                                                      value={vacancySubDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Tabe struktur bölmənin adı </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Tabe struktur bölmənin adı"
                                                                      value={vacancyObeyDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ştat vahidinin adı (vəzifə) </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ştat vahidinin adı (vəzifə)"
                                                                      value={vacancyPosition || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ştat vahidi (say) </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ştat vahidi (say)  "
                                                                      value={vacancyCount || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <span className="input-title">Dərəcə</span>
                                                <div className="flex m-20">
                                                    <Form.Group className="form-group m-0 w-100">
                                                        <Form.Label>
                                                            <Form.Control
                                                                placeholder="Min dərəcə"
                                                                value={vacancyMinGrade || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                    <span className="break-line"></span>
                                                    <Form.Group className="form-group  m-0 w-100">
                                                        <Form.Label>
                                                            <Form.Control
                                                                placeholder="Max dərəcə"
                                                                value={vacancyMaxGrade || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>

                                                </div>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İş rejimi</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İş rejimi"
                                                                      value={vacancyWorkMode || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Təsis edilən vəzifənin kateqoriyası</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Təsis edilən vəzifənin kateqoriyası"
                                                                      value={vacancyCategory || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İş yerinin ünvanı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İş yerinin ünvanı"
                                                                      value={vacancyWorkPlace || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="2" title="" disabled={tab !== "2"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ştatın nömrəsi</span>
                                                    <Select
                                                        placeholder="Ştatın nömrəsini seç"
                                                        value={selectedPosition}
                                                        onChange={(val) => {
                                                            setSelectedPosition(val);
                                                            getVacancyData(val.id);
                                                            setVacancyId(val.id);
                                                        }}
                                                        isSearchable={vacancy ? vacancy.length > 5 ? true : false : false}
                                                        options={vacancy}
                                                        getOptionLabel={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əmrin əsası</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ştat cədvəli dəyişiklik edilən struktur bölmə: </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Ştat cədvəli dəyişiklik edilən struktur bölmə adı daxil edin"
                                                            value={vacancyDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Struktur bölmənin adı </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Struktur bölmənin adı"
                                                                      value={vacancySubDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Tabe struktur bölmənin adı </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Tabe struktur bölmənin adı"
                                                                      value={vacancyObeyDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ştat vahidinin adı (vəzifə) </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ştat vahidinin adı (vəzifə)"
                                                                      value={vacancyPosition || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ştat vahidi (say) </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Ştat vahidi (say)  "
                                                                      value={vacancyCount || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <span className="input-title">Dərəcə</span>
                                                <div className="flex m-20">
                                                    <Form.Group className="form-group m-0 w-100">
                                                        <Form.Label>
                                                            <Form.Control
                                                                placeholder="Min dərəcə"
                                                                value={vacancyMinGrade || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                    <span className="break-line"></span>
                                                    <Form.Group className="form-group  m-0 w-100">
                                                        <Form.Label>
                                                            <Form.Control
                                                                placeholder="Max dərəcə"
                                                                value={vacancyMaxGrade || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>

                                                </div>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İş rejimi</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İş rejimi"
                                                                      value={vacancyWorkMode || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İş yerinin ünvanı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İş yerinin ünvanı"
                                                                      value={vacancyWorkPlace || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="7" title="" disabled={tab !== "7"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əsaslandırma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin adı, soyadı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployeeData(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 ? true : false : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ştatın nömrəsi</span>
                                                    <Select
                                                        placeholder="Ştatın nömrəsini seç"
                                                        value={selectedPosition}
                                                        onChange={(val) => {
                                                            setSelectedPosition(val);
                                                            getVacancyData(val.id);
                                                            setVacancyId(val.id);
                                                        }}
                                                        isSearchable={vacancy ? vacancy.length > 5 ? true : false : false}
                                                        options={vacancy}
                                                        getOptionLabel={(option) => `${option.id}. ${option.position} - ${option.department}`}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşə qəbul olduğu struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşə qəbul olduğu struktur bölmə daxil edin"
                                                            value={vacancyDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşə qəbul olduğu alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Tabe struktur bölmənin adı"
                                                                      value={vacancySubDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Tabe struktur bölmənin adı </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Tabe struktur bölmənin adı"
                                                                      value={vacancyObeyDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşə qəbul olduğu vəzifə </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İşə qəbul olduğu vəzifə"
                                                                      value={vacancyPosition || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşə qəbul tarixi *</span>
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
                                                    <span className="input-title">Sınaq müddəti </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Sınaq müddəti"
                                                                      type="number"
                                                                      value={testPeriod}
                                                                      onChange={(e) => setTestPeriod(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Dərəcə</span>
                                                    <Select
                                                        placeholder="Dərəcə"
                                                        value={selectedGrade}
                                                        onChange={(val) => {
                                                            setSelectedGrade(val)
                                                        }}
                                                        isSearchable={gradeArr ? gradeArr.length > 5 ? true : false : false}
                                                        options={gradeArr}
                                                        getOptionLabel={(option) => (option.grade)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Alt dərəcə </span>
                                                    <Select
                                                        placeholder="Alt dərəcə"
                                                        value={selectedSubGrade}
                                                        onChange={(val) => {
                                                            setSelectedSubGrade(val)
                                                        }}
                                                        isSearchable={subGrade ? subGrade.length > 5 ? true : false : false}
                                                        options={subGrade}
                                                        getOptionLabel={(option) => (option.subGrade)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İş vaxtı </span>
                                                    <Select
                                                        placeholder="İş vaxtı"
                                                        value={selectedJobTime}
                                                        onChange={(val) => {
                                                            setSelectedJobTime(val)
                                                        }}
                                                        isSearchable={jobTimeOptions ? jobTimeOptions.length > 5 ? true : false : false}
                                                        options={jobTimeOptions}
                                                        getOptionLabel={(option) => (option.label)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Digər fərdi əlavə </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Digər fərdi əlavə"
                                                                      type="number"
                                                                      value={individualAddition}
                                                                      onChange={(e) => setIndividualAddition(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                                                      {/*  <Tab eventKey="8" title="" disabled={tab !== "8"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əmrin əsası</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin adı, soyadı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşlədiyi struktur bölmənin adı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Struktur bölmənin adı daxil edin"
                                                                      value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmənin adı *</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Alt struktur bölmənin adı daxil edin"
                                                                      value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşçinin vəzifəsi *</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Alt struktur bölmənin adı daxil edin"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşdən azad olma tarixi *</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={firedDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setFiredDate(date)}/>
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşdən azad olma səbəbi *</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İşdən azad olma səbəbini daxil edin"
                                                                      value={firedReason}
                                                                      onChange={(e) => setFiredReason(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İstifadə edilməmiş məzuniyyət gününə görə kompensasiya *</span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder="İstifadə edilməmiş məzuniyyət gününə görə kompensasiya daxil edin"
                                                            value={compensation}
                                                            disabled={true}
                                                            onChange={(e) => setCompensation(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <div className="addition-content">
                                            {
                                                noteArr.map((item, index) =>
                                                    <div key={index} className={index === 0 ? '' : 'add-item'}>
                                                        {
                                                            index === 0 ? null :
                                                                <div className="add-item-top">
                                                                    <p className="m-0"> #{index + 1}. Digər </p>
                                                                    <Button
                                                                        className="btn-transparent btn-remove flex-center"
                                                                        onClick={() => {
                                                                            noteArr.splice(index, 1);
                                                                            setNoteArr([...noteArr], noteArr)
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
                                                                    </Button>
                                                                </div>
                                                        }
                                                        <Row>
                                                            <Col xs={12}>
                                                                <Form.Group className="form-group">
                                                                    <span className="input-title">Qeyd</span>
                                                                    <Form.Label>
                                                                        <Form.Control as="textarea"
                                                                                      onChange={(e) => {
                                                                                          noteArr[index] = e.target.value;
                                                                                          setNoteArr([...noteArr], noteArr);
                                                                                      }}
                                                                                      value={item}
                                                                                      placeholder="Text..."
                                                                        />
                                                                    </Form.Label>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </Tab>*/}

                                {/*    <Tab eventKey="9" title="" disabled={tab !== "9"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin adı, soyadı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ştatın nömrəsi</span>
                                                    <Select
                                                        placeholder="Ştatın nömrəsini seç"
                                                        value={selectedPosition}
                                                        onChange={(val) => {
                                                            setSelectedPosition(val);
                                                            getPositionIdData(val.value);
                                                            setPositionId(val.value)
                                                        }}
                                                        isSearchable={position ? position.length > 5 ? true : false : false}
                                                        options={position}
                                                        getOptionLabel={(option) => option.value}
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşlədiyi vəzifəsi</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Alt struktur bölmənin adı daxil edin"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Dəyişiklik tarixi *</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={changeDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setChangeDate(date)}/>
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Keçirildiyi struktur bölmə</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                      value={positionDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Keçirildiyi vəzifə</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Keçirildiyi vəzifə"
                                                                      value={positionVacancyName || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <div>
                                            <div className="block-title">
                                                Faktiki əmək haqqı: AZN (vergilər və digər ödənişlər daxil olmaqla)
                                            </div>
                                            <Row>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                          value={salary || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                          value={additionalSalary || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Digər fərdi əlavə</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Digər fərdi əlavə daxil edin"
                                                                          value={ownAdditionalSalary || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div>
                                            <div className="block-title">
                                                Keçirildiyi əmək haqqı (AZN) vergilər və digər ödənişlər daxil olmaqla):
                                            </div>
                                            <Row>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                          value={newSalary}
                                                                          type="number"
                                                                          onChange={(e) => setNewSalary(e.target.value)}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                          value={newAdditionalSalary}
                                                                          type="number"
                                                                          onChange={(e) => setNewAdditionalSalary(e.target.value)}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Digər fərdi əlavə</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Digər fərdi əlavə daxil edin"
                                                                          value={newOwnAdditionalSalary}
                                                                          type="number"
                                                                          onChange={(e) => setNewOwnAdditionalSalary(e.target.value)}
                                                            />
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Tab>

                                    <Tab eventKey="10" title="" disabled={tab !== "10"}>
                                        <div className="block-inn">
                                            <Row>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin adı, soyadı, atasının adı *</span>
                                                        <Select
                                                            placeholder="İşçinin adı, soyadı, atasının adı"
                                                            value={selectedStaff}
                                                            onChange={(val) => {
                                                                let id = val.id
                                                                setEmployeeId(id)
                                                                getEmployee(id)
                                                                setSelectedStaff(val);
                                                            }}
                                                            isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                            options={staff}
                                                            getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                        <Form.Label>
                                                            <Form.Control
                                                                placeholder="İşlədiyi struktur bölmə"
                                                                value={department || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">İşlədiyi vəzifəsi </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                          value={vacancyName || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Dəyişiklik tarixi *</span>
                                                        <Form.Label className="relative m-0">
                                                            <DatePicker selected={changeDate}
                                                                        dateFormat="dd-MM-yyyy"
                                                                        placeholderText="DD-MM-YYYY"
                                                                        showMonthDropdown
                                                                        showYearDropdown
                                                                        dropdownMode="select"
                                                                        onChange={(date) => setChangeDate(date)}/>
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
                                            </Row>
                                        </div>
                                        <div className="block-inn">
                                            <div className="block-title">
                                                Faktiki əmək haqqı: AZN (vergilər və digər ödənişlər daxil olmaqla)
                                            </div>
                                            <Row>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                          value={salary || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                          value={additionalSalary || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Digər fərdi əlavə</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Digər fərdi əlavə daxil edin"
                                                                          value={ownAdditionalSalary || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="block-inn">
                                            <div className="block-title">
                                                Keçirildiyi əmək haqqı (AZN) vergilər və digər ödənişlər daxil olmaqla):
                                            </div>
                                            <Row>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                          value={newSalary}
                                                                          type="number"
                                                                          onChange={(e) => setNewSalary(e.target.value)}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                          value={newAdditionalSalary}
                                                                          type="number"
                                                                          onChange={(e) => setNewAdditionalSalary(e.target.value)}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Digər fərdi əlavə</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Digər fərdi əlavə daxil edin"
                                                                          value={newOwnAdditionalSalary}
                                                                          type="number"
                                                                          onChange={(e) => setNewOwnAdditionalSalary(e.target.value)}
                                                            />
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Tab>

                                    <Tab eventKey="11" title="" disabled={tab !== "11"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin adı, soyadı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşlədiyi vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Dəyişiklik tarixi *</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={changeDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setChangeDate(date)}/>
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
                                        </Row>
                                        <div>
                                            <div className="block-title">
                                                Faktiki əmək haqqı: AZN (vergilər və digər ödənişlər daxil olmaqla)
                                            </div>
                                            <Row>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                          value={salary || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                          value={additionalSalary || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div>
                                            <div className="block-title">
                                                Keçirildiyi əmək haqqı (AZN) vergilər və digər ödənişlər daxil olmaqla):
                                            </div>
                                            <Row>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                          value={newSalary}
                                                                          type="number"
                                                                          onChange={(e) => setNewSalary(e.target.value)}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                          value={newAdditionalSalary}
                                                                          type="number"
                                                                          onChange={(e) => setNewAdditionalSalary(e.target.value)}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Tab>

                                    <Tab eventKey="12" title="" disabled={tab !== "12"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, ata adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin işlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşlədiyi vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">İşçinin faktiki iş rejimi *</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İşçinin faktiki iş rejimi"
                                                                      value={workMode || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">İşçinin keçirildiyi iş rejimi *</span>
                                                    <Select
                                                        placeholder="İş rejimini seçin"
                                                        value={selectedNewWorkMode}
                                                        onChange={setSelectedNewWorkMode}
                                                        isSearchable={WorkModeOptions ? WorkModeOptions.length > 5 ? true : false : false}
                                                        options={WorkModeOptions}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title"> Faktiki əmək haqqı: AZN (vergilər və digər ödənişlər daxil olmaqla)</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder=" Faktiki əmək haqqı"
                                                                      value={salary || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Dəyişiklik edilən əmək haqqı Azn (vergilər və digər ödənişlər daxil olmaqla</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Dəyişiklik edilən əmək haqqı"
                                                                      value={newSalary}
                                                                      type="number"
                                                                      onChange={(e) => setNewSalary(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="13" title="" disabled={tab !== "13"}>
                                        <div className="block-inn">
                                            <Row>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">İşçinin ərizəsinə və təhsil müəssisəsi tərəfindən verilən çağırış </span>
                                                        <Form.Label>
                                                            <Form.Control
                                                                placeholder="İşçinin ərizəsinə və təhsil müəssisəsi tərəfindən verilən çağırış"
                                                                value={mainOfOrder}
                                                                onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, ata adı *</span>
                                                        <Select
                                                            placeholder="İşçinin adı, soyadı, atasının adı"
                                                            value={selectedStaff}
                                                            onChange={(val) => {
                                                                let id = val.id
                                                                setEmployeeId(id)
                                                                getEmployee(id)
                                                                setSelectedStaff(val);
                                                            }}
                                                            isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                            options={staff}
                                                            getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Ştatın nömrəsi</span>
                                                        <Select
                                                            placeholder="Ştatın nömrəsini seç"
                                                            value={selectedPosition}
                                                            onChange={(val) => {
                                                                setSelectedPosition(val);
                                                                getPositionIdData(val.value);
                                                                setPositionId(val.value)
                                                            }}
                                                            isSearchable={position ? position.length > 5 ? true : false : false}
                                                            options={position}
                                                            getOptionLabel={(option) => option.value}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                        <Form.Label>
                                                            <Form.Control
                                                                placeholder="İşlədiyi struktur bölmə"
                                                                value={department || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">İşlədiyi vəzifəsi </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                          value={vacancyName || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Dəyişiklik tarixi *</span>
                                                        <Form.Label className="relative m-0">
                                                            <DatePicker selected={changeDate}
                                                                        dateFormat="dd-MM-yyyy"
                                                                        placeholderText="DD-MM-YYYY"
                                                                        showMonthDropdown
                                                                        showYearDropdown
                                                                        dropdownMode="select"
                                                                        onChange={(date) => setChangeDate(date)}/>
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
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Keçirildiyi struktur bölmə</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                          value={positionDepartment || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span
                                                            className="input-title">Keçirildiyi alt struktur bölmə</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                          value={positionSubDepartment || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Keçirildiyi iş yeri</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Keçirildiyi iş yeri"
                                                                          value={positionWorkPlace || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="block-inn">
                                            <div className="block-title">
                                                Faktiki əmək haqqı: AZN (vergilər və digər ödənişlər daxil olmaqla)
                                            </div>
                                            <Row>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                          value={salary || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                          value={additionalSalary || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Digər fərdi əlavə</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Digər fərdi əlavə daxil edin"
                                                                          value={ownAdditionalSalary || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="block-inn">
                                            <div className="block-title">
                                                Keçirildiyi əmək haqqı (AZN) vergilər və digər ödənişlər daxil olmaqla):
                                            </div>
                                            <Row>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                          value={positionSalary || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                          value={positionAdditionalSalary || ''}
                                                                          disabled={true}
                                                            />
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Digər fərdi əlavə</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Digər fərdi əlavə daxil edin"
                                                                          value={newOwnAdditionalSalary}
                                                                          type="number"
                                                                          onChange={(e) => setNewOwnAdditionalSalary(e.target.value)}
                                                            />
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Tab>

                                    <Tab eventKey="14" title="" disabled={tab !== "14"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin adı, soyadı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ştatın nömrəsi</span>
                                                    <Select
                                                        placeholder="Ştatın nömrəsini seç"
                                                        value={selectedPosition}
                                                        onChange={(val) => {
                                                            setSelectedPosition(val);
                                                            getPositionIdData(val.value);
                                                            setPositionId(val.value)
                                                        }}
                                                        isSearchable={position ? position.length > 5 ? true : false : false}
                                                        options={position}
                                                        getOptionLabel={(option) => option.value}
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşlədiyi vəzifəsi</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Alt struktur bölmənin adı daxil edin"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Dəyişiklik tarixi *</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={changeDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setChangeDate(date)}/>
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Keçirildiyi müddət</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Keçirildiyi müddət"
                                                                      value={changePeriod}
                                                                      type="number"
                                                                      onChange={(e) => setChangePeriod(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Keçirildiyi struktur bölmə</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                      value={positionDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Keçirildiyi alt struktur bölmə</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                      value={positionSubDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Keçirildiyi iş yeri</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Keçirildiyi iş yeri"
                                                                      value={positionWorkPlace || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <div>
                                            <div className="block-title">
                                                Faktiki əmək haqqı: AZN (vergilər və digər ödənişlər daxil olmaqla)
                                            </div>
                                            <Row>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                          value={salary || ''} disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                          value={additionalSalary || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Digər fərdi əlavə</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Digər fərdi əlavə daxil edin"
                                                                          value={ownAdditionalSalary || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div>
                                            <div className="block-title">
                                                Keçirildiyi əmək haqqı (AZN) vergilər və digər ödənişlər daxil olmaqla):
                                            </div>
                                            <Row>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Ştat üzrə əsas əmək haqqı</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Ştat üzrə əsas əmək haqqı"
                                                                          value={positionSalary || ''}
                                                                          disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Əmək şəraitinə görə əlavə </span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Əmək şəraitinə görə əlavə"
                                                                          value={positionAdditionalSalary || ''}
                                                                          disabled={true}
                                                            />
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Digər fərdi əlavə</span>
                                                        <Form.Label>
                                                            <Form.Control placeholder="Digər fərdi əlavə daxil edin"
                                                                          value={newOwnAdditionalSalary}
                                                                          type="number"
                                                                          onChange={(e) => setNewOwnAdditionalSalary(e.target.value)}
                                                            />
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Tab>

                                    <Tab eventKey="15" title="" disabled={tab !== "15"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ştatın nömrəsi</span>
                                                    <Select
                                                        placeholder="Ştatın nömrəsini  seç"
                                                        value={selectedPosition}
                                                        onChange={(val) => {
                                                            setSelectedPosition(val);
                                                            getPositionIdData(val.value);
                                                            setPositionId(val.value)
                                                        }}
                                                        isSearchable={position ? position.length > 5 ? true : false : false}
                                                        options={position}
                                                        getOptionLabel={(option) => option.value}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşlədiyi Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Dəyişiklik tarixi *</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={changeDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setChangeDate(date)}/>
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Həvalə müddəti</span>
                                                    <div className="flex">
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
                                                        <span className="break-line"></span>
                                                        <Form.Label className="relative m-0">
                                                            <DatePicker
                                                                dateFormat="dd-MM-yyyy"
                                                                placeholderText="DD-MM-YYYY"
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                selected={endDate}
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
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Həvalə olunan vəzifə</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Həvalə olunan vəzifə"
                                                                      value={positionVacancyName || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Həvalə olunan vəzifənin aid olduğu struktur bölmə</span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Həvalə olunan vəzifənin aid olduğu struktur bölmə"
                                                            value={positionDepartment || ''}
                                                            disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Həvalə olunan vəzifənin aid olduğu alt struktur bölmə</span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Həvalə olunan vəzifənin aid olduğu alt struktur bölmə"
                                                            value={positionSubDepartment || ''}
                                                            disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Keçirildiyi iş yeri</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Keçirildiyi iş yeri"
                                                                      value={positionWorkPlace || ''}
                                                                      disabled={true}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əvəz edən işçinin əmək haqqı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əvəz edən işçinin əmək haqqı"
                                                                      value={salary || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əvəz edilən  işçinin əmək haqqı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                      value={positionSalary || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            {
                                                positionSalary > salary ?
                                                    <Col xs={6}>
                                                        <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">Əvəz edən işçinin əmək haqqı</span>
                                                            <Form.Label>
                                                                <Form.Control placeholder="Əvəz edən işçinin əmək haqqı"
                                                                              value={amount}
                                                                              onChange={(e) => setAmount(e.target.value)}
                                                                />
                                                            </Form.Label>
                                                        </Form.Group>
                                                    </Col>
                                                    : null
                                            }
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="16" title="" disabled={tab !== "16"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ştatın nömrəsi</span>
                                                    <Select
                                                        placeholder="Ştatın nömrəsini seç"
                                                        value={selectedPosition}
                                                        onChange={(val) => {
                                                            setSelectedPosition(val);
                                                            getPositionIdData(val.value);
                                                            setPositionId(val.value)
                                                        }}
                                                        isSearchable={position ? position.length > 5 ? true : false : false}
                                                        options={position}
                                                        getOptionLabel={(option) => option.value}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşlədiyi Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Dəyişiklik tarixi *</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={changeDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setChangeDate(date)}/>
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əvəzetmə müddəti</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əvəzetmə müddəti"
                                                                      value={changePeriod}
                                                                      type="number"
                                                                      onChange={(e) => setChangePeriod(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əvəz olunan vəzifə</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Keçirildiyi vəzifə"
                                                                      value={positionVacancyName || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əvəz olunan vəzifənin aid olduğu struktur bölmə</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                      value={positionDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əvəz olunan vəzifənin aid olduğu alt struktur bölmə</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                      value={positionSubDepartment || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əvəz edən işçinin əmək haqqı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                      value={salary || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əvəz edən vəzifənin  əmək haqqı</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Keçirildiyi struktur bölmə"
                                                                      value={positionSalary || ''}
                                                                      disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>*/}

                                    <Tab eventKey="17" title="" disabled={tab !== "17"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin adı, soyadı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployeeData(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={employee ? employee.length > 5 ? true : false : false}
                                                        options={employee}
                                                        getOptionLabel={(option) => (option.name)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Məzuniyyətin başladığı tarix  </span>
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Məzuniyyətin başladığı tarix  </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={endDate}
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
                                                </Form.Group>
                                            </Col>
                                           {/* <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşə başlama tarixi </span>
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Məzuniyyət müddəti</span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Məzuniyyət müddəti"
                                                            value={dayInEvent}
                                                            type="number"
                                                            onChange={(e) => setDayInEvent(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>*/}
                                        </Row>
                                    </Tab>

                           {/*         <Tab eventKey="18" title="" disabled={tab !== "18"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşçinin ərizəsinə və təhsil müəssisəsi tərəfindən verilən çağırış </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşçinin ərizəsinə və təhsil müəssisəsi tərəfindən verilən çağırış"
                                                            value={mainOfOrder}
                                                            onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Təhsil (və ya yaradıcılıq) məzuniyyətinin başladığı tarix  </span>
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Təhsil (və ya yaradıcılıq) məzuniyyətinə bitdiyi tarix   </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={endDate}
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Təhsil (yaradıcılıq) məzuniyyətinin müddəti (gün) </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Təhsil (yaradıcılıq) məzuniyyətinin müddəti "
                                                            value={dayInEvent}
                                                            type="number"
                                                            onChange={(e) => setDayInEvent(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşə başlama tarixi </span>
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
                                        </Row>
                                    </Tab>*/}

                           {/*         <Tab eventKey="19" title="" disabled={tab !== "19"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Məzuniyyət müddəti</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Məzuniyyət müddəti "
                                                                      value={dayInEvent}
                                                                      type="number"
                                                                      onChange={(e) => setDayInEvent(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Məzuniyyətin başladığı tarix</span>
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Məzuniyyətin bitdiyi tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={endDate}
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşə başlama tarixi </span>
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
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="20" title="" disabled={tab !== "20"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Məzuniyyət müddəti</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Məzuniyyət müddəti "
                                                                      value={dayInEvent}
                                                                      type="number"
                                                                      onChange={(e) => setDayInEvent(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Məzuniyyətin başladığı tarix</span>
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Məzuniyyətin bitdiyi tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={endDate}
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşə başlama tarixi </span>
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
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="21" title="" disabled={tab !== "21"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Məzuniyyət müddəti</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Məzuniyyət müddəti "
                                                                      value={dayInEvent}
                                                                      type="number"
                                                                      onChange={(e) => setDayInEvent(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Məzuniyyətin başladığı tarix</span>
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Məzuniyyətin bitdiyi tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={endDate}
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşə başlama tarixi </span>
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
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="22" title="" disabled={tab !== "22"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ödənişli istirahət müddəti</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Məzuniyyət müddəti "
                                                                      value={dayInEvent}
                                                                      type="number"
                                                                      onChange={(e) => setDayInEvent(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ödənişli istirahətə buraxılma tarixləri</span>
                                                    <div className="flex">
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
                                                        <span className="break-line"></span>
                                                        <Form.Label className="relative m-0">
                                                            <DatePicker
                                                                dateFormat="dd-MM-yyyy"
                                                                placeholderText="DD-MM-YYYY"
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                selected={endDate}
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
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşə başlama tarixi </span>
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Ödənişli istirahət verilməsinin səbəbi </span>
                                                    <Select
                                                        placeholder="Ödənişli istirahət verilməsinin səbəbi"
                                                        value={selectedVacationReason}
                                                        onChange={(val) => {
                                                            setSelectedVacationReason(val);
                                                        }}
                                                        isSearchable={vacationReasonOptions ? vacationReasonOptions.length > 5 ? true : false : false}
                                                        options={vacationReasonOptions}
                                                        getOptionLabel={(option) => option.label}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="23" title="" disabled={tab !== "23"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Məzuniyyətə buraxıldığı müddət</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Məzuniyyət müddəti "
                                                                      value={dayInEvent}
                                                                      type="number"
                                                                      onChange={(e) => setDayInEvent(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Məzuniyyətə buraxılmanın başladığı tarix</span>
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Məzuniyyətə buraxılmanın bitdiyi tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={endDate}
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Məzuniyyətin keçirilməsinin başladığı tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={startVacationHeldDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    startDate={startVacationHeldDate}
                                                                    endDate={endVacationHeldDate}
                                                                    onChange={(date) => setStartVacationHeldDate(date)}/>
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Məzuniyyətin keçirilməsinin başladığı tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={endVacationHeldDate}
                                                            onChange={(date) => setEndVacationHeldDate(date)}
                                                            selectsEnd
                                                            startDate={startVacationHeldDate}
                                                            endDate={endVacationHeldDate}
                                                            minDate={startVacationHeldDate}/>
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Məzuniyyətin keçirildiyi müddət</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Məzuniyyət müddəti "
                                                                      value={dayOutEvent}
                                                                      type="number"
                                                                      onChange={(e) => setDayOutEvent(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşə başlama tarixi </span>
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
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="24" title="" disabled={tab !== "24"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Məzuniyyətin başladığı tarix</span>
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Məzuniyyətin bitdiyi tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={endDate}
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Geri çağırılma tarixi </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={callBackDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setCallBackDate(date)}/>
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
                                                    <span className="input-title">Geri çağırılma səbəbi</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Geri çağırılma səbəbi"
                                                                      value={callBackReason}
                                                                      onChange={(e) => setCallBackReason(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>*/}

                               {/*     <Tab eventKey="25" title="" disabled={tab !== "25"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Geri çağırılan işçinin soyadı, adı, atasının adı</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin işlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Məzuniyyətə başladığı tarix</span>
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Məzuniyyətə bitdiyi  tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={endDate}
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Geri çağırılma tarixi</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={callBackDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setCallBackDate(date)}/>
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

                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Geri çağırılma səbəbi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Geri çağırılma səbəbi daxil edin"
                                                                      value={callBackReason}
                                                                      onChange={(e) => setCallBackReason(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <div className="addition-content">
                                                {
                                                    noteArr.map((item, index) =>
                                                        <div key={index} className={index === 0 ? '' : 'add-item'}>
                                                            {
                                                                index === 0 ? null :
                                                                    <div className="add-item-top">
                                                                        <p className="m-0"> #{index + 1}. Digər </p>
                                                                        <Button
                                                                            className="btn-transparent btn-remove flex-center"
                                                                            onClick={() => {
                                                                                noteArr.splice(index, 1);
                                                                                setNoteArr([...noteArr], noteArr)
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
                                                                        </Button>
                                                                    </div>
                                                            }
                                                            <Row>
                                                                <Col xs={12}>
                                                                    <Form.Group className="form-group">
                                                                        <span
                                                                            className="input-title">Əlavə qeydlər</span>
                                                                        <Form.Label>
                                                                            <Form.Control as="textarea"
                                                                                          onChange={(e) => {
                                                                                              noteArr[index] = e.target.value;
                                                                                              setNoteArr([...noteArr], noteArr);
                                                                                          }}
                                                                                          value={item}
                                                                                          placeholder="Text..."
                                                                            />
                                                                        </Form.Label>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="26" title="" disabled={tab !== "26"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="27" title="" disabled={tab !== "27"}>
                                        <Row>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <Form.Label>
                                                        <Form.Control
                                                            className="resize"
                                                            placeholder={`“ “${year}-ci il üzrə Cəmiyyət işçilərinin əmək məzuniyyətlərinin verilməsi üçün növbəlilik cədvəli təsdiq edilsin`}
                                                            as="textarea" disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="28" title="" disabled={tab !== "28"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Təlimə göndərilmə zərurəti </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Təlimə göndərilmə zərurəti daxil edin"
                                                            value={mainOfOrder}
                                                            onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Təlimin bitdiyi tarix </span>
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Təlimin başladığı tarix  </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={endDate}
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Təlimin adı  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Təlimin adı  daxil edin"
                                                                      value={eventName}
                                                                      onChange={(e) => setEventName(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="29" title="" disabled={tab !== "29"}>
                                        <Row>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <Form.Label>
                                                        <Form.Control
                                                            className="resize"
                                                            placeholder={`“Bakı Beynəlxalq Dəniz Ticarət Limanı” Qapalı Səhmdar Cəmiyyətində əməkdaşların peşə səviyyəsinin artırılması məqsədi ilə “${year}-ci il üzrə Təlim planı” təsdiq edilsin`}
                                                            as="textarea" disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <Form.Label>
                                                        <Form.Control
                                                            className="resize"
                                                            placeholder={`“Bakı Beynəlxalq Dəniz Ticarət Limanı” Qapalı Səhmdar Cəmiyyətində əməkdaşların peşə səviyyəsinin artırılması məqsədi ilə “${year}-ci il üzrə Təlim planı” təsdiq edilsin`}
                                                            as="textarea" disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="30" title="" disabled={tab !== "30"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Ezamiyyənin məqsədi  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ezam olunduğu ölkə\şəhər\rayon </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Ezam olunduğu ölkə\şəhər\rayon"
                                                            value={businessTripLocation}
                                                            onChange={(e) => setBusinessTripLocation(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ezamiyyətin başladığı tarix  </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={businessTripStart}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    startDate={businessTripStart}
                                                                    endDate={businessTripEnd}
                                                                    onChange={(date) => setBusinessTripStart(date)}/>
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
                                                    <span className="input-title">Ezamiyyətin bitdiyi tarix  </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={businessTripEnd}
                                                            onChange={(date) => setBusinessTripEnd(date)}
                                                            selectsEnd
                                                            startDate={businessTripStart}
                                                            endDate={businessTripEnd}
                                                            minDate={businessTripStart}/>
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ezamiyyət müddəti </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Ezamiyyət müddəti"
                                                            type="number"
                                                            value={businessTripPeriod}
                                                            onChange={(e) => setBusinessTripPeriod(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ezamiyyə müddətində işçinin yolda keçirdiyi istirahət gününə təsadüf etdiyi tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={nonWorkDay}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setNonWorkDay(date)}/>
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ezamiyyə müddətində yolda keçirilmiş istirahət gününün əvəzinə verilmiş istirahət günü</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={givenNonWorkDay}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setGivenNonWorkDay(date)}/>
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşçinin işə başlama tarixi</span>
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
                                        </Row>
                                        <div className="addition-content">
                                            {
                                                noteArr.map((item, index) =>
                                                    <div key={index} className={index === 0 ? '' : 'add-item'}>
                                                        {
                                                            index === 0 ? null :
                                                                <div className="add-item-top">
                                                                    <p className="m-0"> #{index + 1}. Digər </p>
                                                                    <Button
                                                                        className="btn-transparent btn-remove flex-center"
                                                                        onClick={() => {
                                                                            noteArr.splice(index, 1);
                                                                            setNoteArr([...noteArr], noteArr)
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
                                                                    </Button>
                                                                </div>
                                                        }
                                                        <Row>
                                                            <Col xs={12}>
                                                                <Form.Group className="form-group">
                                                                    <span className="input-title">Qeyd</span>
                                                                    <Form.Label>
                                                                        <Form.Control as="textarea"
                                                                                      onChange={(e) => {
                                                                                          noteArr[index] = e.target.value;
                                                                                          setNoteArr([...noteArr], noteArr);
                                                                                      }}
                                                                                      value={item}
                                                                                      placeholder="Text..."
                                                                        />
                                                                    </Form.Label>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </Tab>*/}

                                {/*    <Tab eventKey="31" title="" disabled={tab !== "31"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Ezamiyyənin uzadılmasının məqsədi   </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ezam olunduğu ölkə\şəhər\rayon </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Ezam olunduğu ölkə\şəhər\rayon"
                                                            value={businessTripLocation}
                                                            onChange={(e) => setBusinessTripLocation(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ezamiyyətin başladığı tarix  </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={businessTripStart}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    startDate={businessTripStart}
                                                                    endDate={businessTripEnd}
                                                                    onChange={(date) => setBusinessTripStart(date)}/>
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
                                                    <span className="input-title">Ezamiyyətin bitdiyi tarix  </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={businessTripEnd}
                                                            onChange={(date) => setBusinessTripEnd(date)}
                                                            selectsEnd
                                                            startDate={businessTripStart}
                                                            endDate={businessTripEnd}
                                                            minDate={businessTripStart}/>
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ezamiyyət müddəti </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Ezamiyyət müddəti"
                                                            type="number"
                                                            value={businessTripPeriod}
                                                            onChange={(e) => setBusinessTripPeriod(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ezam. müd. işçinin yolda keçir. istirahət gün. təsadüf etdiyi tarix:</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={nonWorkDay}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setNonWorkDay(date)}/>
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ezam. müd. yolda keçir. istirahət gün. əvəzinə verilmiş istirahət günü</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={givenNonWorkDay}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setGivenNonWorkDay(date)}/>
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşçinin işə başlama tarixi</span>
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
                                        </Row>
                                        <div className="addition-content">
                                            {
                                                noteArr.map((item, index) =>
                                                    <div key={index} className={index === 0 ? '' : 'add-item'}>
                                                        {
                                                            index === 0 ? null :
                                                                <div className="add-item-top">
                                                                    <p className="m-0"> #{index + 1}. Digər </p>
                                                                    <Button
                                                                        className="btn-transparent btn-remove flex-center"
                                                                        onClick={() => {
                                                                            noteArr.splice(index, 1);
                                                                            setNoteArr([...noteArr], noteArr)
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
                                                                    </Button>
                                                                </div>
                                                        }
                                                        <Row>
                                                            <Col xs={12}>
                                                                <Form.Group className="form-group">
                                                                    <span className="input-title">Qeyd</span>
                                                                    <Form.Label>
                                                                        <Form.Control as="textarea"
                                                                                      onChange={(e) => {
                                                                                          noteArr[index] = e.target.value;
                                                                                          setNoteArr([...noteArr], noteArr);
                                                                                      }}
                                                                                      value={item}
                                                                                      placeholder="Text..."
                                                                        />
                                                                    </Form.Label>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </Tab>

                                    <Tab eventKey="32" title="" disabled={tab !== "32"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Ezamiyyədən geri çağırılmanın məqsədi  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ezam olunduğu ölkə\şəhər\rayon </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Ezam olunduğu ölkə\şəhər\rayon"
                                                            value={businessTripLocation}
                                                            onChange={(e) => setBusinessTripLocation(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ezamiyyətin başlama tarixi  </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={businessTripStart}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    selectsStart
                                                                    startDate={businessTripStart}
                                                                    endDate={businessTripEnd}
                                                                    onChange={(date) => setBusinessTripStart(date)}/>
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
                                                    <span className="input-title">Ezamiyyətin bitmə tarixi  </span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={businessTripEnd}
                                                            onChange={(date) => setBusinessTripEnd(date)}
                                                            selectsEnd
                                                            startDate={businessTripStart}
                                                            endDate={businessTripEnd}
                                                            minDate={businessTripStart}/>
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
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ezamiyyət müddəti </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Ezamiyyət müddəti"
                                                            type="number"
                                                            value={businessTripPeriod}
                                                            onChange={(e) => setBusinessTripPeriod(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ezamiyyətdən geri çağırıldığı və işə başladığı tarix:</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker selected={callBackDate}
                                                                    dateFormat="dd-MM-yyyy"
                                                                    placeholderText="DD-MM-YYYY"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    onChange={(date) => setCallBackDate(date)}/>
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
                                        </Row>
                                        <div className="addition-content">
                                            {
                                                noteArr.map((item, index) =>
                                                    <div key={index} className={index === 0 ? '' : 'add-item'}>
                                                        {
                                                            index === 0 ? null :
                                                                <div className="add-item-top">
                                                                    <p className="m-0"> #{index + 1}. Digər </p>
                                                                    <Button
                                                                        className="btn-transparent btn-remove flex-center"
                                                                        onClick={() => {
                                                                            noteArr.splice(index, 1);
                                                                            setNoteArr([...noteArr], noteArr)
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
                                                                    </Button>
                                                                </div>
                                                        }
                                                        <Row>
                                                            <Col xs={12}>
                                                                <Form.Group className="form-group">
                                                                    <span className="input-title">Qeyd</span>
                                                                    <Form.Label>
                                                                        <Form.Control as="textarea"
                                                                                      onChange={(e) => {
                                                                                          noteArr[index] = e.target.value;
                                                                                          setNoteArr([...noteArr], noteArr);
                                                                                      }}
                                                                                      value={item}
                                                                                      placeholder="Text..."
                                                                        />
                                                                    </Form.Label>
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </Tab>

                                    <Tab eventKey="33" title="" disabled={tab !== "33"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əsaslandırma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, ata adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin işlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşlədiyi vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Maddi yardımın məbləği (vergilər və digər ödənişər xaric olmaqla) </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Maddi yardımın məbləği "
                                                                      value={financialHelp}
                                                                      type="number"
                                                                      onChange={(e) => setFinancialHelp(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="34" title="" disabled={tab !== "34"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əsaslandırma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Mükafatlandırılan işçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Mükafatın məbləği Azn (vergilər və digər ödənişlər daxil olmaqla və ya xaric olmaqla):  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Mükafatın məbləği  məbləği "
                                                                      value={achievement}
                                                                      type="number"
                                                                      onChange={(e) => setAchievement(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>*/}

                             {/*       <Tab eventKey="35" title="" disabled={tab !== "35"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əsaslandırma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşlədiyi vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İşlədiyi vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Fərdi əlavənin məbləği Azn:  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="300 AZN"
                                                                      value={newOwnAdditionalSalary}
                                                                      type="number"
                                                                      onChange={(e) => setNewOwnAdditionalSalary(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="36" title="" disabled={tab !== "36"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əsaslandırma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Seçkidə iştirak edəcəyi tarixlər</span>
                                                    <div className="flex">
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
                                                        <span className="break-line"></span>
                                                        <Form.Label className="relative m-0">
                                                            <DatePicker
                                                                dateFormat="dd-MM-yyyy"
                                                                placeholderText="DD-MM-YYYY"
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                selected={endDate}
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
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Seçkidə iştirak edəcəyi müddət (gün)  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder=""
                                                                      value={dayInEvent}
                                                                      type="number"
                                                                      onChange={(e) => setDayInEvent(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="37" title="" disabled={tab !== "37"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əsaslandırma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Müvəqqəti azad olunma müddəti</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Müvəqqəti azad olunma müddəti"
                                                                      value={dayInEvent}
                                                                      type="number"
                                                                      onChange={(e) => setDayInEvent(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="38" title="" disabled={tab !== "38"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əsaslandırma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Təlim-məşq toplantısının başladığı tarix </span>
                                                    <div className="flex">
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
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Təlim-məşq toplantısının bitdiyi tarix </span>
                                                    <div className="flex">
                                                        <Form.Label className="relative m-0">
                                                            <DatePicker
                                                                dateFormat="dd-MM-yyyy"
                                                                placeholderText="DD-MM-YYYY"
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                selected={endDate}
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
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Təlim-məşq toplantısında iştirak edəcəyi günlər  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder=""
                                                                      value={dayInEvent}
                                                                      type="number"
                                                                      onChange={(e) => setDayInEvent(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="39" title="" disabled={tab !== "39"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əsaslandırma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İstirahətin başladığı tarix</span>
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İstirahətin bitdiyi tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={endDate}
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İstirahətin müddəti </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İstirahətin müddəti "
                                                                      value={dayInEvent}
                                                                      type="number"
                                                                      onChange={(e) => setDayInEvent(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşçinin işə başlama tarixi</span>
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
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="40" title="" disabled={tab !== "40"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əsaslandırma</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşçinin Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ödənilmənin başladığı tarix</span>
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ödənilmənin bitdiyi tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={endDate}
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Ödəncin məbləği </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="İstirahətin müddəti "
                                                                      value={amount}
                                                                      type="number"
                                                                      onChange={(e) => setAmount(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>*/}

                                  {/*  <Tab eventKey="41" title="" disabled={tab !== "41"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin işdən kənarlaşdırılması səbəbi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Kənarlaşdırma müddəti </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder=""
                                                                      value={dayInEvent}
                                                                      type="number"
                                                                      onChange={(e) => setDayInEvent(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="42" title="" disabled={tab !== "42"}>
                                        <Row>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Əmrin əsası</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <Form.Label>
                                                        <Form.Control
                                                            className="resize"
                                                            placeholder={`İşçilərin əmək haqqı saxlanılmaqla ${year}-ci il tarixi “Bakı Beynəlxalq Dəniz Ticarət Limanı” QSC- də qeyri iş günü hesab edilsin.`}
                                                            as="textarea" disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="43" title="" disabled={tab !== "43"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin işlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin işlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin faktiki işə başladığı tarix</span>
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
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin faktiki işinin bitdiyi tarix</span>
                                                    <Form.Label className="relative m-0">
                                                        <DatePicker
                                                            dateFormat="dd-MM-yyyy"
                                                            placeholderText="DD-MM-YYYY"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            selected={endDate}
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
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="45" title="" disabled={tab !== "45"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçiyə xəbərdarlıq edilməsinin səbəbi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Xəbərdarlıq edilən işçinin və ya işçilərin soyadı, adı, atasının adı: *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaffArr}
                                                        isMulti
                                                        onChange={(arr) => {
                                                            console.log(arr)
                                                            let ids = [];
                                                            arr.map((item) => ids.push(item.id));
                                                            let depArr = [];
                                                            let vacancyArr = []
                                                            for (let i of arr) {
                                                                depArr.push(i.department);
                                                                vacancyArr.push(i.position)
                                                            }
                                                            setDepartments(depArr.join(', '));
                                                            setVacancyNames(vacancyArr.join(', '));
                                                            setEmployeeIds(ids)
                                                            //getEmployee(id)
                                                            setSelectedStaffArr(arr);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        getOptionValue={(option) => (key == 'EMPLOYEE' ? option.id : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={departments || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin və ya işçilərin vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyNames || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Təqdimat sahibinin soyadı, adı, atasının adı  </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Təqdimat sahibinin soyadı, adı, atasının adı daxil edin"
                                                            value={presentationFullName}
                                                            onChange={(e) => setPresentationFullName(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Struktur bölmə  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Struktur bölmə daxil edin"
                                                                      value={presentationDepartment}
                                                                      onChange={(e) => setPresentationDepartment(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi  daxil edin"
                                                                      value={presentationPosition}
                                                                      onChange={(e) => setPresentationPosition(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="44" title="" disabled={tab !== "44"}>
                                        <Row>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşə cəlb edilmə səbəbi </span>
                                                    <Select
                                                        placeholder="İşə cəlb edilmə səbəbini seçin"
                                                        value={selectedReason}
                                                        onChange={(val) => {
                                                            setSelectedReason(val);
                                                        }}
                                                        isSearchable={reasonOptions ? reasonOptions.length > 5 ? true : false : false}
                                                        options={reasonOptions}
                                                        getOptionLabel={(option) => option.label}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşə cəlb edilmə zərurəti  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşə cəlb edilən işçinin və ya işçilərin soyadı, adı, atasının adı </span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşə cəlb edilən işçi və ya işçilərin işlədiyi struktur bölmə</span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşə cəlb edilən işçi və ya işçilərin vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Struktur bölmə rəhbərinin soyadı, adı, atasının adı  </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Struktur bölmə rəhbərinin soyadı, adı, atasının adı"
                                                            value={presentationFullName}
                                                            onChange={(e) => setPresentationFullName(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Struktur bölmənin adı </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Struktur bölmənin adı"
                                                                      value={presentationDepartment}
                                                                      onChange={(e) => setPresentationDepartment(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəni  daxil edin"
                                                                      value={presentationPosition}
                                                                      onChange={(e) => setPresentationPosition(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="46" title="" disabled={tab !== "46"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">Əmək haqqından tutulma səbəbi </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Əmək haqqından tutulma səbəbi daxil edin"
                                                            value={mainOfOrder}
                                                            onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Tutulma məbləği  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Tutulma məbləği"
                                                                      value={catchAmount}
                                                                      type="number"
                                                                      onChange={(e) => setCatchAmount(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Tutulacağı aylar </span>
                                                    <Select
                                                        placeholder="Tutulacağı ayları seçin"
                                                        isMulti
                                                        value={selectedMonth}
                                                        onChange={(arr) => {
                                                            let ids = [];
                                                            for (let i of arr) {
                                                                ids.push(i.value)
                                                            }
                                                            setMonthArr(ids)
                                                            setSelectedMonth(arr);
                                                        }}
                                                        isSearchable={monthOptions ? monthOptions.length > 5 ? true : false : false}
                                                        options={monthOptions}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>

                                    <Tab eventKey="47" title="" disabled={tab !== "47"}>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İşçiyə intizam tənbehinin verilməsinin səbəbi</span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Əmrin əsası daxil edin"
                                                                      value={mainOfOrder}
                                                                      onChange={(e) => setMainOfOrder(e.target.value)}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşçinin soyadı, adı, atasının adı *</span>
                                                    <Select
                                                        placeholder="İşçinin adı, soyadı, atasının adı"
                                                        value={selectedStaff}
                                                        onChange={(val) => {
                                                            let id = val.id
                                                            setEmployeeId(id)
                                                            getEmployee(id)
                                                            setSelectedStaff(val);
                                                        }}
                                                        isSearchable={staff ? staff.length > 5 ? true : false : false}
                                                        options={staff}
                                                        getOptionLabel={(option) => (key == 'EMPLOYEE' ? option.fullName : option.vacancyName)}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={department || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span
                                                        className="input-title">İşlədiyi alt struktur bölmə </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="İşlədiyi struktur bölmə"
                                                            value={subDepartment || ''} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi"
                                                                      value={vacancyName} disabled={true}/>
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">İntizam tənbehinin növü *</span>
                                                    <Select
                                                        placeholder="İntizam tənbehinin növünü seçin"
                                                        value={selectedDiscipline}
                                                        onChange={setSelectedDiscipline}
                                                        isSearchable={disciplineOptions ? disciplineOptions.length > 5 ? true : false : false}
                                                        options={disciplineOptions}
                                                        styles={customStyles}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Təqdimat sahibinin soyadı, adı, atasının adı  </span>
                                                    <Form.Label>
                                                        <Form.Control
                                                            placeholder="Təqdimat sahibinin soyadı, adı, atasının adı daxil edin"
                                                            value={presentationFullName}
                                                            onChange={(e) => setPresentationFullName(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Struktur bölmə  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Struktur bölmə daxil edin"
                                                                      value={presentationDepartment}
                                                                      onChange={(e) => setPresentationDepartment(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Group className="form-group">
                                                    <span className="input-title">Vəzifəsi  </span>
                                                    <Form.Label>
                                                        <Form.Control placeholder="Vəzifəsi  daxil edin"
                                                                      value={presentationPosition}
                                                                      onChange={(e) => setPresentationPosition(e.target.value)}
                                                        />
                                                    </Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Tab>*/}

                                </Tabs>
                            </div>
                            {
                                save ?
                                    <div className="flex-vertical-center btn-block">
                                        <Button className="btn-effect" onClick={() => senData()}>
                                            Yadda saxla
                                        </Button>
                                    </div>

                                    : ""
                            }
                        </Form>
                    </div>
                </Container>
            </div>
        </Aux>

    );
}

export default CreateOperation
