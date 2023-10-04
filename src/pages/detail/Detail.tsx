import ImageLoader from 'components/image-loader/ImageLoader';
import { ProductModel } from 'models/Product.model';
import { PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import List from "../../components/product/list/List";
import { getProduct, getProducts } from "../../service/products.service";
import AuthContext from "../../store/context/AuthContext";
import { initialProduct } from '../../utils/constant/models/products';
import { getVNDUnit } from '../../utils/helpers/order';
import LoadingOverlay from 'layout/loading-overlay/LoadingOverlay';
import NumberInput from 'components/form/number-input/number-input';
import { cloneDeep } from 'lodash';

function Detail(props: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const { onAddToCart, carts: originCarts } = useContext(AuthContext);
  const carts = cloneDeep(originCarts);
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [product, setProduct] = useState<ProductModel>(initialProduct);
  const [quantity, setQuantity] = useState<number>(1);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProduct(id)
      .then(r => {
        setProduct(r);
        return r.category;
      })
      .then(async category => {
        const r = await getProducts(1, 4, undefined, category);
        setProducts(r.list);
        setLoading(false);
      });
  }, [id]);

  function addToCart() {
    setLoading(true);
    const productId = product._id;
    const cart = carts.find(c => c.product._id === productId);
    if (cart) {
      cart.quantity += quantity;
      cart.productId = productId;
    } else {
      carts.push({
        quantity,
        productId,
        product: initialProduct
      });
    }
    carts.forEach(c => {
      if (!c.productId) {
        c.productId = c.product._id;
      }
    });
    onAddToCart(carts)
      .then(r => {
        if (r) {
          navigate('/cart');
        }
        setLoading(false);
      });
  }

  function creaseQuantity() {
    setQuantity(quantity + 1);
  }

  function increaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <LoadingOverlay
      loading={loading}
    >
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
        tabIndex={-1}
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
            action=''
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
                <div className="d-flex flex-column w-20">
                  {
                    Array(4).fill(null).map((_, i) => {
                      const fileId = product.fileIds?.[i] || product.fileIds?.[0];
                      return (
                        <ImageLoader key={i} fileId={fileId} fileIds={product.fileIds} className='card-img img-fluid'></ImageLoader>
                      );
                    })
                  }
                </div>
                <ImageLoader fileId={product.fileIds?.[0]} fileIds={product.fileIds} className='card-img img-fluid' containerClassName='w-80'></ImageLoader>
              </div>
              {/* <!-- col end --> */}
              <div className="col-lg-7 mt-5">
                <div className="card-body">
                  <h1 className="h2">{product.title}</h1>
                  <p className="text-1 text-muted py-3">
                    {getVNDUnit(product.price)}
                  </p>
                  <p className="text-2">{product.description}</p>
                  <p className="my-3">
                    <span className="text-1 my-2">Category:</span>
                    <span className="text-2"> watchs</span>
                  </p>
                  <div className="position-relative w-70 form-detail border">
                    <p className="bg-white w-100 py-2 ps-4 text-2">QUANTITY </p>
                    <div className="input-group mb-2 w-50 d-flex input-btn">
                      <button
                        disabled={quantity <= 1}
                        className="btn px-2 border-0 shadow-none"
                        onClick={increaseQuantity}
                      >
                        <i className="fas fa-caret-left text-hover"></i>
                      </button>
                      <div className="input-number">
                        <NumberInput onChange={(quantity) => setQuantity(quantity)} value={quantity} />
                      </div>
                      <button
                        className="btn px-2 plus border-0 shadow-none"
                        onClick={creaseQuantity}
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
                <p className="text-2 pre-line">
                  {product.longDescription}
                </p>
              </div>
            </div>

            <div className="row mt-4">
              <p className="text-h2 py-4 text-uppercase">Related Products</p>
              <List
                products={products.filter((p) => p._id !== product._id)}
                isNavigateToDetailPage
              ></List>
            </div>
          </div>
        </section >
      )
      }
      {/* <!-- Close Content --> */}
    </LoadingOverlay>
  );
}

export default Detail;
