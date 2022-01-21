import React, { createContext, useReducer } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Select from "./components/Select";
import Create from "./components/Create";
import SignUp from "./components/SignUp";
import BokjumaniDetails from "./components/BokjumaniDetails";

export const GlobalContext = createContext();

const initialState = {
  roomOwner: "",
  bokjumaniList: [],
  selectedBok: Math.floor(Math.random() * 9) + 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ROOM_OWNER":
      return { ...state, roomOwner: action.payload };
    case "SET_BOKJUMANI_LIST":
      return { ...state, bokjumaniList: action.payload };
    case "SET_SELECTED_BOK":
      return { ...state, selectedBok: action.payload };
    default:
      throw new Error("Invalid action type");
  }
}

function App() {
  const location = useLocation();
  const locationState = location.state;
  const backgroundLocation = locationState?.backgroundLocation;

  const hasModal = Boolean(backgroundLocation);

  const [globalState, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ globalState, dispatch }}>
      <Container>
        <GlobalStyle />

        {/* 기본 routes */}
        <Routes location={locationState?.backgroundLoation || locationState}>
          <Route path="/" element={<Home />} />
          <Route path="/select" element={<Home />} />
          <Route path="/create" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth" element={<Login />} />
          <Route path="/signUp" element={<Login />} />
          <Route path="/bokjumani/:bokId" element={<Home />} />
          <Route path="/:roomId" element={<Home />} />
        </Routes>

        {hasModal && <BlackFlim />}

        {/* 모달 routes */}
        {locationState?.backgroundLocation && (
          <Routes>
            <Route path="/select" element={<Select />} />
            <Route path="/create" element={<Create />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/bokjumani/:bokId" element={<BokjumaniDetails />} />
          </Routes>
        )}
      </Container>
    </GlobalContext.Provider>
  );
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'BMEULJIRO';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/BMEULJIRO.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    /* user-select: none;
    -webkit-user-drag: none; */
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
  width: 360px;
  height: 640px;
  max-width: 430px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  overflow: scroll;
`;

const BlackFlim = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  z-index: 100;
  opacity: 0.5;

  position: fixed;
  top: 0;
  left: 0;

  border-radius: 9.5px;
`;

export default App;
