import { useCookies } from 'react-cookie';

const useCookiesCustom = (name: string, value: number | string | boolean | object) => {
  const [cookies, setCookie, removeCookie] = useCookies([name]);
  if (!value && value !== false && value !== 0) {
    setCookie(name, value);
  } else {
    return cookies[name];
  }
};

export default useCookiesCustom;