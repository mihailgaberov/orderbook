import React, { FunctionComponent } from 'react';

import { Container } from "./styles";
import GroupingSelectBox from "../GroupingSelectBox";

const Header: FunctionComponent = () => {
  return (
    <Container>
      <h3>Order Book</h3>
      <GroupingSelectBox />
    </Container>
  );
};

export default Header;