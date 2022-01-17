import { last } from "lodash";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import backgroundSource from "../assets/background/bok-details-background.png";
import backButtonSource from "../assets/buttons/back.svg";

import bokjumaniSource1 from "../assets/bokjumani/bok1.svg";
import bokjumaniSource2 from "../assets/bokjumani/bok2.svg";
import bokjumaniSource3 from "../assets/bokjumani/bok3.svg";
import bokjumaniSource4 from "../assets/bokjumani/bok4.svg";
import bokjumaniSource5 from "../assets/bokjumani/bok5.svg";
import bokjumaniSource6 from "../assets/bokjumani/bok6.svg";
import bokjumaniSource7 from "../assets/bokjumani/bok7.svg";
import bokjumaniSource8 from "../assets/bokjumani/bok1.svg";
import bokjumaniSource9 from "../assets/bokjumani/bok1.svg";

function BokjumaniDetails() {
  const location = useLocation();

  const [bokjumaniDetail, setBokjumaniDetail] = useState({
    author: "",
    greeting: "",
    type: 0,
  });

  useEffect(async () => {
    const bokjumaniId = last(location.pathname.split("/"));

    const {
      data: { result, bokjumani, message },
    } = await axios(
      `${process.env.REACT_APP_SERVER_URL}/bokjumani/${bokjumaniId}`
    );

    if (result === "failed") {
      alert("복주머니를 불러올 수 없습니다 ㅠㅠ");

      console.log(message);
    }

    const { author, greeting, type } = bokjumani;

    setBokjumaniDetail({
      author,
      greeting,
      type,
    });
  }, []);

  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(-1);
  }

  const { author, greeting, type } = bokjumaniDetail;

  let source;

  switch (type) {
    case 1:
      source = bokjumaniSource1;
      break;
    case 2:
      source = bokjumaniSource2;
      break;
    case 3:
      source = bokjumaniSource3;
      break;
    case 4:
      source = bokjumaniSource4;
      break;
    case 5:
      source = bokjumaniSource5;
      break;
    case 6:
      source = bokjumaniSource6;
      break;
    case 7:
      source = bokjumaniSource7;
      break;
    case 8:
      source = bokjumaniSource8;
      break;
    case 9:
      source = bokjumaniSource9;
      break;
    default:
      source = bokjumaniSource1;
      break;
  }

  return (
    <Container>
      <Author>{author}</Author>

      <BokjumaniWrapper>
        <BokjumaniImage src={source} />
        <BokjumaniTag>{author}</BokjumaniTag>
      </BokjumaniWrapper>

      <Greeting>{greeting}</Greeting>

      <BackButton src={backButtonSource} onClick={handleBackButtonClick} />
    </Container>
  );
}

const Container = styled.div`
  width: 85%;
  aspect-ratio: 9.5 / 15;

  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%, -50%);

  background-image: url(${backgroundSource});
  background-size: contain;
  background-position: top;
`;

const ButtonImage = styled.img`
  width: 18%;

  cursor: pointer;
`;
const BackButton = styled(ButtonImage)`
  position: absolute;
  top: 2.3%;
  left: 3.7%;
`;

const Author = styled.span`
  position: absolute;
  top: 3.5%;
  left: 50%;
  transform: translate(-50%);

  font-family: "BMEULJIRO";
  font-size: 1.3em;
`;

const Greeting = styled.p`
  width: 80%;

  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%);

  font-family: "BMEULJIRO";
`;

const BokjumaniWrapper = styled.div`
  position: absolute;
  top: 16%;
  left: 50%;
  transform: translate(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BokjumaniImage = styled.img`
  width: 50%;
  margin-bottom: 3px;
`;
const BokjumaniTag = styled.span`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 3px;
  padding: 3% 7%;
  font-size: 0.5em;
  box-shadow: 0.5px 0.5px 1.5px black;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: scale(0.8);
`;

export default BokjumaniDetails;
