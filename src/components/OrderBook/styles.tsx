import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1c2a31;
  border-color: #263946;
  
  @media only screen and (min-width: 600px) {
    flex-direction: row;
    justify-content: center;
  }
`

export const TableContainer = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  color: white; // TODO: temporary, to be removed
`
