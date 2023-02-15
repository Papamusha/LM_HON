import { useMapData } from './useMapData';
import { useCitiesData } from './useCitiesData';
import { BubbleMap } from './BubbleMap/index.js';
import { DateHistogram } from './DateHistogram/index.js';
import './App.css';

const width = 960;
const height = 500;
const dateHistogramSize = 0.2;

function App() {
  const map = useMapData();
  const data = useCitiesData();

  if (!map || !data) {
    return <pre>Loading...</pre>;
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Honours Project Testing Grounds
        </p>
          <svg width={width} height={height}>
            <BubbleMap data={data} map={map} />
            <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
              <DateHistogram data={data} width={width} height={dateHistogramSize * height}/>
            </g>
          </svg>
      </header>
    </div>
  );
}

export default App;
