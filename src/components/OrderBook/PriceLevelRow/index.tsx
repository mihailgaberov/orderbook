import React, { FunctionComponent } from 'react';
import { Container } from "./styles";
import { MOBILE_WIDTH } from "../../../constants";

interface PriceLevelRowProps {
  total: string;
  size: string;
  price: string;
  reversedFieldsOrder?: boolean;
  depth: number;
  windowWidth: number;
}

const PriceLevelRow: FunctionComponent<PriceLevelRowProps> = ({
                                                                total,
                                                                size,
                                                                price,
                                                                reversedFieldsOrder = false,
                                                                depth,
                                                                windowWidth
                                                              }) => {
  return (
    <Container isRight={!reversedFieldsOrder} depth={depth} windowWidth={windowWidth}>
      {reversedFieldsOrder || windowWidth < MOBILE_WIDTH ?
        <>
          <span className='price'>{price}</span>
          <span>{size}</span>
          <span>{total}</span>
        </> :
        <>
          <span>{total}</span>
          <span>{size}</span>
          <span className='price'>{price}</span>
        </>}
    </Container>
  );
};

export default PriceLevelRow;
