import { useCookies } from 'react-cookie';

const useCookiesCustom = (name, value) => {
  const [cookies, setCookie, removeCookie] = useCookies([name]);
  if (!value && value !== false && value !== 0) {
    setCookie(name, value)
  } else {
    return cookies[name]
  }
};

export default useCookiesCustom;