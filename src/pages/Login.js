import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
// axios.defaults.withCredentials = true;

import backgroundSource from "../assets/background/background-login.png";
import buttonSource from "../assets/login/kakao-button.svg";
import advertisementSource from "../assets/login/advertisement.svg";
import backButtonSource from "../assets/buttons/back.svg";

const Container = styled.div`
  width: 100%;
  height: 100%;

  background-image: url(${backgroundSource});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const LoginButton = styled.img`
  width: 73%;

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
  width: 17%;

  position: absolute;
  top: 2.8%;
  left: 4.2%;

  cursor: pointer;
`;

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(async () => {
    const isRedirectedOauthPage = location.pathname === "/oauth";

    // 리다이렉션 페이지가 아니라 로그인 페이지로 온 것이라면 return
    if (!isRedirectedOauthPage) return;

    // 카카오톡의 인가코드를 가져온다
    const authCode = location.search.split("?code=")[1];

    const url = "https://kauth.kakao.com/oauth/token";
    let params = {
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
      redirect_uri: `${process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI}`,
      code: authCode,
    };

    const encodedParams = Object.entries(params)
      .map(([key, value]) => {
        return `${encodeURI(key)}=${encodeURI(value)}`;
      })
      .join("&");

    // 카카오에 accessToken을 요청한다
    const { data } = await axios(url + "?" + encodedParams);
    const accessToken = data.access_token;

    // alert("1. ACCESS TOKEN!" + accessToken);

    // 받아온 accessToken을 카카오에 세팅한다
    await Kakao.Auth.setAccessToken(accessToken);

    // accessToken이 있으므로 유저 정보(카카오 id)를 가져올 수 있다
    const { id: kakaoId } = await Kakao.API.request({
      url: "/v2/user/me",
    });

    // alert("2. 토큰으로 가져온 카카오아이디" + kakaoId);

    // 유저의 kakaoId로 서버에 등록된 유저가 있는지 확인한다
    const { data: userData } = await axios(
      `${process.env.REACT_APP_SERVER_URL}/users`,
      {
        params: {
          kakaoId,
        },
        withCredentials: true,
      }
    );

    const { result, user } = userData;

    // alert("3. kakaoId로 가져온 유저데이터!" + result + user);

    // 회원으로 등록되어 있지 않은 유저일 경우
    if (result === "failed") {
      navigate("/signUp", {
        state: { backgroundLocation: location, kakaoId },
        replace: false,
      });
    }

    // 회원으로 등록되어 있는 유저일 경우
    if (result === "ok") {
      // redirect to homepage
      navigate(`/${user.room_uri}`, {
        replace: true,
      });
    }
  }, []);

  function handleLoginButtonClick() {
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

      {/* <AdvertisementImage src={advertisementSource} /> */}
    </Container>
  );
}

export default Login;
