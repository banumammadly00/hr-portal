import React, {useState} from 'react';
import Aux from '../../hoc/Auxiliary'
import ProtectedRoute from "./ProtectedRoute";
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import StaffSchedule from "../../container/Staff/StaffSchedule/StaffSchedule";
import CreateStaff from "../../container/Staff/CreateStaff/CreateStaff";
import EditStaff from "../../container/Staff/EditStaff/EditStaff";
import ViewStaff from "../../container/Staff/ViewStaff/ViewStaff";
import EmployeeSchedule from "../../container/Employee/EmployeeSchedule/EmployeeSchedule";
import EmployeeCreate from "../../container/Employee/EmployeeCreate/EmployeeCreate";
import ViewEmployee from "../../container/Employee/View/ViewEmployee";
import EditEmployee from "../../container/Employee/EditEmployee/EditEmployee";
import SalaryEmployee from "../../container/Employee/SalaryEmployee/SalaryEmployee";
import CreateOperation from "../../container/Operation/CreateOperation/CreateOperation";
import CreateSickness from "../../container/Operation/CreateSickness/CreateSickness";
import EditSickness from "../../container/Operation/EditSickness/EditSickness";
import OperationSchedule from "../../container/Operation/OperationSchedule/OperationSchedule";
import BusinessTripSchedule from "../../container/BusinessTrip/BusinessTripSchedule";
import WorkSchedule from "../../container/Work/WorkSchedule/WorkSchedule";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Setting from "../../container/Setting/Setting";

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
                        <ProtectedRoute exact path="/employee" component={EmployeeSchedule}/>
                        <ProtectedRoute path="/employee/create" component={EmployeeCreate}/>
                        <ProtectedRoute  exact path="/employee/edit/:id" component={EditEmployee}/>
                        <ProtectedRoute exact path="/employee/view/:id" component={ViewEmployee}/>
                        <ProtectedRoute path="/salaryEmployee" component={SalaryEmployee}/>
                        <ProtectedRoute exact path="/staff" component={StaffSchedule}/>
                        <ProtectedRoute exact path="/staff/edit/:id" component={EditStaff}/>
                        <ProtectedRoute path="/staff/create" component={CreateStaff}/>
                        <ProtectedRoute exact path="/staff/view/:id" component={ViewStaff}/>
                        <ProtectedRoute exact path="/operation" component={OperationSchedule}/>
                        <ProtectedRoute path="/operation/create" component={CreateOperation}/>
                        <ProtectedRoute path="/operation/sickness/create" component={CreateSickness}/>
                        <ProtectedRoute path="/operation/sickness/edit/:id" component={EditSickness}/>
                        <ProtectedRoute path="/businessTrip" component={BusinessTripSchedule}/>
                        <ProtectedRoute path="/workSchedule" component={WorkSchedule}/>
                        <ProtectedRoute path="/setting" component={Setting}/>
                    </Switch>
                </main>

            </Router>
        </Aux>
    )
}

export default Other
