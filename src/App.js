import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavMain from "./NavBar";
import GuidePage from "./GuidePage";
import BubbleMapRender from './BubbleMapRender';
import BarChart from "./BarCharts/BarChart All";

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
            <Route path="/barchart" element={<BarChart />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
