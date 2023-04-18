import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/Papamusha/ab210d04004b3c1003bb601314b5a202/raw/1d30ea519aef81e05c8eefbd95a0352fa7814414/smhashloc-rabbit-only.csv';

  //specify columns for each row
const row = d => {
  //return d.hashtag, +d.hashtagCount;
  return +d.hashtagCount;
};

export const useDataAvRabbit = () => {
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

