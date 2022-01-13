import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import backButtonSource from "../assets/buttons/back.svg";
import submitButtonSource from "../assets/buttons/submit.svg";

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
`;
const ButtonImage = styled.img`
  width: 100%;

  cursor: pointer;
`;
const BackButton = styled(ButtonImage)``;
const SubmitButton = styled(ButtonImage)`
  width: 20%;
`;

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

const Textarea = styled.textarea`
  width: 85%;
  background-color: #e1dad4;
  border: none;
  border-radius: 5px;
  box-shadow: inset 0 0 8px #afa59e;
  resize: none;
  padding: 5%;

  position: relative;
  left: 50%;
  transform: translate(-50%);
`;

const NameInput = styled.input`
  width: 70%;
  background-color: #e1dad4;
  border: none;
  border-radius: 5px;
  box-shadow: inset 0 0 8px #afa59e;

  position: relative;
  left: 50%;
  transform: translate(-50%);

  margin-top: 5%;
  padding: 5%;
  font-family: "BMEULJIRO";
  text-align: center;
`;

function Create() {
  const location = useLocation();

  return (
    <Container>
      <ModalHeader>
        <ButtonLink to="/select" state={{ backgroundLocation: location }}>
          <BackButton src={backButtonSource} />
        </ButtonLink>
        <SubmitButton src={submitButtonSource} />
      </ModalHeader>

      <SelectBox>
        <Header>🧧정만두 님에게🧧</Header>
        <SubHeader>새해 덕담을 나눠주세요!</SubHeader>
        <Textarea name="" id="" cols="30" rows="10" />
        <NameInput type="text" placeholder="당신은 누구인가요? (세글자까지)" />
      </SelectBox>
    </Container>
  );
}

export default Create;
