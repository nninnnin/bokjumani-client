import { last } from "lodash";
import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Cookie from "js-cookie";

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
  height: 100%;

  position: relative;

  background-image: url(${wallpaperSource});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 5px;
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
  bottom: 4%;
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
const MyRoomLinkSharingButton = styled.button`
  position: absolute;
  left: 50%;
  bottom: 3%;
  transform: translate(-50%);

  padding: 10px;
  opacity: 0.9;
`;

function Room() {
  const location = useLocation();
  const cookie = Cookie.get();

  // 내 집 => 현재 로그인한 유저(쿠키의 유저)의 room id와 지금 보고있는 location room id가 일치
  const isMyHome =
    JSON.parse(cookie.user).room_uri === last(location.pathname.split("/"));

  async function handleMyRoomLinkSharingButtonClick() {
    const roomUri = window.location.host + location.pathname;

    if (navigator.share) {
      navigator.share({
        title: "복주머니",
        text: "내 방에 놀러와!",
        url: roomUri,
      });
    }

    navigator.clipboard.writeText(roomUri);
    const readText = await navigator.clipboard.readText();

    if (readText === roomUri) {
      alert("내 방 링크가 복사되었어요!");
    }
  }

  return (
    <Container>
      <Window src={windowSource} />
      <Cabinet src={cabinetSource} />
      <Television src={televisionSource} />
      <Basket />

      <BokjimanmiList />

      {!isMyHome ? (
        <ButtonSection>
          <Link
            to="/select"
            state={{
              backgroundLocation: location,
            }}
          >
            <CreateButton src={createButtonSource} />
          </Link>
          <MyHomeButton src={myHomeButtonSource} />
        </ButtonSection>
      ) : (
        <MyRoomLinkSharingButton onClick={handleMyRoomLinkSharingButtonClick}>
          내 방 링크 공유하기
        </MyRoomLinkSharingButton>
      )}
    </Container>
  );
}

export default Room;
