import { createSlice, current } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { groupByTicketSize } from "../../helpers";
import { ORDERBOOK_LEVELS } from "../../constants";

export interface OrderbookState {
  market: string;
  rawBids: number[][];
  bids: number[][];
  maxTotalBids: number;
  rawAsks: number[][];
  asks: number[][];
  maxTotalAsks: number;
  groupingSize: number;
}

const initialState: OrderbookState = {
  market: 'PI_XBTUSD', // PI_ETHUSD
  rawBids: [],
  bids: [],
  maxTotalBids: 0,
  rawAsks: [],
  asks: [],
  maxTotalAsks: 0,
  groupingSize: 0.5
};

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
    if (deltaLevelSize === 0 && updatedLevels.length > ORDERBOOK_LEVELS) {
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

const addTotalSums = (orders: number[][]): number[][] => {
  const totalSums: number[] = [];

  return orders.map((order: number[], idx) => {
    const size: number = order[1];
    if (typeof order[2] !== 'undefined') {
      return order;
    } else {
      const updatedLevel = [ ...order ];
      const totalSum: number = idx === 0 ? size : size + totalSums[idx - 1];
      updatedLevel[2] = totalSum;
      totalSums.push(totalSum);
      return updatedLevel;
    }
  });
};

const addDepths = (orders: number[][], maxTotal: number): number[][] => {
  return orders.map(order => {
    if (typeof order[3] !== 'undefined') {
      return order;
    } else {
      const calculatedTotal: number = order[2];
      const depth = (calculatedTotal / maxTotal) * 100;
      const updatedOrder = [ ...order ];
      updatedOrder[3] = depth;
      return updatedOrder;
    }
  });
};

const getMaxTotalSum = (orders: number[][]): number => {
  const totalSums: number[] = orders.map(order => order[2]);
  return Math.max.apply(Math, totalSums);
}

export const orderbookSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    addBids: (state, { payload }) => {
      const currentTicketSize: number = current(state).groupingSize;
      const groupedCurrentBids: number[][] = groupByTicketSize(payload, currentTicketSize);
      const updatedBids: number[][] = addTotalSums(
        applyDeltas(
          groupByTicketSize(current(state).rawBids, currentTicketSize),
          groupedCurrentBids
        )
      );

      state.maxTotalBids = getMaxTotalSum(updatedBids);
      state.bids = addDepths(updatedBids, current(state).maxTotalBids);
    },
    addAsks: (state, { payload }) => {
      const currentTicketSize: number = current(state).groupingSize;
      const groupedCurrentAsks: number[][] = groupByTicketSize(payload, currentTicketSize);
      const updatedAsks: number[][] = addTotalSums(
        applyDeltas(
          groupByTicketSize(current(state).rawAsks, currentTicketSize),
          groupedCurrentAsks
        )
      );

      state.maxTotalAsks = getMaxTotalSum(updatedAsks);
      state.asks = addDepths(updatedAsks, current(state).maxTotalAsks);
    },
    addExistingState: (state, { payload }) => {
      const rawBids: number[][] = payload.bids;
      const rawAsks: number[][] = payload.asks;
      const bids: number[][] = addTotalSums(groupByTicketSize(rawBids, current(state).groupingSize));
      const asks: number[][] = addTotalSums(groupByTicketSize(rawAsks, current(state).groupingSize));

      state.market = payload['product_id'];
      state.rawBids = rawBids;
      state.rawAsks = rawAsks;
      state.maxTotalBids = getMaxTotalSum(bids);
      state.maxTotalAsks = getMaxTotalSum(asks);
      state.bids = addDepths(bids, current(state).maxTotalBids);
      state.asks = addDepths(asks, current(state).maxTotalAsks);
    },
    setGrouping: (state, { payload }) => {
      state.groupingSize = payload;
    },
    clearOrdersState: (state) => {
      state.bids = [];
      state.asks = [];
      state.rawBids = [];
      state.rawAsks = [];
      state.maxTotalBids = 0;
      state.maxTotalAsks = 0;
    }
  }
});

export const { addBids, addAsks, addExistingState, setGrouping, clearOrdersState } = orderbookSlice.actions;

export const selectBids = (state: RootState): number[][] => state.orderbook.bids;
export const selectAsks = (state: RootState): number[][] => state.orderbook.asks;
export const selectGrouping = (state: RootState): number => state.orderbook.groupingSize;
export const selectMarket = (state: RootState): string => state.orderbook.market;

export default orderbookSlice.reducer;
