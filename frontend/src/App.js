import './App.css';

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/home";
import WriteFirst from "./components/Home/writeFirst";
import WriteSecond from "./components/Home/writeSecond";
import Diary from "./components/Home/diary";
import Calendar from "./components/Calendar/calendar";
import SignUp from "./components/Sign/signUp";
import SingUpDetail from "./components/Sign/signUpDetail";
import Search from './components/SearchPost/search';

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/WriteFirst" element={<WriteFirst />} />
                  <Route path="/WriteSecond" element={<WriteSecond />} />
                  <Route path="/Diary" element={<Diary />} />
                  <Route path="/Calendar" element={<Calendar />} />
                  <Route path="/SignUp" element={<SignUp />} />
                  <Route path="/SignUpDetail" element={<SingUpDetail />} />
                  <Route path="/Search" element={<Search />}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
