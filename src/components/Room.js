import React from "react";
import styled from "styled-components";

import BokjimanmiList from "./BokjumaniList";
import Basket from "./Basket";

import WallpaperSource from "../assets/background/wallpaper.svg";
import WindowSource from "../assets/background/window.svg";
import CabinetSource from "../assets/background/cabinet.svg";
import TelevisionSource from "../assets/background/television.svg";

const Container = styled.div`
  width: 100%;
  flex: 1;

  position: relative;
`;
const Wallpaper = styled.img`
  width: 100%;
`;
const Window = styled.img`
  width: 60%;

  position: absolute;
  top: 10%;
  right: 15%;

  transform: translate(15%, -10%);
`;
const Cabinet = styled.img`
  width: 60%;

  position: absolute;
  top: 50%;
  left: 5%;
  transform: translate(-5%, -50%);
`;
const Television = styled.img`
  width: 34%;

  position: absolute;
  top: 32%;
  left: 8%;
  transform: translate(-8%, -32%);
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  left: 50%;
  bottom: 3%;
  transform: translate(-50%);
`;

const ButtonWrapper = styled.span`
  border: 2px solid #5e3618;
  border-radius: 13px;
  padding: 4px;
  background-color: ${({ backgroundColor }) => backgroundColor};

  cursor: pointer;
  user-select: none;
`;

const Button = styled.div`
  font-family: "BMEULJIRO";

  padding: 10px;
  border-radius: 8px;
`;

const CreateButton = styled(Button)`
  background-color: ivory;
  color: #5e3618;
`;

function Room() {
  return (
    <Container>
      <Wallpaper src={WallpaperSource} />

      <Window src={WindowSource} />
      <Cabinet src={CabinetSource} />
      <Television src={TelevisionSource} />
      <Basket />

      <BokjimanmiList />

      <ButtonSection>
        <ButtonWrapper backgroundColor={"crimson"}>
          <CreateButton>복주머니 투척하기</CreateButton>
        </ButtonWrapper>
      </ButtonSection>
    </Container>
  );
}

export default Room;
