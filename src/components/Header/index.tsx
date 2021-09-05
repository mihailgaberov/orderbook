import React, { FunctionComponent } from 'react';

import { Container } from "./styles";
import GroupingSelectBox from "../GroupingSelectBox";
import { useAppSelector } from "../../hooks";
import { selectMarket } from "../OrderBook/orderbookSlice";

const Header: FunctionComponent = () => {
  const market: string = useAppSelector(selectMarket);
  const options: any = {
    PI_XBTUSD: [0.5, 1, 2.5],
    PI_ETHUSD: [0.05, 0.1, 0.25]
  };

  return (
    <Container>
      <h3>Order Book</h3>
      <GroupingSelectBox options={options[market]} />
    </Container>
  );
};

export default Header;
