import React from 'react';
import { interpolateTurbo, scaleSequential, max } from 'd3';
import { useMapData } from '../Data/useMapData - Choropleth';
import { useDataChoropleth } from './useDataChoropleth';
//import { useData } from '../Data/useData';
import { useCodes } from './useCodes';
import { Marks } from './Marks';

const width = 960;
const height = 500;
const Choropleth = () => {
  const map = useMapData();
  const data = useDataChoropleth();
  const codes = useCodes();

  if (!map || !data || !codes) {
    return <pre>Loading...</pre>;
  }
  
  const numCodeToCode = new Map();
  codes.forEach(code => {
    const codeA = code['alpha-3'];
    const numCode = code['country-code'];
    numCodeToCode.set(codeA, numCode);
  });

  const rowCode = new Map();
  data.forEach(d => {
    const codeA = d.Code;
    const numCode = numCodeToCode.get(codeA);
    rowCode.set(numCode, d);
  });

  const colourValue = d => d.hashtagCount;

  const colourScale = scaleSequential(interpolateTurbo).domain([
    0,
    max(data, colourValue)
  ]);

  return (
    <svg width={width} height={height}>
      <Marks
        map={map}
        rowCode={rowCode}
        colourScale={colourScale}
        colourValue={colourValue}
      />
    </svg>
  );
};

export default Choropleth;
