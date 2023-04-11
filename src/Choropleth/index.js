import React from 'react';
import { interpolateTurbo, scaleSequential, max } from 'd3';
import { useMapData } from '../Data/useMapData - Choropleth';
//import { useMapData } from '../Data/useMapData';
import { useDataChoropleth } from './useDataChoropleth';
import { useDataAv } from '../Data/useDataAv';
//import { useData } from '../Data/useData';
import { useCodes } from './useCodes';
import { Marks } from './Marks';
import { mean } from 'd3';

//set width and height for graph
const width = 960;
const height = 500;
const Choropleth = () => {
  //set map and data
  const map = useMapData();
  const data = useDataChoropleth();
  const codes = useCodes();
  const dataAv = useDataAv();

//display loading message while data loads
  if (!map || !data || !codes) {
    return <pre>Loading...</pre>;
  }
  
  //maps useCodes values into a layout that matches data
  const numCodeToCode = new Map();
  codes.forEach(code => {
    const codeA = code['alpha-3'];
    const numCode = code['country-code'];
    numCodeToCode.set(codeA, numCode);
  });

  //maps the code for each row 
  const rowCode = new Map();
  data.forEach(d => {
    const codeA = d.Code;
    const numCode = numCodeToCode.get(codeA);
    rowCode.set(numCode, d);
  });

  //calc average
  //averageAll is set to a placeholder value beforehand to prevent program from trying to calculate before data is loaded
  var averageAll = 12;
  var averageAll =  Math.round(mean(dataAv));
    console.log('AverageAll: ' + averageAll);

    //set colour value to change according to hashtagCount scale
  const colourValue = d => d.hashtagCount;

  const colourScale = scaleSequential(interpolateTurbo).domain([
    0,
    max(data, colourValue)
  ]);

  return (
    <header>
    <svg width={width} height={height}>
      <Marks
        map={map}
        rowCode={rowCode}
        colourScale={colourScale}
        colourValue={colourValue}
      />
    </svg>
    <h5>Average Value: {averageAll}</h5>
    <h5>Coordinate data does not work on this graph right now.</h5>
    </header>
  );
};

export default Choropleth;
