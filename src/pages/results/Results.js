import React, {useState, useEffect} from 'react';
import useCollapse from 'react-collapsed'
import {useLocation} from "react-router-dom";
import axios from "axios";
import {VictoryChart, VictoryBar, VictoryLabel, VictoryAxis} from 'victory';
import {theme} from "../../dummies&tryouts/victorytheme"
import styles from './Results.module.css'
import {ruttearticles} from "../../dummies&tryouts/ruttearticles";
import BarChartArray from "../../helpers/barChartArray";
import ArticlesPerPaperPerDate from "../../helpers/articlesPerPaperPerDate";


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
    //             const result = await axios.get(`https://newsdata.io/api/1/archive?apikey=XXX&country=nl&qInTitle=${location.state.searchTerm}&page=${pageNumber}`);
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

    const barChartArray = BarChartArray(ruttearticles);
    const articles = ArticlesPerPaperPerDate(ruttearticles);
    const max = Math.max.apply(Math, barChartArray.map(a => a.value));

    function InnerCollapsible({articles, paper}) {
        console.log(articles);
        const {getCollapseProps, getToggleProps, isExpanded} = useCollapse();
        return (
            <div className={styles.collapsible}>
                <div className={styles.collapsible} {...getToggleProps()}>
                    {isExpanded ? "klik om deze datum uit te klappen" :"klik om deze datum uit te klappen"}
                </div>
                <div {...getCollapseProps()}>
                    <div className={styles.content}>
                        Hier staan de titels van één datum
                        Click <i>Collapse</i> to hide this content...
                    </div>
                </div>
            </div>
        );
    }

    function Collapsible({articles, paper}) {
        // hier moet de datums van de artikel in een variabele worden gezet, lukt niet na uren en uren te hebben geprobeerd!
        let datums = ["1-1", "2-1", "3-1"];
        const {getCollapseProps, getToggleProps, isExpanded} = useCollapse();
        return <div className={styles.collapsible}>
            <div className={styles.header} {...getToggleProps()}>
                {paper} {isExpanded ? " klik om de datum's in te klappen" :" klik om de datum's te bekijken"}
            </div>
            {datums.map((datum, index) =>
                <div {...getCollapseProps()} key={index}>
                    <div className={styles.content} >
                                                {datum}
                        <InnerCollapsible articles={articles} paper={paper}/>
                    </div>
                </div>)
            }

        </div>

    }

    return <>
        <div className={styles.resultcontainer}>
            <div className={styles.piechart}>
                <VictoryChart
                    theme={theme}
                    width={1200}
                    height={500}
                    padding={{left: 160, right: 20, top: 50, bottom: 50}}

                >
                    <VictoryBar
                        alignment="middle"
                        barRatio={0.8}
                        horizontal
                        labels={({datum}) => `${datum.value}%`}
                        labelComponent={
                            <VictoryLabel
                                style={{fill: "black", fontSize: 30}}
                                dx={-50}
                                dy={0}
                            />

                        }
                        style={{
                            data: {fill: ({datum}) => datum.color}
                        }}
                        groupComponent={<g transform="translate(0, -20)"/>}
                        data={barChartArray}
                        sortKey="value"
                        x="name"
                        y="value"

                    />
                    <VictoryAxis
                        groupComponent={<g transform="translate(0, -10)"/>}
                    />
                    <VictoryAxis dependentAxis
                                 tickValues={Array.from(Array(max).keys())}
                    />

                </VictoryChart>
            </div>
            {/*<div className={styles.ruttearticles}>*/}
            {/*    <ShowArticles articlesPerDate={articlesPerDate}/>*/}
            {/*</div>*/}
        </div>

        <Collapsible articles={articles} paper="ad"/>
        <Collapsible articles={articles} paper="nrc"/>
        <Collapsible articles={articles} paper="parool"/>
        <Collapsible articles={articles} paper="telegraaf"/>
        <Collapsible articles={articles} paper="trouw"/>
        <Collapsible articles={articles} paper="volkskrant"/>
    </>;
}

export default Results;

// function Showarticles({articlesPerPaperPerDate}) {
//     let ruttearticles = _.values(articlesPerPaperPerDate);
//     let textArray = "";
//
//     for (let paper = 0; paper <= ruttearticles.length - 1; paper++) {
//         console.log(ruttearticles[paper]); //check
//         for (let date = 0; date <= ruttearticles[paper].length - 1; date++) {
//             let mama=_.values(ruttearticles[paper][date])[1];
//             console.log(mama);
//             for (let article = 0; article <= mama.length - 1; article++) {
//                 textArray = textArray + mama[article]+"\n";
//                 console.log(textArray)
//             }
//
//         }
//     }
//     console.log(textArray[0]);
//
//     return textArray.split("\n").map((str, index) => <h2 key={index} className={styles.titles}> {str}</h2>);
//     // console.log(JSON.stringify(textArray));
//     // return <h1>{textArray}</h1>;
// }


// dit ging in de VictoryBar
// events={[{
//         target: "data",
//         eventHandlers: {
//             onClick: () => {
//                 return [{
//                     target: "data",
//                     mutation: (bar) => {
//                         setPaperToShow(bar.datum.xName.toLowerCase())
//                     }
//                 }
//                 ];
//             }
//         }
//     }]}
