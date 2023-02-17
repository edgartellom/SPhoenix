import "./App.css";
import Navbar from "./commons/Navbar/Navbar";
import HomePage from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Footer from "./commons/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePhones from "./components/Create/CreatePhones";
import ProductsPage from "./pages/Products/ProductsPage";
import About from "./pages/About/About";
import AdminNav from "./Admin/AdminNav";
//import ProtectedRoute from "../src/ProtectedRoute";
import AllProducts from "./Admin/AllProducts";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/phone/:id" element={<Details />} />
        <Route path="/products" element={<ProductsPage />} />
        {/* <Route path="/phones" element={<CreatePhones />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<AdminNav />} />
        <Route path="dashboard/all-products" element={<AllProducts />} />
        <Route path="dashboard/create-phones" element={<CreatePhones />} />

        {/* <Route path="/*" element={<ProtectedRoute />}>
          <Route path="checkout" element={<Checkout />} />
        </Route> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
