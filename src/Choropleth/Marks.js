import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

const missingDataColour = 'black';

export const Marks = ({
  map: { countries, interiors },
  rowCode,
  colourScale,
  colourValue
  //sphere draws map
  //graticules draw land features
  //path sets color of country to missingDataColour
  //interiors draws country lines
}) => (
  <g className="marks">
    <path className="sphere" d={path({ type: 'Sphere' })} />
    <path className="graticules" d={path(graticule())} />
    {countries.features.map(feature => {
      const d = rowCode.get(feature.id);
      if(!d){
        console.log(feature.properties.name);
      }
      return (
        <path
          fill={d ? colourScale(colourValue(d)) : missingDataColour}
          d={path(feature)}
        />
      );
    })}
    <path className="interiors" d={path(interiors)} />
  </g>
);
