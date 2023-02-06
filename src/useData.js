import { useState, useEffect } from 'react';
import { csv, csvParse } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/Papamusha/af9c1638e971c4321e507cd6f50b8ac4/raw/0199d50610efc4c03bafea7f98bc59f11fa96c61/smhashloc.csv';

const row = d => {
  d.coordinates = d['coordinates'].split(',').map(d => +d).reverse();
  d['hashtag'] = csvParse(JSON.stringify(d['hashtag']));
  d['date'] = new Date(d['date']);
  return d;
};

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);
  
console.log(data);
  return data;
};
