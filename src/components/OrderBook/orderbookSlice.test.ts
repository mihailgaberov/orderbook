import reducer, { addAsks, addBids, addExistingState, OrderbookState } from './orderbookSlice'

test('should return the initial state', () => {
  // @ts-ignore
  expect(reducer(undefined, {})).toEqual(
    {
      market: 'PI_XBTUSD',
      rawBids: [],
      bids: [],
      maxTotalBids: 0,
      rawAsks: [],
      asks: [],
      maxTotalAsks: 0,
      groupingSize: 0.5
    }
  );
});

test('should handle adding price levels', () => {
  const previousState: OrderbookState = {
    market: 'PI_XBTUSD',
    rawBids: [],
    bids: [],
    maxTotalBids: 0,
    rawAsks: [],
    asks: [],
    maxTotalAsks: 0,
    groupingSize: 0.5
  }

  expect(reducer(previousState, addExistingState({
    "product_id": "PI_XBTUSD",
    asks: [[1000, 1], [1002, 1]],
    bids: [[1000, 1], [1002, 1]]
  }))).toEqual(
    {
      market: 'PI_XBTUSD',
      rawBids: [[1000, 1], [1002, 1]],
      bids: [[1000, 1, 1, 50], [1002, 1, 2, 100]],
      maxTotalBids: 2,
      rawAsks: [[1000, 1], [1002, 1]],
      asks: [[1000, 1, 1, 50], [1002, 1, 2, 100]],
      maxTotalAsks: 2,
      groupingSize: 0.5
    }
  );

  expect(reducer(previousState, addBids([[1000, 1], [1002, 1]]))).toEqual(
    {
      market: 'PI_XBTUSD',
      rawBids: [],
      bids: [[1000, 1, 1, 50], [1002, 1, 2, 100]],
      maxTotalBids: 2,
      rawAsks: [],
      asks: [],
      maxTotalAsks: 0,
      groupingSize: 0.5
    }
  );

  expect(reducer(previousState, addAsks([[1000, 1], [1002, 1]]))).toEqual(
    {
      market: 'PI_XBTUSD',
      rawBids: [],
      asks: [[1000, 1, 1, 50], [1002, 1, 2, 100]],
      maxTotalBids: 0,
      rawAsks: [],
      bids: [],
      maxTotalAsks: 2,
      groupingSize: 0.5
    }
  );
});