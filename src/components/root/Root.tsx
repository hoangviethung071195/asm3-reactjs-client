import { loadGlobalSettings } from '../../service/global.service';
import { AuthContextProvider } from '../../store/context/auth-context';
import Layout from '../../layout/Layout';
import ProductInfo from '../modal/product-info/ProductInfo';
import CustomerSupport from 'components/modal/customer-support/customerSupport';
import { StyleContextProvider } from 'store/context/style-context';
import { useLocation } from 'react-router-dom';

export default function Root() {
  loadGlobalSettings();
  const { pathname } = useLocation();
  const isAuthRoute = pathname === '/login' || pathname === '/register';
  return (
    <AuthContextProvider>
      <StyleContextProvider>
        <Layout />
        {!isAuthRoute && <CustomerSupport />}
        <ProductInfo />
      </StyleContextProvider>
    </AuthContextProvider>
  );
}