import React, { FunctionComponent } from 'react';

import { Container } from "./styles";
import Button from "../Button";

interface FooterProps {
  toggleFeedCallback: () => void;
}

const Footer: FunctionComponent<FooterProps> = ({ toggleFeedCallback }) => {
  return (
    <Container>
      <Button title={'Toggle Feed'} backgroundColor={'#5741d9'} callback={toggleFeedCallback}/>
      <Button title={'Kill Feed'} backgroundColor={'#b91d1d'} callback={() => console.log('Kill Feed clicked...')}/>
    </Container>
  );
};

export default Footer;