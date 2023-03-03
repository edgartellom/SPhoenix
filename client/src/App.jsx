import "./App.css";
import { Header, Footer } from "./commons";
import {
  Home,
  Products,
  Details,
  About,
  Contact,
  OrderHistory,
  Checkout,
} from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreatePhones } from "./components";
// import { Login } from "./components";
import Cart from "./components/shoppingCart/Cart";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Details />} />
        <Route path="/phones" element={<CreatePhones />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orderHistory" element={<OrderHistory />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
