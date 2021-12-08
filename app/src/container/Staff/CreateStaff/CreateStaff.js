import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Button, Container, Row, Col, Form, Tabs, Tab} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import {mainAxios} from "../../../components/Axios/axios";
import {uid} from "react-uid";
import Indicator from "../../../components/Loading/Indicator";
import Swal from "sweetalert2";

function CreateStaff() {

    const evaluationOptions = [
        {value: 'BEST', label: 'Əla'},
        {value: 'MIDDLE', label: 'Orta'},
        {value: 'GOOD', label: 'Yaxşı'}
    ];

    const genderOptions = [
        {value: 'MALE', label: "Kişi"},
        {value: 'FEMALE', label: "Qadın"},
        {value: 'NON', label: "Tələb yoxdur"},
    ]

    const educationDegreeOptions = [
        {value: 'MIDDLE', label: "Orta təhsil"},
        {value: 'MIDDLE_SPECIAL', label: "Orta ixtisas təhsili"},
        {value: 'PROFESSION', label: "Peşə təhsili"},
        {value: 'BACHELOR', label: "Bakalavr təhsili"},
        {value: 'MASTER', label: "Magistratura təhsili"},
        {value: 'DOCTORAL', label: "Doktorantura təhsili"},
    ]

    const options = [
        {value: 1, label: 'Bəli'},
        {value: 0, label: 'Xeyr'}
    ];

    const workConditionOptions = [
        {value: 'HARMFUL', label: 'Zərərli'},
        {value: 'HARMLESS', label: 'Zərərsiz'}
    ];

    const WorkModeOptions = [
        {value: 'DAILY', label: 'Gündəlik'},
        {value: 'ALTERNATELY', label: 'Növbəli'},
    ]

    const vacancyCategoryOptions = [
        {value: 'LEADER', label: 'Rəhbər'},
        {value: 'ENGINEER', label: 'Mütəxəssis'},
        {value: 'TECHNICAL_EXECUTOR', label: 'Texniki icraçı'},
        {value: 'WORKER', label: 'Fəhlə'},
    ]

    const workPlaceOptions = [
        {value: 'WORK_PLACE_1', label: 'Bakı inzibati bina'},
        {value: 'WORK_PLACE_2', label: 'Dəniz vağzalı'},
        {value: 'WORK_PLACE_3', label: 'Dübəndi terminalı'},
        {value: 'WORK_PLACE_4', label: 'Qaradağ anbarı'},
        {value: 'WORK_PLACE_5', label: 'Ələt'},
    ]

    /*check&visibility*/
    const [key, setKey] = useState('general');
    const [dataVal, setDataVal] = useState('');
    const [loadingIndicator, setLoadingIndicator] = useState(false);
    const [errors, setErrors] = useState({});

    /*check&visibility*/
    const [showButton, setShowButton] = useState(false);

    /*---------------General---------------*/
    /*select*/
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedMinGrade, setSelectedMinGrade] = useState(null);
    const [selectedMaxGrade, setSelectedMaxGrade] = useState(null);
    const [selectedWorkCondition, setSelectedWorkCondition] = useState(null);
    const [selectedWorkMode, setSelectedWorkMode] = useState(null);
    const [selectedVacancy, setSelectedVacancy] = useState(null);
    const [selectedVacancyCategory, setSelectedVacancyCategory] = useState(null);
    const [selectedCurator, setSelectedCurator] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedFamilyJob, setSelectedFamilyJob] = useState(null);
    const [selectedMilitaryAchieve, setSelectedMilitaryAchieve] = useState(null);
    const [selectedHealth, setSelectedHealth] = useState(null);
    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedSubDepartment, setSelectedSubDepartment] = useState(null);
    const [selectedEducationDegree, setSelectedEducationDegree] = useState(null);
    const [selectedWorkAddress, setSelectedWorkAddress] = useState(null);
    const [selectedRequiredFile, setSelectedRequiredFile] = useState(null);
    const [selectedSpeciality, setSelectedSpeciality] = useState(null);
    /*array*/
    const [institution, setInstitution] = useState([]);
    const [department, setDepartment] = useState([]);
    const [subDepartment, setSubDepartment] = useState([]);
    const [vacancy, setVacancy] = useState([]);
    const [familyJob, setFamilyJob] = useState([]);
    const [skill, setSkill] = useState([]);
    const [positionFunctionArr, setPositionFunctionArr] = useState([""]);
    const [skillArr, setSkillArr] = useState([{requiredSkillId: null, level: null}]);
    const [curator, setCurator] = useState([]);
    const [speciality, setSpeciality] = useState([]);
    const [computerSkill, setComputerSkill] = useState([]);
    const [languageSkill, setLanguageSkill] = useState([]);
    const [legislationSkill, setLegislationSkill] = useState([]);
    const [grade, setGrade] = useState([])
    /*input*/
    const [obeyDepartment, setObeyDepartment] = useState('');
    const [vacancyCount, setVacancyCount] = useState('');
    const [areaExperience, setAreaExperience] = useState('');
    const [leaderExperience, setLeaderExperience] = useState('');
    const [height, setHeight] = useState('');
    const [workConditionPer, setWorkConditionPer] = useState('');
    const [workConditionVac, setWorkConditionVac] = useState('');
    /*checked*/
    const [showHeight, setShowHeight] = useState(false);
    const [showCondition, setCondition] = useState(false)

    /*-----------Knowledge------------*/
    const [skillProgramArr, setSkillProgramArr] = useState([{computerId: null, level: null}]);
    const [skillLegalArr, setSkillLegalArr] = useState([{legislationId: null, level: null}]);
    const [skillLanguageArr, setSkillLanguageArr] = useState([{languageId: null, level: null}]);

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
            whiteSpace: 'nowrap'

        }),

    };

    const getInstitution = () => {
        mainAxios({
            method: 'get',
            url: '/work-institutions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            //arr.push({name: 'Digər'})
            setInstitution(res.data)
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
            setDepartment(res.data);
        });
    }

    const getSubDepartment = (id) => {
        mainAxios({
            method: 'get',
            url: `/departments/${id}/sub-departments/`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setSubDepartment(res.data);

        });
    }

    const getCurators = () => {
        mainAxios({
            method: 'get',
            url: `/employees/curators`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setCurator(res.data);

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
            let arr = res.data;
            //arr.push({name: 'Digər'})
            setVacancy(arr);

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


    const getFamilyJob = () => {
        mainAxios({
            method: 'get',
            url: '/job-families',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            //arr.push({name: 'Digər'})
            setFamilyJob(res.data);

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
            setSpeciality(res.data)
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
            setSkill(res.data);
        });
    }

    const getComputerSkill = () => {
        mainAxios({
            method: 'get',
            url: '/computers',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setComputerSkill(res.data)
        });
    }

    const getLanguageSkill = () => {
        mainAxios({
            method: 'get',
            url: '/languages',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setLanguageSkill(res.data)
        });
    }

    const getLegislationSkill = () => {
        mainAxios({
            method: 'get',
            url: '/legislations',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setLegislationSkill(res.data)
        });
    }

    const getHeight = (val) => {
        val.value === 1 ? setShowHeight(true) : setShowHeight(false)
    }

    const addSkill = () => {
        setSkillArr([...skillArr, {requiredSkillId: null, level: null}])
    }

    const addProgramSkill = () => {
        setSkillProgramArr([...skillProgramArr, {computerId: null, level: null}])
    }

    const addLegalSkill = () => {
        setSkillLegalArr([...skillLegalArr, {legislationId: null, level: null}])
    }

    const addLanguageSkill = () => {
        setSkillLanguageArr([...skillLanguageArr, {languageId: null, level: null}])
    }

    const addPositionFunction = () => {
        setPositionFunctionArr(positionFunctionArr => [...positionFunctionArr, " "])
    }

    const sendGeneralData = () => {
        setLoadingIndicator(true);
        let checkLegalArr = 0

        for (let i of skillLegalArr) {
            if (skillLegalArr.length === 1 && i.legislationId === null) {
                checkLegalArr = 1
            }
        }
        let data = {
            "generalInformation": {
                "conditionalAdditionPercentage": workConditionPer !== '' ? parseFloat(workConditionPer) : null,
                "conditionalAdditionVacation": workConditionVac !== '' ? parseFloat(workConditionVac) : null,
                "count": parseFloat(vacancyCount),
                "curatorId": selectedCurator !== null ? selectedCurator.id : null,
                "departmentId": selectedDepartment !== null ? selectedDepartment.id : null,
                "educationStatus": selectedEducationDegree !== null ? selectedEducationDegree.value : null,
                "experience": {
                    "area": parseFloat(areaExperience),
                    "leader": parseFloat(leaderExperience)
                },
                "functionalities": positionFunctionArr,
                "gender": selectedGender !== null ? selectedGender.value : null,
                "gradeRange": {
                    "min": selectedMinGrade !== null ? selectedMinGrade.grade : null,
                    "max": selectedMaxGrade !== null ? selectedMaxGrade.grade : null
                },
                "healthy": selectedHealth !== null ? selectedHealth.value : null,
                "height": parseFloat(height),
                "institutionId": selectedInstitution !== null ? selectedInstitution.id : null,
                "militaryRequire": selectedMilitaryAchieve !== null ? selectedMilitaryAchieve.value : null,
                "positionCategory": selectedVacancyCategory !== null ? selectedVacancyCategory.value : null,
                "positionId": selectedVacancy !== null ? selectedVacancy.id : null,
                "legislationStatementSet": checkLegalArr ? [] : skillLegalArr,
                "specialityId": selectedSpeciality !== null ? selectedSpeciality.id : null,
                "subDepartmentId": selectedSubDepartment !== null ? selectedSubDepartment.id : null,
                "workCondition": selectedWorkCondition !== null ? selectedWorkCondition.value : null,
                "workMode": selectedWorkMode !== null ? selectedWorkMode.value : null,
                "workPlace": selectedWorkAddress !== null ? selectedWorkAddress.value : null,
                "jobFamilyId": selectedFamilyJob !== null ? selectedFamilyJob.id : null,
                "subordinateDepartment": obeyDepartment,
                "requireCertificate": selectedRequiredFile !== null ? selectedRequiredFile.value : null
            }

        }
        mainAxios({
            method: 'post',
            url: '/vacancies',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                "Accept-Language": "az"
            },
            data: data
        }).then((res) => {
            setLoadingIndicator(false);
            Swal.fire({
                icon: 'success',
                text: 'Məlumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
            setKey('knowledge');
            setShowButton(true);
            setDataVal(res.data);
            setErrors({})
        }).catch((error) => {
            setLoadingIndicator(false);
            Swal.fire({
                icon: 'error',
                text: 'Məlumatlar qeyd edilmədi!',
                cancelButtonText: 'Bağla',
                showCancelButton: true,
                showConfirmButton: false,
            })
            if (error.response.data.validations) {
                setErrors(error.response.data.validations)
            } else {
                setErrors({})
            }
        });
    }

    const sendGeneralUpdate = () => {
        setLoadingIndicator(true);
        let checkLegalArr = 0

        for (let i of skillLegalArr) {
            if (skillLegalArr.length === 1 && i.legislationId === null) {
                checkLegalArr = 1
            }
        }
        let data = {
            "generalInformation": {
                "conditionalAdditionPercentage": workConditionPer !== '' ? workConditionPer : null,
                "count": parseFloat(vacancyCount),
                "curatorId": selectedCurator !== null ? selectedCurator.id : null,
                "departmentId": selectedDepartment !== null ? selectedDepartment.id : null,
                "educationStatus": selectedEducationDegree !== null ? selectedEducationDegree.value : null,
                "experience": {
                    "area": parseFloat(areaExperience),
                    "leader": parseFloat(leaderExperience)
                },
                "functionalities": positionFunctionArr,
                "gender": selectedGender !== null ? selectedGender.value : null,
                "gradeRange": {
                    "min": selectedMinGrade !== null ? selectedMinGrade.grade : null,
                    "max": selectedMaxGrade !== null ? selectedMaxGrade.grade : null
                },
                "healthy": selectedHealth !== null ? selectedHealth.value : null,
                "height": parseFloat(height),
                "institutionId": selectedInstitution !== null ? selectedInstitution.id : null,
                "militaryRequire": selectedMilitaryAchieve !== null ? selectedMilitaryAchieve.value : null,
                "positionCategory": selectedVacancyCategory !== null ? selectedVacancyCategory.value : null,
                "positionId": selectedVacancy !== null ? selectedVacancy.id : null,
                "legislationStatementSet": checkLegalArr ? [] : skillLegalArr,
                "specialityId": selectedSpeciality !== null ? selectedSpeciality.id : null,
                "subDepartmentId": selectedSubDepartment !== null ? selectedSubDepartment.id : null,
                "workCondition": selectedWorkCondition !== null ? selectedWorkCondition.value : null,
                "workMode": selectedWorkMode !== null ? selectedWorkMode.value : null,
                "workPlace": selectedWorkAddress !== null ? selectedWorkAddress.value : null,
                "jobFamilyId": selectedFamilyJob !== null ? selectedFamilyJob.id : null,
                "subordinateDepartment": obeyDepartment,
                "requireCertificate": selectedRequiredFile !== null ? selectedRequiredFile.value : null
            }
        }
        mainAxios({
            method: 'put',
            url: '/vacancies/' + dataVal,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                "Accept-Language": "az"
            },
            data: data
        }).then((res) => {
            setLoadingIndicator(false);
            Swal.fire({
                icon: 'success',
                text: 'Məlumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
            setKey('knowledge');
            setErrors({})
        }).catch((error) => {
            setLoadingIndicator(false);
            Swal.fire({
                icon: 'error',
                text: 'Məlumatlar qeyd edilmədi!',
                cancelButtonText: 'Bağla',
                showCancelButton: true,
                showConfirmButton: false,
            })
            if (error.response.data.validations) {
                setErrors(error.response.data.validations)
            } else {
                setErrors({})
            }
        });
    }

    const sendDataKnowledge = () => {
        setLoadingIndicator(true);
        let checkProgramArr = 0

        for (let i of skillProgramArr) {
            if (skillProgramArr.length === 1 && i.computerId === null) {
                checkProgramArr = 1
            }
        }
        let checkLanguageArr = 0

        for (let i of skillLanguageArr) {
            if (skillLanguageArr.length === 1 && i.languageId === null) {
                checkLanguageArr = 1
            }
        }
        let checkSkillArr = 0

        for (let i of skillArr) {
            if (skillArr.length === 1 && i.requiredSkillId === null) {
                checkSkillArr = 1
            }
        }
        let data = {
            "specialityKnowledge": {
                "computerKnowledgeSet": checkProgramArr ? [] : skillProgramArr,
                "languageKnowledgeSet": checkLanguageArr ? [] : skillLanguageArr,
                "requiredKnowledgeSet": checkSkillArr ? [] : skillArr,
            }
        }

        mainAxios({
            method: 'put',
            url: '/vacancies/' + dataVal,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            setLoadingIndicator(false);
            Swal.fire({
                icon: 'success',
                text: 'Məlumatlar qeyd edildi!',
                showConfirmButton: false,
                timer: 1500
            });
        }).catch((error) => {
            setLoadingIndicator(false);
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
        getInstitution();
        getDepartment();
        getVacancy();
        getGrade();
        getFamilyJob();
        getSkill();
        getCurators();
        getSpeciality();
        getComputerSkill();
        getLegislationSkill();
        getLanguageSkill();
    }, []);

    return (
        <Aux>
            <div className="create-staff">
                <Container fluid>
                    <div className="title-block flex">
                        <div className="title flex-center">
                            <Link to="/staff" className="flex">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.3333 14H7.58333M12.25 8.75L7 14L12.25 19.25" stroke="#193651"
                                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                            Struktur və ştat cədvəli əlavə et
                        </div>
                    </div>
                    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                        <Tab eventKey="general" title="Ümumi məlumatlar">
                            <div className="block">
                                <Form className="form-list">
                                    <div className="add-block">
                                        <div className="block-inn">
                                            <div className="block-title">
                                                Struktur və ştat cədvəli üzrə məlumatlar
                                            </div>
                                            <Row>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Müəssənin adı *</span>
                                                        <Select
                                                            placeholder="Müəssənin adını seçin"
                                                            value={selectedInstitution}
                                                            onChange={(val) => {
                                                                setSelectedInstitution(val);
                                                            }}
                                                            isSearchable={institution ? institution.length > 5 ? true : false : false}
                                                            options={institution}
                                                            getOptionLabel={(option) => (option.name)}
                                                            styles={customStyles}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors['generalInformation.institutionId'] !== '' ?
                                                                    <span
                                                                        className="text-validation">{errors['generalInformation.institutionId']}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Struktur vahidinin adı *</span>
                                                        <Select
                                                            placeholder="Struktur vahidinin adını seçin"
                                                            value={selectedDepartment}
                                                            onChange={(val) => {
                                                                setSelectedDepartment(val);
                                                                getSubDepartment(val.id);
                                                                setSelectedSubDepartment(null)
                                                            }}
                                                            isSearchable={department ? department.length > 5 ? true : false : false}
                                                            options={department}
                                                            getOptionLabel={(option) => (option.name)}
                                                            styles={customStyles}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors['generalInformation.departmentId'] !== '' ?
                                                                    <span
                                                                        className="text-validation">{errors['generalInformation.departmentId']}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Struktur bölmənin adı</span>
                                                        <Select
                                                            placeholder="Struktur bölmənin adını seçin"
                                                            value={selectedSubDepartment}
                                                            onChange={(val) => {
                                                                setSelectedSubDepartment(val);
                                                            }}
                                                            isSearchable={subDepartment ? subDepartment.length > 5 ? true : false : false}
                                                            options={subDepartment}
                                                            getOptionLabel={(option) => (option.name)}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">Tabe struktur bölmənin adı</span>
                                                        <Form.Label>
                                                            <Form.Control
                                                                placeholder="Tabe struktur bölmənin adını daxil edin"
                                                                onChange={(e => setObeyDepartment(e.target.value))}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Ştat vahidinin adı *</span>
                                                        <Select
                                                            placeholder="Ştat vahidin adını seçin"
                                                            value={selectedVacancy}
                                                            onChange={(val) => {
                                                                setSelectedVacancy(val);
                                                            }}
                                                            isSearchable={vacancy ? vacancy.length > 5 ? true : false : false}
                                                            options={vacancy}
                                                            styles={customStyles}
                                                            getOptionLabel={(option) => (option.name)}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors['generalInformation.positionId'] !== '' ?
                                                                    <span
                                                                        className="text-validation">{errors['generalInformation.positionId']}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Ştat vahidinin sayı *</span>
                                                        <Form.Label>
                                                            <Form.Control type="number"
                                                                          placeholder="Ştat vahidinin saynı daxil edin"
                                                                          onChange={(e => {
                                                                              setVacancyCount(e.target.value);
                                                                          })}/>
                                                        </Form.Label>
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors['generalInformation.count'] !== '' ?
                                                                    <span
                                                                        className="text-validation">{errors['generalInformation.count']}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Əmək şəraiti *</span>
                                                        <Select
                                                            placeholder="Əmək şəraitini seçin"
                                                            value={selectedWorkCondition}
                                                            onChange={(val) => {
                                                                let value = val.value;
                                                                setSelectedWorkCondition(val);
                                                                value !== 'HARMLESS' ? setCondition(true) : setCondition(false);

                                                                if (value !== 'HARMLESS') {
                                                                    setWorkConditionVac('');
                                                                    setWorkConditionPer('');
                                                                }
                                                            }}
                                                            options={workConditionOptions}
                                                            isSearchable={workConditionOptions ? workConditionOptions.length > 5 ? true : false : false}
                                                            styles={customStyles}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors['generalInformation.workCondition'] !== '' ?
                                                                    <span
                                                                        className="text-validation">{errors['generalInformation.workCondition']}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">Ştat vahidinin iş rejimi *</span>
                                                        <Select
                                                            placeholder="İş rejimini seçin"
                                                            value={selectedWorkMode}
                                                            onChange={setSelectedWorkMode}
                                                            isSearchable={WorkModeOptions ? WorkModeOptions.length > 5 ? true : false : false}
                                                            options={WorkModeOptions}
                                                            styles={customStyles}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors['generalInformation.workMode'] !== '' ?
                                                                    <span
                                                                        className="text-validation">{errors['generalInformation.workMode']}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                {
                                                    showCondition ?
                                                        <>
                                                            <Col xs={6}>
                                                                <Form.Group className="form-group">
                                                                    <span
                                                                        className="input-title">Əmək şəraiti dərəcəsi</span>
                                                                    <Form.Control
                                                                        value={workConditionPer || ''}
                                                                        type="number"
                                                                        placeholder="Əmək şəraiti dərəcəsi daxil edin"
                                                                        onChange={(e => setWorkConditionPer(e.target.value))}/>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xs={6}>
                                                                <Form.Group className="form-group">
                                                                    <span className="input-title">Əmək şəraitinə görə məzuniyyət</span>
                                                                    <Form.Control
                                                                        value={workConditionVac || ''}
                                                                        type="number"
                                                                        placeholder="Əmək şəraitinə görə məzuniyyət daxil edin"
                                                                        onChange={(e => setWorkConditionVac(e.target.value))}/>
                                                                </Form.Group>
                                                            </Col>
                                                        </>
                                                        : null
                                                }
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">Ştat vahidinin kateqoriyası * </span>
                                                        <Select
                                                            placeholder="Kateqoriyanı seçin"
                                                            value={selectedVacancyCategory}
                                                            onChange={setSelectedVacancyCategory}
                                                            isSearchable={vacancyCategoryOptions ? vacancyCategoryOptions.length > 5 ? true : false : false}
                                                            options={vacancyCategoryOptions}
                                                            styles={customStyles}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors['generalInformation.positionCategory'] !== '' ?
                                                                    <span
                                                                        className="text-validation">{errors['generalInformation.positionCategory']}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">İş ailəsi </span>
                                                        <Select
                                                            placeholder="İş ailəsini seçin"
                                                            value={selectedFamilyJob}
                                                            onChange={(val) => {
                                                                setSelectedFamilyJob(val);
                                                            }}
                                                            isSearchable={familyJob ? familyJob.length > 5 ? true : false : false}
                                                            options={familyJob}
                                                            styles={customStyles}
                                                            getOptionLabel={(option) => (option.name)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">İş yerinin ünvanı * </span>
                                                        <Select
                                                            placeholder="İş yerinin ünvanını seçin"
                                                            value={selectedWorkAddress}
                                                            onChange={setSelectedWorkAddress}
                                                            options={workPlaceOptions}
                                                            isSearchable={workPlaceOptions ? workPlaceOptions.length > 5 ? true : false : false}
                                                            styles={customStyles}
                                                            getOptionLabel={(option) => (option.label)}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors['generalInformation.workPlace'] !== '' ?
                                                                    <span
                                                                        className="text-validation">{errors['generalInformation.workPlace']}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Struk b. tabe old. kurator rəh. ad, soyad, ata adı, vəzifə</span>
                                                        <Select
                                                            placeholder="ad, soyad, ata adı, vəzifəni seçin"
                                                            value={selectedCurator}
                                                            onChange={(val) => setSelectedCurator(val)}
                                                            options={curator}
                                                            isSearchable={curator ? curator.length > 5 ? true : false : false}
                                                            styles={customStyles}
                                                            getOptionLabel={(option) => (option.fullName)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Min dərəcə *</span>
                                                        <Select
                                                            placeholder="Min dərəcəni seçin"
                                                            value={selectedMinGrade}
                                                            onChange={setSelectedMinGrade}
                                                            options={grade}
                                                            isSearchable={grade ? grade.length > 5 ? true : false : false}
                                                            styles={customStyles}
                                                            getOptionLabel={(option) => (option.grade)}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors['generalInformation.gradeRange.min'] !== '' ?
                                                                    <span
                                                                        className="text-validation">{errors['generalInformation.gradeRange.min']}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Max dərəcə *</span>
                                                        <Select
                                                            placeholder="Max dərəcəni seçin"
                                                            value={selectedMaxGrade}
                                                            onChange={setSelectedMaxGrade}
                                                            options={grade}
                                                            isSearchable={grade ? grade.length > 5 ? true : false : false}
                                                            styles={customStyles}
                                                            getOptionLabel={(option) => (option.grade)}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors['generalInformation.gradeRange.max'] !== '' ?
                                                                    <span
                                                                        className="text-validation">{errors['generalInformation.gradeRange.max']}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="block-inn">
                                            <div className="block-title">
                                                Qanunvericilik
                                            </div>
                                            <div className="addition-content">
                                                {
                                                    skillLegalArr.map((item, index) =>
                                                        <div key={uid(item, index)}
                                                             className={index === 0 ? '' : 'add-item'}>
                                                            {
                                                                index === 0 ? null :
                                                                    <div className="add-item-top">
                                                                        <p className="m-0"> #{index + 1}. Digər </p>
                                                                        <Button
                                                                            className="btn-transparent btn-remove flex-center"
                                                                            onClick={() => {
                                                                                skillLegalArr.splice(index, 1);
                                                                                setSkillLegalArr([...skillLegalArr], skillLegalArr)
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
                                                                <Col xs={6}>
                                                                    <Form.Group className="form-group">
                                                                    <span
                                                                        className="input-title">Qanunvericilik aktları</span>
                                                                        <Select
                                                                            onChange={(val) => {
                                                                                skillLegalArr[index].legislationId = val.id;
                                                                                setSkillLegalArr([...skillLegalArr], skillLegalArr);
                                                                            }}
                                                                            placeholder="Qanunvericilik aktlarını seçin"
                                                                            isSearchable={legislationSkill ? legislationSkill.length > 5 ? true : false : false}
                                                                            options={legislationSkill}
                                                                            getOptionLabel={(option) => (option.name)}
                                                                            styles={customStyles}/>
                                                                        <div className="validation-block flex-start">
                                                                            {
                                                                                errors['generalInformation.legislationStatementSet[].legislationId'] !== '' ?
                                                                                    <span
                                                                                        className="text-validation">{errors['generalInformation.legislationStatementSet[].legislationId']}</span>
                                                                                    : null
                                                                            }
                                                                        </div>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={6}>
                                                                    <Form.Group className="form-group">
                                                                        <span
                                                                            className="input-title">Bilik səviyyəsi</span>
                                                                        <Select
                                                                            onChange={(val) => {
                                                                                skillLegalArr[index].level = val.value;
                                                                                setSkillLegalArr([...skillLegalArr], skillLegalArr);
                                                                            }}
                                                                            placeholder="Bilik səviyyəsini seçin"
                                                                            isSearchable={evaluationOptions ? evaluationOptions.length > 5 ? true : false : false}
                                                                            options={evaluationOptions}
                                                                            styles={customStyles}
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="flex-end">
                                                <button className="btn-color" onClick={() => addLegalSkill()}
                                                        type="button">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M0.667969 6.00033H11.3346M6.0013 0.666992V11.3337V0.666992Z"
                                                            stroke="#3083DC" strokeWidth="1.3" strokeLinecap="round"
                                                            strokeLinejoin="round"/>
                                                    </svg>
                                                    <span>əlavə et</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="block-inn">
                                            <div className="block-title">
                                                Kvalifikasiya tələbləri
                                            </div>
                                            <Row>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Rəhbər üzrə staj tələbi</span>
                                                        <Form.Label>
                                                            <Form.Control type="number"
                                                                          placeholder="Rəhbər üzrə staj tələbini daxil edin"
                                                                          onChange={(e => setLeaderExperience(e.target.value))}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Sahə üzrə staj tələbi</span>
                                                        <Form.Label>
                                                            <Form.Control type="number"
                                                                          placeholder="Sahə üzrə staj tələbini daxil edin"
                                                                          onChange={(e => setAreaExperience(e.target.value))}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Təhsil pilləsi</span>
                                                        <Select
                                                            placeholder="Təhsil pilləsini seçin"
                                                            value={selectedEducationDegree}
                                                            onChange={setSelectedEducationDegree}
                                                            isSearchable={educationDegreeOptions ? educationDegreeOptions.length > 5 ? true : false : false}
                                                            options={educationDegreeOptions}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Təhsil ixtisası</span>
                                                        <Select
                                                            placeholder="Təhsil pilləsini seçin"
                                                            value={selectedSpeciality}
                                                            onChange={(val) => setSelectedSpeciality(val)}
                                                            isSearchable={speciality ? speciality.length > 5 ? true : false : false}
                                                            options={speciality}
                                                            getOptionLabel={(option) => (option.name)}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Sertifikat tələbi</span>
                                                        <Select
                                                            placeholder="Sertifikat tələbini seçin"
                                                            value={selectedRequiredFile}
                                                            onChange={setSelectedRequiredFile}
                                                            isSearchable={options ? options.length > 5 ? true : false : false}
                                                            options={options}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Boy tələbi</span>
                                                        <Select
                                                            value={selectedOption}
                                                            onChange={(val) => {
                                                                getHeight(val);
                                                                setSelectedOption(val)
                                                            }}
                                                            placeholder="Boy tələbini seçin"
                                                            isSearchable={options ? options.length > 5 ? true : false : false}
                                                            options={options}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">Hərbi mükəlləfiyyət tələbi</span>
                                                        <Select
                                                            placeholder="Hərbi mükəlləfiyyət tələbini seçin"
                                                            value={selectedMilitaryAchieve}
                                                            onChange={setSelectedMilitaryAchieve}
                                                            isSearchable={options ? options.length > 5 ? true : false : false}
                                                            options={options}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                {
                                                    showHeight ?
                                                        <Col xs={12}>
                                                            <Form.Group className="form-group">
                                                                <span className="input-title">Boy tələbi</span>
                                                                <Form.Label>
                                                                    <Form.Control type="number"
                                                                                  placeholder="Boy tələbini daxil edin"
                                                                                  onChange={(e) => setHeight(e.target.value)}/>
                                                                </Form.Label>
                                                            </Form.Group>
                                                        </Col>
                                                        : null
                                                }
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Sağlamlıq tələbi</span>
                                                        <Select
                                                            placeholder="Sağlamlıq tələbini seçin"
                                                            value={selectedHealth}
                                                            onChange={setSelectedHealth}
                                                            isSearchable={options ? options.length > 5 ? true : false : false}
                                                            options={options}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Cinsiyyət tələbi</span>
                                                        <Select
                                                            placeholder="Cinsiyyət tələbini seçin"
                                                            value={selectedGender}
                                                            onChange={setSelectedGender}
                                                            isSearchable={genderOptions ? genderOptions.length > 5 ? true : false : false}
                                                            options={genderOptions}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <div className="addition-content">
                                                {
                                                    positionFunctionArr.map((item, index) =>
                                                        <div key={index} className={index === 0 ? '' : 'add-item'}>
                                                            {
                                                                index === 0 ? null :
                                                                    <div className="add-item-top">
                                                                        <p className="m-0"> #{index + 1}. Digər </p>
                                                                        <Button
                                                                            className="btn-transparent btn-remove flex-center"
                                                                            onClick={() => {
                                                                                positionFunctionArr.splice(index, 1);
                                                                                setPositionFunctionArr([...positionFunctionArr], positionFunctionArr)
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
                                                                        <span className="input-title">Vəzifə funksiyaları </span>
                                                                        <Form.Label>
                                                                            <Form.Control as="textarea"
                                                                                          onChange={(e) => {
                                                                                              positionFunctionArr[index] = e.target.value;
                                                                                              setPositionFunctionArr([...positionFunctionArr], positionFunctionArr);
                                                                                          }}
                                                                                          value={item}
                                                                                          placeholder="Vəzifə funksiyalarını daxil edin"
                                                                            />
                                                                        </Form.Label>
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    )
                                                }
                                                <div className="flex-end">
                                                    <button className="btn-color"
                                                            type="button"
                                                            onClick={() => addPositionFunction()}>
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M0.667969 6.00033H11.3346M6.0013 0.666992V11.3337V0.666992Z"
                                                                stroke="#3083DC" strokeWidth="1.3" strokeLinecap="round"
                                                                strokeLinejoin="round"/>
                                                        </svg>
                                                        <span>əlavə et</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-vertical-center">
                                        {
                                            showButton ?
                                                <Button className="btn-effect" onClick={() => sendGeneralUpdate()}>
                                                    Davam et
                                                </Button>
                                                :
                                                <Button className="btn-effect" onClick={() => sendGeneralData()}>
                                                    Davam et
                                                </Button>

                                        }
                                    </div>
                                </Form>
                            </div>
                        </Tab>
                        <Tab eventKey="knowledge" title="İxtisas bilikləri">
                            <div className="block">
                                <Form className="form-list">
                                    <div className="add-block">
                                        <div className="block-title">
                                            Kompüter bilikləri
                                        </div>
                                        <div className="block-inn">
                                            <div className="addition-content">
                                                {
                                                    skillProgramArr.map((item, index) =>
                                                        <div key={uid(item, index)}
                                                             className={index === 0 ? '' : 'add-item'}>
                                                            {
                                                                index === 0 ? null :
                                                                    <div className="add-item-top">
                                                                        <p className="m-0"> #{index + 1}. Digər </p>
                                                                        <Button
                                                                            className="btn-transparent btn-remove flex-center"
                                                                            onClick={() => {
                                                                                skillProgramArr.splice(index, 1);
                                                                                setSkillProgramArr([...skillProgramArr], skillProgramArr)
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
                                                                <Col xs={6}>
                                                                    <Form.Group className="form-group">
                                                                            <span
                                                                                className="input-title">Proqram adı</span>
                                                                        <Select
                                                                            placeholder="Bilik səviyyəsini seçin"
                                                                            onChange={(val) => {
                                                                                skillProgramArr[index].computerId = val.id;
                                                                                setSkillProgramArr([...skillProgramArr], skillProgramArr);
                                                                            }}
                                                                            isSearchable={computerSkill ? computerSkill.length > 5 ? true : false : false}
                                                                            options={computerSkill}
                                                                            getOptionLabel={(option) => (option.name)}
                                                                            styles={customStyles}/>
                                                                        <div className="validation-block flex-start">
                                                                            {
                                                                                errors['specialityKnowledge.computerKnowledgeSet[].computerId'] !== '' ?
                                                                                    <span
                                                                                        className="text-validation">{errors['generalInformation.computerKnowledgeSet[].computerId']}</span>
                                                                                    : null
                                                                            }
                                                                        </div>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={6}>
                                                                    <Form.Group className="form-group">
                                                                        <span
                                                                            className="input-title">Bilik səviyyəsi</span>
                                                                        <Select
                                                                            onChange={(val) => {
                                                                                skillProgramArr[index].level = val.value;
                                                                                setSkillProgramArr([...skillProgramArr], skillProgramArr);
                                                                            }}
                                                                            placeholder="Bilik səviyyəsini seçin"
                                                                            isSearchable={evaluationOptions ? evaluationOptions.length > 5 ? true : false : false}
                                                                            options={evaluationOptions}
                                                                            styles={customStyles}
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="flex-end">
                                                <button className="btn-color" onClick={() => addProgramSkill()}
                                                        type="button">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M0.667969 6.00033H11.3346M6.0013 0.666992V11.3337V0.666992Z"
                                                            stroke="#3083DC" strokeWidth="1.3" strokeLinecap="round"
                                                            strokeLinejoin="round"/>
                                                    </svg>
                                                    <span>əlavə et</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="add-block">
                                        <div className="block-title">
                                            Dil bilikləri
                                        </div>
                                        <div className="block-inn">
                                            <div className="addition-content">
                                                {
                                                    skillLanguageArr.map((item, index) =>
                                                        <div key={uid(item, index)}
                                                             className={index === 0 ? '' : 'add-item'}>
                                                            {
                                                                index === 0 ? null :
                                                                    <div className="add-item-top">
                                                                        <p className="m-0"> #{index + 1}. Digər </p>
                                                                        <Button
                                                                            className="btn-transparent btn-remove flex-center"
                                                                            onClick={() => {
                                                                                skillLanguageArr.splice(index, 1);
                                                                                setSkillLanguageArr([...skillLanguageArr], skillLanguageArr)
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
                                                                <Col xs={6}>
                                                                    <Form.Group className="form-group">
                                                                            <span
                                                                                className="input-title">Dil biliyi</span>
                                                                        <Select
                                                                            placeholder="Dil biliyini seçin"
                                                                            onChange={(val) => {
                                                                                skillLanguageArr[index].languageId = val.id;
                                                                                setSkillLanguageArr([...skillLanguageArr], skillLanguageArr);
                                                                            }}
                                                                            isSearchable={languageSkill ? languageSkill.length > 5 ? true : false : false}
                                                                            options={languageSkill}
                                                                            getOptionLabel={(option) => (option.name)}
                                                                            styles={customStyles}/>
                                                                        <div className="validation-block flex-start">
                                                                            {
                                                                                errors['specialityKnowledge.languageKnowledgeSet[].languageId'] !== '' ?
                                                                                    <span
                                                                                        className="text-validation">{errors['generalInformation.languageKnowledgeSet[].languageId']}</span>
                                                                                    : null
                                                                            }
                                                                        </div>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={6}>
                                                                    <Form.Group className="form-group">
                                                                        <span
                                                                            className="input-title">Bilik səviyyəsi</span>
                                                                        <Select
                                                                            onChange={(val) => {
                                                                                skillLanguageArr[index].level = val.value;
                                                                                setSkillLanguageArr([...skillLanguageArr], skillLanguageArr);
                                                                            }}
                                                                            placeholder="Bilik səviyyəsini seçin"
                                                                            isSearchable={evaluationOptions ? evaluationOptions.length > 5 ? true : false : false}
                                                                            options={evaluationOptions}
                                                                            styles={customStyles}
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="flex-end">
                                                <button className="btn-color" onClick={() => addLanguageSkill()}
                                                        type="button">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M0.667969 6.00033H11.3346M6.0013 0.666992V11.3337V0.666992Z"
                                                            stroke="#3083DC" strokeWidth="1.3" strokeLinecap="round"
                                                            strokeLinejoin="round"/>
                                                    </svg>
                                                    <span>əlavə et</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="add-block">
                                        <div className="block-title">
                                            Vəzifənin tələb etdiyi kompetensiyalar
                                        </div>
                                        <div className="block-inn">
                                            <div className="addition-content">
                                                {
                                                    skillArr.map((item, index) =>
                                                        <div key={uid(item, index)}
                                                             className={index === 0 ? '' : 'add-item'}>
                                                            {
                                                                index === 0 ? null :
                                                                    <div className="add-item-top">
                                                                        <p className="m-0"> #{index + 1}. Digər </p>
                                                                        <Button
                                                                            className="btn-transparent btn-remove flex-center"
                                                                            onClick={() => {
                                                                                skillArr.splice(index, 1);
                                                                                setSkillArr([...skillArr], skillArr)
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
                                                                <Col xs={6}>
                                                                    <Form.Group className="form-group">
                                                                        <span
                                                                            className="input-title">Kompetensiyalar</span>
                                                                        <Select
                                                                            placeholder="Kompetensiyaları seçin"
                                                                            onChange={(val) => {
                                                                                skillArr[index].requiredSkillId = val.id;
                                                                                setSkillArr([...skillArr], skillArr);
                                                                            }}
                                                                            isSearchable={skill ? skill.length > 5 ? true : false : false}
                                                                            options={skill}
                                                                            styles={customStyles}
                                                                            getOptionLabel={(option) => (option.name)}
                                                                        />
                                                                        <div className="validation-block flex-start">
                                                                            {
                                                                                errors['specialityKnowledge.requiredKnowledgeSet[].requiredSkillId'] !== '' ?
                                                                                    <span
                                                                                        className="text-validation">{errors['specialityKnowledge.requiredKnowledgeSet[].requiredSkillId']}</span>
                                                                                    : null
                                                                            }
                                                                        </div>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={6}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">Tələb olunan səviyyə</span>
                                                                        <Select
                                                                            onChange={(val) => {
                                                                                skillArr[index].level = val.value;
                                                                                setSkillArr([...skillArr], skillArr);
                                                                            }}
                                                                            isSearchable={evaluationOptions ? evaluationOptions.length > 5 ? true : false : false}
                                                                            placeholder="Səviyyəni seçin"
                                                                            options={evaluationOptions}
                                                                            styles={customStyles}
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    )
                                                }
                                                <div className="flex-end">
                                                    <button type="button" className="btn-color"
                                                            onClick={() => addSkill()}>
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M0.667969 6.00033H11.3346M6.0013 0.666992V11.3337V0.666992Z"
                                                                stroke="#3083DC" strokeWidth="1.3" strokeLinecap="round"
                                                                strokeLinejoin="round"/>
                                                        </svg>
                                                        <span>əlavə et</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        showButton ?
                                            <ul className="flex-vertical-center btn-block list-unstyled">
                                                <li>
                                                    <Button className="btn-transparent btn-previous" onClick={() => {
                                                        setKey('general')
                                                    }}>
                                                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15 6H1.5M5.5 1.5L1 6L5.5 10.5" stroke="#193651"
                                                                  strokeWidth="2" strokeLinecap="round"
                                                                  strokeLinejoin="round"/>
                                                        </svg>
                                                        Əvvələ qayıt
                                                    </Button>
                                                </li>
                                                <li>
                                                    <Button className="btn-effect" onClick={() => sendDataKnowledge()}>
                                                        Yadda saxla
                                                    </Button>
                                                </li>
                                            </ul>
                                            : null
                                    }
                                </Form>
                            </div>
                        </Tab>
                    </Tabs>
                </Container>
            </div>
            {
                loadingIndicator ? <Indicator/> : null

            }
        </Aux>

    );
}

export default CreateStaff
