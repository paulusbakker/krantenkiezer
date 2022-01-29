import React from 'react';
import {useLocation} from "react-router-dom";
import './Results.css'
import Collapsible from "../../components/collapsibles/collapsible/Collapsible";
import Chart from "../../components/chart/Chart";
import BarChartArray from "../../helpers/barChartArray";

function Results() {
    // useLocation to receive the fetchedData and search details from the search page
    const location = useLocation();
    const filteredArticlesFinal = location.state.filteredArticlesFinal;
    const showDetails=location.state.showDetails;
    const barChartArray=BarChartArray(filteredArticlesFinal)
    console.log(filteredArticlesFinal);
    console.log(barChartArray);
    console.log(showDetails);
    console.log(location.state);
    return <>
        {/*make bar chart*/}
        <div className="result-chart-container">Resultaten voor {showDetails}
            <div className="result-chart">
                <Chart barChartArray={barChartArray}/>
            </div>
        </div>
        {/*make collapsible per paper*/}
        <div className="result-paper-container">
            {barChartArray.map((paper, index) =>
                <div className="result-paper" key={index}>
                    <Collapsible filteredArticlesFinal={filteredArticlesFinal} paperTitle={paper.fullPaperName} paper={paper.name} key={index}/>
                </div>
            )}
        </div>
    </>;
}

export default Results;
