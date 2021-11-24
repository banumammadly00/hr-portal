import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {mainAxios} from "../../../components/Axios/axios";
import {Container, Row, Col, Form} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown'
import Select from "react-select";

const gradeOptions = [
    {value: 1, label: '1'},
    {value: 2, label: '2'},
    {value: 3, label: '3'},
    {value: 4, label: '4'},
    {value: 5, label: '5'},
    {value: 6, label: '6'},
    {value: 7, label: '7'},
    {value: 8, label: '8'},
    {value: 9, label: '9'},
    {value: 10, label: '10'},
    {value: 11, label: '11'},
    {value: 12, label: '12'},
    {value: 13, label: '13'},
    {value: 14, label: '14'},
    {value: 15, label: '15'},
    {value: 16, label: '16'},
    {value: 17, label: '17'},
    {value: 18, label: '18'},
    {value: 19, label: '19'},
]


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


    const [certificateArr, setCertificateArr] = useState([]);
    const [certificate, setCertificate] = useState('');
    const [showCertificate, setShowCertificate] = useState(false);

    const [vacancyArr, setVacancyArr] = useState([]);
    const [vacancy, setVacancy] = useState('');
    const [showVacancy, setShowVacancy] = useState(false);

    const [gradeArr, setGradeArr] = useState([]);
    const [grade, setGrade] = useState('');
    const [showGrade, setShowGrade] = useState(false);

    const [subGradeArr, setSubGradeArr] = useState([]);
    const [subGrade, setSubGrade] = useState('');
    const [showSubGrade, setShowSubGrade] = useState(false);

    const [languageArr, setLanguageArr] = useState([]);
    const [language, setLanguage] = useState('');
    const [showLanguage, setShowLanguage] = useState(false);

    const [computerArr, setComputerArr] = useState([]);
    const [computer, setComputer] = useState('');
    const [showComputer, setShowComputer] = useState(false);

    const [legislationArr, setLegislationArr] = useState([]);
    const [legislation, setLegislation] = useState('');
    const [showLegislation, setShowLegislation] = useState(false);

    const [specialityArr, setSpecialityArr] = useState([]);
    const [speciality, setSpeciality] = useState('');
    const [showSpeciality, setShowSpeciality] = useState(false);

    const [enterpriseArr, setEnterpriseArr] = useState([]);
    const [enterprise, setEnterprise] = useState('');
    const [showEnterprise, setShowEnterprise] = useState(false);

    const [organizationArr, setOrganizationArr] = useState([]);
    const [organization, setOrganization] = useState('');
    const [showOrganization, setShowOrganization] = useState(false);

    const [skillArr, setSkillArr] = useState([]);
    const [skill, setSkill] = useState('');
    const [showSkill, setShowSkill] = useState(false);

    const [departmentArr, setDepartmentArr] = useState([]);
    const [department, setDepartment] = useState('');
    const [departmentOptions, setDepartmentOptions] = useState([])
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [showDepartment, setShowDepartment] = useState(false);
    const [showSubDepartment, setShowSubDepartment] = useState(false);

    const [subDepartment, setSubDepartment] = useState('');
    const [subDepartmentArr, setSubDepartmentArr] = useState([]);


    const [selectedMinGrade, setSelectedMinGrade] = useState(null);
    const [selectedMaxGrade, setSelectedMaxGrade] = useState(null);
    const [evaluation, setEvaluation] = useState('');

    const [active, setActive] = useState(false)

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
                backgroundColor: '#FAFCFF',
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

        control: (provided) => ({
            ...provided,
            minHeight: '43px',
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

        indicatorsContainer: (provided) => ({
            ...provided,
            paddingRight: '8px'
        }),

        container: (provided) => ({
            ...provided,
            width: '100%'
        }),

        menu: (provided) => ({
            ...provided,
            borderRadius: '2px',
            padding: '0',
            margin: '0',
            borderColor: 'red',
            width: '100%'
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '2px 8px 2px 16px'
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

    const getCountry = () => {
        mainAxios({
            method: 'get',
            url: '/countries',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setCountryArr(res.data);
        });
    }

    const sendCountry = () => {
        setActive(true);
        let data = {
            name: country
        }
        mainAxios({
            method: 'post',
            url: '/countries',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getCountry();
            setCountry('');
            setActive(false);
        });
    }

    const deleteCountry = (id) => {
        mainAxios({
            method: 'delete',
            url: '/countries/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getCountry()
        });
    }

    const getCity = () => {
        mainAxios({
            method: 'get',
            url: '/cities',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setCityArr(res.data)
        });
    }

    const sendCity = () => {
        setActive(true);
        let data = {
            name: city
        }
        mainAxios({
            method: 'post',
            url: '/cities',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getCity();
            setCity('');
            setActive(false);
        });
    }

    const deleteCity = (id) => {
        mainAxios({
            method: 'delete',
            url: '/cities/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getCity()
        });
    }

    const getRegion = () => {
        mainAxios({
            method: 'get',
            url: '/districts',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setRegionArr(res.data)
        });
    }

    const sendRegion = () => {
        setActive(true);
        let data = {
            name: region
        }
        mainAxios({
            method: 'post',
            url: '/districts',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getRegion();
            setRegion('');
            setActive(false);
        });
    }

    const deleteRegion = (id) => {
        mainAxios({
            method: 'delete',
            url: '/districts/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getCountry()
        });
    }

    const getCitizenCountry = () => {
        mainAxios({
            method: 'get',
            url: '/motherland',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setCitizenCountryArr(res.data)
        });
    }

    const sendCitizenCountry = () => {
        setActive(true);
        let data = {
            name: citizenCountry
        }
        mainAxios({
            method: 'post',
            url: '/motherland',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getCitizenCountry();
            setCitizenCountry('');
            setActive(false);
        });
    }

    const deleteCitizenCountry = (id) => {
        mainAxios({
            method: 'delete',
            url: '/motherland/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getCitizenCountry()
        });
    }

    const getUniversity = () => {
        mainAxios({
            method: 'get',
            url: '/education-institutions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setUniversityArr(res.data)
        });
    }

    const sendUniversity = () => {
        setActive(true);
        let data = {
            name: university
        }
        mainAxios({
            method: 'post',
            url: '/education-institutions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getUniversity();
            setUniversity('');
            setActive(false);
        });
    }

    const deleteUniversity = (id) => {
        mainAxios({
            method: 'delete',
            url: '/education-institutions/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getUniversity()
        });
    }

    const getCertificate = () => {
        mainAxios({
            method: 'get',
            url: '/certificates',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setCertificateArr(res.data)
        });
    }

    const sendCertificate = () => {
        setActive(true);
        let data = {
            name: certificate
        }
        mainAxios({
            method: 'post',
            url: '/certificates',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getCertificate();
            setCertificate('');
            setActive(false);
        });
    }

    const deleteCertificate = (id) => {
        mainAxios({
            method: 'delete',
            url: '/certificates/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getCertificate()
        });
    }

    const getVacancy = () => {
        mainAxios({
            method: 'get',
            url: '/positions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setVacancyArr(res.data)
        });
    }

    const sendVacancy = () => {
        setActive(true);
        let data = {
            name: vacancy
        }
        mainAxios({
            method: 'post',
            url: '/positions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getVacancy();
            setVacancy('');
            setActive(false);
        });
    }

    const deleteVacancy = (id) => {
        mainAxios({
            method: 'delete',
            url: '/positions/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getVacancy()
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
            setGradeArr(res.data)
        });
    }

    const sendGrade = () => {
        setActive(true);
        let data = {
            grade: parseFloat(grade)
        }
        mainAxios({
            method: 'post',
            url: '/grades',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getGrade();
            setGrade('');
            setActive(false);
        });
    }

    const deleteGrade = (id) => {
        mainAxios({
            method: 'delete',
            url: '/grades/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getGrade()
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
            setSubGradeArr(res.data)
        });
    }

    const sendSubGrade = () => {
        setActive(true);
        let data = {
            subGrade: subGrade
        }
        mainAxios({
            method: 'post',
            url: '/sub-grades',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getSubGrade();
            setSubGrade('');
            setActive(false);
        });
    }

    const deleteSubGrade = (id) => {
        mainAxios({
            method: 'delete',
            url: '/sub-grades/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getSubGrade()
        });
    }

    const getSkill = () => {
        mainAxios({
            method: 'get',
            url: '/skills',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setSkillArr(res.data)
        });
    }

    const sendSkill = () => {
        setActive(true);
        let data = {
            name: skill
        }
        mainAxios({
            method: 'post',
            url: '/skills',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getSkill();
            setSkill('');
            setActive(false);
        });
    }

    const deleteSkill = (id) => {
        mainAxios({
            method: 'delete',
            url: '/skills/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getSkill()
        });
    }

    const getLanguage = () => {
        mainAxios({
            method: 'get',
            url: '/languages',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setLanguageArr(res.data)
        });
    }

    const sendLanguage = () => {
        setActive(true);
        let data = {
            name: language
        }
        mainAxios({
            method: 'post',
            url: '/languages',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getLanguage();
            setLanguage('');
            setActive(false);
        });
    }

    const deleteLanguage = (id) => {
        mainAxios({
            method: 'delete',
            url: '/languages/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getLanguage()
        });
    }

    const getComputer = () => {
        mainAxios({
            method: 'get',
            url: '/computers',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setComputerArr(res.data)
        });
    }

    const sendComputer = () => {
        setActive(true);
        let data = {
            name: computer
        }
        mainAxios({
            method: 'post',
            url: '/computers',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getComputer();
            setComputer('');
            setActive(false);
        });
    }

    const deleteComputer = (id) => {
        mainAxios({
            method: 'delete',
            url: '/computers/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getComputer()
        });
    }

    const getLegislation = () => {
        mainAxios({
            method: 'get',
            url: '/legislations',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setLegislationArr(res.data)
        });
    }

    const sendLegislation = () => {
        setActive(true);
        let data = {
            name: legislation
        }
        mainAxios({
            method: 'post',
            url: '/legislations',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getComputer();
            setLegislation('');
            setActive(false);
        });
    }

    const deleteLegislation = (id) => {
        mainAxios({
            method: 'delete',
            url: '/legislations/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getLegislation()
        });
    }

    const getSpeciality = () => {
        mainAxios({
            method: 'get',
            url: '/specialities',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setSpecialityArr(res.data)
        });
    }

    const sendSpeciality = () => {
        setActive(true);
        let data = {
            name: speciality
        }
        mainAxios({
            method: 'post',
            url: '/specialities',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getSpeciality();
            setSpeciality('');
            setActive(false);
        });
    }

    const deleteSpeciality = (id) => {
        mainAxios({
            method: 'delete',
            url: '/specialities/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getSpeciality()
        });
    }

    const getEnterprise = () => {
        mainAxios({
            method: 'get',
            url: '/work-institutions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setEnterpriseArr(res.data)
        });
    }

    const sendEnterprise = () => {
        setActive(true);
        let data = {
            name: enterprise
        }
        mainAxios({
            method: 'post',
            url: '/work-institutions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getEnterprise();
            setEnterprise('');
            setActive(false);
        });
    }

    const deleteEnterprise = (id) => {
        mainAxios({
            method: 'delete',
            url: '/work-institutions/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getEnterprise()
        });
    }

    const getOrganization = () => {
        mainAxios({
            method: 'get',
            url: '/organizations',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setOrganizationArr(res.data)
        });
    }

    const sendOrganization = () => {
        setActive(true);
        let data = {
            name: organization
        }
        mainAxios({
            method: 'post',
            url: '/organizations',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getOrganization();
            setOrganization('');
            setActive(false);
        });
    }

    const deleteOrganization = (id) => {
        mainAxios({
            method: 'delete',
            url: '/organizations/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getOrganization()
        });
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
            let arr = res.data;
            setDepartmentArr(res.data);
            //console.log(departmentArr)
        });
    }

    const sendDepartment = () => {
        setActive(true);
        let data = {
            name: department
        }
        mainAxios({
            method: 'post',
            url: '/departments',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getDepartment();
            senSubDepartment();
            setDepartment('');
            setActive(false);
        });
    }

    const getSubDepartments = () => {
        mainAxios({
            method: 'get',
            url: '/sub-departments',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setSubDepartmentArr(res.data)
        });
    }


    const senSubDepartment = () => {
        let data = {
            name: subDepartment
        }
        mainAxios({
            method: 'post',
            url: '/sub-departments',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            getSubDepartments();
            setSubDepartment('');
        });
    }

    const deleteDepartment = (id) => {
        mainAxios({
            method: 'delete',
            url: '/departments/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            getDepartment()
        });
    }


    useEffect(() => {
        getCountry();
        getCity();
        getRegion();
        getCitizenCountry();
        getUniversity();
        getCertificate();
        getLanguage();
        getComputer();
        getLegislation();
        getSpeciality();
        getEnterprise();
        getOrganization();
        getVacancy();
        getSkill();
        getGrade();
        getSubGrade()
        getDepartment()
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
                                        countryArr ?
                                            countryArr.map((item, index) =>
                                                <Dropdown.Item key={index}>
                                                    {item.name}
                                                    <button type="button" className="btn-transparent btn-delete"
                                                            onClick={() => deleteCountry(item.id)}>
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                                fill="#040647"/>
                                                        </svg>
                                                    </button>
                                                </Dropdown.Item>
                                            )
                                            : null
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
                                        cityArr ?
                                            cityArr.map((item, index) =>
                                                <Dropdown.Item key={index}>
                                                    {item.name}
                                                    <button type="button" className="btn-transparent btn-delete"
                                                            onClick={() => deleteCity(item.id)}>
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                                fill="#040647"/>
                                                        </svg>
                                                    </button>
                                                </Dropdown.Item>
                                            )
                                            : null
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
                                        regionArr ?
                                            regionArr.map((item, index) =>
                                                <Dropdown.Item key={index}>
                                                    {item.name}
                                                    <button type="button" className="btn-transparent btn-delete"
                                                            onClick={() => deleteRegion(item.id)}>
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                                fill="#040647"/>
                                                        </svg>
                                                    </button>
                                                </Dropdown.Item>
                                            )
                                            : null
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
                                        citizenCountryArr ?
                                            citizenCountryArr.map((item, index) =>
                                                <Dropdown.Item key={index}>
                                                    {item.name}
                                                    <button type="button" className="btn-transparent btn-delete"
                                                            onClick={() => deleteCitizenCountry(item.id)}>
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                                fill="#040647"/>
                                                        </svg>
                                                    </button>
                                                </Dropdown.Item>
                                            )
                                            : null
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
                                        universityArr ?
                                            universityArr.map((item, index) =>
                                                <Dropdown.Item key={index}>
                                                    {item.name}
                                                    <button type="button" className="btn-transparent btn-delete"
                                                            onClick={() => deleteUniversity(item.id)}>
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                                fill="#040647"/>
                                                        </svg>
                                                    </button>
                                                </Dropdown.Item>
                                            )
                                            : null
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
                                Sertifikatlar
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Sertifikatlar
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        certificateArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.name}
                                                <button type="button" className="btn-transparent btn-delete"
                                                        onClick={() => deleteCertificate(item.id)}>
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
                                        onClick={() => setShowCertificate(true)}>
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
                        showCertificate ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={certificate}
                                                    placeholder="Sertifikatı  daxil edin"
                                                    onChange={(e => setCertificate(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendCertificate()}>
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
                                                <button type="button" className="btn-transparent btn-delete"
                                                        onClick={() => deleteVacancy(item.name)}>
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
                                Grade
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Grade
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        gradeArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.grade}
                                                <button type="button" className="btn-transparent btn-delete"
                                                        onClick={() => deleteGrade(item.id)}>
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
                                        onClick={() => setShowGrade(true)}>
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
                        showGrade ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={grade}
                                                    type="number"
                                                    placeholder="Grade  daxil edin"
                                                    onChange={(e => setGrade(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendGrade()}>
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
                                Subgrade
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Subgrade
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        subGradeArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.subGrade}
                                                <button type="button" className="btn-transparent btn-delete"
                                                        onClick={() => deleteSubGrade(item.id)}>
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
                                        onClick={() => setShowSubGrade(true)}>
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
                        showSubGrade ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={subGrade}
                                                    type="text"
                                                    placeholder="Subgrade  daxil edin"
                                                    onChange={(e => setSubGrade(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendSubGrade()}>
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
                                Dil biliyi
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Dil biliyi
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        languageArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.name}
                                                <button type="button" className="btn-transparent btn-delete"
                                                        onClick={() => deleteLanguage(item.id)}>
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
                                        onClick={() => setShowLanguage(true)}>
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
                        showLanguage ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={language}
                                                    placeholder="Struk b. tabe old. kurator rəh. ad, soyad, ata adı, vəzifə  daxil edin"
                                                    onChange={(e => setLanguage(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendLanguage()}>
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
                                Komputer biliyi
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Komputer biliyi
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        computerArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.name}
                                                <button type="button" className="btn-transparent btn-delete"
                                                        onClick={() => deleteComputer(item.id)}>
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
                                        onClick={() => setShowComputer(true)}>
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
                        showComputer ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={computer}
                                                    placeholder="Struk b. tabe old. kurator rəh. ad, soyad, ata adı, vəzifə  daxil edin"
                                                    onChange={(e => setComputer(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendComputer()}>
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
                                Qanunvericilik aktları
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Qanunvericilik aktları
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        legislationArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.name}
                                                <button type="button" className="btn-transparent btn-delete"
                                                        onClick={() => deleteLegislation(item.id)}>
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
                                        onClick={() => setShowLegislation(true)}>
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
                        showLegislation ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={legislation}
                                                    placeholder="Struk b. tabe old. kurator rəh. ad, soyad, ata adı, vəzifə  daxil edin"
                                                    onChange={(e => setLegislation(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendLegislation()}>
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
                                Təhsil ixtisası
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Təhsil ixtisası
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        specialityArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.name}
                                                <button type="button" className="btn-transparent btn-delete"
                                                        onClick={() => deleteSpeciality(item.id)}>
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
                                        onClick={() => setShowSpeciality(true)}>
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
                        showSpeciality ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={speciality}
                                                    placeholder="Təhsil ixtisası  daxil edin"
                                                    onChange={(e => setSpeciality(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendSpeciality()}>
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
                                Subgrade
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Subgrade
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        subGradeArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.subGrade}
                                                <button type="button" className="btn-transparent btn-delete"
                                                        onClick={() => deleteSubGrade(item.id)}>
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
                                        onClick={() => setShowSubGrade(true)}>
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
                        showSubGrade ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={subGrade}
                                                    type="text"
                                                    placeholder="Subgrade  daxil edin"
                                                    onChange={(e => setSubGrade(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendSubGrade()}>
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
                                Müəssisələr
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Müəssisələr
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        enterpriseArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.name}
                                                <button type="button" className="btn-transparent btn-delete"
                                                        onClick={() => deleteEnterprise(item.id)}>
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
                                        onClick={() => setShowEnterprise(true)}>
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
                        showEnterprise ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={enterprise}
                                                    placeholder="  Müəssisə  daxil edin"
                                                    onChange={(e => setEnterprise(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendEnterprise()}>
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
                                Təltifi verən orqanın adı
                            </div>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={active ? 'active' : ''}>
                                    Təltifi verən orqanın adı
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        organizationArr.map((item, index) =>
                                            <Dropdown.Item key={index}>
                                                {item.name}
                                                <button type="button" className="btn-transparent btn-delete"
                                                        onClick={() => deleteOrganization(item.id)}>
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
                                        onClick={() => setShowOrganization(true)}>
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
                        showOrganization ?
                            <div className="addition">
                                <Row className="flex-center">
                                    <Col xs={6}>
                                        <Form.Group className="m-0">
                                            <Form.Label>
                                                <Form.Control
                                                    value={organization}
                                                    placeholder="Təltifi verən orqanı  daxil edin"
                                                    onChange={(e => setOrganization(e.target.value))}/>
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <ul className="btn-block list-unstyled m-0 flex-start">
                                            <li>
                                                <button type="button" className="btn-transparent"
                                                        onClick={() => sendOrganization()}>
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
                                        skillArr ?
                                            skillArr.map((item, index) =>
                                                <Dropdown.Item key={index}>
                                                    {item.name}
                                                    <button type="button" className="btn-transparent btn-delete"
                                                            onClick={() => deleteSkill(item.id)}>
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                                fill="#040647"/>
                                                        </svg>
                                                    </button>
                                                </Dropdown.Item>
                                            )
                                            : null
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
                                        departmentArr ?
                                            departmentArr.map((item, index) =>
                                                <Dropdown.Item key={index}>
                                                    {item.name}
                                                    <button type="button" className="btn-transparent btn-delete"
                                                            onClick={() => deleteDepartment(item.id)}>
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M6.70355 6.00312L11.8475 0.859214C12.046 0.667475 12.0515 0.351111 11.8598 0.152578C11.668 -0.0459554 11.3517 -0.0514604 11.1531 0.140279C11.149 0.144291 11.1449 0.14839 11.1408 0.152578L5.99688 5.29648L0.852968 0.152548C0.654435 -0.0391912 0.33807 -0.0336862 0.14633 0.164847C-0.0407242 0.358519 -0.0407242 0.665542 0.14633 0.859214L5.29024 6.00312L0.14633 11.147C-0.0487768 11.3422 -0.0487768 11.6585 0.14633 11.8537C0.341467 12.0487 0.657831 12.0487 0.852968 11.8537L5.99688 6.70976L11.1408 11.8537C11.3393 12.0454 11.6557 12.0399 11.8474 11.8414C12.0345 11.6477 12.0345 11.3407 11.8474 11.147L6.70355 6.00312Z"
                                                                fill="#040647"/>
                                                        </svg>
                                                    </button>
                                                </Dropdown.Item>
                                            )
                                            : null
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
                            <div>
                                {
                                    departmentArr.length > 0 ?
                                        <div className="addition">
                                            <Row className="flex-center">
                                                <Col xs={6}>
                                                    <Form.Group className="m-0">
                                                        <Select
                                                            placeholder="Struktur vahidinin adı  seç"
                                                            value={selectedDepartment}
                                                            onChange={(val) => {
                                                                setSelectedDepartment(val);
                                                                setShowSubDepartment(true)
                                                            }}
                                                            options={departmentOptions}
                                                            isSearchable={departmentOptions ? departmentOptions.length > 5 ? true : false : false}
                                                            styles={customStyles}
                                                            getOptionLabel={(option) => (option.name)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                        :
                                        <div className="addition">
                                            <Row className="flex-center">
                                                <Col xs={3}>
                                                    <Form.Group className="m-0">
                                                        <Form.Label>
                                                            <Form.Control
                                                                value={department}
                                                                placeholder=" Struktur vahidinin adı  daxil edin"
                                                                onChange={(e => setDepartment(e.target.value))}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={3}>
                                                    <Form.Group className="m-0">
                                                        <Form.Label>
                                                            <Form.Control
                                                                value={subDepartment}
                                                                placeholder=" Struktur bölmənin adı  daxil edin"
                                                                onChange={(e => setSubDepartment(e.target.value))}/>
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
                                }
                                {
                                    showSubDepartment ?
                                        <div className="addition">
                                            <Row className="flex-center">
                                                <Col xs={3}>
                                                    <Form.Group className="m-0">
                                                        <Form.Label>
                                                            <Form.Control
                                                                value={selectedDepartment !==null ? selectedDepartment.name : null}
                                                                disabled={true}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={3}>
                                                    <Form.Group className="m-0">
                                                        <Form.Label>
                                                            <Form.Control
                                                                value={subDepartment}
                                                                placeholder=" Struktur bölmənin adı  daxil edin"
                                                                onChange={(e => setSubDepartment(e.target.value))}/>
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
                            : null

                    }
                </div>
                <div className="block-inn">
                    <div className="row">
                        <Col xs={3}>
                            <div className="flex">
                                <Form.Group className="form-group m-0 w-100">
                                    <Select
                                        placeholder="Min dərəcə"
                                        value={selectedMinGrade}
                                        onChange={setSelectedMinGrade}
                                        options={gradeOptions}
                                        isSearchable={gradeOptions ? gradeOptions.length > 5 ? true : false : false}
                                        styles={customStyles}
                                        getOptionLabel={(option) => (option.label)}
                                    />
                                </Form.Group>
                                <span className="break-line"></span>
                                <Form.Group className="form-group m-0 w-100">
                                    <Select
                                        placeholder="Max dərəcə"
                                        value={selectedMaxGrade}
                                        onChange={setSelectedMaxGrade}
                                        options={gradeOptions}
                                        isSearchable={gradeOptions ? gradeOptions.length > 5 ? true : false : false}
                                        styles={customStyles}
                                        getOptionLabel={(option) => (option.label)}
                                    />

                                </Form.Group>

                            </div>
                        </Col>
                        <Col xs={2}>
                            <Form.Group className="form-group">
                                <Form.Label>
                                    <Form.Control
                                        value={evaluation}
                                        placeholder="Qiymətləndirmə"
                                        onChange={e => setEvaluation(e.target.value)}/>
                                </Form.Label>


                            </Form.Group>
                        </Col>
                    </div>
                </div>
            </div>
        </Aux>
    );
}

export default SettingEdit
