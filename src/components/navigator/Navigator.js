import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import logo from '../../assets/trechter.png';
import styles from './Navigator.module.css';
import {useHistory, Link} from 'react-router-dom';
import Backgroundslider from "../backgroundslider/Backgroundslider";

function Navigator() {
    const history = useHistory();
    const {isAuth, logout} = useContext(AuthContext);
    return (
        <nav>
            <Backgroundslider/>
            <Link to="/">
                 <span className={styles['logo-container']}>
                     <img src={logo} alt="logo"/>
                     Kranten<br/>Filter
                 </span>
            </Link>
            {!isAuth.isAuth ?
                <div>
                    <button
                        type={styles.button}
                        onClick={() => history.push('/signin')}
                    >
                        Log in
                    </button>
                    <button
                        type={styles.button}
                        onClick={() => history.push('/signup')}
                    >
                        Registreren
                    </button>
                </div>
                :
                <div>
                    {isAuth.user}
                    <button
                        type={styles.button}
                        onClick={() => history.push('/search')}
                    >
                        Zoeken
                    </button>
                    <button
                        type={styles.button}
                        onClick={() => {
                            logout();
                            console.log('Gebruiker is uitgelogd!');
                            // history.push('/')
                        }}
                    >
                        Log uit
                    </button>
                </div>}
        </nav>
    );
}

export default Navigator;