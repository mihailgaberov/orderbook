import React, { FunctionComponent } from 'react';
import { Container } from "./styles";

interface StatusMessageProps {
  selectedMarket: string;
  isFeedKilled: boolean;
}

const StatusMessage: FunctionComponent<StatusMessageProps> = ({selectedMarket = '', isFeedKilled}) => {
  return (
    <Container>
      {isFeedKilled ? 'Feed killed.' : `Selected market: ${selectedMarket}`}
    </Container>
  );
};

export default StatusMessage;
