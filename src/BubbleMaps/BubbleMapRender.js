import { useMapData } from '../Data/useMapData';
import { useData } from '../Data/useData';
import { useDataAv } from '../Data/useDataAv';
import { useDataAvDog } from '../Data/useDataAvDog';
import { useDataAvCat } from '../Data/useDataAvCat';
import { useDataAvDolphin } from '../Data/useDataAvDolphin';
import { useDataAvElephant } from '../Data/useDataAvElephant';
import { useDataAvRabbit } from '../Data/useDataAvRabbit';
import { useDataAvSkinwalker } from '../Data/useDataAvSkinwalker';
import { useDataAvSquirrel } from '../Data/useDataAvSquirrel';
import { useDataAvWhale } from '../Data/useDataAvWhale';
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
import { BubbleMapCatDog } from './BubbleMap Cat & Dog';
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
  { value: 'cats & dogs', label: 'Cat & Dog'}
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
  let [catAndDogVisible, setCatAndDogVisible] = useState(false);

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
    selectedValue === "cats & dogs" ? setCatAndDogVisible(true) : setCatAndDogVisible(false);
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
  console.log('Cat & Dog = ' + catAndDogVisible);

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

  //these attempts to filter dataAv to only include the relevant hashtag do not work
  //they return undefined
  //var dataAvDog = dataAv.filter(d => d.hashtag === 'dogs');
  const dataAvDog = useDataAvDog();
  //var dataAvCat = dataAv.filter(d => d.hashtag === 'cats');  
  const dataAvCat = useDataAvCat();  
  //var dataAvDolphin = dataAv.filter(d => d.hashtag === 'dolphins');  
  const dataAvDolphin = useDataAvDolphin();  
  //var dataAvWhale = dataAv.filter(d => d.hashtag === 'whales');  
  const dataAvWhale = useDataAvWhale();  
  //var dataAvRabbit = dataAv.filter(d => d.hashtag === 'rabbits');  
  const dataAvRabbit = useDataAvRabbit();  
  //var dataAvSquirrel = dataAv.filter(d => d.hashtag === 'squirrels');  
  const dataAvSquirrel = useDataAvSquirrel();  
  //var dataAvElephant = dataAv.filter(d => d.hashtag === 'skinwalkers');  
  const dataAvElephant = useDataAvElephant(); 
  //var dataAvSkinwalker = dataAv.filter(d => d.hashtag === 'skinwalkers');  
  const dataAvSkinwalker = useDataAvSkinwalker();  
  console.log(dataAvDog);  

  //svgExport.downloadSVG(
    //document.getElementById("bmap"),
    //"BubbleMap - All",
    //{width: 960, height: 700}
  //);

  //this statement places a loading screen if data is not yet loaded
  if (!map || !data || !dataAv || !dataAvDog || !dataAvCat || !dataAvDolphin || !dataAvWhale || !dataAvRabbit || !dataAvSquirrel || !dataAvElephant || !dataAvSkinwalker ) { 
    return <pre>Loading...</pre>;
  }

  //data filtering
  const filteredData = brushExtent ? data.filter(d => { 
    const date = xValue(d);
    return date > brushExtent[0] && date < brushExtent[1]; //sets date range between start point and end point of brush
  }) : data;



  //average calculations
  //average values are vars set to a numerical value before attempting calculation, as it will attempt to perform the calculation before the data loads if they are not given a placeholder value beforehand.
    var averageAll = 12;
    var averageAll =  Math.round(mean(dataAv));
    console.log('AverageAll: ' + averageAll);
    var averageDog = 12;
    var averageDog = Math.round(mean(dataAvDog));
    console.log('AverageDog: ' + averageDog);
    var averageCat = 12;
    var averageCat = Math.round(mean(dataAvCat));
    console.log('AverageCat: ' + averageCat);
    var averageDolphin = 12;
    var averageDolphin = Math.round(mean(dataAvDolphin));
    console.log('AverageDolphin: ' + averageDolphin);
    var averageWhale = 12;
    var averageWhale = Math.round(mean(dataAvWhale));
    console.log('AverageWhale: ' + averageWhale);
    var averageRabbit = 12;
    var averageRabbit = Math.round(mean(dataAvRabbit));
    console.log('AverageRabbit: ' + averageRabbit);
    var averageSquirrel = 12;
    var averageSquirrel = Math.round(mean(dataAvSquirrel));
    console.log('AverageSquirrel: ' + averageSquirrel);
    var averageElephant = 12;
    var averageElephant = Math.round(mean(dataAvElephant));
    console.log('AverageElephant: ' + averageElephant);
    var averageSkinwalker = 12;
    var averageSkinwalker = Math.round(mean(dataAvSkinwalker));
    console.log('AverageSkinwalker: ' + averageSkinwalker);

    var averageCatAndDog = 12;
    var averageCatAndDog = ((averageDog + averageCat) / 2);
    console.log('AverageCat&Dog: ' + averageCatAndDog);

    var slice1 = data.slice(0, 19);
    var slice2 = data.slice(20, 39);
    var slice3 = data.slice(40, 59);
    var slice4 = data.slice(60, 79);
    var slice5 = data.slice(80, 99);

    var slice1Result = slice1.map(d => d['hashtagCount']);
    var slice2Result = slice2.map(d => d['hashtagCount']);
    var slice3Result = slice3.map(d => d['hashtagCount']);
    var slice4Result = slice4.map(d => d['hashtagCount']);
    var slice5Result = slice5.map(d => d['hashtagCount']);

    var dataSlice1Av = Math.round(mean(slice1Result));
    var dataSlice2Av = Math.round(mean(slice2Result));
    var dataSlice3Av = Math.round(mean(slice3Result));
    var dataSlice4Av = Math.round(mean(slice4Result));
    var dataSlice5Av = Math.round(mean(slice5Result));

    console.log('Data Slice 1: ' + dataSlice1Av);
    console.log('Data Slice 2: ' + dataSlice2Av);
    console.log('Data Slice 3: ' + dataSlice3Av);
    console.log('Data Slice 4: ' + dataSlice4Av);
    console.log('Data Slice 5: ' + dataSlice5Av);


  //THE FOLLOWING CODE IS LIKELY INCREDIBLY INEFFICIENT.
   //the outcomes are determined on average values and value of dropdown
   //There is a total of 40 possible outcomes, (10x4) 4 different outcomes depending on average value for each of the 9 search terms

   //commentary only written on 1st outcome, only changes are data called and/or element called

   //Dropdown creates the dropdown created above, used to select which term to use
   //BubbleMap displays the map with data points
   //DateHistogram displays the histogram that lets filter via brush in terms of date
   //spans are used to display graph legend, the repeated &nbsp; are spaces to make sure the legend does not intersect as they are displayed horizontally.
   //Average Value is displayed and an appropriate scale is shown.

  if (allVisible === true && averageAll < 50000) {
  return (
    <header>
      <h1>Bubble Map - Dog, Cat, Dolphin, +5</h1>
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
    </svg> <br/>
    <span class="Blegend-color-1">Cat </span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-2">Dog</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-3">Squirrel</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-4">Rabbit</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-5">Dolphin</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-6">Whale</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-7">Elephant</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-8">Skinwalker</span>
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
      <h1>Bubble Map - Dog, Cat, Dolphin, +5</h1>
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
    </svg> <br/>
    <span class="Blegend-color-1">Cat </span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-2">Dog</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-3">Squirrel</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-4">Rabbit</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-5">Dolphin</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-6">Whale</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-7">Elephant</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-8">Skinwalker</span>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LowerMedScale />
    </header>
  )
};

