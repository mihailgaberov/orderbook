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
  maxTotalBids: number;
  asks: number[][];
  maxTotalAsks: number;
  delta: Delta
}

const ORDERBOOK_LEVELS: number = 25;

const initialState: OrderbookState = {
  market: 'PI_XBTUSD', // PI_ETHUSD
  bids: [],
  maxTotalBids: 0,
  asks: [],
  maxTotalAsks: 0,
  delta: { feed: '', product_id: '', bids: [], asks: [] }
};

const sortByPrice = (currentLevel: number[], nextLevel: number[]): number => nextLevel[0] - currentLevel[0];

const removePriceLevel = (price: number, levels: number[][]): number[][] => levels.filter(level => level[0] !== price);

const updatePriceLevel = (updatedLevel: number[], levels: number[][]): number[][] => {
  return levels.map(level => {
    if (level[0] === updatedLevel[0]) {
      level = updatedLevel;
    }
    return level;
  });
};

const levelExists = (deltaLevelPrice: number, currentLevels: number[][]): boolean => currentLevels.some(level => level[0] === deltaLevelPrice);

const addPriceLevel = (deltaLevel: number[], levels: number[][]): number[][] => {
  return [ ...levels, deltaLevel ];
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
const applyDeltas = (currentLevels: number[][], orders: number[][]): number[][] => {
  let updatedLevels: number[][] = currentLevels;

  orders.forEach((deltaLevel) => {
    const deltaLevelPrice = deltaLevel[0];
    const deltaLevelSize = deltaLevel[1];

    // If new size is zero - delete the price level
    if (deltaLevelSize === 0) {
      updatedLevels = removePriceLevel(deltaLevelPrice, updatedLevels);
    } else {
      // If the price level exists and the size is not zero, update it
      if (levelExists(deltaLevelPrice, currentLevels)) {
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

const addTotalSums = (orders: number[][]): { levelsWithTotals: number[][], maxTotal: number } => {
  const totalSums: number[] = [];

  const levelsWithTotals: number[][] = orders.map((level: number[], idx) => {
    const size: number = level[1];
    const updatedLevel = [ ...level ];
    const totalSum: number = idx === 0 ? size : size + totalSums[idx - 1];
    updatedLevel[2] = totalSum;
    totalSums.push(totalSum);
    return updatedLevel;
  });

  const maxTotal: number = Math.max.apply(Math, totalSums);
  return {
    levelsWithTotals,
    maxTotal
  };
};

export const orderbookSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    addBids: (state, { payload }) => {
      const { levelsWithTotals: deltaBidsWithTotals } = addTotalSums(payload);
      state.delta.bids = deltaBidsWithTotals;
      state.bids = applyDeltas(current(state).bids, deltaBidsWithTotals);
    },
    addAsks: (state, { payload }) => {
      const { levelsWithTotals: deltaAsksWithTotals } = addTotalSums(payload);
      state.delta.asks = deltaAsksWithTotals;
      state.asks = applyDeltas(current(state).asks, deltaAsksWithTotals);
    },
    addExistingState: (state, action: PayloadAction<any>) => {
      state.market = action.payload['product_id'];

      const { levelsWithTotals: bidsWithTotals, maxTotal: maxTotalBids } = addTotalSums(action.payload.bids);
      state.bids = bidsWithTotals;
      state.maxTotalBids = maxTotalBids;

      const { levelsWithTotals: asksWithTotals, maxTotal: maxTotalAsks } = addTotalSums(action.payload.asks);
      state.asks = asksWithTotals;
      state.maxTotalAsks = maxTotalAsks;
    },
  }
});

export const { addBids, addAsks, addExistingState } = orderbookSlice.actions;

export const selectBids = (state: RootState): number[][] => state.orderbook.bids;
export const selectAsks = (state: RootState): number[][] => state.orderbook.asks;
export const selectMaxTotalBids = (state: RootState): number => state.orderbook.maxTotalBids
export const selectMaxTotalAsks = (state: RootState): number => state.orderbook.maxTotalBids

export default orderbookSlice.reducer;
