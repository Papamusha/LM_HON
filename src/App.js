import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavMain from "./NavBar";
import GuidePage from "./GuidePage";
import BubbleMapRender from './BubbleMaps/BubbleMapRender';
import BarChart from "./BarChart/BarChart.js";
import ScatterGraph from "./ScatterGraph/index";
import LineChartDeploy from "./LineChart/index";
import MultiLineChart from "./MultiTest/index.js";
import Choropleth from "./Choropleth";
import PieChart from "./PieCharts/PieChart";


function App() {
  
  return (
    <>
    <NavMain />
    <br/>
    <br/>
      <div className="wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>Honours Project Testing Grounds</h1>} />
            <Route path="/bubblemap" element={<BubbleMapRender />} />
            <Route path="/guidepage" element={<GuidePage />} />
            <Route path="/bar" element={<BarChart />} />
            <Route path="scatter" element={<ScatterGraph />} />
            <Route path="pie" element={<h1>This doesn't work, see code in PieChart.js</h1>} />
            <Route path="line" element={<LineChartDeploy />} />
            <Route path="multiline" element={<MultiLineChart />} />
            <Route path="choropleth" element={<Choropleth />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