if (allVisible === true && averageAll < 500000 && dataSlice1Av > (dataSlice2Av * 1.2)) {
  return (
    <header>
      <h1>Bubble Map - Dog, Cat, Dolphin, +5</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg id="Bmap" width={width} height={height}> 
      <BubbleMap data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={data} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
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
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <h5>There is a noticeable drop between chunk 1 Average: {dataSlice1Av} and chunk 2 Average: {dataSlice2Av} which suggests that this topic is less relevant & therefore less sensitive.</h5>
    <MediumScale />
    </header>
  )
};

if (allVisible === true && averageAll > 500000) {
  return (
    <header>
      <h1>Bubble Map - Dog, Cat, Dolphin, +5</h1>
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
    </svg> <br/>
    <span class="Blegend-color-1">Cat </span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-2">Dog</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-3">Squirrel</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-4">Rabbit</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-5">Dolphin</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-6">Whale</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-7">Elephant</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-8">Skinwalker</span>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageAll}</h5> 
    <LargeScale />
    </header>
  )
};

if (catAndDogVisible === true && averageCatAndDog < 50000) {
  return (
    <header>
      <h1>Bubble Map - Dog, Cat</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapCatDog data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={data} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg> <br/>
    <span class="Blegend-color-1">Cat </span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-2">Dog</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Cumulative Average Value: {averageCatAndDog}</h5>
    <h5>Cat Average Value: {averageCat}</h5>
    <h5>Dog Average Value: {averageDog}</h5>
    <SmallScale />
    </header>
  )
};

