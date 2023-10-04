import { CartModel } from 'models/Cart.model';
import { CART_PATH } from '../utils/constant/ApiPath';
import { RequestMethod } from '../utils/constant/RequestMethod';
import { requestJson } from '../utils/helpers/api';

export async function getCartByUser(userId: string) {
  return requestJson<CartModel[]>(CART_PATH + '/getCartByUser', RequestMethod.Post, { userId });
}

export async function updateCartByUser(userId: string, cart: { items: CartModel[]; }) {
  return requestJson<boolean>(CART_PATH, RequestMethod.Post, { userId, cart });
}

export async function deleteProductsInCartByUser(userId: string, productId: string) {
  return requestJson<boolean>(CART_PATH, RequestMethod.Delete, { userId, productId });
}
