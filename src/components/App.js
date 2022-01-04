import styled, { createGlobalStyle } from "styled-components";

import Room from "./Room";
import Background from "../../src/assets/background/background.svg";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'BMEULJIRO';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/BMEULJIRO.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  html, body {
    margin: 0 auto;
    padding: 0;

    width: 400px;
    position: relative;
  }

  * {
    user-select: none;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 2rem;
`;

const Header = styled.h1`
  margin: 0;
  margin-bottom: 1rem;

  font-family: "BMEULJIRO";
  font-size: 1.9em;
  font-weight: 700;
  -webkit-text-stroke: 0.2px ivory;
  color: #5e3618;
`;

const SubHeader = styled.span`
  padding: 1rem;
  margin-bottom: 1.5rem;

  font-family: "BMEULJIRO";
  font-size: 0.8em;
  /* font-weight: 600; */
  color: #5e3618;

  background-color: ivory;
  border: 2px solid #5e3618;
  border-radius: 10px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>안나님에게 복주머니 10개가 전달됐어요!</Header>
        <SubHeader>복주머니는 설날 당일에 열어볼 수 있어요</SubHeader>
        <Room />
      </Container>
      <BackgroundImage src={Background} />
    </>
  );
}

export default App;
