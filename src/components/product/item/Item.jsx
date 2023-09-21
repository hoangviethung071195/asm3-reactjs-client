import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { counterActions } from "../../../store/popup";

function Item(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function showDetailProduct(id) {
    if (props.isNavigateToDetailPage) {
      // chuyển đến trang chi tiết sản phẩm
      window.scrollTo(0, 0);
      navigate("/detail/" + id);
    } else {
      // hiện popup chi tiết sản phẩm
      dispatch(counterActions.SHOW_POPUP(props.item));
    }
  }

  return (
    <div className="initial-effect">
      <a
        onClick={() => showDetailProduct(props.item._id)}
        className="d-block hover-effect-overlay"
      >
        <img src={props.item.imageUrl1} className="card-img-top" alt="" />
      </a>
      <div className="card-body text-center">
        <a onClick={() => showDetailProduct(props.item._id)}>
          <p className="text-1 mt-3 mb-1 hover-effect-overlay">
            {props.item.title}
          </p>
        </a>
        <p className="text-muted text-price text-center">
          {new Intl.NumberFormat("vi-VI", {
            style: "currency",
            currency: "VND",
          }).format(props.item.price)}
        </p>
      </div>
    </div>
  );
}

export default Item;
