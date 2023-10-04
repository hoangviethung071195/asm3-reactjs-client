import { ProductModel } from './Product.model';
import { UserModel } from './User.model';

export interface CartModel {
  product: ProductModel
  productId?: string;
  userId?: string;
  quantity: number;
}

export interface CartsModel {
  products: {
    productId: string;
    quantity: number;
  }[];
  user: UserModel;
}