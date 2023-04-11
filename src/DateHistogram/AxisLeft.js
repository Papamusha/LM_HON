export const AxisLeft = ({ yScale, innerWidth, tickOffset = 1 }) =>
//yScale is the scale of the Y axis on the chart.
  yScale.ticks().map(tickValue => (
    <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
      <line x2={innerWidth} />
      <text
        key={tickValue}
        style={{ textAnchor: 'end' }}
        x={-tickOffset}
        dy=".32em"
      >
        {tickValue}
      </text>
    </g>
  ));
