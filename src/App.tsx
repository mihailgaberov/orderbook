import React, { useEffect, useState } from 'react';
import GlobalStyle from "./styles/global"
import Header from "./components/Header";
import OrderBook from "./components/OrderBook";
import Footer from "./components/Footer";

export const ProductIds = {
  XBTUSD: 'PI_XBTUSD',
  ETHUSD: 'PI_ETHUSD'
};

function App() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [productId, setProductId] = useState(ProductIds.XBTUSD)

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

  return (
    <>
      <GlobalStyle/>
      <Header/>
      <OrderBook windowWidth={windowWidth} productId={productId} />
      <Footer toggleFeedCallback={toggleProductId} />
    </>
  );
}

export default App;
