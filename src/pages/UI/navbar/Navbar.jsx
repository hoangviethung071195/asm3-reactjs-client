import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import { requestApi } from "../../../service/products.service";

function Navbar(props) {
  const navigate = useNavigate();
  function clickHomeLinkHandler() {
    navigate("/");
  }

  function clickShopLinkHandler() {
    navigate("/shop");
  }

  function clickCartLinkHandler() {
    navigate("/cart");
  }

  function clickLogoutLinkHandler() {
    ctx.onLogout();
    navigate("/login");
  }

  function clickOrdersLinkHandler() {
    navigate("/orders");
  }

  const ctx = useContext(AuthContext);
  const { isAuthenticated } = ctx;

  return (
    <nav className="navbar navbar-expand-lg navbar-light templatemo_main_nav">
      <div className="container d-flex justify-content-between align-items-center">
        <a
          onClick={clickHomeLinkHandler}
          className="nav-link me-3 fs-6 fw-bolder text-hover"
        >
          <i>Home</i>
        </a>
        <a
          onClick={clickShopLinkHandler}
          className="nav-link me-3 fs-6 fw-bolder text-hover"
        >
          <i>Shop</i>
        </a>
        <a
          onClick={clickOrdersLinkHandler}
          className="nav-link me-3 fs-6 fw-bolder text-hover"
        >
          <i>Orders</i>
        </a>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#templatemo_main_nav"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between">
          <div className="flex-fill">
            <ul className="nav navbar-nav d-flex justify-content-center mx-lg-auto text-center">
              <li className="nav-item">
                <b>
                  <i>BOUTIQUE</i>
                </b>
              </li>
            </ul>
          </div>
          <div className="navbar align-self-center d-flex gap-2">
            <div className="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="inputMobileSearch"
                  placeholder="Search ..."
                />
                <div className="input-group-text">
                  <i className="fa fa-fw fa-search"></i>
                </div>
              </div>
            </div>
            <a
              onClick={clickCartLinkHandler}
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
              onClick={clickLogoutLinkHandler}
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

export default Navbar;
