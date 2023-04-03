import { useState, useEffect } from 'react';
import { csv, timeParse } from 'd3';

const csvUrl =
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';

const sum = (accumulator, currentValue) => accumulator + currentValue;

const parseDay = timeParse('%m/%d/%y');

const transform = rawData => {
  
  // Filter out rows that represent provinces or states.
  const countriesData = rawData.filter(d => !d['Province/State']);
  
  // Get timeseries data for each country.
  const days = rawData.columns.slice(4);
  return countriesData.map(d => {
    //const countryName = d['Country/Region'];
    return days.map(day => ({
      date: parseDay(day),
      deathTotal: +d[day]
    }));
  });
};

export const useData = () => {
  const [data, setData] = useState();
  
  console.log(data);
  
  useEffect(() => {
    csv(csvUrl).then(rawData => {
      setData(transform(rawData));
    });
  }, []);

  return data;
};
