import Pagination from 'components/Pagination/Pagination';
import SearchInput from 'components/form/search/search-input';
import SelectInput from 'components/form/select/select-input';
import { PropsWithChildren, useEffect, useReducer, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { useDebounce, useUpdateEffect } from 'usehooks-ts';
import { listProductFieldSorting } from 'utils/constant/Product';
import { getValuableFieldsObj } from 'utils/helpers/object';
import List from "../../components/product/list/List";
import { getProducts } from "../../service/products.service";
import { initialPagingData } from '../../utils/constant/models/pagination';
import { PagingData } from 'models/Pagination.model';
import { ProductModel } from 'models/Product.model';
import LoadingOverlay from 'layout/loading-overlay/LoadingOverlay';
import { DEFAULT_PAGINATION } from 'utils/constant/Pagination';

type productQueryParam = {
  page?: number;
  keyword?: string;
  sortBy?: string;
  category?: string;
  [fieldName: string]: string | number | undefined;
};

function Shop(props: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const [productsPaging, setProductsPaging] = useState<PagingData<ProductModel>>(initialPagingData);
  const [urlSearchParams, setURLSearchParams] = useSearchParams();
  const query: productQueryParam = {
    page: +(urlSearchParams.get('page') || DEFAULT_PAGINATION.page),
    keyword: urlSearchParams.get('keyword') || '',
    category: urlSearchParams.get('category') || '',
    sortBy: urlSearchParams.get('sortBy') || ''
  };
  const [filter, dispatchFilter] = useReducer((prevState: productQueryParam, filter: productQueryParam) => {
    const isAnyChanged = Object.keys(filter).some(fieldName => filter[fieldName] !== prevState[fieldName]);
    if (isAnyChanged) {
      return {
        ...prevState,
        ...filter,
        page: filter.page || DEFAULT_PAGINATION.page
      };
    }
    return prevState;
  }, query);
  const { page, category, keyword, sortBy } = filter;
  const deboucedKeyword = useDebounce(keyword, 1000);
  const limit = 8;

  useEffect(() => {
    searchProducts(query);
  }, []);

  useUpdateEffect(() => {
    const query: productQueryParam = {
      page,
      keyword,
      category,
      sortBy,
    };
    searchProducts(query);
  }, [page, deboucedKeyword, category, sortBy]);

  function searchProducts(query: productQueryParam) {
    setLoading(true);
    const sort = 'asc';
    setURLSearchParams(getValuableFieldsObj(query));
    const { page, keyword, category, sortBy } = query;
    getProducts(page, limit, keyword, category, sort, sortBy)
      .then(r => {
        setProductsPaging(r);
        setLoading(false);
      });
  }

  return (
    <LoadingOverlay
      loading={loading}
    >
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
                <p className="collapsed bg-dark py-2 px-4 text-1 text-light text-uppercase d-flex justify-content-between h3 text-decoration-none">
                  APPLE
                </p>
                <ul className="collapse show list-unstyled pl-3">
                  <li>
                    <p
                      className={(!category ? 'text-active ' : '') + "text-decoration-none text-1 text-muted px-4 text-hover"}
                      onClick={() => dispatchFilter({ category: '' })}
                    >
                      All
                    </p>
                  </li>
                </ul>
              </li>
              <li className="pb-3">
                <p className="collapsed bg-grey py-2 px-4 text-1 text-uppercase d-flex justify-content-between h3 text-decoration-none">
                  iphone & mac
                </p>
                <ul className="collapse show list-unstyled pl-3">
                  <li>
                    <p
                      className={(category === 'iphone' ? 'text-active ' : '') + "text-decoration-none text-1 text-muted px-4 text-hover"}
                      onClick={() => dispatchFilter({ category: "iphone" })}
                    >
                      Iphone
                    </p>
                  </li>
                  <li>
                    <p
                      className={(category === 'ipad' ? 'text-active ' : '') + "text-decoration-none text-1 text-muted px-4 text-hover"}
                      onClick={() => dispatchFilter({ category: "ipad" })}
                    >
                      Ipad
                    </p>
                  </li>
                  <li>
                    <p
                      className={(category === 'macbook' ? 'text-active ' : '') + "text-decoration-none text-1 text-muted px-4 text-hover"}
                      onClick={() => dispatchFilter({ category: "macbook" })}
                    >
                      Macbook
                    </p>
                  </li>
                </ul>
              </li>
              <li className="pb-3">
                <p className="collapsed bg-grey py-2 px-4 text-1 text-uppercase d-flex justify-content-between h3 text-decoration-none">
                  Wireless
                </p>
                <ul
                  id="collapseTwo"
                  className="collapse show list-unstyled pl-3"
                >
                  <li>
                    <p
                      className={(category === 'airpod' ? 'text-active ' : '') + "text-decoration-none text-1 text-muted px-4 text-hover"}
                      onClick={() => dispatchFilter({ category: "airpod" })}
                    >
                      Airpod
                    </p>
                  </li>
                  <li>
                    <p
                      className={(category === 'watch' ? 'text-active ' : '') + "text-decoration-none text-1 text-muted px-4 text-hover"}
                      onClick={() => dispatchFilter({ category: "watch" })}
                    >
                      Watch
                    </p>
                  </li>
                </ul>
              </li>
              <li className="pb-3">
                <p
                  className="collapsed bg-grey py-2 px-4 text-1 text-uppercase d-flex justify-content-between h3 text-decoration-none">
                  other
                </p>
                <ul
                  id="collapseThree"
                  className="collapse show list-unstyled pl-3"
                >
                  <li>
                    <p
                      className={(category === 'mouse' ? 'text-active ' : '') + "text-decoration-none text-1 text-muted px-4 text-hover"}
                      onClick={() => dispatchFilter({ category: "mouse" })}
                    >
                      Mouse
                    </p>
                  </li>
                  <li>
                    <p
                      className={(category === 'keyboard' ? 'text-active ' : '') + "text-decoration-none text-1 text-muted px-4 text-hover"}
                      onClick={() => dispatchFilter({ category: "keyboard" })}
                    >
                      Keyboard
                    </p>
                  </li>
                  <li>
                    <p
                      className={(category === 'other' ? 'text-active ' : '') + "text-decoration-none text-1 text-muted px-4 text-hover"}
                      onClick={() => dispatchFilter({ category: "other" })}
                    >
                      Other
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="col-lg-9">
            <div className="row px-3">
              <div className="col-md-4 pb-lg-4 pb-3">
                <div className="d-flex">
                  <SearchInput keyword={keyword} onChange={keyword => dispatchFilter({ keyword })} />
                </div>
              </div>
              <div className="col-md-4 pb-lg-4 pb-3"></div>
              <div className="col-md-4 pb-lg-4 pb-3">
                <div className="d-flex">
                  <SelectInput onChange={(sortBy => dispatchFilter({ sortBy }))} items={listProductFieldSorting} />
                </div>
              </div>
            </div>
            <div className="row">
              <List
                products={productsPaging.list}
                isNavigateToDetailPage
              ></List>
            </div>
            {page && <Pagination onPagingChange={(paging) => dispatchFilter({ page: paging.page })} paging={{ page, total: productsPaging.total, limit }}></Pagination>}
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
}

export default Shop;
