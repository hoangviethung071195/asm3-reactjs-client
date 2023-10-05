import { ChangeEvent, useContext, useRef, useState } from "react";
import AuthContext from "../../store/context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PropsWithChildren } from 'react';
import { getVNDUnit } from '../../utils/helpers/order';
import LoadingOverlay from 'layout/loading-overlay/LoadingOverlay';

export default function Checkout(props: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const formEl = useRef<HTMLFormElement>(null);
  function isValidInfo() {
    if (!ctx.carts?.length) {
      toast.warn("Cart is empty");
      return false;
    }
    if (!formEl.current) return;
    for (let i = 0; i < formEl.current.length; i++) {
      const el = formEl.current[i] as HTMLInputElement;
      if (el.name && !el.value) {
        toast.warn("Please enter " + el.name);
        return false;
      }
    }
    if (!validateEmail(formEl.current.email.value)) {
      toast.warn("Email is not valid.");
      return false;
    }

    return true;
  }

  function checkoutHandler() {
    if (!isValidInfo()) return;
    setLoading(true);
    const { fullName, phone, address, email } = formEl.current!;
    ctx.onAddOrder({
      userId: '',
      fullName: fullName.value,
      phone: phone.value,
      address: address.value,
      email: email.value
    })
      .then((orderId) => {
        console.log('orderId ', orderId);
        if (orderId) {
          toast.success("Added order successfully!");
          navigate("/order/" + orderId);
        }
        setLoading(false);
      });
  }

  const [phone, setPhone] = useState<number | undefined>(undefined);
  // hàm sử lý thông tin nhập vào của trường số điện thoại, chỉ chấp nhận chữ số
  function changePhoneHandler(event: ChangeEvent<HTMLInputElement>) {
    const phoneNumber = +event.target.value.replace(/\D/g, '');
    setPhone(phoneNumber);
  }

  const validateEmail = (email = '') => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <LoadingOverlay
      loading={loading}
    >
      <div className="bg-light py-5">
        <div className="container d-flex justify-content-between">
          <h1 className="fw-bolder text-black my-4 fst-italic">CHECKOUT</h1>
          <p className="text-1 my-4 pt-2">
            <span className="text-muted">CHECKOUT</span>
          </p>
        </div>
      </div>

      <section className="container py-5 fst-italic">
        <h5 className="fw-bolder text-black mb-4">BILLING DETAILS</h5>
        <div className="row g-0">
          <form className="pe-md-5 ps-0 pt-0 col-12 col-md-7" ref={formEl}>
            <div className="mb-3">
              <label htmlFor="1" className="text-2 fw-normal mb-2">
                FULL NAME:
              </label>
              <input
                name="fullName"
                type="text"
                className="w-100 border text-2 p-2 fst-normal"
                placeholder="Enter your fullname here!"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="2" className="text-2 fw-normal mb-2">
                EMAIL:
              </label>
              <input
                name="email"
                type="email"
                className="w-100 border text-2 p-2 fst-normal"
                placeholder="Enter your email here!"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="3" className="text-2 fw-normal mb-2">
                PHONE NUMBER:
              </label>
              <input
                onChange={changePhoneHandler}
                value={phone}
                name="phone"
                type="text"
                className="w-100 border text-2 p-2 fst-normal"
                placeholder="Enter your phone number here!"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="4" className="text-2 fw-normal mb-2">
                ADDRESS:
              </label>
              <input
                name="address"
                type="text"
                className="w-100 border text-2 p-2 fst-normal"
                placeholder="Enter your address here!"
              />
            </div>

            <button
              onClick={checkoutHandler}
              type="button"
              className="btn btn-dark btn-block fw-light text-1 text-light"
              data-mdb-ripple-color="dark"
            >
              Place order
            </button>
          </form>

          {/* Cart Total */}
          <div className=" col-12 pt-4 col-md-5 bg-white">
            <div className="p-5 bg-light">
              <h4 className="fw-bolder mb-5 mt-2 pt-1 text-uppercase">
                YOUR ORDER
              </h4>

              {ctx?.carts?.map((item, i) => (
                <div key={i}>
                  <div className="d-flex justify-content-between mb-0 text-muted">
                    <h6 className="mb-0 w-50 text-2 text-dark">{item.product.title}</h6>
                    <p className="mb-0 text-2">
                      {getVNDUnit(item.product.price)}
                    </p>
                    <p className="text-1 text-muted mb-0 text-2">
                      {" "}
                      x {item.quantity}
                    </p>
                  </div>
                  <hr className="my-3" />
                </div>
              ))}

              <div className="d-flex justify-content-between text-muted">
                <p className="text-h2 mb-5">TOTAL</p>
                <p className="text-h2 mb-5">
                  {getVNDUnit(ctx?.carts?.reduce((a, b) => a + +b.product.price * b.quantity, 0) || 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LoadingOverlay>
  );
}
