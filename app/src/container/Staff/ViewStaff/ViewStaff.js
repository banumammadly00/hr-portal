import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Container, Tabs, Tab, Table, Button} from 'react-bootstrap';
import {Link, useRouteMatch} from 'react-router-dom';
import {mainAxios} from "../../../components/Axios/axios";
import Paginate from "../../../components/Pagination/Pagination";

const statuses = {
    'Təsdiq gözləyir': 'pending',
    'Təsdiqlənib': 'confirmed',
    'Ləğv edildi': 'cancelled',
    'Hesablandı': 'calculated'
};


function ViewStaff() {
    const {params: {id}} = useRouteMatch('/staff/view/:id');

    const [key, setKey] = useState('general');

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
    const [workConditionPer, setWorkConditionPer] = useState('')

    /*Operation*/
    const [document, setDocument] = useState([]);
    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordSize, setRecordSize] = useState(15)

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
            setWorkConditionPer(data.conditionalAdditionPercentage)
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
        getStaffInfo();
        getDocument(1)
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
                                    <Link to={`/staff/edit/${id}`} className="btn-border">
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
                                                    <div className="card-item flex-start">
                                                        <div className="card-title">
                                                            Əmək şəraiti dərəcəsi
                                                        </div>
                                                        <div className="card-text">
                                                            {workConditionPer}
                                                        </div>
                                                    </div>
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
                                                                    {item.legislation !== null ? item.legislationId.name : null}
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
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Struk b. tabe old. kurator rəh. ad, soyad, ata adı, vəzifə
                                                </div>
                                                <div className="card-text">
                                                    {employeePosition}
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
                                    <Link to={`/staff/edit/${id}`} className="btn-border">
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
                            <Paginate count={totalRecord} recordSize={recordSize} currentPage={currentPage}
                                      click={(page) => getDocument(page)}/>
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        </Aux>

    );
}

export default ViewStaff
