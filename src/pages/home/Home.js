import React from 'react';
import styles from './Home.module.css'

function Home() {
    return (
        <>
            <div className={styles.maintext}>
                <h1 className={styles.heading1}>Welke krant past bij mij?</h1>
                <h2 className={styles.heading2}>Vergelijk het aantal publicaties over een onderwerp per krant</h2>

            </div>
        </>
    );
}

export default Home;
