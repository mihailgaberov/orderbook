import React from 'react';
import { render, screen } from '@testing-library/react';

import Spread from './index';

test('renders Spread component correctly', () => {
  render(<Spread bids={[[1000, 1], [2000, 2]]} asks={[[999, 1], [1999, 2]]} />);
  const amountElement = screen.getByText(/Spread: 1,001/i);
  expect(amountElement).toBeInTheDocument();
  const percentageElement = screen.getByText(/(50.05%)/i);
  expect(percentageElement).toBeInTheDocument();
});
