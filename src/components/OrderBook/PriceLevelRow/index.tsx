import React, { FunctionComponent } from 'react';
import { Container } from "./styles";

interface PriceLevelRow {
  total: string;
  size: string;
  price: string;
}

const PriceLevelRow: FunctionComponent<PriceLevelRow> = ({total, size, price}) => {
  return (
    <div>
      <Container>
        <span>{total}</span>
        <span>{size}</span>
        <span>{price}</span>
      </Container>
    </div>
  );
};

export default PriceLevelRow;
