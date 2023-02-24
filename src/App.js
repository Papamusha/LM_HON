import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavMain from "./NavBar";
import GuidePage from "./GuidePage";
import BubbleMapRender from './BubbleMapRender';
import BarChart from "./BarCharts/BarChart.js";
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
            <Route path="/pie" element={<PieChart />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
