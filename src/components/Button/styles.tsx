import styled from "styled-components";

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.button<ContainerProps>`
  padding: .3em .7em;
  margin: 1em;
  border-radius: 4px;
  border: none;
  color: white;
  background: ${props => props.backgroundColor};
  font-family: "Calibri", sans-serif;
  font-size: 1.2em;
  
  &:hover {
    cursor: pointer;
    opacity: .8;
  }
`