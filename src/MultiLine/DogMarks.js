import { line } from 'd3';

export const DogMarks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue
}) => (
  //path draws line
  <g className="marks">
    <path fill="none" stroke="#25DDE6" strokeWidth={4} d={line().x(d => xScale(xValue(d))).y(d => yScale(yValue(d)))(data)} />  
  </g>
);