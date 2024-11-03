import './App.css';

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/home";
import Write from "./components/Home/write";
import Diary from "./components/Home/diary";
import Calendar from "./components/Calendar/calendar";


function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Write" element={<Write />} />
                  <Route path="/Diary" element={<Diary />} />
                  <Route path="/Calendar" element={<Calendar />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
