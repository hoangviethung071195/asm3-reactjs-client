import queryString from 'query-string';
import { PLURAL, PRODUCT_PATH } from '../utils/constant/ApiPath';
import { DEFAULT_PAGINATION } from '../utils/constant/Pagination';
import { RequestMethod } from '../utils/constant/RequestMethod';
import { requestJson } from '../utils/helpers/api';
import { getValuableFieldsObj } from 'utils/helpers/object';
import { PagingData } from 'models/Pagination.model';
import { ProductModel } from 'models/Product.model';

export function createProduct(body: ProductModel) {
  return requestJson(PRODUCT_PATH, RequestMethod.Post, body);
}

export async function getProducts(page = 1, limit = DEFAULT_PAGINATION.limit, keyword = '', category = '', sort?: string, sortBy?: string) {
  const query = getValuableFieldsObj({
    page,
    limit,
    keyword,
    category,
    sort,
    sortBy,
  });
  const url = queryString.stringifyUrl({
    url: PRODUCT_PATH + PLURAL,
    query
  });

  return requestJson<PagingData<ProductModel>>(url);
}

export async function getProduct(id: string) {
  return requestJson<ProductModel>(PRODUCT_PATH + '/' + id);
}

export async function deleteProduct(id: string) {
  return requestJson<boolean>(PRODUCT_PATH, RequestMethod.Post, { id });
}

export async function updateProduct(body: ProductModel) {
  return requestJson<boolean>(PRODUCT_PATH + '/' + body._id, RequestMethod.Put, body);
}
