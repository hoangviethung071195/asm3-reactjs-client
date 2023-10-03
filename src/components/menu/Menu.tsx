import { PropsWithChildren } from 'react';
import { useNavigate } from "react-router-dom";

function Menu(props: PropsWithChildren) {
  const navigate = useNavigate();
  function navigateTo(path: string = '') {
    return () => {
      navigate("/" + path);
    };
  }

  return (
    <>
      <a
        onClick={navigateTo()}
        className="nav-link me-3 fs-6 fw-bolder text-hover"
      >
        <i>Home</i>
      </a>
      <a
        onClick={navigateTo('shop')}
        className="nav-link me-3 fs-6 fw-bolder text-hover"
      >
        <i>Shop</i>
      </a>
      <a
        onClick={navigateTo('orders')}
        className="nav-link me-3 fs-6 fw-bolder text-hover"
      >
        <i>Orders</i>
      </a>
    </>

  );
}

export default Menu;
