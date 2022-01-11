import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Navigator from './components/navigator/Navigator';
import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import Search from './pages/search/Search';
import Results from './pages/results/Results';
import styles from './App.module.css';
import {AuthContext} from "./context/AuthContext.js";

function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <Navigator/>
            <div className={styles.content}>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/search">
                        {isAuth.isAuth ? <Search/> : <Redirect to="/"/>}
                    </Route>
                    <Route path="/results">
                        {isAuth.isAuth ? <Results/> : <Redirect to="/"/>}
                    </Route>
                    <Route exact path="/signin">
                        <SignIn/>
                    </Route>
                    <Route exact path="/signup">
                        <SignUp/>
                    </Route>
                </Switch>
            </div>
        </>
    );
}

export default App;
