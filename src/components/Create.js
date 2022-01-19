import { last } from "lodash";
import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import backButtonSource from "../assets/buttons/back.svg";
import submitButtonSource from "../assets/buttons/submit.svg";
import { GlobalContext } from "../App";

function Create() {
  const {
    globalState: { roomOwner, selectedBok },
  } = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  function handleBackButtonClick() {
    navigate(-1);
  }

  async function handleSubmitButtonClick() {
    if (isSubmitDisabled) return;

    if (!name || !greeting) {
      alert("모두 입력해주세요!");
      return;
    }

    setIsSubmitDisabled(true);

    // room id로 user id 알아내기
    const roomId = last(location.state.backgroundLocation.pathname.split("/"));

    const {
      data: { result, user, message },
    } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/room/${roomId}`);

    if (result === "failed") {
      console.log(message);
      alert("방 주인 정보를 가져오는데 실패했습니다 🥲");

      return;
    }

    // 복주머니 create 요청보내기
    const {
      data: { result: createResult, newBokjumani, message: createMessage },
    } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/bokjumani/${user._id}`,
      {
        author: name,
        greeting,
        type: selectedBok,
      }
    );

    if (createResult === "ok" && newBokjumani) {
      // redirect to 원래의 room!
      const redireactionPath = location.state.backgroundLocation.pathname;

      navigate(redireactionPath, {
        replace: true,
        state: { isBokjumaniCreated: true },
      });
    } else {
      alert("새로운 복주머니 생성에 실패했습니다..🥲");

      console.log(createMessage);
      setIsSubmitDisabled(false);
    }
  }

  function handleChangeName(e) {
    if (e.target.value.length > 3) return;

    setName(e.target.value);
  }

  return (
    <Container>
      <ModalHeader>
        <BackButton src={backButtonSource} onClick={handleBackButtonClick} />
        <SubmitButton
          src={submitButtonSource}
          onClick={handleSubmitButtonClick}
          disabled={isSubmitDisabled}
        />
      </ModalHeader>

      <SelectBox>
        <Header>🧧{roomOwner} 님에게🧧</Header>
        <SubHeader>새해 덕담을 나눠주세요!</SubHeader>
        <Textarea
          value={greeting}
          onChange={(e) => setGreeting(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="10"
          autoFocus={true}
        />
        <NameInput
          type="text"
          placeholder="당신은 누구인가요? (세글자까지)"
          value={name}
          onChange={handleChangeName}
        />
      </SelectBox>
    </Container>
  );
}

const Container = styled.div`
  width: 85%;
  height: 80%;
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
  flex: 1;

  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 3.5%;
`;
const ButtonImage = styled.img`
  width: 20%;

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

export default Create;
