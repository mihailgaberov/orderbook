import React, { useEffect, useState } from 'react';
import GlobalStyle from "./styles/global"
import Header from "./components/Header";
import OrderBook from "./components/OrderBook";
import Footer from "./components/Footer";
import StatusMessage from "./components/StatusMessage";

export const ProductIds = {
  XBTUSD: 'PI_XBTUSD',
  ETHUSD: 'PI_ETHUSD'
};

function App() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [productId, setProductId] = useState(ProductIds.XBTUSD)
  const [isFeedKilled, setIsFeedKilled] = useState(false)

  useEffect(()=> {
    window.onresize = () => {
      setWindowWidth(window.innerWidth);
    }
    setWindowWidth(() => window.innerWidth);
  }, [])

  const toggleProductId = (): void => {
    if (productId === ProductIds.XBTUSD) {
      setProductId(ProductIds.ETHUSD)
    } else {
      setProductId(ProductIds.XBTUSD)
    }
  };

  const toggleFeed = (): void => {
    setIsFeedKilled(!isFeedKilled);
  }

  return (
    <>
      <GlobalStyle/>
      <Header/>
      <OrderBook windowWidth={windowWidth} productId={productId} isFeedKilled={isFeedKilled} />
      <Footer toggleFeedCallback={toggleProductId} killFeedCallback={toggleFeed} isFeedKilled={isFeedKilled} />
      <StatusMessage isFeedKilled={isFeedKilled} currency={productId} />
    </>
  );
}

export default App;
