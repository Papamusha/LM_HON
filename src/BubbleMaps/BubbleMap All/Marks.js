import { geoNaturalEarth1, geoPath, geoGraticule } from "d3";
import { useMemo } from "react";

const projection = geoNaturalEarth1(); //draw globe projection
const path = geoPath(projection); //draw path
const graticule = geoGraticule(); //draw land features (this is complex, info can be found at https://github.com/d3/d3-geo)

export const Marks = ({
  map: { land, interiors },
  data,
  sizeScale,
  sizeValue,
}) => (
  <g className="marks">
    {useMemo(
      () => (
        //useMemo is used to stop the scale from being reloaded more than once for optimisation
        <>
          <path className="sphere" d={path({ type: "Sphere" })} /> {/* draw map */}
          <path className="graticules" d={path(graticule())} /> {/* draw land features */}
          {land.features.map((feature) => (
            <path className="land" d={path(feature)} />
          ))}
          <path className="interiors" d={path(interiors)} />
        </>
      ),
      [path, graticule, interiors, land]
    )}
    {data.map((d) => {
      const [x, y] = projection(d.coordinates); {/* positions spheres based on coordinate values */}
      return <circle cx={x} cy={y} r={sizeScale(sizeValue(d))} />; {/* draw spheres on data points */}
    })}
  </g>
);
