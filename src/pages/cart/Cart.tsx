import ImageLoader from 'components/image-loader/ImageLoader';
import { PropsWithChildren, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../store/context/AuthContext";
import { getVNDUnit } from '../../utils/helpers/order';
import s from './cart.module.scss';
import { CartModel } from 'models/Cart.model';
import LoadingOverlay from 'layout/loading-overlay/LoadingOverlay';
import { useUpdateEffect } from 'usehooks-ts';
import { cloneDeep } from 'lodash';
import NumberInput from 'components/form/number-input/number-input';

function Cart(props: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const { carts: originCarts, onAddToCart, onRemoveCart } = useContext(AuthContext);
  const [carts, setCarts] = useState(cloneDeep(originCarts));
  const navigate = useNavigate();

  useUpdateEffect(() => {
    setCarts(originCarts);
  }, [originCarts]);

  function checkoutHandler() {
    setLoading(true);
    carts.forEach(c => c.productId = c.product._id);
    onAddToCart(carts)
      .then(r => {
        if (r) {
          navigate("/checkout");
        }
        setLoading(false);
      });

  }

  // chuyển đến trang cửa hàng
  function clickShopLinkHandler() {
    navigate("/shop");
  }

  // chuyển đến trang chi tiết
  function clickDetailLinkHandler(id: string = '') {
    if (!id) return;
    navigate("/detail/" + id);
  }

  function changeQuantityHandler(item: CartModel, diffirence: number) {
    setCarts(prevCarts => {
      const newCarts = cloneDeep(prevCarts);
      const newItem = newCarts.find(c => c.product._id === item.product._id);
      if (newItem)
        newItem.quantity += diffirence;
      return newCarts;
    });
  }

  function removeCart(item: CartModel) {
    if (!item.product._id) return;
    setLoading(true);
    onRemoveCart(item.product._id).then((r) => {
      if (r) toast.success("Removed product successfully.");
      setLoading(false);
    });
  }

  return (
    <LoadingOverlay
      loading={loading}
    >
      <div className="bg-light py-5">
        <div className="container d-flex justify-content-between">
          <h1 className="fw-bolder text-black my-4 fst-italic">CART</h1>
          <p className="text-1 text-muted my-4 pt-2">CART</p>
        </div>
      </div>

      <section className="container py-5 fst-italic main-content">
        <h5 className="fw-bolder text-black mb-4">Shopping Cart</h5>
        <div className="row g-0">
          <div className="text-center col-lg-8 col-12 pe-lg-5 pe-0">

            <div className="table-responsive pt-5 pb-5 fst-italic">
              <table className="table">
                <thead className="">
                  <tr className="text-center">
                    <th className="col-2 text-1 text-uppercase bg-light border-0">
                      Image
                    </th>
                    <th className="col-2 text-1 text-uppercase bg-light border-0">
                      Product
                    </th>
                    <th className="col-2 text-1 text-uppercase bg-light border-0">
                      Price
                    </th>
                    <th className="col-2 text-1 text-uppercase bg-light border-0">
                      Quantity
                    </th>
                    <th className="col-2 text-1 text-uppercase bg-light border-0">
                      Total
                    </th>
                    <th className="col-2 text-1 text-uppercase bg-light border-0">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    carts?.map((item) => (
                      <tr className="text-center" key={item.product._id}>
                        <td className='ps-0'>
                          <ImageLoader fileId={item.product.fileIds?.[0]} fileIds={item.product.fileIds} />
                        </td>
                        <td style={{ minWidth: '120px' }}>
                          <div onClick={() => clickDetailLinkHandler(item.product._id)}>
                            <h6 className="text-black mb-0 hover-effect-overlay">
                              {item.product.title}
                            </h6>
                          </div>
                        </td>
                        <td>
                          <p className="mb-0 text-2">
                            {getVNDUnit(item.product.price)}
                          </p>
                        </td>
                        <td className='pt-0' style={{ minWidth: '110px' }}>
                          <div className="col-2 d-flex input-group d-flex input-btn position-relative justify-content-center end-0">
                            <button
                              disabled={item.quantity <= 1}
                              className="btn px-2 border-0 shadow-none"
                              onClick={() => changeQuantityHandler(item, -1)}
                            >
                              <i className="fas fa-caret-left text-hover"></i>
                            </button>
                            <div className={s["input-number"] + " input-number"}>
                              <NumberInput onChange={(quantity) => changeQuantityHandler(item, quantity - item.quantity)} value={item.quantity} />
                            </div>
                            <button
                              className="btn px-2 plus border-0 shadow-none"
                              onClick={() => changeQuantityHandler(item, 1)}
                            >
                              <i className="fas fa-caret-right text-hover"></i>
                            </button>
                          </div>
                        </td>
                        <td>
                          <p className="mb-0 text-2">
                            {getVNDUnit(+item.product.price * item.quantity)}
                          </p>
                        </td>
                        <td>
                          <i
                            className="fas fa-trash text-hover text-muted"
                            onClick={() => removeCart(item)}
                          ></i>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>

            <div className="col-12 p-4 bg-light mb-5">
              <div className='row'>
                <div className='col-12 col-sm-6'>
                  <button
                    className="btn btn-light fst-italic"
                    onClick={clickShopLinkHandler}
                  >
                    <i className="fas fa-long-arrow-alt-left me-2"></i>
                    <span className="text-muted">Continue shopping</span>
                  </button>
                </div>
                <div className='col-12 col-sm-6'>
                  <button
                    className="btn btn-light border-dark fst-italic"
                    onClick={checkoutHandler}
                  >
                    <span className="text-muted">Proceed to checkout</span>
                    <i className="fas fa-long-arrow-alt-right ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Total */}
          <div className="col-lg-4 col-12 bg-white">
            <div className="p-5 bg-light">
              <h4 className="fw-bolder mb-5 mt-2 pt-1 text-uppercase">
                Cart Total
              </h4>

              <div className="d-flex justify-content-between mb-0 text-muted">
                <h6 className="text-uppercase mb-0">SubTotal</h6>
                <p className="text-1 text-muted mb-0">
                  {getVNDUnit(carts?.reduce((a, b) => a + +b.product.price * b.quantity, 0) || 0)}
                </p>
              </div>

              <hr className="mt-2 mb-3" />

              <div className="d-flex justify-content-between mb-5 text-muted">
                <h6 className="text-uppercase">Total</h6>
                <p className="text-h2">
                  {getVNDUnit(carts?.reduce((a, b) => a + +b.product.price * b.quantity, 0) || 0)}
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
    </LoadingOverlay>
  );
}

export default Cart;
