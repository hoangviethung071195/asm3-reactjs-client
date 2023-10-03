import { cloneDeep } from 'lodash';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { signin, signup } from '../../service/authentication.service';
import { deleteProductsInCartByUser, getCartByUser, updateCartByUser } from '../../service/carts.service';
import { addOrder } from '../../service/orders.service';
import { getCurrentUser, removeCurrentUser, updateCurrentUser } from '../../utils/helpers/cookieStorage';
import { UserModel } from 'models/User.model';
import { CartModel } from 'models/Cart.model';
import { OrderInfoModel } from 'models/Order.model';

const AuthContext = createContext<{
  currentUser: UserModel;
  carts: CartModel[];
  isAuthenticated: boolean;
  onLogout: VoidFunction;
  onLogin: (user: UserModel) => Promise<UserModel>;
  onRegister: (user: UserModel) => Promise<UserModel>;
  onAddToCart: (quantity: number, productId: string) => Promise<boolean>;
  onRemoveCart: (productId: string) => Promise<boolean>;
  onAddOrder: (order: OrderInfoModel) => Promise<string>;
}>({
  currentUser: {},
  carts: [],
  isAuthenticated: false,
  onLogout() { },
  onLogin: async (user: UserModel) => { return {}; },
  onRegister: async (user: UserModel) => { return {}; },
  onAddToCart: async (quantity: number, productId: string) => { return false; },
  onRemoveCart: async (productId: string) => { return false; },
  onAddOrder: async (order: OrderInfoModel) => { return ''; },
});

export function AuthContextProvider(props: PropsWithChildren) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserModel>(getCurrentUser());
  const [carts, setCarts] = useState<CartModel[]>([]);

  useEffect(() => {
    if (!currentUser?._id) return;
    loadCarts();
  }, []);

  function loadCarts() {
    getCartByUser(currentUser._id!)
      .then(r => {
        setCarts(r);
      });
  }

  function updateCurrentUserInfo(user: UserModel) {
    updateCurrentUser(user);
    setCurrentUser(cloneDeep(user));
  }

  const loginHandler = async (user: UserModel) => {
    console.log('loginHandler ');
    return signin(user)
      .then(r => {
        if (r) {
          updateCurrentUserInfo({
            ...r,
            token: 'Bearer ' + r.token
          });
          navigate('/');
          toast.success("Login successfully!", {
            autoClose: 1000
          });
        }
        return r;
      });
  };

  const logoutHandler = () => {
    setCurrentUser({});
    removeCurrentUser();
    navigate('/login');
  };

  const registerHandler = async (user: UserModel) => {
    return signup(user).then(r => {
      if (r) {
        setCurrentUser(user);
        navigate('/login');
        toast.success("Regiser successfully");
      }
      return r;
    });
  };

  const addToCart = async (quantity: number, productId: string) => {
    return updateCartByUser(currentUser._id!, quantity, productId)
      .then(r => {
        if (r) {
          loadCarts();
        }
        return r;
      });
  };

  const removeCart = async (productId: string) => {
    return deleteProductsInCartByUser(currentUser._id!, productId)
      .then(r => {
        if (r) {
          loadCarts();
        }
        return r;
      });
  };

  const onAddOrder = async (order: OrderInfoModel) => {
    order.userId = currentUser._id!;
    return addOrder(order)
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
        isAuthenticated: !!currentUser?.token,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onRegister: registerHandler,
        onAddToCart: addToCart,
        onRemoveCart: removeCart,
        onAddOrder: onAddOrder
      }}
    >
      {props.children}
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default AuthContext;
