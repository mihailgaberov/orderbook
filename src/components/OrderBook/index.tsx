import React, { useEffect, useReducer } from 'react';

import TitleRow from "./TitleRow";
import { Container, TableContainer } from "./styles";
import PriceLevelRow from "./PriceLevelRow";
import Spread from "../Spread";
import OrderBookReducer, { initialState, OrderBookActions } from "./OrderBookReducer";

const WSS_FEED_URL: string = 'wss://www.cryptofacilities.com/ws/v1';
const subscribeMessage = {
  event: 'subscribe',
  feed: 'book_ui_1',
  product_ids: ['PI_XBTUSD']
};

export interface Delta {
  feed: string;
  product_id: string;
  bids: [];
  asks: [];
}
/*
interface ExistingState {
  numLevels: number;
  feed: string;
  bids: [];
  asks: [];
  product_id: string;
}*/

const OrderBook = () => {
  // const [delta, setDelta] = useState<Delta>();
  // const [existingState, setExistingState] = useState<ExistingState>();
  const [state, dispatch] = useReducer(OrderBookReducer, initialState);

  useEffect(() => {
    const ws = new WebSocket(WSS_FEED_URL);

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribeMessage));
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.numLevels) {
        dispatch({type: OrderBookActions.EXISTING_STATE, data: response});
      } else {
        if (response?.bids?.length > 0) {
          dispatch({type: OrderBookActions.BIDS, data: response.bids});
        }

        if (response?.asks?.length > 0) {
          dispatch({type: OrderBookActions.ASKS, data: response.asks});
        }
      }
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, []);

  const formatNumber = (arg: number): string => {
    return new Intl.NumberFormat('en-US').format(arg);
  };

  const formatPrice = (arg: number): string => {
    return arg.toLocaleString("en", {useGrouping: true, minimumFractionDigits: 2})
  };

  const buildPriceLevels = (levels: [], reversedOrder: boolean = false): React.ReactNode => {
    const totalSums: number[] = [];

    // Add total amounts
    levels.map((level: any, idx) => {
      level[2] = idx === 0 ? level[1] : level[1] + totalSums[idx - 1];
      totalSums.push(level[2]);
      return level;
    });

    const maxTotal: number = Math.max.apply(Math, totalSums);

    return (
      levels.map((level, idx) => {
        const calculatedTotal: number = level[2];
        const depth = (calculatedTotal * 100) / maxTotal;
        const total: string = formatNumber(calculatedTotal);
        const size: string = formatNumber(level[1]);
        const price: string = formatPrice(level[0]);

        return <PriceLevelRow key={idx}
                              total={total}
                              depth={depth}
                              size={size}
                              price={price}
                              reversedFieldsOrder={reversedOrder}/>;
      })
    );
  };

  return (
    <Container>
      {state ?
        <>
          <TableContainer>
            <TitleRow />
            {buildPriceLevels(state.bids)}
          </TableContainer>
          <Spread />
          <TableContainer>
            <TitleRow reversedFieldsOrder={true} />
            {buildPriceLevels(state.asks, true)}
          </TableContainer>
        </> :
        <>No data.</>}


    </Container>
  )
};

export default OrderBook;
