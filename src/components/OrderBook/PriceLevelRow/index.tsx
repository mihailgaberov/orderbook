import React, { FunctionComponent } from 'react';
import { Container } from "./styles";

interface PriceLevelRowProps {
  total: string;
  size: string;
  price: string;
}

const PriceLevelRow: FunctionComponent<PriceLevelRowProps> = ({total, size, price}) => {
  return (
    <Container>
      <span>{total}</span>
      <span>{size}</span>
      <span>{price}</span>
    </Container>
  );
};

export default PriceLevelRow;
