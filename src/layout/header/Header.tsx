import Menu from 'components/menu/Menu';
import SideBar from 'layout/side-bar/SideBar';
import { PropsWithChildren, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from 'store/context/AuthContext';
import LayoutContext from 'store/context/LayoutContext';

export default function Header(props: PropsWithChildren) {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const { isAuthenticated } = ctx;
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const { toggleLayoutClassName } = useContext(LayoutContext);

  function navigateTo(path: string = '') {
    return () => {
      navigate("/" + path);
    };
  }

  function logoutHandler() {
    if (isAuthenticated) {
      ctx.onLogout();
    }
  }

  function displaySidebarHandler(isShow: boolean) {
    if (isShow) {
      toggleLayoutClassName('filter-blur', true);
    } else {
      toggleLayoutClassName('filter-blur');
    }
    setIsShowSidebar(isShow);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light templatemo_main_nav">
      <div className="container d-flex justify-content-between align-items-center">
        <div className='collapse navbar-collapse'>
          <Menu></Menu>
        </div>
        <div className="flex-fill">
          <ul className="nav justify-content-lg-center">
            <li className="nav-item">
              <b>
                <i>BOUTIQUE</i>
              </b>
            </li>
          </ul>
        </div>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#templatemo_main_nav"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => displaySidebarHandler(true)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <SideBar isShow={isShowSidebar} setIsShow={displaySidebarHandler}></SideBar>

        <div className="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between">
          <div className="flex-fill">
            <ul className="nav navbar-nav d-flex justify-content-center mx-lg-auto text-center">
              <li className="nav-item">
                <b>
                  <i></i>
                </b>
              </li>
            </ul>
          </div>
          <div className="navbar align-self-center d-flex gap-2">
            <a
              onClick={navigateTo('cart')}
              className="nav-icon position-relative text-decoration-none text-1 text-hover"
            >
              <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
              Cart
            </a>
            <p className="nav-icon position-relative text-decoration-none text-1">
              <i className="fa fa-fw fa-user text-dark mr-3"></i>
              {ctx.currentUser?.fullName}
            </p>
            <a
              onClick={isAuthenticated ? logoutHandler : navigateTo('login')}
              className="nav-icon position-relative text-decoration-none text-1 text-hover"
            >
              <i className="text-hover text-1">
                ({isAuthenticated ? "Logout" : "Login"})
              </i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
