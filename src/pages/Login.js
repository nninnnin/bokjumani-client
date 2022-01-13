import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
// axios.defaults.withCredentials = true;

import backgroundSource from "../assets/login/background.svg";
import buttonSource from "../assets/login/kakao-button.svg";
import advertisementSource from "../assets/login/advertisement.svg";
import backButtonSource from "../assets/buttons/back.svg";

const Container = styled.div`
  width: 100%;
  height: 100%;

  border: solid 5px #5e3618;
  border-radius: 10px;
  aspect-ratio: 9 / 15.8;

  /* background-image: url(${backgroundSource});
  background-repeat: no-repeat; */

  background-color: #976e3d;
`;

const LoginButton = styled.img`
  width: 70%;
  border-radius: 10px;
  box-shadow: 0px 0px 0px 5px brown;

  position: absolute;
  top: 48.5%;
  left: 50%;
  transform: translate(-50%, -48.5%);

  cursor: pointer;
`;

const AdvertisementImage = styled.img`
  width: 92%;

  position: absolute;
  left: 50%;
  bottom: 2.2%;

  transform: translate(-50%);
`;
const BackButton = styled.img`
  width: 18%;

  position: absolute;
  top: 3.2%;
  left: 5.5%;

  cursor: pointer;
`;

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(async () => {
    if (!(location.pathname === "/oauth")) return;

    const authCode = location.search.split("?code=")[1];

    const url = "https://kauth.kakao.com/oauth/token";
    let params = {
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
      redirect_uri: "http://localhost:3000/oauth",
      code: authCode,
    };

    const encodedParams = Object.entries(params)
      .map(([key, value]) => {
        return `${encodeURI(key)}=${encodeURI(value)}`;
      })
      .join("&");

    const { data } = await axios(url + "?" + encodedParams);

    const accessToken = data.access_token;

    await Kakao.Auth.setAccessToken(accessToken);

    const { id: kakaoId } = await Kakao.API.request({
      url: "/v2/user/me",
    });

    // kakaoId로 서버에 요청을 보낸다
    const { data: user } = await axios(
      `${process.env.REACT_APP_SERVER_URL}/users`,
      {
        params: {
          kakaoId,
        },
        withCredentials: true,
      }
    );

    console.log("가입한 유저가 존재하나요?", user);

    // 없다면 회원가입 시키고,
    if (!user) {
      // 회원가입 모달 띄우기..
      navigate("/signUp", {
        state: { backgroundLocation: location, kakaoId },
        replace: false,
      });
    }

    // 있다면 그냥 회원 정보 가져오기..(쿠키에 담아주기!)

    // 가져왔으면 redirect..
  }, []);

  function handleLoginButtonClick() {
    console.log(process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI);

    Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI,
    });
  }

  return (
    <Container>
      <Link to="/">
        <BackButton src={backButtonSource} />
      </Link>

      <LoginButton src={buttonSource} onClick={handleLoginButtonClick} />

      <AdvertisementImage src={advertisementSource} />
    </Container>
  );
}

export default Login;
