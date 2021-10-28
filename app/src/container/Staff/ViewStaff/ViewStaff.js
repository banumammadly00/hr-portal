import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Container, Tabs, Tab, Table} from 'react-bootstrap';
import {Link, useRouteMatch} from 'react-router-dom';
import {mainAxios} from "../../../components/Axios/axios";

function ViewStaff() {
    const {params: {id}} = useRouteMatch('/staff/view/:id');

    const [key, setKey] = useState('home');

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

    const [educationDegree, setEducationDegree] = useState('');
    const [workPaid, setWorkPaid] = useState('');
    const [subWorkPaid, setSubWorkPaid] = useState('');
    const [salary, setSalary] = useState('');
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

    /*Operation*/
    const [document, setDocument] = useState([]);

    const getStaffInfo = () => {
        mainAxios({
            method: 'get',
            url: '/position/general-info/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let data = res.data.data;
            setInstitution(data.institutionName);
            setDepartment(data.departmentName);
            setSubDepartment(data.subDepartmentName);
            setObeyDepartment(data.obeyDepartmentName);
            setVacancy(data.vacancyName);
            setVacancyCount(data.vacancyCount);
            setSalary(data.salary);
            setFamilyJob(data.jobFamily);
            setEmployeePosition(data.fullNameAndPosition);
            setLeaderExperience(data.leaderExperience);
            setAreaExperience(data.areaExperience);
            setWorkPaid(data.workCalculateDegree);
            setSubWorkPaid(data.subWorkCalculateDegree);
            setWorkCondition(data.workCondition);
            setVacancyCategory(data.vacancyCategory);
            setWorkMode(data.workMode);
            setWorkAddress(data.workPlace);
            setSkillArr(data.skills);
            setEducationSpeciality(data.educationSpeciality);
            setGender(data.genderDemand);
            setEducationDegree(data.educationDegree);
            setHealth(data.healthy ? 'Bəli' : 'Xeyr');
            setMilitaryAchieve(data.militaryAchieve ? 'Bəli' : 'Xeyr');
            setRequiredFile(data.requireFile)
            setHeight(data.height)
            data.height > 0 ? setShowHeight(true) : setShowHeight(false);
            setHeightDemand(data.height > 0 ? 'Bəli' : 'Xeyr');
            setPositionFunctionArr(data.functionalities)
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
            setSkillLanguageArr(data.languageKnowledge);
            setSkillLegalArr(data.legislationStatements);
            setSkillProgramArr(data.computerKnowledge);
        });
    }


    const getDocument = () => {
        mainAxios({
            method: 'get',
            url: '/document/position/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

        }).then((res) => {
            setDocument(res.data.data.data);
        });
    }

    useEffect(() => {
        getStaffInfo();
        getKnowledgeInfo();
        getDocument()
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
                        <Tab eventKey="home" title="Ümumi məlumatlar">
                            <div className="block">
                                <div className="flex-end view-top">
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
                                                    Tabe struktur bölmənin adı *
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
                                                    Əməyin ödənilməsi dərəcəsi
                                                </div>
                                                <div className="card-text">
                                                    {workPaid}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Əməyin ödənilməsi üzrə alt dərəcə
                                                </div>
                                                <div className="card-text">
                                                    {subWorkPaid}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Ştat üzrə əsas əmək haqqı *
                                                </div>
                                                <div className="card-text">
                                                    {salary}
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
                                                    İş ailəsi *
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
                                            {
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
                                                                Vəzifənin tələb etdiyi kompetensiyalar
                                                            </div>
                                                            <div className="card-text">
                                                                {item.skill}
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
                                <div className="flex-end view-top">
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
                                            Vəzifənin tələb etdiyi Kompüter bilikləri
                                        </div>
                                        <div className="card">
                                            {
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
                                                                {item.name}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Proqram adı
                                                            </div>
                                                            <div className="card-text">
                                                                {item.level}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="card">
                                            {
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
                                                                {item.name}
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
                                            }
                                        </div>
                                        <div className="card">
                                            {
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
                                                                {item.name}
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
                                                    <td>{item.status}</td>
                                                </tr>
                                            )
                                            : null
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        </Aux>

    );
}

export default ViewStaff
