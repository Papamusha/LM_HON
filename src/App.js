import { useMapData } from './useMapData';
import { useData } from './useData';
import { BubbleMap } from './BubbleMap/index.js';
import { DateHistogram } from './DateHistogram/index.js';
import './App.css';
import { useState } from 'react';

const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => (
  <select id={id} onChange={event => onSelectedValueChange(event.target.value)}>
    {options.map(({ value, label }) => (
      <option value={value} selected={value === selectedValue}>
        {label}
      </option>
    ))}
  </select>
  );

const initialValue = 'dogs';

const options = [
  { value: 'dogs', label: 'Dog' },
  { value: 'cats', label: 'Cat' },
  { value: 'squirrels', label: 'Squirrel' },
  { value: 'rabbits', label: 'Rabbit' },
  { value: 'dolphins', label: 'Dolphin' },
  { value: 'whales', label: 'Whales' },
  { value: 'elephants', label: 'Elephant' },
  { value: 'skinwalkers', label: 'Skinwalker' },
];

const getLabel = value => {
  for(let i = 0; i < options.length; i++){
    if(options[i].value === value);{
      return options[i].label;
    }
  }
};

function App() {
  const [selectedValue, setSelectedValue] = useState(initialValue);
  console.log(selectedValue);
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

  return (
    <header>
      <h1>Honours Project Testing Grounds</h1>
      <div>
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
  );
};

export default App;