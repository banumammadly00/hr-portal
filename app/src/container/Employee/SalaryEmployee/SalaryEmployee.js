import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Table, Container, Button, Form} from 'react-bootstrap';
import {mainAxios} from "../../../components/Axios/axios";
import Paginate from "../../../components/Pagination/Pagination";
import Select from "react-select";
import {customStyles} from "../../../components/Select/SelectStyle";


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
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [yearOptions, setYearOptions] = useState([]);

    const [selectedYear, setSelectedYear] = useState(currentYear);

    const [loading, setLoading] = useState(false)

    const getSalary = (page) => {
       if(selectedMonth == currentMonth) {
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
               }
           }).then((res) => {
               setLoading(false)
               setCurrentPage(page)
               setSalary(res.data.content);
               setTotalRecord(res.data.totalElements);
           });
       }

       else {
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
                   month: selectedMonth
               }
           }).then((res) => {
               setLoading(false)
               setCurrentPage(page)
               setSalary(res.data.content);
               setTotalRecord(res.data.totalElements);
           });
       }
    }

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
                                </div>
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            defaultValue={monthOptions[currentMonth - 1]}
                                            value={selectedMonth.label}
                                            placeholder="Month"
                                            onChange={(val) => {
                                                val = val.value
                                                setSelectedMonth(val);
                                            }}
                                            options={monthOptions}
                                            styles={customStyles}
                                            isSearchable={false}
                                            getOptionLabel={(option) => option.label}
                                        />
                                    </Form.Group>

                                </div>
                            </div>
                            <Button className="btn-main" onClick={() => getSalary(1)}>
                                Hesabla
                            </Button>
                        </div>
                    </div>

                    <div className="block">
                        <Table responsive="sm" hover className={["m-0", loading ? 'active' : ''].join(' ')}>
                            <tbody>

                            </tbody>
                            <thead>
                            <tr>
                                <th>S.A.A</th>
                                <th>Gross</th>
                                <th>Net</th>
                                <th>Yekun əmək h.</th>
                                <th>D.S.M.F</th>
                                <th>Həmkarlar</th>
                                <th>Gəlir verg.</th>
                                <th>Tibbi sığorta</th>
                                <th>İşsizlik </th>
                                <th>İş. gün. sayı</th>
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
                                            <td>{item.salaryDetails !==null ? item.salaryDetails.medicalInsuranceTax : null}</td>
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
