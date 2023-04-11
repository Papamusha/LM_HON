import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';
import { useMemo } from 'react';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({
  map: { land, interiors },
  data,
  sizeScale,
  sizeValue
}) => (
  <g className="marks">
    { useMemo(() => //useMemo is used to stop the scale from being reloaded more than once for optimisation
    //sphere draws map
    //graticules draw land features
    //data.map projects data points based on coordinates, filters data and returns the circles at data points of appropriate size
    <>
    <path className="sphere" d={path({ type: 'Sphere' })} /> 
    <path className="graticules" d={path(graticule())} />
    {land.features.map(feature => (
      <path className="land" d={path(feature)} />
    ))}
    <path className="interiors" d={path(interiors)} />
    </>,[path, graticule, interiors, land])
    }
    {data.map(d => {
      const [x, y] = projection(d.coordinates);
      if (d['hashtag'] === 'rabbits')
      return <circle cx={x} cy={y} r={sizeScale(sizeValue(d))} />;
    })}
  </g>
);
