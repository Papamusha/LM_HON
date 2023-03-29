import { useState, useEffect } from 'react';
import { csv } from 'd3';

//This file only exists to display that the issue with path filtering is that the filter doesn't tell the path what to path to,
//instead it tells it to path each time it comes across a matching entry, which is why it causes extremely poor performance and doesn't solve the issue.
//without this file, sorting by cat in the line graph would not work due to this path issue that a solution cannot be found for as of now.

//The only difference this file has to useData.js is that the url we are pointing it at is different, it instead points to a pre-filtered gist containing only cat values.
//efforts are being made to allow the program to filter this data itself rather than rely on 10 databases which it will require if this is the only solution.
//one for all data, one for averages data, and one for each hashtag category (eight).

const csvUrl =
  'https://gist.githubusercontent.com/Papamusha/9d86882e9eaf7e200f17dd8ed5394cfd/raw/7fd45334977715e2ea721943a6949e26f57025dc/smhashloc-cat-only.csv';

const row = d => {
  d['hashtag'] = d['hashtag'];
  d.coordinates = d['coordinates'].split(',').map(d => +d).reverse();
  d['hashtagCount'] = +d['hashtagCount'];
  d['date'] = new Date(d['date']);
  return d;
};

export const useDataCat = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  if (!data) {
    return console.log('data loading...');
  }

  data.sort(function(a, b){return a.date - b.date});

console.log(data);
  return data;
};



