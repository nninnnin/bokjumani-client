import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import Room from "../components/Room";
import subHeaderImageSource from "../assets/background/subheader.svg";

const Container = styled.div`
  width: 100%;
  height: 100%;

  border: solid 5px #5e3618;
  border-radius: 10px;
  padding: 5% 3%;

  background-color: #976e3d;
`;
const HeaderContainer = styled.div`
  margin: 3%;
`;
const Header = styled.h1`
  width: 100%;
  margin: 0;
  margin-bottom: 3%;

  font-family: "BMEULJIRO";
  font-size: 3vh;
  font-weight: 700;
  -webkit-text-stroke: 0.01vh ivory;
  color: #5e3618;

  word-break: keep-all;
`;
const SubHeader = styled.img`
  width: 80%;
`;
const BlackFlim = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  z-index: 100;
  opacity: 0.5;

  position: absolute;
  top: 0;
  left: 0;
`;

function Home() {
  const { state: locationState } = useLocation();
  const backgroundLocation = locationState?.backgroundLocation;

  const hasModal = Boolean(backgroundLocation);

  return (
    <Container>
      <HeaderContainer>
        <Header>안나님에게 복주머니 10개가 전달됐어요!</Header>
        <SubHeader src={subHeaderImageSource} />
      </HeaderContainer>
      <Room />

      {hasModal && <BlackFlim />}
    </Container>
  );
}

export default Home;
