import React, {createContext, useState} from 'react';
import {useHistory} from 'react-router-dom';

export const AuthContext = createContext({})

function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: ''
    });
    const history = useHistory();

    function getToken() {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token) {
            toggleIsAuth({isAuth: true, user: username})
        }
    }

    function login(userid, token) {
        console.log("Ingelogd")
        toggleIsAuth({isAuth: true, user: userid})
        localStorage.setItem('token', token);
        localStorage.setItem('username', userid);
        history.push('/');
        console.log("Gebruiker is ingelogd!")
    }

    function logout() {
        localStorage.clear();
        toggleIsAuth({isAuth: false, userid: ''})
        console.log("Gebruiker is uitgelogd!")
    }

    const authData = {
        isAuth,
        getToken,
        login,
        logout,
    }


    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider