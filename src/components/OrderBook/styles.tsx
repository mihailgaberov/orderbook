import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  border-color: #263946;

  @media only screen and (min-width: 800px) {
    flex-direction: row;
    justify-content: center;
  }
`

interface TableContainerProps {
  isBids: boolean;
}

export const TableContainer = styled.div<TableContainerProps>`
  display: flex;
  width: 100%;
  flex-direction: column;
  color: #bfc1c8;

  @media only screen and (min-width: 800px) {
    width: 50%;
  }
`
