import React, { useMemo } from 'react';
import { scaleSqrt, max } from 'd3';
import { Marks } from './Marks';

const sizeValue = d => d['Total Dead and Missing'];
const maxRadius = 15;

export const BubbleMap = ({ data, filteredData, map }) => {

  const sizeScale = useMemo(() => scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, maxRadius]), [data, sizeValue, maxRadius]);

  return (
    <Marks
      map={map}
      data={filteredData}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
    />
  );
};
