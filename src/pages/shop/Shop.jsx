import { useEffect, useState } from "react";
import List from "../../components/product/list/List";
import { getProducts } from "../../service/products.service";

function Shop(props) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setProducts([]);
    (async () => {
      // gọi api lấy danh sách sản phẩm
      const prods = (await getProducts()).products.filter((p) =>
        category ? p.category === category : p
      );
      // số sản phẩm hiển thị
      setTotal(prods?.length || 0);
      setProducts(prods);
    })();
  }, [category]);

  function fitlerCategories(cate) {
    setCategory(cate);
  }
  return (
    <>
      <div className="bg-light py-5">
        <div className="container d-flex justify-content-between">
          <h1 className="fw-bolder text-black my-4 fst-italic">SHOP</h1>
          <p className="text-1 text-muted my-4 pt-3">SHOP</p>
        </div>
      </div>

      {/* Start Content */}
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3">
            <h4 className="fst-italic text-muted mb-3">Categories</h4>
            <ul className="list-unstyled templatemo-accordion">
              <li className="pb-3">
                <a className="collapsed bg-dark py-2 px-4 text-1 text-light text-uppercase d-flex justify-content-between h3 text-decoration-none">
                  APPLE
                </a>
                <ul className="collapse show list-unstyled pl-3">
                  <li>
                    <a
                      className="text-decoration-none text-1 text-muted px-4 text-hover"
                      onClick={() => fitlerCategories()}
                    >
                      All
                    </a>
                  </li>
                </ul>
              </li>
              <li className="pb-3">
                <a className="collapsed bg-grey py-2 px-4 text-1 text-uppercase d-flex justify-content-between h3 text-decoration-none">
                  iphone & mac
                </a>
                <ul className="collapse show list-unstyled pl-3">
                  <li>
                    <a
                      className="text-decoration-none text-1 text-muted px-4 text-hover"
                      onClick={() => fitlerCategories("iphone")}
                    >
                      Iphone
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-decoration-none text-1 text-muted px-4 text-hover"
                      onClick={() => fitlerCategories("ipad")}
                    >
                      Ipad
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-decoration-none text-1 text-muted px-4 text-hover"
                      onClick={() => fitlerCategories("macbook")}
                    >
                      Macbook
                    </a>
                  </li>
                </ul>
              </li>
              <li className="pb-3">
                <a className="collapsed bg-grey py-2 px-4 text-1 text-uppercase d-flex justify-content-between h3 text-decoration-none">
                  Wireless
                </a>
                <ul
                  id="collapseTwo"
                  className="collapse show list-unstyled pl-3"
                >
                  <li>
                    <a
                      className="text-decoration-none text-1 text-muted px-4 text-hover"
                      onClick={() => fitlerCategories("airpod")}
                    >
                      Airpod
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-decoration-none text-1 text-muted px-4 text-hover"
                      onClick={() => fitlerCategories("watch")}
                    >
                      Watch
                    </a>
                  </li>
                </ul>
              </li>
              <li className="pb-3">
                <a
                  className="collapsed bg-grey py-2 px-4 text-1 text-uppercase d-flex justify-content-between h3 text-decoration-none"
                  onClick={() => fitlerCategories("macbook")}
                >
                  other
                </a>
                <ul
                  id="collapseThree"
                  className="collapse show list-unstyled pl-3"
                >
                  <li>
                    <a
                      className="text-decoration-none text-1 text-muted px-4 text-hover"
                      onClick={() => fitlerCategories("Mouse")}
                    >
                      Mouse
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-decoration-none text-1 text-muted px-4 text-hover"
                      onClick={() => fitlerCategories("Keyboard")}
                    >
                      Keyboard
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-decoration-none text-1 text-muted px-4 text-hover"
                      onClick={() => fitlerCategories("Other")}
                    >
                      Other
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="col-lg-9">
            <div className="row">
              <div className="col-md-4 pb-4">
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control text-2 py-2"
                    id="okok"
                    placeholder="Enter Search Here!"
                  />
                </div>
              </div>
              <div className="col-md-5 pb-4"></div>
              <div className="col-md-3 pb-4">
                <div className="d-flex">
                  <select className="form-control">
                    <option>Default sorting</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <List
                items={products}
                isNavigateToDetailPage
                className="col-md-4"
              ></List>
            </div>
            <div div="row">
              <ul className="pagination pagination-sm justify-content-end mb-2">
                <li className="page-item disabled">
                  <a
                    className="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0"
                    tabIndex="-1"
                  >
                    <i
                      style={{ fontSize: "10px" }}
                      className="fa-solid fa-angles-left"
                    ></i>
                  </a>
                </li>
                <li className="page-item">
                  <a
                    style={{ padding: "4px 10px" }}
                    className="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark bg-dark text-white"
                  >
                    <span style={{ fontSize: "15px" }}>1</span>
                  </a>
                </li>
                <li className="page-item disabled">
                  <a className="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark">
                    <i
                      style={{ fontSize: "10px" }}
                      className="fa-solid fa-angles-right"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>

            <p className="text-end text-2">
              {total ? "showing 1 -" : ""} {total ? total + " of" : ""} {total}{" "}
              results
            </p>
          </div>
        </div>
      </div>
      {/* End Content */}
    </>
  );
}

export default Shop;
