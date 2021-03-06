import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Container, Row, Col, Tabs, Tab, Image, Table, Form, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {Link, useLocation, useParams, useRouteMatch} from 'react-router-dom';
import {mainAxios} from "../../../components/Axios/axios";
import userImage from '../../../assets/img/user.png'

import "react-datepicker/dist/react-datepicker.css";
import Paginate from "../../../components/Pagination/Pagination";
import EmptyData from "../../../components/EmptyData/EmptyData";
import Swal from "sweetalert2";

const statuses = {
    'Təsdiq gözləyir': 'pending',
    'Təsdiqlənib': 'confirmed',
    'Ləğv edildi': 'cancelled',
    'Hesablandı': 'done'
};

function ViewEmployee() {
    let params = useParams();
    let location = useLocation()
    let id = params.id;
    let activeKey = location.state ? location.state : undefined
    const [key, setKey] = useState(activeKey !== undefined ? activeKey : 'general');
    const [tab, setTab] = useState('internal');
    const token = localStorage.getItem('token');
    const [emptyData, setEmptyData] = useState(false);

    /*-------------General--------------*/
    const [photo, setPhoto] = useState();
    const [idCardNumber, setIdCardNumber] = useState('');
    const [idCardPin, setIdCardPin] = useState('');
    const [startIdDate, setStartIdDate] = useState('');
    const [expiredIdDate, setExpiredIdDate] = useState('');
    const [idCardOrganization, setIdCardOrganization] = useState('');
    const [fullName, setFullName] = useState('');
    const [countryBirth, setCountryBirth] = useState('');
    const [militaryStatus, setSetMilitaryStatus] = useState('');
    const [passportNumber, setPassportNumber] = useState('');
    const [startPassportDate, setStartPassportDate] = useState('');
    const [expiredPassportDate, setExpiredPassportDate] = useState('');
    const [startWorkPermissionDate, setStartWorkPermissionDate] = useState('');
    const [expiredWorkPermissionDate, setExpiredWorkPermissionDate] = useState('');
    const [workPermissionSerial, setWorkPermissionSerial] = useState();
    const [workPermissionNumber, setWorkPermissionNumber] = useState();
    const [workPermissionPeriod, setWorkPermissionPeriod] = useState();
    const [familyCondition, setFamilyCondition] = useState('')
    const [citizenControl, setCitizenControl] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [gender, setGender] = useState('');
    const [startBirthDate, setStartBirthDate] = useState('');
    /*checked*/
    const [showMilitary, setShowMilitary] = useState(false);
    const [showPermission, setShowPermission] = useState(false);
    const [checkPassport, setCheckPassport] = useState(false);


    /*-----------Contact-----------*/
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [country, setCountry] = useState('');
    const [settlement, setSettlement] = useState('');
    const [street, setStreet] = useState('');
    const [block, setBlock] = useState('');
    const [apartment, setApartment] = useState('');
    const [home, setHome] = useState('');
    const [regCity, setRegCity] = useState('');
    const [regRegion, setRegRegion] = useState('');
    const [regCountry, setRegCountry] = useState('');
    const [regSettlement, setRegSettlement] = useState('');
    const [regStreet, setRegStreet] = useState('');
    const [regBlock, setRegBlock] = useState('');
    const [regApartment, setRegApartment] = useState('');
    const [regHome, setRegHome] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [mobileNumber1, setMobileNumber1] = useState('');
    const [mobileNumber2, setMobileNumber2] = useState('');
    const [businessPhone, setBusinessPhone] = useState('');
    const [businessInternalPhone, setBusinessInternalPhone] = useState('');
    const [email, setEmail] = useState('');
    const [emailBusiness, setEmailBusiness] = useState('');
    /*checked*/
    const [checkAddress, setCheckAddress] = useState(false);
    const [livingData, setLivingData] = useState(false);
    const [registeredData, setRegisteredData] = useState(false);
    const [contactData, setContactData] = useState(false);

    /*--------------Company------------*/
    const [companyIntArr, setCompanyIntArr] = useState([]);
    const [companyExtArr, setCompanyExtArr] = useState([]);

    const [department, setDepartment] = useState('');
    const [subDepartment, setSubDepartment] = useState('');
    const [position, setPosition] = useState('');

    /*---------Education----------*/
    const [driverLicence, setDriverLicence] = useState('');
    const [expiredDriverLicenceDate, setExpiredDriverLicenceDate] = useState('');
    const [certificateArr, setCertificateArr] = useState([]);
    const [academicDegreeNumber, setAcademicDegreeNumber] = useState('');
    const [academicDegreeOrganization, setAcademicDegreeOrganization] = useState('');
    /*checked*/
    const [checkEducation, setCheckEducation] = useState(false);
    /*array*/
    const [universityArr, setUniversityArr] = useState([])

    /*-----------Other-----------*/
    const [familyMemberArr, setFamilyMemberArr] = useState([]);
    const [startAcademicDegreeDate, setStartAcademicDegreeDate] = useState('');
    const [warrantyNumber, setWarrantyNumber] = useState('');
    const [quota, setQuota] = useState('');
    /*array*/
    const [rewardArr, setRewardArr] = useState([]);
    /*checked*/
    const [checkPrisoner, setCheckPrisoner] = useState(true);
    const [checkColleague, setCheckColleague] = useState(true);
    const [driverData, setDriverData] = useState(false);
    const [academicDegData, setAcademicDegData] = useState(false);

    /*----------Bank----------*/
    const [bankAccount, setBankAccount] = useState('')

    /*-------------Operation-------------*/
    const [operation, setOperation] = useState([])
    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordSize, setRecordSize] = useState(15);

    /*Vacation*/

    const [vacation, setVacation] = useState([])

    const getEmployeeInfo = () => {
        mainAxios({
            method: 'get',
            url: '/employees/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {

            let accountData = res.data.account;
            if (accountData !== null) {
                setBankAccount(accountData.number)
            }
            let personalData = res.data.personalInformation;
            if (personalData !== null) {
                setStartBirthDate(personalData.birthday);
                setCountryBirth(personalData.birthplace);
                setBloodType(personalData.bloodGroup);
                setFamilyCondition(personalData.familyStatus)
                setFullName(personalData.fullName);
                setGender(personalData.gender);
                setExpiredIdDate(personalData.idCard.endDate);
                setIdCardOrganization(personalData.idCard.organization);
                setIdCardPin(personalData.idCard.pin);
                setIdCardNumber(personalData.idCard.seriesNumber);
                setStartIdDate(personalData.idCard.startDate);
                setSetMilitaryStatus(personalData.militaryStatus);
                personalData.gender !== 'Kişi' ? setShowMilitary(false) : setShowMilitary(true);
                let motherLandName = personalData.motherLand !== null ? personalData.motherLand.name : null
                setCitizenControl(motherLandName);
                motherLandName !== 'Azərbaycan' ? setShowPermission(true) : setShowPermission(false)
                personalData.photo !== null ?
                    setPhoto(`https://hr-portal-api-v2.herokuapp.com/employees/image/${personalData.photo}?token=${token}`) : setPhoto(userImage)

                if (personalData.foreignPassport !== null) {
                    setPassportNumber(personalData.foreignPassport.seriesNumber);
                    setStartPassportDate(personalData.foreignPassport.startDate);
                    setExpiredPassportDate(personalData.foreignPassport.endDate);
                    setCheckPassport(true)
                }
            }

            let permissionData = res.data.permission
            if (permissionData !== null) {
                setWorkPermissionSerial(permissionData.series);
                setWorkPermissionNumber(permissionData.number);
                setWorkPermissionPeriod(permissionData.duration);
                setStartWorkPermissionDate(permissionData.startDate);
                setExpiredWorkPermissionDate(permissionData.endDate)
            }

            let contactData = res.data.contactInformation
            if (contactData !== null) {
                setEmailBusiness(contactData.businessEmail);
                setEmail(contactData.email);
                setPhoneNumber(contactData.homePhone);
                setMobileNumber1(contactData.mainMobile);
                setMobileNumber2(contactData.secondaryMobile);
                setBusinessPhone(contactData.businessPhone);
                setBusinessInternalPhone(contactData.internalPhone);
                setCheckAddress(contactData.sameAddress);
                setContactData(true)
                /*livingAddress*/
                if (contactData.livingAddress !== null) {
                    setCountry(contactData.livingAddress.country !== null ? contactData.livingAddress.country.name : null);
                    setCity(contactData.livingAddress.city !== null ? contactData.livingAddress.city.name : null);
                    setRegion(contactData.livingAddress.district !== null ? contactData.livingAddress.district.name : null);
                    setSettlement(contactData.livingAddress.village);
                    setStreet(contactData.livingAddress.street);
                    setBlock(contactData.livingAddress.block);
                    setApartment(contactData.livingAddress.apartment);
                    setHome(contactData.livingAddress.home);
                    setLivingData(true)
                }
                /*registeredAddress*/
                if (contactData.registeredAddress !== null) {
                    setRegCountry(contactData.registeredAddress.country !== null ? contactData.registeredAddress.country.name : null);
                    setRegCity(contactData.registeredAddress.city !== null ? contactData.registeredAddress.city.name : null);
                    setRegRegion(contactData.registeredAddress.district !== null ? contactData.registeredAddress.district.name : null);
                    setRegSettlement(contactData.registeredAddress.village);
                    setRegStreet(contactData.registeredAddress.street);
                    setRegBlock(contactData.registeredAddress.block);
                    setRegApartment(contactData.registeredAddress.apartment);
                    setRegHome(contactData.registeredAddress.home);
                    setRegisteredData(true)
                }
            }

            let businessData = res.data.businessInformationSet
            let companyIntArr = [], companyExtArr = [];

            if (businessData.length > 0) {
                for (let i of businessData) {
                    i.businessStatus == 'Daxili' ? companyIntArr.push(i) : companyExtArr.push(i)

                }

                setCompanyIntArr(companyIntArr);
                setCompanyExtArr(companyExtArr)
            }

            let educationData = res.data.educationInformation
            if (educationData.certificates.length > 0)
                setCertificateArr(educationData.certificates)
            if (educationData.driverLicence !== null) {
                setExpiredDriverLicenceDate(educationData.driverLicence.endDate);
                setDriverLicence(educationData.driverLicence.category);
                setDriverData(true)
            }
            if (educationData.academicDegree !== null) {
                setStartAcademicDegreeDate(educationData.academicDegree.givenDate);
                setAcademicDegreeNumber(educationData.academicDegree.number);
                setAcademicDegreeOrganization(educationData.academicDegree.organization);
                setAcademicDegData(true)
            }
            setCheckEducation(educationData.higherEducation);
            if (educationData.universities.length > 0)
                setUniversityArr(educationData.universities);

            let data = res.data
            setDepartment(data.department);
            setSubDepartment(data.subDepartment);
            setPosition(data.position);
            if (data.familyMembers.length > 0) {
                setFamilyMemberArr(data.familyMembers)
            }
            setCheckPrisoner(data.prisoner);
            setCheckColleague(data.allianceMember);
            setWarrantyNumber(data.sicNo);
            setQuota((data.quotas).join(' , '));
            if (data.honoraryAchievements.length > 0)
                setRewardArr(data.honoraryAchievements);

        });
    }

    const getOperation = (page) => {
        mainAxios({
            method: 'get',
            url: `/employees/${id}/operations`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                page: page - 1,
                size: recordSize,
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

    const getVacation = () => {
        mainAxios({
            method: 'get',
            url: '/vacations/period/' + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
                setVacation(res.data)
            }
        );
    }


    useEffect(() => {
        getEmployeeInfo();
        getVacation()
        getOperation(1)
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
                        <Tab eventKey="general" title="Ümumi məlumatlar">
                            <div className="block">
                                <div className="flex view-top">
                                    <div className="upload-content flex-start">
                                        <div className="upload-img">
                                            <Image src={photo ? photo : userImage}/>
                                        </div>
                                        <div className="user-data">
                                            <p className="user-name">{fullName}</p>
                                            <p className="user-department">{department}</p>
                                            <p className="user-department">{subDepartment}</p>
                                            <p className="user-position">{position}</p>
                                        </div>
                                    </div>
                                    <Link to={{
                                        pathname: `/employee/edit/${id}`,
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
                                            Şəxsiyyət vəsiqəsi forması
                                        </div>
                                        <div className="card">
                                            <div className="card-item flex-start">
                                                <div className="card-title">
                                                    Ailə vəziyyəti *
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
                                                    {idCardNumber}
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
                                                    Şəxsiy. vəs. verən orqan
                                                </div>
                                                <div className="card-text">
                                                    {idCardOrganization}
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
                                                    Şəxsiy. vəs. qüvvədə olma tarixi
                                                </div>
                                                <div className="card-text">
                                                    {expiredIdDate}
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
                                            {
                                                showMilitary ?
                                                    <div className="card-item flex-start">
                                                        <div className="card-title">
                                                            Hərbi Status
                                                        </div>
                                                        <div className="card-text">
                                                            {militaryStatus}
                                                        </div>
                                                    </div>
                                                    : null
                                            }
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
                                                            Seriyası
                                                        </div>
                                                        <div className="card-text">
                                                            {workPermissionSerial}
                                                        </div>
                                                    </div>
                                                    <div className="card-item flex-start">
                                                        <div className="card-title">
                                                            Nömrəsi
                                                        </div>
                                                        <div className="card-text">
                                                            {workPermissionNumber}
                                                        </div>
                                                    </div>
                                                    <div className="card-item flex-start">
                                                        <div className="card-title">
                                                            İş icazəsinin müddəti
                                                        </div>
                                                        <div className="card-text">
                                                            {workPermissionPeriod}
                                                        </div>
                                                    </div>
                                                    <div className="card-item flex-start">
                                                        <div className="card-title">
                                                            Verilmə tarixi
                                                        </div>
                                                        <div className="card-text">
                                                            {startWorkPermissionDate}
                                                        </div>
                                                    </div>
                                                    <div className="card-item flex-start">
                                                        <div className="card-title">
                                                            Bitmə tarixi
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
                                            {
                                                checkPassport ?
                                                    <div className="card-in">
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Seriya və nömrə
                                                            </div>
                                                            <div className="card-text">
                                                                {passportNumber}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Verilmə tarixi
                                                            </div>
                                                            <div className="card-text">
                                                                {startPassportDate}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Bitmə tarixi
                                                            </div>
                                                            <div className="card-text">
                                                                {expiredPassportDate}
                                                            </div>
                                                        </div>
                                                    </div>
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
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="contact" title="Ünvan və əlaqə">
                            <div className="block">
                                <div className="flex view-top">
                                    <div className="upload-content flex-start">
                                        <div className="upload-img">
                                            <Image src={photo ? photo : userImage}/>
                                        </div>
                                        <div className="user-data">
                                            <p className="user-name">{fullName}</p>
                                            <p className="user-department">{department}</p>
                                            <p className="user-department">{subDepartment}</p>
                                            <p className="user-position">{position}</p>
                                        </div>
                                    </div>
                                    <Link to={{
                                        pathname: `/employee/edit/${id}`,
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
                                            Ünvan
                                        </div>
                                        <div className="card">
                                            {
                                                livingData ?
                                                    <div className="card-in">
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Ölkə
                                                            </div>
                                                            <div className="card-text">
                                                                {country}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Şəhər
                                                            </div>
                                                            <div className="card-text">
                                                                {city}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Rayon
                                                            </div>
                                                            <div className="card-text">
                                                                {region}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Qəsəbə
                                                            </div>
                                                            <div className="card-text">
                                                                {settlement}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Küçə
                                                            </div>
                                                            <div className="card-text">
                                                                {street}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Məhəllə
                                                            </div>
                                                            <div className="card-text">
                                                                {block}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Mənzil
                                                            </div>
                                                            <div className="card-text">
                                                                {apartment}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Ev
                                                            </div>
                                                            <div className="card-text">
                                                                {home}
                                                            </div>
                                                        </div>
                                                    </div>
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
                                    {
                                        checkAddress ?
                                            <div className="block-inn">
                                                <div className="block-title">
                                                    Daimi Qeydiyyata olduğu ünvanla eynidir
                                                </div>
                                            </div>
                                            :
                                            <div className="block-inn">
                                                <div className="block-title">
                                                    Daimi Qeydiyyata olduğu ünvan
                                                </div>
                                                <div className="card">
                                                    {
                                                        registeredData ?
                                                            <div className="card-in">
                                                                <div className="card-item flex-start">
                                                                    <div className="card-title">
                                                                        Ölkə
                                                                    </div>
                                                                    <div className="card-text">
                                                                        {regCountry}
                                                                    </div>
                                                                </div>
                                                                <div className="card-item flex-start">
                                                                    <div className="card-title">
                                                                        Şəhər
                                                                    </div>
                                                                    <div className="card-text">
                                                                        {regCity}
                                                                    </div>
                                                                </div>
                                                                <div className="card-item flex-start">
                                                                    <div className="card-title">
                                                                        Rayon
                                                                    </div>
                                                                    <div className="card-text">
                                                                        {regRegion}
                                                                    </div>
                                                                </div>
                                                                <div className="card-item flex-start">
                                                                    <div className="card-title">
                                                                        Qəsəbə
                                                                    </div>
                                                                    <div className="card-text">
                                                                        {regSettlement}
                                                                    </div>
                                                                </div>
                                                                <div className="card-item flex-start">
                                                                    <div className="card-title">
                                                                        Küçə
                                                                    </div>
                                                                    <div className="card-text">
                                                                        {regStreet}
                                                                    </div>
                                                                </div>
                                                                <div className="card-item flex-start">
                                                                    <div className="card-title">
                                                                        Məhəllə
                                                                    </div>
                                                                    <div className="card-text">
                                                                        {regBlock}
                                                                    </div>
                                                                </div>
                                                                <div className="card-item flex-start">
                                                                    <div className="card-title">
                                                                        Mənzil
                                                                    </div>
                                                                    <div className="card-text">
                                                                        {regApartment}
                                                                    </div>
                                                                </div>
                                                                <div className="card-item flex-start">
                                                                    <div className="card-title">
                                                                        Ev
                                                                    </div>
                                                                    <div className="card-text">
                                                                        {regHome}
                                                                    </div>
                                                                </div>
                                                            </div>
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
                                    }
                                    <div className="block-inn">
                                        <div className="block-title">
                                            Əlaqə vasitələri
                                        </div>
                                        <div className="card">
                                            {
                                                contactData ?
                                                    <div className="card-in">
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Ev nömrəsi
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
                                                                Mobil nömrəsi 2
                                                            </div>
                                                            <div className="card-text">
                                                                {mobileNumber2}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                İş nömrəsi
                                                            </div>
                                                            <div className="card-text">
                                                                {businessPhone}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                İş nömrəsi ( daxili)
                                                            </div>
                                                            <div className="card-text">
                                                                {businessInternalPhone}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                E-mail ünvanı (şəxsi)
                                                            </div>
                                                            <div className="card-text">
                                                                {email}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                E-mail ünvanı (iş)
                                                            </div>
                                                            <div className="card-text">
                                                                {emailBusiness}
                                                            </div>
                                                        </div>
                                                    </div>
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
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="education" title="Təhsil m.">
                            <div className="block">
                                <div className="flex view-top">
                                    <div className="upload-content flex-start">
                                        <div className="upload-img">
                                            <Image src={photo ? photo : userImage}/>
                                        </div>
                                        <div className="user-data">
                                            <p className="user-name">{fullName}</p>
                                            <p className="user-department">{department}</p>
                                            <p className="user-department">{subDepartment}</p>
                                            <p className="user-position">{position}</p>
                                        </div>
                                    </div>
                                    <Link to={{
                                        pathname: `/employee/edit/${id}`,
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
                                <div className="block-inn">
                                    <div className="block-title">
                                        Təhsil bölməsi
                                    </div>
                                    <div className="card">
                                        <div className="radio-content-in">
                                            <div className="flex-start">
                                                <div className="radio-block">
                                                    <label className="radio-label">
                                                        <input type="radio" name="education"
                                                               checked={!checkEducation}
                                                               readOnly={true}
                                                        />
                                                        <span className="radio-mark"></span>
                                                    </label>
                                                    <span className="radio-title">Orta təhsilli</span>
                                                </div>
                                                <div className="radio-block">
                                                    <label className="radio-label">
                                                        <input type="radio" name="education"
                                                               checked={checkEducation}
                                                               readOnly={true}
                                                        />
                                                        <span className="radio-mark"></span>
                                                    </label>
                                                    <span className="radio-title">Ali təhsilli </span>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            universityArr.length > 0 ?
                                                universityArr.map((item, index) =>
                                                    <div className="card-in" key={index}>
                                                        {
                                                            index === 0 ? null :
                                                                <div className="add-item-top">
                                                                    <p className="m-0"> #{index + 1}. Digər </p>
                                                                </div>
                                                        }
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Təhsil dərəcəsi
                                                            </div>
                                                            <div className="card-text">
                                                                {item.degree}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Təhsil müəssəsinin adı
                                                            </div>
                                                            <div className="card-text">
                                                                {
                                                                    item.institution !== null ?
                                                                        item.institution.name
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Fakültə
                                                            </div>
                                                            <div className="card-text">
                                                                {item.faculty}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                İstiqamət
                                                            </div>
                                                            <div className="card-text">
                                                                {item.direction}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                İxtisas
                                                            </div>
                                                            <div className="card-text">
                                                                {item.speciality}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Daxil olma tarixi
                                                            </div>
                                                            <div className="card-text">
                                                                {item.entranceDate}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Bitmə tarixi
                                                            </div>
                                                            <div className="card-text">
                                                                {item.graduateDate}
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Sənədin nömrəsi
                                                            </div>
                                                            <div className="card-text">
                                                                {
                                                                    item.diploma !== null ?
                                                                        item.diploma.number
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Sənədin verilmə tarixi
                                                            </div>
                                                            <div className="card-text">
                                                                {
                                                                    item.diploma !== null ?
                                                                        item.diploma.givenDate
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Təhsil forması
                                                            </div>
                                                            <div className="card-text">
                                                                {item.educationType}
                                                            </div>
                                                        </div>
                                                        {
                                                            item.abroadStudyNo !== null ?
                                                                <div className="card-item flex-start">
                                                                    <div className="card-title">
                                                                        Nostrifikasiya şəhadətnaməsinin nömrəsi
                                                                    </div>
                                                                    <div className="card-text">
                                                                        {item.abroadStudyNo}
                                                                    </div>
                                                                </div>
                                                                : null
                                                        }
                                                    </div>
                                                )
                                                : null
                                        }
                                    </div>
                                </div>
                                <div className="block-inn">
                                    <div className="block-title">
                                        Sertifikat ( vəsiqə)
                                    </div>
                                    <div className="card">
                                        {
                                            certificateArr.length > 0 ?
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
                                                                {
                                                                    item.certificate !== null ?
                                                                        item.name
                                                                        : null
                                                                }
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
                                        Sürücülük vəsiqəsi
                                    </div>
                                    <div className="card">
                                        {
                                            driverData ?
                                                <div className="card-in">
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
                                        Elmi dərəcə
                                    </div>
                                    <div className="card">
                                        {
                                            academicDegData ?
                                                <div className="card-in">
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
                            </div>
                        </Tab>
                        <Tab eventKey="company" title="Əmək fəaliyyəti">
                            <div className="block">
                                <div className="form-list">
                                    <div className="flex view-top">
                                        <div className="upload-content flex-start">
                                            <div className="upload-img">
                                                <Image src={photo ? photo : userImage}/>
                                            </div>
                                            <div className="user-data">
                                                <p className="user-name">{fullName}</p>
                                                <p className="user-department">{department}</p>
                                                <p className="user-department">{subDepartment}</p>
                                                <p className="user-position">{position}</p>
                                            </div>
                                        </div>
                                        <Link to={{
                                            pathname: `/employee/edit/${id}`,
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
                                    <div className="block-inn">
                                        <div className="block-title">
                                            Limana qədər əmək fəaliyyəti barədə məlumatlar
                                        </div>

                                        <div className="card inner-tab flex-vertical-center">
                                            {
                                                companyExtArr.length == 0 && companyIntArr.length == 0 ?
                                                    <div className="card-in">
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Məlumat yoxdur
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <Tabs activeKey={tab} onSelect={(k) => setTab(k)}>
                                                        <Tab eventKey="internal" title="Daxili">
                                                            {
                                                                companyIntArr.length > 0 ?
                                                                    companyIntArr.map((item, index) =>
                                                                        <div className="card-in" key={index}>
                                                                            {
                                                                                index === 0 ? null :
                                                                                    <div className="add-item-top">
                                                                                        <p className="m-0"> #{index + 1}.
                                                                                            Digər </p>
                                                                                    </div>
                                                                            }
                                                                            <div className="radio-content">
                                                                                <h5>Əsas iş yeridir yoxsa əlavə iş
                                                                                    yeri?</h5>
                                                                                <div className="flex-start">
                                                                                    <div className="radio-block">
                                                                                        <label className="radio-label">
                                                                                            <input type="radio"
                                                                                                   name={`${index}radioInt`}
                                                                                                   checked={item.mainJob}
                                                                                                   readOnly={true}/>
                                                                                            <span
                                                                                                className="radio-mark"></span>
                                                                                        </label>
                                                                                        <span
                                                                                            className="radio-title">Əsas iş yeri</span>
                                                                                    </div>
                                                                                    <div className="radio-block">
                                                                                        <label className="radio-label">
                                                                                            <input type="radio"
                                                                                                   name={`${index}radio`}
                                                                                                   checked={!item.mainJob}
                                                                                                   readOnly={true}/>
                                                                                            <span
                                                                                                className="radio-mark"></span>
                                                                                        </label>
                                                                                        <span
                                                                                            className="radio-title">Əlavə iş yeri</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-item flex-start">
                                                                                <div className="card-title">
                                                                                    İşçinin işlədiyi şirkət
                                                                                </div>
                                                                                <div className="card-text">
                                                                                    {item.company}
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-item flex-start">
                                                                                <div className="card-title">
                                                                                    Struktur bölmə
                                                                                </div>
                                                                                <div className="card-text">
                                                                                    {item.department}
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-item flex-start">
                                                                                <div className="card-title">
                                                                                    İşçinin işlədiyi vəzifə
                                                                                </div>
                                                                                <div className="card-text">
                                                                                    {item.position}
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-item flex-start">
                                                                                <div className="card-title">
                                                                                    Alt struktur bölmə
                                                                                </div>
                                                                                <div className="card-text">
                                                                                    {item.subDepartment}
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-item flex-start">
                                                                                <div className="card-title">
                                                                                    İşə qəbul tarixi
                                                                                </div>
                                                                                <div className="card-text">
                                                                                    {item.startDate}
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-item flex-start">
                                                                                <div className="card-title">
                                                                                    İşdən azad tarixi
                                                                                </div>
                                                                                <div className="card-text">
                                                                                    {item.endDate}
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-item flex-start">
                                                                                <div className="card-title">
                                                                                    İşdən azad olma maddəsi
                                                                                </div>
                                                                                <div className="card-text">
                                                                                    {item.firedReason}
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
                                                        </Tab>
                                                        <Tab eventKey="external" title="Xarici">
                                                            {
                                                                companyExtArr.length > 0 ?
                                                                    companyExtArr.map((item, index) =>
                                                                        <div className="card-in" key={index}>
                                                                            {
                                                                                index === 0 ? null :
                                                                                    <div className="add-item-top">
                                                                                        <p className="m-0"> #{index + 1}.
                                                                                            Digər </p>
                                                                                    </div>
                                                                            }
                                                                            <div className="radio-content">
                                                                                <h5>Əsas iş yeridir yoxsa əlavə iş
                                                                                    yeri?</h5>
                                                                                <div className="flex-start">
                                                                                    <div className="radio-block">
                                                                                        <label className="radio-label">
                                                                                            <input type="radio"
                                                                                                   name={`${index}radioExt`}
                                                                                                   checked={item.mainJob}
                                                                                                   readOnly={true}/>
                                                                                            <span
                                                                                                className="radio-mark"></span>
                                                                                        </label>
                                                                                        <span
                                                                                            className="radio-title">Əsas iş yeri</span>
                                                                                    </div>
                                                                                    <div className="radio-block">
                                                                                        <label className="radio-label">
                                                                                            <input type="radio"
                                                                                                   name={`${index}radio`}
                                                                                                   checked={!item.mainJob}
                                                                                                   readOnly={true}/>
                                                                                            <span
                                                                                                className="radio-mark"></span>
                                                                                        </label>
                                                                                        <span
                                                                                            className="radio-title">Əlavə iş yeri</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-item flex-start">
                                                                                <div className="card-title">
                                                                                    İşçinin işlədiyi şirkət
                                                                                </div>
                                                                                <div className="card-text">
                                                                                    {item.company}
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-item flex-start">
                                                                                <div className="card-title">
                                                                                    Struktur bölmə
                                                                                </div>
                                                                                <div className="card-text">
                                                                                    {item.department}
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-item flex-start">
                                                                                <div className="card-title">
                                                                                    İşçinin işlədiyi vəzifə
                                                                                </div>
                                                                                <div className="card-text">
                                                                                    {item.position}
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-item flex-start">
                                                                                <div className="card-title">
                                                                                    Alt struktur bölmə
                                                                                </div>
                                                                                <div className="card-text">
                                                                                    {item.subDepartment}
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-item flex-start">
                                                                                <div className="card-title">
                                                                                    İşə qəbul tarixi
                                                                                </div>
                                                                                <div className="card-text">
                                                                                    {item.startDate}
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-item flex-start">
                                                                                <div className="card-title">
                                                                                    İşdən azad tarixi
                                                                                </div>
                                                                                <div className="card-text">
                                                                                    {item.endDate}
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-item flex-start">
                                                                                <div className="card-title">
                                                                                    İşdən azad olma maddəsi
                                                                                </div>
                                                                                <div className="card-text">
                                                                                    {item.firedReason}
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
                                                        </Tab>
                                                    </Tabs>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="bank" title="Bank m.">
                            <div className="block">
                                <Form className="form-list">
                                    <div className="flex view-top">
                                        <div className="upload-content flex-start">
                                            <div className="upload-img">
                                                <Image src={photo ? photo : userImage}/>
                                            </div>
                                            <div className="user-data">
                                                <p className="user-name">{fullName}</p>
                                                <p className="user-department">{department}</p>
                                                <p className="user-department">{subDepartment}</p>
                                                <p className="user-position">{position}</p>
                                            </div>
                                        </div>
                                        <Link to={{
                                            pathname: `/employee/edit/${id}`,
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
                                    <div className="add-block">
                                        <div className="block-inn">
                                            <div className="block-title">
                                                Bank haqqında məlumatlar
                                            </div>
                                            <div className="card">
                                                <div className="card-item flex-start">
                                                    <div className="card-title">
                                                        Bank hesabı
                                                    </div>
                                                    <div className="card-text">
                                                        {bankAccount}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </Tab>
                        <Tab eventKey="other" title="Digər məlumatlar">
                            <div className="block">
                                <div className="form-list">
                                    <div className="flex view-top">
                                        <div className="upload-content flex-start">
                                            <div className="upload-img">
                                                <Image src={photo ? photo : userImage}/>
                                            </div>
                                            <div className="user-data">
                                                <p className="user-name">{fullName}</p>
                                                <p className="user-department">{department}</p>
                                                <p className="user-department">{subDepartment}</p>
                                                <p className="user-position">{position}</p>
                                            </div>
                                        </div>
                                        <Link to={{
                                            pathname: `/employee/edit/${id}`,
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
                                    <div className="block-inn">
                                        <div className="block-title">
                                            Dövlət təltifləri, fəxri adlar
                                        </div>
                                        <div className="card">
                                            {
                                                rewardArr.length > 0 ?
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
                                                                    {item.honoraryDecree !== null ? item.honoraryDecree.name : null}
                                                                </div>
                                                            </div>
                                                            <div className="card-item flex-start">
                                                                <div className="card-title">
                                                                    Təltifi verən orqanın adı
                                                                </div>
                                                                <div className="card-text">
                                                                    {item.organization !== null ? item.organization.name : null}
                                                                </div>
                                                            </div>
                                                            <div className="card-item flex-start">
                                                                <div className="card-title">
                                                                    Təltifin verilmə tarixi
                                                                </div>
                                                                <div className="card-text">
                                                                    {item.givenDate}
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
                                            Sosial sığorta şəhadətnaməsi
                                        </div>
                                        <div className="card">
                                            {
                                                warrantyNumber == null && quota.length === 0 ?
                                                    <div className="card-in">
                                                        <div className="card-item flex-start">
                                                            <div className="card-title">
                                                                Məlumat yoxdur
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="card-in">
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
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="block-inn">
                                        <div className="block-title">
                                            Ailə tərkibi haqqında
                                        </div>
                                        <div className="card">
                                            {
                                                familyMemberArr.length > 0 ?
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
                                        <div className="card">
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
                                                                               readOnly={true}/>
                                                                        <span className="radio-mark"></span>
                                                                    </label>
                                                                    <span className="radio-title">Bəli</span>
                                                                </div>
                                                                <div className="radio-block">
                                                                    <label className="radio-label">
                                                                        <input type="radio" name="prisoner"
                                                                               readOnly={true}
                                                                               checked={!checkPrisoner}/>
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
                                                                               readOnly={true}/>
                                                                        <span className="radio-mark"></span>
                                                                    </label>
                                                                    <span className="radio-title">Bəli</span>
                                                                </div>
                                                                <div className="radio-block">
                                                                    <label className="radio-label">
                                                                        <input type="radio" name="colleague"
                                                                               checked={!checkColleague}
                                                                               readOnly={true}/>
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
                                                                                  strokeLinecap="round"
                                                                                  strokeLinejoin="round"/>
                                                                            <path d="M8.25 11.6875H13.75"
                                                                                  stroke="#040647"
                                                                                  strokeLinecap="round"
                                                                                  strokeLinejoin="round"/>
                                                                            <path d="M8.25 14.4375H13.75"
                                                                                  stroke="#040647"
                                                                                  strokeLinecap="round"
                                                                                  strokeLinejoin="round"/>
                                                                        </svg>

                                                                    </Button>
                                                                </li>
                                                                {
                                                                    item.statusAz === 'Təsdiq gözləyir' ?
                                                                        <li>
                                                                            <Button className="btn-cancel"
                                                                                    onClick={() => changeStatus('REJECTED', item.id)}>
                                                                                <svg width="14" height="14"
                                                                                     viewBox="0 0 12 12"
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
                                                                                <svg width="16" height="12"
                                                                                     viewBox="0 0 16 12"
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
                        <Tab eventKey="vacation" title="Məzuniyyət">
                            <div className="block">
                                <div className="table-striped">
                                    <Table  responsive="sm">
                                        <thead>
                                        <tr>
                                            <th>İş ili dövrü</th>
                                            <th>Əsas məz.</th>
                                            <th>Staja görə</th>
                                            <th>Kollektiv məz. görə</th>
                                            <th>Uşağa görə</th>
                                            <th>Əmək şərait. görə</th>
                                            <th>Borca görə</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            vacation.length > 0 ?
                                                vacation.map((item, index) =>
                                                    <tr key={index}>
                                                        <td>{item.startDate} - {item.endDate}</td>
                                                        <td>{item.main} {item.approvedVacation.MAIN !== undefined ? ` - ${item.approvedVacation.MAIN}` : ''} </td>
                                                        <td>{item.experience} {item.approvedVacation.EXPERIENCE !== undefined ? ` - ${item.approvedVacation.EXPERIENCE}` : ''}</td>
                                                        <td>{item.collectiveAgreement} {item.approvedVacation.AGREEMENT !== undefined ? ` - ${item.approvedVacation.AGREEMENT}` : ''}</td>
                                                        <td>{item.children} {item.approvedVacation.CHILD !== undefined ? ` - ${item.approvedVacation.CHILD}` : ''}</td>
                                                        <td>{item.workCondition} {item.approvedVacation.CONDITIONAL !== undefined ? ` - ${item.approvedVacation.CONDITIONAL}` : ''}</td>
                                                        <td>{item.debt} {item.approvedVacation.DEBT !== undefined ? ` - ${item.approvedVacation.DEBT}` : ''}</td>
                                                    </tr>
                                                )
                                                :
                                                <tr>
                                                    <td colSpan={6}>
                                                        <p className="text-center m-0">Məlumat
                                                            yoxdur</p>
                                                    </td>
                                                </tr>
                                        }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="salary" title="Əmək haqqı">
                            <div className="block">
                            </div>
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        </Aux>

    );
}

export default ViewEmployee
