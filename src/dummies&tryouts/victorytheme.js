import {assign} from "lodash";


const blueGrey50 = "#ECEFF1";
const blueGrey300 = "#90A4AE";
const blueGrey700 = "black";

// Typography
const sansSerif = "'Helvetica Neue', 'Helvetica', sans-serif";
const letterSpacing = "normal";
const fontSize = 30;

// Layout
const padding = 8;
const baseProps = {
    width: 350,
    height: 350,
    padding: 50
};

// * Labels
const baseLabelStyles = {
    fontFamily: sansSerif,
    fontSize,
    letterSpacing,
    padding,
    fill: blueGrey700,
    stroke: "transparent",
    strokeWidth: 0
};

const centeredLabelStyles = assign({ textAnchor: "middle" }, baseLabelStyles);

// Strokes
const strokeDasharray = "10, 5";
const strokeLinecap = "round";
const strokeLinejoin = "round";

// Put it all together...
export const theme = {

    axis: assign(
        {
            style: {
                axis: {
                    fill: "transparent",
                    stroke: blueGrey300,
                    strokeWidth: 2,
                    strokeLinecap,
                    strokeLinejoin
                },
                axisLabel: assign({}, centeredLabelStyles, {
                    padding,
                    stroke: "transparent"
                }),
                grid: {
                    fill: "none",
                    stroke: blueGrey50,
                    strokeDasharray,
                    strokeLinecap,
                    strokeLinejoin,
                    pointerEvents: "painted"
                },
                ticks: {
                    fill: "transparent",
                    size: 5,
                    stroke: blueGrey300,
                    strokeWidth: 1,
                    strokeLinecap,
                    strokeLinejoin
                },
                tickLabels: assign({}, baseLabelStyles, {
                    fill: blueGrey700
                })
            }
        },
        baseProps
    ),



    chart: baseProps,

};


