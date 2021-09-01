import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface Delta {
  feed: string;
  product_id: string;
  bids: number[][];
  asks: number[][];
}

export interface OrderbookState {
  market: string;
  bids: number[][];
  asks: number[][];
  delta: Delta
}

const ORDERBOOK_LEVELS: number = 25;

const initialState: OrderbookState = {
  market: 'PI_XBTUSD', // PI_ETHUSD
  bids: [],
  asks: [],
  delta: { feed: '', product_id: '', bids: [], asks: [] }
};

const removePriceLevel = (price: number, levels: number[][]): number[][] => levels.filter(level => level[0] !== price);

const updatePriceLevel = (updatedLevel: number[], levels: number[][]): [] => {
  return levels.map(level => {
    if (level[0] === updatedLevel[0]) {
      level = updatedLevel;
    }
    return level;
  }) as [];
};


const levelExists = (deltaLevelPrice: number, currentLevels: number[][]): boolean => currentLevels.some(level => level[0] === deltaLevelPrice);

const addPriceLevel = (deltaLevel: [], levels: number[][]): number[][] => {
  return [...levels, deltaLevel];
};
/**
 *  If the size returned by a delta is 0 then
 that price level should be removed from the orderbook,
 otherwise you can safely overwrite the state of that
 price level with new data returned by that delta.

 - The orders returned by the feed are in the format
 of [price, size][].
 * @param currentLevels Existing price levels - `bids` or `asks`
 * @param orders Update of a price level
 */
const applyDeltas = (currentLevels: number[][], orders: []): number[][] => {
  let updatedLevels: number[][] = currentLevels;

  orders.forEach((deltaLevel) => {
    const deltaLevelPrice = deltaLevel[0];
    const deltaLevelSize = deltaLevel[1];

    // If new size is zero - delete the price level
    if (deltaLevelSize === 0) {
       updatedLevels = removePriceLevel(deltaLevelPrice, updatedLevels);
    } else {
      // If the price level exists and the size is not zero, update it
      if (levelExists(deltaLevelPrice, currentLevels)){
        updatedLevels = updatePriceLevel(deltaLevel, updatedLevels);
      } else {
        // If the price level doesn't exist in the orderbook and there are less than 25 levels, add it
        if (updatedLevels.length < ORDERBOOK_LEVELS) {
          updatedLevels = addPriceLevel(deltaLevel, updatedLevels);
        }
      }
    }
  });

  return updatedLevels;
}

export const orderbookSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    addBids: (state, { payload }) => {
      state.delta.bids = payload;
      state.bids = applyDeltas(current(state).bids, payload);
    },
    addAsks: (state, { payload }) => {
      state.delta.asks = payload;
      state.asks = applyDeltas(current(state).asks, payload);
    },
    addExistingState: (state, action: PayloadAction<any>) => {
      state.market = action.payload['product_id'];
      state.bids = action.payload.bids;
      state.asks = action.payload.asks;
    },
  }
});

export const { addBids, addAsks, addExistingState } = orderbookSlice.actions;

export const selectBids = (state: RootState) => state.orderbook.bids;
export const selectAsks = (state: RootState) => state.orderbook.asks;

export default orderbookSlice.reducer;
