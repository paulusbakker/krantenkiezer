import React from 'react';
import useCollapse from "react-collapsed";
import "./Collapsible.css";
import FormatDatum from "../../../helpers/formatdate";
import InnerCollapsible from "../innercollapsible/Innercollapsible";

function Collapsible({filteredArticlesFinal, paperTitle, paper}) {
    const {getCollapseProps, getToggleProps, isExpanded} = useCollapse();
    const datums = [];
    // get articles from selected paper
    const artikelen = filteredArticlesFinal.filter(article => article.source_id === paper.toLowerCase());
    // add all unique dates to the datums array
    artikelen.map(article => {
        const thisDate = FormatDatum(article.pubDate);
        if (!datums.includes(thisDate)) datums.push(thisDate);
    });
    return <div className="collapsible-paper-container">
        {artikelen.length ?
            <div className="collapsible-paper-with-results" {...getToggleProps()}>
                {isExpanded ? "▼" : "►"} {paperTitle}
            </div>
            :
            <div className="collapsible-paper-no-results" {...getToggleProps()}>
                {/*change prefix depending on extended state*/}
                {isExpanded ? "▼" : "►"} {paperTitle}
            </div>}

        {/*show articles per paper per date*/}
        {isExpanded &&
        datums.map((datum, index) => {
            return (
                <div {...getCollapseProps()} key={index}>
                    <div className="collapsible-articles">
                        <InnerCollapsible
                            articles={artikelen}
                            date={datum}
                            key={`inner${index}`}
                        />
                    </div>
                </div>);
        })
        }
    </div>

}

export default Collapsible