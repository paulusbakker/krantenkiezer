import React, {useContext} from 'react';
import './Home.css'
import Backgroundslider from "../../components/backgroundslider/Backgroundslider";
import {AuthContext} from "../../context/AuthContext";

function Home() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <Backgroundslider/>

            <div className="home-center-screen">
                <h1 className="home-heading1">Kranten Kiezer</h1>
                <h2 className="home-heading2">Vergelijk het aantal publicaties over een onderwerp per krant</h2>
                <br/>
                {isAuth.isAuth && <h3 className="home-heading3">Kies zoeken in het menu om te beginnen met zoeken</h3>}
            </div>
        </>
    );
}

export default Home;
