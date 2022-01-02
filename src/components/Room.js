import React from "react";
import styled from "styled-components";

import WallpaperSource from "../assets/background/wallpaper.svg";
import WindowSource from "../assets/background/window.svg";
import CabinetSource from "../assets/background/cabinet.svg";

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
  left: 30%;

  transform: translate(-30%, -10%);
`;
const Cabinet = styled.img`
  width: 60%;

  position: absolute;
  top: 50%;
  left: 20%;

  transform: translate(-20%, -50%);
`;

function Room() {
  return (
    <Container>
      <Wallpaper src={WallpaperSource} />

      <Window src={WindowSource} />
      <Cabinet src={CabinetSource} />
    </Container>
  );
}

export default Room;
