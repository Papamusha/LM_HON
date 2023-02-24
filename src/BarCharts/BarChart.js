import React from "react";
import { scaleBand, scaleLinear, max, format, mean } from "d3";
import { useData } from "../useDataAverages";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import "../General.css";
import "bootstrap/dist/css/bootstrap.min.css";

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 220 };
const xAxisLabelOffset = 50;

//THE BAR CHART CURRENTLY DISPLAYS ALL 500 RENDERS AT ONCE ON TOP OF EACH OTHER, THIS MEANS USERS CURRENTLY SEE THE PEAK VALUE OF EACH CATEGORY.

//For some reason, filteredData will only work one time under the condition that the user has already rendered the page without using filteredData, after one successful render the graph will fail to render again.

const BarChart = () => {
  const data = useData();

  console.log(data);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yValue = (d) => d["hashtag"];
  const xValue = (d) => d["hashtagCount"];

  //formatting for Y values, changes value displayed on ticks to thousands.
  const siFormat = format(".2s");
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.15);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <header>
      <h2>
        This bar chart displays the average hashtag count values recorded for each category.
      </h2>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
          />
          <AxisLeft yScale={yScale} />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            Hashtag Count
          </text>
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
          />
        </g>
      </svg>
    </header>
  );
};

export default BarChart;
