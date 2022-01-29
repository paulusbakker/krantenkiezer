function BarChartArray(articles) {
    // put the fetched and filtered data into the Recharts graph format
    let barChartArray = [
        {name: "AD", fullPaperName: "Algemeen Dagblad", value: 0, percentage: 0},
        {name: "NRC", fullPaperName: "NRC", value: 0, percentage: 0},
        {name: "Parool", fullPaperName: "Parool", value: 0, percentage: 0},
        {name: "Telegraaf", fullPaperName: "Telegraaf", value: 0, percentage: 0},
        {name: "Trouw", fullPaperName: "Trouw", value: 0, percentage: 0},
        {name: "Volkskrant", fullPaperName: "Volkskrant", value: 0, percentage: 0}
    ];

    let total = 0;
    barChartArray.forEach(paper => {
        paper.value = articles.filter(article => paper.name.toLowerCase() === article.source_id.toLowerCase()).length;
        total += paper.value;
    })
    // calculate percentage
    barChartArray.forEach(paper => {
            paper.percentage = Math.round(paper.value / total * 100)
        }
    )

    return barChartArray
}


export default BarChartArray;
