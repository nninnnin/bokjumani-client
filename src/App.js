import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Select from "./components/Select";
import Create from "./components/Create";
import SignUp from "./components/SignUp";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'BMEULJIRO';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/BMEULJIRO.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    user-select: none;
    -webkit-user-drag: none;
    box-sizing: border-box;
  }

  html, body {
    margin: 1% 0;
    padding: 0;

    /* background-color: grey; */
    background-color: #a7845f;

    position: relative;
  }
`;

const Container = styled.div`
  width: 100%;
  /* aspect-ratio: 9 / 15.8; */
  max-width: 360px;
  /* height: auto; */
  /* max-height: 630px; */
  background-color: #a7845f;

  padding: 1%;

  position: relative;
  top: 0;
  left: 50%;
  transform: translate(-50%);

  overflow: scroll;
`;

function App() {
  const location = useLocation();
  const locationState = location.state;

  return (
    <Container>
      <GlobalStyle />

      <Routes location={locationState?.backgroundLoation || locationState}>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<Home />} />
        <Route path="/create" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth" element={<Login />} />
        <Route path="/signUp" element={<Login />} />
      </Routes>

      {locationState?.backgroundLocation && (
        <Routes>
          <Route path="/select" element={<Select />} />
          <Route path="/create" element={<Create />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      )}
    </Container>
  );
}

export default App;
