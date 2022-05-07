import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

import Room from "../components/Room";
import { GlobalContext } from "@src/App";
import signBoardBackgroundSource from "@assets/background/signboard.png";
import inventoryButtonSource from "@assets/buttons/inventory-button.svg";
import linkShareButtonSource from "@assets/buttons/link-share-button.svg";

import horangSource1 from "@assets/gif/bok1.gif";
import horangSource2 from "@assets/gif/bok2.gif";
import horangSource3 from "@assets/gif/bok3.gif";
import horangSource4 from "@assets/gif/bok4.gif";
import horangSource5 from "@assets/gif/bok5.gif";
import horangSource6 from "@assets/gif/bok6.gif";
import horangSource7 from "@assets/gif/bok7.gif";
import horangSource8 from "@assets/gif/bok8.gif";
import horangSource9 from "@assets/gif/bok9.gif";

const horangSourceList = {
  1: horangSource1,
  2: horangSource2,
  3: horangSource3,
  4: horangSource4,
  5: horangSource5,
  6: horangSource6,
  7: horangSource7,
  8: horangSource8,
  9: horangSource9,
};

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    globalState: { roomOwner, bokjumaniList, selectedBok, isMyRoom },
    dispatch,
  } = useContext(GlobalContext);

  const [createdBokType, setCreatedBokType] = useState(1);
  const [showHorang, setShowHorang] = useState(false);

  useEffect(() => {
    if (!location.state?.isBokjumaniCreated) return;

    setShowHorang(true);
    setCreatedBokType(location.state.createdBokType);

    setTimeout(() => {
      setShowHorang(false);
      history.replaceState({}, document.title);
    }, 1400);
  }, [location.state?.isBokjumaniCreated]);

  // prevent scrolling
  useEffect(() => {
    const removeEvent = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const disableScroll = () => {
      document
        .querySelector("body")
        .addEventListener("touchmove", removeEvent, { passive: false });
      document
        .querySelector("body")
        .addEventListener("onclick", removeEvent, { passive: false });
      document
        .querySelector("body")
        .addEventListener("mousewheel", removeEvent, { passive: false });
    };

    disableScroll();
  }, []);

  useEffect(async () => {
    const isSignUpPage = location.pathname.split("/")[1] === "signUp";
    const isSelectionPage = location.pathname.split("/")[1] === "select";
    const isBokjumaniDetailPage =
      location.pathname.split("/")[1] === "bokjumani";

    if (isSignUpPage || isSelectionPage || isBokjumaniDetailPage) return;

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
      // 잘못된 방(삭제된 유저의 roomId)에 들어온 상태
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

    // 해당 방 owner 의 데이터를 성공적으로 가져온 경우
    dispatch({ type: "SET_ROOM_OWNER", payload: user.name });
    dispatch({ type: "SET_BOKJUMANI_LIST", payload: user.bokjumani_list });
  }, [location.state?.isBokjumaniCreated, location.state?.isFirstAtHome]);

  async function handleMyRoomLinkSharingButtonClick() {
    const roomUri = location.pathname;

    if (navigator.share) {
      navigator.share({
        title: "복주머니",
        text: "내 방에 놀러와!",
        url: roomUri,
      });

      return;
    }

    navigator.clipboard.writeText(roomUri);
    const readText = await navigator.clipboard.readText();

    if (readText === roomUri) {
      alert("내 방 링크가 복사되었어요!");
    }
  }

  const horangSource = horangSourceList[createdBokType];

  return (
    <Container>
      <UpperWrapper>
        <HeaderWrapper>
          <Header>
            {roomOwner}님에게 복주머니 {bokjumaniList.length}개 가 전달됐어요
          </Header>
        </HeaderWrapper>
        {isMyRoom && (
          <ButtonSection>
            <InventoryButton src={inventoryButtonSource} />
            <MyRoomLinkSharingButton
              src={linkShareButtonSource}
              onClick={handleMyRoomLinkSharingButtonClick}
            />
          </ButtonSection>
        )}
      </UpperWrapper>

      <RoomWrapper>
        <Room />
        {showHorang && <Horang src={horangSource} />}
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
  top: 6%;

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
  position: relative;
`;

const Horang = styled.img`
  width: 150px;
  position: absolute;
  top: 20%;
  left: 0;
`;

export default React.memo(Home);
