import { scaleLinear, scaleTime, max, timeFormat, extent, histogram as bin, timeMonths, sum, brushX, select, } from 'd3';
import { useRef, useEffect, useMemo } from 'react'; 
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

//set margin and offsets
const margin = { top: 0, right: 30, bottom: 20, left: 45 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 30;
//sets tick format to thousands (i.e. 100k rather than 100,000)
const xAxisTickFormat = timeFormat('%m/%d/%Y');

//set X axis label
const xAxisLabel = 'Time';

//set Y axis to hashtag count and label
const yValue = d => d['hashtagCount'];
const yAxisLabel = 'Hashtag';

export const DateHistogram = ({ data, width, height, setBrushExtent, xValue }) => {
  //get brush
  const brushRef = useRef();

  //set innerHeight and innerWidth to crop height and width to fit margin
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  //set scale for X axis to time based
  const xScale = useMemo(() => scaleTime() //useMemo is used to stop the scale from being reloaded more than once for optimisation
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice(), [data, xValue, innerWidth]);

  //binnedData identifies the values contained within the brush
  const binnedData = useMemo(() => {
      const [start, stop] = xScale.domain();
    return bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map(array => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1
    }));
  },
  [xValue, xScale, data, yValue]
  );

  //sets scale of Y axis to scale linearly
  const yScale = useMemo(() => scaleLinear() //useMemo is used to stop the scale from being reloaded more than once for optimisation
    .domain([0, max(binnedData, d => d.y)])
    .range([innerHeight, 0]), [binnedData, innerHeight]);

    //identify brush start and end, update accordingly
  useEffect(() => {
    const brush = brushX().extent([[0, 0], [innerWidth, innerHeight]]);
    brush(select(brushRef.current));
    brush.on('brush end', (selection) => {
			setBrushExtent(selection.selection && selection.selection.map(xScale.invert));
		});
  }, [innerWidth, innerHeight]);

  //AxisBottom and AxisLeft render axis
  //Marks renders bars on graph
  return (
    <>
    <h3> Use the Histogram below to select time-frame of data.</h3>
      <rect width={width} height={height} fill='white'/>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${innerHeight /
            2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <Marks
          xScale={xScale}
          yScale={yScale}
          binnedData={binnedData}
          tooltipFormat={d => d}
          circleRadius={2}
          innerHeight={innerHeight}
        />
        <g ref={brushRef}/>
      </g>
    </>
  );
};
