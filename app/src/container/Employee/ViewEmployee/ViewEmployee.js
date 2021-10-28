import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Container, Row, Col, Tabs, Tab, Image, Table} from 'react-bootstrap';
import {Link, useParams, useRouteMatch} from 'react-router-dom';
import {mainAxios} from "../../../components/Axios/axios";
import userImage from '../../../assets/img/user.png'

import "react-datepicker/dist/react-datepicker.css";

function ViewEmployee() {
    const {params: {id}} = useRouteMatch('/employee/view/:id');
    const [key, setKey] = useState('home');
    const token = localStorage.getItem('token');

    /*General*/
    const [idCardNumber, setIdCardNumber] = useState('');
    const [idCardPin, setIdCardPin] = useState('');
    const [idCardSerial, setIdCardSerial] = useState('');
    const [fullName, setFullName] = useState('');
    const [countryBirth, setCountryBirth] = useState('');
    const [livePermission, setLivePermission] = useState('');
    const [idCardOrganization, setIdCardOrganization] = useState('');
    const [passportNumber, setPassportNumber] = useState('');
    const [passportSerial, setPassportSerial] = useState('');
    const [settlement, setSettlement] = useState('');
    const [street, setStreet] = useState('');
    const [block, setBlock] = useState('');
    const [apartment, setApartment] = useState('');
    const [home, setHome] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [mobileNumber1, setMobileNumber1] = useState('');
    const [mobileNumber2, setMobileNumber2] = useState('');
    const [businessPhone, setBusinessPhone] = useState('');
    const [businessInternalPhone, setBusinessInternalPhone] = useState('');
    const [email, setEmail] = useState('');
    const [emailBusiness, setEmailBusiness] = useState('');
    const [academicDegreeNumber, setAcademicDegreeNumber] = useState('');
    const [academicDegreeOrganization, setAcademicDegreeOrganization] = useState('');
    const [photo, setPhoto] = useState();
    const [familyCondition, setFamilyCondition] = useState('')
    const [startIdDate, setStartIdDate] = useState('');
    const [citizenControl, setCitizenControl] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [gender, setGender] = useState('');
    const [expiredIdDate, setExpiredIdDate] = useState('');
    const [startBirthDate, setStartBirthDate] = useState('');
    const [familyMemberArr, setFamilyMemberArr] = useState([]);
    const [startPassportDate, setStartPassportDate] = useState('');
    const [expiredPassportDate, setExpiredPassportDate] = useState('');
    const [startAcademicDegreeDate, setStartAcademicDegreeDate] = useState('');
    const [startWorkPermissionDate, setStartWorkPermissionDate] = useState('');
    const [expiredWorkPermissionDate, setExpiredWorkPermissionDate] = useState('');


    /*Company*/

    const [company, setCompany] = useState('');
    const [section, setSection] = useState('');
    const [subSection, setSubSection] = useState('');
    const [employeePosition, setEmployeePosition] = useState('');
    const [firedReason, setFiredReason] = useState('');
    const [checked, setChecked] = useState(true);
    const [checkPrisoner, setCheckPrisoner] = useState(true);
    const [checkColleague, setCheckColleague] = useState(true);
    const [showPermission, setShowPermission] = useState(false);
    const [startJobDate, setStartJobDate] = useState('');
    const [endJobDate, setEndJobDate] = useState('');

    /*Education*/

    const [faculty, setFaculty] = useState('');
    const [direction, setDirection] = useState('');
    const [major, setMajor] = useState('');
    const [degree, setDegree] = useState('');
    const [graduateFileNumber, setGraduateFileNumber] = useState('');
    const [nostrificationNumber, setNostrificationNumber] = useState('');
    const [warrantyNumber, setWarrantyNumber] = useState('');
    const [workPermissionSerial, setWorkPermissionSerial] = useState();
    const [workPermissionNumber, setWorkPermissionNumber] = useState();
    const [workPermissionPeriod, setWorkPermissionPeriod] = useState();
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [country, setCountry] = useState('');
    const [university, setUniversity] = useState('');
    const [educationType, setEducationType] = useState('');
    const [driverLicence, setDriverLicence] = useState('');
    const [quota, setQuota] = useState('');
    const [startGraduateDate, setStartGraduateDate] = useState('');
    const [endGraduateDate, setEndGraduateDate] = useState('');
    const [startGraduateFile, setStartGraduateFile] = useState('');
    const [expiredDriverLicenceDate, setExpiredDriverLicenceDate] = useState('');
    const [certificateArr, setCertificateArr] = useState([]);
    const [rewardArr, setRewardArr] = useState([])

    /*Operation*/
    const [document, setDocument] = useState([]);

    const getEmployeeInfo = () => {
        mainAxios({
            method: 'get',
            url: '/employee/general-info/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let data = res.data.data;
            setIdCardSerial(data.idcardSeries);
            setIdCardNumber(data.idcardNumber);
            setIdCardPin(data.idcardPin);
            setFamilyCondition(data.familyCondition)
            setStartIdDate(data.idcardStartDate);
            setExpiredIdDate(data.idcardEndDate);
            setFullName(data.fullName);
            setStartBirthDate(data.birthday);
            setCountryBirth(data.birthplace);
            setBloodType(data.bloodGroup);
            setGender(data.gender);
            setLivePermission(data.permission);
            setCitizenControl(data.citizenCountry);
            data.citizenCountry === 'Azərbaycan' ? setShowPermission(false) : setShowPermission(true)
            setIdCardOrganization(data.idcardOrganization);
            setPassportSerial(data.foreignPassportSeries);
            setPassportNumber(data.foreignPassportNumber);
            setStartPassportDate(data.foreignPassportStartDate);
            setExpiredPassportDate(data.foreignPassportEndDate);
            setCountry(data.addressCountry.key);
            setCity(data.addressCity.key);
            setRegion(data.addressDistrict.key);
            setSettlement(data.addressVillage);
            setStreet(data.addressStreet);
            setBlock(data.addressBlock);
            setApartment(data.addressApartment);
            setHome(data.addressHome);
            setPhoneNumber(data.homePhone);
            setMobileNumber1(data.mobilePhone1);
            setMobileNumber2(data.mobilePhone2);
            setBusinessPhone(data.businessPhone);
            setBusinessInternalPhone(data.internalBusinessPhone);
            setWorkPermissionSerial(data.workPermissionSerial);
            setWorkPermissionNumber(data.workPermissionNumber);
            setWorkPermissionPeriod(data.workPermissionPeriod);
            setStartWorkPermissionDate(data.startWorkPermissionDate);
            setExpiredWorkPermissionDate(data.expiredWorkPermissionDate)
            setEmail(data.ownMailAddress);
            setEmailBusiness(data.businessMailAddress);
            setFamilyMemberArr(data.familyMembers)
            data.photo !== null ?
                setPhoto(`https://hr-portal-api.herokuapp.com/image/${data.photo}?token=${token}`) : setPhoto(userImage)
        });
    }

    const getBusinessInfo = () => {
        mainAxios({
            method: 'get',
            url: '/employee/business-info/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let data = res.data.data;
            setCompany(data.company);
            setSection(data.section);
            setSubSection(data.subSection);
            setEmployeePosition(data.position);
            setFiredReason(data.jobEndReason);
            setStartJobDate(data.jobStartDate);
            setEndJobDate(data.jobEndDate);
            setChecked(data.mainJob)
        });
    }

    const getAcademicInfo = () => {
        mainAxios({
            method: 'get',
            url: '/employee/academic-info/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            let data = res.data.data;
            setStartAcademicDegreeDate(data.academicDegreeDate);
            setAcademicDegreeNumber(data.academicDegreeNumber);
            setAcademicDegreeOrganization(data.academicDegreeOrganization);
            setFaculty(data.faculty);
            setDirection(data.direction);
            setMajor(data.speciality);
            setStartGraduateDate(data.entranceDate);
            setEndGraduateDate(data.graduateDate);
            setDegree(data.degree);
            setGraduateFileNumber(data.graduateFileNumber);
            setEducationType(data.educationType)
            setStartGraduateFile(data.graduateFileDate);
            setNostrificationNumber(data.nostrifikasiyaNumber)
            setExpiredDriverLicenceDate(data.driverCardEndDate);
            setDriverLicence(data.driverCardCategory);
            setUniversity(data.institution)
            /*
                        setWarrantyNumber(data)
            */
            if (data.certificates.length > 0)
                setCertificateArr(data.certificates)
            setQuota(data.quotas);
            setRewardArr(data.governmentAchievements)
        });
    }

    const getDocument = () => {
        mainAxios({
            method: 'get',
            url: '/employee/document/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

        }).then((res) => {
            setDocument(res.data.data.data);
        });
    }

    useEffect(() => {
        getEmployeeInfo();
        getBusinessInfo();
        getAcademicInfo();
        getDocument()
    }, []);

    return (
        <Aux>
            <div className="view">
                <Container fluid>
                    <div className="title-block flex">
                        <div className="title flex-center">
                            <Link to="/employee" className="flex">
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
                                <div className="flex view-top">
                                    <div className="upload-content flex-start">
                                        <div className="upload-img">
                                            <Image src={photo ? photo : userImage}/>
                                        </div>
                                        <div className="user-data">
                                            <p className="user-name">{fullName}</p>
                                            <p className="user-position">{employeePosition}</p>
                                        </div>
                                    </div>
                                    <Link to={`/employee/edit/${id}`} className="btn-border">
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
                                            Şəxsiyyət vəsiqəsi forması
                                        </div>
                                        <div className="card">
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Ailə vəziyyəti
                                                </div>
                                                <div className="card-text">
                                                    {familyCondition}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Seriya və nömrə *
                                                </div>
                                                <div className="card-text">
                                                    {idCardSerial} {idCardNumber}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    FİN kod *
                                                </div>
                                                <div className="card-text">
                                                    {idCardPin}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Şəxsiy. vəs. verən orqan *
                                                </div>
                                                <div className="card-text">
                                                    {idCardOrganization}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Vətəndaşlığı olduğu ölkə *
                                                </div>
                                                <div className="card-text">
                                                    {citizenControl}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Soyadı, adı, ata adı *
                                                </div>
                                                <div className="card-text">
                                                    {fullName}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Doğum yeri *
                                                </div>
                                                <div className="card-text">
                                                    {countryBirth}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Doğum tarixi *
                                                </div>
                                                <div className="card-text">
                                                    {startBirthDate}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Qan qrupu
                                                </div>
                                                <div className="card-text">
                                                    {bloodType}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Cinsi *
                                                </div>
                                                <div className="card-text">
                                                    {gender}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Şəxsiy. vəs. verilmə tarixi *
                                                </div>
                                                <div className="card-text">
                                                    {startIdDate}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Şəxsiy. vəs. qüvvədə olma tarixi *
                                                </div>
                                                <div className="card-text">
                                                    {expiredIdDate}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Vəsiqə və ya müvəqqəti yaşamaq icazəsi
                                                </div>
                                                <div className="card-text">
                                                    {livePermission}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        showPermission ?
                                            <div className="block-inn">
                                                <div className="block-title">
                                                    İş icazəsi
                                                </div>
                                                <div className="card">
                                                    <div className="card-item flex-start">
                                                        <div className="card-title">
                                                            Seriyası *
                                                        </div>
                                                        <div className="card-text">
                                                            {workPermissionSerial}
                                                        </div>
                                                    </div>
                                                    <div className="card-item flex-start">
                                                        <div className="card-title">
                                                            Nömrəsi *
                                                        </div>
                                                        <div className="card-text">
                                                            {workPermissionNumber}
                                                        </div>
                                                    </div>
                                                    <div className="card-item flex-start">
                                                        <div className="card-title">
                                                            İş icazəsinin müddəti *
                                                        </div>
                                                        <div className="card-text">
                                                            {workPermissionPeriod}
                                                        </div>
                                                    </div>
                                                    <div className="card-item flex-start">
                                                        <div className="card-title">
                                                            Verilmə tarixi *
                                                        </div>
                                                        <div className="card-text">
                                                            {startWorkPermissionDate}
                                                        </div>
                                                    </div>
                                                    <div className="card-item flex-start">
                                                        <div className="card-title">
                                                            Bitmə tarixi *
                                                        </div>
                                                        <div className="card-text">
                                                            {expiredWorkPermissionDate}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : null
                                    }
                                    <div className="block-inn">
                                        <div className="block-title">
                                            Xarici pasport
                                        </div>
                                        <div className="card">
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Seriya və nömrə *
                                                </div>
                                                <div className="card-text">
                                                    {passportSerial} {passportNumber}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Verilmə tarixi *
                                                </div>
                                                <div className="card-text">
                                                    {startPassportDate}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Bitmə tarixi *
                                                </div>
                                                <div className="card-text">
                                                    {expiredPassportDate}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="block-inn">
                                        <div className="block-title">
                                            Ünvan
                                        </div>
                                        <div className="card">
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Ölkə *
                                                </div>
                                                <div className="card-text">
                                                    {country}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Şəhər *
                                                </div>
                                                <div className="card-text">
                                                    {city}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Rayon *
                                                </div>
                                                <div className="card-text">
                                                    {region}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Qəsəbə *
                                                </div>
                                                <div className="card-text">
                                                    {settlement}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Küçə *
                                                </div>
                                                <div className="card-text">
                                                    {street}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Məhəllə *
                                                </div>
                                                <div className="card-text">
                                                    {block}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Mənzil *
                                                </div>
                                                <div className="card-text">
                                                    {apartment}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Ev *
                                                </div>
                                                <div className="card-text">
                                                    {home}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="block-inn">
                                        <div className="block-title">
                                            Əlaqə vasitələri
                                        </div>
                                        <div className="card">
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Ev nömrəsi *
                                                </div>
                                                <div className="card-text">
                                                    {phoneNumber}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Mobil nömrəsi 1 *
                                                </div>
                                                <div className="card-text">
                                                    {mobileNumber1}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Mobil nömrəsi 2 *
                                                </div>
                                                <div className="card-text">
                                                    {mobileNumber2}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    İş nömrəsi *
                                                </div>
                                                <div className="card-text">
                                                    {businessPhone}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    İş nömrəsi ( daxili) *
                                                </div>
                                                <div className="card-text">
                                                    {businessInternalPhone}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    E-mail ünvanı (şəxsi) *
                                                </div>
                                                <div className="card-text">
                                                    {email}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    E-mail ünvanı (iş) *
                                                </div>
                                                <div className="card-text">
                                                    {emailBusiness}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="block-inn">
                                        <div className="block-title">
                                            Ailə tərkibi haqqında
                                        </div>
                                        <div className="card">
                                            {
                                                familyMemberArr.map((item, index) =>
                                                    <div className="card-in " key={index}>
                                                        {
                                                            index === 0 ? null :
                                                                <div className="add-item-top">
                                                                    <p className="m-0"> #{index + 1}. Digər </p>
                                                                </div>
                                                        }
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Ailə üzvü
                                                            </div>
                                                            <div className="card-text">
                                                                {item.relationType}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Soyadı, adı, ata adı
                                                            </div>
                                                            <div className="card-text">
                                                                {item.fullName}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Doğum tarixi *
                                                            </div>
                                                            <div className="card-text">
                                                                {item.birthday}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Doğum yeri
                                                            </div>
                                                            <div className="card-text">
                                                                {item.birthplace}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                İş yeri
                                                            </div>
                                                            <div className="card-text">
                                                                {item.workPlace}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Vəzifəsi
                                                            </div>
                                                            <div className="card-text">
                                                                {item.position}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Yaşayış
                                                            </div>
                                                            <div className="card-text">
                                                                {item.address}
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
                        <Tab eventKey="company" title="Şirkət barədə">
                            <div className="block">
                                <div className="form-list">
                                    <div className="flex view-top">
                                        <div className="upload-content flex-start">
                                            <div className="upload-img">
                                                <Image src={photo ? photo : userImage}/>
                                            </div>
                                            <div className="user-data">
                                                <p className="user-name">{fullName}</p>
                                                <p className="user-position">{employeePosition}</p>
                                            </div>
                                        </div>
                                        <Link to={`/employee/edit/${id}`} className="btn-border">
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
                                    <div className="block-inn">
                                        <div className="block-title">
                                            Limana qədər əmək fəaliyyəti barədə məlumatlar
                                        </div>
                                        <div className="card">
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    İşçinin işlədiyi şirkət
                                                </div>
                                                <div className="card-text">
                                                    {company}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Struktur bölmə
                                                </div>
                                                <div className="card-text">
                                                    {section}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Alt struktur bölmə
                                                </div>
                                                <div className="card-text">
                                                    {subSection}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    İşçinin işlədiyi vəzifə
                                                </div>
                                                <div className="card-text">
                                                    {employeePosition}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    İşə qəbul tarixi
                                                </div>
                                                <div className="card-text">
                                                    {startJobDate}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    İşdən azad tarixi
                                                </div>
                                                <div className="card-text">
                                                    {endJobDate}
                                                </div>
                                            </div>
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    İşdən azad olma maddəsi
                                                </div>
                                                <div className="card-text">
                                                    {firedReason}
                                                </div>
                                            </div>
                                            <div className="radio-content">
                                                <h5>Əsas iş yeridir yoxsa əlavə iş yeri?</h5>
                                                <div className="flex-start">
                                                    <div className="radio-block">
                                                        <label className="radio-label">
                                                            <input type="radio" name="radio" checked={checked}
                                                                   disabled={true} onChange={(e) => {
                                                                setChecked(true)
                                                            }}/>
                                                            <span className="radio-mark"></span>
                                                        </label>
                                                        <span className="radio-title">Əsas iş yeri</span>
                                                    </div>
                                                    <div className="radio-block">
                                                        <label className="radio-label">
                                                            <input type="radio" name="radio" checked={!checked}
                                                                   disabled={true} onChange={(e) => {
                                                                setChecked(false)
                                                            }}/>
                                                            <span className="radio-mark"></span>
                                                        </label>
                                                        <span className="radio-title">Əlavə iş yeri</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="education" title="Təhsil">
                            <div className="block">
                                <div className="flex view-top">
                                    <div className="upload-content flex-start">
                                        <div className="upload-img">
                                            <Image src={photo ? photo : userImage}/>
                                        </div>
                                        <div className="user-data">
                                            <p className="user-name">{fullName}</p>
                                            <p className="user-position">{employeePosition}</p>
                                        </div>
                                    </div>
                                    <Link to={`/employee/edit/${id}`} className="btn-border">
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
                                <div className="block-inn">
                                    <div className="block-title">
                                        Elmi dərəcə
                                    </div>
                                    <div className="card">
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                Verilmə tarixi
                                            </div>
                                            <div className="card-text">
                                                {startAcademicDegreeDate}
                                            </div>
                                        </div>
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                Sənədin nömrəsi
                                            </div>
                                            <div className="card-text">
                                                {academicDegreeNumber}
                                            </div>
                                        </div>
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                Verən orqan
                                            </div>
                                            <div className="card-text">
                                                {academicDegreeOrganization}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="block-inn">
                                    <div className="block-title">
                                        Təhsil bölməsi
                                    </div>
                                    <div className="card">
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                Təhsil müəssəsinin adı
                                            </div>
                                            <div className="card-text">
                                                {university}
                                            </div>
                                        </div>
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                Fakültə
                                            </div>
                                            <div className="card-text">
                                                {faculty}
                                            </div>
                                        </div>
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                İstiqamət
                                            </div>
                                            <div className="card-text">
                                                {direction}
                                            </div>
                                        </div>
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                İxtisas
                                            </div>
                                            <div className="card-text">
                                                {major}
                                            </div>
                                        </div>
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                Daxil olma tarixi
                                            </div>
                                            <div className="card-text">
                                                {startGraduateDate}
                                            </div>
                                        </div>
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                Bitmə tarixi
                                            </div>
                                            <div className="card-text">
                                                {endGraduateDate}
                                            </div>
                                        </div>
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                Təhsil dərəcəsi
                                            </div>
                                            <div className="card-text">
                                                {degree}
                                            </div>
                                        </div>
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                Sənədin nömrəsi
                                            </div>
                                            <div className="card-text">
                                                {graduateFileNumber}
                                            </div>
                                        </div>
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                Sənədin verilmə tarixi
                                            </div>
                                            <div className="card-text">
                                                {startGraduateFile}
                                            </div>
                                        </div>
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                Təhsil forması
                                            </div>
                                            <div className="card-text">
                                                {educationType}
                                            </div>
                                        </div>
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                Nostrifikasiya şəhadətnaməsinin nömrəsi
                                            </div>
                                            <div className="card-text">
                                                {nostrificationNumber}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="block-inn">
                                    <div className="block-title">
                                        Sertifikat ( vəsiqə)
                                    </div>
                                    <div className="card">
                                        {
                                            certificateArr.map((item, index) =>
                                                <div className="card-in" key={index}>
                                                    {
                                                        index === 0 ? null :
                                                            <div className="add-item-top">
                                                                <p className="m-0"> #{index + 1}. Digər </p>
                                                            </div>
                                                    }
                                                    <div className="card-item flex-start">
                                                        <div className="card-title">
                                                            Sertifikatın (vəsiqənin) adı
                                                        </div>
                                                        <div className="card-text">
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                    <div className="card-item flex-start">
                                                        <div className="card-title">
                                                            Qüvvədə olma müddəti
                                                        </div>
                                                        <div className="card-text">
                                                            {item.endDate}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="block-inn">
                                    <div className="block-title">
                                        Dövlət təltifləri, fəxri adlar
                                    </div>
                                    <div className="card">
                                        {
                                            rewardArr.map((item, index) =>
                                                <div className="card-in" key={index}>
                                                    {
                                                        index === 0 ? null :
                                                            <div className="add-item-top">
                                                                <p className="m-0"> #{index + 1}. Digər </p>
                                                            </div>
                                                    }
                                                    <div className="card-item flex-start">
                                                        <div className="card-title">
                                                            Təltifin adı
                                                        </div>
                                                        <div className="card-text">
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                    <div className="card-item flex-start">
                                                        <div className="card-title">
                                                            Təltifi verən orqanın adı
                                                        </div>
                                                        <div className="card-text">
                                                            {item.organization}
                                                        </div>
                                                    </div>
                                                    <div className="card-item flex-start">
                                                        <div className="card-title">
                                                            Təltifin verilmə tarixi
                                                        </div>
                                                        <div className="card-text">
                                                            {item.startDate}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>

                                </div>

                                <div className="block-inn">
                                    <div className="block-title">
                                        Sürücülük vəsiqəsi
                                    </div>
                                    <div className="card">
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                Kateqoriya
                                            </div>
                                            <div className="card-text">
                                                {driverLicence}
                                            </div>
                                        </div>
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                Qüvvədə olma müddəti
                                            </div>
                                            <div className="card-text">
                                                {expiredDriverLicenceDate}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="block-inn">
                                    <div className="block-title">
                                        Sosial sığorta şəhadətnaməsi ( burdan goturulecek, gedecek umumi melumata)
                                    </div>
                                    <div className="card">
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                S.s şəhadətnaməsinin nömrəsi
                                            </div>
                                            <div className="card-text">
                                                {warrantyNumber}
                                            </div>
                                        </div>
                                        <div className="card-item flex-start">
                                            <div className="card-title">
                                                İşçinin aid oldu kvota üzrə məlumatlar
                                            </div>
                                            <div className="card-text">
                                                {quota}
                                            </div>
                                        </div>
                                        <div className="radio-question">
                                            <Row>
                                                <Col xs={6}>
                                                    <div className="radio-content">
                                                        <h5>Məhkum olmusunuzmu?</h5>
                                                        <div className="flex-start">
                                                            <div className="radio-block">
                                                                <label className="radio-label">
                                                                    <input type="radio" name="prisoner"
                                                                           checked={checkPrisoner}
                                                                           disabled={true}
                                                                           onChange={(e) => {
                                                                               setCheckPrisoner(true)
                                                                           }}/>
                                                                    <span className="radio-mark"></span>
                                                                </label>
                                                                <span className="radio-title">Bəli</span>
                                                            </div>
                                                            <div className="radio-block">
                                                                <label className="radio-label">
                                                                    <input type="radio" name="prisoner"
                                                                           disabled={true}
                                                                           checked={!checkPrisoner} onChange={(e) => {
                                                                        setCheckPrisoner(false)
                                                                    }}/>
                                                                    <span className="radio-mark"></span>
                                                                </label>
                                                                <span className="radio-title">Xeyr</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xs={6}>
                                                    <div className="radio-content">
                                                        <h5>Həmkarlar ittifaqının üzvüsünüzmü?</h5>
                                                        <div className="flex-start">
                                                            <div className="radio-block">
                                                                <label className="radio-label">
                                                                    <input type="radio" name="colleague"
                                                                           checked={checkColleague}
                                                                           disabled={true}
                                                                           onChange={(e) => {
                                                                               setCheckColleague(true)
                                                                           }}/>
                                                                    <span className="radio-mark"></span>
                                                                </label>
                                                                <span className="radio-title">Bəli</span>
                                                            </div>
                                                            <div className="radio-block">
                                                                <label className="radio-label">
                                                                    <input type="radio" name="colleague"
                                                                           checked={!checkColleague}
                                                                           disabled={true}
                                                                           onChange={(e) => {
                                                                               setCheckColleague(false)
                                                                           }}/>
                                                                    <span className="radio-mark"></span>
                                                                </label>
                                                                <span className="radio-title">Xeyr</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
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

export default ViewEmployee
