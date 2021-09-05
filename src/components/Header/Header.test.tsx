import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import Header from './index';

const initialState = {
  orderbook: {
    groupingSize: 1
  }
}
const mockStore = configureStore()

test('renders header component with text', () => {
  const store = mockStore(initialState);
  render(<Provider store={store}><Header options={[0.5, 1, 2.5]} /></Provider>);
  const txtElement = screen.getByText(/Order Book/i);
  expect(txtElement).toBeInTheDocument();
});
