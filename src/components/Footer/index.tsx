import React, { FunctionComponent } from 'react';

import { Container } from "./styles";
import Button from "../Button";

const Footer: FunctionComponent = () => {
  return (
    <Container>
      <Button title={'Toggle Feed'} backgroundColor={'#5741d9'} callback={() => console.log('Toggle Feed clicked...')} />
      <Button title={'Kill Feed'} backgroundColor={'#b91d1d'} callback={() => console.log('Kill Feed clicked...')} />
    </Container>
  );
};

export default Footer;