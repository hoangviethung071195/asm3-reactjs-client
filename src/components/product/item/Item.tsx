import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PropsWithChildren, } from 'react';
import { getFileUrl } from '../../../utils/helpers/file';
import { getVNDUnit } from '../../../utils/helpers/order';
import { scrollToTop } from '../../../utils/helpers/browser';
import { counterActions } from 'store/redux/popup';
import s from './item.module.scss';

function Item(props: PropsWithChildren<{
  product: ProductModel;
  isNavigateToDetailPage?: boolean;
}>) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function showDetailProduct(id = '') {
    if (!id) return;
    if (props.isNavigateToDetailPage) {
      scrollToTop();
      navigate("/detail/" + id);
    } else {
      dispatch(counterActions.SHOW_POPUP(props.product));
    }
  }

  return (
    <div className={s['item'] + " initial-effect"}>
      <a
        onClick={() => showDetailProduct(props.product._id)}
        className="d-block hover-effect-overlay"
      >
        <img src={getFileUrl(props.product.fileIds?.[0])} className="card-img-top" alt='' />
      </a>
      <div className="card-body text-center">
        <a onClick={() => showDetailProduct(props.product._id)}>
          <p className="text-1 mt-3 mb-1">
            {props.product.title}
          </p>
        </a>
        <p className="text-muted text-price text-center">
          {getVNDUnit(props.product.price)}
        </p>
      </div>
    </div>
  );
}

export default Item;
