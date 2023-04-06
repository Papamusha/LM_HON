import { geoNaturalEarth1, geoPath, geoGraticule } from "d3";
import { useMemo } from "react";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({
  map: { countries, interiors },
  rowByCountry,
  colorScale,
  colorValue,
}) => (
  <g className="marks">
        <>
          <path className="sphere" d={path({ type: "Sphere" })} />
          <path className="graticules" d={path(graticule())} />
          {countries.features.map((feature) => {
            console.log(feature.properties.hashtag);
            const d = rowByCountry.get(feature.properties.name);
            <path fill={colorScale(colorValue(d))} d={path(feature)} />
          })}
          <path className="interiors" d={path(interiors)} />
        </> 
  </g>
);
