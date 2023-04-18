import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/Papamusha/75613973214d010de891b2d351613a57/raw/04785f003b7b8bdc3096beec85343f03f8ea0169/smhashloc-skinwalker-only.csv';

  //specify columns for each row
const row = d => {
  //return d.hashtag, +d.hashtagCount;
  return +d.hashtagCount;
};

export const useDataAvSkinwalker = () => {
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

