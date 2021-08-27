import React from 'react';
import GlobalStyle from "./styles/global"
import Header from "./components/Header";
import OrderBook from "./components/OrderBook";

function App() {
  return (
    <>
      <GlobalStyle/>
      <Header/>
      <OrderBook/>
    </>
  );
}

export default App;
