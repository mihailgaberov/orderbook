import React, { FunctionComponent } from 'react';

import { Container } from "./styles";
import GroupingSelectBox from "../GroupingSelectBox";

const Header: FunctionComponent = () => {
  return (
    <Container>
      <h3>Order Book</h3>
      <GroupingSelectBox options={[0.5, 1, 2.5]} />
    </Container>
  );
};

export default Header;