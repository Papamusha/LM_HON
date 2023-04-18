import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/Papamusha/f4c09b1e2a943f09ab366bb9d452ea9b/raw/7a2b4f6d4b26bad134e72371e778a07b3d9e2164/smhashloc-whale-only.csv';

  //specify columns for each row
const row = d => {
  //return d.hashtag, +d.hashtagCount;
  return +d.hashtagCount;
};

export const useDataAvWhale = () => {
  const [data, setData] = useState(null);
//set data
  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  //data loading message
  if (!data) {
    return console.log('data loading...');
  }

console.log(data);
  return data;
};

