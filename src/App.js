import Footer from "./pages/UI/footer/Footer";
import Navbar from "./pages/UI/navbar/Navbar";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./pages/shop/Shop";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { AuthContextProvider } from "./store/auth-context";
import PopupDetail from "./components/popup/Popup";
import ExampleModal from "./components/modal/customer-support/customerSupport";
import AuthenticatedRoute from './authentication/AuthenticatedRoute';
import Orders from './pages/orders/Orders';
import DetailOrder from './pages/orders/DetailOrder';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path='/shop' element={
            <AuthenticatedRoute>
              <Shop />
            </AuthenticatedRoute>} />
          <Route path="/cart" element={
            <AuthenticatedRoute>
              <Cart />
            </AuthenticatedRoute>} />
          <Route path="/checkout" element={
            <AuthenticatedRoute>
              <Checkout />
            </AuthenticatedRoute>} />
          <Route path="/orders" element={
            <AuthenticatedRoute>
              <Orders />
            </AuthenticatedRoute>} />
          <Route path="/orders/:orderId" element={
            <AuthenticatedRoute>
              <DetailOrder />
            </AuthenticatedRoute>} />
        </Routes>
        <Footer></Footer>
        <ExampleModal></ExampleModal>
        <PopupDetail></PopupDetail>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
