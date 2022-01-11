import React, {useState, useEffect} from 'react';
import {
    BarChart, Bar, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import {useLocation} from "react-router-dom";
import axios from "axios";
import styles from './ResultsBarChart.module.css'
import {ruttearticles} from "../../dummies&tryouts/ruttearticles";
import ArticlesPerDate from "../../helpers/articlesPerDate";
import moment from "moment";

function Results() {

    // const location = useLocation();
    // const [data, setData] = useState([])
    // const [pageNumber, setPageNumber] = useState(0);
    // const [dataEnd, toggleDataEnd]=useState(false);
    // // console.log(pageNumber);
    // // if (pageNumber===0) {console.log(location.state.searchTerm)}
    // // pageNumber===0 ?? console.log(location.state.searchTerm);
    // useEffect(() => {
    //
    //     async function fetchData() {
    //         try {
    //             const result = await axios.get(`https://newsdata.io/api/1/archive?apikey=pub_3034dbcc33c2d4b40e9269e6e363613b8c1e&country=nl&qInTitle=${location.state.searchTerm}&page=${pageNumber}`);
    //             console.log('nextpage:'+result.data.nextPage);
    //             setData(data.concat(result.data.results));
    //             result.data.nextPage ? setPageNumber(pageNumber+1) :toggleDataEnd(true)
    //             console.log('pagenumber '+(pageNumber+1));
    //         } catch (e) {
    //             console.error(e)
    //         }
    //
    //     }
    //
    //     fetchData();
    //    //
    // }, [pageNumber]);
    // console.log(dataEnd && data);
    //
    // if (dataEnd) {console.log(data)}
    const barchartArray = ArticlesPerDate(ruttearticles);
    // const [barActive, setBarActive]= useState(false)
    const [showInfo, setShowInfo]= useState(false);
    // useEffect(() => {
    //     if (barActive) {setShowInfo(true)}
    //     else {setShowInfo(false)}
    //
    // }, [barActive]);

    const tooltipTitles = (payload) => {
        let text = "";
        let paper = Object.keys(payload[0].payload);
        // console.log("paper " + paper);
        for (let x = 1; x <= paper.length - 1; x++) {
            for (let y = 1; y <= payload[0].payload[paper[x]].length - 1; y++) {
                text = paper[x].toUpperCase() + ": " + payload[0].payload[paper[x]][y].title.substring(0, 150) + "\n" + text;
            }
        }

        return text;
    };

    function newlineText(text) {

        return text.split('\n').map((str, index) => <p key={index} className={styles.titles}> {str}</p>);
        // return newText;
    }

    const CustomTooltip = ({active, payload, label}) => {
        // console.log("active " + active);
        // console.log("label " + label);
        if (active && payload) {
            return (
                <div  className={styles.tooltip}>
                    <p className={styles.label}>{`${moment(label).format('DD/MM/YY')}`}</p>
                    <br/>

                    <a href="https://nos.nl/">nos goed nieuws</a>

                    {newlineText(tooltipTitles(payload))}
                </div>
            );
        }

        return null;
    };

    return (
        <>
            <h1 className={styles.heading1}>Results</h1>
            <div className={styles.container}>
                <div className={styles.barchart}>
                    <ResponsiveContainer width="100%" scale={2}>
                        <BarChart data={barchartArray}
                                  margin={{
                                      top: 40,
                                      right: 30,
                                      left: 40,
                                      bottom: 5,
                                  }}>

                            <CartesianGrid strokeDasharray="1 1" horizontal horizontalFill={["white"]} vertical
                                           verticalFill={["white"]}
                                           fillOpacity={0.5}/>
                            <XAxis
                                dataKey='date'
                                domain={[barchartArray[0].date - 43200000, 43200000 + barchartArray[barchartArray.length - 1].date]}
                                scale="time"
                                type="number"
                                tickFormatter={barchartArray => {
                                    return moment(barchartArray).format('DD/MM/YY');
                                }}

                            />
                            <YAxis label={{value: 'aantal publicaties', angle: -90, position: 'insideLeft'}}/>
                            <Tooltip viewBox=" 0, 0, 1000, 1000 " wrapperStyle={{fill: "red"}}
                                     cursor={{stroke: 'white', strokeWidth: 2, fill: "#9EA6A9", opacity: 50}}
                                     content={<CustomTooltip/>}
                            />
                            <Legend/>
                            <Bar name="AD" dataKey="ad[0]" stackId="a" fill="#8B1E3F"
                                 onMouseEnter={()=>setShowInfo(true)}
                                 onMouseLeave={()=>setShowInfo(false)}
                            />
                            <Bar name="NRC" dataKey="nrc[0]" stackId="a" fill="#3C153B"
                                 onMouseEnter={()=>setShowInfo(true)}
                                 onMouseLeave={()=>setShowInfo(false)}
                            />
                            />
                            <Bar name="PAROOL" dataKey="parool[0]" stackId="a" fill="#63696D"
                                 onMouseEnter={()=>setShowInfo(true)}
                                 onMouseLeave={()=>setShowInfo(false)}
                            />)}
                            />
                            <Bar name="TELEGRAAF" dataKey="telegraaf[0]" stackId="a" fill="#89BD9E"
                                 onMouseEnter={()=>setShowInfo(true)}
                                 onMouseLeave={()=>setShowInfo(false)}
                            />
                            />
                            <Bar name="TROUW" dataKey="trouw[0]" stackId="a" fill="#F0C987"
                                 onMouseEnter={()=>setShowInfo(true)}
                                 onMouseLeave={()=>setShowInfo(false)}
                            />
                            />
                            <Bar name="VOLKSKRANT" dataKey="volkskrant[0]" stackId="a" fill="#db4c40"
                                 onMouseEnter={()=>setShowInfo(true)}
                                 onMouseLeave={()=>setShowInfo(false)}
                            />
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {showInfo && <div className={styles.infoscreen}>variabele text</div> }

            </div>

        </>
    );
}

export default Results;
