import React from 'react';
import ReactDOM from 'react-dom';
import { scaleLinear, scaleTime, max, timeFormat, extent } from 'd3';
import { useData } from '../Data/useData';
import { useDataCat } from '../useDataCat';
import { useDataDog } from '../Data/useDataDog';
import { useDataDolphin } from '../Data/useDataDolphin';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './AllMarks';
import { DogMarks } from './DogMarks';
import { CatMarks } from './CatMarks';
import { SquirrelMarks } from './SquirrelMarks';
import { RabbitMarks } from './RabbitMarks';
import { DolphinMarks } from './DolphinMarks';
import { WhaleMarks } from './WhaleMarks';
import { ElephantMarks } from './ElephantMarks';
import { SkinwalkerMarks } from './SkinwalkerMarks';
import { useState, useEffect } from 'react';
import { XAxis } from './XAxis';


const MultiLineChart = () => {
  //get data
  //the multi line graph can't take any more datasets before breaking, unsure why
  const data = useData();
  const dataCat = useDataCat();
  const dataDog = useDataDog();
  const dataDolphin = useDataDolphin();

//set width and height for size of svg
const width = 1700;
const height = 800;

//set margin and offsets
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 50;

//data loading messages
  if (!data) {
    return <pre>Loading...</pre>;
  }

  //set innerHeight and innerWidth take height and width and crop them down to fit margin
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;


  //sets X axis to date
  const xValue = d => d['date'];
  const xAxisLabel = 'Time';

  //sets Y axis to hashtag count
  const yValue = d => d['hashtagCount'];
  const yAxisLabel = 'hashtag';

  //sets tick format to thousands (i.e. 100k rather than 100,000)
  const xAxisTickFormat = timeFormat('%m/%d/%Y');

  //sets X axis scaling to scale over time 
  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

    //sets Y axis scaling to scale linearly
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0]);

  //AxisBottom and Axisleft draw graph Axis
  //CatMarks draws line for Cat values
  //DogMarks draws line for Dog values
  //DolphinMarks draws line for Dolphin values
  //spans set legend for graph
  return (

    <header>
      <h1>Multi Line Chart</h1>

    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
      <XAxis xScale={xScale} innerHeight={innerHeight} />
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${innerHeight /
            2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <CatMarks
          data={dataCat}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          Format={xAxisTickFormat}
          circleRadius={5}
        />
        <DogMarks
          data={dataDog}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          Format={xAxisTickFormat}
          circleRadius={5}
        />
        <DolphinMarks
          data={dataDolphin}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          Format={xAxisTickFormat}
          circleRadius={5}
        />
      </g>
    </svg>
    <br/>
 
    <span class="legend-color-1">Cat </span> &nbsp; &nbsp; &nbsp; 
    <span class="legend-color-2">Dog</span> &nbsp; &nbsp; &nbsp; 
    <span class="legend-color-3">Dolphin</span>

    <h3>The following chart is only capable of using a maximum of 3 datasets.</h3>

    </header>
  );
};

export default MultiLineChart;
