import React from 'react';
import Aux from '../../hoc/Auxiliary'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "../../container/Login/Login";
import Other from "./Other";
import ProtectedRoute from "./ProtectedRoute";

export default class Layout extends React.Component {
    render() {
        return (
            <Aux>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <ProtectedRoute component={Other}/>
                    </Switch>
                </Router>
            </Aux>
        )
    }
}
