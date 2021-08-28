import React, { FunctionComponent } from 'react';
import { Container } from "./styles";

interface PriceLevelRowProps {
  total: string;
  size: string;
  price: string;
  reversedFieldsOrder?: boolean;
  depth: number;
}

const PriceLevelRow: FunctionComponent<PriceLevelRowProps> = ({
                                                                total,
                                                                size,
                                                                price,
                                                                reversedFieldsOrder = false,
                                                                depth
                                                              }) => {
  return (
    <Container isRight={!reversedFieldsOrder} depth={depth}>
      {reversedFieldsOrder ?
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
