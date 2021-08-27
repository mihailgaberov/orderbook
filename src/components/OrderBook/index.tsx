import React, { useState, useEffect } from 'react';

const WSS_FEED_URL: string = 'wss://www.cryptofacilities.com/ws/v1';

const subscribeMessage = {
  event: 'subscribe',
  feed: 'book_ui_1',
  product_ids: ['PI_XBTUSD']
};

const OrderBook = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(WSS_FEED_URL);

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribeMessage));
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log(response.data)
      setOrders(response.data);
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, []);

  return (<>{orders}</>)
};

export default OrderBook;
