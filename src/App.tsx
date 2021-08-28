import React from 'react';
import GlobalStyle from "./styles/global"
import Header from "./components/Header";
import OrderBook from "./components/OrderBook";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <GlobalStyle/>
      <Header/>
      <OrderBook/>
      <Footer />
    </>
  );
}

export default App;
