import { line } from 'd3';

export const DolphinMarks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue
}) => (
  <g className="marks">
    <path fill="none" stroke="#DD25E6" strokeWidth={4} d={line().x(d => xScale(xValue(d))).y(d => yScale(yValue(d)))(data)} />  
  </g>
);
