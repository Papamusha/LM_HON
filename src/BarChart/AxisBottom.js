export const AxisBottom = ({ xScale, innerHeight, tickFormat }) =>
//xScale is the scale of the X axis of the graph
  xScale.ticks().map((tickValue) => (
    <g
      className="tick"
      key={tickValue}
      transform={`translate(${xScale(tickValue)},0)`}
    >
      <line y2={innerHeight} />
      <text style={{ textAnchor: "middle" }} dy=".71em" y={innerHeight + 3}>
        {tickFormat(tickValue)}
      </text>
    </g>
  ));
