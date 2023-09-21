import React, { useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../../store/popup";
import { useNavigate } from "react-router-dom";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    margin: "unset",
    animation: "unset",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
    width: "800px",
  },
};

function PopupDetail(props) {
  useEffect(() => {}, [props]);

  const { isShowPopup, product } = useSelector((state) => state.popup);

  const dispatch = useDispatch();
  function hidePopup() {
    dispatch(counterActions.HIDE_POPUP());
  }

  const navigate = useNavigate();
  function navigateToDetail(i) {
    hidePopup();
    navigate("/detail/" + product._id);
  }

  return (
    <>
      <Modal isOpen={isShowPopup} style={customStyles} closeTimeoutMS={200}>
        <div className="out">
          <i
            className="fa fa-times position-absolute hover-effect-overlay"
            onClick={hidePopup}
            style={{ right: "20px", top: "20px", zIndex: 1 }}
          ></i>

          <section className="fst-italic">
            <div className="row">
              <div className="col-lg-6 d-flex p-4 pe-0">
                <img
                  className="card-img img-fluid w-80"
                  src={product.imageUrl1}
                  alt="Card image cap"
                  id="product-detail"
                />
              </div>
              <div className="col-lg-6 p-5">
                <div className="card-body">
                  <h4>{product.title}</h4>
                  <p className="text-1 text-muted py-2">
                    {new Intl.NumberFormat("vi-VI", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.price)}
                  </p>
                  <p className="text-2">
                    {product.short_desc?.split(" ").length > 90
                      ? product.short_desc?.split(" ").slice(0, 90).join(" ") + " ..."
                      : product.short_desc}
                  </p>
                  <button
                    className="btn btn-dark mt-3 text-2 text-light"
                    onClick={navigateToDetail}
                  >
                    <i className="fa fa-cart-shopping"></i> View Detail
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Modal>
    </>
  );
}

export default PopupDetail;
