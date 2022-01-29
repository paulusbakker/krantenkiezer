import React from "react";
import {BarChart, Bar, XAxis, YAxis, ResponsiveContainer} from 'recharts';

function Chart({barChartArray}) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartArray}
                      margin={{top: 20, right: 10, left: -10, bottom: 20}}
            >
                <XAxis dataKey="name"
                       angle={-45}
                       textAnchor='end'
                       height={65}
                       interval={0}
                       stroke="black"
                />
                <YAxis orientation="left" stroke="black" tickFormatter={(label) => `${label}%`}/>
                <Bar dataKey="percentage" fill="#db4c40"/>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default Chart
