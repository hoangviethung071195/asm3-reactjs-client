import { toast } from 'react-toastify';
import { getCurrentUser } from '../helpers/product.helper';

const domain = 'https://asm3-nodejs-me79.onrender.com/';

export function requestApi(url, method, body) {
  const token = getCurrentUser()?.token;
  return fetch(domain + url, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  }).then(res => {
    const contentType = res.headers.get("content-type");
    console.log('contentType ', typeof (contentType));
    if (res.ok) {
      console.log('res ', res);
      if (contentType.includes('application/json')) {
        return res.json();
      } else {
        return res.text();
      }
    }
    res.json().then(info => {
      toast.warning(info.message);
    });
    return false;
  });

}

export function requestFile(url, method, body) {
  const token = getCurrentUser()?.token;
  return fetch(domain + url, {
    method,
    body: (body),
    headers: {
      'Authorization': token,
    }
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    res.json().then(info => {
      toast.warning(info.message);
    });
    return false;
  });

}

// Auth
export function signup(body) {
  return requestApi('signup', 'POST', body);
}

export function signin(body) {
  return requestApi('login', 'POST', body);
}

// User
export function getUser(body) {
  return requestApi('login', 'POST', body);
}

// products
export async function getProducts(page) {
  return requestApi(((page || page === 0) ? `?page=${page}` : ''));
}

export async function deleteProduct(productId) {
  return requestApi('admin/delete-product', 'POST', { productId });
}

export async function updateProduct(body) {
  return requestFile('admin/edit-product', 'POST', body);
}


export async function getCart(userId) {
  console.log('getCart(userId) ', userId);
  return requestApi('carts/' + userId, 'GET');
}

export async function addProductToCart(body) {
  return requestApi('carts', 'POST', body);
}

export async function deleteProductInCart(body) {
  return requestApi('cart-delete-item', 'POST', body);
}

export async function getOrders(userId) {
  return requestApi('orders', 'POST', { userId });
}

export async function getOrder(orderId) {
  return requestApi('orders/' + orderId, 'GET');
}

export async function addOrder(body) {
  return requestApi('create-order', 'POST', body);
}

export async function postMessage(body) {
  return requestApi('employee/chat-room', 'POST', body);
}

export async function getChatRoom(customerId) {
  return requestApi('employee/chat-room/' + customerId, 'GET');
}

export async function removeChatRoom(customerId) {
  return requestApi('employee/chat-room/delete/' + customerId, 'GET');
}