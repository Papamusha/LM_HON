import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/Papamusha/cb1f87b0bd5697c7981afe4efac51966/raw/bfe79b4b0b00622d7924f520c3bdb89a2b760685/smhashlocavg.txt';

const row = d => {
  d['hashtag'] = d['hashtag'];
  d['hashtagCount'] = +d['hashtagCount'];
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
