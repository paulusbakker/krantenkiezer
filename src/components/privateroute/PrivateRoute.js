import React, {useContext} from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";


function PrivateRoute({children, path}) {
    const {isAuth} = useContext(AuthContext);
    return (
        <>
            {isAuth ?
                <Route path={path}>
                    {children}
                </Route> :
                <Redirect to="/"/>
            }
        </>
    )
}

export default PrivateRoute