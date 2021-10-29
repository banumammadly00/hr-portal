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
        {value: "NONE", label: "Heçbiri"},
        {value: 'BEST', label: 'Əla'},
        {value: 'MIDDLE', label: 'Orta'},
        {value: 'GOOD', label: 'Yaxşı'}
    ];

    const languageOptions = [
        {value: "English", label: "Ingilis dili"},
        {value: 'Russian', label: 'Rus dili'},
        {value: 'Turkish', label: 'Türk dili'},
    ];

    const programOptions = [
        {value: "MS Office", label: "MS Office"},
        {value: '1 C', label: '1 C'},
        {value: 'Caspel', label: 'Caspel'},
    ];

    const legalOptions = [
        {value: "Əmək məcəlləsi", label: "Əmək məcəlləsi"},
        {value: 'Mülki məcəllə', label: 'Mülki məcəllə'},
        {value: 'Dövlət satınalma qaydaları', label: 'Dövlət satınalma qaydaları'},
    ]

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
        {value: 'HARMLESS', label: 'Zərərli'},
        {value: 'HARMFUL', label: 'Zərərsiz'}
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

    const workPaidOptions = [
        {value: 1, label: '1'},
        {value: 2, label: '2'},
        {value: 3, label: '3'},
    ]

    const subWorkCalculateDegreeOptions = [
        {value: 'A', label: 'A'},
        {value: 'B', label: 'B'},
    ]

    const requireFileOptions = [
        {value: 'CERTIFICATE', label: 'Sertifikat'},
        {value: 'CARD', label: 'Vəsiqə'},
    ]

    const [selectedOption, setSelectedOption] = useState(null);

    const [institution, setInstitution] = useState([]);
    const [department, setDepartment] = useState([]);
    const [subDepartment, setSubDepartment] = useState([]);
    const [vacancy, setVacancy] = useState([]);
    const [salary, setSalary] = useState([]);
    const [familyJob, setFamilyJob] = useState([]);
    const [document, setDocument] = useState([]);
    const [skill, setSkill] = useState([]);
    const [positionFunctionArr, setPositionFunctionArr] = useState([" "]);
    const [employeePosition, setEmployeePosition] = useState([]);
    const [workAddress, setWorkAddress] = useState([]);
    const [obeyDepartment, setObeyDepartment] = useState('');
    const [additionalSalary, setAdditionalSalary] = useState('');
    const [vacancyCount, setVacancyCount] = useState('');
    const [areaExperience, setAreaExperience] = useState('');
    const [leaderExperience, setLeaderExperience] = useState('');
    const [height, setHeight] = useState('');
    const [skillArr, setSkillArr] = useState([{level: '', skill: ''}]);
    const [skillProgramArr, setSkillProgramArr] = useState([{level: '', skill: ''}]);
    const [skillLegalArr, setSkillLegalArr] = useState([{level: '', skill: ''}]);
    const [skillLanguageArr, setSkillLanguageArr] = useState([{level: '', skill: ''}]);
    const [showHeight, setShowHeight] = useState(false);
    const [key, setKey] = useState('home');

    const [loadingIndicator, setLoadingIndicator] = useState(false);

    const [errors, setErrors] = useState({
        departmentName: '',
        fullNameAndPosition: '',
        institutionName: '',
        jobFamily: '',
        subDepartmentName: '',
        vacancyCategory: '',
        vacancyCount: '',
        vacancyName: '',
        workCondition: '',
        workMode: '',
        workPlace: ''
    });

    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedSubDepartment, setSelectedSubDepartment] = useState(null);
    const [selectedEducationDegree, setSelectedEducationDegree] = useState(null);
    const [selectedWorkPaid, setSelectedWorkPaid] = useState(null);
    const [selectedSubWorkPaid, setSelectedSubWorkPaid] = useState(null);
    const [selectedSalary, setSelectedSalary] = useState(null);
    const [selectedWorkAddress, setSelectedWorkAddress] = useState(null);
    const [selectedRequiredFile, setSelectedRequiredFile] = useState(null);

    const [selectedWorkCondition, setSelectedWorkCondition] = useState(null);
    const [selectedWorkMode, setSelectedWorkMode] = useState(null);
    const [selectedVacancy, setSelectedVacancy] = useState(null);
    const [selectedVacancyCategory, setSelectedVacancyCategory] = useState(null);
    const [selectedEmployeePosition, setSelectedEmployeePosition] = useState(null);
    const [selectedEducationSpeciality, setSelectedEducationSpeciality] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedFamilyJob, setSelectedFamilyJob] = useState(null);
    const [selectedMilitaryAchieve, setSelectedMilitaryAchieve] = useState(null);
    const [selectedHealth, setSelectedHealth] = useState(null);

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

        indicatorsContainer: (provided) => ({
            ...provided,
            paddingRight: '8px'
        }),

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
            url: '/institution',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setInstitution(res.data.data)
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
            setDepartment(res.data.data);
        });
    }

    const getSubDepartment = (id) => {
        mainAxios({
            method: 'get',
            url: '/department/sub-department/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setSubDepartment(res.data.data);

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
            let arr = res.data.data;
            //arr.push({name: 'Digər'})
            setVacancy(arr);

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
            let arr = res.data.data;
            //arr.push({name: 'Digər'})
            setSalary(arr);

        });
    }

    const getFamilyJob = () => {
        mainAxios({
            method: 'get',
            url: '/job-family',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let arr = res.data.data;
            //arr.push({name: 'Digər'})
            setFamilyJob(arr);

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
            setSkill(res.data.data);
        });
    }

    const getEmployeePosition = () => {
        mainAxios({
            method: 'get',
            url: '/employee/fullname-position',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setEmployeePosition(res.data.data);

        });
    }

    const getWorkAddress = () => {
        mainAxios({
            method: 'get',
            url: '/position/work-address',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setWorkAddress(res.data.data);
            getPositionInfo(res.data.data);

        });
    }

    const getHeight = (val) => {
        val.value === 1 ? setShowHeight(true) : setShowHeight(false)
    }

    const addSkill = () => {
        setSkillArr([...skillArr, {level: '', skill: ''}])
    }

    const addProgramSkill = () => {
        setSkillProgramArr([...skillProgramArr, {level: '', name: ''}])
    }

    const addLegalSkill = () => {
        setSkillLegalArr([...skillLegalArr, {level: '', name: ''}])
    }

    const addLanguageSkill = () => {
        setSkillLanguageArr([...skillLanguageArr, {level: '', name: ''}])
    }

    const addPositionFunction = () => {
        setPositionFunctionArr(positionFunctionArr => [...positionFunctionArr, " "])
    }

    const setPositionFunction = (val, index) => {
        positionFunctionArr[index] = val;
        setPositionFunctionArr([...positionFunctionArr], positionFunctionArr)
    }

    const getPositionInfo = (arr) => {
        mainAxios({
            method: 'get',
            url: '/position/general-info/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let data = res.data.data;
            setSelectedInstitution({name: data.institutionName});
            setSelectedDepartment({name: data.departmentName});
            setSelectedSubDepartment({name: data.subDepartmentName});
            setObeyDepartment(data.obeyDepartmentName);
            setSelectedVacancy({name: data.vacancyName});
            setVacancyCount(data.vacancyCount);
            setSelectedSalary({name: data.salary});
            setAdditionalSalary(data.additionalSalary);
            setSelectedFamilyJob({name: data.jobFamily});
            setSelectedEmployeePosition({key: data.fullNameAndPosition});
            setLeaderExperience(data.leaderExperience);
            setAreaExperience(data.areaExperience);
            setSelectedEducationSpeciality(data.educationSpeciality);
            setSelectedRequiredFile({label: data.requireFile})
            setHeight(data.height)
            data.height > 0 ?
                setSelectedOption({value: 1, label: 'Bəli'}) :
                setSelectedOption({value: 0, label: 'Xeyr'});
            data.height > 0 ? setShowHeight(true) : setShowHeight(false);
            getSubDepartment(data.departmentName)

            for (let i of arr) {
                if (data.workPlace === i.key) {
                    setSelectedWorkAddress(i)
                }
            }

            for (let i of options) {
                if (data.militaryAchieve === i.value)
                    setSelectedMilitaryAchieve(i);
            }

            for (let i of options) {
                if (data.healthy === i.value)
                    setSelectedHealth(i);
            }

            for (let i of genderOptions) {
                if (data.genderDemand === i.label)
                    setSelectedGender(i);
            }

            for (let i of educationDegreeOptions) {
                if (i.label === data.educationDegree)
                    setSelectedEducationDegree(i);
            }

            for (let i of subWorkCalculateDegreeOptions) {
                if (i.label === data.subWorkCalculateDegree) {
                    setSelectedSubWorkPaid(i)
                }
            }

            for (let i of workPaidOptions) {
                if (i.label === data.workCalculateDegree) {
                    setSelectedWorkPaid(i)
                }
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
                if (i.label === data.vacancyCategory) {
                    setSelectedVacancyCategory(i)
                }
            }

            let tmpSkills = [];
            for (let i of data.skills) {
                let obj = {};
                obj.skill = {key: i.skill, value: 'GOOD'};
                for (let j of evaluationOptions) {
                    if (j.label === i.level)
                        obj.level = j;
                }
                tmpSkills.push(obj)
            }
            if (tmpSkills.length > 0)
                setSkillArr(tmpSkills);

            setPositionFunctionArr(data.functionalities);
        });
    }

    const getKnowledgeInfo = () => {
        mainAxios({
            method: 'get',
            url: '/position/knowledge/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let data = res.data.data;
            let tmpProgramSkills = [];
            for (let i of data.computerKnowledge) {
                let obj = {};
                obj.name = {value: i.name, label: i.name}
                for (let j of evaluationOptions) {
                    if (i.level === j.label) {
                        obj.level = j
                    }
                }
                tmpProgramSkills.push(obj);
            }

            if (tmpProgramSkills.length > 0)
                setSkillProgramArr(tmpProgramSkills)

            let tmpLegalSkills = [];
            for (let i of data.legislationStatements) {
                let obj = {};
                obj.name = {value: i.name, label: i.name}
                for (let j of evaluationOptions) {
                    if (i.level === j.label) {
                        obj.level = j
                    }
                }
                tmpLegalSkills.push(obj);
            }
            if (tmpLegalSkills.length > 0)
                setSkillLegalArr(tmpLegalSkills);

            let tmpLanguageSkills = [];
            for (let i of data.languageKnowledge) {
                let obj = {};
                obj.name = {value: i.name, label: i.name}
                for (let j of evaluationOptions) {
                    if (i.level === j.label) {
                        obj.level = j
                    }
                }
                tmpLanguageSkills.push(obj);
            }
            if (tmpLanguageSkills.length > 0)
                setSkillLanguageArr(tmpLanguageSkills);
        });
    }


    const sendData = () => {
        setLoadingIndicator(true);
        let arr = []
        for (let i of skillArr) {
            let obj = {skill: i.skill.key, level: i.level.value}
            arr.push(obj)
        }

        let data = {
            "additionalSalary": parseFloat(additionalSalary),
            "areaExperience": parseFloat(areaExperience),
            "departmentName": selectedDepartment !== null ? selectedDepartment.name : "",
            "educationDegree": selectedEducationDegree !== null ? selectedEducationDegree.value : "",
            "educationSpeciality": selectedEducationSpeciality,
            "fullNameAndPosition": selectedEmployeePosition !== null ? selectedEmployeePosition.key : "",
            "functionalities": positionFunctionArr,
            "genderDemand": selectedGender !== null ? selectedGender.value : "",
            "healthy": selectedHealth !== null ? selectedHealth.value : "",
            "height": parseFloat(height),
            "institutionName": selectedInstitution !== null ? selectedInstitution.name : "",
            "jobFamily": selectedFamilyJob !== null ? selectedFamilyJob.name : "",
            "leaderExperience": parseFloat(leaderExperience),
            "militaryAchieve": selectedMilitaryAchieve !== null ? selectedMilitaryAchieve.value : "",
            "obeyDepartmentName": obeyDepartment,
            "requireFile": selectedRequiredFile !== null ? selectedRequiredFile.value : "",
            "salary": selectedSalary !== null ? selectedSalary.name : "",
            "skills": arr,
            "subDepartmentName": selectedSubDepartment !== null ? selectedSubDepartment.name : "",
            "subWorkCalculateDegree": selectedSubWorkPaid !== null ? selectedSubWorkPaid.value : "",
            "vacancyCategory": selectedVacancyCategory !== null ? selectedVacancyCategory.value : "",
            "vacancyCount": parseFloat(vacancyCount),
            "vacancyName": selectedVacancy !== null ? selectedVacancy.name : "",
            "workCalculateDegree": selectedWorkPaid !== null ? selectedWorkPaid.value : "",
            "workCondition": selectedWorkCondition !== null ? selectedWorkCondition.value : "",
            "workMode": selectedWorkMode !== null ? selectedWorkMode.value : "",
            "workPlace": selectedWorkAddress !== null ? parseFloat(selectedWorkAddress.value) : ""
        }

        mainAxios({
            method: 'put',
            url: '/position/general-info/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            setLoadingIndicator(false);
        }).catch((error) => {
            setLoadingIndicator(false);
            Swal.fire({
                icon: 'error',
                text: 'Məlumatlar qeyd edilmədi!',
                cancelButtonText: 'Bağla',
                showCancelButton: true,
                showConfirmButton: false,
            })
            if (error.response.data.message)
                setErrors(error.response.data.message);
        });
    }

    const sendDataKnowledge = () => {
        setLoadingIndicator(true);
        let arrProgram = []
        for (let i of skillProgramArr) {
            let obj = {name: i.name.value, level: i.level.value}
            arrProgram.push(obj)
        }

        let arrLegal = []
        for (let i of skillLegalArr) {
            let obj = {name: i.name.value, level: i.level.value}
            arrLegal.push(obj)
        }

        let arrLanguage = []
        for (let i of skillLanguageArr) {
            let obj = {name: i.name.value, level: i.level.value}
            arrLanguage.push(obj)
        }

        let data = {
            "computerKnowledge": arrProgram,
            "languageKnowledge": arrLegal,
            "legislationStatements": arrLanguage
        }

        mainAxios({
            method: 'put',
            url: '/position/knowledge/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            data: data
        }).then((res) => {
            setLoadingIndicator(false);
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

    const getDocument = (page) => {
        mainAxios({
            method: 'get',
            url: '/position/document/' + id,
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
            setDocument(res.data.data.data);
            setTotalRecord(res.data.data.totalElement);
        });
    }

    useEffect(() => {
        getInstitution();
        getDepartment();
        getVacancy();
        getSalary();
        getFamilyJob();
        getSkill();
        getEmployeePosition();
        getWorkAddress();
        getKnowledgeInfo();
        getDocument(1)
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
                        <Tab eventKey="home" title="Ümumi məlumatlar">
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
                                                            options={institution}
                                                            getOptionLabel={(option) => (option.name)}
                                                            getOptionValue={(option) => option.name}
                                                            styles={customStyles}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors.institutionName !== '' ?
                                                                    <span
                                                                        className="text-validation">{errors.institutionName}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">Struktur vahidinin adı *</span>
                                                        <Select
                                                            placeholder="Struktur vahidinin adını seçin"
                                                            value={selectedDepartment}
                                                            onChange={(val) => {
                                                                setSelectedDepartment(val);
                                                                getSubDepartment(val.name);
                                                            }}
                                                            options={department}
                                                            getOptionLabel={(option) => (option.name)}
                                                            styles={customStyles}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors.departmentName !== '' ?
                                                                    <span className="text-validation">{errors.departmentName}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                                    <span
                                                                        className="input-title">Struktur bölmənin adı</span>
                                                        <Select
                                                            placeholder="Struktur bölmənin adını seçin"
                                                            value={selectedSubDepartment}
                                                            onChange={(val) => {
                                                                setSelectedSubDepartment(val);
                                                            }}
                                                            options={subDepartment}
                                                            getOptionLabel={(option) => (option.name)}
                                                            styles={customStyles}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors.subDepartmentName !== '' ?
                                                                    <span className="text-validation">{errors.subDepartmentName}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">Tabe struktur bölmənin adı *</span>
                                                        <Form.Label>
                                                            <Form.Control
                                                                placeholder="Tabe struktur bölmənin adını daxil edin"
                                                                value={obeyDepartment}
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
                                                            options={vacancy}
                                                            styles={customStyles}
                                                            getOptionLabel={(option) => (option.name)}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors.vacancyName !== '' ?
                                                                    <span className="text-validation">{errors.departmentName}</span>
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
                                                                          value={vacancyCount} onChange={(e => {
                                                                setVacancyCount(e.target.value);
                                                            })}/>
                                                        </Form.Label>
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors.vacancyCount !== '' ?
                                                                    <span className="text-validation">{errors.vacancyCount}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">Əməyin ödənilməsi dərəcəsi</span>
                                                        <Select
                                                            placeholder="Əməyin ödənilməsi dərəcəsini seçin"
                                                            value={selectedWorkPaid}
                                                            onChange={(val) => {
                                                                setSelectedWorkPaid(val)
                                                            }}
                                                            options={workPaidOptions}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span
                                                            className="input-title">Əməyin ödənilməsi üzrə alt dərəcə</span>
                                                        <Select
                                                            placeholder="Əməyin ödənilməsi üzrə alt dərəcəni seçin"
                                                            value={selectedSubWorkPaid}
                                                            onChange={setSelectedSubWorkPaid}
                                                            options={subWorkCalculateDegreeOptions}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">Ştat üzrə əsas əmək haqqı *</span>
                                                        <Select
                                                            placeholder="Əmək haqqını seçin"
                                                            value={selectedSalary}
                                                            onChange={(val) => {
                                                                setSelectedSalary(val)
                                                            }}
                                                            options={salary}
                                                            styles={customStyles}
                                                            getOptionLabel={(option) => (option.name)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Əmək şəraiti *</span>
                                                        <Select
                                                            placeholder="Əmək şəraitini seçin"
                                                            value={selectedWorkCondition}
                                                            onChange={setSelectedWorkCondition}
                                                            options={workConditionOptions}
                                                            styles={customStyles}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors.workCondition !== '' ?
                                                                    <span className="text-validation">{errors.workCondition}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Ştat üzrə əmək şəraitinə görə əlavə əmək haqqı</span>
                                                        <Form.Label>
                                                            <Form.Control type="number"
                                                                          placeholder="Əlavə əmək haqqını"
                                                                          value={additionalSalary}
                                                                          onChange={(e) => setAdditionalSalary(e.target.value)}/>
                                                        </Form.Label>
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
                                                            options={WorkModeOptions}
                                                            styles={customStyles}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors.workMode !== '' ?
                                                                    <span className="text-validation">{errors.workMode}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                            <span
                                                                className="input-title">Ştat vahidinin kateqoriyası *</span>
                                                        <Select
                                                            placeholder="Kateqoriyanı seçin"
                                                            value={selectedVacancyCategory}
                                                            onChange={(val) => {
                                                                setSelectedVacancyCategory(val)
                                                            }}
                                                            options={vacancyCategoryOptions}
                                                            styles={customStyles}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors.vacancyCategory !== '' ?
                                                                    <span className="text-validation">{errors.vacancyCategory}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">İş ailəsi *</span>
                                                        <Select
                                                            placeholder="İş ailəsini seçin"
                                                            value={selectedFamilyJob}
                                                            onChange={(val) => {
                                                                setSelectedFamilyJob(val);
                                                            }}
                                                            options={familyJob}
                                                            styles={customStyles}
                                                            getOptionLabel={(option) => (option.name)}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors.jobFamily !== '' ?
                                                                    <span className="text-validation">{errors.jobFamily}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">İş yerinin ünvanı *</span>
                                                        <Select
                                                            placeholder="İş yerinin ünvanını seçin"
                                                            value={selectedWorkAddress}
                                                            onChange={setSelectedWorkAddress}
                                                            options={workAddress}
                                                            styles={customStyles}
                                                            getOptionLabel={(option) => (option.key)}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors.workPlace !== '' ?
                                                                    <span className="text-validation">{errors.workPlace}</span>
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
                                                            value={selectedEmployeePosition}
                                                            onChange={setSelectedEmployeePosition}
                                                            options={employeePosition}
                                                            styles={customStyles}
                                                            getOptionLabel={(option) => (option.key)}
                                                        />
                                                        <div className="validation-block flex-start">
                                                            {
                                                                errors.fullNameAndPosition !== '' ?
                                                                    <span className="text-validation">{errors.fullNameAndPosition}</span>
                                                                    : null
                                                            }
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
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
                                                                        <span className="input-title">Vəzifənin tələb etdiyi kompetensiyalar</span>
                                                                        <Select
                                                                            placeholder="Kompetensiyaları seçin"
                                                                            value={item.skill}
                                                                            onChange={(val) => {
                                                                                skillArr[index].skill = val;
                                                                                setSkillArr([...skillArr], skillArr)
                                                                            }}
                                                                            options={skill}
                                                                            styles={customStyles}
                                                                            getOptionLabel={(option) => (option.key)}
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xs={6}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">Tələb olunan səviyyə</span>
                                                                        <Select
                                                                            value={item.level}
                                                                            onChange={(val) => {
                                                                                skillArr[index].level = val;
                                                                                setSkillArr([...skillArr], skillArr)
                                                                            }}
                                                                            placeholder="Səviyyəni seçin"
                                                                            options={evaluationOptions}
                                                                            styles={customStyles}
                                                                            getOptionLabel={(option) => (option.label)}
                                                                        />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    )
                                                }
                                                <div className="flex-end">
                                                    <button className="btn-color" onClick={() => addSkill()}>
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
                                                                          value={leaderExperience}
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
                                                                          value={areaExperience}
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
                                                            options={educationDegreeOptions}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Təhsil ixtisası</span>
                                                        <Form.Label>
                                                            <Form.Control type="text"
                                                                          placeholder="Təhsil ixtisasını edin"
                                                                          value={selectedEducationSpeciality}
                                                                          onChange={(e) => setSelectedEducationSpeciality(e.target.value)}/>
                                                        </Form.Label>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={4}>
                                                    <Form.Group className="form-group">
                                                        <span className="input-title">Sertifikat tələbi</span>
                                                        <Select
                                                            placeholder="Sertifikat tələbini seçin"
                                                            value={selectedRequiredFile}
                                                            onChange={setSelectedRequiredFile}
                                                            options={requireFileOptions}
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
                                                                                  value={height}
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
                                                            options={genderOptions}
                                                            styles={customStyles}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <div className="addition-content">
                                                {
                                                    positionFunctionArr.map((item, index) =>
                                                        <div key={index}
                                                             className={index === 0 ? '' : 'add-item'}>
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
                                                            <Row key={index}>
                                                                <Col xs={12}>
                                                                    <Form.Group className="form-group">
                                                                        <span className="input-title">Vəzifə funksiyaları *</span>
                                                                        <Form.Label>
                                                                            <Form.Control as="textarea"
                                                                                          value={item}
                                                                                          onChange={(e) => {
                                                                                              let val = e.target.value;
                                                                                              setPositionFunction(val, index)
                                                                                          }}
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
                        <Tab eventKey="profile" title="İxtisas bilikləri">
                            <div className="block">
                                <Form className="form-list">
                                    <div className="add-block">
                                        <div className="block-title">
                                            Vəzifənin tələb etdiyi Kompüter bilikləri
                                        </div>
                                        <div className="block-inn">
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
                                                        <Row key={index}>
                                                            <Col xs={6}>
                                                                <Form.Group className="form-group">
                                                                    <span className="input-title">Proqram adı</span>
                                                                    <Select
                                                                        value={item.name}
                                                                        placeholder="Proqram adı seçin"
                                                                        onChange={(val) => {
                                                                            skillProgramArr[index].name = val;
                                                                            setSkillProgramArr([...skillProgramArr], skillProgramArr)
                                                                        }}
                                                                        options={programOptions}
                                                                        getOptionLabel={(option) => (option.label)}
                                                                        styles={customStyles}/>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xs={6}>
                                                                <Form.Group className="form-group">
                                                                    <span className="input-title">Bilik səviyyəsi</span>
                                                                    <Select
                                                                        value={item.level}
                                                                        onChange={(val) => {
                                                                            skillProgramArr[index].level = val;
                                                                            setSkillProgramArr([...skillProgramArr], skillProgramArr)
                                                                        }}
                                                                        placeholder="Bilik səviyyəsini seçin"
                                                                        options={evaluationOptions}
                                                                        getOptionLabel={(option) => (option.label)}
                                                                        styles={customStyles}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                )
                                            }
                                            <div className="flex-end">
                                                <button className="btn-color" type="button"
                                                        onClick={() => addProgramSkill()}>
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
                                        <div className="block-inn">
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
                                                                        value={item.name}
                                                                        onChange={(val) => {
                                                                            skillLegalArr[index].name = val;
                                                                            setSkillLegalArr([...skillLegalArr], skillLegalArr)
                                                                        }}
                                                                        placeholder="Qanunvericilik aktlarını seçin"
                                                                        options={legalOptions}
                                                                        getOptionLabel={(option) => (option.label)}
                                                                        styles={customStyles}/>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xs={6}>
                                                                <Form.Group className="form-group">
                                                                    <span className="input-title">Bilik səviyyəsi</span>
                                                                    <Select
                                                                        value={item.level}
                                                                        onChange={(val) => {
                                                                            skillLegalArr[index].level = val;
                                                                            setSkillLegalArr([...skillLegalArr], skillLegalArr)
                                                                        }}
                                                                        placeholder="Bilik səviyyəsini seçin"
                                                                        options={evaluationOptions}
                                                                        getOptionLabel={(option) => (option.label)}
                                                                        styles={customStyles}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                )
                                            }
                                            <div className="flex-end">
                                                <button className="btn-color" type="button"
                                                        onClick={() => addLegalSkill()}>
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
                                        <div className="block-inn">
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
                                                                    <span className="input-title">Dil biliyi</span>
                                                                    <Select
                                                                        placeholder="Dil biliyini seçin"
                                                                        value={item.name}
                                                                        onChange={(val) => {
                                                                            skillLanguageArr[index].name = val;
                                                                            setSkillLanguageArr([...skillLanguageArr], skillLanguageArr)
                                                                        }}
                                                                        options={languageOptions}
                                                                        getOptionLabel={(option) => (option.label)}
                                                                        styles={customStyles}/>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col xs={6}>
                                                                <Form.Group className="form-group">
                                                                    <span className="input-title">Bilik səviyyəsi</span>
                                                                    <Select
                                                                        value={item.level}
                                                                        onChange={(val) => {
                                                                            skillLanguageArr[index].level = val;
                                                                            setSkillLanguageArr([...skillLanguageArr], skillLanguageArr)
                                                                        }}
                                                                        placeholder="Bilik səviyyəsini seçin"
                                                                        options={evaluationOptions}
                                                                        getOptionLabel={(option) => (option.label)}
                                                                        styles={customStyles}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                )
                                            }
                                            <div className="flex-end">
                                                <button className="btn-color" type="button"
                                                        onClick={() => addLanguageSkill()}>
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
                                    <div className="flex-vertical-center">
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
                                        document ?
                                            document.map((item, index) =>
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
                            <Paginate count={totalRecord} recordSize = {recordSize} currentPage={currentPage} click={(page) => getDocument(page)}/>
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
