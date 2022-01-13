import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import BokjimanmiList from "./BokjumaniList";
import Basket from "./Basket";

import wallpaperSource from "../assets/background/wallpaper.svg";
import windowSource from "../assets/items/window.gif";
import cabinetSource from "../assets/items/cabinet.svg";
import televisionSource from "../assets/items/television.svg";
import createButtonSource from "../assets/buttons/create.svg";
import myHomeButtonSource from "../assets/buttons/my-home.svg";

const Container = styled.div`
  width: 100%;

  position: relative;
`;
const Wallpaper = styled.img`
  width: 100%;
`;
const Window = styled.img`
  width: 50%;

  position: absolute;
  top: 5%;
  left: 15%;
`;
const Cabinet = styled.img`
  width: 55%;

  position: absolute;
  top: 30%;
  left: 2%;
`;
const Television = styled.img`
  width: 30%;

  position: absolute;
  top: 20%;
  left: 5%;
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translate(-50%);

  & > img {
    margin-bottom: 3%;
  }
`;

const ButtonImage = styled.img`
  cursor: pointer;
`;

const CreateButton = styled(ButtonImage)`
  width: 100%;
`;
const MyHomeButton = styled(ButtonImage)`
  width: 100%;
`;

function Room() {
  const location = useLocation();

  return (
    <Container>
      <Wallpaper src={wallpaperSource} />

      <Window src={windowSource} />
      <Cabinet src={cabinetSource} />
      <Television src={televisionSource} />
      <Basket />

      <BokjimanmiList />

      <ButtonSection>
        <Link to="/select" state={{ backgroundLocation: location }}>
          <CreateButton src={createButtonSource} />
        </Link>
        <MyHomeButton src={myHomeButtonSource} />
      </ButtonSection>
    </Container>
  );
}

export default Room;
