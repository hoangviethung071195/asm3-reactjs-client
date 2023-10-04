import s from './home.module.scss';
import { ProductModel } from 'models/Product.model';
import queryString from 'query-string';
import { PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRelativeImageSrc } from 'utils/helpers/file';
import List from "../../components/product/list/List";
import { getProducts } from "../../service/products.service";
import { CATEGORIES } from '../../utils/constant/Category';
import { scrollToTop } from '../../utils/helpers/browser';
import LoadingOverlay from 'layout/loading-overlay/LoadingOverlay';

function Home(props: PropsWithChildren) {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then(r => {
      setProducts(r.list);
      setLoading(false);
    });
  }, []);

  function navigateToShop(category: string) {
    return () => {
      const urlPath = queryString.stringifyUrl({
        url: '/shop',
        query: {
          category
        }
      });

      navigate(urlPath);
      scrollToTop();
    };
  }
  return (
    <LoadingOverlay
      loading={loading}
    >
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
      {/* Banner */}
      <div
        id="template-mo-zay-hero-carousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner banner">
          <div className="carousel-item active">
            <div className="container">
              <div className={"row p-5 " + s["banner__inner"]}>
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last"></div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left align-self-center">
                    <p className="text-2 text-uppercase">New inspiration</p>
                    <h3 className="text-h1 text-uppercase">
                      20% off on new <br /> season
                    </h3>
                    <button className="btn btn-dark text-2" onClick={() => navigate('/shop')}>
                      Browse collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category */}
      <section className="container py-5">
        <div className="row text-center pt-3">
          <div className="col-lg-6 m-auto">
            <p className="text-2 text-uppercase mb-0">
              Carefully created collection
            </p>
            <p className="text-h2 text-uppercase">Browse our categories</p>
          </div>
        </div>
        <div className="row">
          {
            CATEGORIES.filter((_, i) => i < 5).map((c, i) => {
              const className = i < 2 ? 'col-md-6' : 'col-md-4';

              return (
                <a
                  key={c.value}
                  onClick={navigateToShop(c.value)}
                  className={"col-12 p-3 hover-effect-overlay " + className}
                >
                  <img src={getRelativeImageSrc(`product_${i + 1}.png`)} />
                </a>
              );
            })
          }
        </div>
      </section>
      {/* End Categories */}

      {/* Start TOP TRENDING PRODUCTS */}
      <section className="container pb-5">
        <div className="row text-center pb-3">
          <div className="col-lg-6 m-auto">
            <p className="text-2 text-uppercase mb-0">Made the hard way</p>
            <p className="text-h2 text-uppercase">Top trending products</p>
          </div>
        </div>
        <div className="row">
          <List products={products}></List>
        </div>
      </section>
      {/* End TOP TRENDING PRODUCTS */}

      {/* start Service */}
      <section className="bg-light container py-5 text-center">
        <div className="row py-3">
          <div className="col-12 col-md-4">
            <p className="text-h2 text-uppercase">Free shipping</p>
            <p className="text-2">Free shipping worldwide</p>
          </div>
          <div className="col-12 col-md-4">
            <p className="text-h2 text-uppercase">24 x 7 service</p>
            <p className="text-2">Free shipping worldwide</p>
          </div>
          <div className="col-12 col-md-4">
            <p className="text-h2 text-uppercase">Festival offer</p>
            <p className="text-2">Free shipping worldwide</p>
          </div>
        </div>
      </section>
      {/* end Service */}

      {/* Register */}
      <section className="container py-5">
        <div className="row py-3">
          <div className="col-12 col-md-6 py-2">
            <p className="text-h2 text-uppercase">Let's be friends!</p>
            <p className="text-2">Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className="col-12 col-md-6 py-2">
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                id="subscribeEmail"
                placeholder="Enter your email address"
              />
              <button className="btn btn-dark">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </LoadingOverlay>
  );
}

export default Home;
