import React from "react";
import styled from "styled-components";

import BokjumaniSource1 from "../assets/bokjumani/bok1.svg";
import BokjumaniSource2 from "../assets/bokjumani/bok2.svg";
import BokjumaniSource3 from "../assets/bokjumani/bok3.svg";
import BokjumaniSource4 from "../assets/bokjumani/bok4.svg";
import BokjumaniSource5 from "../assets/bokjumani/bok5.svg";
import BokjumaniSource6 from "../assets/bokjumani/bok6.svg";

const Container = styled.div`
  position: absolute;
  top: 48%;
`;
const Bokjumani = styled.img`
  width: 20%;

  cursor: pointer;
`;

function BokjimanmiList() {
  return (
    <Container>
      <Bokjumani src={BokjumaniSource1} />
      <Bokjumani src={BokjumaniSource2} />
      <Bokjumani src={BokjumaniSource3} />
      <Bokjumani src={BokjumaniSource4} />
      <Bokjumani src={BokjumaniSource5} />
      <Bokjumani src={BokjumaniSource6} />
      <Bokjumani src={BokjumaniSource4} />
      <Bokjumani src={BokjumaniSource5} />
      <Bokjumani src={BokjumaniSource6} />
      <Bokjumani src={BokjumaniSource1} />
    </Container>
  );
}

export default BokjimanmiList;
