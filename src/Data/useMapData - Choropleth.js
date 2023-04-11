import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

export const useMapData = () => {
  const [data, setData] = useState(null);
  console.log(data);

  //set data
  useEffect(() => {
    json(jsonUrl).then(topology => {
      //each country is an object, it consists of the values 'countries' and 'land'
      const { countries, land } = topology.objects;
      setData({
        //set country features and interior
        countries: feature(topology, countries),
        interiors: mesh(topology, countries, (a, b) => a !== b)
      });
    });
  }, []);

  return data;
};
