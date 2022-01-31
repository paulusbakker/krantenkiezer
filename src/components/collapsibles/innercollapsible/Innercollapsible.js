import useCollapse from "react-collapsed";
import FormatDatum from "../../../helpers/formatdate";
import "./Innercollapsible.css";


function InnerCollapsible({articles, date}) {

    const {getCollapseProps, getToggleProps, isExpanded} = useCollapse();
    return (
        <div className="innercollapsible">
            {/*change prefix depending on extended state*/}
            <div {...getToggleProps()}>
                {isExpanded ? "▼" : "►"} {date}
            </div>

            {isExpanded &&
            articles.map((article, index) => {
                if (FormatDatum(article.pubDate) === date) {
                    return (
                        <div {...getCollapseProps()} key={`title${index}`}>
                            <div className="innercollapsible-article">
                                <a className="innercollapsible-link" href={article.link} target="_blank">{article.title}</a>
                            </div>
                        </div>
                    )
                }
            })
            }

        </div>
    );
}

export default InnerCollapsible