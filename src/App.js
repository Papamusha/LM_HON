import { useMapData } from './useMapData';
import { useData } from './useData';
import { BubbleMap } from './BubbleMap/index.js';
import { DateHistogram } from './DateHistogram/index.js';
import './App.css';
import { useState } from 'react';

function App() {
  const map = useMapData();
  const data = useData();
  const width = 960; //width and height control size of area for svg
  const height = 700;
  const dateHistogramSize = 0.2; //sets size of histogram
  const [brushExtent, setBrushExtent] = useState(); // values for brush range
  const xValue = d => d['Reported Date']; // xValue is called here instead of index.js in DateHistogram for data filtering

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
    <svg width={width} height={height}> 
      <BubbleMap data={filteredData} map={map} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram
          data={data}
          width={width}
          height={dateHistogramSize * height}
          setBrushExtent={setBrushExtent}
          xValue={xValue}
        />
      </g>
    </svg>
    </header>
  );
};

export default App;