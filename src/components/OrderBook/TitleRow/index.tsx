import React, { FunctionComponent } from 'react';
import { Container } from "./styles";
import { MOBILE_WIDTH } from "../../../constants";

interface TitleRowProps {
  reversedFieldsOrder?: boolean;
  windowWidth: number;
}

const TitleRow: FunctionComponent<TitleRowProps> = ({reversedFieldsOrder = false, windowWidth}) => {
  return (
    <Container>
      {reversedFieldsOrder || windowWidth < MOBILE_WIDTH ?
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
