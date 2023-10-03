import { PropsWithChildren, useEffect, useRef } from "react";
import Modal, { Styles } from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useOnClickOutside } from 'usehooks-ts';
import { ConfigureStoreModel } from '../../../store/redux';
import { getFileUrl } from '../../../utils/helpers/file';
import { getVNDUnit } from '../../../utils/helpers/order';
import { PopupSliceModel, counterActions } from 'store/redux/popup';
import s from "./product-info.module.scss";

const modalStyles: Styles = {
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
    width: "auto",
    maxWidth: "800px",
  },
};

Modal.setAppElement('#root');

export default function ProductInfo(props: PropsWithChildren) {
  useEffect(() => { }, [props]);
  const { isShowPopup, product } = useSelector<ConfigureStoreModel, PopupSliceModel>((state) => state.popup);

  const dispatch = useDispatch();
  function hidePopup() {
    dispatch(counterActions.HIDE_POPUP());
  }

  const navigate = useNavigate();
  function navigateToDetail() {
    hidePopup();
    navigate("/detail/" + product._id);
  }

  const innerModalRef = useRef(null);
  useOnClickOutside(innerModalRef, hidePopup);

  return (
    <Modal isOpen={isShowPopup} style={modalStyles} closeTimeoutMS={200}>
      <div ref={innerModalRef} className="out">
        <i
          className={s["close-icon"] + " fa fa-times position-absolute close-icon"}
          onClick={hidePopup}
        ></i>

        <section className="fst-italic">
          <div className="row">
            <a className="col-12 col-sm-6 d-flex p-4 pe-sm-0 pe-4">
              <div className='p-4'>
                <img src={getFileUrl(product.fileIds?.[0])} alt="" className='card-img img-fluid' onClick={navigateToDetail} />
              </div>
            </a>
            <div className="col-12 col-sm-6 p-5">
              <div className="card-body">
                <h4>{product.title}</h4>
                <p className="text-1 text-muted py-2">
                  {getVNDUnit(product.price)}
                </p>
                <p className="text-2">
                  {product.description?.split(" ").length > 90
                    ? product.description?.split(" ").slice(0, 90).join(" ") + " ..."
                    : product.description}
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
  );
}
