import React, { useContext } from "react";
import styled from "styled-components";

import bokjumaniSource1 from "../assets/bokjumani/bok1.svg";
import bokjumaniSource2 from "../assets/bokjumani/bok2.svg";
import bokjumaniSource3 from "../assets/bokjumani/bok3.svg";
import bokjumaniSource4 from "../assets/bokjumani/bok4.svg";
import bokjumaniSource5 from "../assets/bokjumani/bok5.svg";
import bokjumaniSource6 from "../assets/bokjumani/bok6.svg";
import bokjumaniSource7 from "../assets/bokjumani/bok7.svg";
import bokjumaniSource8 from "../assets/bokjumani/bok1.svg";
import bokjumaniSource9 from "../assets/bokjumani/bok1.svg";

import { GlobalContext } from "../App";

function BokjimanmiList() {
  let {
    globalState: { bokjumaniList },
  } = useContext(GlobalContext);

  bokjumaniList.map((bok) => {
    let source;

    switch (bok.type) {
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

    bok.image_url = source;

    return bok;
  });

  return (
    <Container>
      <BokjumaniContainer>
        {bokjumaniList.map((bok) => {
          return <Bokjumani key={bok._id} src={bok.image_url} />;
        })}
      </BokjumaniContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 90%;

  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%);
`;
const BokjumaniContainer = styled.div`
  width: 100%;

  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const Bokjumani = styled.img`
  max-height: 7vh;
  width: auto;
  position: relative;
  margin: 0 -10px;
  margin-bottom: 10px;

  cursor: pointer;
`;

export default BokjimanmiList;
