import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: ivory;
  width: 80%;
  height: 50%;
  border-radius: 10px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;

  text-align: center;
  font-family: "BMEULJIRO";

  & label {
    margin-right: 0.87em;
  }

  & input {
    padding: 0.5em;
  }

  & button[type="submit"] {
    padding: 0.5em;
    margin-top: 1em;
  }
`;

function SignUp() {
  const [username, setUsername] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function handleUsernameInputChange(e) {
    setUsername(e.target.value);
  }

  async function handleSubmitButtonClick(e) {
    e.preventDefault();

    if (!username || !username.length) {
      alert("이름을 입력해주세요!");
      return;
    }

    // 가입시키는 fetch..
    const {
      data: { result, message },
    } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, {
      kakaoId: location.state.kakaoId,
      username,
    });

    if (result === "failed") {
      alert(message);

      // redirect to Home
      navigate("/");
    }

    setIsSubmitted(false);
  }

  return (
    <Container>
      <h1>회원가입</h1>
      <form>
        <label>이름</label>
        <input
          type="text"
          placeholder="이름을 입력해주세요!"
          value={username}
          onChange={handleUsernameInputChange}
        />

        <br />

        <button
          type="submit"
          onClick={(e) => {
            handleSubmitButtonClick(e);
            setIsSubmitted(true);
          }}
          disabled={isSubmitted}
        >
          가입하기
        </button>
      </form>
    </Container>
  );
}

export default SignUp;
