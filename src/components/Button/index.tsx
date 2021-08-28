import React, { FunctionComponent } from 'react';

import { Container } from "./styles";

interface ButtonProps {
  title: string;
  backgroundColor: string;
  callback: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({ title, backgroundColor = 'purple', callback}) => {
  return (
    <Container backgroundColor={backgroundColor} onClick={callback}>
      {title}
    </Container>
  );
};

export default Button;