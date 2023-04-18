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
      if (d['hashtag'] === 'dogs')
      return <circle className="dogMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
      console.log(d['hashtag']);
    })}
    {data.map(d => {
      if (d['hashtag'] === 'cats')
      return <circle className="catMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
      console.log(d['hashtag']);
    })}
    {data.map(d => {
      if (d['hashtag'] === 'dolphins')
      return <circle className="dolphinMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
      console.log(d['hashtag']);
    })}
    {data.map(d => {
      if (d['hashtag'] === 'whales')
      return <circle className="whaleMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
      console.log(d['hashtag']);
    })}
    {data.map(d => {
      if (d['hashtag'] === 'rabbits')
      return <circle className="rabbitMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
      console.log(d['hashtag']);
    })}
    {data.map(d => {
      if (d['hashtag'] === 'squirrels')
      return <circle className="squirrelMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
      console.log(d['hashtag']);
    })}
    {data.map(d => {
      if (d['hashtag'] === 'elephants')
      return <circle className="elephantMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
      console.log(d['hashtag']);
    })}
    {data.map(d => {
      if (d['hashtag'] === 'skinwalkers')
      return <circle className="skinwalkerMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
      console.log(d['hashtag']);
    })}
  </g>
);
