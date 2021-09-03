import React, { FunctionComponent } from 'react';

import { Container } from "./Container";

interface GroupingSelectBoxProps {
  options: number[]
}

const GroupingSelectBox: FunctionComponent<GroupingSelectBoxProps> = ({options}) => {
  return (
    <Container>
      <select name="groupings" onChange={(e) => console.log('selected grouping: ', e.target.value)}>
        {options.map((option, idx) => <option key={idx} value={option}>Group {option}</option>)}
      </select>

    </Container>
  );
};

export default GroupingSelectBox;