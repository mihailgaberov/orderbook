import React, { FunctionComponent } from 'react';
import { Container } from "./styles";

const TitleRow: FunctionComponent = () => {
  return (
    <Container>
      <span>TOTAL</span>
      <span>SIZE</span>
      <span>PRIZE</span>
    </Container>
  );
};

export default TitleRow;
