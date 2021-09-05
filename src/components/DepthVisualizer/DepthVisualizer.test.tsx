import React from 'react';
import { render, screen } from '@testing-library/react';
import DepthVisualizer from './index';
import { OrderType } from "../OrderBook";

test('renders depth visualizer with certain width and color', () => {
  render(<DepthVisualizer depth={33} windowWidth={800} orderType={OrderType.BIDS} />);
  const divElement = screen.getByTestId('depth-visualizer');
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveAttribute('style','background-color: rgb(17, 53, 52); height: 1.250em; width: 33%; position: relative; top: 21px; left: 0px; margin-top: -24px; z-index: 1;')
});
