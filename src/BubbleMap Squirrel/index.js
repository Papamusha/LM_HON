import React, { useMemo } from 'react';
import { scaleSqrt, max } from 'd3';
import { Marks } from './Marks';

const hashtagAtt = d => d['hashtag'];
const sizeValue = d => d['hashtagCount'];
const maxRadius = 15;

export const BubbleMapSquirrel = ({ data, filteredData, map }) => {

  const sizeScale = useMemo(() => scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, maxRadius]), [data, sizeValue, maxRadius]);

  return (
    <Marks data={filteredData} map={map} sizeScale={sizeScale} sizeValue={sizeValue}/>
  );
};
