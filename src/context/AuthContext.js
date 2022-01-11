import React, {createContext, useState} from 'react';

export const AuthContext = createContext({})

function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState({
        isAuth: true,
        user: 'paulusbakker'
    });

    function login(userid) {
        toggleIsAuth({isAuth: true, user: userid})
    }

    function logout() {
        toggleIsAuth({isAuth: false, userid: ''})
    }

    const authData = {
        isAuth,
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