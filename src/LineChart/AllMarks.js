import { line } from 'd3';

export const Marks = ({
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
        if (d['hashtag'] === 'cats') //filter
      return <circle className="catMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
    })}
    {data.map(d => {
        if (d['hashtag'] === 'dogs') //filter
      return <circle className="dogMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
    })}
    {data.map(d => {
        if (d['hashtag'] === 'dolphins') //filter
      return <circle className="dolphinMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
    })}
    {data.map(d => {
        if (d['hashtag'] === 'whales') //filter
      return <circle className="whaleMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
    })}
    {data.map(d => {
        if (d['hashtag'] === 'rabbits') //filter
      return <circle className="rabbitMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
    })}
    {data.map(d => {
        if (d['hashtag'] === 'squirrels') //filter
      return <circle className="squirrelMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
    })}
    {data.map(d => {
        if (d['hashtag'] === 'elephants') //filter
      return <circle className="elephantMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
    })}
    {data.map(d => {
        if (d['hashtag'] === 'skinwalkers') //filter
      return <circle className="skinwalkerMark" cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius} >
        <title>{Format(xValue(d))}</title>
      </circle>
    })}
  </g>
);
