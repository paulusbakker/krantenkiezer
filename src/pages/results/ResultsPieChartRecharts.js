import React, {useState, useEffect} from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';
import {useLocation} from "react-router-dom";
import axios from "axios";
import styles from './ResultsPieChartRecharts.module.css'
import {ruttearticles} from "../../dummies&tryouts/ruttearticles";
import BarChartArray from "../../helpers/barChartArray";

// import moment from "moment";

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
    const pieChartArray = BarChartArray(ruttearticles);

    const colors = ['#F02C03', '#FF950C', '#FEDC03',
        '#7CDA01', '#0D8DFF', '#B02FF7'];

    const RADIAN = Math.PI / 180;
    // const renderCustomizedLabel = (object) => {
    //     console.log(JSON.stringify(object));
    const renderCustomizedLabel = ({x, y, cx, cy, name, midAngle, innerRadius, outerRadius, percent}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const xPercentage = cx + radius * Math.cos(-midAngle * RADIAN);
        const yPercentage = cy + radius * Math.sin(-midAngle * RADIAN);
        return (<>
                <text x={x} y={y} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {name}
                </text>
                <text x={xPercentage} y={yPercentage} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            </>
        );
    };


    return (
        <>
        <div className={styles.overallcontainer}>
            <div className={styles.wrappingresponsivecontainer}>
                <ResponsiveContainer className={styles.responsivecontainer}
                                     minWidth={500}
                                     minHeight={500}
                                     width="100%"
                                     height="100%"
                                     // debounce={1000}
                >
                    <PieChart width={100} height={100}>
                        <Pie
                            data={pieChartArray}
                            cx="50%"
                            cy="50%"
                            // labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius="65%"
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartArray.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

            </div>

        </div>
    <div className={styles.articles}>
        Hier komen de artikelen
    </div>
    </>
    );
}

export default Results;



