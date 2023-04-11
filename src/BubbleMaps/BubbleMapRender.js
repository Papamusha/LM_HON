import { useMapData } from '../Data/useMapData';
import { useData } from '../Data/useData';
import { useDataAv } from '../Data/useDataAv';
import { useDataDog } from '../Data/useDataDog';
import { useDataCat } from '../Data/useDataCat';
import { useDataDolphin } from '../Data/useDataDolphin';
import { useDataWhale } from '../Data/useDataWhale';
import { useDataRabbit } from '../Data/useDataRabbit';
import { useDataSquirrel } from '../Data/useDataSquirrel';
import { useDataElephant } from '../Data/useDataElephant';
import { useDataSkinwalker } from '../Data/useDataSkinwalker';
import { BubbleMap } from './BubbleMap All/index.js';
import { BubbleMapDog } from './BubbleMap Dog/index.js';
import { BubbleMapCat } from './BubbleMap Cat/index.js';
import { BubbleMapSquirrel } from './BubbleMap Squirrel/index.js';
import { BubbleMapRabbit } from './BubbleMap Rabbit/index.js';
import { BubbleMapDolphin } from './BubbleMap Dolphin/index.js';
import { BubbleMapWhale } from './BubbleMap Whale/index.js';
import { BubbleMapElephant } from './BubbleMap Elephant/index.js';
import { BubbleMapSkinwalker } from './BubbleMap Skinwalker/index.js';
import { DateHistogram } from '../DateHistogram/index.js';
import '../General.css';
import { useState, useEffect } from 'react';
import { mean } from 'd3';
import { SmallScale } from './SmallScale';
import { LowerMedScale } from './LowerMedScale';
import { MediumScale } from './MedScale';
import { LargeScale } from './LargeScale';

//Dropdown which users use to select the search term to display
//This is visible at all times on the bubblemap page
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



function BubbleMapRender() {
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

  //call in all data
  const map = useMapData();
  const data = useData();
  const dataDog = useDataDog();
  const dataCat = useDataCat();
  const dataDolphin = useDataDolphin();
  const dataWhale = useDataWhale();
  const dataElephant = useDataElephant();
  const dataRabbit = useDataRabbit();
  const dataSquirrel = useDataSquirrel();
  const dataSkinwalker = useDataSkinwalker();
  //width and height control size of area for svg
  const width = 960; 
  const height = 700;
  //sets size of histogram
  const dateHistogramSize = 0.2; 
  //values for brush range
  const [brushExtent, setBrushExtent] = useState(); 
  //xValue is called for data filtering
  const xValue = d => d['date']; 
  const dataAv = useDataAv();

  //this statement places a loading screen if data is not yet loaded
  if (!map || !data) { 
  //attempt to get the webpage to wait until the data is loaded (it doesn't work)
    window.addEventListener('load', function() {
      alert('loaded successfully');
    })
    return <pre>Loading...</pre>;
  }

  //data filtering
  const filteredData = brushExtent ? data.filter(d => { 
    const date = xValue(d);
    return date > brushExtent[0] && date < brushExtent[1]; //sets date range between start point and end point of brush
  }) : data;

  //these attempts to filter dataAv to only include the relevant hashtag do not work
  //they return undefined
  var dataAvDog = dataAv.filter(d => d.hashtag === 'dogs');
  var dataAvCat = dataAv.filter(d => d.hashtag === 'cats');  
  var dataAvDolphin = dataAv.filter(d => d.hashtag === 'dolphins');  
  var dataAvWhale = dataAv.filter(d => d.hashtag === 'whales');  
  var dataAvRabbit = dataAv.filter(d => d.hashtag === 'rabbits');  
  var dataAvSquirrel = dataAv.filter(d => d.hashtag === 'squirrels');  
  var dataAvSkinwalker = dataAv.filter(d => d.hashtag === 'skinwalkers');  
  console.log(dataAvDog);  

  //setTimeout(() => {console.log('waiting 1 second');}, 1000);

  //average calculations
  //average values are vars set to a numerical value before attempting calculation, as it will attempt to perform the calculation before the data loads if they are not given a placeholder value beforehand.
  var averageAll = 12;
  var averageAll =  Math.round(mean(dataAv));
    console.log('AverageAll: ' + averageAll);

    //this returns undefined
    var averageDog = 12;
    var averageDog = Math.round(mean(dataAvDog));
    console.log('AverageDog: ' + averageDog);

    //this returns undefined
    var averageCat = 12;
    var averageCat = Math.round(mean(dataAvCat));
    console.log('AverageDog: ' + averageCat);

    //this returns undefined
    var averageDolphin = 12;
    var averageDolphin = Math.round(mean(dataAvDolphin));
    console.log('AverageDog: ' + averageDolphin);

    //this returns undefined
    var averageWhale = 12;
    var averageWhale = Math.round(mean(dataAvWhale));
    console.log('AverageDog: ' + averageWhale);

    //this returns undefined
    var averageRabbit = 12;
    var averageRabbit = Math.round(mean(dataAvRabbit));
    console.log('AverageDog: ' + averageRabbit);

    //this returns undefined
    var averageSquirrel = 12;
    var averageSquirrel = Math.round(mean(dataAvSquirrel));
    console.log('AverageDog: ' + averageSquirrel);

    //this returns undefined
    var averageSkinwalker = 12;
    var averageSkinwalker = Math.round(mean(dataAvSkinwalker));
    console.log('AverageDog: ' + averageSkinwalker);

  //THE FOLLOWING CODE IS LIKELY INCREDIBLY INEFFICIENT.
   //the outcomes are determined on average values and value of dropdown
   //There is a total of 36 possible outcomes, (9x4) 4 different outcomes depending on average value for each of the 9 search terms

   //commentary only written on 1st outcome, only changes are data called and/or element called

   //Dropdown creates the dropdown created above, used to select which term to use
   //BubbleMap displays the map with data points
   //DateHistogram displays the histogram that lets filter via brush in terms of date
   //Average Value is displayed and an appropriate scale is shown.
  if (allVisible === true && averageAll < 50000) {
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
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <SmallScale />
    </header>
  )
};

