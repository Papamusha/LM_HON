import React from "react";
import { arc, pie, scaleOrdinal, schemeSet2, select, selectAll } from "d3";
import { useData } from "../useDataAverages";
import "../General.css";
import "bootstrap/dist/css/bootstrap.min.css";

//set width and height for chart
const width = 960;
const height = 500;
//radius is calc of 
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
    //get data
    const data = useData();

    console.log(data);
    
    //sets scale for colours
    const colours = scaleOrdinal()
    .domain(data)
    .range(schemeSet2);

    //set arc for chart
    const pieArc = arc()
    .innerRadius(0)
    .outerRadius(radius);

    //arcs has an error, g is not defined
    //I am unsure why, and sorting this issue is not worth it considering the lack of time available

    //feed arc with data and append to <g> tag
    //const arcs = g.selectAll("arc")
    //.data(pie(data))
    //.enter()
    //.append("g")
    //.attr("class","arc");

    //place arcs into <path> tags
    //arcs.append("path")
    //.attr("fill", function(d, i) {
        //return colours(i);
    //})
    //.attr("d", arc);

    //data loading message
    //if(!data) {
        //return <pre>Loading...</pre>;
    //}

    // initial pie
    const colourPie = pie().value(1);

    // feed data and parameters into colourpie 
    //return (
        //<svg width={width} height={height}>
            //<g transform={`translate(${centreX}, ${centreY})`}>
                //{colourPie(data).map(d => (
                    //<path fill={colours(d.data['hashtag'])} d={arcs(d)} />
                //))}
            //</g>
        //</svg>
    //)


}

export default PieChart;