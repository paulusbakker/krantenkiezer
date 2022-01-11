import React from 'react';
import styles from './Backgroundslider.module.css';
import paper1 from "../../assets/volkskrant.jpg";
import paper2 from "../../assets/ad.jpg";
import paper3 from "../../assets/nrc.jpg";
import paper4 from "../../assets/telegraaf.jpg";
import paper5 from "../../assets/trouw.jpg";
import paper6 from "../../assets/parool.jpg";

let papers = [paper1, paper2, paper3, paper4, paper5, paper6];
const wallpaperLine1 = [1, 2, 3].map(loop =>
    papers.map((tile, index) =>
        <img src={tile} key={index} alt="tile" className={styles.tile}/>
    ));
[1, 2,3 ].map(counter => papers.unshift(papers.pop()));
const wallpaperLine2 = [1, 2, 3].map(loop =>
    papers.map((tile, index) =>
        <img src={tile} key={index} alt="tile" className={styles.tile}/>
    ));


function Backgroundslider() {
    return (
        <div className={styles.container}>
            <div className={styles.container}>
                <div className={styles['sliding-background']}>
                    {wallpaperLine1}
                    {wallpaperLine2}
                    {wallpaperLine1}
                    {wallpaperLine2}
                    {wallpaperLine1}
                    {wallpaperLine2}
                </div>
            </div>
        </div>
    );
}

export default Backgroundslider;