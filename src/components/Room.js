import { last } from "lodash";
import React from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

import BokjimanmiList from "./BokjumaniList";
import Basket from "./Basket";

import wallpaperSource from "../assets/background/wallpaper-myroom.png";
import windowSource from "../assets/gif/window.gif";
import cabinetSource from "../assets/items/cabinet.svg";
import televisionSource from "../assets/items/television.svg";
import tvAndCabinetSource from "../assets/items/tv-and-cabinet.svg";
import createButtonSource from "../assets/buttons/create.svg";
import myHomeButtonSource from "../assets/buttons/my-home.svg";

import calendar16Source from "../assets/calendar/16.png";
import calendar17Source from "../assets/calendar/17.png";
import calendar18Source from "../assets/calendar/18.png";
import calendar19Source from "../assets/calendar/19.png";
import calendar20Source from "../assets/calendar/20.png";
import calendar21Source from "../assets/calendar/21.png";
import calendar22Source from "../assets/calendar/22.png";
import calendar23Source from "../assets/calendar/23.png";
import calendar24Source from "../assets/calendar/24.png";
import calendar25Source from "../assets/calendar/25.png";
import calendar26Source from "../assets/calendar/26.png";
import calendar27Source from "../assets/calendar/27.png";
import calendar28Source from "../assets/calendar/28.png";
import calendar29Source from "../assets/calendar/29.png";
import calendar30Source from "../assets/calendar/30.png";
import calendar31Source from "../assets/calendar/31.png";

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
  aspect-ratio: 500 / 776;

  position: relative;

  background-image: url(${wallpaperSource});
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 5px;
`;
const Window = styled.img`
  width: 47%;
  position: absolute;
  top: 17%;
  left: 18%;
`;
const TVandCabinet = styled.img`
  width: 50%;
  position: absolute;
  top: 34.5%;
  left: 5%;
`;
const Calendar = styled.img`
  width: 18%;
  position: absolute;
  top: 23%;
  right: 12%;
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

  const calendarSource =
    calendarSourceList[`calendar${new Date().getDate()}Source`];

  return (
    <Container>
      <Window src={windowSource} />
      <Basket />
      <TVandCabinet src={tvAndCabinetSource} />
      <Calendar src={calendarSource ? calendarSource : calendar16Source} />

      <BokjimanmiList />

      {!isMyHome && (
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
      )}
    </Container>
  );
}

export default Room;
