import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { GroupingSelectBox } from './index';

const initialState = {
  orderbook: {
    groupingSize: 1
  }
};
const mockStore = configureStore();

test('renders a select box with certain grouping options', () => {
  const store = mockStore(initialState)

  render(<Provider store={store}><GroupingSelectBox options={[0.5, 1, 2.5]}/></Provider>);
  const selectElement = screen.getByTestId(/groupings/i);
  expect(selectElement).toBeInTheDocument();
  let optionElement = screen.getByText(/Group 0.5/i);
  expect(optionElement).toBeInTheDocument();

  render(<Provider store={store}><GroupingSelectBox options={[0.05, 0.1, 0.25]}/></Provider>);
  optionElement = screen.getByText(/Group 0.5/i);
  expect(optionElement).toBeInTheDocument();
});