if (catAndDogVisible === true && averageCatAndDog < 250000) {
  return (
    <header>
      <h1>Bubble Map - Dog, Cat</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapCatDog data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={data} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg> <br/>
    <span class="Blegend-color-1">Cat </span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-2">Dog</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Cumulative Average Value: {averageCatAndDog}</h5>
    <h5>Cat Average Value: {averageCat}</h5>
    <h5>Dog Average Value: {averageDog}</h5>
    <LowerMedScale />
    </header>
  )
};

if (catAndDogVisible === true && averageCatAndDog < 500000) {
  return (
    <header>
      <h1>Bubble Map - Dog, Cat</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapCatDog data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={data} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg> <br/>
    <span class="Blegend-color-1">Cat </span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-2">Dog</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Cumulative Average Value: {averageCatAndDog}</h5>
    <h5>Cat Average Value: {averageCat}</h5>
    <h5>Dog Average Value: {averageDog}</h5>
    <MediumScale />
    </header>
  )
};

if (catAndDogVisible === true && averageCatAndDog > 500000) {
  return (
    <header>
      <h1>Bubble Map - Dog, Cat</h1>
      <div className="dropdown-container">
      <label for="hashtag-select">Choose a search term:</label>
      <Dropdown id="hashtag-select"
        options={options} selectedValue={selectedValue} onSelectedValueChange={setSelectedValue}
      />
    </div>
    <svg width={width} height={height}> 
      <BubbleMapCatDog data={data} filteredData={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram data={data} width={width} height={dateHistogramSize * height} setBrushExtent={setBrushExtent} xValue={xValue}
        />
      </g>
    </svg> <br/>
    <span class="Blegend-color-1">Cat </span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <span class="Blegend-color-2">Dog</span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Cumulative Average Value: {averageCatAndDog}</h5>
    <h5>Cat Average Value: {averageCat}</h5>
    <h5>Dog Average Value: {averageDog}</h5>
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
    </svg> <br/>
    <span class="Blegend-color-2">Dog</span> &nbsp; &nbsp; &nbsp; 
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
    </svg> <br/>
    <span class="Blegend-color-2">Dog</span> &nbsp; &nbsp; &nbsp; 
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
    </svg> <br/>
    <span class="Blegend-color-2">Dog</span> &nbsp; &nbsp; &nbsp; 
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
    </svg> <br/>
    <span class="Blegend-color-2">Dog</span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageDog}</h5> 
    <LargeScale />
    </header>
  )
};

if (catVisible === true && averageCat < 50000) {
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
    </svg> <br/>
    <span class="Blegend-color-1">Cat </span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageCat}</h5> 
    <SmallScale />
    </header>
  )
};

if (catVisible === true && averageCat < 250000) {
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
    </svg> <br/>
    <span class="Blegend-color-1">Cat </span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageCat}</h5> 
    <LowerMedScale />
    </header>
  )
};

if (catVisible === true && averageCat < 500000) {
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
    </svg> <br/>
    <span class="Blegend-color-1">Cat </span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageCat}</h5> 
    <MediumScale />
    </header>
  )
};

if (dogVisible === true && averageCat > 500000) {
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
    </svg> <br/>
    <span class="Blegend-color-1">Cat </span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageCat}</h5> 
    <LargeScale />
    </header>
  )
};

if (squirrelVisible === true && averageSquirrel < 50000) {
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
    </svg> <br/>
    <span class="Blegend-color-3">Squirrel</span> &nbsp; &nbsp; &nbsp;
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageSquirrel}</h5> 
    <SmallScale />
    </header>
  )
};

if (squirrelVisible === true && averageSquirrel < 250000) {
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
    </svg> <br/>
    <span class="Blegend-color-3">Squirrel</span> &nbsp; &nbsp; &nbsp;
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageSquirrel}</h5> 
    <LowerMedScale />
    </header>
  )
};

if (squirrelVisible === true && averageSquirrel < 500000) {
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
    </svg> <br/>
    <span class="Blegend-color-3">Squirrel</span> &nbsp; &nbsp; &nbsp;
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageSquirrel}</h5> 
    <MediumScale />
    </header>
  )
};

if (squirrelVisible === true && averageSquirrel > 500000) {
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
    </svg> <br/>
    <span class="Blegend-color-3">Squirrel</span> &nbsp; &nbsp; &nbsp;
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageSquirrel}</h5> 
    <LargeScale />
    </header>
  )
};

if (rabbitVisible === true && averageRabbit < 50000) {
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
    </svg> <br/>
    <span class="Blegend-color-4">Rabbit</span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageRabbit}</h5> 
    <SmallScale />
    </header>
  )
};

