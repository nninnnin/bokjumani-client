import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

// import backgroundSource from "../assets/background/modal-select-bok.svg";
import bok1Source from "../assets/bokjumani/selective/bok1.svg";
import bok2Source from "../assets/bokjumani/selective/bok2.svg";
import bok3Source from "../assets/bokjumani/selective/bok3.svg";
import bok4Source from "../assets/bokjumani/selective/bok4.svg";
import bok5Source from "../assets/bokjumani/selective/bok5.svg";
import bok6Source from "../assets/bokjumani/selective/bok6.svg";
import bok7Source from "../assets/bokjumani/selective/bok7.svg";
import bok8Source from "../assets/bokjumani/selective/bok8.svg";
import bok9Source from "../assets/bokjumani/selective/bok9.svg";

import backButtonSource from "../assets/buttons/back.svg";
import nextButtonSource from "../assets/buttons/next.svg";

const Container = styled.div`
  width: 87%;
  height: 61%;
  aspect-ratio: 9 / 15.8;
  border: 3px solid #2f2118;
  border-radius: 10px;

  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;

  background-color: #fff;
  background-color: #4b3729;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  background-color: blue;
  flex: 1;

  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 3.5%;
`;

const ButtonLink = styled(Link)`
  width: 20%;
  display: flex;
  align-items: center;

  cursor: pointer;
`;
const ButtonImage = styled.img`
  width: 100%;
`;
const BackButton = styled(ButtonImage)``;
const NextButton = styled(ButtonImage)``;

const SelectBox = styled.div`
  background-color: #f0e8e0;
  width: 100%;
  height: 90%;
  border-top: 3px solid #2f2118;

  margin-top: auto;
`;

const Header = styled.h2`
  font-size: 5vw;
  font-family: "BMEULJIRO";
  font-weight: 500;
  text-align: center;

  @media (min-width: 400px) {
    font-size: 20px;
  }
`;

const SubHeader = styled.h4`
  font-size: 4vw;
  font-family: "BMEULJIRO";
  font-weight: 500;
  padding-left: 1em;

  @media (min-width: 400px) {
    font-size: 16px;
  }
`;

const BokList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Bok = styled.img`
  width: 30%;
  margin: 1%;

  border: ${({ isSelected }) => isSelected && "solid 3px red"};
  border-radius: ${({ isSelected }) => (isSelected ? "9px" : "7px")};

  cursor: pointer;
`;

// const BackgroundImage = styled.img`
//   width: 100%;
// `;

const bokSourceList = [
  bok1Source,
  bok2Source,
  bok3Source,
  bok4Source,
  bok5Source,
  bok6Source,
  bok7Source,
  bok8Source,
  bok9Source,
];

function Create() {
  const [clickedBok, setClickedBok] = useState();

  const location = useLocation();

  function handleBokClick(e, bokIndex) {
    setClickedBok(bokIndex);
  }

  return (
    <Container>
      <ModalHeader>
        <ButtonLink to="/">
          <BackButton src={backButtonSource} />
        </ButtonLink>
        <ButtonLink to="/create" state={{ backgroundLocation: location }}>
          <NextButton src={nextButtonSource} />
        </ButtonLink>
      </ModalHeader>

      <SelectBox>
        <Header>🧧정만두 님에게🧧</Header>
        <SubHeader>선물할 복주머니를 골라주세요!</SubHeader>
        <BokList>
          {bokSourceList.map((bokSource, index) => {
            return (
              <Bok
                key={"bok" + index}
                src={bokSource}
                isSelected={clickedBok === index}
                onClick={(e) => handleBokClick(e, index)}
              />
            );
          })}
        </BokList>
      </SelectBox>
      {/* <BackgroundImage src={backgroundSource} /> */}
    </Container>
  );
}

export default Create;
