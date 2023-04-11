import React, { useMemo } from 'react';
import { scaleSqrt, max } from 'd3';
import { Marks } from './Marks';

const hashtagAtt = d => d['hashtag'];
const sizeValue = d => d['hashtagCount']; //set sizes to hashtag count values
const maxRadius = 15; //set maximum size of data point

export const BubbleMapRabbit = ({ data, filteredData, map }) => {
  const sizeScale = useMemo( //useMemo keeps the data in memory to prevent constant reloading, improves efficiency
    () =>
      scaleSqrt() //scale is square root based
        .domain([0, max(data, sizeValue)])
        .range([0, maxRadius]),
    [data, sizeValue, maxRadius]
  );

  return (
    <Marks
      data={filteredData}
      map={map}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
    />
  );
};
