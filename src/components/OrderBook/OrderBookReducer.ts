import { Delta } from "./index";

export const OrderBookActions = {
  BIDS: 'BIDS',
  ASKS: 'ASKS',
  EXISTING_STATE: 'EXISTING_STATE'
};

export const initialState = {
  bids: [],
  asks: []
};

const reducer = (state: any, action: { data: Delta; type: string; }) => {
  const data = action.data;

  // console.log(">>> data: ", data.bids);

  switch (action.type) {
    case OrderBookActions.EXISTING_STATE:
      return { ...state, bids: data.bids, asks: data.asks };
    case OrderBookActions.ASKS:
      return state;
    case OrderBookActions.BIDS:
      return state;
    default:
      return state;
  }
};

export default reducer;
