import React from "react";
import { arc, pie, scaleOrdinal, schemeSet2, select, selectAll } from "d3";
import { useData } from "../useDataAverages";
import "../General.css";
import "bootstrap/dist/css/bootstrap.min.css";

const width = 960;
const height = 500;
const radius = Math.min(width, height) / 2;
const centreX = width / 2;
const centreY = height / 2;



const svg = select()
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    //svg.selectAll('pChart')
    //.data(data)
    //.enter()
    //.append("path")
    //.attr("d", pieArc)
    //.attr(fill = (color(d.data['hashtag'])))
    //.attr("stroke", "black")
    //.style("stroke-width", "3px");

const PieChart = () => {
    const data = useData();

    console.log(data);
    
    const colors = scaleOrdinal()
    .domain(data)
    .range(schemeSet2);

    const pieArc = arc()
    .innerRadius(0)
    .outerRadius(radius);

    const arcs = g.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class","arc");

    arcs.append("path")
    .attr("fill", function(d, i) {
        return colors(i);
    })
    .attr("d", arc);

    if(!data) {
        return <pre>Loading...</pre>;
    }

    const colorPie = pie().value(1);

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${centreX}, ${centreY})`}>
                {colorPie(data).map(d => (
                    <path fill={colors(d.data['hashtag'])} d={arcs(d)} />
                ))}
            </g>
        </svg>
    )


}

export default PieChart;
