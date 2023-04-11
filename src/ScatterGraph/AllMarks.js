export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  Format,
  circleRadius
}) => (
  //circle draws data points on graph
  <g className="marks">
    {data.map(d => {
      return <circle cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
    })}
  </g>
);
