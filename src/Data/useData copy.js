import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/Papamusha/9369db1a13fe318d3435de5a68357d59/raw/7c737f9dddf81165673b8237093a969b0a0be3ed/gistfile1.txt';

const row = d => {
  return +d.hashtagCount;
};

export const useDataAv = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  if (!data) {
    return console.log('data loading...');
  }

console.log(data);
  return data;
};

