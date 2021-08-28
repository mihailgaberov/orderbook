import React, { FunctionComponent } from 'react';

import { Container } from "./Container";

const GroupingSelectBox: FunctionComponent = () => {
  return (
    <Container>
      <select name="pets" id="pet-select">
        <option value="0.5">Group 0.50</option>
        <option value="1">Group 1.00</option>
        <option value="cat">Group 2.50</option>

      </select>

    </Container>
  );
};

export default GroupingSelectBox;