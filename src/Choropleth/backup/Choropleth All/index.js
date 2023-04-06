import React, { useMemo } from "react";
import { scaleSequential, max, interpolateCividis } from "d3";
import { Marks } from "./Marks";

const hashtagAtt = (d) => d["hashtag"];
const colorValue = (d) => d["hashtagCount"];

const rowByCountry = new Map();
//data.forEach(d => {
  //rowByCountry.set(d.Location, d);
//})

console.log(rowByCountry);

export const Choropleth = ({ data, rowByCountry }) => {
  const colorScale = useMemo(
    () =>
      scaleSequential(interpolateCividis)
        .domain([0, max(data, colorValue)])
  );

  return (
    <Marks
      data={data}
      rowByCountry={rowByCountry}
      colorScale={colorScale}
      colorValue={colorValue}
    />
  );
};
