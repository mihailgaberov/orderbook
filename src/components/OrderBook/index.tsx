import React, { useEffect } from 'react';

import TitleRow from "./TitleRow";
import { Container, TableContainer } from "./styles";
import PriceLevelRow from "./PriceLevelRow";
import Spread from "../Spread";
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  addAsks,
  addBids,
  addExistingState,
  selectAsks,
  selectBids,
  selectMaxTotalBids,
  selectMaxTotalAsks
} from './orderbookSlice';

const WSS_FEED_URL: string = 'wss://www.cryptofacilities.com/ws/v1';
const subscribeMessage = {
  event: 'subscribe',
  feed: 'book_ui_1',
  product_ids: [ 'PI_XBTUSD' ]
};

enum OrderType {
  BIDS,
  ASKS
}

export interface Delta {
  feed: string;
  product_id: string;
  bids: [];
  asks: [];
}

const OrderBook = () => {
  const bids: number[][] = useAppSelector(selectBids);
  const asks: number[][] = useAppSelector(selectAsks);
  const maxTotalBids: number = useAppSelector(selectMaxTotalBids);
  const maxTotalAsks: number = useAppSelector(selectMaxTotalAsks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const ws = new WebSocket(WSS_FEED_URL);

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribeMessage));
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.numLevels) {
        dispatch(addExistingState(response));
      } else {
        if (response?.bids?.length > 0) {
          dispatch(addBids(response.bids));
        }
        if (response?.asks?.length > 0) {
          dispatch(addAsks(response.asks));
        }
      }
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [ dispatch ]);

  const formatNumber = (arg: number): string => {
    return new Intl.NumberFormat('en-US').format(arg);
  };

  const formatPrice = (arg: number): string => {
    return arg.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })
  };

  const buildPriceLevels = (levels: number[][], orderType: OrderType = OrderType.BIDS): React.ReactNode => {
    const maxTotal: number = orderType === OrderType.BIDS ? maxTotalBids : maxTotalAsks;

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
                              reversedFieldsOrder={orderType === OrderType.ASKS} />;
      })
    );
  };

  return (
    <Container>
      {bids && asks ?
        <>
          <TableContainer>
            <TitleRow />
            {buildPriceLevels(bids, OrderType.BIDS)}
          </TableContainer>
          <Spread />
          <TableContainer>
            <TitleRow reversedFieldsOrder={true} />
            {buildPriceLevels(asks, OrderType.ASKS)}
          </TableContainer>
        </> :
        <>No data.</>}


    </Container>
  )
};

export default React.memo(OrderBook);
