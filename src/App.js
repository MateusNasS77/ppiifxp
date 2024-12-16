import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Shop from "./components/Shop";
import Checkout from "./components/Checkout";
import CartContextProvider from "./context/CartContext";
import Footer from "./components/Footer";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Shop />}/>
        <Route path="/checkout" element={<Checkout />}/>
      </Routes>
      <Footer />
    </CartContextProvider>
  );
}

export default App;
