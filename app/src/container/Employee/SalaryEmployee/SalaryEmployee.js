import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Table, Container, Button, Form} from 'react-bootstrap';
import {mainAxios} from "../../../components/Axios/axios";
import Paginate from "../../../components/Pagination/Pagination";
import Select from "react-select";


const monthOptions = [
    {value: 1, label: 'January'},
    {value: 2, label: 'February'},
    {value: 3, label: 'March'},
    {value: 4, label: 'April'},
    {value: 5, label: 'May'},
    {value: 6, label: 'June'},
    {value: 7, label: 'July'},
    {value: 8, label: 'August'},
    {value: 9, label: 'September'},
    {value: 10, label: 'October'},
    {value: 11, label: 'November'},
    {value: 12, label: 'December'},
]

function SalaryEmployee() {
    let currentMonth = (new Date().getMonth() + 1);
    let currentYear = (new Date().getFullYear());
    const [salary, setSalary] = useState([]);
    const [totalRecord, setTotalRecord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordSize, setRecordSize] = useState(4);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [yearOptions, setYearOptions] = useState([]);

    const [selectedYear, setSelectedYear] = useState(currentYear);

    const [loading, setLoading] = useState(false)

    const getSalary = (page) => {
        mainAxios({
            method: 'get',
            url: '/employee-salary/calculate',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                page: page - 1,
                size: recordSize,
                year: 2021,
                month: selectedMonth
            }
        }).then((res) => {
            setLoading(false)
            setCurrentPage(page)
            setSalary(res.data.data.data);
            setTotalRecord(res.data.data.totalElement);
        });
    }

    const calculate = () => {
        setLoading(true)
        getSalary(1)
    }

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: '#040647',
            backgroundColor: state.isSelected ? '#F3F8FF' : 'transparent',
            padding: '10px',
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
            justifyContent: 'center',
            position: 'relative'

        }),

        indicatorSeparator: () => {
        },

        indicatorsContainer: (provided, state) => ({
            ...provided,
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

    useEffect(() => {
        getSalary(1);
        for (let i= 2021; i<=currentYear ; i++) {
            yearOptions.push({value: i, label: i});
        }
    }, []);

    return (
        <Aux>
            <div className="staff-salary">
                <Container fluid>
                    <div className="title-block flex">
                        <div className="title">
                            Əmək haqqı hesablama
                        </div>
                        <ul className="btn-block flex-end list-unstyled m-0">
                            <li>
                                <Form.Group className="m-0 form-group">
                                    <Select
                                        defaultValue={{label: currentYear, value: currentYear}}
                                        value={selectedYear.label}
                                        placeholder="Year"
                                        onChange={(val) => {
                                            val = val.value
                                            setSelectedYear(val)
                                        }}
                                        options={yearOptions}
                                        styles={customStyles}
                                    />
                                </Form.Group>
                            </li>
                            <li>
                                <Form.Group className="m-0 form-group">
                                    <Select
                                        defaultValue={monthOptions[currentMonth - 1]}
                                        value={selectedMonth.label}
                                        placeholder="Month"
                                        onChange={(val) => {
                                            val = val.value
                                            setSelectedMonth(val)
                                        }}
                                        options={monthOptions}
                                        styles={customStyles}
                                        isSearchable={false}
                                        getOptionLabel={(option) => option.label}
                                    />
                                </Form.Group>
                            </li>
                            <li>
                                <button type="button" className="btn-main" onClick={() => calculate()}>
                                    Hesabla
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="block">
                        <Table responsive="sm" hover className={["m-0", loading ? 'active' : ''].join(' ')}>
                            <tbody>

                            </tbody>
                            <thead>
                            <tr>
                                <th>Soyadı, adı, ata adı</th>
                                <th>İşçinin vəzifəsi</th>
                                <th>İş günlərinin sayı</th>
                                <th>İşlədiyi günlərin sayı</th>
                                <th>Yekun əmək haqqı</th>
                                <th>M.D.S.S Müəssə 3%</th>
                                <th>İTS Müəssə</th>
                                <th>İşsizlik Müəssə</th>
                                <th>Gəlir vergisi</th>
                                <th>İşsizlik işçi</th>
                                <th>M.D.S.S işçi</th>
                                <th>İTS işçi</th>
                                <th>Digər</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                salary.length > 0 ?
                                    salary.map((item, index) =>
                                        <tr key={index}>
                                            <td>{item.fullName}</td>
                                            <td>{item.vacancyName}</td>
                                            <td>{item.activeDayCount}</td>
                                            <td>{item.employeeActiveDayCount}</td>
                                            <td>{item.netSalary}</td>
                                            <td>{item.positionMDSS}</td>
                                            <td>{item.positionITS}</td>
                                            <td>{item.positionUnemploymentTax}</td>
                                            <td>{item.incomingTax}</td>
                                            <td>{item.employeeUnemploymentTax}</td>
                                            <td>{item.employeeMDSS}</td>
                                            <td>{item.employeeITS}</td>
                                            <td>{item.other}</td>
                                        </tr>
                                    )
                                    : null
                            }
                            </tbody>
                        </Table>
                    </div>
                    <Paginate count={totalRecord} recordSize={recordSize} currentPage={currentPage}
                              click={(page) => getSalary(page)}/>
                </Container>
            </div>
        </Aux>

    );
}

export default SalaryEmployee
