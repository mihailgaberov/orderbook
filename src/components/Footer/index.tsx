import React, { FunctionComponent } from 'react';

import { Container } from "./styles";
import Button from "../Button";

interface FooterProps {
  toggleFeedCallback: () => void;
  killFeedCallback: () => void;
  isFeedKilled: boolean;
}

const Footer: FunctionComponent<FooterProps> = ({ toggleFeedCallback, killFeedCallback , isFeedKilled}) => {
  return (
    <Container>
      {!isFeedKilled && <Button title={'Toggle Feed'} backgroundColor={'#5741d9'} callback={toggleFeedCallback}/>}
      <Button title={isFeedKilled ? 'Renew feed' : 'Kill Feed'} backgroundColor={'#b91d1d'} callback={killFeedCallback}/>
    </Container>
  );
};

export default Footer;