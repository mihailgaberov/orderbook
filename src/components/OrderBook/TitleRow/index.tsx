import React, { FunctionComponent } from 'react';
import { Container } from "./styles";

interface TitleRowProps {
  reversedFieldsOrder?: boolean;
}

const TitleRow: FunctionComponent<TitleRowProps> = ({reversedFieldsOrder = false}) => {
  return (
    <Container>
      {reversedFieldsOrder ?
        <>
          <span>PRIZE</span>
          <span>SIZE</span>
          <span>TOTAL</span>
        </> :
        <>
          <span>TOTAL</span>
          <span>SIZE</span>
          <span>PRIZE</span>
        </>}
    </Container>
  );
};

export default TitleRow;
