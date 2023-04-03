import React from 'react';
import ReactDOM from 'react-dom';
import { scaleLinear, scaleTime, max, timeFormat, extent } from 'd3';
import { useData } from '../Data/useData';
import { useDataCat } from '../useDataCat';
import { useDataDog } from '../Data/useDataDog';
import { useDataDolphin } from '../Data/useDataDolphin';
import { useDataElephant } from '../Data/useDataElephant';
import { useDataRabbit } from '../Data/useDataRabbit';
import { useDataSkinwalker } from '../Data/useDataSkinwalker';
import { useDataSquirrel } from '../Data/useDataSquirrel';
import { useDataWhale } from '../Data/useDataWhale';
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
  const data = useData();
  const dataCat = useDataCat();
  const dataDog = useDataDog();
  const dataDolphin = useDataDolphin();
  const dataElephant = useDataElephant();
  //const dataRabbit = useDataRabbit();
  //const dataSkinwalker = useDataSkinwalker();
  //const dataSquirrel = useDataSquirrel();
  //const dataWhale = useDataWhale();

const width = 1700;
const height = 800;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 50;

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;


  const xValue = d => d['date'];
  const xAxisLabel = 'Time';

  const yValue = d => d['hashtagCount'];
  const yAxisLabel = 'hashtag';

  const xAxisTickFormat = timeFormat('%m/%d/%Y');

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0]);

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
        //<ElephantMarks
          data={dataElephant}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          Format={xAxisTickFormat}
          circleRadius={5}
        />
      </g>
      
    </svg>
    </header>
  );
};

export default MultiLineChart;
