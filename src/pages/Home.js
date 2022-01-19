import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

import Room from "../components/Room";
import { GlobalContext } from "../App";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    globalState: { roomOwner, bokjumaniList },
    dispatch,
  } = useContext(GlobalContext);

  useEffect(async () => {
    const isSignUpPage = location.pathname.split("/")[1] === "signUp";
    if (isSignUpPage) return;

    const userRoomId = location.pathname.split("/")[1];

    const cookie = Cookie.get();

    console.log("ri", userRoomId);
    console.log(cookie);

    // 자기 방으로 보내버리기..
    if (!userRoomId && cookie.user) {
      const user = JSON.parse(cookie.user);

      console.log(user);

      navigate(`/${user.room_uri}`, { replace: true });

      return;
    }

    if (!userRoomId && !cookie.user) {
      navigate("/login", { replace: true });

      return;
    }

    const {
      data: { result, user, message },
    } = await axios(`${process.env.REACT_APP_SERVER_URL}/room/${userRoomId}`);

    if (result === "failed") {
      console.log(message);

      alert("잘못된 링크입니다!");

      // 쿠키 날려버리자!
      function deleteAllCookies() {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
      }

      deleteAllCookies();

      navigate("/login", { replace: true });

      return;
    }

    dispatch({ type: "SET_ROOM_OWNER", payload: user.name });
    dispatch({ type: "SET_BOKJUMANI_LIST", payload: user.bokjumani_list });
  }, [location.state?.isBokjumaniCreated, location.state?.isFirstAtHome]);

  return (
    <Container>
      <HeaderWrapper>
        <Header>
          {roomOwner}님에게 복주머니 {bokjumaniList.length}개 가 전달됐어요!
        </Header>
      </HeaderWrapper>
      <RoomWrapper>
        <Room />
      </RoomWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  border: solid 5px #5e3618;
  border-radius: 10px;
  padding: 5% 3%;

  background-color: #976e3d;

  display: flex;
  flex-direction: column;
`;
const HeaderWrapper = styled.div`
  /* margin: 3% 0; */
`;
const Header = styled.marquee`
  width: 90%;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  background-color: black;
  border-radius: 5px;
  color: yellow;
  line-height: 2em;

  font-family: "BMEULJIRO";
  font-size: 2.6vh;
  word-break: keep-all;

  padding-top: 3px;
`;

const RoomWrapper = styled.div`
  flex: 1;
`;

export default Home;
