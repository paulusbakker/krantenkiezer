import moment from "moment";
import _ from "lodash";

function ArticlesPerDate(articles) {

    articles = articles.filter(article =>
        article.source_id === 'volkskrant' ||
        article.source_id === 'parool' ||
        article.source_id === 'ad' ||
        article.source_id === 'telegraaf' ||
        article.source_id === 'trouw' ||
        article.source_id === 'nrc'
    );

    articles = articles.reverse();

    let barchartArray = [];
    const emptyBarchartObject = {
        date: "",
        ad: [],
        nrc: [],
        parool: [],
        telegraaf: [],
        trouw: [],
        volkskrant: [],
    };

    barchartArray.push(emptyBarchartObject); // fill the first article
    articles.forEach(article => {
            if (barchartArray[barchartArray.length - 1].date !== article.pubDate.substring(0, 10)) {
                if (barchartArray[barchartArray.length - 1].date === "") {
                    barchartArray[barchartArray.length - 1].date = article.pubDate.substring(0, 10);
                } else {

                    barchartArray.push(_.cloneDeep(emptyBarchartObject)
                    );

                    barchartArray[barchartArray.length - 1].date = article.pubDate.substring(0, 10);

                }
            }

            // add the publication to the corresponding newspaper:
            Object.keys(emptyBarchartObject).forEach(key => {
                    if (article.source_id === key) {
                        barchartArray[barchartArray.length - 1][key].push({title: article.title, link: article.link})

                    }
                }
            )
        }
    );

    barchartArray.forEach(d => {
        d.date = moment(d.date).valueOf(); // date -> epoch
    });

    return barchartArray
}


export default ArticlesPerDate;
