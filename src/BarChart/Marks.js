export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
}) => 
//rect draws each bar for chart
//bandwidth() finds the width of a band, in this case the width of yScale
  data.map((d) => (
    <rect
      className="mark"
      key={yValue(d)}
      x={0}
      y={yScale(yValue(d))}
      width={xScale(xValue(d))}
      height={yScale.bandwidth()}
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </rect>
  ));
