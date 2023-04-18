import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/Papamusha/9ea471fe744e988f23e0cb48898c3233/raw/74da3ebe886d7b12ca71ee58efddae394869f239/smhashloc-squirrel-only.csv';

  //specify columns for each row
const row = d => {
  //return d.hashtag, +d.hashtagCount;
  return +d.hashtagCount;
};

export const useDataAvSquirrel = () => {
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

