import React, { FunctionComponent } from 'react';
import { Container } from "./styles";

interface PriceLevelRowProps {
  total: string;
  size: string;
  price: string;
  reversedFieldsOrder?: boolean;
}

const PriceLevelRow: FunctionComponent<PriceLevelRowProps> = ({
                                                                total,
                                                                size,
                                                                price,
                                                                reversedFieldsOrder = false }) => {
  return (
    <Container>
      {reversedFieldsOrder ?
        <>
          <span>{price}</span>
          <span>{size}</span>
          <span>{total}</span>
        </> :
        <>
          <span>{total}</span>
          <span>{size}</span>
          <span>{price}</span>
        </>}
    </Container>
  );
};

export default PriceLevelRow;