if (rabbitVisible === true && averageRabbit < 250000) {
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
    </svg> <br/>
    <span class="Blegend-color-4">Rabbit</span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageRabbit}</h5> 
    <LowerMedScale />
    </header>
  )
};

if (rabbitVisible === true && averageRabbit < 500000) {
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
    </svg> <br/>
    <span class="Blegend-color-4">Rabbit</span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageRabbit}</h5> 
    <MediumScale />
    </header>
  )
};

if (rabbitVisible === true && averageRabbit > 500000) {
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
    </svg> <br/>
    <span class="Blegend-color-4">Rabbit</span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageRabbit}</h5> 
    <LargeScale />
    </header>
  )
};

if (dolphinVisible === true && averageDolphin < 50000) {
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
    </svg> <br/>
    <span class="Blegend-color-5">Dolphin</span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageDolphin}</h5> 
    <SmallScale />
    </header>
  )
};

if (dolphinVisible === true && averageDolphin < 250000) {
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
    </svg> <br/>
    <span class="Blegend-color-5">Dolphin</span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageDolphin}</h5> 
    <LowerMedScale />
    </header>
  )
};

if (dolphinVisible === true && averageDolphin < 500000) {
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
    </svg> <br/>
    <span class="Blegend-color-5">Dolphin</span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageDolphin}</h5> 
    <MediumScale />
    </header>
  )
};

if (dolphinVisible === true && averageDolphin > 500000) {
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
    </svg> <br/>
    <span class="Blegend-color-5">Dolphin</span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageDolphin}</h5> 
    <LargeScale />
    </header>
  )
};

if (whaleVisible === true && averageWhale < 50000) {
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
    </svg> <br/>
    <span class="Blegend-color-6">Whale</span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageWhale}</h5> 
    <SmallScale />
    </header>
  )
};

if (whaleVisible === true && averageWhale < 250000) {
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
    </svg> <br/>
    <span class="Blegend-color-6">Whale</span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageWhale}</h5> 
    <LowerMedScale />
    </header>
  )
};

if (whaleVisible === true && averageWhale < 500000) {
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
    </svg> <br/>
    <span class="Blegend-color-6">Whale</span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageWhale}</h5> 
    <MediumScale />
    </header>
  )
};

if (whaleVisible === true && averageWhale > 500000) {
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
    </svg> <br/>
    <span class="Blegend-color-6">Whale</span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageWhale}</h5> 
    <LargeScale />
    </header>
  )
};

if (elephantVisible === true && averageElephant < 50000) {
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
    </svg> <br/>
    <span class="Blegend-color-7">Elephant</span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageElephant}</h5> 
    <SmallScale />
    </header>
  )
};

if (elephantVisible === true && averageElephant < 250000) {
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
    </svg> <br/>
    <span class="Blegend-color-7">Elephant</span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageElephant}</h5> 
    <LowerMedScale />
    </header>
  )
};

if (elephantVisible === true && averageElephant < 500000) {
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
    </svg> <br/>
    <span class="Blegend-color-7">Elephant</span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageElephant}</h5> 
    <MediumScale />
    </header>
  )
};

if (elephantVisible === true && averageElephant > 500000) {
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
    </svg> <br/>
    <span class="Blegend-color-7">Elephant</span> &nbsp; &nbsp; &nbsp; 
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageElephant}</h5> 
    <LargeScale />
    </header>
  )
};

if (skinwalkerVisible === true && averageSkinwalker < 50000) {
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
    </svg> <br/>
    <span class="Blegend-color-8">Skinwalker</span>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageSkinwalker}</h5> 
    <SmallScale />
    </header>
  )
};

if (skinwalkerVisible === true && averageSkinwalker < 250000) {
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
    </svg> <br/>
    <span class="Blegend-color-8">Skinwalker</span>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageSkinwalker}</h5> 
    <LowerMedScale />
    </header>
  )
};

if (skinwalkerVisible === true && averageSkinwalker < 500000) {
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
    </svg> <br/>
    <span class="Blegend-color-8">Skinwalker</span>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageSkinwalker}</h5> 
    <MediumScale />
    </header>
  )
};

if (skinwalkerVisible === true && averageSkinwalker > 500000) {
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
    </svg> <br/>
    <span class="Blegend-color-8">Skinwalker</span>
    <h3> Use the Histogram above to select time-frame of data.</h3>
    <h4>The Histogram also displays the relevancy of data over time.</h4>
    <h5>Average Value: {averageSkinwalker}</h5> 
    <LargeScale />
    </header>
  )
};

};

export default BubbleMapRender;