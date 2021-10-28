import React from 'react'
import { Redirect, Route } from 'react-router-dom'


let ProtectedRoute = ({ component: Component, ...rest}) => {

    return <Route {...rest} render={props => {
        if (!localStorage.getItem('token')) {
            return <Redirect to={{ pathname: '/' }} />;
        } else {
            return <Component {...props} />
        }
    }} />
}

export default ProtectedRoute;
