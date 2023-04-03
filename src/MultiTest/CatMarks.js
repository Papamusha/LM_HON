import { line } from 'd3';

export const CatMarks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue
}) => (
  <g className="marksCat">
      <path fill="none" stroke="#17C82C" strokeWidth={4} d={line().x(d => xScale(xValue(d))).y(d => yScale(yValue(d)))(data)} />  
  </g>
);
