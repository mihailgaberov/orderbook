import React from 'react';
import { render, screen } from '@testing-library/react';

import TitleRow from './index';

test('renders title row properly - not reversed', () => {
  render(<TitleRow
    reversedFieldsOrder={false}
    windowWidth={800}/>);
  const priceElement = screen.getByTestId('title-row');
  const spanElements = priceElement.querySelectorAll('span');
  expect(spanElements[2]).toHaveTextContent('PRICE');
});


test('renders title row properly - reversed', () => {
  render(<TitleRow
    reversedFieldsOrder={true}
    windowWidth={800} />);
  const priceElement = screen.getByTestId('title-row');
  const spanElements = priceElement.querySelectorAll('span');
  expect(spanElements[0]).toHaveTextContent('PRICE');
});
