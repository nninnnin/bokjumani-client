import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

import Room from "../components/Room";
import { GlobalContext } from "../App";
import signBoardBackgroundSource from "../assets/background/signboard.png";
import inventoryButtonSource from "../assets/buttons/inventory-button.svg";
import linkShareButtonSource from "../assets/buttons/link-share-button.svg";

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

    // "/"
    if (!userRoomId) {
      // logged in
      if (cookie.user) {
        const user = JSON.parse(cookie.user);
        // 방으로 보낸다
        navigate(`/${user.room_uri}`, { replace: true });

        return;
      } else {
        // not logged in
        // 로그인 페이지로
        navigate("/login", { replace: true });

        return;
      }
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
      <UpperWrapper>
        <HeaderWrapper>
          <Header>
            {roomOwner}님에게 복주머니 {bokjumaniList.length}개 가 전달됐어요
          </Header>
        </HeaderWrapper>
        <ButtonSection>
          <InventoryButton src={inventoryButtonSource} />
          <MyRoomLinkSharingButton
            src={linkShareButtonSource}
            onClick={handleMyRoomLinkSharingButtonClick}
          />
        </ButtonSection>
      </UpperWrapper>

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
  padding: 1.5%;

  background-color: #976e3d;

  display: flex;
  flex-direction: column;

  overflow: hidden;
`;

const UpperWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const HeaderWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 0 2%;
  padding-top: 1%;

  position: relative;

  background-image: url(${signBoardBackgroundSource});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
const Header = styled.marquee`
  width: 100%;
  padding: 5px;

  border-radius: 5px;
  color: yellow;
  line-height: 2em;

  font-family: "BMEULJIRO";
  font-size: 2.6vh;
  word-break: keep-all;
`;

const ButtonSection = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
`;

const InventoryButton = styled.img`
  width: 40%;
  margin: 4px 1%;
  margin-bottom: 21px;
`;
const MyRoomLinkSharingButton = styled.img`
  width: 40%;
  margin: 4px 1%;
  margin-bottom: 21px;
`;

const RoomWrapper = styled.div`
  flex: 1;
`;

export default Home;