if (allVisible === true && averageAll < 250000) {
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
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LowerMedScale />
    </header>
  )
};

if (allVisible === true && averageAll < 500000) {
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
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <MediumScale />
    </header>
  )
};

if (allVisible === true && averageAll > 500000) {
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
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LargeScale />
    </header>
  )
};

if (dogVisible === true && averageAll < 50000) {
  return (
    <header>
      <h1>Bubble Map - Dog</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapDog data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataDog} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageDog}</h5> 
    <SmallScale />
    </header>
  )
};

if (dogVisible === true && averageAll < 250000) {
  return (
    <header>
      <h1>Bubble Map - Dog</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapDog data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataDog} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageDog}</h5> 
    <LowerMedScale />
    </header>
  )
};

if (dogVisible === true && averageAll < 500000) {
  return (
    <header>
      <h1>Bubble Map - Dog</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapDog data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataDog} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageDog}</h5> 
    <MediumScale />
    </header>
  )
};

if (dogVisible === true && averageAll > 500000) {
  return (
    <header>
      <h1>Bubble Map - Dog</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapDog data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataDog} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageDog}</h5> 
    <LargeScale />
    </header>
  )
};

if (catVisible === true && averageAll < 50000) {
  return (
    <header>
      <h1>Bubble Map - Cat</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapCat data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataCat} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <SmallScale />
    </header>
  )
};

if (catVisible === true && averageAll < 250000) {
  return (
    <header>
      <h1>Bubble Map - Cat</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapCat data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataCat} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LowerMedScale />
    </header>
  )
};

if (catVisible === true && averageAll < 500000) {
  return (
    <header>
      <h1>Bubble Map - Cat</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapCat data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataCat} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <MediumScale />
    </header>
  )
};

if (dogVisible === true && averageAll > 500000) {
  return (
    <header>
      <h1>Bubble Map - Dog</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapCat data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataDog} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LargeScale />
    </header>
  )
};

if (squirrelVisible === true && averageAll < 50000) {
  return (
    <header>
      <h1>Bubble Map - Squirrel</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapSquirrel data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataSquirrel} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <SmallScale />
    </header>
  )
};

if (squirrelVisible === true && averageAll < 250000) {
  return (
    <header>
      <h1>Bubble Map - Squirrel</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapSquirrel data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataSquirrel} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LowerMedScale />
    </header>
  )
};

if (squirrelVisible === true && averageAll < 500000) {
  return (
    <header>
      <h1>Bubble Map - Squirrel</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapSquirrel data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataSquirrel} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <MediumScale />
    </header>
  )
};

