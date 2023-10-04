import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from 'store/context/AuthContext';
import s from './side-bar.module.scss';
import { createPortal } from 'react-dom';

function SideBar(props: PropsWithChildren<{
  isShow: boolean;
  setIsShow(isShow: boolean): void;
}>) {
  const navigate = useNavigate();
  const { isAuthenticated, onLogout } = useContext(AuthContext);
  const { isShow, setIsShow } = props;

  function navigateTo(path: string = '') {
    return () => {
      navigate("/" + path);
      closeSidebarHandler();
    };
  }

  function closeSidebarHandler() {
    setIsShow(false);
  }

  return createPortal(
    <div className={s['side-bar'] + " d-lg-none"}>
      {
        isShow &&
        <div className={s['overlay']} onClick={closeSidebarHandler}>
        </div>
      }
      <ul className={`${s['list-menu']} animate__animated animate__slideInRight ${!isShow ? 'animate__slideOutRight' : ''}`}>
        <li className={s['close-btn']}>
          <b className='ms-4'>
            <i>BOUTIQUE</i>
          </b>
          <i className='fa fa-times close-icon' onClick={closeSidebarHandler}></i>
        </li>
        <hr />
        <li
          onClick={navigateTo()}
          className={s['item'] + " nav-link me-3 fs-6 fw-bolder text-hover"}
        >
          <i className='fa fa-home'></i> Home
        </li>
        <li
          onClick={navigateTo('shop')}
          className={s['item'] + " nav-link me-3 fs-6 fw-bolder text-hover"}
        >
          <i className='fa fa-shop'></i> Shop
        </li>
        <li
          onClick={navigateTo('orders')}
          className={s['item'] + " nav-link me-3 fs-6 fw-bolder text-hover"}
        >
          <i className='fa fa-list-alt'></i> Orders
        </li>
        <li
          onClick={navigateTo('cart')}
          className={s['item'] + " nav-link me-3 fs-6 fw-bolder text-hover"}
        >
          <i className='fa fa-cart-plus'></i> Cart
        </li>
        <hr />
        <li
          onClick={navigateTo('login')}
          className={s['item'] + " nav-link me-3 fs-6 fw-bolder text-hover"}
        >
          <i className='fa fa-sign-in'></i> Login
        </li>
        {
          isAuthenticated &&
          <li
            onClick={onLogout}
            className={s['item'] + " nav-link me-3 fs-6 fw-bolder text-hover"}
          >
            <i className='fa fa-sign-out'></i> Logout
          </li>
        }

      </ul>
    </div>,
    document.getElementById('portal')!
  );
}

export default SideBar;
