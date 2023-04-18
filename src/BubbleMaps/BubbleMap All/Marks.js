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
      [path, graticule, interiors, land] //for each data.map seen below, it renders the data points for each search term while assigning a className to allow for each search term to have its own designated colour on the bubblemap.
    )} 
    {data.map((d) => {
      const [x, y] = projection(d.coordinates); {/* positions spheres based on coordinate values */}
        if (d["hashtag"] === "cats") 
      return <circle className="catMark" cx={x} cy={y} r={sizeScale(sizeValue(d))} />; {/* draw spheres on data points */}
    })}
    {data.map((d) => {
      const [x, y] = projection(d.coordinates); {/* positions spheres based on coordinate values */}
          if (d["hashtag"] === "dogs") 
        return <circle className="dogMark" cx={x} cy={y} r={sizeScale(sizeValue(d))} />; {/* draw spheres on data points */}
    })}
    {data.map((d) => {
      const [x, y] = projection(d.coordinates); {/* positions spheres based on coordinate values */}
          if (d["hashtag"] === "dolphins") 
        return <circle className="dolphinMark" cx={x} cy={y} r={sizeScale(sizeValue(d))} />; {/* draw spheres on data points */}
    })}
    {data.map((d) => {
      const [x, y] = projection(d.coordinates); {/* positions spheres based on coordinate values */}
          if (d["hashtag"] === "whales") 
        return <circle className="whaleMark" cx={x} cy={y} r={sizeScale(sizeValue(d))} />; {/* draw spheres on data points */}
    })}
    {data.map((d) => {
      const [x, y] = projection(d.coordinates); {/* positions spheres based on coordinate values */}
          if (d["hashtag"] === "rabbits") 
        return <circle className="rabbitMark" cx={x} cy={y} r={sizeScale(sizeValue(d))} />; {/* draw spheres on data points */}
    })}
    {data.map((d) => {
      const [x, y] = projection(d.coordinates); {/* positions spheres based on coordinate values */}
          if (d["hashtag"] === "squirrels") 
        return <circle className="squirrelMark" cx={x} cy={y} r={sizeScale(sizeValue(d))} />; {/* draw spheres on data points */}
    })}
    {data.map((d) => {
      const [x, y] = projection(d.coordinates); {/* positions spheres based on coordinate values */}
          if (d["hashtag"] === "elephants") 
        return <circle className="elephantMark" cx={x} cy={y} r={sizeScale(sizeValue(d))} />; {/* draw spheres on data points */}
    })}
    {data.map((d) => {
      const [x, y] = projection(d.coordinates); {/* positions spheres based on coordinate values */}
          if (d["hashtag"] === "skinwalkers") 
        return <circle className="skinwalkerMark" cx={x} cy={y} r={sizeScale(sizeValue(d))} />; {/* draw spheres on data points */}
    })}
  </g>
);
