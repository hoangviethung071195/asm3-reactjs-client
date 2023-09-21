import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import List from "../../components/product/list/List";
import { getProducts } from "../../service/products.service";
import AuthContext from "../../store/auth-context";

function Detail(props) {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    // gọi api lấy danh sách sản phẩm
    (async () => {
      const prods = (await getProducts()).products;
      console.log("prods ", prods);
      setProducts(prods);
      setProduct(prods.find((p) => p._id === id));
    })();
    window.scrollTo(0, 0);
  }, [id]);

  // sử dụng hook useContext để gọi hàm thêm sản phẩm vào giỏ hàng
  const ctx = useContext(AuthContext);
  function addToCart() {
    const productId = product._id;
    const quantity = +quantityInputEl.current.value;
    console.log('quantity ', quantity);
    ctx.onAddToCart({ productId, quantity })
      .then(r => {
        if (r) {
          navigate('/cart')
        }
      });
  }

  const quantityInputEl = useRef();
  return (
    <>
      <div className="bg-light py-5">
        <div className="container d-flex justify-content-between text-uppercase">
          <h1 className="fw-bolder text-black my-4 fst-italic">
            {product.category}
          </h1>
          <p className="text-1 text-muted my-4 pt-3">{product.category}</p>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade bg-white"
        id="templatemo_search"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="w-100 pt-1 mb-5 text-right">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form
            action=""
            method="get"
            className="modal-content modal-body border-0 p-0"
          >
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                id="inputModalSearch"
                name="q"
                placeholder="Search ..."
              />
              <button
                type="submit"
                className="input-group-text bg-success text-light"
              >
                <i className="fa fa-fw fa-search text-white"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <!-- Open Content --> */}
      {product._id && (
        <section className=" fst-italic">
          <div className="container pb-5">
            <div className="row pb-5">
              <div className="col-lg-5 mt-5 d-flex">
                <div className="d-flex flex-column" style={{ width: "20%" }}>
                  <img
                    className="card-img img-fluid"
                    src={product.imageUrl1}
                    alt="Card image cap"
                    id="product-detail"
                  />
                  <img
                    className="card-img img-fluid"
                    src={product.imageUrl2}
                    alt="Card image cap"
                    id="product-detail"
                  />
                  <img
                    className="card-img img-fluid"
                    src={product.imageUrl3}
                    alt="Card image cap"
                    id="product-detail"
                  />
                  <img
                    className="card-img img-fluid"
                    src={product.imageUrl4}
                    alt="Card image cap"
                    id="product-detail"
                  />
                </div>
                <img
                  style={{ width: "80%" }}
                  className="card-img img-fluid w-80"
                  src={product.imageUrl1}
                  alt="Card image cap"
                  id="product-detail"
                />
              </div>
              {/* <!-- col end --> */}
              <div className="col-lg-7 mt-5">
                <div className="card-body">
                  <h1 className="h2">{product.title}</h1>
                  <p className="text-1 text-muted py-3">
                    {new Intl.NumberFormat("vi-VI", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.price)}
                  </p>
                  <p className="text-2">{product.short_desc}</p>
                  <p className="my-3">
                    <span className="text-1 my-2">Category:</span>
                    <span className="text-2"> watchs</span>
                  </p>
                  <div className="position-relative w-70 form-detail border">
                    <p className="bg-white w-100 py-2 ps-4 text-2">QUANTITY </p>
                    <div className="input-group mb-2 w-50 d-flex input-btn">
                      <button
                        className="btn px-2 minus border-0 shadow-none"
                        onClick={() =>
                          quantityInputEl.current.value > 1
                            ? quantityInputEl.current.value--
                            : null
                        }
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
                          defaultValue={1}
                          onChange={(event) => {
                            event.preventDefault();
                          }}
                        />
                      </div>
                      <button
                        className="btn px-2 plus border-0 shadow-none"
                        onClick={() => quantityInputEl.current.value++}
                      >
                        <i className="fas fa-caret-right text-hover"></i>
                      </button>
                    </div>
                    <button
                      className="btn btn-dark btn-special"
                      onClick={addToCart}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-7">
                <button className="btn btn-dark btn-special">
                  DESCRIPTION
                </button>
                <p className="text-h2 py-4">PRODUCT DESCIPTION</p>
                <p className="text-2" style={{ whiteSpace: "pre-line" }}>
                  {product.long_desc}
                </p>
              </div>
            </div>

            <div className="row mt-4">
              <p className="text-h2 py-4 text-uppercase">Related Products</p>
              <List
                items={products.filter(
                  (p) =>
                    p.category === product.category && p._id !== product._id
                )}
                isNavigateToDetailPage
              ></List>
            </div>
          </div>
        </section>
      )}
      {/* <!-- Close Content --> */}
    </>
  );
}

export default Detail;
