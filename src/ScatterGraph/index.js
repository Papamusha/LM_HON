import React from 'react';
import ReactDOM from 'react-dom';
import { scaleLinear, scaleTime, max, timeFormat, extent } from 'd3';
import { useData } from '../Data/useData';
import { useDataCat } from '../useDataCat';
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



const ScatterGraph = () => {
  //get data
  const data = useData();

  //Dropdown which users use to select the search term to display
//This is visible at all times on the scattergraph page
  const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => (
    <select id={id} onChange={event => onSelectedValueChange(event.target.value)}>
        {options.map(({ value, label }) => (
            <option value={value} selected={value === selectedValue}>
                {label}
            </option>
        ))}
    </select>
);

//set initial value and value options
const initialValue = 'all';

const options = [
    { value: 'all', label: 'All' },
    { value: 'dogs', label: 'Dog' },
    { value: 'cats', label: 'Cat' },
    { value: 'squirrels', label: 'Squirrel' },
    { value: 'rabbits', label: 'Rabbit' },
    { value: 'dolphins', label: 'Dolphin' },
    { value: 'whales', label: 'Whale' },
    { value: 'elephants', label: 'Elephant' },
    { value: 'skinwalkers', label: 'Skinwalker' },
];
//set dropdown value to initialValue
    let [selectedValue, setSelectedValue] = useState(initialValue);

    //assign appropriate states to each option
    let [allVisible, setAllVisible] = useState(true);
    let [dogVisible, setDogVisible] = useState(false);
    let [catVisible, setCatVisible] = useState(false);
    let [squirrelVisible, setSquirrelVisible] = useState(false);
    let [rabbitVisible, setRabbitVisible] = useState(false);
    let [dolphinVisible, setDolphinVisible] = useState(false);
    let [whaleVisible, setWhaleVisible] = useState(false);
    let [elephantVisible, setElephantVisible] = useState(false);
    let [skinwalkerVisible, setSkinwalkerVisible] = useState(false);

    //changes useState values depending on dropdown option selected.
    useEffect(() => {
        selectedValue === "all" ? setAllVisible(true) : setAllVisible(false);
        selectedValue === "dogs" ? setDogVisible(true) : setDogVisible(false);
        selectedValue === "cats" ? setCatVisible(true) : setCatVisible(false);
        selectedValue === "squirrels" ? setSquirrelVisible(true) : setSquirrelVisible(false);
        selectedValue === "rabbits" ? setRabbitVisible(true) : setRabbitVisible(false);
        selectedValue === "dolphins" ? setDolphinVisible(true) : setDolphinVisible(false);
        selectedValue === "whales" ? setWhaleVisible(true) : setWhaleVisible(false);
        selectedValue === "elephants" ? setElephantVisible(true) : setElephantVisible(false);
        selectedValue === "skinwalkers" ? setSkinwalkerVisible(true) : setSkinwalkerVisible(false);
      }, [selectedValue]);

      console.log('All = ' + allVisible);
      console.log('Dog = ' + dogVisible);
      console.log('Cat = ' + catVisible);
      console.log('Squirrel = ' + squirrelVisible);
      console.log('Rabbit = ' + rabbitVisible);
      console.log('Dolphin = ' + dolphinVisible);
      console.log('Whale = ' + whaleVisible);
      console.log('Elephant = ' + elephantVisible);
      console.log('Skinwalker = ' + skinwalkerVisible);

  
//width and height control size of area for svg
const width = 960;
const height = 500;
//set margin and offsets
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 50;

//data loading message
  if (!data) {
    return <pre>Loading...</pre>;
  }

  //innerHeight and innerWidth take height and width and crop them down to fit within the margins
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  //sets value of X axis to date
  const xValue = d => d['date'];
  const xAxisLabel = 'Time';

  //sets value of Y axis to hashtag count
  const yValue = d => d.hashtagCount;
  const yAxisLabel = 'hashtag';

  //sets tick format to thousands (i.e. 100k rather than 100,000)
  const xAxisTickFormat = timeFormat('%m/%d/%Y');

  //sets scale for X axis to scale based on time
  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  //sets scale for Y axis to scale linearly
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0]);

  //FOR ALL OUTCOMES SEE 3 LINES BELOW
  //Dropdown renders dropdown above
  //AxisBottom and Axisleft draw graph Axis
  //Marks draws bars for chart
  if ( allVisible === true ) {
  return (

    <header>
      <h1>Scatter Graph - All</h1>
        <div className="dropdown-container">
            <label for="hashtag-select">Choose a search term:</label>
              <Dropdown id="hashtag-select"
              options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
              />
        </div>

    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
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
        <Marks
          data={data}
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

if ( dogVisible === true ) {
  return (

    <header>
      <h1>Scatter Graph - Dogs</h1>
        <div className="dropdown-container">
            <label for="hashtag-select">Choose a search term:</label>
              <Dropdown id="hashtag-select"
              options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
              />
        </div>

    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
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
        <DogMarks
          data={data}
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

if ( catVisible === true ) {
  return (

    <header>
      <h1>Scatter Graph - Cats</h1>
        <div className="dropdown-container">
            <label for="hashtag-select">Choose a search term:</label>
              <Dropdown id="hashtag-select"
              options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
              />
        </div>

    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
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
          data={data}
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

if ( squirrelVisible === true ) {
  return (

    <header>
      <h1>Scatter Graph - Squirrels</h1>
        <div className="dropdown-container">
            <label for="hashtag-select">Choose a search term:</label>
              <Dropdown id="hashtag-select"
              options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
              />
        </div>

    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
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
        <SquirrelMarks
          data={data}
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

if ( rabbitVisible === true ) {
  return (

    <header>
      <h1>Scatter Graph - Rabbits</h1>
        <div className="dropdown-container">
            <label for="hashtag-select">Choose a search term:</label>
              <Dropdown id="hashtag-select"
              options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
              />
        </div>

    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
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
        <RabbitMarks
          data={data}
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

if ( dolphinVisible === true ) {
  return (

    <header>
      <h1>Scatter Graph - Dolphins</h1>
        <div className="dropdown-container">
            <label for="hashtag-select">Choose a search term:</label>
              <Dropdown id="hashtag-select"
              options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
              />
        </div>

    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
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
        <DolphinMarks
          data={data}
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

if ( whaleVisible === true ) {
  return (

    <header>
      <h1>Scatter Graph - Whales</h1>
        <div className="dropdown-container">
            <label for="hashtag-select">Choose a search term:</label>
              <Dropdown id="hashtag-select"
              options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
              />
        </div>

    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
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
        <WhaleMarks
          data={data}
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

if ( elephantVisible === true ) {
  return (

    <header>
      <h1>Scatter Graph - Elephants</h1>
        <div className="dropdown-container">
            <label for="hashtag-select">Choose a search term:</label>
              <Dropdown id="hashtag-select"
              options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
              />
        </div>

    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
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
        <ElephantMarks
          data={data}
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

if ( skinwalkerVisible === true ) {
  return (

    <header>
      <h1>Scatter Graph - Skinwalkers</h1>
        <div className="dropdown-container">
            <label for="hashtag-select">Choose a search term:</label>
              <Dropdown id="hashtag-select"
              options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
              />
        </div>

    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
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
        <SkinwalkerMarks
          data={data}
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

}

export default ScatterGraph;
