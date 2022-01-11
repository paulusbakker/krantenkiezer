function BarChartArray(articles) {

    let barChartArray = [
        {name: "AD", value: 0, color: '#F02C03'},
        {name: "NRC", value: 0, color: "#FF950C"},
        {name: "Parool", value: 0, color: '#FEDC03'},
        {name: "Telegraaf", value: 0, color: '#7CDA01'},
        {name: "Trouw", value: 0, color: '#0D8DFF'},
        {name: "Volkskrant", value: 0, color: '#B02FF7'}];

    let total = 0;
    for (let i = 0; i <= barChartArray.length - 1; i++) {
        barChartArray[i].value = articles.filter(article => barChartArray[i].name.toLowerCase() === article.source_id.toLowerCase()).length;
        total = total + barChartArray[i].value;
    }
    for (let i = 0; i <= barChartArray.length - 1; i++) {
        barChartArray[i].value = Math.round(barChartArray[i].value / total * 100);
    }
    return barChartArray
}


export default BarChartArray;
