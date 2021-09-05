import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './index';

test('renders two button when feed is active', () => {
  render(<Footer toggleFeedCallback={jest.fn} killFeedCallback={jest.fn} isFeedKilled={false} />);
  const toggleFeedButton = screen.getByText(/Toggle feed/i);
  expect(toggleFeedButton).toBeInTheDocument();

  const killFeedButton = screen.getByText(/Kill feed/i);
  expect(killFeedButton).toBeInTheDocument();
});


test('renders `Renew feed` button when feed is not active', () => {
  render(<Footer toggleFeedCallback={jest.fn} killFeedCallback={jest.fn} isFeedKilled={true} />);
  const renewFeedButton = screen.getByText(/Renew feed/i);
  expect(renewFeedButton).toBeInTheDocument();
});
