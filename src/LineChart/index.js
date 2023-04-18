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


const LineChart = () => {
  //set data
  //all of these datasets are required for drawing a line that matches the filter, as filtering the value fed into the <path> element does not work
  const data = useData();
  const dataCat = useDataCat();
  const dataDog = useDataDog();
  const dataDolphin = useDataDolphin();
  const dataElephant = useDataElephant();
  const dataRabbit = useDataRabbit();
  const dataSkinwalker = useDataSkinwalker();
  const dataSquirrel = useDataSquirrel();
  const dataWhale = useDataWhale();
  
  //Dropdown which users use to select the search term to display
  //This is visible at all times on the LineChart page
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

    //changes useState values depending on dropdown option selected
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
const width = 1700;
const height = 800;
//set margin and offsets
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 50;

//data loading message
  if (!data) {
    return <pre>Loading...</pre>;
  }
// innerHeight and innerWidth take height and width and crop to fit the margin
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;


  //set X axis value to date and label
  const xValue = d => d['date'];
  const xAxisLabel = 'Time';

  //set Y axis value to hashtag count and label
  const yValue = d => d['hashtagCount'];
  const yAxisLabel = 'hashtag';

  const xAxisTickFormat = timeFormat('%m/%d/%Y');

  //set scale of X axis to time
  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

    //set scale of Y axis to scale linearly
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0]);

  //Dropdown creates the dropdown created above, used to select which term to use
  //AxisBottom and AxisLeft display the graphs axis
  //Marks display data values (lines and points) 
  if ( allVisible === true ) {

  return (

    <header>
      <h1>Line Chart - All</h1>
        <div className="dropdown-container">
            <label for="hashtag-select">Choose a search term:</label>
              <Dropdown id="hashtag-select"
              options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
              /> <br/>
        </div>

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
    </svg> <br/>
    <span class="Blegend-color-1">Cat </span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-2">Dog</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-3">Squirrel</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-4">Rabbit</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-5">Dolphin</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-6">Whale</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-7">Elephant</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-8">Skinwalker</span>
    </header>
  );
};

if ( dogVisible === true ) {
  return (

    <header>
      <h1>Line Chart - Dogs</h1>
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
          data={dataDog}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          Format={xAxisTickFormat}
          circleRadius={5}
        />
      </g>
    </svg> <br/>
    <span class="Blegend-color-2">Dog</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    </header>
  );
};

if ( catVisible === true ) {

  return (

    <header>
      <h1>Line Chart - Cats</h1>
        <div className="dropdown-container">
            <label for="hashtag-select">Choose a search term:</label>
              <Dropdown id="hashtag-select"
              options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
              />
        </div>

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
      </g>
    </svg> <br/>
    <span class="Blegend-color-1">Cat </span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    </header>
  );
};

if ( squirrelVisible === true ) {
  return (

    <header>
      <h1>Line Chart - Squirrels</h1>
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
          data={dataSquirrel}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          Format={xAxisTickFormat}
          circleRadius={5}
        />
      </g>
    </svg> <br/>
    <span class="Blegend-color-3">Squirrel</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    </header>
  );
};

if ( rabbitVisible === true ) {
  return (

    <header>
      <h1>Line Chart - Rabbits</h1>
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
          data={dataRabbit}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          Format={xAxisTickFormat}
          circleRadius={5}
        />
      </g>
    </svg> <br/>
    <span class="Blegend-color-4">Rabbit</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    </header>
  );
};

if ( dolphinVisible === true ) {
  return (

    <header>
      <h1>Line Chart - Dolphins</h1>
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
          data={dataDolphin}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          Format={xAxisTickFormat}
          circleRadius={5}
        />
      </g>
    </svg> <br/>
    <span class="Blegend-color-5">Dolphin</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    </header>
  );
};

if ( whaleVisible === true ) {
  return (

    <header>
      <h1>Line Chart - Whales</h1>
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
          data={dataWhale}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          Format={xAxisTickFormat}
          circleRadius={5}
        />
      </g>
    </svg> <br/>
    <span class="Blegend-color-6">Whale</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    </header>
  );
};

if ( elephantVisible === true ) {
  return (

    <header>
      <h1>Line Chart - Elephants</h1>
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
          data={dataElephant}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          Format={xAxisTickFormat}
          circleRadius={5}
        />
      </g>
    </svg> <br/>
    <span class="Blegend-color-7">Elephant</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    </header>
  );
};

if ( skinwalkerVisible === true ) {
  return (

    <header>
      <h1>Line Chart - Skinwalkers</h1>
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
          data={dataSkinwalker}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          Format={xAxisTickFormat}
          circleRadius={5}
        />
      </g>
    </svg> <br/>
    <span class="Blegend-color-8">Skinwalker</span>
    </header>
  );
};

}

export default LineChart;