if (squirrelVisible === true && averageAll > 500000) {
  return (
    <header>
      <h1>Bubble Map - Squirrel</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapSquirrel data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataSquirrel} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LargeScale />
    </header>
  )
};

if (rabbitVisible === true && averageAll < 50000) {
  return (
    <header>
      <h1>Bubble Map - Rabbit</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapRabbit data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataRabbit} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <SmallScale />
    </header>
  )
};

if (rabbitVisible === true && averageAll < 250000) {
  return (
    <header>
      <h1>Bubble Map - Rabbit</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapRabbit data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataRabbit} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LowerMedScale />
    </header>
  )
};

if (rabbitVisible === true && averageAll < 500000) {
  return (
    <header>
      <h1>Bubble Map - Rabbit</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapRabbit data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataRabbit} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <MediumScale />
    </header>
  )
};

if (rabbitVisible === true && averageAll > 500000) {
  return (
    <header>
      <h1>Bubble Map - Rabbit</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapRabbit data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataRabbit} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LargeScale />
    </header>
  )
};

if (dolphinVisible === true && averageAll < 50000) {
  return (
    <header>
      <h1>Bubble Map - Dolphin</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapDolphin data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataDolphin} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <SmallScale />
    </header>
  )
};

if (dolphinVisible === true && averageAll < 250000) {
  return (
    <header>
      <h1>Bubble Map - Dolphin</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapDolphin data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataDolphin} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LowerMedScale />
    </header>
  )
};

if (dolphinVisible === true && averageAll < 500000) {
  return (
    <header>
      <h1>Bubble Map - Dolphin</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapDolphin data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataDolphin} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <MediumScale />
    </header>
  )
};

if (dolphinVisible === true && averageAll > 500000) {
  return (
    <header>
      <h1>Bubble Map - Dolphin</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapDolphin data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataDolphin} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LargeScale />
    </header>
  )
};

if (whaleVisible === true && averageAll < 50000) {
  return (
    <header>
      <h1>Bubble Map - Whale</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapWhale data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataWhale} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <SmallScale />
    </header>
  )
};

if (whaleVisible === true && averageAll < 250000) {
  return (
    <header>
      <h1>Bubble Map - Whale</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapWhale data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataWhale} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LowerMedScale />
    </header>
  )
};

if (whaleVisible === true && averageAll < 500000) {
  return (
    <header>
      <h1>Bubble Map - Whale</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapWhale data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataWhale} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <MediumScale />
    </header>
  )
};

if (whaleVisible === true && averageAll > 500000) {
  return (
    <header>
      <h1>Bubble Map - Whale</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapWhale data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataWhale} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LargeScale />
    </header>
  )
};

if (elephantVisible === true && averageAll < 50000) {
  return (
    <header>
      <h1>Bubble Map - Elephant</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapElephant data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataElephant} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <SmallScale />
    </header>
  )
};

if (elephantVisible === true && averageAll < 250000) {
  return (
    <header>
      <h1>Bubble Map - Elephant</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapElephant data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataElephant} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LowerMedScale />
    </header>
  )
};

if (elephantVisible === true && averageAll < 500000) {
  return (
    <header>
      <h1>Bubble Map - Elephant</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapElephant data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataElephant} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <MediumScale />
    </header>
  )
};

if (elephantVisible === true && averageAll > 500000) {
  return (
    <header>
      <h1>Bubble Map - Elephant</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapElephant data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataElephant} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LargeScale />
    </header>
  )
};

if (skinwalkerVisible === true && averageAll < 50000) {
  return (
    <header>
      <h1>Bubble Map - Skinwalker</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapSkinwalker data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataSkinwalker} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <SmallScale />
    </header>
  )
};

if (skinwalkerVisible === true && averageAll < 250000) {
  return (
    <header>
      <h1>Bubble Map - Skinwalker</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapSkinwalker data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataSkinwalker} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LowerMedScale />
    </header>
  )
};

if (skinwalkerVisible === true && averageAll < 500000) {
  return (
    <header>
      <h1>Bubble Map - Skinwalker</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapSkinwalker data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataSkinwalker} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <MediumScale />
    </header>
  )
};

if (skinwalkerVisible === true && averageAll > 500000) {
  return (
    <header>
      <h1>Bubble Map - Skinwalker</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapSkinwalker data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={dataSkinwalker} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LargeScale />
    </header>
  )
};

};

export default BubbleMapRender;