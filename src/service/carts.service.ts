import { CART_PATH } from '../utils/constant/ApiPath';
import { RequestMethod } from '../utils/constant/RequestMethod';
import { requestJson } from '../utils/helpers/api';

export async function getCartByUser(userId: string) {
  return requestJson<CartModel[]>(CART_PATH + '/getCartByUser', RequestMethod.Post, { userId });
}

export async function updateCartByUser(userId: string, quantity: number, productId: string) {
  return requestJson<boolean>(CART_PATH, RequestMethod.Post, { userId, quantity, productId });
}

export async function deleteProductsInCartByUser(userId: string, productId: string) {
  return requestJson<boolean>(CART_PATH, RequestMethod.Delete, { userId, productId });
}
