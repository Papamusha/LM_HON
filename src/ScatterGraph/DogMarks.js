export const DogMarks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  Format,
  circleRadius
}) => (
  //circle draws points on graph
  // if includes filter condition
  <g className="marks">
    {data.map(d => {
      if (d['hashtag'] === 'dogs')
      return <circle className="dogMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
      console.log(d['hashtag']);
    })}
  </g>
);
