import "../global.scss";
import { Outlet, useLocation } from "react-router-dom";
import Footer from './footer/Footer';
import { useContext, useEffect, useRef, useState } from 'react';
import LayoutContext from 'store/context/LayoutContext';
import Header from './header/Header';

export default function Layout() {
  const location = useLocation();
  const isShowFooter = (location.pathname !== '/login') && (location.pathname !== '/register');
  const { layoutClassName, isAdd } = useContext(LayoutContext);
  const layoutRef = useRef<HTMLDivElement>(null);
  const [className, setClassName] = useState('main-layout');

  useEffect(() => {
    if (!layoutClassName) return;

    let classNameAfterToggle = layoutRef.current?.className || '';
    if (isAdd) {
      classNameAfterToggle += ` ${layoutClassName}`;
    } else {
      classNameAfterToggle = classNameAfterToggle.replace(` ${layoutClassName}`, '');
    }
    setClassName(classNameAfterToggle);
  }, [layoutClassName, isAdd]);

  return (
    <div ref={layoutRef} className={className}>
      <Header></Header>
      <Outlet></Outlet>
      {isShowFooter && <Footer></Footer>}
    </div>
  );
}