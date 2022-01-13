import React from "react";
import styled from "styled-components";

import BasketSource from "../assets/items/basket.svg";
import BasketCoverSource from "../assets/items/basket-cover.svg";
import BokjumaniSource1 from "../assets/bokjumani/bok1.svg";

const Container = styled.div`
  width: 40%;

  position: absolute;
  right: 0;
  top: 40%;
`;
const Basket = styled.img`
  width: 100%;

  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 0;
`;
const BasketCover = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
`;
const BokjumaniWrapper = styled.div`
  transform: translate(${({ spreadRatio }) => spreadRatio * 0.5}%);
`;
const Bokjumani = styled.img`
  width: 40%;
  position: absolute;
  bottom: ${({ order }) => (order === 2 ? "4vh" : "1vh")};
  right: ${({ order, spreadRatio }) => order * spreadRatio}%;
  z-index: ${({ zIndex }) => zIndex * 10};

  cursor: pointer;
`;

function BasketComponent() {
  const spreadRatio = 20;

  return (
    <Container>
      <Basket src={BasketSource} />
      <BasketCover src={BasketCoverSource} />

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
