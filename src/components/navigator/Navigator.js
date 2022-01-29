import React, {useContext, useState} from 'react';
import {FiMenu, FiX} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import './Navigator.css';
import logo from  "../../assets/logo.png";

function Navigator() {
    const {isAuth, logout} = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const closeMenu = () => {
        setOpen(false);
    };

    return (
        <nav className="navbar">

            <Link to="/">
                <span >
                     <img className="nav-logo" src={logo} alt="logo"/>
                 </span>
            </Link>
            <div onClick={handleClick} className="nav-icon">
                {open ? <FiX/> : <FiMenu/>}
            </div>
            <ul className={open ? 'nav-links active' : 'nav-links'}>
                <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={closeMenu}>
                        Home
                    </Link>
                </li>
                {!isAuth.isAuth ?
                    <>
                        <li className="nav-item">
                            <Link to="/signin" className="nav-link" onClick={closeMenu}>
                                Log in
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link" onClick={closeMenu}>
                                Registreren
                            </Link>
                        </li>
                    </> :
                    <>
                        <li className="nav-item">
                            <Link to="/search" className="nav-link" onClick={closeMenu}>
                                Zoeken
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={() => {
                                logout();
                                closeMenu()
                            }}>
                                Log uit

                            </Link>
                        </li>
                    </>}
            </ul>

        </nav>
    );
}

export default Navigator;