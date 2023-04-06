import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/Papamusha/af25d7b4e8f4973702ec78974a932395/raw/ab03e645e41da4314e5fb9ef17221a1f46bc9654/smhashloc-choropleth.csv';

const row = d => {
  d.country = d.country;
  d.code = d.code;
  d.date = +d.date;
  d.hashtag = d.hashtag;
  d.hashtagCount = +d.hashtagCount;
  return d;
};

export const useDataChoropleth = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};
