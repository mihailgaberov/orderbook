import React, { FunctionComponent } from 'react';

import { Container } from "./styles";
import Button from "../Button";

const Footer: FunctionComponent = () => {
  return (
    <Container>
      <Button title={'Toggle Feed'} backgroundColor={'purple'} callback={() => console.log('Toggle Feed clicked...')} />
      <Button title={'Kill Feed'} backgroundColor={'red'} callback={() => console.log('Kill Feed clicked...')} />
    </Container>
  );
};

export default Footer;