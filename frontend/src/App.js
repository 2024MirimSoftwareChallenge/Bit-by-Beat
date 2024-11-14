import './App.css';

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/home";
import Write from "./components/Home/write";
import Diary from "./components/Home/diary";
import Calendar from "./components/Calendar/calendar";
import SignUp from "./components/Sign/signUp";
import SingUpDetail from "./components/Sign/signUpDetail";
import Search from './components/SearchPost/search';
import Post from './components/SearchPost/post';
// import Nav from './components/navbar';

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Write" element={<Write />} />
                  <Route path="/Diary" element={<Diary />} />
                  <Route path="/Calendar" element={<Calendar />} />
                  <Route path="/SignUp" element={<SignUp />} />
                  <Route path="/SignUpDetail" element={<SingUpDetail />} />
                  <Route path="/Search" element={<Search />}/>

              {/*    component test   */}
              {/*    <Route path="/Post" element={<Post />} />*/}
              {/*    <Route path="/nav" element={<Nav />} />*/}
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
