import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/Papamusha/cb1f87b0bd5697c7981afe4efac51966/raw/fa8995bb35f30d7e139b2058d23a9db06691124e/smhashlocavg.csv';

const row = d => {
  d['hashtag'] = d['hashtag'];
  d['hashtagCount'] = +d['hashtagCount'];
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
