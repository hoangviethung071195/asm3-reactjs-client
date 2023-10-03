import "../global.scss";
import { Outlet, useLocation } from "react-router-dom";
import Footer from './footer/Footer';
import { useContext } from 'react';
import StyleContext from 'store/context/style-context';
import Header from './header/Header';

export default function Layout() {
  const location = useLocation();
  const isShowFooter = (location.pathname !== '/login') && (location.pathname !== '/register');
  const { layoutClassName } = useContext(StyleContext);

  return (
    <div className={layoutClassName + ' main-layout'}>
      <Header></Header>
      <Outlet></Outlet>
      {isShowFooter && <Footer></Footer>}
    </div>
  );
}