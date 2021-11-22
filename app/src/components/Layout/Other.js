import React, {useState} from 'react';
import Aux from '../../hoc/Auxiliary'
import ProtectedRoute from "./ProtectedRoute";
import {
    BrowserRouter as Router, Route,
    Switch,
} from "react-router-dom";
import StaffSchedule from "../../container/Staff/StaffSchedule/StaffSchedule";
import CreateStaff from "../../container/Staff/CreateStaff/CreateStaff";
import EditStaff from "../../container/Staff/EditStaff/EditStaff";
import ViewStaff from "../../container/Staff/ViewStaff/ViewStaff";
import EmployeeSchedule from "../../container/Employee/EmployeeSchedule/EmployeeSchedule";
import EmployeeCreate from "../../container/Employee/EmployeeCreate/EmployeeCreate";
import ViewEmployee from "../../container/Employee/ViewEmployee/ViewEmployee";
import EditEmployee from "../../container/Employee/EditEmployee/EditEmployee";
import SalaryEmployee from "../../container/Employee/SalaryEmployee/SalaryEmployee";
import CreateOperation from "../../container/Operation/CreateOperation/CreateOperation";
import OperationSchedule from "../../container/Operation/OperationSchedule/OperationSchedule";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Setting from "../../container/Setting/Setting";
/*
import Calendar from "../../container/Setting/Calendar/Calendar";
*/
import SettingEdit from "../../container/Setting/SettingEdit/SettingEdit";

function Other () {
    const [toggle, setToggle] = useState(false);

    const toggleDrawer = () => {
        setToggle(!toggle)
    }

    return (
        <Aux>
            <Router>
                <Header/>
                <Sidebar click ={toggleDrawer} toggle ={toggle} />
                <main className={['main', toggle ? 'active' : ''].join(' ')}>
                    <Switch>
                        <Route exact path="/" component={EmployeeSchedule}/>
                        <Route path="/employee/create" component={EmployeeCreate}/>
                        <Route  exact path="/employee/edit/:id" component={EditEmployee}/>
                        <Route exact path="/employee/view/:id" component={ViewEmployee}/>
                        <Route path="/salaryEmployee" component={SalaryEmployee}/>
                        <Route exact path="/staff" component={StaffSchedule}/>
                        <Route exact path="/staff/edit/:id" component={EditStaff}/>
                        <Route path="/staff/create" component={CreateStaff}/>
                        <Route exact path="/staff/view/:id" component={ViewStaff}/>
                        <Route exact path="/operation" component={OperationSchedule}/>
                        <Route path="/operation/create" component={CreateOperation}/>
                        <Route path="/setting" component={Setting}/>
                    </Switch>
                </main>

            </Router>
        </Aux>
    )
}

export default Other
