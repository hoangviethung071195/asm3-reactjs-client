import "../global.scss";
import { Outlet, useLocation } from "react-router-dom";
import Footer from './footer/Footer';
import { RefObject, forwardRef, useContext, useEffect, useRef, useState } from 'react';
import LayoutContext from 'store/context/LayoutContext';
import Header from './header/Header';

const Layout = forwardRef<HTMLDivElement>(function (props, ref) {
  const location = useLocation();
  const isShowFooter = (location.pathname !== '/login') && (location.pathname !== '/register');
  const { layoutClassName, isAdd } = useContext(LayoutContext);
  const [className, setClassName] = useState('main-layout');

  useEffect(() => {
    if (!layoutClassName) return;
    let classNameAfterToggle = (ref as RefObject<HTMLDivElement>).current?.className || '';
    if (isAdd) {
      classNameAfterToggle += ` ${layoutClassName}`;
    } else {
      classNameAfterToggle = classNameAfterToggle.replace(` ${layoutClassName}`, '');
    }
    setClassName(classNameAfterToggle);
  }, [layoutClassName, isAdd]);

  return (
    <div ref={ref} className={className}>
      <Header></Header>
      <Outlet></Outlet>
      {isShowFooter && <Footer></Footer>}
    </div>
  );
});

export default Layout;