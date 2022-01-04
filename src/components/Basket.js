import React from "react";
import styled from "styled-components";

import BasketSource from "../assets/background/basket.svg";
import BokjumaniSource1 from "../assets/bokjumani/bok1.svg";

const Container = styled.div`
  position: relative;
  bottom: 200px;
`;
const Basket = styled.img`
  width: 34%;

  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 100;
`;
const BokjumaniWrapper = styled.div`
  transform: translate(${({ spreadRatio }) => spreadRatio * 0.5}px);
`;
const Bokjumani = styled.img`
  width: 18%;
  position: absolute;
  bottom: ${({ order }) => (order === 2 ? "25px" : "10px")};
  right: ${({ order, spreadRatio }) => order * spreadRatio}px;
  z-index: ${({ zIndex }) => zIndex * 10}; ;
`;

function BasketComponent() {
  const spreadRatio = 18;

  return (
    <Container>
      <Basket src={BasketSource} />

      <BokjumaniWrapper spreadRatio={spreadRatio}>
        <Bokjumani
          src={BokjumaniSource1}
          order={3}
          spreadRatio={spreadRatio}
          zIndex={2}
        />
        <Bokjumani
          src={BokjumaniSource1}
          order={2}
          spreadRatio={spreadRatio}
          zIndex={1}
        />
        <Bokjumani
          src={BokjumaniSource1}
          order={1}
          spreadRatio={spreadRatio}
          zIndex={3}
        />
      </BokjumaniWrapper>
    </Container>
  );
}

export default BasketComponent;
