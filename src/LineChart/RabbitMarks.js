import { line } from 'd3';

export const RabbitMarks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  Format,
  circleRadius
}) => (
  //path draws line
  //circle draws data points
  <g className="marks">
      <path fill="none" stroke="#0b4e52" d={line().x(d => xScale(xValue(d))).y(d => yScale(yValue(d)))(data)} />  
      {data.map(d => {
        if (d['hashtag'] === 'rabbits') //filter
      return <circle className="rabbitMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
    })}
  </g>
);
