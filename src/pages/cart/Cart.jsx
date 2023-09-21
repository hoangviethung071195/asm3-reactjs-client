import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import cloneDeep from "lodash.clonedeep";
import { toast } from "react-toastify";

function Cart(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // chuyển đến trang giỏ hàng
  function clickCheckoutLinkHandler() {
    navigate("/checkout");
  }

  // chuyển đến trang cửa hàng
  function clickShopLinkHandler() {
    navigate("/shop");
  }

  // chuyển đến trang chi tiết
  function clickDetailLinkHandler(id) {
    navigate("/detail/" + id);
  }

  const ctx = useContext(AuthContext);
  const quantityInputEl = useRef();
  console.log("ctx ", ctx);

  // const debouncedQuantity = useDebounce<string>(value, 1000)

  return (
    <>
      <div className="bg-light py-5">
        <div className="container d-flex justify-content-between">
          <h1 className="fw-bolder text-black my-4 fst-italic">CART</h1>
          <p className="text-1 text-muted my-4 pt-3">CART</p>
        </div>
      </div>

      <section className="container py-5 h-100 fst-italic">
        <h5 className="fw-bolder text-black mb-4">Shopping Cart</h5>
        <div className="row g-0">
          <div className="p-5 ps-0 pt-0 text-center col-8">
            <div className="row mb-4 justify-content-between align-items-center bg-light py-3">
              <p className="col-md-2 col-lg-2 col-xl-2 text-1 text-uppercase">
                Image
              </p>
              <p className="col-md-2 col-lg-2 col-xl-2 text-1 text-uppercase">
                Product
              </p>
              <p className="col-md-2 col-lg-2 col-xl-2 text-1 text-uppercase">
                Price
              </p>
              <p className="col-md-2 col-lg-2 col-xl-2 text-1 text-uppercase">
                Quantity
              </p>
              <p className="col-md-2 col-lg-2 col-xl-2 text-1 text-uppercase">
                Total
              </p>
              <p className="col-md-2 col-lg-2 col-xl-2 text-1 text-uppercase">
                Remove
              </p>
            </div>

            {ctx?.carts?.map((item) => (
              <div
                className="row mb-4 justify-content-between align-items-center"
                key={item._id}
              >
                <div className="col-md-2 col-lg-2 col-xl-2">
                  <a
                    onClick={() => clickDetailLinkHandler(item._id)}
                    className="d-block hover-effect-overlay"
                  >
                    <img
                      src={item.imageUrl1}
                      className="card-img-top"
                      alt="..."
                    />
                  </a>
                </div>
                <div className="col-md-2 col-lg-2 col-xl-2">
                  <a onClick={() => clickDetailLinkHandler(item._id)}>
                    <h6 className="text-black mb-0 hover-effect-overlay">
                      {item.title}
                    </h6>
                  </a>
                </div>
                <div className="col-md-2 col-lg-2 col-xl-2">
                  <p className="mb-0 text-2">
                    {new Intl.NumberFormat("vi-VI", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price)}
                  </p>
                </div>
                <div
                  className="col-md-2 col-lg-2 col-xl-2 d-flex input-group d-flex input-btn position-relative justify-content-center"
                  style={{ width: 100 / 6 + "%", right: "unset" }}
                >
                  <button
                    disabled={isLoading}
                    className="btn px-2 minus border-0 shadow-none"
                    onClick={() => {
                      if (item.quantity == 1) return;
                      setIsLoading(true);
                      console.log("isLoading ", isLoading);
                      ctx
                        .onAddToCart({
                          productId: item._id,
                          quantity: -1,
                        })
                        .then((r) => {
                          if (r) {
                            setIsLoading(false);
                            console.log("isLoading ", isLoading);
                          }
                        });
                    }}
                  >
                    <i className="fas fa-caret-left text-hover"></i>
                  </button>
                  <div className="input-number">
                    <input
                      disabled
                      ref={quantityInputEl}
                      style={{ padding: "6px 0", background: "none" }}
                      type="text"
                      className="form-control rounded-0 px-0 text-center border-0 outline-0 shadow-none"
                      id="quantity"
                      value={item.quantity}
                      onChange={(event) => {
                        event.preventDefault();
                      }}
                    />
                  </div>
                  <button
                    disabled={isLoading}
                    className="btn px-2 plus border-0 shadow-none"
                    onClick={() => {
                      setIsLoading(true);
                      console.log("isLoading ", isLoading);
                      ctx
                        .onAddToCart({
                          productId: item._id,
                          quantity: 1,
                        })
                        .then((r) => {
                          if (r) {
                            setIsLoading(false);
                            console.log("isLoading ", isLoading);
                          }
                        });
                    }}
                  >
                    <i className="fas fa-caret-right text-hover"></i>
                  </button>
                </div>
                <div className="col-md-2 col-lg-2 col-xl-2">
                  <p className="mb-0 text-2">
                    {new Intl.NumberFormat("vi-VI", {
                      style: "currency",
                      currency: "VND",
                    }).format(+item.price * item.quantity)}
                  </p>
                </div>
                <div className="col-md-2 col-lg-2 col-xl-2">
                  <i
                    className="fas fa-trash text-hover text-muted"
                    onClick={() =>
                      ctx.onRemoveCart(item._id).then((r) => {
                        if (r) toast.success("Removed product successfully.");
                      })
                    }
                  ></i>
                </div>
              </div>
            ))}

            <div className="p-4 d-flex justify-content-between bg-light">
              <button
                className="btn btn-light fst-italic"
                onClick={clickShopLinkHandler}
              >
                <i className="fas fa-long-arrow-alt-left me-2"></i>
                <span className="text-muted">Continue shopping</span>
              </button>
              <button
                className="btn btn-light border-dark fst-italic"
                onClick={clickCheckoutLinkHandler}
              >
                <span className="text-muted">Proceed to checkout</span>
                <i className="fas fa-long-arrow-alt-right ms-2"></i>
              </button>
            </div>
          </div>

          {/* Cart Total */}
          <div className="col-4 bg-white">
            <div className="p-5 bg-light">
              <h4 className="fw-bolder mb-5 mt-2 pt-1 text-uppercase">
                Cart Total
              </h4>

              <div className="d-flex justify-content-between mb-0 text-muted">
                <h6 className="text-uppercase mb-0">SubTotal</h6>
                <p className="text-1 text-muted mb-0">
                  {new Intl.NumberFormat("vi-VI", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    ctx?.carts?.reduce((a, b) => a + +b.price * b.quantity, 0)
                  )}
                </p>
              </div>

              <hr className="mt-2 mb-3" />

              <div className="d-flex justify-content-between mb-5 text-muted">
                <h6 className="text-uppercase">Total</h6>
                <p className="text-h2">
                  {new Intl.NumberFormat("vi-VI", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    ctx?.carts?.reduce((a, b) => a + +b.price * b.quantity, 0)
                  )}
                </p>
              </div>

              <input
                type="text"
                className="w-100 border text-2 fst-normal p-2"
                placeholder="Enter your coupon"
              />
              <button
                type="button"
                className="btn btn-dark btn-block fw-light text-light w-100"
                data-mdb-ripple-color="dark"
              >
                <i className="fa fa-gift me-1"></i> Apply coupon
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
