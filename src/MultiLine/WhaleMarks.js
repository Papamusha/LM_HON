import { line } from 'd3';

export const WhaleMarks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue
}) => (
  //path draws line
  <g className="marks">
    <path fill="none" stroke="#25DDE6" d={line().x(d => xScale(xValue(d))).y(d => yScale(yValue(d)))(data)} />  
  </g>
);
