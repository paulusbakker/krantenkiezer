function ArticlesPerPaperPerDate(articles) {
    articles = articles.filter(article =>
        article.source_id === 'volkskrant' ||
        article.source_id === 'parool' ||
        article.source_id === 'ad' ||
        article.source_id === 'telegraaf' ||
        article.source_id === 'trouw' ||
        article.source_id === 'nrc'
    );

    articles = articles.reverse();

    let ad = [];
    let nrc = [];
    let parool = [];
    let telegraaf = [];
    let trouw = [];
    let volkskrant = [];


    articles.forEach(article => {
        article.pubDate = article.pubDate.substring(0, 10);


        switch (article.source_id) {
            case "ad":
                if (ad.length === 0 || ad[ad.length - 1].date !== article.pubDate) {
                    ad.push({date: article.pubDate, content: []});
                }
                ad[ad.length - 1].content.push({title: article.title})
                break;
            case "nrc":
                if (nrc.length === 0 || nrc[nrc.length - 1].date !== article.pubDate) {
                    nrc.push({date: article.pubDate, content: []});
                }
                nrc[nrc.length - 1].content.push({title: article.title})
                break;
            case "parool":
                if (parool.length === 0 || parool[parool.length - 1].date !== article.pubDate) {
                    parool.push({date: article.pubDate, content: []});
                }
                parool[parool.length - 1].content.push({title: article.title})
                break;
            case "telegraaf":
                if (telegraaf.length === 0 || telegraaf[telegraaf.length - 1].date !== article.pubDate) {
                    telegraaf.push({date: article.pubDate, content: []});
                }
                telegraaf[telegraaf.length - 1].content.push({title: article.title})
                break;
            case "trouw":
                if (trouw.length === 0 || trouw[trouw.length - 1].date !== article.pubDate) {
                    trouw.push({date: article.pubDate, content: []});
                }
                trouw[trouw.length - 1].content.push({title: article.title})
                break;
            case "volkskrant":
                if (volkskrant.length === 0 || volkskrant[volkskrant.length - 1].date !== article.pubDate) {
                    volkskrant.push({date: article.pubDate, content: []});
                }
                volkskrant[volkskrant.length - 1].content.push({title: article.title})
                break;

        }
    })


// console.log("ad " + JSON.stringify(ad));
// console.log("nrc " + JSON.stringify(nrc));
// console.log("parool " + JSON.stringify(parool));
// console.log("telegraaf " + JSON.stringify(telegraaf));
// console.log("trouw " + JSON.stringify(trouw));
    let total=[];
// console.log("volkskrant " + JSON.stringify(volkskrant));
    total.push({ad:ad},{ nrc:nrc}, {parool:parool}, {telegraaf:telegraaf},{ trouw:trouw}, {volkskrant:volkskrant});
    return total;
}


export default ArticlesPerPaperPerDate;
