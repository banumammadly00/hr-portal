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
    const [recordSize, setRecordSize] = useState(20);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth - 1);
    const [yearOptions, setYearOptions] = useState([]);

    const [selectedYear, setSelectedYear] = useState(currentYear);

    const [loading, setLoading] = useState(false)

    const getSalary = (page) => {
        mainAxios({
            method: 'get',
            url: '/salaries',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                page: page - 1,
                size: recordSize,
                year: 2021,
                //month: selectedMonth
            }
        }).then((res) => {
            setLoading(false)
            setCurrentPage(page)
            setSalary(res.data.content);
            setTotalRecord(res.data.totalElements);
        });
    }


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

        }),

        placeholder: (provided) => ({
            ...provided,
            width: '100%',
            textAlign: 'left',
            whiteSpace : 'nowrap'

        }),

    };


    const resetFilter = () => {
        getSalary(1)
    }

    useEffect(() => {
        getSalary(1);
        for (let i = 2021; i <= currentYear; i++) {
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
                    </div>
                    <div className="filter-block">
                        <div className="block flex">
                            <div className="filter-left">
                                <div className="filter-item">
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
                                    {/*  <Form.Group className="form-group m-0">
                                            <span className="input-title">Struktur vahidinin adı</span>
                                            <Select
                                                placeholder="Struktur vahidini seçin"
                                                onChange={(val) => {

                                                }}
                                                isSearchable={}
                                                options={}
                                                getOptionLabel={(option) => (option.name)}
                                                styles={customStyles}
                                            />
                                        </Form.Group>*/}
                                </div>
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            defaultValue={monthOptions[currentMonth - 2]}
                                            value={selectedMonth.label}
                                            placeholder="Month"
                                            onChange={(val) => {
                                                val = val.value
                                                setSelectedMonth(val);
                                                getSalary(1)
                                            }}
                                            options={monthOptions}
                                            styles={customStyles}
                                            isSearchable={false}
                                            getOptionLabel={(option) => option.label}
                                        />
                                    </Form.Group>

                                </div>
                            </div>
                            <Button className="btn-border" onClick={() => resetFilter()}>
                                Təmizlə
                            </Button>
                        </div>
                    </div>

                    <div className="block">
                        <Table responsive="sm" hover className={["m-0", loading ? 'active' : ''].join(' ')}>
                            <tbody>

                            </tbody>
                            <thead>
                            <tr>
                                <th>Soyadı, adı, ata adı</th>
                                <th>Gross</th>
                                <th>Net</th>
                                <th>Yekun əmək haqqı</th>
                                <th>D.S.M.F</th>
                                <th>Həmkarlar</th>
                                <th>Gəlir vergisi</th>
                                <th>M.D.S.S </th>
                                <th>Tibbi sığorta</th>
                                <th>Port Tax</th>
                                <th>İşsizlik </th>
                                <th>İşlədiyi günlərin sayı</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                salary.length > 0 ?
                                    salary.map((item, index) =>
                                        <tr key={index}>
                                            <td>{item.fullName}</td>
                                            <td>{item.salaryDetails !== null ? item.salaryDetails.gross : null}</td>
                                            <td>{item.salaryDetails !== null ? item.salaryDetails.net : null}</td>
                                            <td>{item.salaryDetails !==null ? item.salaryDetails.calculated : null}</td>
                                            <td>{item.salaryDetails !==null ? item.salaryDetails.dsmfTax : null}</td>
                                            <td>{item.salaryDetails !==null ? item.salaryDetails.hysTax : null}</td>
                                            <td>{item.salaryDetails !==null ? item.salaryDetails.incomingTax : null}</td>
                                            <td>{item.salaryDetails !==null ? item.salaryDetails.mdssTax : null}</td>
                                            <td>{item.salaryDetails !==null ? item.salaryDetails.medicalInsuranceTax : null}</td>
                                            <td>{item.salaryDetails !==null ? item.salaryDetails.portTax : null}</td>
                                            <td>{item.salaryDetails !==null ? item.salaryDetails.unemploymentTax : null}</td>
                                            <td>{item.salaryDetails !==null ? item.salaryDetails.workedDayCount : null}</td>
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
