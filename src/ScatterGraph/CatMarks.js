export const CatMarks = ({
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
      if (d['hashtag'] === 'cats')
      return <circle className="catMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
      console.log(d['hashtag']);
    })}
  </g>
);
