export const OrderBookActions = {
  BIDS: 'BIDS',
  ASKS: 'ASKS',
  EXISTING_STATE: 'EXISTING_STATE'
};

export const initialState = {
  bids: [],
  asks: []
};

const removePriceLevel = (price: number, levels: []): [] => levels.filter(level => level[0] !== price) as []

const updatePriceLevel = (updatedLevel: never, levels: []): [] => {
  return levels.map(level => {
    if (level[0] === updatedLevel[0]) {
      level = updatedLevel;
    }
    return level;
  }) as [];
};


/**
 *  If the size returned by a delta is 0 then
 that price level should be removed from the orderbook,
 otherwise you can safely overwrite the state of that
 price level with new data returned by that delta.

 - The orders returned by the feed are in the format
 of [price, size][].
 * @param currentLevels Existing price levels - `bids` or `asks`
 * @param delta Update of a price level
 */
const applyDeltas =(currentLevels: [], delta: []) => {
  let updatedLevels: [] = currentLevels;

  delta.forEach((deltaLevel) => {
    const deltaLevelPrice = deltaLevel[0];
    const deltaLevelSize = deltaLevel[1];

    if (deltaLevelSize === 0) {
      // If current levels includes this one, remove it from the orderbook
      updatedLevels = removePriceLevel(deltaLevelPrice, updatedLevels);
    } else {
      updatedLevels = updatePriceLevel(deltaLevel, updatedLevels);
    }
  });

  return updatedLevels;
}

const reducer = (state: any, action: { data: any; type: string; }) => {
  const data = action.data;

  switch (action.type) {
    case OrderBookActions.EXISTING_STATE:
      return { ...state, bids: data.bids, asks: data.asks };
    case OrderBookActions.ASKS:
      const asks = applyDeltas(state.asks, data);
      return { ...state, asks };
    case OrderBookActions.BIDS:
      const bids = applyDeltas(state.bids, data);
      return { ...state, bids };
    default:
      return state;
  }
};

export default reducer;
