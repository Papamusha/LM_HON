import React from 'react';
import { useData } from '../useData';
import { LineChart } from './LineChart';

const width = window.innerWidth;
const height = window.innerHeight;

const MultiLineChart = () => {
  const data = useData();
  return data
    ? <LineChart data={data} width={width} height={height} />
    : <div>Loading...</div>;
};

export default MultiLineChart;
