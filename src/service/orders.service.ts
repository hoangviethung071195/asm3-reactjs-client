import { ORDER_PATH, PLURAL } from '../utils/constant/ApiPath';
import { RequestMethod } from '../utils/constant/RequestMethod';
import { requestJson } from '../utils/helpers/api';

export async function getOrdersByUser(userId: string) {
  return requestJson<OrderModel[]>(ORDER_PATH + PLURAL, RequestMethod.Post, { userId });
}

export async function getOrder(id: string) {
  return requestJson<OrderModel>(ORDER_PATH + '/' + id);
}

export async function addOrder(body: OrderInfoModel) {
  return requestJson<string>(ORDER_PATH, RequestMethod.Post, body);
}
