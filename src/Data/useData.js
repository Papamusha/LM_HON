import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/Papamusha/9369db1a13fe318d3435de5a68357d59/raw/7c737f9dddf81165673b8237093a969b0a0be3ed/gistfile1.txt';

const row = d => {
  d['hashtag'] = d['hashtag'];
  d.coordinates = d['coordinates'].split(',').map(d => +d).reverse();
  d['hashtagCount'] = +d['hashtagCount'];
  d['date'] = new Date(d['date']);
  return d;
};

export const useData = () => {
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

