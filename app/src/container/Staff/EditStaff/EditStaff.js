import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Button, Container, Row, Col, Form, Tabs, Tab, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import {mainAxios} from "../../../components/Axios/axios";
import {useRouteMatch} from 'react-router-dom';
import {uid} from "react-uid";
import Indicator from "../../../components/Loading/Indicator";
import Paginate from "../../../components/Pagination/Pagination";
import Swal from "sweetalert2";

const statuses = {
    'Təsdiq gözləyir': 'pending',
    'Təsdiqlənib': 'confirmed',
    'Ləğv edildi': 'cancelled',
    'Hesablandı': 'calculated'
};

function EditStaff() {
    const {params: {id}} = useRouteMatch('/staff/edit/:id');

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
    const [loadingIndicator, setLoadingIndicator] = useState(false);
    const [errors, setErrors] = useState({});

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
    const [workConditionPer, setWorkConditionPer] = useState('')
    /*checked*/
    const [showHeight, setShowHeight] = useState(false);
    const [showCondition, setCondition] = useState(false)

    /*-----------Knowledge------------*/
    const [skillProgramArr, setSkillProgramArr] = useState([{computerId: null, level: null}]);
    const [skillLegalArr, setSkillLegalArr] = useState([{legislationId: null, level: null}]);
    const [skillLanguageArr, setSkillLanguageArr] = useState([{languageId: null, level: null}]);

    const [selectedEmployeePosition, setSelectedEmployeePosition] = useState(null);

    const [operation, setOperation] = useState([])
    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordSize, setRecordSize] = useState(15)

    const customStyles = {
        option: (provided) => ({
            ...provided,
            color: '#040647',
            //backgroundColor: state.isSelected ? '#F3F8FF' : 'transparent',
            padding: '10px 16px',
            margin: '0',
            fontSize: '16px',
            "&:first-of-type": {
                borderRadius: '2px 2px 0 0',
            },
            /*"&:hover": {
                backgroundColor: '#FAFCFF',
            },*/
            "&:last-child": {
                borderBottom: 'none',
                borderRadius: '0 0 2px 2px',
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'relative'

        }),

        valueContainer: (provided) => ({
            ...provided,
            padding: '2px 8px 2px 16px'
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

    const getPositionInfo = () => {
        mainAxios({
            method: 'get',
            url: '/vacancies/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let data = res.data.generalInformation;
            if (data !== null) {
                setVacancyCount(data.count);
                let leaderData = data.experience
                if (leaderData !== null) {
                    setLeaderExperience(leaderData.leader);
                    setAreaExperience(leaderData.area);
                }

                let gradeData = data.gradeRange
                if (gradeData !== null) {
                    setSelectedMaxGrade({id: gradeData.max, grade: gradeData.max});
                    setSelectedMinGrade({id: gradeData.min, grade: gradeData.min});
                }
                data.workCondition !== 'Zərərsiz' ? setCondition(true) : setCondition(false);
                setPositionFunctionArr(data.functionalities);
                setSelectedInstitution(data.workInstitution);
                setWorkConditionPer(data.conditionalAdditionPercentage);
                setSelectedFamilyJob(data.jobFamily);
                setSelectedDepartment(data.department);
                setObeyDepartment(data.subordinateDepartment);
                setSelectedVacancy(data.position);
                setSelectedSubDepartment(data.subDepartment);
                setSelectedEmployeePosition(data.curator);
                setSelectedSpeciality(data.speciality)
                setHeight(data.height)
                data.height > 0 ? setShowHeight(true) : setShowHeight(false);

                for (let i of options) {
                    if (data.militaryRequire == i.value)
                        setSelectedMilitaryAchieve(i);
                }
                for (let i of options) {
                    if (data.requireCertificate == i.value)
                        setSelectedRequiredFile(i);
                }

                let heightVal = data.height > 0 ? 1 : 0

                for (let i of options) {
                    if (heightVal == i.value) {
                        setSelectedOption(i)
                    }
                }


                for (let i of genderOptions) {
                    if (data.gender === i.label)
                        setSelectedGender(i);
                }

                for (let i of options) {
                    if (data.healthy == i.value)
                        setSelectedHealth(i);
                }

                for (let i of workConditionOptions) {
                    if (i.label === data.workCondition) {
                        setSelectedWorkCondition(i)
                    }
                }

                for (let i of WorkModeOptions) {
                    if (i.label === data.workMode) {
                        setSelectedWorkMode(i)
                    }
                }

                for (let i of vacancyCategoryOptions) {
                    if (i.label === data.positionCategory) {
                        setSelectedVacancyCategory(i)
                    }
                }

                for (let i of educationDegreeOptions) {
                    if (i.label === data.educationStatus)
                        setSelectedEducationDegree(i);
                }
                for (let i of workPlaceOptions) {
                    if (data.workPlace === i.label) {
                        setSelectedWorkAddress(i)
                    }
                }

                let tmpLegislationSkills = [];
                for (let i of data.legislationStatementSet) {
                    let obj = {};
                    obj.legislationId = i.legislation
                    for (let j of evaluationOptions) {
                        if (i.level === j.label) {
                            obj.level = j
                        }
                    }
                    tmpLegislationSkills.push(obj);
                }
                if (tmpLegislationSkills.length > 0)
                    setSkillLegalArr(tmpLegislationSkills);
            }

            let knowledgeData = res.data.specialityKnowledge

            if (knowledgeData !== null) {
                let tmpLanguageSkills = [];
                for (let i of knowledgeData.languageKnowledgeSet) {
                    let obj = {};
                    obj.languageId = i.language
                    for (let j of evaluationOptions) {
                        if (i.level === j.label) {
                            obj.level = j
                        }
                    }
                    tmpLanguageSkills.push(obj);
                }
                if (tmpLanguageSkills.length > 0)
                    setSkillLanguageArr(tmpLanguageSkills);

                let tmpSkills = [];
                for (let i of knowledgeData.requiredKnowledgeSet) {
                    let obj = {};
                    obj.requiredSkillId = i.requiredSkill;
                    for (let j of evaluationOptions) {
                        if (j.label === i.level)
                            obj.level = j;
                    }
                    tmpSkills.push(obj)
                }
                if (tmpSkills.length > 0)
                    setSkillArr(tmpSkills);

                let tmpProgramSkills = [];
                for (let i of knowledgeData.computerKnowledgeSet) {
                    let obj = {};
                    obj.computerId = i.computer
                    for (let j of evaluationOptions) {
                        if (i.level === j.label) {
                            obj.level = j
                        }
                    }
                    tmpProgramSkills.push(obj);
                }

                if (tmpProgramSkills.length > 0)
                    setSkillProgramArr(tmpProgramSkills)
            }

        });
    }

    const sendData = () => {
        //setLoadingIndicator(true);
        let checkLegalArr = 0

        for(let i of skillLegalArr) {
            if(skillLegalArr.length === 1 && i.legislationId === null) {
                checkLegalArr = 1
            }
        }

        let sArr = [];
        for (let i in skillLegalArr) {
            sArr.push(skillLegalArr[i]);
            if (sArr[i].legislationId != null) {
                sArr[i].legislationId = sArr[i].legislationId.id
            }

            if (sArr[i].level != null) {
                sArr[i].level = sArr[i].level.value
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
                    "max": selectedMinGrade !== null ? selectedMinGrade.grade : null,
                    "min": selectedMaxGrade !== null ? selectedMaxGrade.grade : null
                },
                "healthy": selectedHealth !== null ? selectedHealth.value : null,
                "height": parseFloat(height),
                "institutionId": selectedInstitution !== null ? selectedInstitution.id : null,
                "militaryRequire": selectedMilitaryAchieve !== null ? selectedMilitaryAchieve.value : null,
                "positionCategory": selectedVacancyCategory !== null ? selectedVacancyCategory.value : null,
                "positionId": selectedVacancy !== null ? selectedVacancy.id : null,
                "legislationStatementSet": checkLegalArr ? [] : sArr,
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
            url: '/vacancies/' + id,
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
        for (let i of skillProgramArr) {
            if (i.computerId != null) {
                i.computerId = i.computerId.id
            } else {
                i.computerId = null
            }

            if (i.level != null) {
                i.level = i.level.value
            } else {
                i.level = null
            }
        }

        for (let i of skillLanguageArr) {
            if (i.languageId != null) {
                i.languageId = i.languageId.id
            } else {
                i.languageId = null
            }

            if (i.level != null) {
                i.level = i.level.value
            } else {
                i.level = null
            }
        }

        for (let i of skillArr) {
            if (i.requiredSkillId != null) {
                i.requiredSkillId = i.requiredSkillId.id
            } else {
                i.requiredSkillId = null
            }

            if (i.level != null) {
                i.level = i.level.value
            } else {
                i.level = null
            }
        }

        let data = {
            "specialityKnowledge": {
                "requiredKnowledgeSet": skillArr,
                "computerKnowledgeSet": skillProgramArr,
                "languageKnowledgeSet": skillLanguageArr,
            }
        }

        mainAxios({
            method: 'put',
            url: '/vacancies/' + id,
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

    const getOperation = (page) => {
        mainAxios({
            method: 'get',
            url: `/vacancies/${id}/operations`,
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
            setOperation(res.data.content);
            setTotalRecord(res.data.totalElement);
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
        getPositionInfo();
        getOperation(1);
    }, []);

    return (
        <Aux>
            <div className="create-staff">
                <Container fluid>
                    <div className="title-block flex">
                        <div className="title flex-center">
                            <Link to={`/staff/view/${id}`} className="flex">
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
                                                                errors.hasOwnProperty('generalInformation.institutionI') && errors['generalInformation.institutionId'] !== '' ?
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
                                                                value={obeyDepartment || ''}
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
                                                                          value={vacancyCount || ''}
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
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Əmək şəraiti *</span>
                                                        <Select
                                                            placeholder="Əmək şəraitini seçin"
                                                            value={selectedWorkCondition}
                                                            onChange={(val) => {
                                                                let value = val.value;
                                                                setSelectedWorkCondition(val);
                                                                value !== 'HARMLESS' ? setCondition(true) : setCondition(false)
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

                                                <Col xs={4}>
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

                                                <Col xs={4}>
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
                                                {
                                                    showCondition ?
                                                        <Col xs={12}>
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
                                                        : null
                                                }
                                                <Col xs={4}>
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
                                                <Col xs={4}>
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
                                                <Col xs={4}>
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
                                                        <span className="input-title">Max dərəcə </span>
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
                                            <div className="add-block">
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
                                                                                <p className="m-0"> #{index + 1}.
                                                                                    Digər </p>
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
                                                                                <span className="input-title">Qanunvericilik aktları</span>
                                                                                <Select
                                                                                    value={item.legislationId}
                                                                                    onChange={(val) => {
                                                                                        skillLegalArr[index].legislationId = val;
                                                                                        setSkillLegalArr([...skillLegalArr], skillLegalArr);
                                                                                    }}
                                                                                    placeholder="Qanunvericilik aktlarını seçin"
                                                                                    isSearchable={legislationSkill ? legislationSkill.length > 5 ? true : false : false}
                                                                                    options={legislationSkill}
                                                                                    getOptionLabel={(option) => (option.name)}
                                                                                    styles={customStyles}/>
                                                                             {/*   <div className="validation-block flex-start">
                                                                                    {
                                                                                        errors['generalInformation.legislationStatementSet[].legislationId'] !== '' ?
                                                                                            <span className="text-validation">
                                                                                                {errors['generalInformation.legislationStatementSet[].legislationId']}
                                                                                            </span>
                                                                                            : null
                                                                                    }
                                                                                </div>*/}
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col xs={6}>
                                                                            <Form.Group className="form-group">
                                                                        <span
                                                                            className="input-title">Bilik səviyyəsi</span>
                                                                                <Select
                                                                                    value={item.level}
                                                                                    onChange={(val) => {
                                                                                        skillLegalArr[index].level = val;
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
                                                                    stroke="#3083DC" strokeWidth="1.3"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"/>
                                                            </svg>
                                                            <span>əlavə et</span>
                                                        </button>
                                                    </div>
                                                </div>
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
                                                                          value={leaderExperience || ''}
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
                                                                          value={areaExperience || ''}
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
                                                                                  value={height || ''}
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
                                        <Button className="btn-effect" onClick={() => sendData()}>
                                            Yadda saxla
                                        </Button>
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
                                                                            value={item.computerId}
                                                                            onChange={(val) => {
                                                                                skillProgramArr[index].computerId = val;
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
                                                                            value={item.level}
                                                                            onChange={(val) => {
                                                                                skillProgramArr[index].level = val;
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
                                                                            value={item.languageId}
                                                                            onChange={(val) => {
                                                                                skillLanguageArr[index].languageId = val;
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
                                                                            value={item.level}
                                                                            onChange={(val) => {
                                                                                skillLanguageArr[index].level = val;
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
                                                                            value={item.requiredSkillId}
                                                                            onChange={(val) => {
                                                                                skillArr[index].requiredSkillId = val;
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
                                                                            value={item.level}
                                                                            onChange={(val) => {
                                                                                skillArr[index].level = val;
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
                                    <div className="flex-vertical-center btn-block">
                                        <Button className="btn-effect" onClick={() => sendDataKnowledge()}>
                                            Yadda saxla
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </Tab>
                        <Tab eventKey="operation" title="Əmrlər">
                            <div className="block">
                                <Table responsive="sm" hover>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Əmr</th>
                                        <th>Tarix</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        operation ?
                                            operation.map((item, index) =>
                                                <tr key={index}>
                                                    <td>{item.id}</td>
                                                    <td>{item.documentType}</td>
                                                    <td>{item.createDate}</td>
                                                    <td>
                                                        <div className="flex">
                                                             <span className={statuses[item.status]}>
                                                                 {item.status}
                                                             </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                            : null
                                    }
                                    </tbody>
                                </Table>
                            </div>
                            <Paginate count={totalRecord} recordSize={recordSize} currentPage={currentPage}
                                      click={(page) => getOperation(page)}/>
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

export default EditStaff
