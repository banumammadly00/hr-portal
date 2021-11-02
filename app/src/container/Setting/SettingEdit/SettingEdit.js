import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {mainAxios} from "../../../components/Axios/axios";
import {Container, Row, Col, Form} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown'

function SettingEdit() {

    const [countryArr, setCountryArr] = useState([]);
    const [country, setCountry] = useState('');
    const [showCountry, setShowCountry] = useState(false)

    const [cityArr, setCityArr] = useState([]);
    const [city, setCity] = useState('');
    const [showCity, setShowCity] = useState(false)

    const [regionArr, setRegionArr] = useState([]);
    const [region, setRegion] = useState('');
    const [showRegion, setShowRegion] = useState(false)

    const [citizenCountryArr, setCitizenCountryArr] = useState([]);
    const [citizenCountry, setCitizenCountry] = useState('');
    const [showCitizenCountry, setShowCitizenCountry] = useState(false)

    const [universityArr, setUniversityArr] = useState([]);
    const [university, setUniversity] = useState('');
    const [showUniversity, setShowUniversity] = useState(false);

    const [vacancyArr, setVacancyArr] = useState([]);
    const [vacancy, setVacancy] = useState('');
    const [showVacancy, setShowVacancy] = useState(false);

    const [salaryArr, setSalaryArr] = useState([]);
    const [salary, setSalary] = useState('');
    const [showSalary, setShowSalary] = useState(false);

    const [jobFamilyArr, setJobFamilyArr] = useState([]);
    const [jobFamily, setJobFamily] = useState('');
    const [showJobFamily, setShowJobFamily] = useState(false);

    const [skillArr, setSkillArr] = useState([]);
    const [skill, setSkill] = useState('');
    const [showSkill, setShowSkill] = useState(false);

    const [departmentArr, setDepartmentArr] = useState([]);
    const [department, setDepartment] = useState('');
    const [showDepartment, setShowDepartment] = useState(false)

    const [active, setActive] = useState(false)

    const getCountry = () => {
        mainAxios({
            method: 'get',
            url: '/address/country',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setCountryArr(res.data.data);
        });
    }

    const sendCountry = () => {
        setActive(true);
        mainAxios({
            method: 'post',
            url: '/address/country',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                country: country
            }
        }).then((res) => {
            if (res.data.code === 200) {
                getCountry();
                setCountry('');
                setActive(false);
            }
        });
    }

    const deleteCountry = (id) => {
        mainAxios({
            method: 'delete',
            url: '/address/country',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params : {
                id: id
            }
        }).then((res) => {
            if(res.data.code === 200) {
                getCountry()
            }
        });
    }

    const getCity = () => {
        mainAxios({
            method: 'get',
            url: '/address/city',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setCityArr(res.data.data)
        });
    }

    const sendCity = () => {
        setActive(true);
        mainAxios({
            method: 'post',
            url: '/address/city',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                city: city
            }
        }).then((res) => {
            if (res.data.code === 200) {
                getCity();
                setCity('');
                setActive(false);
            }
        });
    }

    const deleteCity = (id) => {
        mainAxios({
            method: 'delete',
            url: '/address/city',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params : {
                id: id
            }
        }).then((res) => {
            if(res.data.code === 200) {
                getCity()
            }
        });
    }

    const getRegion = () => {
        mainAxios({
            method: 'get',
            url: '/address/district',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setRegionArr(res.data.data)
        });
    }

    const sendRegion = () => {
        setActive(true);
        mainAxios({
            method: 'post',
            url: '/address/district',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                district: region
            }
        }).then((res) => {
            if (res.data.code === 200) {
                getRegion();
                setRegion('');
                setActive(false);
            }
        });
    }

    const deleteRegion = (id) => {
        mainAxios({
            method: 'delete',
            url: '/address/district',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params : {
                id: id
            }
        }).then((res) => {
            if(res.data.code === 200) {
                getCountry()
            }
        });
    }

    const getCitizenCountry = () => {
        mainAxios({
            method: 'get',
            url: '/citizen-country',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setCitizenCountryArr(res.data.data)
        });
    }

    const sendCitizenCountry = () => {
        setActive(true);
        mainAxios({
            method: 'post',
            url: '/citizen-country',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                country: citizenCountry
            }
        }).then((res) => {
            if (res.data.code === 200) {
                getCitizenCountry();
                setCitizenCountry('');
                setActive(false);
            }
        });
    }

    const deleteCitizenCountry = (id) => {
        mainAxios({
            method: 'delete',
            url: '/citizen-country',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params : {
                name: id
            }
        }).then((res) => {
            if(res.data.code === 200) {
                getCitizenCountry()
            }
        });
    }

    const getUniversity = () => {
        mainAxios({
            method: 'get',
            url: '/institution',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setUniversityArr(res.data.data)
        });
    }

    const sendUniversity = () => {
        setActive(true);
        let data = {
            name: university
        }
        mainAxios({
            method: 'post',
            url: '/institution',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            if (res.data.code === 200) {
                getUniversity();
                setUniversity('');
                setActive(false);
            }
        });
    }

    const deleteUniversity = (id) => {
        mainAxios({
            method: 'delete',
            url: '/institution',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params : {
                name: id
            }
        }).then((res) => {
            if(res.data.code === 200) {
                getUniversity()
            }
        });
    }

    const getVacancy = () => {
        mainAxios({
            method: 'get',
            url: '/vacancy',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setVacancyArr(res.data.data)
        });
    }

    const sendVacancy = () => {
        setActive(true);
        let data = {
            name: vacancy
        }
        mainAxios({
            method: 'post',
            url: '/vacancy',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            if (res.data.code === 200) {
                getVacancy();
                setVacancy('');
                setActive(false);
            }
        });
    }

    const deleteVacancy = (id) => {
        mainAxios({
            method: 'delete',
            url: '/vacancy',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params : {
                name: id
            }
        }).then((res) => {
            if(res.data.code === 200) {
                getVacancy()
            }
        });
    }

    const getSalary = () => {
        mainAxios({
            method: 'get',
            url: '/salary',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setSalaryArr(res.data.data)
        });
    }

    const sendSalary = () => {
        setActive(true);
        let data = {
            salary: parseFloat(salary)
        }
        mainAxios({
            method: 'post',
            url: '/salary',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            if (res.data.code === 200) {
                getSalary();
                setSalary('');
                setActive(false);
            }
        });
    }

    const deleteSalary = (id) => {
        mainAxios({
            method: 'delete',
            url: '/salary',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params : {
                id: id
            }
        }).then((res) => {
            if(res.data.code === 200) {
                getSalary()
            }
        });
    }

    const getJobFamily = () => {
        mainAxios({
            method: 'get',
            url: '/job-family',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setJobFamilyArr(res.data.data)
        });
    }

    const sendJobFamily = () => {
        setActive(true);
        let data = {
            name: jobFamily
        }
        mainAxios({
            method: 'post',
            url: '/job-family',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            if (res.data.code === 200) {
                getJobFamily();
                setJobFamily('');
                setActive(false);
            }
        });
    }

    const deleteJobFamily = (id) => {
        mainAxios({
            method: 'delete',
            url: '/job-family',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params : {
                name: id
            }
        }).then((res) => {
            if(res.data.code === 200) {
                getJobFamily()
            }
        });
    }

    const getSkill = () => {
        mainAxios({
            method: 'get',
            url: '/skill',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setSkillArr(res.data.data)
        });
    }

    const sendSkill = () => {
        setActive(true);
        mainAxios({
            method: 'post',
            url: '/skill',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                skill : skill
            }
        }).then((res) => {
            if (res.data.code === 200) {
                getSkill();
                setSkill('');
                setActive(false);
            }
        });
    }

    const deleteSkill = (id) => {
        mainAxios({
            method: 'delete',
            url: '/skill',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params : {
                id: id
            }
        }).then((res) => {
            if(res.data.code === 200) {
                getSkill()
            }
        });
    }


    const getDepartment = () => {
        mainAxios({
            method: 'get',
            url: '/department',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setDepartmentArr(res.data.data)
        });
    }

    const sendDepartment = () => {
        setActive(true);
        let data = {
            name: department
        }
        mainAxios({
            method: 'post',
            url: '/department',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data : data
        }).then((res) => {
            if (res.data.code === 200) {
                getDepartment();
                setDepartment('');
                setActive(false);
            }
        });
    }

    const deleteDepartment = (id) => {
        mainAxios({
            method: 'delete',
            url: '/department',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params : {
                id: id
            }
        }).then((res) => {
            if(res.data.code === 200) {
                getDepartment()
            }
        });
    }


    useEffect(() => {
        getCountry();
        getCity();
        getRegion();
        getCitizenCountry();
        getUniversity();
        getJobFamily();
        getVacancy();
        getSkill();
        getSalary()
    }, []);

    return (
        <Aux>
            <div className="block">
                <div className="block-inn">
                    <Row>
                        <Col xs={6}>
                            <div className="block-title flex">
                                Ölkələr
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Ölkələr
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        countryArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.key}
                                                <button type="button" className="btn-transparent btn-delete" onClick={()=> deleteCountry(item.value)}>
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                            fill="#040647"/>
                                                    </svg>
                                                </button>
                                            </Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="flex-end">
                                <button type="button" className="btn-color"
                                        onClick={() => setShowCountry(true)}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.8346 6.83366H6.83464V11.8337H5.16797V6.83366H0.167969V5.16699H5.16797V0.166992H6.83464V5.16699H11.8346V6.83366Z"
                                            fill="#3083DC"/>
                                    </svg>
                                    Əlavə et
                                </button>
                            </div>
                        </Col>
                    </Row>
                    {
                        showCountry ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={country}
                                                    placeholder="Ölkə daxil edin"
                                                    onChange={e => setCountry(e.target.value)}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendCountry()}>
                                                    <svg width="16" height="12" viewBox="0 0 16 12"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                            fill="#2ED06A"/>
                                                    </svg>
                                                    Yadda saxla
                                                </button>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                            : null
                    }
                </div>
                <div className="block-inn">
                    <Row>
                        <Col xs={6}>
                            <div className="block-title flex">
                                Şəhərlər
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Şəhərlər
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        cityArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.key}
                                                <button type="button" className="btn-transparent btn-delete" onClick={()=> deleteCity(item.value)}>
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                            fill="#040647"/>
                                                    </svg>
                                                </button>
                                            </Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="flex-end">
                                <button type="button" className="btn-color"
                                        onClick={() => setShowCity(true)}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.8346 6.83366H6.83464V11.8337H5.16797V6.83366H0.167969V5.16699H5.16797V0.166992H6.83464V5.16699H11.8346V6.83366Z"
                                            fill="#3083DC"/>
                                    </svg>
                                    Əlavə et
                                </button>
                            </div>
                        </Col>
                    </Row>
                    {
                        showCity ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={city}
                                                    placeholder="Şəhər daxil edin"
                                                    onChange={(e => setCity(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendCity()}>
                                                    <svg width="16" height="12" viewBox="0 0 16 12"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                            fill="#2ED06A"/>
                                                    </svg>
                                                    Yadda saxla
                                                </button>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                            : null
                    }
                </div>
                <div className="block-inn">
                    <Row>
                        <Col xs={6}>
                            <div className="block-title flex">
                                Rayonlar
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Rayonlar
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        regionArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.key}
                                                <button type="button" className="btn-transparent btn-delete" onClick={()=> deleteRegion(item.value)}>
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                            fill="#040647"/>
                                                    </svg>
                                                </button>
                                            </Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="flex-end">
                                <button type="button" className="btn-color"
                                        onClick={() => setShowRegion(true)}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.8346 6.83366H6.83464V11.8337H5.16797V6.83366H0.167969V5.16699H5.16797V0.166992H6.83464V5.16699H11.8346V6.83366Z"
                                            fill="#3083DC"/>
                                    </svg>
                                    Əlavə et
                                </button>
                            </div>
                        </Col>
                    </Row>
                    {
                        showRegion ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={region}
                                                    placeholder="Rayon daxil edin"
                                                    onChange={(e => setRegion(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendRegion()}>
                                                    <svg width="16" height="12" viewBox="0 0 16 12"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                            fill="#2ED06A"/>
                                                    </svg>
                                                    Yadda saxla
                                                </button>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                            : null
                    }
                </div>
                <div className="block-inn">
                    <Row>
                        <Col xs={6}>
                            <div className="block-title flex">
                                Vətəndaşlığı olduğu ölkə
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Vətəndaşlığı olduğu ölkə
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        citizenCountryArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.name}
                                                <button type="button" className="btn-transparent btn-delete" onClick={()=> deleteCitizenCountry(item.name)}>
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                            fill="#040647"/>
                                                    </svg>
                                                </button>
                                            </Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="flex-end">
                                <button type="button" className="btn-color"
                                        onClick={() => setShowCitizenCountry(true)}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.8346 6.83366H6.83464V11.8337H5.16797V6.83366H0.167969V5.16699H5.16797V0.166992H6.83464V5.16699H11.8346V6.83366Z"
                                            fill="#3083DC"/>
                                    </svg>
                                    Əlavə et
                                </button>
                            </div>
                        </Col>
                    </Row>
                    {
                        showCitizenCountry ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={citizenCountry}
                                                    placeholder="Vətəndaşlığı olduğu ölkəni  daxil edin"
                                                    onChange={(e => setCitizenCountry(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendCitizenCountry()}>
                                                    <svg width="16" height="12" viewBox="0 0 16 12"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                            fill="#2ED06A"/>
                                                    </svg>
                                                    Yadda saxla
                                                </button>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                            : null
                    }
                </div>
                <div className="block-inn">
                    <Row>
                        <Col xs={6}>
                            <div className="block-title flex">
                                Təhsil müəssisələri
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Təhsil müəssisələri
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        universityArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.name}
                                                <button type="button" className="btn-transparent btn-delete" onClick={()=> deleteUniversity(item.name)}>
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                            fill="#040647"/>
                                                    </svg>
                                                </button>
                                            </Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="flex-end">
                                <button type="button" className="btn-color"
                                        onClick={() => setShowUniversity(true)}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.8346 6.83366H6.83464V11.8337H5.16797V6.83366H0.167969V5.16699H5.16797V0.166992H6.83464V5.16699H11.8346V6.83366Z"
                                            fill="#3083DC"/>
                                    </svg>
                                    Əlavə et
                                </button>
                            </div>
                        </Col>
                    </Row>
                    {
                        showUniversity ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={university}
                                                    placeholder="Təhsil müəssisəsini  daxil edin"
                                                    onChange={(e => setUniversity(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendUniversity()}>
                                                    <svg width="16" height="12" viewBox="0 0 16 12"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                            fill="#2ED06A"/>
                                                    </svg>
                                                    Yadda saxla
                                                </button>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                            : null
                    }
                </div>

                <div className="block-inn">
                    <Row>
                        <Col xs={6}>
                            <div className="block-title flex">
                                Vakansiyalar
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Vakansiyalar
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        vacancyArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.name}
                                                <button type="button" className="btn-transparent btn-delete" onClick={()=> deleteVacancy(item.name)}>
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                            fill="#040647"/>
                                                    </svg>
                                                </button>
                                            </Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="flex-end">
                                <button type="button" className="btn-color"
                                        onClick={() => setShowVacancy(true)}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.8346 6.83366H6.83464V11.8337H5.16797V6.83366H0.167969V5.16699H5.16797V0.166992H6.83464V5.16699H11.8346V6.83366Z"
                                            fill="#3083DC"/>
                                    </svg>
                                    Əlavə et
                                </button>
                            </div>
                        </Col>
                    </Row>
                    {
                        showVacancy ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={vacancy}
                                                    placeholder="Vakansiya  daxil edin"
                                                    onChange={(e => setVacancy(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendVacancy()}>
                                                    <svg width="16" height="12" viewBox="0 0 16 12"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                            fill="#2ED06A"/>
                                                    </svg>
                                                    Yadda saxla
                                                </button>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                            : null
                    }
                </div>
                <div className="block-inn">
                    <Row>
                        <Col xs={6}>
                            <div className="block-title flex">
                                Maaş
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Maaş
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        salaryArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.name}
                                                <button type="button" className="btn-transparent btn-delete" onClick={()=> deleteSalary(item.name)}>
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                            fill="#040647"/>
                                                    </svg>
                                                </button>
                                            </Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="flex-end">
                                <button type="button" className="btn-color"
                                        onClick={() => setShowSalary(true)}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.8346 6.83366H6.83464V11.8337H5.16797V6.83366H0.167969V5.16699H5.16797V0.166992H6.83464V5.16699H11.8346V6.83366Z"
                                            fill="#3083DC"/>
                                    </svg>
                                    Əlavə et
                                </button>
                            </div>
                        </Col>
                    </Row>
                    {
                        showSalary ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={salary}
                                                    type="number"
                                                    placeholder="Maaş  daxil edin"
                                                    onChange={(e => setSalary(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendSalary()}>
                                                    <svg width="16" height="12" viewBox="0 0 16 12"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                            fill="#2ED06A"/>
                                                    </svg>
                                                    Yadda saxla
                                                </button>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                            : null
                    }
                </div>
                <div className="block-inn">
                    <Row>
                        <Col xs={6}>
                            <div className="block-title flex">
                                Struk b. tabe old. kurator rəh. ad, soyad, ata adı, vəzifə
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Struk b. tabe old. kurator rəh. ad, soyad, ata adı, vəzifə
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        jobFamilyArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.name}
                                                <button type="button" className="btn-transparent btn-delete" onClick={()=> deleteJobFamily(item.name)}>
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                            fill="#040647"/>
                                                    </svg>
                                                </button>
                                            </Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="flex-end">
                                <button type="button" className="btn-color"
                                        onClick={() => setShowJobFamily(true)}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.8346 6.83366H6.83464V11.8337H5.16797V6.83366H0.167969V5.16699H5.16797V0.166992H6.83464V5.16699H11.8346V6.83366Z"
                                            fill="#3083DC"/>
                                    </svg>
                                    Əlavə et
                                </button>
                            </div>
                        </Col>
                    </Row>
                    {
                        showJobFamily ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={jobFamily}
                                                    placeholder="Struk b. tabe old. kurator rəh. ad, soyad, ata adı, vəzifə  daxil edin"
                                                    onChange={(e => setJobFamily(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendJobFamily()}>
                                                    <svg width="16" height="12" viewBox="0 0 16 12"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                            fill="#2ED06A"/>
                                                    </svg>
                                                    Yadda saxla
                                                </button>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                            : null
                    }
                </div>
                <div className="block-inn">
                    <Row>
                        <Col xs={6}>
                            <div className="block-title flex">
                                Vəzifənin tələb etdiyi kompetensiyalar
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Vəzifənin tələb etdiyi kompetensiyalar
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        skillArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.key}
                                                <button type="button" className="btn-transparent btn-delete" onClick={()=> deleteSkill(item.value)}>
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                            fill="#040647"/>
                                                    </svg>
                                                </button>
                                            </Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="flex-end">
                                <button type="button" className="btn-color"
                                        onClick={() => setShowSkill(true)}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.8346 6.83366H6.83464V11.8337H5.16797V6.83366H0.167969V5.16699H5.16797V0.166992H6.83464V5.16699H11.8346V6.83366Z"
                                            fill="#3083DC"/>
                                    </svg>
                                    Əlavə et
                                </button>
                            </div>
                        </Col>
                    </Row>
                    {
                        showSkill ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={skill}
                                                    placeholder=" Vəzifənin tələb etdiyi kompetensiya  daxil edin"
                                                    onChange={(e => setSkill(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendSkill()}>
                                                    <svg width="16" height="12" viewBox="0 0 16 12"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                            fill="#2ED06A"/>
                                                    </svg>
                                                    Yadda saxla
                                                </button>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                            : null
                    }
                </div>

                <div className="block-inn">
                    <Row>
                        <Col xs={6}>
                            <div className="block-title flex">
                                Struktur vahidinin adı
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Struktur vahidinin adı
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        departmentArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.name}
                                                <button type="button" className="btn-transparent btn-delete" onClick={()=> deleteDepartment(item.name)}>
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                            fill="#040647"/>
                                                    </svg>
                                                </button>
                                            </Dropdown.Item>
                                        )
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="flex-end">
                                <button type="button" className="btn-color"
                                        onClick={() => setShowDepartment(true)}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.8346 6.83366H6.83464V11.8337H5.16797V6.83366H0.167969V5.16699H5.16797V0.166992H6.83464V5.16699H11.8346V6.83366Z"
                                            fill="#3083DC"/>
                                    </svg>
                                    Əlavə et
                                </button>
                            </div>
                        </Col>
                    </Row>
                    {
                        showDepartment ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={department}
                                                    placeholder=" Struktur vahidinin adı  daxil edin"
                                                    onChange={(e => setDepartment(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendDepartment()}>
                                                    <svg width="16" height="12" viewBox="0 0 16 12"
                                                         fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                            fill="#2ED06A"/>
                                                    </svg>
                                                    Yadda saxla
                                                </button>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </div>
                            : null
                    }
                </div>


            </div>
        </Aux>
    );
}

export default SettingEdit
