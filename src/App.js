import React, {useContext, useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Navigator from './components/navigator/Navigator';
import Home from './pages/home/Home';
import SignIn from './pages/User/SignIn';
import SignUp from './pages/User/SignUp';
import Search from './pages/search/Search';
import Results from './pages/results/Results';
import './App.css';
import {AuthContext} from "./context/AuthContext.js";
import PrivateRoute from "./components/privateroute/PrivateRoute";

function App() {
    const {isAuth, getToken} = useContext(AuthContext);

    useEffect(() => {
        if (!isAuth.isAuth) {
            getToken()
        }
    }, []);

    return (
        <>
            <Navigator/>
            <Switch>
                <Route exact path="/">
                    <div className="content">
                        <Home/>
                    </div>
                </Route>
                <Route path="/search">
                    {isAuth.isAuth ? <Search/> : <Redirect to="/"/>}
                </Route>
                <PrivateRoute path="/results/:id">
                    <div className="content">
                        <Results/>
                    </div>
                </PrivateRoute>
                <Route exact path="/signin">
                    <div className="content">
                        <SignIn/>
                    </div>
                </Route>
                <Route exact path="/signup">
                    <div className="content">
                        <SignUp/>
                    </div>
                </Route>
            </Switch>

        </>
    )
        ;
}

export default App;
