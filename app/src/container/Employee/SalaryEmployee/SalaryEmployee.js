import React, {useState, useEffect} from 'react';
import Aux from "../../../hoc/Auxiliary";
import {Table, Container, Button, Form, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {mainAxios} from "../../../components/Axios/axios";
import Paginate from "../../../components/Pagination/Pagination";
import Select, {components} from "react-select";
import {customStyles} from "../../../components/Select/SelectStyle";
import EmptyData from "../../../components/EmptyData/EmptyData";


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

const vacancyOptions = [
    {value: 'mainSalary', label: 'Vəzifə maaşı'},
    {value: 'individualAddition', label: 'Fərdi əlavə'},
    {value: 'conditionalAddition', label: 'Fərdi əlavə %'},
]

const productionOptions = [
    {value: 'jobDayCount', label: 'Norma iş gün'},
    {value: '', label: 'Norma iş saatı'},
]

const calculationOptions = [
    {value: 'mainSalaryResult', label: 'Hesablanmış əmək haqqı (Tarif vəzifə maaşına görə)'},
    {value: 'individualAdditionResult', label: 'Fərdi əlavə (Fix məbləğ)'},
    {value: 'conditionalAdditionResult', label: 'Fərdi əlavə %'},
    {value: '', label: 'Orta aylıq əmək haqqın saxlanılması'},
    {value: 'educationVacationPay', label: 'Təhsil məzuniyyəti'},
    {value: '', label: 'Əmək məzuniyyəti'},
    {value: 'overtimeHours', label: 'Normadan artıq saatların sayı'},
    {value: 'overtimeAmount', label: 'Normadan artıq saat'},
    {value: 'nightHours', label: 'Gecə saatların sayı'},
    {value: 'nightAmount', label: 'Gecə saatı'},
    {value: 'eveningHours', label: 'Axşam saatı sayı'},
    {value: '', label: 'Axşam saatı '},
    {value: 'overtimeHolidayHours', label: 'Bayram saatı (Normadan artıq) sayı'},
    {value: 'overtimeHolidayAmount', label: 'Bayram saatı (Normadan artıq)'},
    {value: 'holidayHours', label: 'Bayram saatı (Norma daxili) sayı'},
    {value: 'holidayAmount', label: 'Bayram saatı (Norma daxili)'},
    {value: 'offDayCount', label: 'Bayram və istirahət günü işə çıxma (Günlərin sayı)'},
    {value: 'offDayAmount', label: 'Bayram və istirahət günü işə çıxma'},
    {value: '', label: 'Müvəqqəti həvalə(Maaş fərqi)'},
    {value: '', label: 'İstifadə edilməmiş məzuniyyət günlərinə görə kompensasiya'},
    {value: '', label: 'Müvəqqəti həvalə(%)'},
    {value: '', label: 'İxtisara salınmaya görə ödənişlər'},
    {value: '', label: 'Maddi yardım '},
    {value: '', label: 'Maddi yardım (ölümlə əlaqədar) '},
    {value: '', label: 'Maddi yardım (Təqaüdə gedənlər) '},
    {value: '', label: 'Mükafat'},
    {value: '', label: 'Mükafat Bayram günü ilə əlaqdəar'},
    {value: '', label: 'Yemək pulu'},
    {value: '', label: 'Xəstəlik vərəqəsi(DSMF tərəfindən)'},
    {value: '', label: 'Xəstəlik vərəqəsi(Liman tərəfindən)'},
    {value: 'totalResult', label: 'Cəmi  hesablanıb'},
]

const taxOptions = [
    {value: 'discountAmount', label: 'Güzəşt Məbləği'},
    {value: 'hysPASA', label: 'PAŞA HYS'},
    {value: 'forIncomingTax', label: 'Gəlir vergisinə cəlb olunan hissəsi'},
]

const exemptionOptions = [
    {value: 'incomingTax', label: 'Gəlir vergisi'},
    {value: 'dsmfTax', label: 'M.D.S.S 3%'},
    {value: 'unemploymentTax', label: 'İşsizlik 0,5%'},
    {value: 'medicalInsuranceTax', label: 'İTS 2%'},
    {value: 'hysTax', label: 'Limançı 2%'},
    {value: '', label: 'Paşa HYS'},
    {value: 'totalTax', label: 'Cəmi tutulub'},
]

const netExemptionOptions = [
    {value: '', label: 'Aliment (Fix)'},
    {value: '', label: 'Aliment %'},
    {value: '', label: 'Kredit %'},
    {value: '', label: 'Şəxsi borc (Fix)'},
    {value: '', label: 'Cərimə %'},
    {value: '', label: 'Yap (Fix)'},
    {value: '', label: 'Ödənilmiş məz'},
    {value: '', label: 'Ödənilmiş avans'},
    {value: '', label: 'Dsmf tərəfindən ödənilmiş XV'},
]

const employerPayOptions = [
    {value: '', label: 'M.D.S.S 22%'},
    {value: '', label: 'İşsizlik 0,5%'},
    {value: '', label: 'İTS 2%'},
    {value: '', label: 'Limançı 1%'},
]

const cols = [
    {value: 'fullName', label: 'S.A.A'},
    {value: 'workedDayCount', label: 'Faktiki iş günü'},
    {value: 'net', label: 'Net'},
    {value: 'xsa', label: 'Plastik Karta köçürülən məbləğ'},
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
    const [selectedVacancy, setSelectedVacancy] = useState([]);
    const [selectedProduction, setSelectedProduction] = useState([]);
    const [selectedCalculation, setSelectedCalculation] = useState([]);
    const [selectedTax, setSelectedTax] = useState([]);
    const [selectedExemption, setSelectedExemption] = useState([]);
    const [selectedNet, setSelectedNet] = useState([]);
    const [selectedEmployer, setSelectedEmployer] = useState([]);
    const [tableCols, setTableCols] = useState(cols);

    const [selectedYear, setSelectedYear] = useState(currentYear);

    const [loading, setLoading] = useState(false);

    let year = selectedYear !== null ? selectedYear : currentYear;
    let month = selectedMonth !== null ? selectedMonth : currentMonth;

    const Option = props => {
        return (<div>
            <components.Option {...props}>
                <label>{props.value}</label>
                {
                    props.isSelected ?
                        <span>
                            <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.8">
                                    <path
                                        d="M12.6778 0.253387C12.28 -0.108232 11.6613 -0.0798913 11.2978 0.319827L5.33596 6.88466L2.45572 3.95657C2.07552 3.57149 1.45786 3.56562 1.07376 3.94484C0.688684 4.32307 0.682818 4.94172 1.06203 5.3268L4.66743 8.99183C4.85216 9.17947 5.10234 9.28405 5.36425 9.28405C5.37012 9.28405 5.37697 9.28405 5.38283 9.28504C5.65258 9.27917 5.9067 9.16384 6.08749 8.96448L12.7441 1.63441C13.1068 1.23366 13.0775 0.615992 12.6778 0.253387Z"
                                        fill="#040647"/>
                                </g>
                            </svg>
                        </span>
                        : null
                }

                {/*<input type="checkbox" checked={props.isSelected} onChange={() => null}/>*/}
            </components.Option>
        </div>);
    };

    const getSalary = (month, year, page) => {
        let params = {
            page: page - 1,
            size: recordSize,
        };

        if (month != currentMonth || year != currentYear) {
            params.year = year;
            params.month = month
        }

        mainAxios({
            method: 'get',
            url: '/salaries',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params
        }).then((res) => {
            setLoading(false)
            setCurrentPage(page)
            setSalary(res.data.content);
            setTotalRecord(res.data.totalElements);
        });
    }


    useEffect(() => {
        getSalary(selectedMonth, selectedYear, 1);
        for (let i = 2021; i <= currentYear; i++) {
            yearOptions.push({value: i, label: i});
        }
    }, []);

    useEffect(() => {
        let arr = cols.concat(selectedVacancy, selectedProduction, selectedCalculation, selectedTax, selectedExemption, selectedNet, selectedEmployer)
        setTableCols(arr)
    }, [selectedVacancy, selectedProduction, selectedCalculation, selectedTax, selectedExemption, selectedNet, selectedEmployer])

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
                                                setSelectedYear(val);
                                                let month = selectedMonth !== null ? selectedMonth : currentMonth;
                                                getSalary(month, val, 1)
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
                                                let year = selectedYear !== null ? selectedYear : currentYear
                                                getSalary(val, year, 1)
                                            }}
                                            options={monthOptions}
                                            styles={customStyles}
                                            isSearchable={false}

                                        />
                                    </Form.Group>

                                </div>
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            placeholder="Ştat"
                                            onChange={async (val) => {
                                                setSelectedVacancy(val);
                                            }}
                                            isMulti
                                            options={vacancyOptions}
                                            styles={customStyles}
                                            isSearchable={false}
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.label}
                                            hideSelectedOptions={false}
                                            controlShouldRenderValue={false}
                                            closeMenuOnSelect={false}
                                            clearable={false}
                                            components={{Option}}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            placeholder="İstehsalat təqviminə görə"
                                            onChange={(val) => {
                                                setSelectedProduction(val);
                                            }}
                                            isMulti
                                            options={productionOptions}
                                            styles={customStyles}
                                            isSearchable={false}
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.label}
                                            hideSelectedOptions={false}
                                            controlShouldRenderValue={false}
                                            closeMenuOnSelect={false}
                                            clearable={false}
                                            components={{Option}}
                                        />
                                    </Form.Group>

                                </div>
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            placeholder="Hesablama"
                                            onChange={(val) => {
                                                setSelectedCalculation(val);
                                            }}
                                            isMulti
                                            options={calculationOptions}
                                            styles={customStyles}
                                            isSearchable={false}
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.label}
                                            hideSelectedOptions={false}
                                            controlShouldRenderValue={false}
                                            closeMenuOnSelect={false}
                                            clearable={false}
                                            components={{Option}}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            placeholder="Vergiyə cəlb olunmayan məbləğ (Güzəştlər və HYS)"
                                            onChange={(val) => {
                                                setSelectedTax(val);
                                            }}
                                            isMulti
                                            options={taxOptions}
                                            styles={customStyles}
                                            isSearchable={false}
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.label}
                                            hideSelectedOptions={false}
                                            controlShouldRenderValue={false}
                                            closeMenuOnSelect={false}
                                            clearable={false}
                                            components={{Option}}
                                        />
                                    </Form.Group>

                                </div>
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            placeholder="Tutulma"
                                            onChange={(val) => {
                                                setSelectedExemption(val);
                                            }}
                                            isMulti
                                            options={exemptionOptions}
                                            styles={customStyles}
                                            isSearchable={false}
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.label}
                                            hideSelectedOptions={false}
                                            controlShouldRenderValue={false}
                                            closeMenuOnSelect={false}
                                            clearable={false}
                                            components={{Option}}
                                        />
                                    </Form.Group>

                                </div>
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            placeholder="Netdən olan tutulmalar"
                                            onChange={(val) => {
                                                setSelectedNet(val);
                                            }}
                                            isMulti
                                            options={netExemptionOptions}
                                            styles={customStyles}
                                            isSearchable={false}
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.label}
                                            hideSelectedOptions={false}
                                            controlShouldRenderValue={false}
                                            closeMenuOnSelect={false}
                                            clearable={false}
                                            components={{Option}}
                                        />
                                    </Form.Group>

                                </div>
                                <div className="filter-item">
                                    <Form.Group className="m-0 form-group">
                                        <Select
                                            placeholder="İşəgötürən tərəfindən ödəniləcək "
                                            onChange={(val) => {
                                                setSelectedEmployer(val);
                                            }}
                                            isMulti
                                            options={employerPayOptions}
                                            styles={customStyles}
                                            isSearchable={false}
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.label}
                                            hideSelectedOptions={false}
                                            controlShouldRenderValue={false}
                                            closeMenuOnSelect={false}
                                            clearable={false}
                                            components={{Option}}
                                        />
                                    </Form.Group>

                                </div>
                            </div>
                            {/*  <Button className="btn-main" onClick={() => getSalary(1)}>
                                Hesabla
                            </Button>*/}
                        </div>
                    </div>

                    <div className="block">
                        {
                            salary.length > 0 ?
                                <Table responsive="sm" hover className={["m-0", loading ? 'active' : ''].join(' ')}>
                                    <thead>
                                    <tr>
                                        {
                                            tableCols.map((item, index) =>
                                            <th>
                                                {
                                                    item.label.length > 20 ?
                                                        <OverlayTrigger placement="top-start" overlay={<Tooltip
                                                            id="tooltip-disabled">{item.label}</Tooltip>}>
                                                            <p className="m-0 operation-name">{item.label}</p>
                                                        </OverlayTrigger>
                                                        :
                                                        <p className="m-0">{item.label}</p>

                                                }
                                            </th>
                                            )
                                        }
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        salary.map((item, index) =>
                                            <tr key={index}>
                                                {
                                                    tableCols.map((tdItem, index) =>
                                                        <td key={index}>{
                                                            tdItem.value == 'fullName' ?
                                                                item[tdItem.value]
                                                                :
                                                                item.salaryDetails[tdItem.value]
                                                        }</td>
                                                    )
                                                }
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </Table>
                                :
                                <EmptyData/>

                        }

                    </div>
                    <Paginate count={totalRecord} recordSize={recordSize} currentPage={currentPage}
                              click={(page) => getSalary(month, year, page)}/>
                </Container>
            </div>
        </Aux>

    );
}

export default SalaryEmployee
