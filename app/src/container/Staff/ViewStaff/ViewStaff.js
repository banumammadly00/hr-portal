import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Container, Tabs, Tab, Table, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {Link, useLocation, useParams, useRouteMatch} from 'react-router-dom';
import {mainAxios} from "../../../components/Axios/axios";
import Paginate from "../../../components/Pagination/Pagination";
import Swal from "sweetalert2";
import EmptyData from "../../../components/EmptyData/EmptyData";

const statuses = {
    'Təsdiq gözləyir': 'pending',
    'Təsdiqlənib': 'confirmed',
    'Ləğv edildi': 'cancelled',
    'Hesablandı': 'done'
};


function ViewStaff() {
    let params = useParams();
    let location = useLocation()
    let id = params.id;
    let activeKey = location.state ? location.state.key : undefined

    const [key, setKey] = useState(activeKey !== undefined ? activeKey : 'general');
    const [emptyData, setEmptyData] = useState(false);


    /*General*/
    const [institution, setInstitution] = useState([]);
    const [department, setDepartment] = useState([]);
    const [subDepartment, setSubDepartment] = useState([]);
    const [familyJob, setFamilyJob] = useState([]);
    const [positionFunctionArr, setPositionFunctionArr] = useState([" "]);
    const [obeyDepartment, setObeyDepartment] = useState('');
    const [vacancyCount, setVacancyCount] = useState('');
    const [areaExperience, setAreaExperience] = useState('');
    const [leaderExperience, setLeaderExperience] = useState('');
    const [height, setHeight] = useState('');
    const [heightDemand, setHeightDemand] = useState('');
    const [showHeight, setShowHeight] = useState('');
    const [skillArr, setSkillArr] = useState([]);
    const [skillProgramArr, setSkillProgramArr] = useState([]);
    const [skillLegalArr, setSkillLegalArr] = useState([]);
    const [skillLanguageArr, setSkillLanguageArr] = useState([]);

    const [minGrade, setMinGrade] = useState('');
    const [maxGrade, setMaxGrade] = useState('');

    const [educationDegree, setEducationDegree] = useState('');
    const [workAddress, setWorkAddress] = useState('');
    const [requiredFile, setRequiredFile] = useState(null);

    const [workCondition, setWorkCondition] = useState('');
    const [workMode, setWorkMode] = useState('');
    const [vacancy, setVacancy] = useState('');
    const [vacancyCategory, setVacancyCategory] = useState('');
    const [employeePosition, setEmployeePosition] = useState('');
    const [educationSpeciality, setEducationSpeciality] = useState('');
    const [gender, setGender] = useState('');
    const [militaryAchieve, setMilitaryAchieve] = useState('');
    const [health, setHealth] = useState('');
    const [workConditionPer, setWorkConditionPer] = useState('');
    const [workConditionVac, setWorkConditionVac] = useState('');

    /*Operation*/
    const [operation, setOperation] = useState([])
    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordSize, setRecordSize] = useState(20)

    const getStaffInfo = () => {
        mainAxios({
            method: 'get',
            url: '/vacancies/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let data = res.data.generalInformation;
            setInstitution(data.workInstitution !== null ? data.workInstitution.name : null);
            setDepartment(data.department !== null ? data.department.name : null);
            setSubDepartment(data.subDepartment !== null ? data.subDepartment.name : null);
            setObeyDepartment(data.subordinateDepartment);
            setVacancy(data.position !== null ? data.position.name : null);
            setVacancyCount(data.count);
            setFamilyJob(data.jobFamily !== null ? data.jobFamily.name : null);
            let leaderData = res.data.generalInformation.experience
            if (leaderData !== null) {
                setLeaderExperience(data.leader);
                setAreaExperience(data.area);
            }
            let gradeData = res.data.generalInformation.gradeRange
            if (leaderData !== null) {
                setMinGrade(gradeData.min);
                setMaxGrade(gradeData.max);
            }
            setEmployeePosition(data.curator);
            setWorkCondition(data.workCondition);
            setSkillLegalArr(data.legislationStatementSet)
            setVacancyCategory(data.positionCategory);
            setWorkMode(data.workMode);
            setWorkConditionPer(data.conditionalAdditionPercentage);
            setWorkConditionVac(data.conditionalAdditionVacation);
            setWorkAddress(data.workPlace);
            setEducationSpeciality(data.speciality !== null ? data.speciality.name : null);
            setGender(data.gender);
            setEducationDegree(data.educationStatus);
            setHealth(data.healthy ? 'Bəli' : 'Xeyr');
            setMilitaryAchieve(data.militaryAchieve ? 'Bəli' : 'Xeyr');
            setRequiredFile(data.requireCertificate ? 'Bəli' : 'Xeyr')
            setHeight(data.height)
            data.height > 0 ? setShowHeight(true) : setShowHeight(false);
            setHeightDemand(data.height > 0 ? 'Bəli' : 'Xeyr');
            setPositionFunctionArr(data.functionalities);

            let knowLedgeData = res.data.specialityKnowledge
            if (knowLedgeData !== null) {
                setSkillLanguageArr(knowLedgeData.languageKnowledgeSet);
                setSkillArr(knowLedgeData.requiredKnowledgeSet);
                setSkillProgramArr(knowLedgeData.computerKnowledgeSet);
            }
        });
    }

    const getOperation = (page, status) => {
        mainAxios({
            method: 'get',
            url: '/operations',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                page: page - 1,
                size: recordSize,
                status: status
            }
        }).then((res) => {
            setCurrentPage(page);
            setOperation(res.data.content);
            setTotalRecord(res.data.totalElements);
            setEmptyData(true)
        });
    }

    const changeStatus = (status, id) => {
        let statusText = status === 2 ? 'Ləğv etmək istədiyinizə əminsinizmi?' : 'Təsdiq etmək istədiyinizə əminsinizmi?'
        Swal.fire({
            text: statusText,
            showCancelButton: true,
            confirmButtonText: 'Bəli',
            confirmButtonColor: '#2ed06a',
            cancelButtonText: 'Xeyr',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                mainAxios({
                    method: 'put',
                    url: `/operations/${id}/status`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    params: {
                        status: status
                    }
                }).then((res) => {
                    getOperation(1)
                });
            }
        })
    }

    const getExportDocument = (id, operationName) => {
        mainAxios({
            method: 'get',
            url: `/operations/${id}/export`,
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

        }).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = window.document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${operationName}.doc`);
            window.document.body.appendChild(link);
            link.click();
        })
    }


    useEffect(() => {
        getStaffInfo();
        getOperation(1)
    }, []);

    return (
        <Aux>
            <div className="view">
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
                        </div>
                    </div>
                    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                        <Tab eventKey="general" title="Ümumi məlumatlar">
                            <div className="block">
                                <div className="flex view-top">
                                    <div className="staff-id">
                                        #{id}
                                    </div>
                                    <Link to={{
                                        pathname: `/staff/edit/${id}`,
                                        state: {key}
                                    }} className="btn-border">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.8" clipPath="url(#clip0)">
                                                <path
                                                    d="M11.1928 3.03327L14.8544 6.69485L5.58591 15.9634L1.92638 12.3018L11.1928 3.03327ZM17.6329 2.15019L16 0.51725C15.3689 -0.113823 14.3442 -0.113823 13.7109 0.51725L12.1468 2.08144L15.8084 5.74305L17.6329 3.9185C18.1224 3.42901 18.1224 2.63965 17.6329 2.15019ZM0.0101894 17.4484C-0.0564472 17.7483 0.214319 18.0171 0.514252 17.9441L4.5945 16.9548L0.934967 13.2933L0.0101894 17.4484Z"
                                                    fill="#3083DC"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0">
                                                    <rect width="18" height="18" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        Dəyişiklik et
                                    </Link>
                                </div>
                                <div className="form-list">
                                    <div className="block-inn">
                                        <div className="block-title">
                                            Struktur və ştat cədvəli üzrə məlumatlar
                                        </div>
                                        <div className="card">
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Müəssənin adı *
                                                </div>
                                                <div className="card-text">
                                                    {institution}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Struktur vahidinin adı *
                                                </div>
                                                <div className="card-text">
                                                    {department}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Struktur bölmənin adı
                                                </div>
                                                <div className="card-text">
                                                    {subDepartment}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Tabe struktur bölmənin adı
                                                </div>
                                                <div className="card-text">
                                                    {obeyDepartment}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Ştat vahidinin adı *
                                                </div>
                                                <div className="card-text">
                                                    {vacancy}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Ştat vahidinin sayı *
                                                </div>
                                                <div className="card-text">
                                                    {vacancyCount}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Min dərəcə *
                                                </div>
                                                <div className="card-text">
                                                    {minGrade}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Max dərəcə *
                                                </div>
                                                <div className="card-text">
                                                    {maxGrade}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Əmək şəraiti *
                                                </div>
                                                <div className="card-text">
                                                    {workCondition}
                                                </div>
                                            </div>
                                            {
                                                workCondition == 'Zərərli' ?
                                                    <>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Əmək şəraiti dərəcəsi
                                                            </div>
                                                            <div className="card-text">
                                                                {workConditionPer}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Əmək şəraitinə görə məzuniyyət
                                                            </div>
                                                            <div className="card-text">
                                                                {workConditionVac}
                                                            </div>
                                                        </div>
                                                    </>
                                                    : null
                                            }
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Ştat vahidinin iş rejimi *
                                                </div>
                                                <div className="card-text">
                                                    {workMode}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Ştat vahidinin kateqoriyası *
                                                </div>
                                                <div className="card-text">
                                                    {vacancyCategory}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    İş ailəsi
                                                </div>
                                                <div className="card-text">
                                                    {familyJob}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    İş yerinin ünvanı *
                                                </div>
                                                <div className="card-text">
                                                    {workAddress}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Struk b. tabe old. kurator rəh. ad, soyad, ata adı, vəzifə
                                                </div>
                                                <div className="card-text">
                                                    {employeePosition}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="block-inn">
                                        <div className="block-title">
                                            Qanunvericilik
                                        </div>
                                        <div className="card">
                                            {
                                                skillLegalArr.length > 0 ?
                                                    skillLegalArr.map((item, index) =>
                                                        <div className="card-in " key={index}>
                                                            {
                                                                index === 0 ? null :
                                                                    <div className="add-item-top">
                                                                        <p className="m-0"> #{index + 1}. Digər </p>
                                                                    </div>
                                                            }
                                                            <div className="card-item flex-start">
                                                                <div className="card-title">
                                                                    Qanunvericilik aktları
                                                                </div>
                                                                <div className="card-text">
                                                                    {item.legislation !== null ? item.legislation.name : null}
                                                                </div>
                                                            </div>
                                                            <div className="card-item flex-start">
                                                                <div className="card-title">
                                                                    Bilik səviyyəsi
                                                                </div>
                                                                <div className="card-text">
                                                                    {item.level}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )

                                                    :
                                                    <div className="card-in">
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Məlumat yoxdur
                                                            </div>
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="block-inn">
                                        <div className="block-title">
                                            Kvalifikasiya tələbləri
                                        </div>
                                        <div className="card">
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Rəhbər üzrə staj tələbi
                                                </div>
                                                <div className="card-text">
                                                    {leaderExperience}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Sahə üzrə staj tələbi
                                                </div>
                                                <div className="card-text">
                                                    {areaExperience}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Təhsil pilləsi
                                                </div>
                                                <div className="card-text">
                                                    {educationDegree}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Təhsil ixtisası
                                                </div>
                                                <div className="card-text">
                                                    {educationSpeciality}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Sertifikat tələbi
                                                </div>
                                                <div className="card-text">
                                                    {requiredFile}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Boy tələbi
                                                </div>
                                                <div className="card-text">
                                                    {heightDemand}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Hərbi mükəlləfiyyət tələbi
                                                </div>
                                                <div className="card-text">
                                                    {militaryAchieve}
                                                </div>
                                            </div>
                                            {
                                                showHeight ?
                                                    <div className="card-item flex-start">
                                                        <div className="card-title">
                                                            Boy
                                                        </div>
                                                        <div className="card-text">
                                                            {height}
                                                        </div>
                                                    </div>
                                                    : null
                                            }
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Sağlamlıq tələbi
                                                </div>
                                                <div className="card-text">
                                                    {health}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Cinsiyyət tələbi
                                                </div>
                                                <div className="card-text">
                                                    {gender}
                                                </div>
                                            </div>
                                            {
                                                positionFunctionArr.map((item, index) =>
                                                    <div className="card-in " key={index}>
                                                        {
                                                            index === 0 ? null :
                                                                <div className="add-item-top">
                                                                    <p className="m-0"> #{index + 1}. Digər </p>
                                                                </div>
                                                        }
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Vəzifə funksiyaları
                                                            </div>
                                                            <div className="card-text">
                                                                {item}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="knowledge" title="İxtisas bilikləri">
                            <div className="block">
                                <div className="flex view-top">
                                    <div className="staff-id">
                                        #{id}
                                    </div>
                                    <Link to={{
                                        pathname: `/staff/edit/${id}`,
                                        state: {key}
                                    }} className="btn-border">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.8" clipPath="url(#clip0)">
                                                <path
                                                    d="M11.1928 3.03327L14.8544 6.69485L5.58591 15.9634L1.92638 12.3018L11.1928 3.03327ZM17.6329 2.15019L16 0.51725C15.3689 -0.113823 14.3442 -0.113823 13.7109 0.51725L12.1468 2.08144L15.8084 5.74305L17.6329 3.9185C18.1224 3.42901 18.1224 2.63965 17.6329 2.15019ZM0.0101894 17.4484C-0.0564472 17.7483 0.214319 18.0171 0.514252 17.9441L4.5945 16.9548L0.934967 13.2933L0.0101894 17.4484Z"
                                                    fill="#3083DC"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0">
                                                    <rect width="18" height="18" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        Dəyişiklik et
                                    </Link>
                                </div>
                                <div className="form-list">
                                    <div className="block-inn">
                                        <div className="block-title">
                                            Kompüter bilikləri
                                        </div>
                                        <div className="card">
                                            {
                                                skillProgramArr.length > 0 ?
                                                    skillProgramArr.map((item, index) =>
                                                        <div className="card-in " key={index}>
                                                            {
                                                                index === 0 ? null :
                                                                    <div className="add-item-top">
                                                                        <p className="m-0"> #{index + 1}. Digər </p>
                                                                    </div>
                                                            }
                                                            <div className="card-item flex-start">
                                                                <div className="card-title">
                                                                    Proqram adı
                                                                </div>
                                                                <div className="card-text">
                                                                    {item.computer !== null ? item.computer.name : null}
                                                                </div>
                                                            </div>
                                                            <div className="card-item flex-start">
                                                                <div className="card-title">
                                                                    Tələb olunan səviyyə
                                                                </div>
                                                                <div className="card-text">
                                                                    {item.level}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                    : <div className="card-in">
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Məlumat yoxdur
                                                            </div>
                                                        </div>
                                                    </div>
                                            }

                                        </div>
                                    </div>
                                    <div className="block-inn">
                                        <div className="block-title">
                                            Dil bilikləri
                                        </div>
                                        <div className="card">
                                            {

                                                skillLanguageArr.length > 0 ?
                                                    skillLanguageArr.map((item, index) =>
                                                        <div className="card-in " key={index}>
                                                            {
                                                                index === 0 ? null :
                                                                    <div className="add-item-top">
                                                                        <p className="m-0"> #{index + 1}. Digər </p>
                                                                    </div>
                                                            }
                                                            <div className="card-item flex-start">
                                                                <div className="card-title">
                                                                    Dil biliyi
                                                                </div>
                                                                <div className="card-text">
                                                                    {item.language !== null ? item.language.name : null}
                                                                </div>
                                                            </div>
                                                            <div className="card-item flex-start">
                                                                <div className="card-title">
                                                                    Bilik səviyyəsi
                                                                </div>
                                                                <div className="card-text">
                                                                    {item.level}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                    :
                                                    <div className="card-in">
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Məlumat yoxdur
                                                            </div>
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="block-inn">
                                        <div className="block-title">
                                            Vəzifənin tələb etdiyi kompetensiyalar
                                        </div>
                                        <div className="card">
                                            {
                                                skillArr.length > 0 ?
                                                    skillArr.map((item, index) =>
                                                        <div className="card-in " key={index}>
                                                            {
                                                                index === 0 ? null :
                                                                    <div className="add-item-top">
                                                                        <p className="m-0"> #{index + 1}. Digər </p>
                                                                    </div>
                                                            }
                                                            <div className="card-item flex-start">
                                                                <div className="card-title">
                                                                    Kompetensiyalar
                                                                </div>
                                                                <div className="card-text">
                                                                    {item.requiredSkill !== null ? item.requiredSkill.name : null}
                                                                </div>
                                                            </div>
                                                            <div className="card-item flex-start">
                                                                <div className="card-title">
                                                                    Tələb olunan səviyyə
                                                                </div>
                                                                <div className="card-text">
                                                                    {item.level}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                    : <div className="card-in">
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Məlumat yoxdur
                                                            </div>
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="operation" title="Əmrlər">
                            <div className="block">
                                <Table responsive="sm">
                                    <thead>
                                    <tr>
                                        <th>İd</th>
                                        <th>Əmr</th>
                                        <th>Tarix</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        operation.length > 0 ?
                                            operation.map((item, index) =>
                                                <tr key={index}>
                                                    <td>{item.id}</td>
                                                    <td>
                                                        {
                                                            item.type.length > 30 ?
                                                                <OverlayTrigger placement="top-start" overlay={<Tooltip
                                                                    id="tooltip-disabled">{item.type}</Tooltip>}>
                                                                    <p className="m-0 operation-name">{item.type}</p>
                                                                </OverlayTrigger>
                                                                :
                                                                <p className="m-0 operation-name">{item.type}</p>
                                                        }
                                                    </td>
                                                    <td>{item.createdAt}</td>
                                                    <td>
                                                        <div className="flex">
                                                 <span className={statuses[item.statusAz]}>
                                                     {item.statusAz}
                                                 </span>
                                                            <ul className="btn-block list-unstyled flex m-0">
                                                                <li>
                                                                    <Button className="btn-export"
                                                                            onClick={() => getExportDocument(item.id, item.type)}>
                                                                        <svg width="20" height="20" viewBox="0 0 22 22"
                                                                             fill="none"
                                                                             xmlns="http://www.w3.org/2000/svg">
                                                                            <path
                                                                                d="M17.1875 19.25H4.81247C4.63013 19.25 4.45527 19.1776 4.32635 19.0486C4.19742 18.9197 4.125 18.7448 4.125 18.5625V3.4375C4.125 3.25517 4.19742 3.0803 4.32635 2.95137C4.45527 2.82244 4.63013 2.75 4.81247 2.75H13.0627L17.875 7.5625V18.5625C17.875 18.7448 17.8026 18.9197 17.6737 19.0486C17.5447 19.1776 17.3699 19.25 17.1875 19.25V19.25Z"
                                                                                stroke="#040647" strokeLinecap="round"
                                                                                strokeLinejoin="round"/>
                                                                            <path d="M13.0625 2.75V7.5625H17.8757"
                                                                                  stroke="#040647"
                                                                                  strokeLinecap="round" strokeLinejoin="round"/>
                                                                            <path d="M8.25 11.6875H13.75" stroke="#040647"
                                                                                  strokeLinecap="round" strokeLinejoin="round"/>
                                                                            <path d="M8.25 14.4375H13.75" stroke="#040647"
                                                                                  strokeLinecap="round" strokeLinejoin="round"/>
                                                                        </svg>

                                                                    </Button>
                                                                </li>
                                                                {
                                                                    item.statusAz === 'Təsdiq gözləyir' ?
                                                                        <li>
                                                                            <Button className="btn-cancel"
                                                                                    onClick={() => changeStatus('REJECTED', item.id)}>
                                                                                <svg width="14" height="14" viewBox="0 0 12 12"
                                                                                     fill="none"
                                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                                    <path
                                                                                        d="M5.99688 5.08435L11.0339 0.047383C11.0388 0.0422913 11.0438 0.0372908 11.0489 0.0323831C11.0489 0.0323654 11.0489 0.0323479 11.049 0.0323302L11.1531 0.140279C11.3516 -0.0514605 11.668 -0.0459554 11.8598 0.152578C12.0515 0.351111 12.046 0.667475 11.8475 0.859214L5.99688 5.08435ZM5.99688 5.08435L0.959034 0.0464826L0.95905 0.0464665L0.957171 0.0446523C0.69905 -0.204637 0.287728 -0.197483 0.038437 0.0606401C-0.20476 0.312441 -0.20476 0.711621 0.038437 0.963421L0.0384207 0.963437L0.0402643 0.965281L5.07811 6.00312L0.0402643 11.041L0.0402564 11.041C-0.213419 11.2947 -0.213419 11.706 0.0402564 11.9597L0.0402802 11.9597C0.293992 12.2134 0.705306 12.2134 0.959018 11.9597L0.959033 11.9597L5.99688 6.92189L11.0347 11.9597L11.0347 11.9597L11.0366 11.9616C11.2947 12.2109 11.706 12.2037 11.9553 11.9456L11.9553 11.9456C12.1985 11.6938 12.1985 11.2946 11.9553 11.0428L11.9553 11.0428L11.9535 11.041L6.91568 6.00312L11.9526 0.96616L5.99688 5.08435Z"
                                                                                        fill="#CF3131" stroke="#CF3131"
                                                                                        strokeWidth="0.3"/>
                                                                                </svg>
                                                                            </Button>
                                                                        </li>
                                                                        : null
                                                                }
                                                                {
                                                                    item.statusAz === 'Təsdiq gözləyir' ?
                                                                        <li>
                                                                            <Button className="btn-confirm"
                                                                                    onClick={() => changeStatus('APPROVED', item.id)}>
                                                                                <svg width="16" height="12" viewBox="0 0 16 12"
                                                                                     fill="none"
                                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                                    <path
                                                                                        d="M15.3696 0.327361C14.8557 -0.139829 14.0564 -0.103215 13.5867 0.413197L5.88442 8.89458L2.16332 5.11165C1.67212 4.61415 0.874137 4.60658 0.37791 5.0965C-0.11959 5.58515 -0.127168 6.38441 0.362755 6.88191L5.02072 11.6169C5.25937 11.8593 5.58259 11.9945 5.92097 11.9945C5.92854 11.9945 5.9374 11.9945 5.94497 11.9957C6.29347 11.9881 6.62178 11.8391 6.85535 11.5816L15.4554 2.11156C15.9239 1.59381 15.886 0.795825 15.3696 0.327361Z"
                                                                                        fill="#2ED06A"/>
                                                                                </svg>
                                                                            </Button>
                                                                        </li>
                                                                        : null
                                                                }
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                            :
                                            emptyData ?
                                                <EmptyData/>
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
        </Aux>

    );
}

export default ViewStaff
