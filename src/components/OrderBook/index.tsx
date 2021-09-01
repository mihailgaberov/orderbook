import React, { useEffect } from 'react';

import TitleRow from "./TitleRow";
import { Container, TableContainer } from "./styles";
import PriceLevelRow from "./PriceLevelRow";
import Spread from "../Spread";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addAsks, addBids, addExistingState, selectAsks, selectBids } from './orderbookSlice';

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

const OrderBook = () => {
  const bids = useAppSelector(selectBids);
  const asks = useAppSelector(selectAsks);
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
  }, [dispatch]);

  const formatNumber = (arg: number): string => {
    return new Intl.NumberFormat('en-US').format(arg);
  };

  const formatPrice = (arg: number): string => {
    return arg.toLocaleString("en", {useGrouping: true, minimumFractionDigits: 2})
  };

  const buildPriceLevels = (levels: number[][], reversedOrder: boolean = false): React.ReactNode => {
    const totalSums: number[] = [];

    // TODO: move out the calculation of the totals
    // Add total amounts
   /* const levelsWithTotals: number[][] = levels.map((level: number[], idx) => {
      const size: number = level[1];
      const updatedLevel = [...level];
      const totalSum: number = idx === 0 ? size : size + totalSums[idx - 1];
      updatedLevel[2] = totalSum;
      totalSums.push(totalSum);
      return updatedLevel;
    });*/

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
      {bids && asks ?
        <>
          <TableContainer>
            <TitleRow />
            {buildPriceLevels(bids)}
          </TableContainer>
          <Spread />
          <TableContainer>
            <TitleRow reversedFieldsOrder={true} />
            {buildPriceLevels(asks, true)}
          </TableContainer>
        </> :
        <>No data.</>}


    </Container>
  )
};

export default React.memo(OrderBook);
