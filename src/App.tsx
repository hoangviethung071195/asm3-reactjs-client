import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthenticatedRoute from './authentication/AuthenticatedRoute';
import Root from './components/root/Root';
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Detail from "./pages/detail/Detail";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import DetailOrder from './pages/orders/DetailOrder';
import Orders from './pages/orders/Orders';
import Shop from "./pages/shop/Shop";
import Register from 'pages/auth/register/Register';

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Root />,
      children: [
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          index: true,
          element: <Home />
        },
        {
          path: 'detail/:id',
          element: <Detail />
        },
        {
          path: '',
          element: <AuthenticatedRoute />,
          children: [
            {
              path: 'shop',
              element: <Shop />
            },
            {
              path: 'cart',
              element: <Cart />
            },
            {
              path: 'checkout',
              element: <Checkout />
            },
            {
              path: 'orders',
              element: <Orders />
            },
            {
              path: 'order/:orderId',
              element: <DetailOrder />
            },
          ]
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
