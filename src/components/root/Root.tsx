import { loadGlobalSettings } from '../../service/global.service';
import { AuthContextProvider } from '../../store/context/AuthContext';
import Layout from '../../layout/Layout';
import ProductInfo from '../modal/product-info/ProductInfo';
import CustomerSupport from 'components/modal/customer-support/customerSupport';
import { StyleContextProvider } from 'store/context/LayoutContext';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

export default function Root() {
  loadGlobalSettings();
  const { pathname } = useLocation();
  const isAuthRoute = pathname === '/login' || pathname === '/register';
  const layoutRef = useRef<HTMLDivElement>(null);

  return (
    <AuthContextProvider>
      <StyleContextProvider >
        <Layout ref={layoutRef} />
        {!isAuthRoute && <CustomerSupport />}
        <ProductInfo />
      </StyleContextProvider>
    </AuthContextProvider>
  );
}