import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Checkout(props) {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const formEl = useRef();
  function isValidInfo() {
    if (!ctx.carts?.length) {
      toast.warn("Cart is empty");
      return false;
    }
    console.log(formEl);
    for (let i = 0; i < formEl.current.length; i++) {
      const el = formEl.current[i];
      if (el.name && !el.value) {
        toast.warn("Please enter " + el.name);
        return false;
      }
    }
    console.log("formEl.current.email ", formEl.current.email);
    if (!validateEmail(formEl.current.email.value)) {
      toast.warn("Email is not valid.");
      return false;
    }

    return true;
  }

  function checkoutHandler() {
    if (!isValidInfo()) return;
    const { fullName, phone, address, email } = formEl.current;
    ctx
      .onAddOrder({
        fullName: fullName.value,
        phone: phone.value,
        address: address.value,
        email: email.value,
      })
      .then((orderId) => {
        console.log("orderId ", orderId);
        if (orderId) {
          toast.success("Added order successfully!");
          navigate("/orders/" + orderId);
        }
      });
  }

  const PhoneInputEl = useRef();
  // hàm sử lý thông tin nhập vào của trường số điện thoại, chỉ chấp nhận chữ số
  function changePhoneHandler(event) {
    const result = event.target.value.replace(/\D/g, "");
    PhoneInputEl.current.value = result;
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <>
      <div className="bg-light py-5">
        <div className="container d-flex justify-content-between">
          <h1 className="fw-bolder text-black my-4 fst-italic">CHECKOUT</h1>
          <p className="text-1 my-4 pt-3">
            HOME / CART / <span className="text-muted">CHECKOUT</span>
          </p>
        </div>
      </div>

      <section className="container py-5 h-100 fst-italic">
        <h5 className="fw-bolder text-black mb-4">BILLING DETAILS</h5>
        <div className="row g-0">
          <form className="p-5 ps-0 pt-0 col-8" ref={formEl}>
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
                ref={PhoneInputEl}
                onChange={changePhoneHandler}
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
          <div className="col-4 bg-white">
            <div className="p-5 bg-light">
              <h4 className="fw-bolder mb-5 mt-2 pt-1 text-uppercase">
                YOUR ORDER
              </h4>

              {ctx?.carts?.map((item, i) => (
                <div key={i}>
                  <div className="d-flex justify-content-between mb-0 text-muted">
                    <h6 className="mb-0 w-50 text-2 text-dark">{item.title}</h6>
                    <p className="mb-0 text-2">
                      {new Intl.NumberFormat("vi-VI", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.price)}
                    </p>
                    <p className="text-1 text-muted mb-0 text-2">
                      {" "}
                      x {item.quantity}
                    </p>
                  </div>
                  <hr
                    className="my-3"
                    style={{
                      height: "0.5px",
                    }}
                  />
                </div>
              ))}

              <div className="d-flex justify-content-between text-muted">
                <p className="text-h2 mb-5">TOTAL</p>
                <p className="text-h2 mb-5">
                  {new Intl.NumberFormat("vi-VI", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    ctx?.carts?.reduce((a, b) => a + +b.price * b.quantity, 0)
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;
