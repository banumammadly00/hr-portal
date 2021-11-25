import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Table, Container, Col, Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {mainAxios} from "../../../components/Axios/axios";
import {useHistory} from "react-router-dom";
import Paginate from "../../../components/Pagination/Pagination";
import Select from "react-select";

function StaffSchedule() {
    const history = useHistory();
    const [vacancy, setVacancy] = useState([]);
    const [position, setPosition] = useState([]);
    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordSize, setRecordSize] = useState(15)

    /*filter*/

    const [department, setDepartment] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [subDepartment, setSubDepartment] = useState([]);
    const [selectedSubDepartment, setSelectedSubDepartment] = useState(null)
    const [selectedPosition, setSelectedPosition] = useState(null)
    const [showFilter, setShowFilter] = useState(false);

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
                backgroundColor: '#FFF',
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

        indicatorsContainer: (provided) => ({
            ...provided,
            paddingRight: '8px'
        }),

        control: (provided) => ({
            ...provided,
            minHeight: '44px',
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
            padding: '2px 8px 2px 16px'
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

    const handleRowClick = (item) => {
        history.push(`/staff/view/${item.id}`);
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
            //console.log(departmentArr)
        });
    }

    const getSubDepartments = (id) => {
        if (id !== undefined) {
            mainAxios({
                method: 'get',
                url: `/departments/${id}/sub-departments`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }).then((res) => {
                setSubDepartment(res.data)
            });
        } else {
            mainAxios({
                method: 'get',
                url: '/sub-departments',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }).then((res) => {
                setSubDepartment(res.data)
            });
        }
    }

    const resetFilter = () => {
        setSelectedSubDepartment(null);
        setSelectedPosition(null);
        setSelectedDepartment(null);
        getVacancy(1)
    }


    const getPosition = () => {
        mainAxios({
            method: 'get',
            url: '/positions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        }).then((res) => {
            setPosition(res.data)
        });
    }

    const getVacancy = (page, depart, subDepart, position) => {
        mainAxios({
            method: 'get',
            url: '/vacancies',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                page: page - 1,
                size: recordSize,
                departmentId: depart,
                subDepartmentId: subDepart,
                positionId: position,
            }
        }).then((res) => {
            setCurrentPage(page);
            setVacancy(res.data.content);
            setTotalRecord(res.data.totalElements)
        });
    }

    useEffect(() => {
        getPosition();
        getDepartment();
        getSubDepartments();
        getVacancy(1)
    }, []);

    return (
        <Aux>
            <div className="staff">
                <Container fluid>
                    <div className="title-block flex">
                        <div className="title">
                            Ştat cədvəli
                        </div>
                        <div className="btn-block flex-end" onClick={() => {
                            setShowFilter(!showFilter)
                        }}>
                            <button type="button" className="btn-border">
                                <svg width="16" height="18" viewBox="0 0 16 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.7099 2.90769C15.7145 2.89385 15.7053 2.88 15.7053 2.86615V0.461538C15.7145 0.216923 15.5206 0.00923077 15.2714 0C15.2668 0 15.2622 0 15.2576 0H0.732947C0.488331 0 0.285254 0.203077 0.28987 0.447692C0.28987 0.452308 0.28987 0.456923 0.28987 0.461538V2.86615C0.28987 2.88 0.280639 2.89385 0.285254 2.90769C0.285254 2.91231 0.280639 2.92154 0.285254 2.92615C0.285254 2.93538 0.285254 2.94462 0.285254 2.94923C0.285254 2.95846 0.285254 2.96308 0.28987 2.97231C0.294485 2.98154 0.294485 2.98615 0.294485 2.99077C0.294485 2.99538 0.299101 3.00462 0.299101 3.01385C0.299101 3.01846 0.303716 3.02769 0.303716 3.03231C0.308331 3.04154 0.308331 3.04615 0.312947 3.05538C0.317562 3.06 0.317562 3.06923 0.322178 3.07385C0.326793 3.07846 0.326793 3.08769 0.331408 3.09231C0.336024 3.09692 0.340639 3.10615 0.340639 3.11077C0.340639 3.11538 0.34987 3.12462 0.34987 3.12923C0.354485 3.13385 0.359101 3.14308 0.363716 3.14769C0.368331 3.15231 0.372947 3.15692 0.372947 3.16154C0.372947 3.16154 0.382178 3.16154 0.386793 3.16615L5.92064 9.67385V17.5385C5.91602 17.7138 6.01295 17.8754 6.17449 17.9538C6.23449 17.9815 6.2991 18 6.36833 18C6.47448 18 6.57602 17.9631 6.65448 17.8985L9.91295 15.2538C10.0191 15.1662 10.0791 15.0323 10.0745 14.8938V9.67385L15.6037 3.16615C15.6037 3.16615 15.6083 3.16615 15.6129 3.16154C15.6176 3.15692 15.6222 3.15231 15.6268 3.14769C15.6314 3.14308 15.636 3.13385 15.6406 3.12923C15.6453 3.12462 15.6499 3.11538 15.6545 3.11077C15.6591 3.10615 15.6637 3.09692 15.6637 3.09231C15.6683 3.08769 15.6729 3.07846 15.6729 3.07385C15.6776 3.06923 15.6776 3.06 15.6822 3.05538C15.6868 3.04615 15.6868 3.04154 15.6914 3.03231C15.696 3.02769 15.696 3.01846 15.696 3.01385C15.7006 3.00462 15.7006 3 15.7006 2.99077C15.7006 2.98154 15.7053 2.97692 15.7053 2.97231C15.7053 2.96769 15.7099 2.95846 15.7099 2.94923C15.7099 2.94 15.7145 2.93077 15.7145 2.92615C15.7145 2.92154 15.7053 2.91231 15.7099 2.90769ZM9.27141 9.20308C9.19756 9.28615 9.15602 9.39231 9.15141 9.50308V14.6723L6.84372 16.5692V9.50308C6.8391 9.39231 6.79756 9.28615 6.72372 9.20308L1.72987 3.32308H14.2653L9.27141 9.20308ZM14.7822 2.4H1.21295V0.923077H14.7822V2.4Z"
                                        fill="#040647"/>
                                </svg>
                                Filters
                            </button>
                            <Link to="/staff/create" className="btn-main">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.8346 10.8337H10.8346V15.8337H9.16797V10.8337H4.16797V9.16699H9.16797V4.16699H10.8346V9.16699H15.8346V10.8337Z"
                                        fill="white"/>
                                </svg>

                                Əlavə et
                            </Link>
                        </div>
                    </div>
                    {
                        showFilter ?
                            <div className="filter-block">
                                <div className="block flex">
                                    <div className="filter-left">
                                        <div className="filter-item">
                                            <Form.Group className="form-group m-0">
                                                <span className="input-title">Struktur vahidinin adı</span>
                                                <Select
                                                    placeholder="Struktur vahidini seçin"
                                                    value={selectedDepartment}
                                                    onChange={(val) => {
                                                        setSelectedDepartment(val);
                                                        let id = val.id;
                                                        getSubDepartments(id);
                                                        setSelectedSubDepartment(null)
                                                        let subDepartId = selectedSubDepartment !== null ? selectedSubDepartment.id : null;
                                                        let positionId = selectedPosition !== null ? selectedPosition.id : null;
                                                        getVacancy(1, id, subDepartId, positionId)
                                                    }}
                                                    isSearchable={department ? department.length > 5 ? true : false : false}
                                                    options={department}
                                                    getOptionLabel={(option) => (option.name)}
                                                    styles={customStyles}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="filter-item">
                                            <Form.Group className="form-group m-0">
                                                <span className="input-title">Struktur bölmənin adı</span>
                                                <Select
                                                    placeholder="Struktur bölməni seçin"
                                                    value={selectedSubDepartment}
                                                    onChange={(val) => {
                                                        let id = val.id
                                                        setSelectedSubDepartment(val);
                                                        let departId = selectedDepartment !== null ? selectedDepartment.id : null;
                                                        let positionId = selectedPosition !== null ? selectedPosition.id : null;
                                                        getVacancy(1, departId, id, positionId)
                                                    }}
                                                    isSearchable={subDepartment ? subDepartment.length > 5 ? true : false : false}
                                                    options={subDepartment}
                                                    getOptionLabel={(option) => (option.name)}
                                                    styles={customStyles}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="filter-item">
                                            <Form.Group className="form-group m-0">
                                                <span className="input-title">Ştat vahidinin adı</span>
                                                <Select
                                                    placeholder="Ştat vahidini seçin"
                                                    value={selectedPosition}
                                                    onChange={(val) => {
                                                        let id = val.id
                                                        setSelectedPosition(val);
                                                        let departId = selectedDepartment !== null ? selectedDepartment.id : null;
                                                        let subDepartId = selectedSubDepartment !== null ? selectedSubDepartment.id : null;
                                                        getVacancy(1, departId, subDepartId, id)
                                                    }}
                                                    isSearchable={position ? position.length > 5 ? true : false : false}
                                                    options={position}
                                                    getOptionLabel={(option) => (option.name)}
                                                    styles={customStyles}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <Button className="btn-border" onClick={() => resetFilter()}>
                                        Təmizlə
                                    </Button>
                                </div>
                            </div>
                            : null
                    }
                    <div className="block">
                        <Table responsive="sm" hover>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Struktur vahidinin adı</th>
                                <th>Struktur bölmənin adı</th>
                                <th>Ştat vahidinin adı</th>
                                <th>Ştat vahidinin sayı</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                vacancy.map((item, index) =>
                                    <tr onClick={() => handleRowClick(item)} key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.department !== null ? item.department.name : ''}</td>
                                        <td>{item.subDepartment !== null ? item.subDepartment.name : ''}</td>
                                        <td>{item.position !== null ? item.position.name : ''}</td>
                                        <td>{item.count}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                    <Paginate count={totalRecord} recordSize={recordSize} currentPage={currentPage}
                              click={(page, depart, subDepart, position) => getVacancy(page, depart, subDepart, position)}/>
                </Container>
            </div>
        </Aux>

    );
}

export default StaffSchedule
