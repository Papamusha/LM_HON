import React from 'react';
import ReactDOM from 'react-dom';
import { range } from 'd3';
import { useData } from './useData';
import { LineChart } from './LineChart';

const width = window.innerWidth;
const height = window.innerHeight;

const MultiLineChartDeploy = () => {
  const data = useData();
  return data
    ? <LineChart data={data} width={width} height={height} />
    : <div>Loading...</div>;
};

export default MultiLineChartDeploy;