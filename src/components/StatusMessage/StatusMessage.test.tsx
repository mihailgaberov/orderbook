import React from 'react';
import { render, screen } from '@testing-library/react';

import StatusMessage from './index';

test('renders StatusMessage component when feed is active', () => {
  render(<StatusMessage selectedMarket={'PI_XBTUSD'} isFeedKilled={false}/>);
  const txtElement = screen.getByText(/Selected market: PI_XBTUSD/i);
  expect(txtElement).toBeInTheDocument();
});

test('renders StatusMessage component when feed is NOT active', () => {
  render(<StatusMessage selectedMarket={'PI_XBTUSD'} isFeedKilled={true}/>);
  const txtElement = screen.getByText(/Feed killed./i);
  expect(txtElement).toBeInTheDocument();
});
