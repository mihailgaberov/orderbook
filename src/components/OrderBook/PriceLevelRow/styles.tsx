import styled from "styled-components";

interface ContainerProps {
  isRight: boolean;
  depth: number;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: space-around;
  margin: .3em 0;
  background-color: #121723;
  position: relative;
  
  &:after {
    background-color: ${props => props.isRight ? '#113534' : '#3d1e28'};
    background-position: center;
    width: ${props => props.depth + '%'};
    height: 100%;
    padding: .3em 0;
    display: block;
    content: "";
    position: absolute;
    left: ${props => props.isRight ? 'unset' : 0};
    right: ${props => props.isRight ? 0 : 'unset'};
    z-index: 0;
  }
  
  span {
    z-index: 1;
  }
`