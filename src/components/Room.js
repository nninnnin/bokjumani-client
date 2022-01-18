import { last } from "lodash";
import React from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

import BokjimanmiList from "./BokjumaniList";
import Basket from "./Basket";

import wallpaperSource from "../assets/background/wallpaper.svg";
import windowSource from "../assets/gif/window.gif";
import cabinetSource from "../assets/items/cabinet.svg";
import televisionSource from "../assets/items/television.svg";
import createButtonSource from "../assets/buttons/create.svg";
import myHomeButtonSource from "../assets/buttons/my-home.svg";

import calendar16Source from "../assets/calendar/16.svg";
import calendar17Source from "../assets/calendar/17.svg";
import calendar18Source from "../assets/calendar/18.svg";
import calendar19Source from "../assets/calendar/19.svg";
import calendar20Source from "../assets/calendar/20.svg";
import calendar21Source from "../assets/calendar/21.svg";
import calendar22Source from "../assets/calendar/22.svg";
import calendar23Source from "../assets/calendar/23.svg";
import calendar24Source from "../assets/calendar/24.svg";
import calendar25Source from "../assets/calendar/25.svg";
import calendar26Source from "../assets/calendar/26.svg";
import calendar27Source from "../assets/calendar/27.svg";
import calendar28Source from "../assets/calendar/28.svg";
import calendar29Source from "../assets/calendar/29.svg";
import calendar30Source from "../assets/calendar/30.svg";
import calendar31Source from "../assets/calendar/31.svg";

const calendarSourceList = {
  calendar16Source,
  calendar17Source,
  calendar18Source,
  calendar19Source,
  calendar20Source,
  calendar21Source,
  calendar22Source,
  calendar23Source,
  calendar24Source,
  calendar25Source,
  calendar26Source,
  calendar27Source,
  calendar28Source,
  calendar29Source,
  calendar30Source,
  calendar31Source,
};

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
const Calendar = styled.img`
  width: 21%;

  position: absolute;
  top: 4%;
  right: 8%;
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
  const navigate = useNavigate();
  const location = useLocation();
  const cookie = Cookie.get();

  // 내 집 => 현재 로그인한 유저(쿠키의 유저)의 room id와 지금 보고있는 location room id가 일치
  const isMyHome =
    cookie.user &&
    JSON.parse(cookie.user).room_uri === last(location.pathname.split("/"));

  function handleMyHomeButtonClick() {
    if (!cookie.user) {
      navigate("/login");

      return;
    }
  }

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

  const calendarSource =
    calendarSourceList[`calendar${new Date().getDate()}Source`];

  return (
    <Container>
      <Window src={windowSource} />
      <Cabinet src={cabinetSource} />
      <Television src={televisionSource} />
      <Basket />
      <Calendar src={calendarSource ? calendarSource : calendar16Source} />

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
          <MyHomeButton
            src={myHomeButtonSource}
            onClick={handleMyHomeButtonClick}
          />
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
