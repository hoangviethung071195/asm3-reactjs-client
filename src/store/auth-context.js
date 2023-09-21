import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUser, removeCurrentUser, updateCurrentUser, updateListUsers } from '../helpers/product.helper';
import cloneDeep from 'lodash.clonedeep';
import { addOrder, addProductToCart, deleteProductInCart, getCart, signin, signup } from '../service/products.service';

const AuthContext = React.createContext({
  currentUser: {
    userId: '',
    email: '',
    fullName: '',
    token: ''
  },
  carts: [],
  isAuthenticated: false,
  onLogout: () => { },
  onLogin: () => { },
  onRegister: () => { },
  onAddToCart: () => { },
  onRemoveCart: () => { },
  onAddOrder: () => { }
});

export function AuthContextProvider(props) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [carts, setCarts] = useState([]);


  useEffect(() => {
    if (!currentUser?.userId) return;
    loadCarts();
  }, []);

  function loadCarts() {
    getCart(currentUser?.userId)
      .then(r => {
        setCarts(r);
        console.log('carts ', carts);
      });
  }

  function updateCurrentUserInfo(user) {
    console.log('setCurrentUser', user);
    updateCurrentUser(user);
    setCurrentUser(cloneDeep(user));
  }

  const loginHandler = (user) => {
    console.log('loginHandler ');
    signin(user)
      .then(r => {
        console.log('user ', user);
        console.log('r ', r);
        if (r) {

          updateCurrentUserInfo({
            ...r,
            token: 'Bearer ' + r.token
          });
          navigate('/');
          toast.success("Đăng nhập thành công!");
        }
      });
  };


  const logoutHandler = () => {
    setCurrentUser({});
    removeCurrentUser();
    window.location.href = '/login'
  };

  const registerHandler = (user) => {
    console.log('user', user);
    signup(user).then(r => {
      if (r) {
        navigate('/login');
        toast.success("Đăng ký tài khoản thành công");
      }
    });
    setCurrentUser(user);
  };

  const addToCart = (cart) => {
    return addProductToCart({ ...cart, userId: currentUser?.userId })
      .then(r => {
        if (r) {
          loadCarts();
        }
        return r;
      });
  };

  const removeCart = (productId) => {
    return deleteProductInCart({ productId, userId: currentUser?.userId })
      .then(r => {
        if (r) {
          loadCarts();
        }
        return r;
      });
  };

  const addOrders = (cartInfo) => {
    return addOrder({ ...cartInfo, userId: currentUser?.userId })
      .then(r => {
        if (r) {
          loadCarts();
        }
        return r;
      });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        carts,
        isAuthenticated: currentUser?.token,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onRegister: registerHandler,
        onAddToCart: addToCart,
        onRemoveCart: removeCart,
        onAddOrder: addOrders
      }}
    >
      {props.children}
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default AuthContext;
