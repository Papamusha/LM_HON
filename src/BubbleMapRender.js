import { useMapData } from './useMapData';
import { useData } from './useData';
import { BubbleMap } from './BubbleMaps/BubbleMap All/index.js';
import { BubbleMapDog } from './BubbleMaps/BubbleMap Dog/index.js';
import { BubbleMapCat } from './BubbleMaps/BubbleMap Cat/index.js';
import { BubbleMapSquirrel } from './BubbleMaps/BubbleMap Squirrel/index.js';
import { BubbleMapRabbit } from './BubbleMaps/BubbleMap Rabbit/index.js';
import { BubbleMapDolphin } from './BubbleMaps/BubbleMap Dolphin/index.js';
import { BubbleMapWhale } from './BubbleMaps/BubbleMap Whale/index.js';
import { BubbleMapElephant } from './BubbleMaps/BubbleMap Elephant/index.js';
import { BubbleMapSkinwalker } from './BubbleMaps/BubbleMap Skinwalker/index.js';
import { DateHistogram } from './DateHistogram/index.js';
import './General.css';
import { useState, useEffect } from 'react';

const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => (
  <select id={id} onChange={event => onSelectedValueChange(event.target.value)}>
    {options.map(({ value, label }) => (
      <option value={value} selected={value === selectedValue}>
        {label}
      </option>
    ))}
  </select>
  );

const initialValue = 'all';

const options = [
  { value: 'all', label: 'All' },
  { value: 'dogs', label: 'Dog' },
  { value: 'cats', label: 'Cat' },
  { value: 'squirrels', label: 'Squirrel' },
  { value: 'rabbits', label: 'Rabbit' },
  { value: 'dolphins', label: 'Dolphin' },
  { value: 'whales', label: 'Whales' },
  { value: 'elephants', label: 'Elephant' },
  { value: 'skinwalkers', label: 'Skinwalker' },
];

function BubbleMapRender() {
  let [selectedValue, setSelectedValue] = useState(initialValue);

  let [allVisible, setAllVisible] = useState(true);
  let [dogVisible, setDogVisible] = useState(false);
  let [catVisible, setCatVisible] = useState(false);
  let [squirrelVisible, setSquirrelVisible] = useState(false);
  let [rabbitVisible, setRabbitVisible] = useState(false);
  let [dolphinVisible, setDolphinVisible] = useState(false);
  let [whaleVisible, setWhaleVisible] = useState(false);
  let [elephantVisible, setElephantVisible] = useState(false);
  let [skinwalkerVisible, setSkinwalkerVisible] = useState(false);

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

  const map = useMapData();
  const data = useData();
  const width = 960; //width and height control size of area for svg
  const height = 700;
  const dateHistogramSize = 0.2; //sets size of histogram
  const [brushExtent, setBrushExtent] = useState(); // values for brush range
  const xValue = d => d['date']; // xValue is called here instead of index.js in DateHistogram for data filtering

  //this statement places a loading screen if data is not yet loaded
  if (!map || !data) { 
    return <pre>Loading...</pre>;
  }

  //data filtering
  const filteredData = brushExtent ? data.filter(d => { 
    const date = xValue(d);
    return date > brushExtent[0] && date < brushExtent[1]; //sets date range between start point and end point of brush
  }) : data;

  //THE FOLLOWING CODE IS LIKELY INCREDIBLY INEFFICIENT.

  if (allVisible === true) {
  return (
    <header>
      <h1>Bubble Map - All</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMap data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={data} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    </header>
  )
};

  if (dogVisible === true) {
  return (
    <header>
      <h1>Bubble Map - Dog</h1>
      <div>
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapDog data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={data} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    </header>
  )
};

if (catVisible === true) {
  return (
    <header>
      <h1>Bubble Map - Cat</h1>
      <div>
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapCat data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={data} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    </header>
  )
};

if (squirrelVisible === true) {
  return (
    <header>
      <h1>Bubble Map - Squirrel</h1>
      <div>
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapSquirrel data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={data} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    </header>
  )
};

if (rabbitVisible === true) {
  return (
    <header>
      <h1>Bubble Map - Rabbit</h1>
      <div>
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapRabbit data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={data} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    </header>
  )
};

if (dolphinVisible === true) {
  return (
    <header>
      <h1>Bubble Map - Dolphin</h1>
      <div>
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapDolphin data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={data} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    </header>
  )
};

if (whaleVisible === true) {
  return (
    <header>
      <h1>Bubble Map - Whale</h1>
      <div>
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapWhale data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={data} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    </header>
  )
};

if (elephantVisible === true) {
  return (
    <header>
      <h1>Bubble Map - Elephant</h1>
      <div>
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapElephant data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={data} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    </header>
  )
};

if (skinwalkerVisible === true) {
  return (
    <header>
      <h1>Bubble Map - Skinwalker</h1>
      <div>
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapSkinwalker data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={data} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    </header>
  )
};

};

export default BubbleMapRender;