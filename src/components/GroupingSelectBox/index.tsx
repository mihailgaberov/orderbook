import React, { ChangeEvent, FunctionComponent } from 'react';

import { Container } from "./Container";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectGrouping, setGrouping } from "../OrderBook/orderbookSlice";

interface GroupingSelectBoxProps {
  options: number[]
}

const GroupingSelectBox: FunctionComponent<GroupingSelectBoxProps> = ({options}) => {
  const groupingSize: number = useAppSelector(selectGrouping);
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setGrouping(Number(event.target.value)));
  };

  return (
    <Container>
      <select name="groupings" onChange={handleChange} defaultValue={groupingSize}>
        {options.map((option, idx) => <option key={idx} value={option}>Group {option}</option>)}
      </select>

    </Container>
  );
};

export default GroupingSelectBox;
